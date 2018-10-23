import React from "react";
import { Form } from "semantic-ui-react";
import { EnhancedCustomInputContainer as CustomInput } from "../../components/Input";
import { EnhancedCustomTextAreaContainer as CustomTextArea } from "../../components/TextArea";
import { EnhancedFileInputContainer as FileInput } from "../../components/FileInput";
import { EnhancedSaveButtonContainer as CustomButton } from "../../components/SaveButton";
import { EnhancedBackButtonContainer as Back } from "../../components/BackButton";
import { ToastContainer } from "react-toastify";
import { EnhancedDeleteButtonContainer as Delete } from "../../components/DeleteButton";
import { EnhancedCustomToggleContainer as Toggle } from "../../components/Toggle";
import "react-toastify/dist/ReactToastify.css";

export var MainInput = ({ name, id, item }) => (
  <div className="MainInput">
    {"Pagina para subir informacion de Obras"}
    <br />
    {"Complete los campos que quiera editar y haga click en editar informacion"}
    <hr />
    {`Usted esta editando la obra : ${name}`}
    <hr />

    <CustomInput
      className={"CustomInput"}
      id={"location_name"}
      label="Obra"
      placeholder="Obra..."
      value={(item && item.location_name) || ""}
      piece={id}
      edit={true}
    />

    <CustomInput
      className={"CustomInput"}
      id={"posifi_id"}
      label="Posifi ID"
      placeholder="Posifi Id..."
      value={(item && item.posifi_id) || ""}
      piece={id}
      edit={true}
    />

    <Form>
      <CustomTextArea
        id={"description"}
        placeholder="Descripcion"
        style={{ minHeight: 100 }}
        value={(item && item.description) || ""}
        piece={id}
        edit={true}
      />
    </Form>

    <Toggle
      id={"is_blind_path"}
      piece={id}
      edit={true}
      value={(item && item.is_blind_path) || false}
      text={"Es del recorrido para ciegos?"}
    />

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
      idType={"audioName"}
      icon={"headphones"}
      text={"Elegir Audio"}
      accept={"audio/*"}
      id={"audio"}
    />

    <CustomButton>Editar Informacion</CustomButton>
    <Delete>Eliminar</Delete>

    <Back>Atras</Back>
    <ToastContainer />
  </div>
);
