// import { configureStore } from "@reduxjs/toolkit";
// import { combineReducers } from "redux";
// import { alertsSlice, } from "./alertsSlice";
// import { doctorSlice } from "./DoctorSlice";

// const rootReducer = combineReducers({
//     alerts:alertsSlice.reducer,
//     doctor:doctorSlice.reducer
// })

// const store = configureStore({
//     reducer: rootReducer,
// })
// export default store


import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { alertsSlice } from "./alertsSlice";
import { doctorSlice } from "./DoctorSlice";
import { persistReducer,persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { adminSlice } from "./AdminSlice";
import { userSlice } from "./UserSlice";

const rootReducer = combineReducers({
    alerts: alertsSlice.reducer,
    doctor: doctorSlice.reducer,
    admin:adminSlice.reducer,
    user:userSlice.reducer
});

const persistConfig = {
    key: "root",
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
});
const persistor = persistStore(store);
export  {store,persistor};