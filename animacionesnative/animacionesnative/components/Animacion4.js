import React,{useState, useEffect} from "react";
import { StyleSheet,Text,Animated,View } from "react-native";

const Animacion4 = () => {
    const [animacion] = useState(new Animated.Value(0));

    useEffect(()=>{
        Animated.timing(
            animacion,{
                toValue:360,
                duration:500
            }
        ).start();
    },[]);
    const interpolacion= animacion.interpolate({
        inputRange:[0,360],
        outputRange:['0deg','360deg']
    })
    const estiloAnimacion ={
        transform:[{rotate:interpolacion}]
    }

    return ( 
    <View >

    <Animated.Vies 
    style={[styles.caja,estiloAnimacion]}>

    </Animated.Vies>
    </View> );
}

const styles= StyleSheet.create({
    caja:{
        width:100,
        height:100,
        backgroundColor:'cornflowerblue'

    }
})
 
export default Animacion4;