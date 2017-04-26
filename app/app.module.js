"use strict";
var nativescript_angular_1 = require("nativescript-angular");
var core_1 = require("@angular/core");
var nativescript_module_1 = require("nativescript-angular/nativescript.module");
var app_routing_1 = require("./app.routing");
var app_component_1 = require("./app.component");
var forms_1 = require("nativescript-angular/forms");
var http_1 = require("@angular/http");
var patient_service_1 = require("./patient/patient.service");
var patients_component_1 = require("./patient/patients.component");
var patient_detail_component_1 = require("./patient/patient-detail.component");
var materials_component_1 = require("./material/materials.component");
var material_detail_component_1 = require("./material/material-detail.component");
var need_component_1 = require("./need/need.component");
var test_component_1 = require("./test/test.component");
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
        ],
        schemas: [
            core_1.NO_ERRORS_SCHEMA
        ]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDZEQUE4RDtBQUM5RCxzQ0FBMkQ7QUFDM0QsZ0ZBQThFO0FBQzlFLDZDQUF3RTtBQUN4RSxpREFBK0M7QUFDL0Msb0RBQXFFO0FBQ3JFLHNDQUEyQztBQUUzQyw2REFBMkQ7QUFDM0QsbUVBQWlFO0FBQ2pFLCtFQUE0RTtBQUU1RSxzRUFBb0U7QUFDcEUsa0ZBQStFO0FBRS9FLHdEQUFzRDtBQUV0RCx3REFBc0Q7QUFHdEQsZ0VBQWdFO0FBa0NoRSxJQUFhLFNBQVM7SUFBdEI7SUFBeUIsQ0FBQztJQUFELGdCQUFDO0FBQUQsQ0FBQyxBQUExQixJQUEwQjtBQUFiLFNBQVM7SUFoQ3JCLGVBQVEsQ0FBQztRQUNOLFNBQVMsRUFBRTtZQUNQLDRCQUFZO1NBQ2Y7UUFDRCxPQUFPLEVBQUU7WUFDTCx3Q0FBa0I7WUFDbEIsK0JBQXVCO1lBQ3ZCLDhCQUFnQjtZQUNoQixpQkFBVTtZQUNWLDZDQUFzQjtTQUV6QjtRQUNELFlBQVk7WUFDUiw0QkFBWTtZQUNaLHNDQUFpQjtZQUNqQixpREFBc0I7WUFDdEIsd0NBQWtCO1lBQ2xCLDhCQUFhO1lBQ2IsOEJBQWE7WUFDYixtREFBdUI7aUJBQ3BCLG1DQUFxQixDQUUzQjtRQUNELFNBQVMsRUFBRTtZQUNQLGdDQUFjO1NBR2pCO1FBQ0QsT0FBTyxFQUFFO1lBQ0wsdUJBQWdCO1NBQ25CO0tBQ0osQ0FBQztHQUNXLFNBQVMsQ0FBSTtBQUFiLDhCQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmF0aXZlU2NyaXB0SHR0cE1vZHVsZSB9IGZyb20gJ25hdGl2ZXNjcmlwdC1hbmd1bGFyJztcclxuaW1wb3J0IHsgTmdNb2R1bGUsIE5PX0VSUk9SU19TQ0hFTUEgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvbmF0aXZlc2NyaXB0Lm1vZHVsZVwiO1xyXG5pbXBvcnQgeyBBcHBSb3V0aW5nTW9kdWxlLCBuYXZpZ2F0YWJsZUNvbXBvbmVudHMgfSBmcm9tIFwiLi9hcHAucm91dGluZ1wiO1xyXG5pbXBvcnQgeyBBcHBDb21wb25lbnQgfSBmcm9tIFwiLi9hcHAuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdEZvcm1zTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2Zvcm1zXCI7XHJcbmltcG9ydCB7IEh0dHBNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9odHRwJztcclxuXHJcbmltcG9ydCB7IFBhdGllbnRTZXJ2aWNlIH0gZnJvbSBcIi4vcGF0aWVudC9wYXRpZW50LnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgUGF0aWVudHNDb21wb25lbnQgfSBmcm9tIFwiLi9wYXRpZW50L3BhdGllbnRzLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBQYXRpZW50RGV0YWlsQ29tcG9uZW50IH0gZnJvbSBcIi4vcGF0aWVudC9wYXRpZW50LWRldGFpbC5jb21wb25lbnRcIjtcclxuXHJcbmltcG9ydCB7IE1hdGVyaWFsc0NvbXBvbmVudCB9IGZyb20gXCIuL21hdGVyaWFsL21hdGVyaWFscy5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgTWF0ZXJpYWxEZXRhaWxDb21wb25lbnQgfSBmcm9tIFwiLi9tYXRlcmlhbC9tYXRlcmlhbC1kZXRhaWwuY29tcG9uZW50XCI7XHJcblxyXG5pbXBvcnQgeyBOZWVkQ29tcG9uZW50IH0gZnJvbSBcIi4vbmVlZC9uZWVkLmNvbXBvbmVudFwiO1xyXG5cclxuaW1wb3J0IHsgVGVzdENvbXBvbmVudCB9IGZyb20gXCIuL3Rlc3QvdGVzdC5jb21wb25lbnRcIjtcclxuXHJcblxyXG4vL2ltcG9ydCB7IE5TX0hUVFBfUFJPVklERVJTIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXIvaHR0cCc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gICAgYm9vdHN0cmFwOiBbXHJcbiAgICAgICAgQXBwQ29tcG9uZW50XHJcbiAgICBdLFxyXG4gICAgaW1wb3J0czogW1xyXG4gICAgICAgIE5hdGl2ZVNjcmlwdE1vZHVsZSxcclxuICAgICAgICBOYXRpdmVTY3JpcHRGb3Jtc01vZHVsZSxcclxuICAgICAgICBBcHBSb3V0aW5nTW9kdWxlLFxyXG4gICAgICAgIEh0dHBNb2R1bGUsXHJcbiAgICAgICAgTmF0aXZlU2NyaXB0SHR0cE1vZHVsZVxyXG4gICAgICAgIFxyXG4gICAgXSxcclxuICAgIGRlY2xhcmF0aW9uczogW1xyXG4gICAgICAgIEFwcENvbXBvbmVudCxcclxuICAgICAgICBQYXRpZW50c0NvbXBvbmVudCxcclxuICAgICAgICBQYXRpZW50RGV0YWlsQ29tcG9uZW50LFxyXG4gICAgICAgIE1hdGVyaWFsc0NvbXBvbmVudCxcclxuICAgICAgICBOZWVkQ29tcG9uZW50LFxyXG4gICAgICAgIFRlc3RDb21wb25lbnQsXHJcbiAgICAgICAgTWF0ZXJpYWxEZXRhaWxDb21wb25lbnQsXHJcbiAgICAgICAgLi4ubmF2aWdhdGFibGVDb21wb25lbnRzXHJcbiAgICAgICBcclxuICAgIF0sXHJcbiAgICBwcm92aWRlcnM6IFtcclxuICAgICAgICBQYXRpZW50U2VydmljZSxcclxuICAgICAgICBcclxuICAgICAgIFxyXG4gICAgXSxcclxuICAgIHNjaGVtYXM6IFtcclxuICAgICAgICBOT19FUlJPUlNfU0NIRU1BXHJcbiAgICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBcHBNb2R1bGUgeyB9XHJcbiJdfQ==