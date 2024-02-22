import React from 'react';
import { View,StyleSheet } from 'react-native';
import { Container,Button,Text,NativeBaseProvider } from 'native-base';
import globalStyles from '../styles/global';
import {useNavigation} from '@react-navigation/native'

const NuevaOrden = () => {

    const navigation=useNavigation();
    return ( 
        <NativeBaseProvider>
            <Container style={globalStyles.contenedor}>
                <View style={[globalStyles.contenido, styles.contenido]}>
                    <Button 
                        style={globalStyles.boton}
                        borderRadius="full"
                        alignSelf="flex-start"
                        onPress={()=>{navigation.navigate('Menu')}}
                    >
                        <Text style={globalStyles.botontexto}>Iniciar Nueva Orden</Text>
                    </Button>
                </View>
            </Container> 
        </NativeBaseProvider>
        );
}

const styles =StyleSheet.create({
    contenido:{
        flexDirection:'column',
        justifyContent:'center',
    }
})
 
export default NuevaOrden;