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
var user_service_1 = require("./shared/user/user.service");
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
            user_service_1.UserService,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDZEQUE4RDtBQUM5RCxzQ0FBMkQ7QUFDM0QsZ0ZBQThFO0FBQzlFLDZDQUF3RTtBQUN4RSxpREFBK0M7QUFDL0Msb0RBQXFFO0FBQ3JFLHNDQUEyQztBQUMzQyx3REFBc0Q7QUFDdEQsMEVBQXdFO0FBRXhFLDZEQUEyRDtBQUMzRCxtRUFBaUU7QUFDakUsK0VBQTRFO0FBRTVFLHNFQUFvRTtBQUNwRSxrRkFBK0U7QUFFL0Usd0RBQXNEO0FBRXRELDJEQUF5RDtBQUN6RCwyREFBeUQ7QUFFekQsbURBQWtEO0FBRWxELGdFQUFnRTtBQXNDaEUsSUFBYSxTQUFTO0lBQXRCO0lBQXlCLENBQUM7SUFBRCxnQkFBQztBQUFELENBQUMsQUFBMUIsSUFBMEI7QUFBYixTQUFTO0lBcENyQixlQUFRLENBQUM7UUFDTixTQUFTLEVBQUU7WUFDUCw0QkFBWTtTQUNmO1FBQ0QsT0FBTyxFQUFFO1lBQ0wsd0NBQWtCO1lBQ2xCLCtCQUF1QjtZQUN2Qiw4QkFBZ0I7WUFDaEIsaUJBQVU7WUFDViw2Q0FBc0I7U0FFekI7UUFDRCxZQUFZO1lBQ1IsNEJBQVk7WUFDWixzQ0FBaUI7WUFDakIsaURBQXNCO1lBQ3RCLHdDQUFrQjtZQUNsQiw4QkFBYTtZQUNiLDhCQUFhO1lBQ2IsbURBQXVCO2lCQUNwQixtQ0FBcUIsQ0FFM0I7UUFDRCxTQUFTLEVBQUU7WUFDUCwwQkFBVztZQUNYLGdDQUFjO1lBQ2Qsb0NBQWdCO1lBQ2hCLDBCQUFXO1lBQ1gsbUJBQVE7U0FHWDtRQUNELE9BQU8sRUFBRTtZQUNMLHVCQUFnQjtTQUNuQjtLQUNKLENBQUM7R0FDVyxTQUFTLENBQUk7QUFBYiw4QkFBUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5hdGl2ZVNjcmlwdEh0dHBNb2R1bGUgfSBmcm9tICduYXRpdmVzY3JpcHQtYW5ndWxhcic7XHJcbmltcG9ydCB7IE5nTW9kdWxlLCBOT19FUlJPUlNfU0NIRU1BIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgTmF0aXZlU2NyaXB0TW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL25hdGl2ZXNjcmlwdC5tb2R1bGVcIjtcclxuaW1wb3J0IHsgQXBwUm91dGluZ01vZHVsZSwgbmF2aWdhdGFibGVDb21wb25lbnRzIH0gZnJvbSBcIi4vYXBwLnJvdXRpbmdcIjtcclxuaW1wb3J0IHsgQXBwQ29tcG9uZW50IH0gZnJvbSBcIi4vYXBwLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRGb3Jtc01vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9mb3Jtc1wiO1xyXG5pbXBvcnQgeyBIdHRwTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvaHR0cCc7XHJcbmltcG9ydCB7IFRlc3RDb21wb25lbnQgfSBmcm9tIFwiLi90ZXN0L3Rlc3QuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IENvbm5lY3RvclNlcnZpY2UgfSBmcm9tIFwiLi9zaGFyZWQvY29ubmVjdG9yL2Nvbm5lY3Rvci5zZXJ2aWNlXCI7XHJcblxyXG5pbXBvcnQgeyBQYXRpZW50U2VydmljZSB9IGZyb20gXCIuL3BhdGllbnQvcGF0aWVudC5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFBhdGllbnRzQ29tcG9uZW50IH0gZnJvbSBcIi4vcGF0aWVudC9wYXRpZW50cy5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgUGF0aWVudERldGFpbENvbXBvbmVudCB9IGZyb20gXCIuL3BhdGllbnQvcGF0aWVudC1kZXRhaWwuY29tcG9uZW50XCI7XHJcblxyXG5pbXBvcnQgeyBNYXRlcmlhbHNDb21wb25lbnQgfSBmcm9tIFwiLi9tYXRlcmlhbC9tYXRlcmlhbHMuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IE1hdGVyaWFsRGV0YWlsQ29tcG9uZW50IH0gZnJvbSBcIi4vbWF0ZXJpYWwvbWF0ZXJpYWwtZGV0YWlsLmNvbXBvbmVudFwiO1xyXG5cclxuaW1wb3J0IHsgTmVlZENvbXBvbmVudCB9IGZyb20gXCIuL25lZWQvbmVlZC5jb21wb25lbnRcIjtcclxuXHJcbmltcG9ydCB7IERhdGFTZXJ2aWNlIH0gZnJvbSBcIi4vc2hhcmVkL2RhdGEvZGF0YS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFVzZXJTZXJ2aWNlIH0gZnJvbSBcIi4vc2hhcmVkL3VzZXIvdXNlci5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IHBsYXRmb3JtTmF0aXZlU2NyaXB0RHluYW1pY30gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3BsYXRmb3JtXCI7XHJcbmltcG9ydCB7IERhdGFiYXNlIH0gZnJvbSBcIi4vc2hhcmVkL2RhdGEvZGF0YWJhc2VcIjtcclxuXHJcbi8vaW1wb3J0IHsgTlNfSFRUUF9QUk9WSURFUlMgfSBmcm9tICduYXRpdmVzY3JpcHQtYW5ndWxhci9odHRwJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgICBib290c3RyYXA6IFtcclxuICAgICAgICBBcHBDb21wb25lbnRcclxuICAgIF0sXHJcbiAgICBpbXBvcnRzOiBbXHJcbiAgICAgICAgTmF0aXZlU2NyaXB0TW9kdWxlLFxyXG4gICAgICAgIE5hdGl2ZVNjcmlwdEZvcm1zTW9kdWxlLFxyXG4gICAgICAgIEFwcFJvdXRpbmdNb2R1bGUsXHJcbiAgICAgICAgSHR0cE1vZHVsZSxcclxuICAgICAgICBOYXRpdmVTY3JpcHRIdHRwTW9kdWxlXHJcbiAgICAgICAgXHJcbiAgICBdLFxyXG4gICAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICAgICAgQXBwQ29tcG9uZW50LFxyXG4gICAgICAgIFBhdGllbnRzQ29tcG9uZW50LFxyXG4gICAgICAgIFBhdGllbnREZXRhaWxDb21wb25lbnQsXHJcbiAgICAgICAgTWF0ZXJpYWxzQ29tcG9uZW50LFxyXG4gICAgICAgIE5lZWRDb21wb25lbnQsXHJcbiAgICAgICAgVGVzdENvbXBvbmVudCxcclxuICAgICAgICBNYXRlcmlhbERldGFpbENvbXBvbmVudCxcclxuICAgICAgICAuLi5uYXZpZ2F0YWJsZUNvbXBvbmVudHNcclxuICAgICAgIFxyXG4gICAgXSxcclxuICAgIHByb3ZpZGVyczogW1xyXG4gICAgICAgIFVzZXJTZXJ2aWNlLFxyXG4gICAgICAgIFBhdGllbnRTZXJ2aWNlLFxyXG4gICAgICAgIENvbm5lY3RvclNlcnZpY2UsXHJcbiAgICAgICAgRGF0YVNlcnZpY2UsXHJcbiAgICAgICAgRGF0YWJhc2UsXHJcbiAgICAgICAgXHJcbiAgICAgICBcclxuICAgIF0sXHJcbiAgICBzY2hlbWFzOiBbXHJcbiAgICAgICAgTk9fRVJST1JTX1NDSEVNQVxyXG4gICAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQXBwTW9kdWxlIHsgfVxyXG4iXX0=