import * as React from 'react';
import { api } from '../../services/api';
import { Route } from 'react-router-dom'

import './rooms.less';

class Room {
    id: string;
    operator: string;
    name: string;
    userId: string;
}

class RoomsState {
    rooms: Room[];
}

export class Rooms extends React.Component {
    state: RoomsState;
    timeoutId: number;

    constructor(props: any) {
        super(props);
        this.state = {
            rooms: []
        };
        this.getRooms();
    }

    render() {
        return (
            <div>
                <h3>Rooms</h3>
                {
                    this.state.rooms.map((room, i) => {
                        return (
                            <div className="room margin-y-sm" key={i}>
                                <span>{room.name}</span>
                                { this.joinBtn(room) }
                            </div>
                        );
                    })
                }
            </div>
        );
    }

    joinBtn(room: Room) {
        if(!room.operator) {
            return (
                <Route render={({ history }) => (
                    <button className="btn btn-default join-btn margin-x-sm" 
                        onClick={this.join.bind(this, room, history)}>
                        Join
                    </button>)
                }/>
            );
        }
        return <div className="margin-x-sm">In dialog with operator {room.operator}</div>;
    }

    join(room: Room, history: any) {
        clearInterval(this.timeoutId);
        history.push(`/chat/${room.userId}`);
    }

    getRooms() {
        api.getRooms().then((response: any) => {
            if (response.data && response.data.rooms) {
                const rooms = response.data.rooms.map((room: any) => {
                    return {
                        id: room.id,
                        operator: room.operator,
                        name: room.name,
                        userId: room.userId
                    };
                });
                this.setState({
                    rooms
                });
                this.timeoutId = setTimeout(this.getRooms.bind(this), 10 * 1000);
            }
        });
    }
}