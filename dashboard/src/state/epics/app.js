import { from, of, empty, concat, iif } from "rxjs";
import { switchMap, catchError } from "rxjs/operators";
import { push } from "react-router-redux";
import { toast } from "react-toastify";
import AWS from "aws-sdk";
import cuid from "cuid";
import {
  APP_INIT,
  LOGIN_ERROR,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  SAVE_DATA_ERROR,
  SAVE_DATA_SUCCESS,
  CREATE_DATA_REQUEST,
  EDIT_DATA_REQUEST
} from "../actions";
import { ajax } from "rxjs/ajax";

export var init = $action =>
  $action.ofType(APP_INIT).switchMap(() => {
    var logged = localStorage.getItem("logged");
    if (logged === "false") {
      return toLoginPage();
    } else {
      return ajax({
        url: process.env.REACT_APP_API + "/pieces",
        method: "GET"
      })
        .switchMap(data => {
          return of({
            type: `POPULATE_DATA`,
            payload: data.response
          });
        })
        .catch(err => of({ type: "ERROR" }));
    }
  });

function toLoginPage() {
  return from([push("/auth")]);
}

export var login = ($action, store) =>
  $action
    .ofType(LOGIN_REQUEST)
    .delay(700)
    .switchMap(() => {
      var password = store.value.password;
      var user = store.value.user;
      if (user === "admin" && password === "admin") {
        localStorage.setItem("logged", true);
        return from([{ type: LOGIN_SUCCESS }, push({ pathname: "/" })]);
      } else {
        toast.error("Error de usuario/contraseña", {
          position: "top-right",
          autoClose: false,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
        });
        return from([
          { type: LOGIN_ERROR, payload: "Usuario o contraseña invalidos" }
        ]);
      }
    });

export var showMessage = $action =>
  $action.ofType(`SAVE_DATA_SUCCESS_MAIN`).switchMap(() => {
    toast.success("Datos subidos con exito", {
      position: "top-right",
      autoClose: false,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true
    });
    return of({ type: `POP_MESSAGE` });
  });

export var uploadInfo = ($action, store) => {
  return $action
    .ofType(CREATE_DATA_REQUEST)
    .delay(500)
    .switchMap(() => {
      var state = store.value;
      var s3bucket = new AWS.S3({
        accessKeyId: process.env.REACT_APP_IAM_USER_KEY,
        secretAccessKey: process.env.REACT_APP_IAM_USER_SECRET,
        Bucket: process.env.REACT_APP_BUCKET,
        region: "sa-east-1"
      });
      if (state.piece === "" || state.piece === undefined) {
        toast.error("Error, debe poner un nombre de obra", {
          position: "top-right",
          autoClose: false,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
        });
        return of({ type: SAVE_DATA_ERROR });
      }
      var audioObs = empty();
      var photoObs = empty();
      var params = {};
      var buf;
      var audioUrl = null;
      var imageUrl = null;
      var err = false;
      var id = cuid();
      if (state.audio !== "") {
        buf = new Buffer(
          state.audio.replace(/^data:audio\/\w+;base64,/, ""),
          "base64"
        );

        audioUrl = `${id}/${state.audioName}`;
        params = {
          Bucket: process.env.REACT_APP_BUCKET,
          Key: audioUrl,
          Body: buf,
          ContentEncoding: "base64",
          ContentType: "audio"
        };

        audioObs = from(s3bucket.upload(params).promise()).pipe(
          switchMap(() => {
            return of({ type: SAVE_DATA_SUCCESS });
          }),
          catchError(() => of({ type: SAVE_DATA_ERROR }))
        );
      }
      if (state.image !== "") {
        buf = new Buffer(
          state.image.replace(/^data:image\/\w+;base64,/, ""),
          "base64"
        );

        imageUrl = `${id}/${state.imageName}`;

        params = {
          Bucket: process.env.REACT_APP_BUCKET,
          Key: imageUrl,
          Body: buf,
          ContentEncoding: "base64",
          ContentType: "image"
        };

        photoObs = from(s3bucket.upload(params).promise()).pipe(
          switchMap(() => {
            return of({ type: `SAVE_DATA_SUCCESS2` });
          }),
          catchError(() => of({ type: SAVE_DATA_ERROR }))
        );
      }

      var body = {
        piece_id: id,
        audio_url: audioUrl,
        description: state.description || null,
        posifi_id: state.posifiId || null,
        image_url: imageUrl,
        location_name: state.piece
      };
      var $ajax = ajax({
        url: process.env.REACT_APP_API + "/pieces",
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json"
        }
      }).switchMap(() => of({ type: SAVE_DATA_SUCCESS, payload: body }));

      return concat(
        audioObs,
        photoObs,
        $ajax,
        iif(
          () => err === false,
          concat(
            of({ type: `SAVE_DATA_SUCCESS_MAIN` }),
            of({ type: APP_INIT })
          ),
          of({ type: SAVE_DATA_ERROR })
        )
      );
    })
    .catch(err => {
      toast.error("No se pudo subir informacion, intente luego", {
        position: "top-right",
        autoClose: false,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
      console.log(err);
      return of({ type: SAVE_DATA_ERROR });
    });
};

export var createPage = $action =>
  $action.ofType(`CHOOSE_PAGE`).switchMap(action => {
    if (action.payload === "create") {
      return from([push("/create")]);
    } else {
      return empty();
    }
  });

export var sendToEdit = $action =>
  $action.ofType(`SEND_EDIT`).switchMap(action => {
    return from([push(`/edit/${action.payload.id}`)]);
  });

export var goBack = $action =>
  $action.ofType(`GO_BACK`).switchMap(action => {
    return from([push(`/`)]);
  });

export var editInfo = ($action, store) => {
  return $action
    .ofType(EDIT_DATA_REQUEST)
    .delay(200)
    .switchMap(() => {
      var state = store.value;
      var s3bucket = new AWS.S3({
        accessKeyId: process.env.REACT_APP_IAM_USER_KEY,
        secretAccessKey: process.env.REACT_APP_IAM_USER_SECRET,
        Bucket: process.env.REACT_APP_BUCKET,
        region: "sa-east-1"
      });

      var audioObs = empty();
      var photoObs = empty();
      var params = {};
      var buf;
      var audioUrl = undefined;
      var imageUrl = undefined;
      var err = false;
      var item = state.piecesEdit.find(elem => {
        return elem.piece_id === state.editId;
      });

      if (state.audio !== "" && state.audio !== undefined) {
        buf = new Buffer(
          state.audio.replace(/^data:audio\/\w+;base64,/, ""),
          "base64"
        );

        audioUrl = `${item.piece_id}/${state.audioName}`;
        params = {
          Bucket: process.env.REACT_APP_BUCKET,
          Key: audioUrl,
          Body: buf,
          ContentEncoding: "base64",
          ContentType: "audio"
        };

        audioObs = from(s3bucket.upload(params).promise()).pipe(
          switchMap(() => {
            return of({ type: SAVE_DATA_SUCCESS });
          }),
          catchError(() => of({ type: SAVE_DATA_ERROR }))
        );
      }
      if (state.image !== "" && state.image !== undefined) {
        buf = new Buffer(
          state.image.replace(/^data:image\/\w+;base64,/, ""),
          "base64"
        );

        imageUrl = `${item.piece_id}/${state.imageName}`;

        params = {
          Bucket: process.env.REACT_APP_BUCKET,
          Key: imageUrl,
          Body: buf,
          ContentEncoding: "base64",
          ContentType: "image"
        };

        photoObs = from(s3bucket.upload(params).promise()).pipe(
          switchMap(() => {
            return of({ type: `SAVE_DATA_SUCCESS2` });
          }),
          catchError(() => of({ type: SAVE_DATA_ERROR }))
        );
      }

      var $ajax = ajax({
        url: process.env.REACT_APP_API + `/pieces/${state.editId}`,
        method: "PUT",
        body: item,
        headers: {
          "Content-Type": "application/json"
        }
      }).switchMap(() => of({ type: `SAVE_DATA_SUCCESS_2` }));

      return concat(
        audioObs,
        photoObs,
        $ajax,
        iif(
          () => err === false,
          concat(
            of({ type: `SAVE_DATA_SUCCESS_MAIN` }),
            of({ type: APP_INIT })
          ),
          of({ type: SAVE_DATA_ERROR })
        )
      );
    })
    .catch(err => {
      toast.error("No se pudo subir informacion, intente luego", {
        position: "top-right",
        autoClose: false,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
      console.log(err);
      return of({ type: SAVE_DATA_ERROR });
    });
};

export var del = ($action, store) => {
  return $action.ofType(`DEL_ITEM`).switchMap(() => {
    var state = store.value;
    return ajax({
      url: process.env.REACT_APP_API + `/pieces/${state.editId}`,
      method: "DELETE"
    })
      .switchMap(() =>
        concat(
          of({ type: `DELETE_SUCCESS`, payload: state.editId }),
          from([push("/")])
        )
      )
      .catch(err => {
        toast.error("No se pudo eliminar, intente luego", {
          position: "top-right",
          autoClose: false,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
        });
        console.log(err);
        return of({ type: SAVE_DATA_ERROR });
      });
  });
};
