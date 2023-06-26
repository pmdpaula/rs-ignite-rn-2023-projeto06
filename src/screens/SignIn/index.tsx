import { ANDROID_CLIENT_ID, IOS_CLIENT_ID } from '@env';
import { Realm, useApp } from '@realm/react';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';

import { useEffect, useState } from 'react';

import { Alert } from 'react-native';

import backgroundImage from '../../assets/background.png';
import { Button } from '../../components/Button';
import { Container, Slogan, Title } from './styles';

WebBrowser.maybeCompleteAuthSession();

export const SignIn = () => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const app = useApp();

  const [_, response, googleSignIn] = Google.useAuthRequest({
    androidClientId: ANDROID_CLIENT_ID,
    // iosClientId: IOS_CLIENT_ID,
    scopes: ['profile', 'email'],
  });

  function handleSignInWithGoogle() {
    setIsAuthenticating(true);

    googleSignIn().then((response) => {
      if (response.type !== 'success') {
        // const { id_token } = response.params;

        // console.log(id_token);
        setIsAuthenticating(false);
      }
    });
  }

  useEffect(() => {
    if (response?.type === 'success') {
      if (response.authentication?.idToken) {
        const credentials = Realm.Credentials.jwt(response.authentication.idToken);

        app.logIn(credentials).catch((error) => {
          console.log(error);
          Alert.alert('Entrar', 'Não foi possível conectar com a conta Google');
          setIsAuthenticating(false);
        });

        // fetch(
        //   `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${response.authentication.idToken}`,
        // )
        //   .then((response) => response.json())
        //   .then(console.log);
      } else {
        Alert.alert('Entrar', 'Não foi possível conectar com a conta Google');
        setIsAuthenticating(false);
      }
    }
  }, [response]);

  return (
    <Container source={backgroundImage}>
      <Title>Ignite Fleet</Title>

      <Slogan>Gestão de uso de veículos</Slogan>

      <Button
        title="Entrar com Google"
        onPress={handleSignInWithGoogle}
        isLoading={isAuthenticating}
      />
    </Container>
  );
};
