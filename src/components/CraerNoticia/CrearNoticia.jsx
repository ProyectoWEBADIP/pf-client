import { useState } from 'react';
import validation from './validaciones';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { postNoticia } from '../../redux/noticiasActions/noticiasActions';
import { useSelector } from "react-redux";
import { getAllCategories, postCategoria } from "../../redux/categoriasActions/categoriasActions";
import { TextField, Typography } from "@mui/material";
import { Button} from "@mui/base";
import AlertError from '../../assets/AlertError/AlertError';
import SucessAlert from '../../assets/AlertSuccess/AlertSuccess';
import './crearNoticia.css';



export default function CrearNoticia() {
  const imgDefault = 'https://cdn-icons-png.flaticon.com/256/20/20079.png';
  let allCategorias = useSelector((state) => state.categorias);
  
  const [input, setInput] = useState({
    titulo: '',
    resumen: '',
    descripcion: '',
    imagen: '',
  });
  const [error, setError] = useState({});
  const [imageURL, setImageURL] = useState(''); //url
  const [category, setCategory] = useState([]); 
  const [crearCategory, setCrearCategory] = useState('');
  const dispatch = useDispatch();
  const [canCreateNotice, setCanCreateNotice] = useState(false);
  const userId= localStorage.userId
 


  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  const handleChange = (event) => {
    console.log("====>",input.descripcion);
    event.preventDefault();

    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
    
    
    setError(
      validation({
        ...input,
        [event.target.name]: event.target.value,
      })
    );
  };

  const handleCategoryChange = (event) => {
    event.preventDefault();
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
  };
  const submitImage = async (e) => {
    e.preventDefault();    
      
    try {
      const formData = new FormData();
      formData.append('file', input.imagen);
      formData.append('upload_preset', 'Noticias');
      formData.append('cloud_name', 'drpdobxfu');

      const { data } = await axios.post(
        'https://api.cloudinary.com/v1_1/drpdobxfu/image/upload',
        formData
      );
      setInput({ ...input, imagen: data.secure_url });
      console.log(input.imagen);
      setSuccessAlert('Imágen subida exitosamente.');
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
      
      setCanCreateNotice(true);
    } catch (error) {
      setErrorAlert(error.message);
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 5000);
      setCanCreateNotice(false);
    }
  }

  function handleImageChange(event){
    const file = event.target.files[0];   
          
    setImageURL(URL.createObjectURL(file));    

    setInput({
      ...input,
      imagen: file
    })   
   
  }
    const handleSelect=(e)=>{
     const idCategory= +allCategorias[e.target.value].id;     
     const nameCategory=allCategorias[e.target.value].name;   
     const obj= {id:idCategory,name:nameCategory}    
     const tieneID = category.some(e => e.id === obj.id)
      
     if(category.length>4){
       alert("Maximo 4 categorias")
     } else if(!tieneID){
      //se carga para renderizarlo abajo
       setCategory([
         ...category,
         {         
        id: idCategory,
        name:nameCategory
        }
      ])    
      }  
      console.log(category,"ver aqui");
      setError(validation(
        {
            ...input, 
            [e.target.name]: e.target.value
        })          
      )  
      
    }    

    const deleteCategory= (e)=>{
      console.log(e);
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
  

  const handleSubmit = (event) => {
   
    event.preventDefault();
    const form = document.getElementById('formulario');
    const ids = category.map((item) => item.id);
  console.log(ids, category, "ids categoryes en el handleSubmit");
    const body = {
      title: input.titulo,
      resume: input.resumen,
      content: input.descripcion,
      image: input.imagen,
      categoryIds: ids,
      active: true,
      user_id:userId
    };
    console.log(body,"body");   
    
    if (canCreateNotice) {
      try {
        dispatch(postNoticia(body));       
        form.reset();
        setImageURL('');

        setInput({
          titulo: '',
          resumen: '',
          detalle: '',
          imagen: '',
        });
        setCategory([]);
        setSuccessAlert('¡Noticia creada con éxito!');
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
        }, 5000);
      } catch (error) {
        setErrorAlert(error.message);
        setShowError(true);
        setTimeout(() => {
          setShowError(false);
        }, 5000);
      }
    } else {
      setErrorAlert('Faltó cargar la imágen.');
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 5000);
    }
  };

  const crearCategoria = (event) => {
    event.preventDefault();
    const name = input.crear;   
    setCrearCategory(name); 
    dispatch(postCategoria({ active: true, name }));  

    setInput({
      ...input,
      crear: "",
    });
 
    alert("Categoria creada con exito!")
    // setSuccessAlert('Categoria creada con exito!');
    // setShowSuccess(true);
    // setTimeout(() => {
    //   setShowSuccess(false);
    // }, 5000);
    
    dispatch(getAllCategories());
  };
  const [errorAlert, setErrorAlert] = useState('');
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successAlert, setSuccessAlert] = useState('');

  return (
    <div className='cont_general_noticia'>
      <div className='cont_form_div'>
          <form id="formulario" onSubmit={handleSubmit}>

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
            <TextField
              label="Título"
              helperText=" "
              type="text"
              name="titulo"
              value={input.titulo}
              required
              onChange={handleChange}
              fullWidth
              sx={{color:'red'}}                
            />
            {error.titulo && (
              <Typography variant="body1">{error.titulo}</Typography>
            )}

            <TextField
              label="Resumen"
              type="text"
              name="resumen"
              value={input.resumen}
              required
              onChange={handleChange}
              fullWidth
            />
            {error.resumen && (
              <Typography variant="body1">{error.resumen}</Typography>
            )}

            <div>
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
              {error.categoria && <p>{error.categoria}</p>}
            </div>

            <div className='map_category'>
              {category?.map((e, index) => {
                return (
                  <div  key={index} onClick={()=>deleteCategory(e)}>
                  {e.name? <Button className='category_selec_notices'>{e.name}</Button>:null}
                  </div>
                )
              })}
            </div>

            <br />
            <div className='cont_crearCate_form'>
              <TextField
                onChange={handleCategoryChange}
                label="Crear categoria"
                type="text"
                name="crear"
                sx={{ mr: 3 }}
              />
              <Button className='button_crear_cate' onClick={crearCategoria}>Crear</Button>
            </div>

            <br />

            <TextField label="Descripción"  type="text" name="descripcion" value={input.descripcion} required onChange={handleChange} />
            {error.descripcion && <Typography variant="body1">{error.descripcion}</Typography>}
            <br/>
            <br/>

            <div className='cont_selecImg_div'>
            <TextField type="file" name="imagen" accept="image/*" onChange={handleImageChange}/>
            <button className='button_subirImg_notices' onClick={submitImage}>Subir Imagen</button>
            </div>        
            
                          
              <img className='renderiza_img_notices' src={ imageURL? imageURL : imgDefault} alt="img" style={{ width: '300px', height: 'auto', objectFit: "cover"}}/>            

            <div className='div_submit_notice'>
            <Button className='button_submit_notices' type="submit" variant="outlined" value="Crear Noticia">Crear noticia</Button>
            </div>
          </form>
      </div>

  
        {/*------------------------- Previsualizar noticia ------------------------------------------------------------*/}
          <div className='cont_previsu_div'>       
            
            <Typography variant="headline">{input.titulo}</Typography>
            <br/>         

            <div className='visualiza_resumen_notice'>
              <Typography variant="body1" >{input.resumen}</Typography>
            </div>
            <br/>          

            <div>
            <img src={ imageURL? imageURL : imgDefault} alt="img" style={{ width: '300px', height: 'auto', objectFit: "cover"}}/>
            </div>   

          
              <div className='descripcion_previsualiza'>
                <Typography variant="headline" >{input.descripcion}</Typography>
              </div>
          

            <div className='category_previsualiza'>
              {category?.map((e,index)=>{
                return(
                  <div  key={index}>
                    {e.name? <p className='category_name_previsualiza'>#{e.name}</p>:null}
                  </div>
                )
              })}
            </div>      
        
          </div>
      
    </div>
           
     
    )
  }