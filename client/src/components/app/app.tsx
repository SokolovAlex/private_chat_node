import * as React from 'react';

import { Route } from 'react-router-dom';

import { userService, Roles } from '../../services/user';

import { Footer } from '../footer/footer';
import { SignIn } from '../sign-in/sign-in';
import { SelectRole } from '../select-role/select-role';
import { Welcome } from '../welcome/welcome';
import { Chat } from '../chat/chat';
import { Rooms } from '../rooms/rooms';

import './app.less';

declare var process: any;
const env = process.env.NODE_ENV;

if (env === 'dev') {
    console.info('development mode');
}

const user = userService.getUser();

if (!user) {
  history.replaceState(null, 'welcome', '/')
} else if (user.role === Roles.None) {
  history.replaceState(null, 'select-role', '/select-role')
} else if (user.role === Roles.Client) {
  history.replaceState(null, 'chat', '/chat')
} else if (user.role === Roles.Operator) {
  history.replaceState(null, 'rooms', '/rooms')
}

export class App extends React.Component {
    render() {
        return (
            <div className="cover-container">
              <div className="masthead clearfix">
                <div className="inner">
                  <h3 className="masthead-brand">Private Chat</h3>
                  <SignIn/>
                </div>
              </div>
              <div className="inner cover">
                <div>
                  <div className="lead">
                    <Route exact path="/" component={Welcome} />
                    <Route path="/select-role" component={SelectRole} />
                    <Route path="/chat" component={Chat} />
                    <Route path="/rooms" component={Rooms} />
                  </div>
                </div>
              </div>
              <Footer/>
            </div>
        );
    }
}