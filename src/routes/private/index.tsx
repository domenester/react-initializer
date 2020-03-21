import React from 'react';
import { Route, RouteComponentProps, RouteProps, Redirect } from 'react-router-dom';
import { AuthService } from '../../services';

interface IProps {
  component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
  routeProps: RouteProps
}

export class PrivateRoute extends React.Component<IProps, {}> {

  private authService = AuthService();

  render() {
    const { isAuthenticated } = this.authService
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
