import React from 'react';
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
import { withAuthenticator } from 'aws-amplify-react';

Amplify.configure(awsconfig);

const App = () => {
  return (
    <p>amplify-app</p>
  );
}

export default withAuthenticator(App, true);
