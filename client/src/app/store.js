import { configureStore} from "@reduxjs/toolkit";
import apiSlice from "./apiSlice";
import authSliceReducer from "../Components/Authorization/AuthSlice";

const store = configureStore({

    reducer:{
auth:authSliceReducer,
[apiSlice.reducerPath]:apiSlice.reducer,

devTools:false
    },
    middleware: (getDefaultMiddleware) =>
getDefaultMiddleware().concat(apiSlice.middleware),
devTools:true

})

export default store