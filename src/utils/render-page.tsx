import React from 'react'
import { AlertServiceProvider } from '../services';
import { SnackBarStateProvider } from '../shared/state-handler';
import { Alert } from '../shared/alert';

export default ( Component: () => JSX.Element ) => {
  return (
    <div className="content">
      <SnackBarStateProvider>
        <AlertServiceProvider>
          <Alert/>
          <Component/>
        </AlertServiceProvider>
      </SnackBarStateProvider>
    </div>
  )
}