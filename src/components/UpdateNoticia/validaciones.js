export default function validation(input) {
    const error={}    
    
    // ------------------Longitud TITULO------------------!
    if(input.title?.length <5 || input.title?.length> 40){
      error.title = "*El titulo debe tener entre 5 y 40 caracteres*"
    } 
    if(input.title.length <= 0){
      error.title= "*Este campo es obligatorio*"      
    } 
   
    // ----------Longitud RESUMEN-------------------------!
    if(input.resume.length<5 || input.resume.length>100){
      error.resume = "*El resumen debe tener entre 5 y 100 caracteres*"
    }
    if(input.resume.length <=0){
      error.resume= "*Este campo es obligatorio*"   
    }

    // ----------Longitud DESCRIPCION-------------------------!
  
    if(input.content.length <20 || input.content.length > 2000){
      error.content ="*La descripcion debe tener entre 20 y 2000 caracteres*"
    }
    if(input.content.length <=0){
      error.content = "*Este campo es obligatorio*"   
    }
    if(input.categories.length == 0){
      error.categories = "Debe ingresar al menos una categoria"
    }
    
     return error;
  }