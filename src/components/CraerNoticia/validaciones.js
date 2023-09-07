
export default function validation(input) {
    let error={}    
    
    // ------------------Longitud TITULO------------------!
    if(input.titulo?.length <5 || input.titulo?.length> 40){
      error.titulo = "*El titulo debe tener entre 5 y 40 caracteres*"
    } 
    if(input.titulo?.length <= 0){
      error.titulo= "*Este campo es obligatorio*"      
    } 
   
    // ----------Longitud RESUMEN-------------------------!
    if(input.resumen?.length<5 || input.resumen?.length>100){
      error.resumen = "*El resumen debe tener entre 5 y 100 caracteres*"
    }
    if(input.resumen?.length <=0){
      error.resumen= "*Este campo es obligatorio*"   
    }

    // ----------Longitud DESCRIPCION-------------------------!
  
    if(input.descripcion?.length <20 || input.descripcion?.length > 2000){
      error.descripcion="*La descripcion debe tener entre 20 y 2000 caracteres*"
    }
    if(input.descripcion?.length <=0){
      error.descripcion= "*Este campo es obligatorio*"   
    }   
    
    
     return error;
  }
  
  