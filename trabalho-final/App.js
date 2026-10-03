import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Abas from './src/navegacao/Abas';

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Abas />
      </NavigationContainer>
      <StatusBar style="light" />
    </SafeAreaProvider>
  );
}
