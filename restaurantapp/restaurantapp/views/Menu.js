import React, { useContext, useEffect, Fragment } from 'react';
import { StyleSheet } from 'react-native';
import {useNavigation } from '@react-navigation/native'
import FirebaseContext from '../context/firebase/firebaseContext';
import PedidoContext from '../context/pedidos/pedidosContext';
import {NativeBaseProvider,Box,Container,Separator,IActionsheetContentProps,Pressable,FlatList,Divider,Image,List,ListItem,Thumbnail,Text,Body} from 'native-base';
import globalStyles from '../styles/global';


 
const Menu = () => {
    const {menu,obtenerProductos} = useContext(FirebaseContext);
    const {seleccionarPlatillo}=useContext(PedidoContext);
    const navigation=useNavigation();

    useEffect(()=>{
        obtenerProductos();
    },[]);

    const mostrarHeading =(categoria,i)=>{
        if(i>0){
            const categoriaAnterior = menu[i-1].categoria;
            if(categoriaAnterior != categoria){
                return(
                    <Divider style= {styles.separador}>
                        <Text style={styles.separadorTextos}>{categoria}</Text>
                    </Divider>
                )
            }
        }
        else{
            return(
                <Divider style= {styles.separador}>
                    <Text style={styles.separadorTextos}>{categoria}</Text>
                </Divider>
            )
        }
    }
    return(
        <NativeBaseProvider>
            <Box style={globalStyles.contenedor} >
                <Container style={{backgroundColor:'#FFF'}}>
                    <FlatList
                        data={menu}
                        renderItem={({platillo})=> 
                            <Box>
                                {mostrarHeading(platillo.categoria,i)}
                                <Pressable
                                    onPress={()=>{
                                        const{existencia, ...platillo2}=platillo;
                                        seleccionarPlatillo(platillo2);
                                        navigation.navigate(DetallePlatillo)
                                    }}
                                >
                                    <Image
                                        size={"lg"}
                                        source={{uri:platillo.imagen}}
                                    />
                                    <Body>
                                        <Text>{platillo.nombre}</Text>
                                        <Text
                                            note
                                            numberOfLines={2}
                                        >
                                            {descripcion}
                                        </Text>
                                        <Text>Precio: $ {platillo.precio}</Text>
                                    </Body>

                                </Pressable>
                            </Box>
                        }
                        keyExtractor={platillo=>platillo.id}
                    />
                </Container>
            </Box>
        </NativeBaseProvider>
    )

   };
    
   const styles=StyleSheet.create({
    separador:{
        backgroundColor:'#000',
    },
    separadorTextos:{
        color:'#FFDA00',
        fontWeight: 'bold'
    }

   })
         
export default Menu; 
