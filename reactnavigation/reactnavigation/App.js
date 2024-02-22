import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Inicio from './views/Inicio';
import Nosotros from './views/Nosotros';

const Stack = createStackNavigator();

const App =()=> {
  

  return (
  <>
  <NavigationContainer>
    <Stack.Navigator
    initialRouteName='Inicio'
    screenOptions={{
      title:"Componente Principal",
      headerTitleAlign:'right',
      headerStyle:{
        backgroundColor:'#F4511E'
      },
      headerTintColor:'#FFF',
      headerTitleStyle:{
        fontWeight:'bold'
      }
    }}
    >
      <Stack.Screen 
      name='Nosotros'
      component={Nosotros}
      options={({route})=>({
        title:route.params.clienteId
      })}
      />
      <Stack.Screen 
      name='Inicio'
      component={Inicio}
      />

    </Stack.Navigator>

  </NavigationContainer>
  </>
  );
}

const styles = StyleSheet.create({
  
});

export default App;
