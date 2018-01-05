import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { userService } from '../../services/user';

import './app.less';

declare var process: any;
const env = process.env.NODE_ENV;

if (env === 'dev') {
    console.info('development mode');
}

const user = userService.getUser();

let content = user ? 
  <h1>
     Салют.
     Кем ты себя видишь, {user.name}?
     <button>Оператор</button>
     <button>я - клиент</button>
  </h1>
  :
  <h1>
     Please, sign in.
  </h1>;

ReactDOM.render(content,
  document.getElementById('content')
);