import React,{useContext} from 'react';
import {Container,Box,Footer, FooterTab,Button, Body,Text} from 'native-base';

import PedidoContext from '../context/pedidos/pedidosContext';

const DetallePlatillo = () => {

    const {platillo}=useContext(PedidoContext);

    return ( 
    <Text> Detalle Platillo</Text> 
    );
}
 
export default DetallePlatillo;