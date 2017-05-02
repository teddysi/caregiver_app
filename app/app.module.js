"use strict";
var nativescript_angular_1 = require("nativescript-angular");
var core_1 = require("@angular/core");
var nativescript_module_1 = require("nativescript-angular/nativescript.module");
var app_routing_1 = require("./app.routing");
var app_component_1 = require("./app.component");
var forms_1 = require("nativescript-angular/forms");
var http_1 = require("@angular/http");
var test_component_1 = require("./test/test.component");
var connector_service_1 = require("./shared/connector/connector.service");
var patient_service_1 = require("./patient/patient.service");
var patients_component_1 = require("./patient/patients.component");
var patient_detail_component_1 = require("./patient/patient-detail.component");
var materials_component_1 = require("./material/materials.component");
var material_detail_component_1 = require("./material/material-detail.component");
var need_component_1 = require("./need/need.component");
var data_service_1 = require("./shared/data/data.service");
var database_1 = require("./shared/data/database");
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
            forms_1.NativeScriptFormsModule,
            app_routing_1.AppRoutingModule,
            http_1.HttpModule,
            nativescript_angular_1.NativeScriptHttpModule
        ],
        declarations: [
            app_component_1.AppComponent,
            patients_component_1.PatientsComponent,
            patient_detail_component_1.PatientDetailComponent,
            materials_component_1.MaterialsComponent,
            need_component_1.NeedComponent,
            test_component_1.TestComponent,
            material_detail_component_1.MaterialDetailComponent
        ].concat(app_routing_1.navigatableComponents),
        providers: [
            patient_service_1.PatientService,
            connector_service_1.ConnectorService,
            data_service_1.DataService,
            database_1.Database,
        ],
        schemas: [
            core_1.NO_ERRORS_SCHEMA
        ]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDZEQUE4RDtBQUM5RCxzQ0FBMkQ7QUFDM0QsZ0ZBQThFO0FBQzlFLDZDQUF3RTtBQUN4RSxpREFBK0M7QUFDL0Msb0RBQXFFO0FBQ3JFLHNDQUEyQztBQUMzQyx3REFBc0Q7QUFDdEQsMEVBQXdFO0FBRXhFLDZEQUEyRDtBQUMzRCxtRUFBaUU7QUFDakUsK0VBQTRFO0FBRTVFLHNFQUFvRTtBQUNwRSxrRkFBK0U7QUFFL0Usd0RBQXNEO0FBRXRELDJEQUF5RDtBQUd6RCxtREFBa0Q7QUFFbEQsZ0VBQWdFO0FBb0NoRSxJQUFhLFNBQVM7SUFBdEI7SUFBeUIsQ0FBQztJQUFELGdCQUFDO0FBQUQsQ0FBQyxBQUExQixJQUEwQjtBQUFiLFNBQVM7SUFsQ3JCLGVBQVEsQ0FBQztRQUNOLFNBQVMsRUFBRTtZQUNQLDRCQUFZO1NBQ2Y7UUFDRCxPQUFPLEVBQUU7WUFDTCx3Q0FBa0I7WUFDbEIsK0JBQXVCO1lBQ3ZCLDhCQUFnQjtZQUNoQixpQkFBVTtZQUNWLDZDQUFzQjtTQUV6QjtRQUNELFlBQVk7WUFDUiw0QkFBWTtZQUNaLHNDQUFpQjtZQUNqQixpREFBc0I7WUFDdEIsd0NBQWtCO1lBQ2xCLDhCQUFhO1lBQ2IsOEJBQWE7WUFDYixtREFBdUI7aUJBQ3BCLG1DQUFxQixDQUUzQjtRQUNELFNBQVMsRUFBRTtZQUNQLGdDQUFjO1lBQ2Qsb0NBQWdCO1lBQ2hCLDBCQUFXO1lBQ1gsbUJBQVE7U0FFWDtRQUNELE9BQU8sRUFBRTtZQUNMLHVCQUFnQjtTQUNuQjtLQUNKLENBQUM7R0FDVyxTQUFTLENBQUk7QUFBYiw4QkFBUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5hdGl2ZVNjcmlwdEh0dHBNb2R1bGUgfSBmcm9tICduYXRpdmVzY3JpcHQtYW5ndWxhcic7XHJcbmltcG9ydCB7IE5nTW9kdWxlLCBOT19FUlJPUlNfU0NIRU1BIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgTmF0aXZlU2NyaXB0TW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL25hdGl2ZXNjcmlwdC5tb2R1bGVcIjtcclxuaW1wb3J0IHsgQXBwUm91dGluZ01vZHVsZSwgbmF2aWdhdGFibGVDb21wb25lbnRzIH0gZnJvbSBcIi4vYXBwLnJvdXRpbmdcIjtcclxuaW1wb3J0IHsgQXBwQ29tcG9uZW50IH0gZnJvbSBcIi4vYXBwLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRGb3Jtc01vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9mb3Jtc1wiO1xyXG5pbXBvcnQgeyBIdHRwTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvaHR0cCc7XHJcbmltcG9ydCB7IFRlc3RDb21wb25lbnQgfSBmcm9tIFwiLi90ZXN0L3Rlc3QuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IENvbm5lY3RvclNlcnZpY2UgfSBmcm9tIFwiLi9zaGFyZWQvY29ubmVjdG9yL2Nvbm5lY3Rvci5zZXJ2aWNlXCI7XHJcblxyXG5pbXBvcnQgeyBQYXRpZW50U2VydmljZSB9IGZyb20gXCIuL3BhdGllbnQvcGF0aWVudC5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFBhdGllbnRzQ29tcG9uZW50IH0gZnJvbSBcIi4vcGF0aWVudC9wYXRpZW50cy5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgUGF0aWVudERldGFpbENvbXBvbmVudCB9IGZyb20gXCIuL3BhdGllbnQvcGF0aWVudC1kZXRhaWwuY29tcG9uZW50XCI7XHJcblxyXG5pbXBvcnQgeyBNYXRlcmlhbHNDb21wb25lbnQgfSBmcm9tIFwiLi9tYXRlcmlhbC9tYXRlcmlhbHMuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IE1hdGVyaWFsRGV0YWlsQ29tcG9uZW50IH0gZnJvbSBcIi4vbWF0ZXJpYWwvbWF0ZXJpYWwtZGV0YWlsLmNvbXBvbmVudFwiO1xyXG5cclxuaW1wb3J0IHsgTmVlZENvbXBvbmVudCB9IGZyb20gXCIuL25lZWQvbmVlZC5jb21wb25lbnRcIjtcclxuXHJcbmltcG9ydCB7IERhdGFTZXJ2aWNlIH0gZnJvbSBcIi4vc2hhcmVkL2RhdGEvZGF0YS5zZXJ2aWNlXCI7XHJcblxyXG5pbXBvcnQgeyBwbGF0Zm9ybU5hdGl2ZVNjcmlwdER5bmFtaWN9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9wbGF0Zm9ybVwiO1xyXG5pbXBvcnQgeyBEYXRhYmFzZSB9IGZyb20gXCIuL3NoYXJlZC9kYXRhL2RhdGFiYXNlXCI7XHJcblxyXG4vL2ltcG9ydCB7IE5TX0hUVFBfUFJPVklERVJTIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXIvaHR0cCc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gICAgYm9vdHN0cmFwOiBbXHJcbiAgICAgICAgQXBwQ29tcG9uZW50XHJcbiAgICBdLFxyXG4gICAgaW1wb3J0czogW1xyXG4gICAgICAgIE5hdGl2ZVNjcmlwdE1vZHVsZSxcclxuICAgICAgICBOYXRpdmVTY3JpcHRGb3Jtc01vZHVsZSxcclxuICAgICAgICBBcHBSb3V0aW5nTW9kdWxlLFxyXG4gICAgICAgIEh0dHBNb2R1bGUsXHJcbiAgICAgICAgTmF0aXZlU2NyaXB0SHR0cE1vZHVsZVxyXG4gICAgICAgIFxyXG4gICAgXSxcclxuICAgIGRlY2xhcmF0aW9uczogW1xyXG4gICAgICAgIEFwcENvbXBvbmVudCxcclxuICAgICAgICBQYXRpZW50c0NvbXBvbmVudCxcclxuICAgICAgICBQYXRpZW50RGV0YWlsQ29tcG9uZW50LFxyXG4gICAgICAgIE1hdGVyaWFsc0NvbXBvbmVudCxcclxuICAgICAgICBOZWVkQ29tcG9uZW50LFxyXG4gICAgICAgIFRlc3RDb21wb25lbnQsXHJcbiAgICAgICAgTWF0ZXJpYWxEZXRhaWxDb21wb25lbnQsXHJcbiAgICAgICAgLi4ubmF2aWdhdGFibGVDb21wb25lbnRzXHJcbiAgICAgICBcclxuICAgIF0sXHJcbiAgICBwcm92aWRlcnM6IFtcclxuICAgICAgICBQYXRpZW50U2VydmljZSxcclxuICAgICAgICBDb25uZWN0b3JTZXJ2aWNlLFxyXG4gICAgICAgIERhdGFTZXJ2aWNlLFxyXG4gICAgICAgIERhdGFiYXNlLFxyXG4gICAgICAgXHJcbiAgICBdLFxyXG4gICAgc2NoZW1hczogW1xyXG4gICAgICAgIE5PX0VSUk9SU19TQ0hFTUFcclxuICAgIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIEFwcE1vZHVsZSB7IH1cclxuIl19