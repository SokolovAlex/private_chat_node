import * as React from 'react';

import { Route } from 'react-router-dom';

import { userService } from '../../services/user';
import { navigation } from '../../services/navigation';

import { Footer } from '../footer/footer';
import { SignIn } from '../sign-in/sign-in';
import { SelectRole } from '../select-role/select-role';
import { Welcome } from '../welcome/welcome';
import { Chat } from '../chat/chat';
import { Rooms } from '../rooms/rooms';

import './app.less';

const user = userService.getUser();

navigation.start(user);

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
                    <Route path="/chat/:room?" component={Chat} />
                    <Route path="/rooms" component={Rooms} />
                  </div>
                </div>
              </div>
              <Footer/>
            </div>
        );
    }
}