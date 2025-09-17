// src/redux/store.js
import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk"; // named import
import rootReducer from "../redux/reducer/rootReducer";

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
