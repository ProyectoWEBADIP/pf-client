import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import validaciones from "./validaciones";
import {
  getNoticeById,
  updateNoticia,
} from "../../redux/noticiasActions/noticiasActions";
import NoticiaDetail from "../detailNoticia/NoticiaDetail";
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  InputAdornment,
  Select,
  NativeSelect,
  Container,
} from "@mui/material";
import axios from "axios";
import SelectInput from "@mui/material/Select/SelectInput";
import { getAllCategories } from "../../redux/categoriasActions/categoriasActions";
import ClearIcon from "@mui/icons-material/Clear";
import { useNavigate } from "react-router-dom";

export default function UpdateNoticia() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [input, setInput] = useState({});
  const [newImage, setNewImage] = useState({});

  const data = useSelector((state) => state.noticeById);
  const globalCategories = useSelector((state) => state.categorias);
  const response = useSelector((state) => state.updateNoticia);
 

  useEffect(() => {
    dispatch(getNoticeById(id));
    dispatch(getAllCategories());
  }, [dispatch, id]);

  useEffect(() => {
    setInput({
      title: data.title || "",
      resume: data.resume || "",
      content: data.content || "",
      image: data.image || "",
      categories: data.categories || [],
    });
  }, [data]);

  const [error, setError] = useState({});
  // console.log(newImage);
  const handleChange = (event) => {
    event.preventDefault();
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
    setError(
      validaciones({
        ...input,
        [event.target.name]: event.target.value,
      })
    );
  };
  const handlerSubmitImage = async () => {
    if (input.image !== "") {
      alert("Debe subir solo una imagen");
    }

    if (input.image === "" && newImage !== "") {
      try {
        const formData = new FormData();
        formData.append("file", newImage);
        formData.append("upload_preset", "Noticias");
        formData.append("cloud_name", "drpdobxfu");

        const { data } = await axios.post(
          "https://api.cloudinary.com/v1_1/drpdobxfu/image/upload",
          formData
        );
        setInput({ ...input, image: data.secure_url });

        alert("Subida con exito!");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handlerSubmit = (e) => {
    e.preventDefault();
    const tieneErrors = Object.keys(error);    
    // console.log("======>",typeof arrayInput.join("")); 
 
    if (tieneErrors.length === 0) {
      let body = {
        title: input.title,
        resume: input.resume,
        content: input.content,
        image: input.image,
        categoryIds: input.categories.map((el) => el.id),
      };
      let noticia = {
        title: data.title,
        resume: data.resume,
        content: data.content,
        image: data.image,
        categoryIds: data.categories.map((el) => el.id)
      }
    let arrayNoticia = [];
      for (let key in noticia) {
         arrayNoticia.push(key); 
         arrayNoticia.push(noticia[key]); 
      }
    let arrayBody = [];
    for (let key in body) {
       arrayBody.push(key); 
       arrayBody.push(body[key]); 
    }     
      
     
      if(arrayBody.join(" ") !== arrayNoticia.join(" ")) {
        dispatch(updateNoticia(id, body));
        navigate("/");
      } else {
        alert("No se encontraron cambios")
      }
    } else {
      alert("Verifique los campos");
    }
}

  const handlerDeleteCategories = (id) => {
    setInput({
      ...input,
      categories: input.categories.filter((el) => el.id !== id),
    });
  };
  const handleAddCategorie = (e) => {
    const addCategorie = globalCategories.filter(
      (el) => el.id == e.target.value
    );
    // console.log("addCategorie ==> ", addCategorie);
    const idCategorie = addCategorie;
    // console.log("categoria a agregar???>", addCategorie);

    setInput({
      ...input,

      categories: [...input.categories, addCategorie[0]],
    });
  };

  // console.log("inputs ===>", input);
  // console.log("errors ==>", error);
  // console.log("categories ==>", input.categories);
  return (
    <Container>
      <Grid container justifyContent="center" spacing={2}>
        <Grid item xs={12} boxShadow={{ boxShadow: 3 }} sm={6}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center", // Centrar horizontalmente
              textAlign: "center", // Centrar texto horizontalmente
            }}
          >
            <Typography>Editor de noticias</Typography>
            <Box>
              {error.title ? (
                <Typography color="error">{error.title}</Typography>
              ) : null}
              <br />
              <TextField
                name="title"
                value={input.title}
                onChange={handleChange}
                required
                fullWidth
                label="Titulo"
                focused
              />
            </Box>
            {error.resume ? (
              <Typography color="error">{error.resume}</Typography>
            ) : null}
            <TextField
              name="resume"
              value={input?.resume}
              onChange={handleChange}
              required
              fullWidth
              label="Resumen"
              focused
            />
            {error.content ? (
              <Typography color="error">{error.content}</Typography>
            ) : null}
            <br />
            <TextField
              id="filled-multiline-static"
              multiline
              rows={6}
              onChange={handleChange}
              variant="filled"
              value={input?.content}
              fullWidth
              name="content"
              required
              label="Contenido"
              focused
            />

            <Typography variant="body1" fontWeight="bold">
              Categorias:
            </Typography>
            {error.categories ? (
              <Typography color="error">{error.categories}</Typography>
            ) : null}

            <div>
              {input.categories?.map((el) => (
                <Button key={el.id}
                  variant="outlined"
                  size="xs"
                  sx={{
                    fontSize: "10px",
                    alignContent: "center",
                    margin: "5px",
                  }}
                  type="button"
                  onClick={() => handlerDeleteCategories(el.id)}
                >
                  Eliminar categoria {el.name}
                </Button>
              ))}
            </div>

            <br />
            <Box>
              <Typography variant="body1" fontWeight="bold">
                Agregar una nueva categoria:
              </Typography>
              <NativeSelect onChange={handleAddCategorie}>
                {globalCategories?.map((el) => (
                  <option key={el.id} value={el.id}>
                    {el.name}
                  </option>
                ))}
              </NativeSelect>
            </Box>
            <Box>
              <Typography variant="body1" fontWeight="bold">
                Editar imagen:
              </Typography>
              {input.image !== "" ? (
                <img
                  src={input?.image}
                  alt="Imagen"
                  style={{ maxWidth: "200px", maxHeight: "200px" }}
                />
              ) : (
                <input
                  type="File"
                  margin="5px"
                  required
                  onChange={(event) => setNewImage(event.target.files[0])}
                />
              )}
              <br />
            </Box>
            {input.image !== "" ? (
              <Button
                variant="contained"
                onClick={() => setInput({ ...input, image: "" })}
              >
                <ClearIcon></ClearIcon>
              </Button>
            ) : (
              <Button onClick={() => handlerSubmitImage()}>Subir imagen</Button>
            )}
          </Box>
        </Grid>
        <Grid item boxShadow={{ boxShadow: 3 }} xs={12} sm={6}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center", // Centrar horizontalmente
              textAlign: "center", // Centrar texto horizontalmente
            }}
          >
            <Typography variant="body2" fontWeight="bold">
              Así quedaría la noticia
            </Typography>

            <Box>
              <Typography variant="h6" component="h1">
                {input.title}
              </Typography>
              <Typography variant="body1" component="p">
                {input.resume}
              </Typography>
              <hr />
              {input.image !== "" ? (
                <img
                  src={input.image}
                  alt="Imagen"
                  style={{ maxWidth: "200px", maxHeight: "200px" }}
                />
              ) : null}
              <hr />
              <Typography variant="body1" component="p">
                {input.content}
              </Typography>
              <Typography variant="body2" component="p">
                {input.date}
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Box sx={{ mt: 5, display: "flex", justifyContent: "center" }}>
        <button onClick={handlerSubmit}>Enviar Edición</button>
      </Box>
    </Container>
  );
}
