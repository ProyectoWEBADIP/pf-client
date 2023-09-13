import { useState } from "react";
import { useDispatch } from "react-redux";
import { postRol } from "../../redux/rolesActions/rolesActions"; // Ajusta la ruta según tu estructura de archivos

export const CrearRol = () => {
   const dispatch = useDispatch();

   // Estado local
   const [rolData, setRolData] = useState({
      rol: "",
      description: "",
      active: false,
   });

   // Estados para errores de validación
   const [rolError, setRolError] = useState(
      "El campo 'Título' es obligatorio."
   );
   const [descriptionError, setDescriptionError] = useState(
      "El campo 'Descripción' es obligatorio."
   );


   const handleInputChange = (e) => {
      const { name, value } = e.target;
      setRolData({
         ...rolData,
         [name]: value,
      });

      // Validación en tiempo real
      if (name === "rol") {
         if (value.trim() === "") {
            setRolError("El campo 'Título' es obligatorio.");
         } else {
            setRolError(""); // No hay error en "Título"
         }
      } else if (name === "description") {
         if (value.trim() === "") {
            setDescriptionError("El campo 'Descripción' es obligatorio.");
         } else {
            setDescriptionError(""); // No hay error en "Descripción"
         }
      }
   };

   const handleCheckboxChange = () => {
      setRolData({
         ...rolData,
         active: !rolData.active,
      });
   };

   const handleCreateRol = () => {
      // Verifica si el campo "Título" (rol) está vacío
      if (rolData.rol.trim() === "") {
         setRolError("El campo 'Título' es obligatorio.");
      } else {
         setRolError(""); // No hay error en "Título"
      }

      // Verifica si el campo "Descripción" está vacío
      if (rolData.description.trim() === "") {
         setDescriptionError("El campo 'Descripción' es obligatorio.");
      } else {
         setDescriptionError(""); // No hay error en "Descripción"
      }

      // Si no hay errores en ningún campo, envía la solicitud para crear el rol
      if (!rolError && !descriptionError) {
         try {
            dispatch(postRol(rolData));

            // Limpia los campos después de crear el rol
            setRolData({
               rol: "",
               description: "",
               active: false,
            });

            // Restablece los mensajes de error
            setRolError("El campo 'Título' es obligatorio.");
            setDescriptionError("El campo 'Descripción' es obligatorio.");

            window.alert("El rol fue creado exitosamente.");
         } catch (error) {
            console.log(error);
         }
      }
   };

   return (
      <div>
         <h2>Crea un Rol</h2>
         <input
            type="text"
            name="rol"
            placeholder="Título"
            value={rolData.rol}
            onChange={handleInputChange}
         />
         {rolError && <p className="error-message">{rolError}</p>}
         <br />
         <input
            type="text"
            name="description"
            placeholder="Descripción"
            value={rolData.description}
            onChange={handleInputChange}
         />
         {descriptionError && (
            <p className="error-message">{descriptionError}</p>
         )}
         <label>
            <br />
            <input
               type="checkbox"
               name="active"
               checked={rolData.active}
               onChange={handleCheckboxChange}
            />
            Activo
         </label>
         <br />
         <button onClick={handleCreateRol}>Crear Rol</button>
      </div>
   );
};
