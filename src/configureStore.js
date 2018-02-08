import { createStore, applyMiddleware } from "redux"
import reducer from "./reducers";
import { createLogger } from "redux-logger";

const createMapStore = () => {
    const middlewares = [];
    
    if (process.env.NODE_ENV !== 'production') {
        middlewares.push(createLogger());
    }
    
    return createStore(reducer, applyMiddleware(...middlewares));
}


export default createMapStore;