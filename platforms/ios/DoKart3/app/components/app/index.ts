import { Component } from "@angular/core";
import { IAppState, store } from "./../../store";
import { NgRedux } from "ng2-redux";

@Component({
    moduleId: module.id,
    selector: "main",
    template: "<page-router-outlet></page-router-outlet>"
})
export class AppComponent {
    constructor(private redux : NgRedux<IAppState>){
        redux.provideStore(store);
    }
}
