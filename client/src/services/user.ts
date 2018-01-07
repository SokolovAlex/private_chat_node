import { api } from './api';

enum Roles {
    None = 0,
    Client = 1,
    Operator = 2
}

interface User {
    name: string;
    avatar: string;
    createdAt: string;
    email: string;
    id: string;
    role: number;
}

declare global {
    interface Window { user: User; }
}

class UserService{
    user: User;

    constructor(user: User) {
        this.setUser(user);
    }

    setUser(user: User) {
        this.user = user
    }

    getUser(): User {
        return this.user;
    }

    saveRole(roleId: number) {
        return api.saveRole(roleId, this.user.id);
    }

    hasRole() {
        return this.user.role !== Roles.None;
    }

    isAuthorized() {
        return !!this.user;
    }
}

declare let user: User;
user = window.user;

const userService = new UserService(user);

export { userService, Roles };