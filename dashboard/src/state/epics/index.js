import "rxjs/add/observable/empty";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/delay";
import { combineEpics } from "redux-observable";

import {
  init,
  login,
  uploadInfo,
  showMessage,
  createPage,
  sendToEdit,
  goBack,
  del,
  editInfo
} from "./app";
export var rootEpic = combineEpics(
  init,
  login,
  uploadInfo,
  showMessage,
  createPage,
  sendToEdit,
  goBack,
  del,
  editInfo
);
