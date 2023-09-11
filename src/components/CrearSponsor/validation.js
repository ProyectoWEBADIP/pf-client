export default function(input){
    let error={};
    //----------------NOMBRE-------------------------

    if(input.nombre?.length <3 || input.nombre?.length>15){
        error.nombre="*El nombre debe tener 3 y 15 caracteres*"
    }
    if(input.nombre?.length<=0){
        error.nombre="*Este campo es obligatorio*"
    }

    //-----------CATEGORIA-----------------
    if(input.categoria==0 || input.categoria==""){
        error.categoria="*Este campo es obligatorio*"
    }
    
    return error;
}