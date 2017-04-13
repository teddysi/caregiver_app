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
var material_detail_component_1 = require("./material/material-detail.component");
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
            materials_component_1.MaterialsComponent,
            material_detail_component_1.MaterialDetailComponent
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDZEQUE0RDtBQUM1RCxzQ0FBMkQ7QUFDM0QsZ0ZBQThFO0FBQzlFLDZDQUFpRDtBQUNqRCxpREFBK0M7QUFHL0MsNkRBQTJEO0FBQzNELG1FQUFpRTtBQUNqRSwrRUFBNEU7QUFFNUUsc0NBQTJDO0FBQzNDLHNFQUFvRTtBQUNwRSxrRkFBK0U7QUFHL0UsZ0VBQWdFO0FBZ0NoRSxJQUFhLFNBQVM7SUFBdEI7SUFBeUIsQ0FBQztJQUFELGdCQUFDO0FBQUQsQ0FBQyxBQUExQixJQUEwQjtBQUFiLFNBQVM7SUE1QnJCLGVBQVEsQ0FBQztRQUNOLFNBQVMsRUFBRTtZQUNQLDRCQUFZO1NBQ2Y7UUFDRCxPQUFPLEVBQUU7WUFDTCx3Q0FBa0I7WUFDbEIsOEJBQWdCO1lBQ2hCLGlCQUFVO1lBQ1YsNkNBQXNCO1NBRXpCO1FBQ0QsWUFBWSxFQUFFO1lBQ1YsNEJBQVk7WUFDWixzQ0FBaUI7WUFDakIsaURBQXNCO1lBQ3RCLHdDQUFrQjtZQUNsQixtREFBdUI7U0FFMUI7UUFDRCxTQUFTLEVBQUU7WUFDUCxnQ0FBYztTQUdqQjtRQUNELE9BQU8sRUFBRTtZQUNMLHVCQUFnQjtTQUNuQjtLQUNKLENBQUM7R0FDVyxTQUFTLENBQUk7QUFBYiw4QkFBUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TmF0aXZlU2NyaXB0SHR0cE1vZHVsZX0gZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXInO1xuaW1wb3J0IHsgTmdNb2R1bGUsIE5PX0VSUk9SU19TQ0hFTUEgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0TW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL25hdGl2ZXNjcmlwdC5tb2R1bGVcIjtcbmltcG9ydCB7IEFwcFJvdXRpbmdNb2R1bGUgfSBmcm9tIFwiLi9hcHAucm91dGluZ1wiO1xuaW1wb3J0IHsgQXBwQ29tcG9uZW50IH0gZnJvbSBcIi4vYXBwLmNvbXBvbmVudFwiO1xuXG5cbmltcG9ydCB7IFBhdGllbnRTZXJ2aWNlIH0gZnJvbSBcIi4vcGF0aWVudC9wYXRpZW50LnNlcnZpY2VcIjtcbmltcG9ydCB7IFBhdGllbnRzQ29tcG9uZW50IH0gZnJvbSBcIi4vcGF0aWVudC9wYXRpZW50cy5jb21wb25lbnRcIjtcbmltcG9ydCB7IFBhdGllbnREZXRhaWxDb21wb25lbnQgfSBmcm9tIFwiLi9wYXRpZW50L3BhdGllbnQtZGV0YWlsLmNvbXBvbmVudFwiO1xuXG5pbXBvcnQgeyBIdHRwTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvaHR0cCc7XG5pbXBvcnQgeyBNYXRlcmlhbHNDb21wb25lbnQgfSBmcm9tIFwiLi9tYXRlcmlhbC9tYXRlcmlhbHMuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBNYXRlcmlhbERldGFpbENvbXBvbmVudCB9IGZyb20gXCIuL21hdGVyaWFsL21hdGVyaWFsLWRldGFpbC5jb21wb25lbnRcIjtcblxuXG4vL2ltcG9ydCB7IE5TX0hUVFBfUFJPVklERVJTIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXIvaHR0cCc7XG5cblxuXG5ATmdNb2R1bGUoe1xuICAgIGJvb3RzdHJhcDogW1xuICAgICAgICBBcHBDb21wb25lbnRcbiAgICBdLFxuICAgIGltcG9ydHM6IFtcbiAgICAgICAgTmF0aXZlU2NyaXB0TW9kdWxlLFxuICAgICAgICBBcHBSb3V0aW5nTW9kdWxlLFxuICAgICAgICBIdHRwTW9kdWxlLFxuICAgICAgICBOYXRpdmVTY3JpcHRIdHRwTW9kdWxlXG4gICAgICAgIFxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIEFwcENvbXBvbmVudCxcbiAgICAgICAgUGF0aWVudHNDb21wb25lbnQsXG4gICAgICAgIFBhdGllbnREZXRhaWxDb21wb25lbnQsXG4gICAgICAgIE1hdGVyaWFsc0NvbXBvbmVudCxcbiAgICAgICAgTWF0ZXJpYWxEZXRhaWxDb21wb25lbnRcbiAgICAgICBcbiAgICBdLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICBQYXRpZW50U2VydmljZSxcbiAgICAgICAgXG4gICAgICAgXG4gICAgXSxcbiAgICBzY2hlbWFzOiBbXG4gICAgICAgIE5PX0VSUk9SU19TQ0hFTUFcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIEFwcE1vZHVsZSB7IH1cbiJdfQ==