import * as actionTypes from "./actiontypes";
import { Injectable } from "@angular/core";
import { NgRedux } from "ng2-redux";
import { Http } from "@angular/http";

import { IAppState, IPos, IMarker, IMarkerInfo } from "../store";

interface IDo {
    latitude: string;
    longitude: string;
    plassering?: string;
    pris?: string;
    pissoir_only?: string;
    rullestol?: string;
    stellerom?: string;
    adresse?: string;
    id?: string;
    tid_lordag?: string;
    tid_sondag?: string;
    tid_hverdag?: string;
    place?: string;
}

@Injectable()
export class MapActions {

    constructor(private ngRedux: NgRedux<IAppState>, private http : Http) {
        this.init();
    }

    private init() {
        this.getMarkers();
    }

    public centerOnDevice() {
        this.isLoadingChanged(true);
        /*Geolocation.getCurrentPosition()
            .then((pos: any) => this.centerChanged({lat: pos.coords.latitude, lng: pos.coords.longitude }))
            .then(() => this.isLoadingChanged(false));*/
    }

    private isLoadingChanged(loading: boolean) {
        return this.ngRedux.dispatch({
            type: actionTypes.IS_LOADING_POS,
            payload: loading
        });
    }

    public centerChanged(center: IPos) {
        return this.ngRedux.dispatch({
            type: actionTypes.CHANGE_CENTER,
            payload: center
        });
    }

    public zoomChanged(zoom: number) {
        return this.ngRedux.dispatch({
            type: actionTypes.CHANGE_ZOOM,
            payload: zoom
        });
    }

    public clearMarkers() {
        return this.ngRedux.dispatch({
            type: actionTypes.CLEAR_MARKERS
        });
    }

    public addMarker(marker: IMarker) {
        return this.ngRedux.dispatch({
            type: actionTypes.ADD_MARKER,
            payload: marker
        });
    }

    public getMarkers() {
        const url = "https://dl.dropboxusercontent.com/u/17093134/dokart.json";
        fetch(url)
            .then(response => response.json())
            .then(data => data.entries)
            .then(entries => entries.map((e: IDo) => this.createMarker(e)))
            .then(markers => {
                this.clearMarkers();
                markers.forEach(m => this.addMarker(m));
            })
            .catch((error) => this.ngRedux.dispatch({
                type: "ERROR",
                message: error
            }))
            .then(() => this.ngRedux.dispatch({
                type: actionTypes.INIT_UPDATE,
                payload: {
                    done: true
                }
            }));
    }

    private createMarker(dass: IDo): IMarker {
        return {
            pos: {
                lat: parseFloat(dass.latitude),
                lng: parseFloat(dass.longitude)
            },
            // icon: 'https://dl.dropboxusercontent.com/u/17093134/restroom.png',
            content: this.convertDoToMakrerInfo(dass)
        };
    }

    private convertDoToMakrerInfo(dass: IDo): IMarkerInfo {
        const items = [`Pris: ${dass.pris === "NULL" ? 0 : parseFloat(dass.pris)}`];

        if (dass.pissoir_only !== "NULL")
            items.push("Bare pissoir");

        return {
            title: dass.plassering,
            items
        };
    }
}
