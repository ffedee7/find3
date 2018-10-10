import React from "react";
import { EnhancedCustomInputContainer as CustomInput } from "../../components/Input";
import { EnhancedLoginButtonContainer as Button } from "../../components/LoginButton";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export var Login = () => (
  <div className="wrapper">
    <div className="form-signin">
      <h2 className="form-signin-heading">Por favor iniciar sesion</h2>

      <CustomInput id={"user"} label="Usuario" placeholder="Usuario..." />

      <CustomInput
        id={"password"}
        label="Contraseña"
        placeholder="Constraseña..."
      />

      <Button>Login</Button>
      <ToastContainer />
    </div>
  </div>
);
