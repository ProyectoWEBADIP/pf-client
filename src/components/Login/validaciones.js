

export default function Validation(date) {
    const error = {};

    //*------------------ Verificación si el nombre tiene símbolos o letras -----------!

    // const verificacionNombre = date.username.split(" ");
    // if (verificacionNombre.some((el) => /^[a-zA-Z]+$/.test(el))) {
    //   error.username = "Puede utilizar números y caracteres especiales";
    // }

    //*------------------ Verificación de la longitud del nombre ------------!

    if (date.username.length < 8 || date.username.length > 15) {
        error.username = "El nombre de usuario debe ser entre 8 y 15 caracteres";
    }

    //*------------------ Verificación de la longitud del apellido -----------!

    // if (date.apellido.length < 4 || date.apellido.length > 20) {
    //     error.apellido = "Ingrese su apellido";
    // }

    //*------------------- Verificación si el apellido tiene símbolos o letras -------!

    // const verificacionApellido = date.apellido.split(" ");
    // if (verificacionApellido.some((el) => !/^[a-zA-Z]+$/.test(el))) {
    //     error.apellido = "No puede ingresar números ni símbolos";
    // }

    //*------------------- Verificación de la fecha de nacimiento ----------!

    // const birthDate = new Date(date.fechaNacimiento);
    // const currentDate = new Date();
    // if (isNaN(birthDate) || birthDate > currentDate) {
    //     error.fechaNacimiento = "Ingrese una fecha de nacimiento válida";
    // }

    //*--------------- Verificación de la longitud del DNI ----------!!

    // if (date.DNI.length !== 8) {
    //     error.DNI = "Ingrese su DNI";
    // }

    //!*----------------- Verificación del formato del email --------- !!

    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(date.email)) {
        error.email = "Debe ingresar un correo electrónico correcto";
    }

    //*------------------- Verificación de coincidencia en contraseña ----------! 

    // if (date.contraseña !== date.verificacionContraseña) {
    //     error.verificacionContraseña = "Las contraseñas no coinciden";
    // }

    //*-----------------------------------------------------------!

    if (date.password.length < 8 || date.password.length > 15) {
        error.password = "Ingrese de 8 a no mas de 15";
    }

    //*---------------- Verificación de caracteres especiales en la contraseña ------- !

    const verificacion = date.password.split("");
    if (verificacion.every((el) => /^[a-zA-Z0-9]+$/.test(el))) {
        error.password = "Debe ingresar al menos un carácter especial";
    }

    return error;
}