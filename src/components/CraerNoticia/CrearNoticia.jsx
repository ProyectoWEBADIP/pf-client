import { useState } from "react";
import validation from "./validaciones";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { postNoticia } from "../../redux/noticiasActions/noticiasActions";
// import { postCategoria } from "../../redux/categoriasActions/categoriasActions";
import { useSelector } from "react-redux";
import { getAllCategories, postCategoria } from "../../redux/categoriasActions/categoriasActions";




export default function CrearNoticia ()  {


  
  const imgDefault = "https://static.vecteezy.com/ti/vetor-gratis/t2/550980-de-icone-de-usuario-gratis-vetor.jpg";

  let allCategorias= useSelector(state =>state.categorias)
  

  

    const [ input, setInput ] = useState({titulo: "", resumen: "", categoria:["Femenino","Masculino","Infantiles","Recreativo","Inferiores"], descripcion: "", imagen: ""});

    const [ error, setError ] = useState({});
    const [imageURL, setImageURL] = useState(""); //url
    const [category,setCategory]=useState([]);
    

     
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
    
    const submitImage= async (e)=>{
      e.preventDefault();   

      try {
        
        const formData = new FormData()
        formData.append("file",input.imagen)
        formData.append("upload_preset", "Noticias")
        formData.append("cloud_name","drpdobxfu")

        const {data}= await axios.post("https://api.cloudinary.com/v1_1/drpdobxfu/image/upload",formData)
        setInput({...input, imagen: data.secure_url})
        
        alert("Subida con exito!")
        
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
      const selecCategory= e.target.value   
              
        
      if(!category.includes(selecCategory)){
        setCategory([
          ...category,
          selecCategory
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

      setCategory([...categoryFilter])
      
      if(categoryFilter.length==0){
        setError({
          ...error,
          categoria:"**Campo obligatorio"
        }        
        )
      }

    }

    const handleSubmit = (event)=>{
      const arr= Object.keys(error)
      event.preventDefault();

      const body={
        title:input.titulo,
        resume:input.resumen,
        categorie:category,    
        content:input.descripcion,    
        image:input.imagen
      }       
      
      if(arr.length===0){
        dispatch(postNoticia(body))
      }
      setInput({
        titulo:"",
        resumen:"",
        categoria:[],
        detalle:"",
        imagen:""
      })
      setCategory([])
    }
    
    const agregarCategoria= (event)=>{
      event.preventDefault()
      const name= input.crear;   
       
      const categoriasAct= [...input.categoria, name]      

      setInput({
        ...input,
        categoria:categoriasAct,
        crear:""
      })  

      dispatch(postCategoria({active:true,name}))  
      alert("Categoria creada con exito!")
      dispatch(getAllCategories())
      

       
    
    }
    
    const handleCatChange =(event)=>{
      event.preventDefault();  
      
      setInput({
        ...input,
        [event.target.name] : event.target.value
        
      })
      
    }
    return (
      <div className="container mx-auto">
        <form onSubmit={handleSubmit} className="bg-slate-300 p-4 text-center">
        <br/>

          <div className="mb-4">
          <label htmlFor="titulo" className="block mb-1">
            Titulo 
          </label>
          <input  onChange={handleChange} value={input.titulo} className="w-full px-4 py-2 border rounded" type="text" name="titulo"/>
          {error.titulo && <p>{error.titulo}</p>}          
          </div>

          <br/>  

          <div className="mb-4"> 
            <label className="block mb-1" htmlFor="resumen">Resumen de noticia:</label>
            <input onChange={handleChange}  value={input.resumen} className="w-full px-4 py-2 border rounded" type="text" name="resumen" />
            {error.resumen && <p>{error.resumen}</p>}

          </div>
          <br/>

          <div>                                 
            <select value="def" onChange={handleSelect} name="categoria" >
              <option value="def">Seleccione categoria</option>

              {allCategorias?.map((c)=>{
                return(
                  <option key={c.id} value={c.name}>{c.name}</option>
                )
              })}             
            </select>  
            {error.categoria && <p>{error.categoria}</p>}           
          </div>

          <div>
          {category?.map((e)=>{
              return(
                <div key={e}>
                  <p>{e}</p>
                  <button onClick={()=>deleteCategory(e)}>X</button>
                </div>
              )
            }) }
          </div>
          <br />
          <div>
            <label htmlFor="crear">Crear categoria</label>
            <input onChange={handleCatChange} type="text" name="crear"/>
            <button onClick={agregarCategoria}>Crear</button>
          </div>

          <br/>
          <div className="mb-4">
            <label className="block mb-1" htmlFor="descripcion">
              Descripcion:
            </label>
            <textarea onChange={handleChange} value={input.descripcion} className="w-full px-4 py-2 border rounded" type="text" name="descripcion"/>
            {error.descripcion ? <p>{error.descripcion}</p> : null}
          </div>             
          <br/>

          <div className="mb-4">
            <label className="block mb-1" htmlFor="imagen">
              Foto:
            </label>

            <input className="w-full px-4 py-2 border rounded" 
              type="file" 
              name="imagen" 
              accept="image/*"   
              onChange={handleImageChange}                               
            />  
            <button onClick={submitImage}>Subir Imagen</button>
            {error.descripcion && <p>{error.imagen}</p>}                      
          </div>          

          <div>
          <img src={ imageURL? imageURL : imgDefault} alt="img" />      
          {error.imagen && <p>{error.imagen}</p>}      
          </div>
          
          <br/>
  
          

          <button
          type="submit" 
          value="Crear Noticia" 
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"          
          >Crear noticia</button>
          
          
          
  
        </form>
      </div>
    )
  }
  
