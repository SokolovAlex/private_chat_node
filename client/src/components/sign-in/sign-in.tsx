import * as React from 'react';
import { userService, User, Roles } from '../../services/user';

import './sign-in.less';

export class SignIn extends React.Component {
    render() {
        const user = userService.getUser();
        let content = !user ?
            <nav className="nav nav-masthead">
                <a className="nav-link" href='/auth/google'>
                    <i className="fa fa-google-plus margin-x-xs"></i>
                    google
                </a>
                <a className="nav-link" href='/auth/vkontakte'>
                    <i className="fa fa-vk margin-x-xs"></i>
                    vk
                </a>
                <a className="nav-link" href='#'>
                    <i className="fa fa-user-circle-o margin-x-xs"></i>
                    guest
                </a>
             </nav>
        :
        <nav className="nav nav-masthead">
            <div className="profile">
                {user.name} {this.roleLabel(user)}
            </div>
            <a className="nav-link" href='/logout'>
                <i className="fa fa-sign-out margin-x-xs"></i>
                sign out
            </a>
        </nav>;

        return content;
    }

    rolesLabels = {
        [Roles.None]: "",
        [Roles.Client]: "Client",
        [Roles.Operator]: "Operator",
    }

    roleLabel(user: User) {
        const label = this.rolesLabels[user.role];
        return label ? `(${label})` : '';
    }
}
