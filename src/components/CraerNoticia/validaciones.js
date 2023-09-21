
export default function validation(input,name) {
    let error={}    
    
    // ------------------Longitud TITULO------------------!
  
    if(name==="titulo"){    
      
      if(input.titulo?.length <5 || input.titulo?.length> 40){
        error.titulo = "*El titulo debe tener entre 5 y 40 caracteres*"
      } else{
        error.titulo = ""
      }
    }
   
    // ----------Longitud RESUMEN-------------------------!
    if(name==="resumen"){
      if(input.resumen?.length<5 || input.resumen?.length>100){
        error.resumen = "*El resumen debe tener entre 5 y 100 caracteres*"
      }else{
        error.resumen = ""
      }
      
    }

    // ----------Longitud DESCRIPCION-------------------------!
    if(name==="descripcion"){
      if(input.descripcion?.length <20 || input.descripcion?.length > 2000){
        error.descripcion="*La descripcion debe tener entre 20 y 2000 caracteres*"
      }else{
        error.descripcion=""
  
      }
      
    }
    
     return error;
  }
  
  