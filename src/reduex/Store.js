import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from 'redux-persist';
import thunk from 'redux-thunk'
import { rootCounter } from "./reducer/Index";
import storage from 'redux-persist/lib/storage';


const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootCounter)

export const conFigureStore = () => {
    let store = createStore(persistedReducer, applyMiddleware(thunk))

    let persistor = persistStore(store);
    
    return { store, persistor }
}