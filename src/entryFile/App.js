import React, { Suspense, useState } from 'react';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';

import { Loading, RouteGuard } from './routeGuard';
import { routes } from './routes';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
  const [sidebarOpen, setsidebarOpen] = useState(false);
  const openSidebar = () => {
    setsidebarOpen(true);
  };
  const closeSidebar = () => {
    setsidebarOpen(false);
  };
  return (
    <Suspense fallback={<Loading />}>
      <Switch>
        {routes.map((route, i) =>
          route.guarded ? <RouteGuard key={i} {...route} /> : <Route key={i} {...route} />,
        )}
        <Redirect
          to={{
            pathname: '/',
            state: {
              from: '/',
            },
          }}
        ></Redirect>
      </Switch>
    </Suspense>
  );
};

export default App;
