"use strict";
var nativescript_angular_1 = require("nativescript-angular");
var core_1 = require("@angular/core");
var nativescript_module_1 = require("nativescript-angular/nativescript.module");
var app_routing_1 = require("./app.routing");
var app_component_1 = require("./app.component");
var patient_service_1 = require("./patient/patient.service");
var patients_component_1 = require("./patient/patients.component");
var patient_detail_component_1 = require("./patient/patient-detail.component");
var http_1 = require("@angular/http");
var materials_component_1 = require("./material/materials.component");
//import { NS_HTTP_PROVIDERS } from 'nativescript-angular/http';
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        bootstrap: [
            app_component_1.AppComponent
        ],
        imports: [
            nativescript_module_1.NativeScriptModule,
            app_routing_1.AppRoutingModule,
            http_1.HttpModule,
            nativescript_angular_1.NativeScriptHttpModule
        ],
        declarations: [
            app_component_1.AppComponent,
            patients_component_1.PatientsComponent,
            patient_detail_component_1.PatientDetailComponent,
            materials_component_1.MaterialsComponent
        ],
        providers: [
            patient_service_1.PatientService,
        ],
        schemas: [
            core_1.NO_ERRORS_SCHEMA
        ]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDZEQUE0RDtBQUM1RCxzQ0FBMkQ7QUFDM0QsZ0ZBQThFO0FBQzlFLDZDQUFpRDtBQUNqRCxpREFBK0M7QUFHL0MsNkRBQTJEO0FBQzNELG1FQUFpRTtBQUNqRSwrRUFBNEU7QUFFNUUsc0NBQTJDO0FBQzNDLHNFQUFvRTtBQUVwRSxnRUFBZ0U7QUE4QmhFLElBQWEsU0FBUztJQUF0QjtJQUF5QixDQUFDO0lBQUQsZ0JBQUM7QUFBRCxDQUFDLEFBQTFCLElBQTBCO0FBQWIsU0FBUztJQTFCckIsZUFBUSxDQUFDO1FBQ04sU0FBUyxFQUFFO1lBQ1AsNEJBQVk7U0FDZjtRQUNELE9BQU8sRUFBRTtZQUNMLHdDQUFrQjtZQUNsQiw4QkFBZ0I7WUFDaEIsaUJBQVU7WUFDViw2Q0FBc0I7U0FFekI7UUFDRCxZQUFZLEVBQUU7WUFDViw0QkFBWTtZQUNaLHNDQUFpQjtZQUNqQixpREFBc0I7WUFDdEIsd0NBQWtCO1NBQ3JCO1FBQ0QsU0FBUyxFQUFFO1lBQ1AsZ0NBQWM7U0FHakI7UUFDRCxPQUFPLEVBQUU7WUFDTCx1QkFBZ0I7U0FDbkI7S0FDSixDQUFDO0dBQ1csU0FBUyxDQUFJO0FBQWIsOEJBQVMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge05hdGl2ZVNjcmlwdEh0dHBNb2R1bGV9IGZyb20gJ25hdGl2ZXNjcmlwdC1hbmd1bGFyJztcbmltcG9ydCB7IE5nTW9kdWxlLCBOT19FUlJPUlNfU0NIRU1BIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdE1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9uYXRpdmVzY3JpcHQubW9kdWxlXCI7XG5pbXBvcnQgeyBBcHBSb3V0aW5nTW9kdWxlIH0gZnJvbSBcIi4vYXBwLnJvdXRpbmdcIjtcbmltcG9ydCB7IEFwcENvbXBvbmVudCB9IGZyb20gXCIuL2FwcC5jb21wb25lbnRcIjtcblxuXG5pbXBvcnQgeyBQYXRpZW50U2VydmljZSB9IGZyb20gXCIuL3BhdGllbnQvcGF0aWVudC5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBQYXRpZW50c0NvbXBvbmVudCB9IGZyb20gXCIuL3BhdGllbnQvcGF0aWVudHMuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBQYXRpZW50RGV0YWlsQ29tcG9uZW50IH0gZnJvbSBcIi4vcGF0aWVudC9wYXRpZW50LWRldGFpbC5jb21wb25lbnRcIjtcblxuaW1wb3J0IHsgSHR0cE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xuaW1wb3J0IHsgTWF0ZXJpYWxzQ29tcG9uZW50IH0gZnJvbSBcIi4vbWF0ZXJpYWwvbWF0ZXJpYWxzLmNvbXBvbmVudFwiO1xuXG4vL2ltcG9ydCB7IE5TX0hUVFBfUFJPVklERVJTIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXIvaHR0cCc7XG5cblxuXG5ATmdNb2R1bGUoe1xuICAgIGJvb3RzdHJhcDogW1xuICAgICAgICBBcHBDb21wb25lbnRcbiAgICBdLFxuICAgIGltcG9ydHM6IFtcbiAgICAgICAgTmF0aXZlU2NyaXB0TW9kdWxlLFxuICAgICAgICBBcHBSb3V0aW5nTW9kdWxlLFxuICAgICAgICBIdHRwTW9kdWxlLFxuICAgICAgICBOYXRpdmVTY3JpcHRIdHRwTW9kdWxlXG4gICAgICAgIFxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIEFwcENvbXBvbmVudCxcbiAgICAgICAgUGF0aWVudHNDb21wb25lbnQsXG4gICAgICAgIFBhdGllbnREZXRhaWxDb21wb25lbnQsXG4gICAgICAgIE1hdGVyaWFsc0NvbXBvbmVudFxuICAgIF0sXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIFBhdGllbnRTZXJ2aWNlLFxuICAgICAgICBcbiAgICAgICBcbiAgICBdLFxuICAgIHNjaGVtYXM6IFtcbiAgICAgICAgTk9fRVJST1JTX1NDSEVNQVxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgQXBwTW9kdWxlIHsgfVxuIl19