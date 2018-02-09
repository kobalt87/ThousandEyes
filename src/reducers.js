import { combineReducers } from 'redux';

const actionTypes = {
    routeInfosLoaded: "ROUTES_INFO_LOADED",
    routesPathLoaded: "ROUTES_PATH_LOADED",
    vehiclesLoaded: "VEHICLES_LOADED",
};
export const actions = {
    routeInfosLoaded: routes => ({
        type: actionTypes.routeInfosLoaded,
        routes
    }),
    routesPathLoaded: routes => ({
        type: actionTypes.routesPathLoaded,
        routes
    }),
    vehiclesLoaded: vehicles => ({
        type: actionTypes.vehiclesLoaded,
        vehicles        
    })
};

const tags = (state = [], action)=> {
    switch (action.type) {
        case actionTypes.routeInfosLoaded:
            return action.routes ? action.routes.map(r => r.tag) : [];
        default:
            return state;
    }
}

const tagToRouteInfo = (state = {}, action)=> {
    switch (action.type) {
        case actionTypes.routeInfosLoaded:
            return action.routes ?
                action.routes.reduce((map, route) => {
                    map[route.tag] = route;
                    return map;
                }, {}) :
                {};
        default:
            return state;
    }
}

const tagToRoutePath = (state = {}, action)=> {
    switch (action.type) {
        case actionTypes.routesPathLoaded:
            let routes = action.routes;
            routes = routes && !Array.isArray(routes) ? [routes] : routes;
            return routes ?
                routes.reduce((map, route) => {
                    map[route.tag] = route;
                    return map;
                }, {}) :
                {};
        default: 
            return state;
    }
}

const vehicles = (state = {}, action) => {
    switch (action.type) {
        case actionTypes.vehiclesLoaded:
            const newState = {
                ...state
            };
            
            action.vehicles.forEach(v => {
                newState[v.id] = v
            });
                
            return newState;
        default:
            return state;
    }
}

const updateVehicle = (state = {}, vehicle) => {
    if (!vehicle) return state;
    return {
        ...state,
        [vehicle.id]: true
    };
}


const tagToVehicles = (state = {}, action) => {
    switch (action.type) {
        case actionTypes.vehiclesLoaded:
            const newState = {...state};
            action.vehicles.forEach(v => newState[v.routeTag] = updateVehicle(newState[v.routeTag], v));
            
            return newState; 
        default:
            return state;
    }
}


export default combineReducers({
    tags,
    tagToRouteInfo,
    tagToRoutePath,
    tagToVehicles,
    vehicles,
});

export const getTagList = state => state.tags

export const getPath = (state, tag) => state.tagToRoutePath[tag];

export const getRouteInfo = (state, tag) => state.tagToRouteInfo[tag];
export const getVehicles = (state, tag) => {
    const tagInfo = state.tagToVehicles[tag];
    return tagInfo ? Object.keys(tagInfo).map(vId => state.vehicles[vId]) : []
};