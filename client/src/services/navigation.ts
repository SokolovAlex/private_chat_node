import { Roles, User } from './user';

const routes = {
    welcome: '/',
    selectRole: '/select-role',
    chat: '/chat',
    rooms: '/rooms',
};

class Navigation {
    start(user: User) {
        if (!user) {
            history.replaceState(null, 'welcome', routes.welcome)
        } else if (user.role === Roles.None) {
            history.replaceState(null, 'select-role', routes.selectRole)
        } else if (user.role === Roles.Client) {
            history.replaceState(null, 'chat', routes.chat)
        } else if (user.role === Roles.Operator) {
            history.replaceState(null, 'rooms', routes.rooms)
        }
    }
}

const navigation = new Navigation();

export { navigation };