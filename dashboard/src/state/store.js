import { createStore, applyMiddleware, compose } from "redux";
import { createEpicMiddleware } from "redux-observable";
import { routerMiddleware as routerMiddlewareConstructor } from "react-router-redux";
import { rootReducer } from "./reducers/";
import { rootEpic } from "./epics/";
import createBrowserHistory from "history/createBrowserHistory.js";

export var store;

export var history = createBrowserHistory();

var routerMiddleware = routerMiddlewareConstructor(history);

var rootEpicMiddleware = createEpicMiddleware();

var composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

if (process.env.NODE_ENV === "production")
  store = createStore(
    rootReducer,
    applyMiddleware(rootEpicMiddleware, routerMiddleware)
  );
else
  store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(rootEpicMiddleware, routerMiddleware))
  );

rootEpicMiddleware.run(rootEpic);
