import 'react-native-gesture-handler';
import React from 'react';
import { NativeBaseProvider } from 'native-base';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();

import Login from './views/Login';
import CrearCuenta from './views/CrearCuenta';

const App =() => {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Login'>
          <Stack.Screen 
            name='Login'
            component={Login}
            options={{
              title:"Iniciar Sesion",
              
            }}
          />
          <Stack.Screen 
            name='CrearCuenta'
            component={CrearCuenta}
            options={{
              title:"Crear Cuenta",
              
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
     </NativeBaseProvider>
  );
}

export default App;
