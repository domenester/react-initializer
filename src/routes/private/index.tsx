import React, { FunctionComponent } from 'react';
import { Route, RouteProps, Redirect } from 'react-router-dom';
import { useAuthServiceValue, AuthServiceProvider } from '../../services';
import MiniDrawer from '../../components/sidebar'

interface IPrivateRouteComponentProps {
  Component: FunctionComponent,
  routeProps: RouteProps
}

export const PrivateRouteComponent = ({ Component, routeProps }: IPrivateRouteComponentProps) => {
  const { isAuthenticated } = useAuthServiceValue()
  if (
    window.location.pathname === routeProps.path
    && !isAuthenticated()
  ) {
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

export const PrivateRoute = ({ Component, routeProps }: IPrivateRouteComponentProps) => {
  return (
    <AuthServiceProvider>
      <PrivateRouteComponent
        routeProps = {routeProps}
        Component={Component}
      />
    </AuthServiceProvider>
  )
}