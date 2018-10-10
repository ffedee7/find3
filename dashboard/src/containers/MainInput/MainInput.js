import React from "react";
import { Form } from "semantic-ui-react";
import { EnhancedCustomInputContainer as CustomInput } from "../../components/Input";
import { EnhancedCustomTextAreaContainer as CustomTextArea } from "../../components/TextArea";
import { EnhancedFileInputContainer as FileInput } from "../../components/FileInput";
import { EnhancedSaveButtonContainer as CustomButton } from "../../components/SaveButton";
import { EnhancedBackButtonContainer as Back } from "../../components/BackButton";
import { ToastContainer } from "react-toastify";
import { EnhancedDeleteButtonContainer as Delete } from "../../components/DeleteButton";
import "react-toastify/dist/ReactToastify.css";

export var MainInput = ({ name, id }) => (
  <div className="MainInput">
    {"Pagina para subir informacion de Obras"}
    <br />
    {"Complete los campos que quiera editar y haga click en editar informacion"}
    <hr />
    {`Usted esta editando la obra : ${name}`}
    <hr />

    <CustomInput
      className={"CustomInput"}
      id={"piece"}
      label="Obra"
      placeholder="Obra..."
    />

    <CustomInput
      className={"CustomInput"}
      id={"posifiId"}
      label="Posifi ID"
      placeholder="Posifi Id..."
    />

    <Form>
      <CustomTextArea
        id={"description"}
        placeholder="Descripcion"
        style={{ minHeight: 100 }}
      />
    </Form>
    <FileInput
      className={"FileInput"}
      placeholder={"Imagenes..."}
      idType={"imageName"}
      icon={"image"}
      text={"Elegir Imagenes"}
      accept={"image/*"}
      id={"image"}
    />
    <FileInput
      className={"FileInput"}
      placeholder={"Audios..."}
      idType={"audiName"}
      icon={"headphones"}
      text={"Elegir Audio"}
      accept={"audio/*"}
      id={"audio"}
    />

    <CustomButton>Editar Informacion</CustomButton>
    <Delete >Eliminar</Delete>

    <Back>Atras</Back>
    <ToastContainer />
  </div>
);
