import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Amplify } from 'aws-amplify';

Amplify.configure({
    Auth: {        
        // REQUIRED - Amazon Cognito Region
        region: 'us-west-1',

        // OPTIONAL - Amazon Cognito User Pool ID
        userPoolId: 'us-west-1_2RgdGFRsL',

        // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
        userPoolWebClientId: '3t40m7sfo1eubaf01brq6dinjv',
    }
});

ReactDOM.render(
    <App />
  ,document.getElementById('root')
);
