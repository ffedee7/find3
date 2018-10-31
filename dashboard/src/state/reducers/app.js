import {
  SET_INPUT,
  LOGIN_REQUEST,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  SET_FILE,
  SAVE_DATA_SUCCESS,
  SAVE_DATA_ERROR,
  CREATE_DATA_REQUEST,
  EDIT_DATA_REQUEST
} from "../actions";
import merge from "lodash/merge.js";
import orderBy from "lodash/orderBy.js";

var defaultState = {
  app: {
    login: false
  },
  imageName: "",
  audioName: "",
  audio: "",
  image: "",
  toggle: false
};

export var rootReducer = (state = defaultState, { type, payload }) => {
  switch (type) {
    case SET_INPUT:
      return {
        ...state,
        [payload.key]: payload.value
      };

    case `DELETE_SUCCESS`:
      return {
        ...state,
        pieces: setPieces(payload, state)
      };

    case `GO_BACK`:
      return {
        ...state,
        image: "",
        audio: "",
        audioName: "",
        imageName: ""
      };
    case `SEND_EDIT`:
      return {
        ...state,
        editId: payload.id,
        editName: payload.name,
        piecesEdit: state.pieces
      };
    case `POPULATE_DATA`:
      return {
        ...state,
        pieces: orderBy(payload, ["location_name"])
      };
    case `SET_INPUT_EDIT`:
      return {
        ...state,
        piecesEdit: editPieces(state, payload)
      };
    case `SET_TOGGLE_EDIT`:
      return {
        ...state,
        piecesEdit: editPieces(state, payload)
      };
    case `SET_TOGGLE`:
      return {
        ...state,
        toggle: payload.value
      };
    case SET_FILE:
      return {
        ...state,
        ...unwrapFiles(payload.files)
      };
    case LOGIN_REQUEST:
    case CREATE_DATA_REQUEST:
    case EDIT_DATA_REQUEST:
      return {
        ...state,
        loading: true
      };
    case LOGIN_ERROR:
    case SAVE_DATA_ERROR:
      return {
        ...state,
        loading: false
      };

    case `SAVE_DATA_SUCCESS_2`:
      return {
        ...state,
        loading: false
      };
    case LOGIN_SUCCESS:
    case SAVE_DATA_SUCCESS:
      return {
        ...state,
        pieces: state.pieces.concat([payload]),
        loading: false,
        imageName: "",
        audioName: "",
        audio: "",
        image: ""
      };
    default:
      return { ...state };
  }
};

function unwrapFiles(files) {
  var object = {};
  files.forEach(element => {
    object[element.type] = element.fileUrl;
    object[`${element.type}Name`] = element.name;
  });
  return object;
}

function setPieces(id, state) {
  return state.pieces.filter(obj => {
    return obj.piece_id !== id;
  });
}

function editPieces(state, payload) {
  var idx = state.pieces.findIndex(elem => {
    return elem.piece_id === payload.id;
  });

  var res = [];

  if (idx > -1) {
    res = [
      ...state.pieces.slice(0, idx),
      merge({}, state.pieces[idx], { [payload.key]: payload.value }),
      ...state.pieces.slice(idx + 1)
    ];
  }

  return res;
}
