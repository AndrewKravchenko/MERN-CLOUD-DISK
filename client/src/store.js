import {fileReducer} from "./reducers/fileReducer";
import {userReducer} from "./reducers/userReducer";
import {uploadReducer} from "./reducers/uploadReducer";
import {appReducer} from "./reducers/appReducer";
import {applyMiddleware, combineReducers, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  user: userReducer,
  files: fileReducer,
  upload: uploadReducer,
  app: appReducer
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))
