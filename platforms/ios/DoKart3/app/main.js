"use strict";
// Patch to make redux load
global.process = { env: {} };
// this import should be first in order to load some required settings (like globals and reflect-metadata)
var platform_1 = require("nativescript-angular/platform");
var forms_1 = require("nativescript-angular/forms");
var http_1 = require("nativescript-angular/http");
var router_1 = require("nativescript-angular/router");
var application = require("application");
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var ng2_redux_1 = require("ng2-redux");
var http_2 = require("@angular/http");
var routing_1 = require("./routing");
var app_1 = require("./components/app");
var actions_1 = require("./actions");
var keys_1 = require("./keys");
if (application.ios) {
    GMSServices.provideAPIKey(keys_1.GoogleMapsApi.iOs);
}
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_1.AppComponent
            ].concat(routing_1.navigatableComponents),
            bootstrap: [
                app_1.AppComponent
            ],
            imports: [
                platform_1.NativeScriptModule,
                forms_1.NativeScriptFormsModule,
                http_1.NativeScriptHttpModule,
                router_1.NativeScriptRouterModule,
                router_1.NativeScriptRouterModule.forRoot(routing_1.routes),
                ng2_redux_1.NgReduxModule.forRoot(),
                common_1.CommonModule,
                http_2.HttpModule
            ],
            providers: [
                actions_1.ALL_ACTIONS
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
platform_1.platformNativeScriptDynamic().bootstrapModule(AppModule);
// application.start(); 
//# sourceMappingURL=main.js.map