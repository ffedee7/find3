import React from "react";
import { Form } from "semantic-ui-react";
import { EnhancedCustomInputContainer as CustomInput } from "../../components/Input";
import { EnhancedCustomTextAreaContainer as CustomTextArea } from "../../components/TextArea";
import { EnhancedFileInputContainer as FileInput } from "../../components/FileInput";
import { EnhancedSaveButtonContainer as CustomButton } from "../../components/SaveButton";
import { EnhancedBackButtonContainer as Back } from "../../components/BackButton";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { EnhancedCustomToggleContainer as Toggle } from "../../components/Toggle";
export var Create = () => (
  <div className="MainInput">
    {"Pagina para subir informacion de Obras"}
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

    <Toggle text={'Es del recorrido para ciegos?'}/>
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
    <CustomButton id={"create"}>Subir Informacion</CustomButton>
    <Back>Atras</Back>
    <ToastContainer />
  </div>
);
