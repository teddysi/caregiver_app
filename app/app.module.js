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
var user_service_1 = require("./shared/user/user.service");
var data_service_1 = require("./shared/data/data.service");
var database_1 = require("./shared/data/database");
var angular_1 = require("nativescript-radiobutton/angular");
//evaluation
var evaluation_component_1 = require("./evaluation/evaluation.component");
var evaluation_list_component_1 = require("./evaluation/evaluation-list.component");
var profile_component_1 = require("./profile/profile.component");
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
            evaluation_list_component_1.EvaluationListComponent,
            material_detail_component_1.MaterialDetailComponent,
            profile_component_1.ProfileComponent
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLDZEQUE4RDtBQUM5RCxzQ0FBMkQ7QUFDM0QsZ0ZBQThFO0FBQzlFLDZDQUF3RTtBQUN4RSxpREFBK0M7QUFDL0Msb0RBQXFFO0FBQ3JFLHNDQUEyQztBQUMzQyx3REFBc0Q7QUFDdEQsMEVBQXdFO0FBRXhFLDZEQUEyRDtBQUMzRCxtRUFBaUU7QUFDakUsK0VBQTRFO0FBRTVFLHNFQUFvRTtBQUNwRSxrRkFBK0U7QUFFL0Usd0RBQXNEO0FBRXRELDJEQUF5RDtBQUV6RCwyREFBeUQ7QUFDekQsbURBQWtEO0FBRWxELDREQUFvRTtBQUVwRSxZQUFZO0FBQ1osMEVBQXdFO0FBQ3hFLG9GQUFpRjtBQUNqRixpRUFBK0Q7QUFFL0QsZ0VBQWdFO0FBMENoRSxJQUFhLFNBQVM7SUFBdEI7SUFBeUIsQ0FBQztJQUFELGdCQUFDO0FBQUQsQ0FBQyxBQUExQixJQUEwQjtBQUFiLFNBQVM7SUF4Q3JCLGVBQVEsQ0FBQztRQUNOLFNBQVMsRUFBRTtZQUNQLDRCQUFZO1NBQ2Y7UUFDRCxPQUFPLEVBQUU7WUFDTCx3Q0FBa0I7WUFDbEIsK0JBQXVCO1lBQ3ZCLDhCQUFnQjtZQUNoQixpQkFBVTtZQUNWLDZDQUFzQjtZQUN0QiwyQkFBaUI7U0FFcEI7UUFDRCxZQUFZO1lBQ1IsNEJBQVk7WUFDWixzQ0FBaUI7WUFDakIsaURBQXNCO1lBQ3RCLHdDQUFrQjtZQUNsQiw4QkFBYTtZQUNiLDhCQUFhO1lBQ2IsMENBQW1CO1lBQ25CLG1EQUF1QjtZQUN2QixtREFBdUI7WUFDdkIsb0NBQWdCO2lCQUNiLG1DQUFxQixDQUUzQjtRQUNELFNBQVMsRUFBRTtZQUVQLDBCQUFXO1lBQ1gsZ0NBQWM7WUFDZCxvQ0FBZ0I7WUFDaEIsMEJBQVc7WUFDWCxtQkFBUTtTQUVYO1FBQ0QsT0FBTyxFQUFFO1lBQ0wsdUJBQWdCO1NBQ25CO0tBQ0osQ0FBQztHQUNXLFNBQVMsQ0FBSTtBQUFiLDhCQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcGxhdGZvcm1OYXRpdmVTY3JpcHREeW5hbWljfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcGxhdGZvcm1cIjtcclxuaW1wb3J0IHsgTmF0aXZlU2NyaXB0SHR0cE1vZHVsZSB9IGZyb20gJ25hdGl2ZXNjcmlwdC1hbmd1bGFyJztcclxuaW1wb3J0IHsgTmdNb2R1bGUsIE5PX0VSUk9SU19TQ0hFTUEgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvbmF0aXZlc2NyaXB0Lm1vZHVsZVwiO1xyXG5pbXBvcnQgeyBBcHBSb3V0aW5nTW9kdWxlLCBuYXZpZ2F0YWJsZUNvbXBvbmVudHMgfSBmcm9tIFwiLi9hcHAucm91dGluZ1wiO1xyXG5pbXBvcnQgeyBBcHBDb21wb25lbnQgfSBmcm9tIFwiLi9hcHAuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdEZvcm1zTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2Zvcm1zXCI7XHJcbmltcG9ydCB7IEh0dHBNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9odHRwJztcclxuaW1wb3J0IHsgVGVzdENvbXBvbmVudCB9IGZyb20gXCIuL3Rlc3QvdGVzdC5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgQ29ubmVjdG9yU2VydmljZSB9IGZyb20gXCIuL3NoYXJlZC9jb25uZWN0b3IvY29ubmVjdG9yLnNlcnZpY2VcIjtcclxuXHJcbmltcG9ydCB7IFBhdGllbnRTZXJ2aWNlIH0gZnJvbSBcIi4vcGF0aWVudC9wYXRpZW50LnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgUGF0aWVudHNDb21wb25lbnQgfSBmcm9tIFwiLi9wYXRpZW50L3BhdGllbnRzLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBQYXRpZW50RGV0YWlsQ29tcG9uZW50IH0gZnJvbSBcIi4vcGF0aWVudC9wYXRpZW50LWRldGFpbC5jb21wb25lbnRcIjtcclxuXHJcbmltcG9ydCB7IE1hdGVyaWFsc0NvbXBvbmVudCB9IGZyb20gXCIuL21hdGVyaWFsL21hdGVyaWFscy5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgTWF0ZXJpYWxEZXRhaWxDb21wb25lbnQgfSBmcm9tIFwiLi9tYXRlcmlhbC9tYXRlcmlhbC1kZXRhaWwuY29tcG9uZW50XCI7XHJcblxyXG5pbXBvcnQgeyBOZWVkQ29tcG9uZW50IH0gZnJvbSBcIi4vbmVlZC9uZWVkLmNvbXBvbmVudFwiO1xyXG5cclxuaW1wb3J0IHsgVXNlclNlcnZpY2UgfSBmcm9tIFwiLi9zaGFyZWQvdXNlci91c2VyLnNlcnZpY2VcIjtcclxuXHJcbmltcG9ydCB7IERhdGFTZXJ2aWNlIH0gZnJvbSBcIi4vc2hhcmVkL2RhdGEvZGF0YS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IERhdGFiYXNlIH0gZnJvbSBcIi4vc2hhcmVkL2RhdGEvZGF0YWJhc2VcIjtcclxuXHJcbmltcG9ydCB7IFJhZGlvQnV0dG9uTW9kdWxlIH0gZnJvbSAnbmF0aXZlc2NyaXB0LXJhZGlvYnV0dG9uL2FuZ3VsYXInXHJcblxyXG4vL2V2YWx1YXRpb25cclxuaW1wb3J0IHsgRXZhbHVhdGlvbkNvbXBvbmVudCB9IGZyb20gXCIuL2V2YWx1YXRpb24vZXZhbHVhdGlvbi5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgRXZhbHVhdGlvbkxpc3RDb21wb25lbnQgfSBmcm9tIFwiLi9ldmFsdWF0aW9uL2V2YWx1YXRpb24tbGlzdC5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgUHJvZmlsZUNvbXBvbmVudCB9IGZyb20gXCIuL3Byb2ZpbGUvcHJvZmlsZS5jb21wb25lbnRcIjtcclxuXHJcbi8vaW1wb3J0IHsgTlNfSFRUUF9QUk9WSURFUlMgfSBmcm9tICduYXRpdmVzY3JpcHQtYW5ndWxhci9odHRwJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgICBib290c3RyYXA6IFtcclxuICAgICAgICBBcHBDb21wb25lbnRcclxuICAgIF0sXHJcbiAgICBpbXBvcnRzOiBbXHJcbiAgICAgICAgTmF0aXZlU2NyaXB0TW9kdWxlLFxyXG4gICAgICAgIE5hdGl2ZVNjcmlwdEZvcm1zTW9kdWxlLFxyXG4gICAgICAgIEFwcFJvdXRpbmdNb2R1bGUsXHJcbiAgICAgICAgSHR0cE1vZHVsZSxcclxuICAgICAgICBOYXRpdmVTY3JpcHRIdHRwTW9kdWxlLFxyXG4gICAgICAgIFJhZGlvQnV0dG9uTW9kdWxlXHJcbiAgICAgICAgXHJcbiAgICBdLFxyXG4gICAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICAgICAgQXBwQ29tcG9uZW50LFxyXG4gICAgICAgIFBhdGllbnRzQ29tcG9uZW50LFxyXG4gICAgICAgIFBhdGllbnREZXRhaWxDb21wb25lbnQsXHJcbiAgICAgICAgTWF0ZXJpYWxzQ29tcG9uZW50LFxyXG4gICAgICAgIE5lZWRDb21wb25lbnQsXHJcbiAgICAgICAgVGVzdENvbXBvbmVudCxcclxuICAgICAgICBFdmFsdWF0aW9uQ29tcG9uZW50LFxyXG4gICAgICAgIEV2YWx1YXRpb25MaXN0Q29tcG9uZW50LFxyXG4gICAgICAgIE1hdGVyaWFsRGV0YWlsQ29tcG9uZW50LFxyXG4gICAgICAgIFByb2ZpbGVDb21wb25lbnQsXHJcbiAgICAgICAgLi4ubmF2aWdhdGFibGVDb21wb25lbnRzXHJcbiAgICAgICBcclxuICAgIF0sXHJcbiAgICBwcm92aWRlcnM6IFtcclxuICAgICAgICBcclxuICAgICAgICBVc2VyU2VydmljZSxcclxuICAgICAgICBQYXRpZW50U2VydmljZSxcclxuICAgICAgICBDb25uZWN0b3JTZXJ2aWNlLFxyXG4gICAgICAgIERhdGFTZXJ2aWNlLFxyXG4gICAgICAgIERhdGFiYXNlLFxyXG4gICAgICAgIFxyXG4gICAgXSxcclxuICAgIHNjaGVtYXM6IFtcclxuICAgICAgICBOT19FUlJPUlNfU0NIRU1BXHJcbiAgICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBcHBNb2R1bGUgeyB9XHJcbiJdfQ==