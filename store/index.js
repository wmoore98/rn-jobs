import { createStore, compose, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web and AsyncStorage for react-native
import thunk from 'redux-thunk';

import reducers from '../reducers';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['likedJobs']
};

const persistedReducer = persistReducer(persistConfig, reducers);

/*
const store = createStore(
    reducers,
    {},
    compose(
        applyMiddleware(thunk)
    )
);

export default store;
*/

export const store = createStore(
    persistedReducer,
    {},
    compose(
        applyMiddleware(thunk)
    )
);

export const persistor = persistStore(store);
