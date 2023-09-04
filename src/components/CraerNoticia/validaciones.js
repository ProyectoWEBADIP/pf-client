
export default function validation(date) {
    const error={}
    console.log("entre")
    //------------------Longitud titulo------------------!
    if(date.titulo?.length <5 || date.titulo?.length> 40){
      error.titulo = "*El titulo debe tener entre 5 y 40 caracteres*"
    } 
  
    //----------Longitud resumen-------------------------!
    if(date.resumen?.length<5 || date.resumen?.length>100){
      error.resumen = "*El resumen debe tener entre 5 y 100 caracteres*"
    }
  
    //------------Longiutd descripcion-------------------!
  
    if(date.descripcion?.length <20 || date.descripcion?.length > 2000){
      error.descripcion="*La descripcion debe  tener entre 20 y 2000 caracteres*"
    }
    //--------------Select campo obligatorio-------------!

    
     return error;
  }
  
  