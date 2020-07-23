import React from 'react'
import { AlertServiceProvider } from '../services';
import { Alert } from '../shared/alert';

export default ( Component: () => JSX.Element ) => {
  return (
    <div className="content">
        <AlertServiceProvider>
          <Alert/>
          <Component/>
        </AlertServiceProvider>
    </div>
  )
}