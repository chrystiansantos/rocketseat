import 'react-native-gesture-handler';

import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
// import  Widget  from './src/components/Widget';
import { Widget } from './src/components/Widget';

import * as SplashScreen from 'expo-splash-screen';

import { Inter_400Regular, Inter_500Medium, useFonts, } from '@expo-google-fonts/inter'
import * as Font from 'expo-font';



export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    (async function getLoadedFont() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await Font.loadAsync({
          Inter_400Regular, Inter_500Medium
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    })()
  }, [])

  if (!appIsReady) {
    return null;
  } else {
    (async function loadedApp() {
      await SplashScreen.hideAsync();
    })()
  }

  return (
    <>
      <StatusBar
        style="light"
        backgroundColor='tranparent'
        translucent />
      <Widget />
    </>
  );
}