import {
    Component,
    ViewChild,
    ElementRef,
    Input,
    Output,
    EventEmitter,
    ViewContainerRef,
    Compiler,
    ComponentFactoryResolver,
    ComponentRef,
    Type
} from "@angular/core";
import { Observable } from "rxjs";
import { IPos, IMarker, IMarkerInfo } from "./../../store";
import { select } from "ng2-redux";
import { MapActions } from "./../../actions";
import { Marker, MapView, Position, MarkerEventData } from "nativescript-google-maps-sdk";
import { Image } from "ui/image";
import { Page } from "ui/page";

import * as dialogs from "ui/dialogs";
import { ModalDialogService, ModalDialogOptions, ModalDialogParams } from "nativescript-angular/directives/dialogs";

import { InfoComponent } from "./../info";
import { registerElement } from "nativescript-angular/element-registry";

// Important - must register MapView plugin in order to use in Angular templates
registerElement("MapView", () => require("nativescript-google-maps-sdk").MapView);

const style = require("./googlemapsstyle.json");

@Component({
    moduleId: module.id,
    selector: "map",
    templateUrl: "./view.html",
    entryComponents: [ InfoComponent ],
    providers: [ ModalDialogParams ]
})
export class MapComponent {

    @select(state => state.map.zoom)
    zoom: Observable<number>;

    @select(state => state.map.center.lat)
    lat: Observable<number>;

    @select(state => state.map.center.lng)
    lng: Observable<number>;

    @select(state => state.map.markers)
    markers: Observable<Array<IMarker>>;

    @select(state => state.map.isLoadingPosition)
    isLoadingPosition: Observable<boolean>;

    infoHtml: string = "";

    private activeMarker: Marker = null;
    private mapView: MapView = null; ;
    private lastEmittedPos: IPos;
    private currentMarkers: Array<any> = [];

    private _pendingDispose: ComponentRef<any>[] = [];

    constructor(private page: Page,
                private mapActions: MapActions,
                private modal: ModalDialogService,
                private vcRef: ViewContainerRef,
                private resolver: ComponentFactoryResolver) {
        modal.registerViewContainerRef(this.vcRef);

        page.actionBarHidden = true;
        this.mapActions.getMarkers();
    }

    public onMapReady = ($event) => {
        this.mapView = $event.object;
        this.mapView.setStyle(style);

        this.markers.subscribe((markers: IMarker[]) => {
            markers.forEach((marker: IMarker , idx: number) => {
                const m = new Marker();
                m.position = Position.positionFromLatLng(marker.pos.lat, marker.pos.lng);
                m.userData = { index: idx, info: marker.content };
                this.mapView.addMarker(m);
            });
        });
    };

    private wait = (milliSeconds) =>
        new Promise((resolve, reject) =>
            setTimeout(() => resolve(milliSeconds), milliSeconds));

    public onMarkerSelect = ($event: MarkerEventData ) => {
        const marker: Marker = $event.marker;
        const info: IMarkerInfo = marker.userData.info;

        this.showModal(info);
    };

    public loadComponent(componentType: Type<any>): Promise<ComponentRef<any>> {
        const factory = this.resolver.resolveComponentFactory(componentType);
        const componentRef = this.vcRef.createComponent(
            factory, this.vcRef.length, this.vcRef.parentInjector);
        this._pendingDispose.push(componentRef);

        return Promise.resolve(componentRef);
    }

    public dispose() {
        this.disposeComponents();
    }

    public disposeComponents() {
        while (this._pendingDispose.length > 0) {
            const componentRef = this._pendingDispose.pop();
            componentRef.destroy();
        }
    }

    static entries = [
        InfoComponent
    ];

    static exports = [
        InfoComponent
    ];

    private showModal(info: IMarkerInfo) {
        console.log("showModal");
        this.loadComponent(InfoComponent)
            .then(ref => {
                const comp = <InfoComponent>ref.instance;
                const options: ModalDialogOptions = {
                    context: info,
                    fullscreen: false,
                    viewContainerRef: comp.vcRef
                    //viewContainerRef: this.vcRef
                };

                return this.modal.showModal(InfoComponent, options);
            })
            .then((res) => console.log("done"));
    }

    private updateMapCenter({latitude, longitude}) {
        this.mapView.latitude = latitude;
        this.mapView.longitude = longitude;
        this.mapView.updateCamera();
    }

    private makeSnippetString(dass: any): string {
        return `${dass.plassering}
Pris: ${dass.pris === "NULL" ? "Gratis" : dass.pris + " kr" }
${dass.pissoir_only !== "NULL" ? `* Bare pissoir` : ""}
${dass.stellerom !== "NULL" ? `* Har stellerom` : ""}
${dass.rullestol !== "NULL" ? `* Rullestol tilgang` : ""}`;
    }

    private makeSnippetHtmlString(dass: any): string {
        return `<h2>${dass.plassering}</h2>
            <ul>
                <li>Pris: ${dass.pris === "NULL" ? "Gratis" : dass.pris + " kr" }</li>
                ${dass.pissoir_only !== "NULL" ? `<li>Bare pissoir</li>` : ""}
                ${dass.stellerom !== "NULL" ? `<li>Har stellerom</li>` : ""}
                ${dass.rullestol !== "NULL" ? `<li>Rullestol tilgang</li>` : ""}
            </ul>`;
    }

    public centerOnDevice() {
        this.mapActions.centerOnDevice();
    }

    public removeClicked() {
        this.mapActions.clearMarkers();
    }

    public centerChanged($event: IPos) {
        this.mapActions.centerChanged($event);
    }

    public zoomChanged($event: number) {
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