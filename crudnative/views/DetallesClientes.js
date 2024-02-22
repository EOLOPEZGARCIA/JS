import React from 'react';
import{View,StyleSheet,Alert,Platform} from 'react-native';
import { Headline,Subheading,Text,Button,FAB } from 'react-native-paper';
import globalStyles from '../styles/global';
import axios from 'axios';

const DetallesaCliente = ({navigation,route}) => {

    const{guardarConsultarAPI}=route.params;
    const {nombre,telefono,correo,empresa,id}=route.params.item;
    const mostrarConfirmacion=()=>{
        Alert.alert(
            '¿Deseas eliminar este cliente?',
            'un contacto eliminado no se puede recuperar',
            [
                {text:'SIIII', onPress:()=> eliminarContacto()},
                {Text:'NO, CANCELAR',style:'cancel'}
            ]
        )
    }
    const eliminarContacto= async()=>{
        try {
            if(Platform.OS==='ios'){
            
                const resultado=await axios.delete(`http://localhost:3000/clientes/${id}`);
                }
                else{
                    const resultado=await axios.delete(`http://10.0.2.2:3000/clientes/${id}`);
                } 

                guardarClientes(resultado.data)
                guardarConsultarAPI(false);
        } catch (error) {
            console.log(error);
        }
        navigation.navigate('Inicio');

        guardarConsultarAPI(true);
    }
    return ( 
    <View style={globalStyles.contenedor}>
        <Headline style={globalStyles.titulo}>{nombre}</Headline>
        <Text style={styles.texto}>Empresa: <Subheading>{empresa}</Subheading></Text>
        <Text style={styles.texto}>Telefono: <Subheading>{telefono}</Subheading></Text>
        <Text style={styles.texto}>Correo: <Subheading>{correo}</Subheading></Text>
        <Button 
            mode='contained' 
            icon="cancel"
            style={styles.boton}
            onPress={()=>mostrarConfirmacion()}>
            Eliminar Cliente
        </Button>
        <FAB icon="pencil"
        style={globalStyles.fab}
        onPress={()=>navigation.navigate("NuevoCliente",{cliente: route.params.item,guardarConsultarAPI})} 
        />

    </View> );
}
 
const styles= StyleSheet.create({
    texto:{
        marginBottom:20,
        fontSize:18
    },
    boton:{
        marginTop:100,
        backgroundColor:'red'
    }
})
export default DetallesaCliente;