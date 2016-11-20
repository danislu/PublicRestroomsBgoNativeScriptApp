"use strict";
var redux_1 = require('redux');
//import thunk from 'redux-thunk';
//import promise from 'redux-promise';
//import createLogger from 'redux-logger';
var map = require('./map');
var actiontypes_1 = require('./../actions/actiontypes');
;
var headlineReduxer = function (state, action) {
    if (state === void 0) { state = ""; }
    if (action.type === actiontypes_1.HEADLINE_CHANGED)
        return action.payload.headline;
    return state;
};
var rootReducer = redux_1.combineReducers({
    map: map.mapReducer,
    headline: headlineReduxer
});
//const logger = createLogger();
exports.store = redux_1.createStore(rootReducer);
//# sourceMappingURL=store.js.map