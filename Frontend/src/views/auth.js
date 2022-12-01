import React from 'react';

import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';


export default function Auth({ signOut, user }) {
  return (
    <Authenticator loginMechanisms={['username']} signUpAttributes={['company', 'role']}
    socialProviders={['facebook', 'google']}>
      {({ signOut, user }) => (
        <main>
          <h1>Hello {user.username}</h1>
          <button onClick={signOut}>Sign out</button>
        </main>
      )}
    </Authenticator>
  );
}
