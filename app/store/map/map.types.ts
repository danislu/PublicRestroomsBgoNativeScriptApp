
export interface IPos {
    lat: number;
    lng: number;
}

export interface IMarker {
    content: IMarkerInfo;
    pos: IPos;
    icon?: string;
}

export interface IMarkerInfo {
    title: string;
    items: Array<string>;
}

export interface IMap {
    center: IPos;
    zoom: number;
    markers?: IMarker[];
    isLoadingPosition: boolean;
}
