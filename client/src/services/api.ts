import axios from 'axios';

const routes = {
    saveRole: 'api/role',
    sendMessage: 'api/chat/send',
    getRooms: 'api/chat/rooms',
    createRoom: 'api/chat/create'
};

class Api {
    saveRole(roleId: number, userId: string) {
        return axios.post(routes.saveRole, { roleId, userId })
            .catch(console.error);
    }

    sendMessage(message: string, channel: string, userId: string) {
        return axios.post(routes.sendMessage, { message, channel, userId })
            .catch(console.error);
    }

    getRooms() {
        return axios.get(routes.getRooms)
            .catch(console.error);
    }

    createRoom(userName: string, channel: string, userId: string) {
        return axios.post(routes.createRoom, { userName, channel, userId })
            .catch(console.error);
    }
}

const api = new Api();

export { api };