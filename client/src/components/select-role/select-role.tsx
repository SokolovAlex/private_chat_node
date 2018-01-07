import * as React from 'react';
import { Route } from 'react-router-dom'

import { userService, Roles } from '../../services/user';

import './select-role.less';

const user = userService.getUser();

export class SelectRole extends React.Component {
    selected: number = Roles.Client;

    roles: any[] = [
        {
            id: Roles.Client,
            text: "Client"
        },
        {
            id: Roles.Operator,
            text: "Operator"
        }
    ];

    render() {
        return (
            <div>
                <h1>Салют!</h1>
                <h3>Кем ты себя видишь, {user.name}?</h3>
               <div className="row margin-top-sm select-role">
                    <div className="btn-group col-sm-11">
                        {
                            this.roles.map(role => {
                                let selectedClass = this.selected === role.id ? 'selected-role' : '';
                                selectedClass += " btn btn-secondary"
                                return <button key={role.id} className={selectedClass} onClick={this.selectRole.bind(this, role.id)}>
                                    { role.text }
                                    { this.check(role.id) }
                                </button>;
                            })
                        }
                    </div>
                    <div className="col-sm-1">
                      <Route render={({ history}) => (
                            <i className="submit-role fa fa-arrow-right fa-2x" onClick={this.saveRole.bind(this, history)}></i>
                        )} />
                    </div>
                </div>
            </div>
        );
    }

    check(roleId: number) {
        if (this.selected === roleId) {
            return <i className="fa-check fa margin-x-xs"></i>
        }
        return '';
    }

    selectRole(roleId: number) {
        this.selected = roleId;
        this.forceUpdate()
    }

    saveRole(history: any) {
        userService.saveRole(this.selected).then(() => {
            history.push(this.selected === Roles.Client ? '/chat': '/rooms');
        });
    }
}