export default function(input,name){
    let error={};
    //----------------NOMBRE-------------------------
    if(name==='nombre'){
        if(input.nombre?.length <3 || input.nombre?.length>15){
            error.nombre="*El nombre debe tener 3 y 15 caracteres*"
        } else{
            error.nombre = ""
          }
    }      
    
    return error;
}