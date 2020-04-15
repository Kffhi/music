
import React, { Fragment } from 'react';
import { Router, Route, Switch, Redirect } from 'dva/router';
import Player from './routes/Player'
import dynamic from 'dva/dynamic'

import { config } from './utils'
// import Home from './routes/Home';
const { menuGlobal } = config

function RouterConfig({ history, app }) {

  return (
    <Router history={history}>
      <Fragment>
        <Player history={history}></Player>
        <Switch>
          {/* <Route path="/" exact component={Home} /> */}
          <Redirect from="/" to="/home" exact></Redirect>
          {
            menuGlobal.map(({ path, ...dynamics }, index) => (
              <Route
                key={index}
                path={path}
                exact
                component={dynamic({
                  app,
                  ...dynamics
                })}
              />
            ))
          }
        </Switch>
      </Fragment>
    </Router>
  );
}

export default RouterConfig;