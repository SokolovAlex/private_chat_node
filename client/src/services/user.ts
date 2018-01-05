interface User {
    name: string;
    avatar: string;
    createdAt: string;
    email: string;
    id: string;
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

    setRole() {
        
    }

    isAuthorized() {
        return !!this.user;
    }
}

declare let user: User;
user = window.user;

const userService = new UserService(user);

export { userService };