import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { userService } from '../../services/user';

import { Footer } from '../footer/footer';
import { SignIn } from '../sign-in/sign-in';
import { SelectRole } from '../selectRole/selectRole';

import './app.less';

declare var process: any;
const env = process.env.NODE_ENV;

if (env === 'dev') {
    console.info('development mode');
}

const user = userService.getUser();

let contentBody;
if (user) {
  contentBody = <SelectRole/>;
} else {
  contentBody = <h1>Please, sign in.</h1>;
}

let content = 
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
          {contentBody}
        </div>
      </div>
    </div>
    <Footer/>
  </div>;

ReactDOM.render(content,
  document.getElementById('content')
);