import * as React from 'react';

import { userService } from '../../services/user';
import { centrifugoService } from '../../services/centrifugo';

const user = userService.getUser();

class ChatState {
    chatStarted: boolean
}

export class Chat extends React.Component {
    
    state: ChatState;
    
    constructor(props: any) {
        super(props);
        this.state = {
            chatStarted: false
        };
    }

    render() {
        return (
            <div>
                { this.startButton() }
            </div>
        );
    }

    startButton() {
        if (this.state.chatStarted) {
            return <button className='btn btn-primary' onClick={this.close.bind(this)} >Say good buy and close connection</button>
        } else {
            return <button className='btn btn-primary' onClick={this.start.bind(this)}>Ask question to operator</button>
        }
    }

    start() {
        this.setState({chatStarted: true});

        var centrifuge = centrifugoService.start();
        
        var public_callbacks = {
            "message": function(dataset: any) {
                console.log("MSG ");
                console.log('DATASET: '+ JSON.stringify(dataset));
            },
            "join": function(message: any) {
                console.log('JOIN: '+JSON.stringify(message));
            },
            "leave": function(message: any) {
                console.log('LEAVE: '+JSON.stringify(message));
            },
            "subscribe": function(context: any) {
                console.log('SUBSCRIBE: '+JSON.stringify(context));
            },
            "error": function(errContext: any) {
                console.log('ERROR: '+JSON.stringify(errContext));
            },
            "unsubscribe": function(context: any) {
                console.log('UNSUBSCRIBE: '+JSON.stringify(context));
            }
        }
        
        var subscription = centrifuge.subscribe("public:test", public_callbacks);
        
        centrifuge.on('connect', function(context: any) {
            console.log("Connection ("+context.latency+"ms)");
        });
        
        centrifuge.on('disconnect', function(context: any) {
            console.log("Disconnection: "+context.reason);
        });
        
         centrifuge.connect();
    }

    close() {
        this.setState({chatStarted: false});
    }
}