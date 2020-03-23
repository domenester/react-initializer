import React from 'react';
import { Route, RouteComponentProps, RouteProps, Redirect } from 'react-router-dom';
import { AuthService } from '../../services';

interface IProps {
  component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
  routeProps: RouteProps
}

export class PrivateRoute extends React.Component<IProps, {}> {

  render() {
    const authService = AuthService();
    const { isAuthenticated } = authService
    if (!isAuthenticated()) {
      return <Redirect to="/login" />;
    }
    const { component, routeProps } = this.props
    return (
      <Route
        {...routeProps}
        component={component}
      />
    );
  }
}
