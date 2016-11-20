// Patch to make redux load
global.process = { env: {} };

// this import should be first in order to load some required settings (like globals and reflect-metadata)
import { platformNativeScriptDynamic, NativeScriptModule } from "nativescript-angular/platform";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptHttpModule } from "nativescript-angular/http";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import * as application from "application";
import { NgModule } from "@angular/core";
import { CommonModule} from '@angular/common';
import { NgReduxModule } from 'ng2-redux';
import { HttpModule } from '@angular/http';

import { routes, navigatableComponents } from "./routing";
import { AppComponent } from "./components/app";
import { ALL_ACTIONS } from "./actions";
import { GoogleMapsApi } from "./keys";

declare var GMSServices : any;

if(application.ios) {
    GMSServices.provideAPIKey(GoogleMapsApi.iOs);
}

@NgModule({
    declarations: [
        AppComponent, 
        ...navigatableComponents
    ],
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule, 
        NativeScriptFormsModule,
        NativeScriptHttpModule,
        NativeScriptRouterModule,
        NativeScriptRouterModule.forRoot(routes),
        NgReduxModule.forRoot(), 
        CommonModule,
        HttpModule
    ],
    providers: [ 
        ALL_ACTIONS 
    ]
})
class AppModule {}

platformNativeScriptDynamic().bootstrapModule(AppModule);
//application.start();