import React,{useStat,useEffect,useContext, useState} from "react";
import { FirebaseContext } from "../../firebase";

const Ordenes = () => {

    const {firebase} = useContext(FirebaseContext);

    const [ordenes,guardarOrdenes] = useState([]);

    useEffect(()=>{
        const obtenerOrdenes =()=>{
            firebase.db.collection('ordenes').where('completado',"==",false).onSnapshot(manejarSnapshot);
        }
        obtenerOrdenes();
    },[]);
    function manejarSnapahot(snapshot){
        const ordenes=snapshot.docs.map(doc =>{
            return{
                id: doc.id,
                ...doc.data()
            }
        });
        guardarOrdenes(ordenes)
    }

    return (<>
        <h1 className="text-3xl font-light mb-4">Ordenes</h1>
    </>
      );
}
 
export default Ordenes;