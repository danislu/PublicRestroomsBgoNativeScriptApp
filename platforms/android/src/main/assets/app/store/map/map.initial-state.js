"use strict";
var center = {
    lat: 60.38197875541822,
    lng: 5.313919452978548
};
var centerMarker = {
    pos: center,
    content: "Hei hei"
};
exports.INITIAL_STATE = {
    center: center,
    zoom: 12,
    markers: [centerMarker],
    isLoadingPosition: false
};
//# sourceMappingURL=map.initial-state.js.map