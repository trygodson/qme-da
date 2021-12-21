/**
 * App Routes
 */

import React, { Component, Suspense, useState } from 'react';
import { Redirect, Switch, withRouter } from 'react-router-dom';
import PermissionedRoute from '../router_service/permissioned_route';
import { Loading } from '../entryFile/routeGuard';
import Navbar from '../shared/components/navbar/Navbar';
import Sidebar from '../shared/components/sidebar/sidebar';

// router service
import routerService from '../router_service';

const DefaultLayout = ({ match, ...props }) => {
  const [sidebarOpen, setsidebarOpen] = useState(false);
  const openSidebar = () => {
    setsidebarOpen(true);
  };
  const closeSidebar = () => {
    setsidebarOpen(false);
  };
  return (
    <div className="containertemplate">
      <Navbar sidebarOpen={sidebarOpen} openSidebar={openSidebar} />

      <Suspense fallback={<Loading />}>
        <Switch>
          {routerService &&
            routerService.map((route, key) => (
              <PermissionedRoute
                key={key}
                path={`${match.url}/${route.path}`}
                component={route.component}
                permissions={route.permission}
                exact={route.exact}
              />
            ))}
          <Redirect from={'/'} to={`${match.url}/dashboard`}></Redirect>
        </Switch>
      </Suspense>
      <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />
    </div>
  );
};
export default withRouter(DefaultLayout);
