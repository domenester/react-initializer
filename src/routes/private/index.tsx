import React, { FunctionComponent } from 'react';
import { Route, RouteProps, Redirect } from 'react-router-dom';
import { useAuthServiceValue, AuthServiceProvider } from '../../services';
import MiniDrawer from '../../components/sidebar'

interface IProps {
  Component: FunctionComponent,
  routeProps: RouteProps
}

export const PrivateRouteComponent = ({ Component, routeProps }: IProps) => {
  const { isAuthenticated } = useAuthServiceValue();
  if (!isAuthenticated()) {
    return <Redirect to="/login" />;
  }

  return (
    <Route
      {...routeProps}
      render={
        () => (
          <MiniDrawer>
            <Component />
          </MiniDrawer>
        )
      }
    />
  );
}

export const PrivateRoute = ({ Component, routeProps }: IProps) => {
  return (
    <AuthServiceProvider>
      <PrivateRouteComponent
        routeProps = {routeProps}
        Component={Component}
      />
    </AuthServiceProvider>
  )
}