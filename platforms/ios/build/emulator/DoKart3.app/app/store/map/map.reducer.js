"use strict";
var redux_1 = require('redux');
var map_initial_state_1 = require('./map.initial-state');
var actionTypes = require('./../../actions/actiontypes');
function centerReducer(state, _a) {
    if (state === void 0) { state = map_initial_state_1.INITIAL_STATE.center; }
    var type = _a.type, payload = _a.payload;
    switch (type) {
        case actionTypes.CHANGE_CENTER:
            return payload;
        default:
            return state;
    }
}
exports.centerReducer = centerReducer;
function zoomReducer(state, _a) {
    if (state === void 0) { state = map_initial_state_1.INITIAL_STATE.zoom; }
    var type = _a.type, payload = _a.payload;
    return type === actionTypes.CHANGE_ZOOM
        ? payload
        : state;
}
exports.zoomReducer = zoomReducer;
function markersReducer(state, _a) {
    if (state === void 0) { state = map_initial_state_1.INITIAL_STATE.markers; }
    var type = _a.type, payload = _a.payload;
    switch (type) {
        case actionTypes.ADD_MARKER:
            return state.concat([payload]);
        case actionTypes.CLEAR_MARKERS:
            return [];
        default:
            return state;
    }
}
exports.markersReducer = markersReducer;
function isLoadingPosReducer(state, _a) {
    if (state === void 0) { state = map_initial_state_1.INITIAL_STATE.isLoadingPosition; }
    var type = _a.type, payload = _a.payload;
    if (type === actionTypes.IS_LOADING_POS) {
        return payload;
    }
    return state;
}
exports.isLoadingPosReducer = isLoadingPosReducer;
exports.mapReducer = redux_1.combineReducers({
    center: centerReducer,
    zoom: zoomReducer,
    markers: markersReducer,
    isLoadingPosition: isLoadingPosReducer
});
//# sourceMappingURL=map.reducer.js.map