/* eslint-disable no-unused-vars */
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
        alert(error.message);
      }
    }
  };

  const handlerSubmit = (e) => {
    e.preventDefault();
    const tieneErrors = Object.keys(error);

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
        categoryIds: data.categories.map((el) => el.id),
      };
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

      if (arrayBody.join(" ") !== arrayNoticia.join(" ")) {
        dispatch(updateNoticia(id, body));
        navigate("/");
      } else {
        alert("No se encontraron cambios");
      }
    } else {
      alert("Verifique los campos");
    }
  };

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
    const idCategorie = addCategorie;

    setInput({
      ...input,

      categories: [...input.categories, addCategorie[0]],
    });
  };

  return (
    <Box>
        <Grid container justifyContent="center" >
          <Grid item sm={5} my={4} mr={2}>
            <Box
            sx={{
              boxShadow: 3,
              bgcolor: (theme) =>
                theme.palette.mode === "dark" ? "#101010" : "#fff",
              color: (theme) =>
                theme.palette.mode === "dark" ? "grey.300" : "grey.800",
              p: 1,
              m: 1,
              borderRadius: 2,
              textAlign: "center",
              fontSize: "0.875rem",
              fontWeight: "700",
              padding: "40px",
            }}
            >
              <Typography variant="h4" fontWeight="bold">Editor de noticias</Typography>
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

              <Box sx={{mt: 2}}>
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
              </Box>
              <Box>
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
                </Box>
              <Typography variant="h6" fontWeight="bold" sx={{ mt : 2 }}>
                Categorias:
              </Typography>
              {error.categories ? (
                <Typography color="error">{error.categories}</Typography>
              ) : null}

              <div>
                {input.categories?.map((el) => (
                  <Button
                    key={el.id}
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
                <Typography variant="h6" fontWeight="bold">
                  Agregar una nueva categoria:
                </Typography>
                <NativeSelect onChange={handleAddCategorie} sx={{mt : 2}}>
                  {globalCategories?.map((el) => (
                    <option key={el.id} value={el.id}>
                      {el.name}
                    </option>
                  ))}
                </NativeSelect>
              </Box>
              <Box sx={{mt : 2}}>
                <Typography variant="body1" fontWeight="bold">
                  Editar imagen:
                </Typography>
                <Box sx={{mt : 2}}>
                {input.image !== "" ? (
                  <img
                    src={input?.image}
                    alt="Imagen"
                    style={{ maxWidth: "200px", maxHeight: "200px" }}
                  />
                ) : (
                  <input
                    type="File"
                    required
                    onChange={(event) => setNewImage(event.target.files[0])}
                  />
                )}
                </Box>

              </Box>
              {input.image !== "" ? (
                <Button
                  variant="contained"
                  onClick={() => setInput({ ...input, image: "" })}
                >
                  <ClearIcon></ClearIcon>
                </Button>
              ) : (
                <Button onClick={() => handlerSubmitImage()} sx={{mt : 2}}>
                  Subir imagen
                </Button>
              )}
            </Box>
          </Grid>
          <Grid sm={5} my={4} ml={2}>
            <Box
              sx={{
                boxShadow: 3,
                bgcolor: (theme) =>
                  theme.palette.mode === "dark" ? "#101010" : "#fff",
                color: (theme) =>
                  theme.palette.mode === "dark" ? "grey.300" : "grey.800",
                p: 1,
                m: 1,
                borderRadius: 2,
                textAlign: "center",
                fontSize: "0.875rem",
                fontWeight: "700",
                padding: "40px",
              }}
              
            >
              <Typography variant="h4" fontWeight="bold">
                Así quedaría la noticia
              </Typography>

              <Box sx={{mt : 2}}>
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
        <Box sx={{ mt: 5, display: "flex", justifyContent: "center" }}>
          <Button onClick={handlerSubmit} variant="contained">Enviar Edición</Button>
        </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>

    </Box>
  );
}