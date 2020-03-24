import React, { FunctionComponent } from 'react';
import { Route, RouteProps, Redirect } from 'react-router-dom';
import { AuthService } from '../../services';

interface IProps {
  component: FunctionComponent,
  routeProps: RouteProps
}

export const PrivateRoute = ({ component, routeProps }: IProps) => {
  const authService = AuthService();
  const { isAuthenticated } = authService

  if (!isAuthenticated()) {
    return <Redirect to="/login" />;
  }

  return (
    <Route
      {...routeProps}
      component={component}
    />
  );
}
