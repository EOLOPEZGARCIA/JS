import React,{useEffect, useState} from 'react';
import {SafeAreaView,ScrollView, StatusBar, StyleSheet, Keyboard,Animated,
  Text,
  View,
  TouchableWithoutFeedback,
  Alert
} from 'react-native';
import Formulario from './componentes/Formulario';
import Clima from './componentes/Clima';

const App=()=> {

  const [busqueda, guardarBusqueda] = useState({
    ciudad: '',
    pais:''
  })

  const [consultar, guardarConsultar]= useState(false);
  const [resultado,guardarResultado] = useState({});
  const [bgcolor,guardarBgcolor]=useState('rgb(71,149,212)')

  const {ciudad, pais} =busqueda;

  useEffect(()=>{
    const consultarClima = async ()=>{
      if(consultar){
        const appId='7af02060b3b29424247d139f827ce2cf'
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;
        try{
          const respuesta = await fetch(url);
          const resultado = await respuesta.json();
          guardarResultado(resultado);
          guardarConsultar(false);

          const kelvin = 273.15;
          const {main} = resultado;
          const actual=main.temp -kelvin;

          if (actual <10){
            guardarBgcolor('rgb(105,108,149)')
          }else if(actual>=10 && actual <25){
            guardarBgcolor('rgb(71,149,212)')
          }else {
            guardarBgcolor('rgb(71,149,212)')
            }

        }catch(error){
          mostrarAlerta();
        }
  
      }
    }
    consultarClima();
  },[consultar]);

  const mostrarAlerta=()=>{
    Alert.alert(
      'Error',
      'INTENTA una ciudad y pais',
      [{text:'OK'}]
    )
  }

  const OcultarTeclado=()=>{
    Keyboard.dismiss();
  }

  const bgColorApp={
    backgroundcolor:bgcolor}

  return (
      <>
        <TouchableWithoutFeedback onPress={()=> OcultarTeclado()}>
          <View style={[styles.app,bgColorApp]}>
            <View style={styles.contenido}>
              <Clima
              resultado={resultado}
              
              />
            <Formulario
            busqueda ={busqueda}
            guardarBusqueda={guardarBusqueda}
            guardarConsultar={guardarConsultar}
            />
            </View>
          </View>
        </TouchableWithoutFeedback>
    </>
  );
};

const styles= StyleSheet.create({
  app:{
    flex:1,
    justifyContent:'center'
  },
  contenido:{
    marginHorizontal:'2.5%'
  }

});


export default App;
