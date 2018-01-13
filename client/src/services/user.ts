import { api } from './api';
import { centrifugoService } from './centrifugo';

enum Roles {
    None = 0,
    Client = 1,
    Operator = 2
}

interface User {
    name: string;
    avatar?: string;
    createdAt?: string;
    email?: string;
    id: string;
    role: number;
    isGuest: boolean;
}

const RoleLabels: object = {
    [Roles.None]: "",
    [Roles.Client]: "Client",
    [Roles.Operator]: "Operator"
};

declare global {
    interface Window { user: User; }
}

class UserService{
    user: User;

    constructor(user: User) {
        this.setUser(user);
    }

    setUser(user: User): User {
        return this.user = user;
    }

    getUser(): User {
        return this.user;
    }

    createAnonimus(): User {
        const config = centrifugoService.getConfig();
        const guestId = config.user;
        return this.setUser({
            name: `Anonimus ${guestId}`,
            id: guestId,
            role: Roles.None,
            isGuest: true
        });
    }

    saveRole(roleId: number): any {
        this.user.role = roleId;
        if (this.user.isGuest) {
            return Promise.resolve();
        }
        return api.saveRole(roleId, this.user.id);
    }

    hasRole() {
        return this.user.role !== Roles.None;
    }

    hasOppositeRoleLabel() {
        return this.user.role === Roles.Client ? RoleLabels[Roles.Operator] : RoleLabels[Roles.Client];
    }

    isAuthorized() {
        return !!this.user;
    }
}

declare let user: User;
user = window.user;

const userService = new UserService(user);

export { userService, Roles, User, RoleLabels };