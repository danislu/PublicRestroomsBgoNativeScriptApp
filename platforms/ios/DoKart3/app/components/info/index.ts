import {
    Component,
    ViewChild,
    ElementRef,
    Input,
    Output,
    EventEmitter,
    ViewContainerRef
} from "@angular/core";
import { Observable } from "rxjs";
import { IMarkerInfo } from "./../../store";
import { ModalDialogParams } from "nativescript-angular/directives/dialogs";
import { Page } from "ui/page";
import { device, platformNames } from "platform";

@Component({
    moduleId: module.id,
    selector: "info-modal",
    templateUrl: "./index.html"
})
export class InfoComponent {

    private markerInfo: IMarkerInfo;

    constructor(private params: ModalDialogParams, private page: Page, public vcRef: ViewContainerRef) {
        page.on("shownModally", () => {
            console.log("InfoComponent ctor");
            this.markerInfo = <IMarkerInfo>params.context;
        });
    }

    public onClose(): void {
        this.params.closeCallback();
    }
}