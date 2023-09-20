export default function Validation(data) {
  const errors = {};

  // Verificación de nombre de usuario
  if (data.username.trim() === "") {
    errors.username = "El nombre de usuario es obligatorio.";
  } else if (data.username.length < 8 || data.username.length > 15) {
    errors.username =
      "El nombre de usuario debe tener entre 8 y 15 caracteres.";
  }

  // Verificación de correo electrónico
  if (data.email.trim() === "") {
    errors.email = "El correo electrónico es obligatorio.";
  } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(data.email)) {
    errors.email = "Debe ingresar un correo electrónico válido.";
  }

  // Verificación de contraseña fuerte
  if (data.password.trim() === "") {
    errors.password = "La contraseña es obligatoria.";
  } else if (data.password.length < 8 || data.password.length > 15) {
    errors.password = "La contraseña debe tener entre 8 y 15 caracteres.";
  } else if (
    !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(
      data.password
    )
  ) {
    errors.password =
      "La contraseña debe incluir al menos una letra mayúscula, una letra minúscula, un número y un carácter especial.";
  }

  // Otras validaciones pueden agregarse aquí, como la confirmación de contraseña, etc.

  return errors;
}
