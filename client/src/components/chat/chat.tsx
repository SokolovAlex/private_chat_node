import * as React from 'react';

import { userService } from '../../services/user';
import { api } from '../../services/api';
import { centrifugoService } from '../../services/centrifugo';

const user = userService.getUser();

class Message {
    message: string;
    author: string;
    inProcess: boolean;
}

class ChatState {
    chatStarted: boolean;
    message: string;
    history: Message[];
}

export class Chat extends React.Component {
    channel: string;
    state: ChatState;
    subscription: any;
    
    constructor(props: any) {
        super(props);
        this.state = {
            chatStarted: false,
            message: '',
            history: []
        };
    }

    render() {
        return (
            <div>
                { this.chat() }
                { this.toogleButton() }
            </div>
        );
    }

    sendMessage(){
        api.sendMessage(this.state.message, this.channel, user.id );
        this.setState({ message: '' });
    }

    handleMessageChange(e: any) {
        this.setState({message: e.target.value});
    }

    chat() {
        if (this.state.chatStarted) {
            return (
                <div className="margin-y-sm">
                    <h3> messages: </h3>
                    <div className="messages margin-y-sm">
                        {
                            this.state.history.map((item, i) => {
                                return (
                                    <div className="message" key={i}>
                                        { item.message }
                                    </div>
                                );
                            })
                        }
                    </div>
                    <input placeholder='message' type='text' 
                        onChange={this.handleMessageChange.bind(this)}
                        value={this.state.message} />
                    <button onClick={this.sendMessage.bind(this)}>Send</button>
                </div>
            );
        }
        return '';
    }

    toogleButton() {
        if (this.state.chatStarted) {
            return <button className='btn btn-default' onClick={this.close.bind(this)} >Say good buy and close connection</button>
        } else {
            return <button className='btn btn-primary' onClick={this.start.bind(this)}>Ask question to operator</button>
        }
    }

    start() {
        this.channel = `private:user${user.id}`;

        this.setState({chatStarted: true});

        var centrifuge = centrifugoService.start();

        var public_callbacks = {
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

        this.subscription = centrifuge.subscribe(this.channel, public_callbacks);

        this.subscription.on('message', this.receiveMessage.bind(this));

        this.subscription.on('join', this.join.bind(this));

        this.subscription.history().then((response: any) => {
            if(response.data) {
                const history = response.data.map((item: any) => {
                    return {
                        uid: item.uid,
                        message: item.data.message,
                        author: item.data.author == user.id ? "you": "operator",
                        inProcess: false,
                    };
                });
                this.setState({ history });
            }
        });

        centrifuge.connect();
    }

    join(response: any) {
        if (response.data.user == user.id) {
            api.createRoom(user.name, this.channel, user.id );
        }
    }

    receiveMessage(response: any) {
        const history = this.state.history;
        history.push({ message: response.data.message, author: 'You', inProcess: false });
        this.setState({ history });
    }

    close() {
        this.setState({chatStarted: false});
    }
}