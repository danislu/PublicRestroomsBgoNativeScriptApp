import { 
    Component, 
    ViewChild, 
    ElementRef, 
    Input, 
    Output,
    EventEmitter, 
    OnInit
} from '@angular/core';
import { Observable } from 'rxjs';
import { IPos, IMarker } from './../../store';
import { select } from 'ng2-redux';
import { MapActions } from './../../actions';
import { Marker, MapView, Position } from 'nativescript-google-maps-sdk';

/*
latitude="{{ latitude }}" 
            longitude="{{ longitude }}" 
            zoom="{{ zoom | async }}" 
            bearing="{{ bearing }}" 
            tilt="{{ tilt }}" 
            padding="{{ padding }}" 
            mapReady="onMapReady"  
            markerSelect="onMarkerSelect" 
            markerBeginDragging="onMarkerBeginDragging"
            markerEndDragging="onMarkerEndDragging" 
            markerDrag="onMarkerDrag"
            cameraChanged="onCameraChanged"
 */


import {registerElement} from "nativescript-angular/element-registry";

// Important - must register MapView plugin in order to use in Angular templates
registerElement("MapView", () => require("nativescript-google-maps-sdk").MapView);

const style = require("./googlemapsstyle.json");

@Component({
    moduleId: module.id,
    selector: 'map',
    templateUrl: './view.xml'
})
export class MapComponent {
    
    @select(state => state.map.zoom) zoom: Observable<number>;
    @select(state => state.map.center.lat) lat: Observable<number>;
    @select(state => state.map.center.lng) lng: Observable<number>;
    @select(state => state.map.markers) markers: Observable<Array<IMarker>>;
    @select(state => state.map.isLoadingPosition) isLoadingPosition: Observable<boolean>; 
    //@ViewChild("MapView") mapView: ElementRef;

    private mapObject: MapView = null;;
    private lastEmittedPos: IPos;
    private currentMarkers: Array<any> = [];
    
    constructor(private mapActions: MapActions) {
        this.mapActions.getMarkers();
    }

    onMapReady = ($event) => {
        this.mapObject = $event.object;
        this.mapObject.setStyle(style);

        this.markers.subscribe((markers : IMarker[]) => {
            markers.forEach(marker => {
                const m = new Marker();
                m.position = Position.positionFromLatLng(marker.pos.lat, marker.pos.lng);
                m.snippet = marker.content;
                this.mapObject.addMarker(m);
            });
        });
    }

    onMarkerSelect = ($event) => {

    }

    public centerOnDevice(){
        this.mapActions.centerOnDevice();
    }

    public removeClicked(){
        this.mapActions.clearMarkers();
    }

    public centerChanged($event: IPos){
        this.mapActions.centerChanged($event);
    }

    public zoomChanged($event: number){
        this.mapActions.zoomChanged($event);
    }

    /*
    onLoad(){
        console.log("whatever");
    }

    ngOnInit() {
        this.loadMap();

        this.zoom.subscribe((z) => this.googlemap.setZoom(z));
        this.center.subscribe((c) => this.googlemap.setCenter(new google.maps.LatLng(c.lat, c.lng)));
        this.markers.subscribe((markers) => {
            this.currentMarkers.map((m) => m.setMap(null));
            this.currentMarkers = [];
            markers.map((m) => this.addMarker(m))
        }); 
    }

    private loadMap() {

        const latLng = new google.maps.LatLng(0,0);
        const mapOptions = {
            center: latLng,
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            disableDefaultUI: true
        }

        this.googlemap = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

        let lastZoom : number = 15;
        google.maps.event.addListener(this.googlemap, 'zoom_changed', () => {
            const zoom = this.googlemap.getZoom();
            if (lastZoom !== zoom){
                lastZoom = zoom;
                this.zoomChanged(zoom);
            }
        });

        let lastPos : IPos = this.getPosFromLatLng(this.googlemap.getCenter());
        google.maps.event.addListener(this.googlemap, 'center_changed', () => {
            const center = this.getPosFromLatLng(this.googlemap.getCenter());
            if (!this.isSamePos(lastPos, center)){
                lastPos = center;
                this.emitCenterChanged(center);
            }
        });
    }

    private emitCenterChanged(pos: IPos): void {
        if (this.isSamePos(this.lastEmittedPos, pos))
            return;

        this.lastEmittedPos = pos;
        this.centerChanged(pos);
    }

    private isSamePos(pos1: IPos, pos2: IPos): boolean {
        return pos1 && pos2 && (pos1.lat === pos2.lat && pos1.lng === pos1.lng)
    }

    private getPosFromLatLng({lat, lng}) : IPos {
        return {lat: lat(), lng: lng()};
    }

    private addMarker(m : IMarker) {
        const marker = new google.maps.Marker({
            map: this.googlemap,
            position: m.pos,
            icon: m.icon
        });

        this.addInfoWindow(marker, m.content);

        this.currentMarkers.push(marker);
    }

    private addInfoWindow(marker, content) {
        const infoWindow = new google.maps.InfoWindow({
            content: content
        });

        google.maps.event.addListener(marker, 'click', () => {
            infoWindow.open(this.googlemap, marker);
        });
    }
    */
}