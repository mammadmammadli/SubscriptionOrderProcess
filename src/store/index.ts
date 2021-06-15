import { applyMiddleware, combineReducers, compose, createStore, Reducer } from "redux";
import { TAppState } from "../models/reducerModels";
import createSagaMiddleware from 'redux-saga';
import rootSaga from "../sagas";
import { subscriptionPlansReducer } from "../reducers/subscriptionPlansReducer";

const rootReducer: Reducer<TAppState> = combineReducers({
    subscriptionPlansReducer,
});

export default function configureStore() {
    const sagaMiddleware = createSagaMiddleware();
    const middlewares = [sagaMiddleware];
    const middlewareEnhancer = applyMiddleware(...middlewares);

    const composeEnhancers =
        typeof window === 'object' &&
            (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
            (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            }) : compose;
    const store = createStore(rootReducer, undefined, composeEnhancers(middlewareEnhancer));
    sagaMiddleware.run(rootSaga);

    return store;
}
