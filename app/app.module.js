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
var angular_1 = require("nativescript-radiobutton/angular");
//evaluation
var evaluation_component_1 = require("./evaluation/evaluation.component");
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
            nativescript_angular_1.NativeScriptHttpModule,
            angular_1.RadioButtonModule
        ],
        declarations: [
            app_component_1.AppComponent,
            patients_component_1.PatientsComponent,
            patient_detail_component_1.PatientDetailComponent,
            materials_component_1.MaterialsComponent,
            need_component_1.NeedComponent,
            test_component_1.TestComponent,
            evaluation_component_1.EvaluationComponent,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDZEQUE4RDtBQUM5RCxzQ0FBMkQ7QUFDM0QsZ0ZBQThFO0FBQzlFLDZDQUF3RTtBQUN4RSxpREFBK0M7QUFDL0Msb0RBQXFFO0FBQ3JFLHNDQUEyQztBQUMzQyx3REFBc0Q7QUFDdEQsMEVBQXdFO0FBRXhFLDZEQUEyRDtBQUMzRCxtRUFBaUU7QUFDakUsK0VBQTRFO0FBRTVFLHNFQUFvRTtBQUNwRSxrRkFBK0U7QUFFL0Usd0RBQXNEO0FBRXRELDJEQUF5RDtBQUN6RCwyREFBeUQ7QUFFekQsbURBQWtEO0FBRWxELDREQUFvRTtBQUVwRSxZQUFZO0FBQ1osMEVBQXdFO0FBRXhFLGdFQUFnRTtBQXdDaEUsSUFBYSxTQUFTO0lBQXRCO0lBQXlCLENBQUM7SUFBRCxnQkFBQztBQUFELENBQUMsQUFBMUIsSUFBMEI7QUFBYixTQUFTO0lBdENyQixlQUFRLENBQUM7UUFDTixTQUFTLEVBQUU7WUFDUCw0QkFBWTtTQUNmO1FBQ0QsT0FBTyxFQUFFO1lBQ0wsd0NBQWtCO1lBQ2xCLCtCQUF1QjtZQUN2Qiw4QkFBZ0I7WUFDaEIsaUJBQVU7WUFDViw2Q0FBc0I7WUFDdEIsMkJBQWlCO1NBRXBCO1FBQ0QsWUFBWTtZQUNSLDRCQUFZO1lBQ1osc0NBQWlCO1lBQ2pCLGlEQUFzQjtZQUN0Qix3Q0FBa0I7WUFDbEIsOEJBQWE7WUFDYiw4QkFBYTtZQUNiLDBDQUFtQjtZQUNuQixtREFBdUI7aUJBQ3BCLG1DQUFxQixDQUUzQjtRQUNELFNBQVMsRUFBRTtZQUNQLDBCQUFXO1lBQ1gsZ0NBQWM7WUFDZCxvQ0FBZ0I7WUFDaEIsMEJBQVc7WUFDWCxtQkFBUTtTQUdYO1FBQ0QsT0FBTyxFQUFFO1lBQ0wsdUJBQWdCO1NBQ25CO0tBQ0osQ0FBQztHQUNXLFNBQVMsQ0FBSTtBQUFiLDhCQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmF0aXZlU2NyaXB0SHR0cE1vZHVsZSB9IGZyb20gJ25hdGl2ZXNjcmlwdC1hbmd1bGFyJztcclxuaW1wb3J0IHsgTmdNb2R1bGUsIE5PX0VSUk9SU19TQ0hFTUEgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvbmF0aXZlc2NyaXB0Lm1vZHVsZVwiO1xyXG5pbXBvcnQgeyBBcHBSb3V0aW5nTW9kdWxlLCBuYXZpZ2F0YWJsZUNvbXBvbmVudHMgfSBmcm9tIFwiLi9hcHAucm91dGluZ1wiO1xyXG5pbXBvcnQgeyBBcHBDb21wb25lbnQgfSBmcm9tIFwiLi9hcHAuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdEZvcm1zTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2Zvcm1zXCI7XHJcbmltcG9ydCB7IEh0dHBNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9odHRwJztcclxuaW1wb3J0IHsgVGVzdENvbXBvbmVudCB9IGZyb20gXCIuL3Rlc3QvdGVzdC5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgQ29ubmVjdG9yU2VydmljZSB9IGZyb20gXCIuL3NoYXJlZC9jb25uZWN0b3IvY29ubmVjdG9yLnNlcnZpY2VcIjtcclxuXHJcbmltcG9ydCB7IFBhdGllbnRTZXJ2aWNlIH0gZnJvbSBcIi4vcGF0aWVudC9wYXRpZW50LnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgUGF0aWVudHNDb21wb25lbnQgfSBmcm9tIFwiLi9wYXRpZW50L3BhdGllbnRzLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBQYXRpZW50RGV0YWlsQ29tcG9uZW50IH0gZnJvbSBcIi4vcGF0aWVudC9wYXRpZW50LWRldGFpbC5jb21wb25lbnRcIjtcclxuXHJcbmltcG9ydCB7IE1hdGVyaWFsc0NvbXBvbmVudCB9IGZyb20gXCIuL21hdGVyaWFsL21hdGVyaWFscy5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgTWF0ZXJpYWxEZXRhaWxDb21wb25lbnQgfSBmcm9tIFwiLi9tYXRlcmlhbC9tYXRlcmlhbC1kZXRhaWwuY29tcG9uZW50XCI7XHJcblxyXG5pbXBvcnQgeyBOZWVkQ29tcG9uZW50IH0gZnJvbSBcIi4vbmVlZC9uZWVkLmNvbXBvbmVudFwiO1xyXG5cclxuaW1wb3J0IHsgRGF0YVNlcnZpY2UgfSBmcm9tIFwiLi9zaGFyZWQvZGF0YS9kYXRhLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgVXNlclNlcnZpY2UgfSBmcm9tIFwiLi9zaGFyZWQvdXNlci91c2VyLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgcGxhdGZvcm1OYXRpdmVTY3JpcHREeW5hbWljfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcGxhdGZvcm1cIjtcclxuaW1wb3J0IHsgRGF0YWJhc2UgfSBmcm9tIFwiLi9zaGFyZWQvZGF0YS9kYXRhYmFzZVwiO1xyXG5cclxuaW1wb3J0IHsgUmFkaW9CdXR0b25Nb2R1bGUgfSBmcm9tICduYXRpdmVzY3JpcHQtcmFkaW9idXR0b24vYW5ndWxhcidcclxuXHJcbi8vZXZhbHVhdGlvblxyXG5pbXBvcnQgeyBFdmFsdWF0aW9uQ29tcG9uZW50IH0gZnJvbSBcIi4vZXZhbHVhdGlvbi9ldmFsdWF0aW9uLmNvbXBvbmVudFwiO1xyXG5cclxuLy9pbXBvcnQgeyBOU19IVFRQX1BST1ZJREVSUyB9IGZyb20gJ25hdGl2ZXNjcmlwdC1hbmd1bGFyL2h0dHAnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICAgIGJvb3RzdHJhcDogW1xyXG4gICAgICAgIEFwcENvbXBvbmVudFxyXG4gICAgXSxcclxuICAgIGltcG9ydHM6IFtcclxuICAgICAgICBOYXRpdmVTY3JpcHRNb2R1bGUsXHJcbiAgICAgICAgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUsXHJcbiAgICAgICAgQXBwUm91dGluZ01vZHVsZSxcclxuICAgICAgICBIdHRwTW9kdWxlLFxyXG4gICAgICAgIE5hdGl2ZVNjcmlwdEh0dHBNb2R1bGUsXHJcbiAgICAgICAgUmFkaW9CdXR0b25Nb2R1bGVcclxuICAgICAgICBcclxuICAgIF0sXHJcbiAgICBkZWNsYXJhdGlvbnM6IFtcclxuICAgICAgICBBcHBDb21wb25lbnQsXHJcbiAgICAgICAgUGF0aWVudHNDb21wb25lbnQsXHJcbiAgICAgICAgUGF0aWVudERldGFpbENvbXBvbmVudCxcclxuICAgICAgICBNYXRlcmlhbHNDb21wb25lbnQsXHJcbiAgICAgICAgTmVlZENvbXBvbmVudCxcclxuICAgICAgICBUZXN0Q29tcG9uZW50LFxyXG4gICAgICAgIEV2YWx1YXRpb25Db21wb25lbnQsXHJcbiAgICAgICAgTWF0ZXJpYWxEZXRhaWxDb21wb25lbnQsXHJcbiAgICAgICAgLi4ubmF2aWdhdGFibGVDb21wb25lbnRzXHJcbiAgICAgICBcclxuICAgIF0sXHJcbiAgICBwcm92aWRlcnM6IFtcclxuICAgICAgICBVc2VyU2VydmljZSxcclxuICAgICAgICBQYXRpZW50U2VydmljZSxcclxuICAgICAgICBDb25uZWN0b3JTZXJ2aWNlLFxyXG4gICAgICAgIERhdGFTZXJ2aWNlLFxyXG4gICAgICAgIERhdGFiYXNlLFxyXG4gICAgICAgIFxyXG4gICAgICAgXHJcbiAgICBdLFxyXG4gICAgc2NoZW1hczogW1xyXG4gICAgICAgIE5PX0VSUk9SU19TQ0hFTUFcclxuICAgIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIEFwcE1vZHVsZSB7IH1cclxuIl19