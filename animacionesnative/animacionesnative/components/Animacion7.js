import React,{useState,useEffect} from "react";
import { View,StyleSheet,Animated } from "react-native";
const Animacion7 = () => {


    const[animacion1]=useState(new Animated.Value(0));
    const[animacion2]=useState(new Animated.Value(1));

    useEffect(()=>{
        Animated.sequence([
            Animated.timing(animacion1,{
                toValue:300,
                duration:500,
                useNativeDriver:false,
            }),
            Animated.spring(animacion2,{
                toValue:10
            }),
            Animated.spring(animacion2,{
                toValue:1
            })
        ]).start();
    },[]);

    const estiloAnimacion ={
        transform:[
            {translateY: animacion1},
            {scale:animacion2}
        ]
    }

    return ( <>
    <View style={{alignItems:'center'}}>
            <Animated.View
                style={[
                    styles.caja,
                    estiloAnimacion
                ]}>
                
            </Animated.View>
        </View>
    
    </> );
}


const styles= StyleSheet.create({
    caja:{
        width:100,
        height:100,
        backgroundColor:'cornflowerblue'
    }

})
export default Animacion7;