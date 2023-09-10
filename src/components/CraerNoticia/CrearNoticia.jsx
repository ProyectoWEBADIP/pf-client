import { useState } from "react";
import validation from "./validaciones";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { postNoticia } from "../../redux/noticiasActions/noticiasActions";
// import { postCategoria } from "../../redux/categoriasActions/categoriasActions";
import { useSelector } from "react-redux";
import { getAllCategories, postCategoria } from "../../redux/categoriasActions/categoriasActions";
import { Box, Container} from "@mui/system";
import { TextField, Typography } from "@mui/material";
import { Button} from "@mui/base";
import { Grid} from '@mui/material';



export default function CrearNoticia ()  {


  
  const imgDefault = "https://cdn-icons-png.flaticon.com/256/20/20079.png";

  let allCategorias= useSelector(state =>state.categorias)  
  

    const [ input, setInput ] = useState({titulo: "", resumen: "", descripcion: "", imagen:""});
    const [ error, setError ] = useState({});
    const [imageURL, setImageURL] = useState(""); //url
    const [category,setCategory]=useState([{id:"",name:""}]);
    const [crearCategory,setCrearCategory]=useState("");
    const [cloudinary,setCloudinary]=useState(false);
    
  
     
  const dispatch=useDispatch();

  useEffect(()=>{
    
    dispatch(getAllCategories())
    
  },[dispatch]
    
  )

    const handleChange= (event)=>{  
      event.preventDefault();  
      
      setInput({
        ...input,
        [event.target.name] : event.target.value
        
      })     
      
      setError(validation(
        {
            ...input,
            [event.target.name]: event.target.value
        })          
      )   
          
      }

      const handleCategoryChange=(event)=>{
        event.preventDefault(); 
        setInput({
          ...input,
          [event.target.name] : event.target.value
          
        }) 
      }
    
    const submitImage= async (e)=>{
      e.preventDefault();       

      try {        
        const formData = new FormData()
        formData.append("file",input.imagen)
        formData.append("upload_preset", "Noticias")
        formData.append("cloud_name","drpdobxfu")

        const {data}= await axios.post("https://api.cloudinary.com/v1_1/drpdobxfu/image/upload",formData)
        setInput({...input, imagen: data.secure_url})   
        setCloudinary(true)  

        alert("Subida con  exito!")
        console.log(input.imagen);
      } catch (error) {
        console.log(error);
      }
    }

    const handleImageChange=(event)=>{
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
      
     if(!tieneID){
      //se llena para renderizarlo abajo
       setCategory([
         ...category,
         {         
        id: idCategory,
        name:nameCategory
        }
      ])    
      }
           
     
      setError(validation(
        {
            ...input,
            [e.target.name]: e.target.value
        })          
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

    const handleSubmit = (event)=>{
      // const arr= Object.keys(error)
      event.preventDefault();
      const form= document.getElementById("formulario")  
      const ids =category.map(item => item.id);
           
      
      const body={
        title:input.titulo,
        resume:input.resumen,                  
        content:input.descripcion,    
        image:input.imagen,
        categoryIds:ids,
        active:true
      }      
      
      if(cloudinary===true){        
        dispatch(postNoticia(body))                
        form.reset();  
        setImageURL("")

        setInput({
          titulo:"",
          resumen:"",       
          detalle:"",
          imagen:""
        })
        setCategory([])
        alert("Noticia creada con exito!")
      } else{
        alert("No olvides subir tu imagen a la nube!")
      }
           
    }
    
    const crearCategoria= (event)=>{
      event.preventDefault()
      
      const name= input.crear;   
      
       
      setCrearCategory(name)

       setInput({
         ...input,
         categoria:name,        
        })     
        
      dispatch(postCategoria({active:true,name}))  
      alert("Categoria creada con exito!")
      dispatch(getAllCategories())   
    
    }    
   
    
    return (
      
      // <Container  bgcolor="green"  sx={{justifyContent:"center",display:"flex",flexDirection:"column",alignItems:"center"}}> 
      <Grid   fullWidth container spacing={2} sx={{justifyContent:"center",display:"flex"}}>
      <Grid item xs={12} sm={6} >
      <Box  borderRadius={[5, 5, 5, 5]}  bgcolor="#FBEED8"   alignItems="center"  component="form" id="formulario"  onSubmit={handleSubmit} >
        <TextField label="Título" helperText=" " type="text" name="titulo" value={input.titulo} required onChange={handleChange} fullWidth />
        {error.titulo && <Typography variant="body1">{error.titulo}</Typography>}
        
        <TextField label="Resumen" type="text" name="resumen" value={input.resumen} required onChange={handleChange} fullWidth  />
        {error.resumen && <Typography variant="body1">{error.resumen}</Typography>}

        <div>                                 
            <select value="def" onChange={handleSelect} name="categoria" >
              <option name="categoria" value="def">Seleccione categoria</option>

              {allCategorias?.map((c,index)=>{
                return(
                  <option key={c.id} value={index}>{c.name}</option>
                )
              })}             
            </select>  
            {error.categoria && <p>{error.categoria}</p>}           
        </div>

 
        <div>
          {category?.map((e,index)=>{
              return(
                <div key={index}>
                  <p>{e.name}</p>
                  <button onClick={()=>deleteCategory(e)}>X</button>
                </div>
              )
            })}
          </div>

          <br />
          <div style={{padding: "10px", gap: "10px" }}>
          <TextField onChange={handleCategoryChange} label="Crear categoria" type="text" name="crear" sx={{mr: 3}} />
          <Button onClick={crearCategoria}>Crear</Button>

          </div>

          <br/>

        <TextField label="Descripción"  type="text" name="descripcion" value={input.descripcion} required onChange={handleChange} fullWidth />
        {error.descripcion && <Typography variant="body1">{error.descripcion}</Typography>}
        <br/>
        <br/>
        <TextField type="file" name="imagen" accept="image/*" onChange={handleImageChange}/>
      
        <div className="mb-4" style={{margin: "10px"}}>
            <button onClick={submitImage}>Subir Imagen</button>
            {error.descripcion && <p>{error.imagen}</p>}                      
        </div>  
          <br/>        

          <Container sx={{maxHeight: 500, maxWidth: 300}}>
          <img src={ imageURL? imageURL : imgDefault} alt="img" style={{ width: '300px', height: 'auto', objectFit: "cover"}}/>      
              
          </Container>
          
          

        <Button type="submit" variant="outlined" value="Crear Noticia">Crear noticia</Button>

      </Box>
      </Grid>
        {/* Previsualizar noticia */}
        <Grid  item xs={12} sm={6} alignItems="center">
        <Box borderRadius={[5, 5, 5, 5]}  bgcolor="#FBEED8"  >
          <div>
          
          <Typography variant="headline">{input.titulo}</Typography>
          <br/>
          

          <Typography variant="body1" >{input.resumen}</Typography>
          <br/>

          

          <div>
          <img src={ imageURL? imageURL : imgDefault} alt="img" style={{ width: '300px', height: 'auto', objectFit: "cover"}}/>      

          </div>

          
          <Typography variant="headline" >{input.descripcion}</Typography>

          <div>
            {category?.map((e,index)=>{
              return(
                <div key={index}>
                  <p>{e.name}</p>
                </div>
              )
            })}
          </div>

          </div>
        </Box>
        </Grid>
        </Grid>   
      //  </Container>
           
     
    )
  }
  
