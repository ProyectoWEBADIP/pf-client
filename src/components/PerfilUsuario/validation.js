export default function (input) {
  let error = {};

  if (input.firstName.length === 0) {
    error.firstName = 'Ingrese su nombre, por favor.';
  } else{
    error.firstName=''
  }
  if (input.lastName.length === 0) {
    error.lastName = 'Ingrese su apellido, por favor.';
  }else{
    error.lastName=''
  }
  if (input.birthDate.length === 0) {
    error.birthDate = 'Ingrese su fecha de nacimiento.';
  }else {
    error.birthDate=''
  }
  if (input.phone.length === 0) {
    error.phone = 'Ingrese su número de teléfono.';
  }else{
    error.phone=''
  }
  if (input.dni.length === 0) {
    error.dni = 'Ingrese su número de DNI.';
  }else{
    error.dni = ''
  }

  return error;
}
