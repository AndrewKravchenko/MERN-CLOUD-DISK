import {fileReducer} from "./reducers/fileReducer";
import {userReducer} from "./reducers/userReducer";
import {uploadReducer} from "./reducers/uploadReducer";
import {applyMiddleware, combineReducers, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  user: userReducer,
  files: fileReducer,
  upload: uploadReducer
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))
