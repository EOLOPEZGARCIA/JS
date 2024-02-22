import React,{useReducer} from "react";
import firebase from "../../firebase";
import FirebaseContext from "./firebaseContext";
import FirebaseReducer from "./firebaseReducer"
import {OBTENER_PRODUCTOS_EXITO} from "../../types"
import _ from 'lodash'


const FirebaseState = props =>{
    //console.log(firebase)
    const innitialState = {
        menu:[]
    }
    const [state, dispatch]=useReducer(FirebaseReducer,innitialState)

    const obtenerProductos= () =>{
        
            firebase.db
                .settings({experimentalForceLongPolling:true});
            firebase.db
                .collection('productos')
                .where('existencia','==',true)
                .onSnapshot(manejarSnapshot);

        function manejarSnapshot(snapshot){
            let platillos= snapshot.docs.map(doc=>{
                return{
                    id:doc.id,
                    ...doc.data()
                }
            });

            platillos=_.sortBy(platillos,'categoria')


            dispatch({
                type:OBTENER_PRODUCTOS_EXITO,
                payload:platillos
            });
        }
    }
    return(
        <FirebaseContext.Provider
            value={{
                menu:state.menu,
                firebase,
                obtenerProductos
            }}
        >
        {props.children}
        </FirebaseContext.Provider>
    )
}
export default FirebaseState;