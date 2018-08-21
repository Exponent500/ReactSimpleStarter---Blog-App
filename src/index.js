import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
// BrowserRouter -- interacts with React Router's History library and
// decides what to do based on a change within the URL.
// Route -- Provides config that says if the URL looks like this
// then I want to show this component.
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import promise from 'redux-promise';

import reducers from './reducers';

import PostsIndex from './components/posts_index';
import PostsNew from './components/posts_new';
import PostsShow from './components/posts_show';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
      <BrowserRouter>
        <div>
          <Switch>
            {/* By providing PostsNew as the value to the component prop,
            we are providing PostsNew with a bunch of Navigation related helpers
            and objects that assists with navigation. These are added to the PostsNew
            props.  */}
            <Route path="/posts/new" component={PostsNew} />
            <Route path="/posts/:id" component={PostsShow} />
            <Route path="/" component={PostsIndex} />
          </Switch>
        </div>
      </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));
