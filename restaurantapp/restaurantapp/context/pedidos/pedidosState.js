import React,{useReducer} from "react";

import PedidoReducer from "./pedidosReducer";
import PedidoContext from "./pedidosContext"
import { SELECCIONAR_PRODUCTO } from "../../types";


const PedidoState = props =>{

    //console.log(firebase)

    const innitialState = {
        pedido:[],
        platillo:null
    }

    const [state, dispatch]=useReducer(PedidoReducer,innitialState)

    const seleccionarPlatillo=platillo=>{
        dispatch({
            type:SELECCIONAR_PRODUCTO,
            payload:platillo
        })
    }

    return(
        <PedidoContext.Provider
            value={{
                pedido:state.pedido,
                platillo:state.platillo,
                seleccionarPlatillo
            }}
        >
        {props.children}
        </PedidoContext.Provider>
    )
}

export default PedidoState;