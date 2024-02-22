import React,{useState,useEffect} from 'react';
import{View,Text,StyleSheet,Platform} from 'react-native';
import {TextInput,Headline,Button,Dialog,Portal,Paragraph} from 'react-native-paper';
import globalStyles from '../styles/global';
import axios from 'axios';

const NuevoCliente = ({navigation,route}) => {

    const {guardarConsultarAPI}=route.params;
    

    const [nombre, guardarNombre] =useState('')
    const [telefono, guardarTelefono] =useState('')
    const [correo, guardarCorreo] =useState('')
    const [empresa, guardarEmpresa] =useState('')
    const [alerta, guardarAlerta] =useState(false)

    useEffect(()=>{
        if(route.params.cliente){
            const {nombre,telefono,correo,empresa}=route.params.cliente;
            guardarNombre(nombre);
            guardarTelefono(telefono);
            guardarCorreo(correo);
            guardarEmpresa(empresa);
        }
    },[])
    
    const guardarCliente= async ()=>{
        if(nombre===''||telefono===''||correo===''||empresa===''){
            guardarAlerta(true)
            return;
        }
        const cliente ={nombre,telefono,correo,empresa};

        
        if(route.params.cliente)
        {
            const{id}=route.params.cliente;
            cliente.id=id;
            try {
                if(Platform.OS==='ios'){
                await axios.put(`http://localhost:3000/cliente/${id}`)
                }
                else{
                    await axios.post(`http://10.0.2.2:3000/clientes/${id}`)
                }
            } catch (error) {
                console.log(error)
            }

        }
        else{
            try {
                if(Platform.OS==='ios'){
                await axios.post('http://localhost:3000/clientes',cliente)
                }
                else{
                    await axios.post('http://10.0.2.2:3000/clientes',cliente)
                }
            } catch (error) {
                console.log(error)
            }
        }

        navigation.navigate('Inicio')

        guardarNombre('');
        guardarCorreo('');
        guardarTelefono('');
        guardarEmpresa('');

        guardarConsultarAPI(true)

    }


    return ( 
    <View style={globalStyles.contenedor}>
        <Headline
        style={globalStyles.titulo}
        >
            Añadir Nuevo Cliente
        </Headline>
        <TextInput
            label="Nombre"
            placeholder='Eberth'
            onChangeText={(texto)=> guardarNombre(texto)}
            value={nombre}
            style={styles.input}
        />
        <TextInput
            label="Telefono"
            placeholder='+52'
            onChangeText={(texto)=> guardarTelefono(texto)}
            style={styles.input}
            value={telefono}
        />
        <TextInput
            label="Correo"
            placeholder='correo@correo.com'
            onChangeText={(texto)=> guardarCorreo(texto)}
            style={styles.input}
            value={correo}
            />
        <TextInput
            label="Empresa"
            placeholder='Empresa'
            onChangeText={(texto)=> guardarEmpresa(texto)}
            style={styles.input}
            value={empresa}
        />
        <Button icon="pencil-circle"
        mode='contained'
        onPress={()=> guardarCliente()}>
            Guardar Cliente
        </Button>
        <Portal>
            <Dialog
            visible={alerta}
            onDismiss={()=> guardarAlerta(false)}
            >
                <Dialog.Title>Error</Dialog.Title>
                <Dialog.Content>
                    <Paragraph>Todos los campos son obligatorios</Paragraph>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button
                    onPress={()=> guardarAlerta(false)}
                    >OK</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
        
    </View>
     );
}

const styles=StyleSheet.create({
    input:{
        marginBottom:20,
        backgroundColor:'transparent'
    }
})


 
export default NuevoCliente;