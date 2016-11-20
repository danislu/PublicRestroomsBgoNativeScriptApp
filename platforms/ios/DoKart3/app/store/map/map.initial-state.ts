import { IPos, IMap, IMarker } from "./map.types";

const center: IPos = {
    lat: 60.38197875541822,
    lng: 5.313919452978548
};

const centerMarker: IMarker = {
    pos: center,
    content: null
};

export const INITIAL_STATE: IMap = {
    center: center,
    zoom: 12,
    markers: [ centerMarker ],
    isLoadingPosition: false
};