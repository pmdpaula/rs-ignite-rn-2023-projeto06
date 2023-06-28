import { REALM_APP_ID } from '@env';
import { Roboto_400Regular, Roboto_700Bold, useFonts } from '@expo-google-fonts/roboto';
import { AppProvider, UserProvider } from '@realm/react';
import 'react-native-get-random-values';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from 'styled-components/native';

import { StatusBar } from 'react-native';

import { Loading } from './src/components/Loading';
import './src/libs/dayjs';
import { RealmProvider } from './src/libs/realm';
import { Routes } from './src/routes';
import { SignIn } from './src/screens/SignIn';
import theme from './src/theme';

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  if (!fontsLoaded) {
    return <Loading />;
  }

  return (
    <AppProvider id={REALM_APP_ID}>
      <ThemeProvider theme={theme}>
        <SafeAreaProvider style={{ flex: 1, backgroundColor: theme.COLORS.GRAY_800 }}>
          <StatusBar
            barStyle="light-content"
            backgroundColor="transparent"
            translucent
          />
          <UserProvider fallback={SignIn}>
            <RealmProvider>
              <Routes />
            </RealmProvider>
          </UserProvider>
        </SafeAreaProvider>
      </ThemeProvider>
    </AppProvider>
  );
}
