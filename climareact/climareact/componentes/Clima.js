import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
const Clima = ({resultado}) => {
    const {name, main}= resultado;
    if(!name) return null;
    const kelvin=273.15;

    return ( 
        <View style={styles.clima}>
            <Text style= {[styles.texto,styles.actual]}
            >{parseInt(main.temp -kelvin)}
            <Text style={styles.temperatura}>
                &#x2103;
            </Text>
            <Image
            style={{width:66, height:58}}
            source={{uri:`http://openweathermap.org/img/w/${resultado.weather[0].icon}.png`}}
            />
            </Text>
            <View style={styles.temperaturas}>
                <Text>Min {''}
                    <Text>
                        {parseInt(main.temp_min -kelvin)}
                    </Text>
                </Text>
                <Text>Max {''}
                    <Text>
                        {parseInt(main.temp_max -kelvin)}
                    </Text>
                </Text>
            </View>
        </View>
     );
}

const styles =StyleSheet.create({
    clima:{
        marginBottom:20
    },
    texto:{
        color:'#FFF',
        fontSize:20,
        textAlign:'center',
        marginRight:20

    },
    actual:{
        fontSize:80,
        marginRight:0,
        fontWeight:'bold'

    }, 
    temperatura:{
        fontSize:24,
        fontWeight:'normal'

    },
    temperaturas:{
        flexDirection:'row',
        justifyContent:'center'
    }
})
 
export default Clima;