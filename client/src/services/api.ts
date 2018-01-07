import axios from 'axios';

const routes = {
    saveRole: 'api/role'
};

class Api {
    saveRole(roleId: number, userId: string) {
        return axios.post(routes.saveRole, { roleId, userId })
            .catch(console.error);
    }
}

const api = new Api();

export { api };