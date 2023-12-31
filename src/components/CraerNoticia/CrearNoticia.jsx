/* eslint-disable no-unused-vars */
import { useState } from "react";
import validation from "./validaciones";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { postNoticia } from "../../redux/noticiasActions/noticiasActions";
import { useSelector } from "react-redux";
import {
   getAllCategories,
   postCategoria,
} from "../../redux/categoriasActions/categoriasActions";
import { TextField, Typography } from "@mui/material";
import { Button } from "@mui/base";
import AlertError from "../../assets/AlertError/AlertError";
import SucessAlert from "../../assets/AlertSuccess/AlertSuccess";
import "./crearNoticia.css";
import { submitImgCloudinary } from "../../redux/noticiasActions/noticiasActions";
import { Link } from "react-router-dom";
import AlertSuccess from "../../assets/AlertSuccess/AlertSuccess";

export default function CrearNoticia() {
   const imgDefault =
      "https://res.cloudinary.com/drpdobxfu/image/upload/v1695161197/Noticias/xfy5crhkywnnpsakmbzr.png";
   let allCategorias = useSelector((state) => state.categorias);

   const [input, setInput] = useState({
      titulo: "",
      resumen: "",
      descripcion: "",
      imagen: "",
      crear: "",
   });
   const [error, setError] = useState({});
   const [imageURL, setImageURL] = useState(""); //url
   const [category, setCategory] = useState([]);
   const [crearCategory, setCrearCategory] = useState("");
   const dispatch = useDispatch();
   const [canCreateNotice, setCanCreateNotice] = useState(false);
   const userId = localStorage.userId;
   const [incluye, setIncluye] = useState("");
   const errors = useSelector((state) => state.errors);

   useEffect(() => {
      dispatch(getAllCategories());
   }, [dispatch]);

   const handleChange = (event) => {
      event.preventDefault();
      setInput({
         ...input,
         [event.target.name]: event.target.value,
      });

      setError(
         validation(
            {
               ...input,
               [event.target.name]: event.target.value,
            },
            event.target.name
         )
      );
      console.log(error);
   };

   const handleCategoryChange = (event) => {
      event.preventDefault();
      setInput({
         ...input,
         [event.target.name]: event.target.value,
      });
   };
   const [response, setResponse] = useState(false);
   const [loading, setLoading] = useState(false);

  const handleImageChange= async(event)=>{
    const file =  event.target.files[0];         
    
    setImageURL(URL.createObjectURL(file));  
    
    setInput({
      ...input,
      imagen: file
    }) 
    setLoading(true)  
     const cloudiResponse= await dispatch(submitImgCloudinary(file))
     setCanCreateNotice(true)
     setError({...error,imagen:""})
     setLoading(false)
     setResponse(<AlertSuccess success={cloudiResponse.message}/>)
     setTimeout(()=>{setResponse(false)},3000)
     setInput({...input, imagen:cloudiResponse.secure_url})
     
   
  }
    const handleSelect=(e)=>{
     const idCategory= +allCategorias[e.target.value].id;     
     const nameCategory=allCategorias[e.target.value].name;   
     const obj= {id:idCategory,name:nameCategory}    
     const tieneID = category.some(e => e.id === obj.id)
      
     if(category.length>3){
      setErrorAlert('Maximo 4 categorias');
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 5000);
     } else if(!tieneID){
       setCategory([
         ...category,
         {         
        id: idCategory,
        name:nameCategory
        }
      ])   
      setIncluye("")
      }else if(tieneID){
        
       setIncluye("*Esta categoria ya fue seleccionada*")
        
      }

      setError(validation(
        {
            ...input, 
            [e.target.name]: e.target.value
        },e.target.name)          
      )  
      
    }    

    const deleteCategory= (e)=>{
      const categoryFilter= category.filter((c)=>c !== e)      
      //los que no quiere eliminar   
      setCategory([...categoryFilter])        
      if(categoryFilter.length==0){
        setError({
          ...error,
          categoria:"*Campo obligatorio*"
        }        
        )
      }
     
    }
  

  const handleSubmit = async(event) => {
   
    event.preventDefault();
    const form = document.getElementById('formulario');
    const ids = category.map((item) => item.id); 
    const body = {
      title: input.titulo,
      resume: input.resumen,
      content: input.descripcion,
      image: input.imagen,
      categoryIds: ids,
      active: true,
      user_id:userId
    };
    
    let disable=true 
    for(const err in error){
      if(error[err]===""){
        disable=false
      }else{
        disable=true
        break;
      }
    }
    console.log(category.length>0);
    if (canCreateNotice && !disable && category.length>0) {
      try {
        setLoading(true)
       const data= await dispatch(postNoticia(body));     
       setLoading(false)  
        if(data){
        form.reset();
        setImageURL('');

               setInput({
                  titulo: "",
                  resumen: "",
                  detalle: "",
                  imagen: "",
               });
               setCategory([]);
               setSuccessAlert("¡Noticia creada con éxito!");
               setShowSuccess(true);
               setTimeout(() => {
                  setShowSuccess(false);
               }, 5000);
            }
         } catch (error) {
            setErrorAlert(error.message);
            setShowError(true);
            setTimeout(() => {
               setShowError(false);
            }, 5000);
         }
      } else {
         setErrorAlert("Revise los requisitos");
         setShowError(true);
         setTimeout(() => {
            setShowError(false);
         }, 5000);
      }
   };

   const crearCategoria = async (event) => {
      event.preventDefault();
      const name = input.crear;
      if (!name) {
         setError({
            ...error,
            crear: "*Escriba un nombre*",
         });
      } else {
         setCrearCategory(name);
         setLoading(true);
         await dispatch(postCategoria({ active: true, name }));
         await dispatch(getAllCategories());
         setLoading(false);

         setSuccessAlert("Categoria creada con exito!");
         setShowSuccess(true);
         setTimeout(() => {
            setShowSuccess(false);
         }, 5000);
      }
   };
   const [errorAlert, setErrorAlert] = useState("");
   const [showError, setShowError] = useState(false);
   const [showSuccess, setShowSuccess] = useState(false);
   const [successAlert, setSuccessAlert] = useState("");

   return (
      <div className="cont_general_noticia">
         <div className="cont_link_buton">
            <Link to="/auth/dashboard#/crearNoticia">
               <button className="link_volver-notice">Volver a la Dash</button>
            </Link>
         </div>
         <div className="cont_form_div">
            {loading ? (
               <div className="loader_notice_container">
                  <span className="loaderNotice"></span>
               </div>
            ) : null}
            {response ? (
               <div className="response_notice_succes">{response}</div>
            ) : null}
            {errors ? (
               <div className="response_notice_succes">
                  <AlertError />
               </div>
            ) : null}

          <form id="formulario" className="etiquetaForm_notice" onSubmit={handleSubmit}>

            {showError ? (
              <div className="alerts">
                <AlertError error={errorAlert} />
              </div>
            ) : null}
            {showSuccess ? (
              <div className="alerts">
                <SucessAlert success={successAlert} />
              </div>
            ) : null}
           <div className='titulo-input-notice'>
            <input
              placeholder='Titulo de la noticia'          
                type="text"
                name="titulo"
                className='title-crearNotice'
                value={input.titulo}
                required
                onChange={handleChange}                            
              />
              {error.titulo && (
                <p className='error-notice-form'>{error.titulo}</p>)}
           </div>

           <div className='cont_resumen_notice_'>
              <input
              className='title-crearNotice'
                placeholder='Resumen'
                  type="text"
                  name="resumen"
                  value={input.resumen}
                  required
                  onChange={handleChange}
                            
                />
                {error.resumen && (
                  <p className='error-notice-form'>{error.resumen}</p>
                )}
           </div>

            <div className='div-selec-notice-'>
              <select  className='select_category' value="def" onChange={handleSelect} name="categoria">
                <option name="categoria" value="def">
                  Seleccione categoria
                </option>

                     {allCategorias?.map((c, index) => {
                        return (
                           <option key={c.id} value={index}>
                              {c.name}
                           </option>
                        );
                     })}
              </select>
                  {error.categoria && <p className='error-notice-form'>{error.categoria}</p>}
                  {incluye !== "" && <p className='error-notice-form'>{incluye}</p>}
            </div>

               <div className="map_category">
                  {category?.map((e, index) => {
                     return (
                        <div key={index} onClick={() => deleteCategory(e)}>
                           {e.name ? (
                              <Button className="category_selec_notices">
                                 {e.name}
                              </Button>
                           ) : null}
                        </div>
                     );
                  })}
               </div>

      
            <div className='cont_moverInput__'>
              <input
                onChange={handleCategoryChange}           
                type="text"
                name="crear"
                placeholder="Crear categoria"
                className='crear-category-notice'
              />
              <Button className='button_crear_cate' onClick={crearCategoria}>Crear</Button>
              <div className="error-crearCategory-">
              {error.crear && <p className='error-notice-form'>{error.crear}</p>}
              </div>
            </div>           

           <div className='cont_moverInput_form'>
              <input
                className="input-description-notice"
                placeholder='Descripcion'
               type="text" name="descripcion" value={input.descripcion} required onChange={handleChange} />
                {error.descripcion && <p className='error-notice-form'>{error.descripcion}</p>}
           </div>
         

            <div className='cont_selecImg_div'>
            <input className="input-file-notice" type="file" name="imagen" accept="image/*" onChange={handleImageChange}/>            
            </div>        
            
              <div className='cont_img_notices_render'>
                <img className='renderiza_img_notices' src={ imageURL? imageURL : imgDefault} alt="img"/>     
              </div>      
                     

            <div className='div_submit_notice'>
            <Button className='button_submit_notices' type="submit" variant="outlined" value="Crear Noticia">Crear noticia</Button>
            </div>
          </form>
      </div>

              
        {/*------------------------- Previsualizar noticia ------------------------------------------------------------*/}
          <div className='cont_previsu_div'>       
            
                  <div className="title_previsu-div">
                    <p className='title-previsu-notice'>{input.titulo}</p>
                  </div>

            <div className="visualiza_resumen_notice">
               <p className='title-previsu-notice'>{input.resumen}</p>
            </div>
                  

            <div className='img_previsualiza-notice'>
            <img className='img-ver-prev' src={ imageURL? imageURL : imgDefault} alt="img" />
            </div>   

            <div className="descripcion_previsualiza">
               <p className='title-previsu-notice'>{input.descripcion}</p>
            </div>

            <div className="category_previsualiza">
               {category?.map((e, index) => {
                  return (
                     <div key={index}>
                        {e.name ? (
                           <p className="category_name_previsualiza">
                              #{e.name}
                           </p>
                        ) : null}
                     </div>
                  );
               })}
            </div>
         </div>
      </div>
   );
}

