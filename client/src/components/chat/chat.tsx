import * as React from 'react';

import { userService, User } from '../../services/user';
import { api } from '../../services/api';
import { centrifugoService } from '../../services/centrifugo';

let user: User;

class Message {
    isMine: boolean;
    created: string;
    message: string;
    author: string;
    inProcess: boolean;
}

class ChatState {
    chatName: string;
    chatStarted: boolean;
    message: string;
    history: Message[];
}

export class Chat extends React.Component {
    channel: string;
    centrifuge: any;
    props: any;
    state: ChatState;
    subscription: any;
    roomUserId: string;
    isOperator: boolean;
    operatorConnected: boolean;
    
    constructor(props: any) {
        super(props);

        this.state = {
            chatName: 'Chat',
            chatStarted: false,
            message: '',
            history: []
        };

        user = userService.getUser();
    }

    componentDidMount() {
        const roomUserId = this.props.match && this.props.match.params && this.props.match.params.room;

        if (roomUserId) {
            this.roomUserId = roomUserId;
            this.isOperator = true;
            this.start();
        }
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
        this.setState({ message: e.target.value });
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
                                        {item.author}: { item.message }
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
        this.channel = `private:user${this.roomUserId || user.id}`;

        const centrifuge = centrifugoService.start();

        if (this.isOperator) {
            api.join(user.name, this.channel, user.id);
        } else {
            api.createRoom(user.name, this.channel, user.id);
        }

        this.setState({ chatStarted: true });

        this.subscription = centrifuge.subscribe(this.channel);

        this.subscription.on('message', this.receiveMessage.bind(this));

        this.subscription.on('join', this.join.bind(this));

        if (!this.isOperator) {
            this.subscription.on('leave', this.leave.bind(this));
            this.subscription.on('unsubscribe', this.unsubscribe.bind(this));
        }

        this.subscription.history().then((response: any) => {
            if (response.data) {
                const history = response.data.reverse().map((item: any) => {
                    const isMine = item.data.author == user.id;
                    return {
                        uid: item.uid,
                        message: item.data.message,
                        isMine,
                        author: isMine ? "you": userService.hasOppositeRoleLabel(),
                        inProcess: false,
                        created: item.data.created
                    };
                });
                this.setState({ history });
            }
        });

        centrifuge.connect();

        this.centrifuge = centrifuge;
    }

    join(response: any) {
        if (response.data.user != user.id && !this.operatorConnected) {
            this.operatorConnected = true;
        }
    }

    leave(response: any) {
        if (response.data && response.data.user != user.id && this.operatorConnected) {
            api.leave(this.channel, response.data.user);
            this.operatorConnected = false;
        }
    }

    unsubscribe(response: any) {
        api.thanks(this.channel, user.id);
    }

    receiveMessage(response: any) {
        if (!response.data) {
            return;
        }
        const history = this.state.history;
        const data = response.data;
        const isMine = data.author == user.id;
        const author = isMine ? "you": userService.hasOppositeRoleLabel();
        history.push({ message: data.message, author, inProcess: false, isMine, created: data.created });
        this.setState({ history });
    }

    close() {
        this.setState({ chatStarted: false });
        this.centrifuge.disconnect();
    }
}