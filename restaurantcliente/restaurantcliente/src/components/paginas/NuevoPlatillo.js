import React,{useContext, useState} from "react";
import { useFormik } from "formik";
import * as Yup from 'yup'
import {FirebaseContext} from '../../firebase'
import { useNavigate } from "react-router-dom";
import FileUploader from 'react-firebase-file-uploader';

const NuevoPlatillo = () => 
{

    const [subiendo,guardarSubiendo] = useState(false);
    const [progreso,guardarProgreso] = useState(0);
    const [urlimagen,guardarUrlimagen] = useState('');


    const{firebase}=useContext(FirebaseContext);
    //console.log(firebase);

    const navigate = useNavigate();

    const formik =useFormik
    ({
        initialValues:
        {
            nombre:'',
            precio:'',
            categoria:'',
            imagen:'',
            descripcion:'',
        },
        validationSchema:Yup.object
        ({
            nombre: Yup.string()
                        .min(3, 'Los Platillos deben tener al menos 3 caracteres ')
                        .required('El nombre del platillo es obligatorio'),
            precio: Yup.number()
                        .min(1, 'Debes agregar un precio ')
                        .required('El precio del platillo es obligatorio'),
            categoria: Yup.string()
                        .required('La categoria del platillo es obligatoria'),
            descripcion: Yup.string()
                        .min(10, 'La descripcion deben tener al menos 10 caracteres ')
                        .required('La descripcion del platillo es obligatoria'),
        }),
        onSubmit:platillo=>
        {
            try {
                platillo.existencia = true;
                platillo.imagen=urlimagen
                firebase.db.collection('productos').add(platillo)
                console.log(platillo);
                navigate('/menu');
            } catch (error) {
                console.log(error);
                
            }
        }
    })

    const handleUploadStart=()=>
    {
        guardarProgreso(0);
        guardarSubiendo(true);
    }

    const handleUploadError= error=>
    {
        guardarSubiendo(false);
        console.log(error);
    }

    const handleUploadSuccess= async nombre=>
    {
        guardarProgreso(100);
        guardarSubiendo(false);
         const url= await firebase
                    .storage
                    .ref("productos")
                    .child(nombre)
                    .getDownloadURL();
        console.log(url);
        guardarUrlimagen(url);
    }
    
    const handleProgress=progreso=>
    {
        guardarProgreso(progreso);
        console.log(progreso);
    }


    return(
    <>
        <h1 className="text-3xl font-light mb-4">Agregar Platillo</h1>
        <div className="flex justify-center mt-10">
            <div className="w-full max-w-3xl">
                <form
                onSubmit={formik.handleSubmit}
                >
                     <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">Nombre</label>
                            <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="nombre"
                            type="text"
                            placeholder="Nombre Platillo"
                            value={formik.values.nombree}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            />
                     </div>

                     {formik.touched.nombre && formik.errors.nombre?(
                        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5" role="alert">
                            <p className="font-bold">Hubo un error:</p>
                            <p>{formik.errors.nombre}</p>
                        </div>
                     ):null}

                     <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="precio">Precio</label>
                            <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="precio"
                            type="number"
                            placeholder="$20 "
                            min="0"
                            value={formik.values.precio}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            />
                     </div>

                     {formik.touched.precio && formik.errors.precio?(
                        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5" role="alert">
                            <p className="font-bold">Hubo un error:</p>
                            <p>{formik.errors.precio}</p>
                        </div>
                     ):null}
                     
                     <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="categoria">
                            Categoria
                        </label>
                        <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="categoria"
                            name="categoria"
                            value={formik.values.categoria}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        >
                            <option value="">-- Seleccione --</option>
                            <option value="desayuno">Desayuno</option>
                            <option value="comida">Comida</option>
                            <option value="cena">Cena</option>
                            <option value="bebidas">Bebida</option>
                            <option value="postre">Postre</option>
                            <option value="ensalada">Ensalada</option>

                        </select>
                     </div>
                     
                     {formik.touched.categoria && formik.errors.categoria?(
                        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5" role="alert">
                            <p className="font-bold">Hubo un error:</p>
                            <p>{formik.errors.categoria}</p>
                        </div>
                     ):null}
                     
                     <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="imagen">Imagen</label>
                           <FileUploader
                           accept="image/*"
                           id="imagen"
                           name="imagen"
                           randomizeFilename
                           storageRef={firebase.storage.ref("productos")}
                           onUploadStart={handleUploadStart}
                           onUploadError={handleUploadError}
                           onUploadSuccess={handleUploadSuccess}
                           onProgress={handleProgress}

                           />
                     </div>
                     {subiendo && (
                            <div className="h-12 relative w-full border">
                                <div className="bg-green absolute left-0 top-0 text-white px-2 text-sm h-12 flex items-center" style={{width:`${progreso}`}} >
                                    {progreso}
                                </div>
                            </div>
                        )}
                     {urlimagen&&(
                        <p className="bg-green-500 text-white p-3 text-center my-5">
                            La imagen se subio correctamente
                        </p>
                     )}
                     
                     
                     <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="descripcion">Descripcion</label>
                            <textarea
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-40 "
                                id="descripcion"
                                placeholder="Descrpcion del Platillo"
                                value={formik.values.descripcion}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            ></textarea>
                     </div>
                     
                     {formik.touched.descripcion && formik.errors.descripcion?(
                        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5" role="alert">
                            <p className="font-bold">Hubo un error:</p>
                            <p>{formik.errors.descripcion}</p>
                        </div>
                     ):null}
                     
                     <input
                     type="submit"
                     className="bg-gray-800 hover:bg-gray-900 w-full mt-5 p-2 text-white uppercase font-bold"
                     value = "Agregar Platillo"
                     />
                     
                </form>
            </div>
        </div>
    </>
    );
};
 
export default NuevoPlatillo ;