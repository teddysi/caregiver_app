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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLDZEQUE4RDtBQUM5RCxzQ0FBMkQ7QUFDM0QsZ0ZBQThFO0FBQzlFLDZDQUF3RTtBQUN4RSxpREFBK0M7QUFDL0Msb0RBQXFFO0FBQ3JFLHNDQUEyQztBQUMzQyx3REFBc0Q7QUFDdEQsMEVBQXdFO0FBRXhFLDZEQUEyRDtBQUMzRCxtRUFBaUU7QUFDakUsK0VBQTRFO0FBRTVFLHNFQUFvRTtBQUNwRSxrRkFBK0U7QUFFL0Usd0RBQXNEO0FBRXRELDJEQUF5RDtBQUV6RCwyREFBeUQ7QUFDekQsbURBQWtEO0FBRWxELDREQUFvRTtBQUVwRSxZQUFZO0FBQ1osMEVBQXdFO0FBQ3hFLG9GQUFpRjtBQUVqRixnRUFBZ0U7QUF5Q2hFLElBQWEsU0FBUztJQUF0QjtJQUF5QixDQUFDO0lBQUQsZ0JBQUM7QUFBRCxDQUFDLEFBQTFCLElBQTBCO0FBQWIsU0FBUztJQXZDckIsZUFBUSxDQUFDO1FBQ04sU0FBUyxFQUFFO1lBQ1AsNEJBQVk7U0FDZjtRQUNELE9BQU8sRUFBRTtZQUNMLHdDQUFrQjtZQUNsQiwrQkFBdUI7WUFDdkIsOEJBQWdCO1lBQ2hCLGlCQUFVO1lBQ1YsNkNBQXNCO1lBQ3RCLDJCQUFpQjtTQUVwQjtRQUNELFlBQVk7WUFDUiw0QkFBWTtZQUNaLHNDQUFpQjtZQUNqQixpREFBc0I7WUFDdEIsd0NBQWtCO1lBQ2xCLDhCQUFhO1lBQ2IsOEJBQWE7WUFDYiwwQ0FBbUI7WUFDbkIsbURBQXVCO1lBQ3ZCLG1EQUF1QjtpQkFDcEIsbUNBQXFCLENBRTNCO1FBQ0QsU0FBUyxFQUFFO1lBRVAsMEJBQVc7WUFDWCxnQ0FBYztZQUNkLG9DQUFnQjtZQUNoQiwwQkFBVztZQUNYLG1CQUFRO1NBRVg7UUFDRCxPQUFPLEVBQUU7WUFDTCx1QkFBZ0I7U0FDbkI7S0FDSixDQUFDO0dBQ1csU0FBUyxDQUFJO0FBQWIsOEJBQVMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBwbGF0Zm9ybU5hdGl2ZVNjcmlwdER5bmFtaWN9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9wbGF0Zm9ybVwiO1xyXG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRIdHRwTW9kdWxlIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXInO1xyXG5pbXBvcnQgeyBOZ01vZHVsZSwgTk9fRVJST1JTX1NDSEVNQSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdE1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9uYXRpdmVzY3JpcHQubW9kdWxlXCI7XHJcbmltcG9ydCB7IEFwcFJvdXRpbmdNb2R1bGUsIG5hdmlnYXRhYmxlQ29tcG9uZW50cyB9IGZyb20gXCIuL2FwcC5yb3V0aW5nXCI7XHJcbmltcG9ydCB7IEFwcENvbXBvbmVudCB9IGZyb20gXCIuL2FwcC5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZm9ybXNcIjtcclxuaW1wb3J0IHsgSHR0cE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xyXG5pbXBvcnQgeyBUZXN0Q29tcG9uZW50IH0gZnJvbSBcIi4vdGVzdC90ZXN0LmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBDb25uZWN0b3JTZXJ2aWNlIH0gZnJvbSBcIi4vc2hhcmVkL2Nvbm5lY3Rvci9jb25uZWN0b3Iuc2VydmljZVwiO1xyXG5cclxuaW1wb3J0IHsgUGF0aWVudFNlcnZpY2UgfSBmcm9tIFwiLi9wYXRpZW50L3BhdGllbnQuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBQYXRpZW50c0NvbXBvbmVudCB9IGZyb20gXCIuL3BhdGllbnQvcGF0aWVudHMuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IFBhdGllbnREZXRhaWxDb21wb25lbnQgfSBmcm9tIFwiLi9wYXRpZW50L3BhdGllbnQtZGV0YWlsLmNvbXBvbmVudFwiO1xyXG5cclxuaW1wb3J0IHsgTWF0ZXJpYWxzQ29tcG9uZW50IH0gZnJvbSBcIi4vbWF0ZXJpYWwvbWF0ZXJpYWxzLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBNYXRlcmlhbERldGFpbENvbXBvbmVudCB9IGZyb20gXCIuL21hdGVyaWFsL21hdGVyaWFsLWRldGFpbC5jb21wb25lbnRcIjtcclxuXHJcbmltcG9ydCB7IE5lZWRDb21wb25lbnQgfSBmcm9tIFwiLi9uZWVkL25lZWQuY29tcG9uZW50XCI7XHJcblxyXG5pbXBvcnQgeyBVc2VyU2VydmljZSB9IGZyb20gXCIuL3NoYXJlZC91c2VyL3VzZXIuc2VydmljZVwiO1xyXG5cclxuaW1wb3J0IHsgRGF0YVNlcnZpY2UgfSBmcm9tIFwiLi9zaGFyZWQvZGF0YS9kYXRhLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgRGF0YWJhc2UgfSBmcm9tIFwiLi9zaGFyZWQvZGF0YS9kYXRhYmFzZVwiO1xyXG5cclxuaW1wb3J0IHsgUmFkaW9CdXR0b25Nb2R1bGUgfSBmcm9tICduYXRpdmVzY3JpcHQtcmFkaW9idXR0b24vYW5ndWxhcidcclxuXHJcbi8vZXZhbHVhdGlvblxyXG5pbXBvcnQgeyBFdmFsdWF0aW9uQ29tcG9uZW50IH0gZnJvbSBcIi4vZXZhbHVhdGlvbi9ldmFsdWF0aW9uLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBFdmFsdWF0aW9uTGlzdENvbXBvbmVudCB9IGZyb20gXCIuL2V2YWx1YXRpb24vZXZhbHVhdGlvbi1saXN0LmNvbXBvbmVudFwiO1xyXG5cclxuLy9pbXBvcnQgeyBOU19IVFRQX1BST1ZJREVSUyB9IGZyb20gJ25hdGl2ZXNjcmlwdC1hbmd1bGFyL2h0dHAnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICAgIGJvb3RzdHJhcDogW1xyXG4gICAgICAgIEFwcENvbXBvbmVudFxyXG4gICAgXSxcclxuICAgIGltcG9ydHM6IFtcclxuICAgICAgICBOYXRpdmVTY3JpcHRNb2R1bGUsXHJcbiAgICAgICAgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUsXHJcbiAgICAgICAgQXBwUm91dGluZ01vZHVsZSxcclxuICAgICAgICBIdHRwTW9kdWxlLFxyXG4gICAgICAgIE5hdGl2ZVNjcmlwdEh0dHBNb2R1bGUsXHJcbiAgICAgICAgUmFkaW9CdXR0b25Nb2R1bGVcclxuICAgICAgICBcclxuICAgIF0sXHJcbiAgICBkZWNsYXJhdGlvbnM6IFtcclxuICAgICAgICBBcHBDb21wb25lbnQsXHJcbiAgICAgICAgUGF0aWVudHNDb21wb25lbnQsXHJcbiAgICAgICAgUGF0aWVudERldGFpbENvbXBvbmVudCxcclxuICAgICAgICBNYXRlcmlhbHNDb21wb25lbnQsXHJcbiAgICAgICAgTmVlZENvbXBvbmVudCxcclxuICAgICAgICBUZXN0Q29tcG9uZW50LFxyXG4gICAgICAgIEV2YWx1YXRpb25Db21wb25lbnQsXHJcbiAgICAgICAgRXZhbHVhdGlvbkxpc3RDb21wb25lbnQsXHJcbiAgICAgICAgTWF0ZXJpYWxEZXRhaWxDb21wb25lbnQsXHJcbiAgICAgICAgLi4ubmF2aWdhdGFibGVDb21wb25lbnRzXHJcbiAgICAgICBcclxuICAgIF0sXHJcbiAgICBwcm92aWRlcnM6IFtcclxuICAgICAgICBcclxuICAgICAgICBVc2VyU2VydmljZSxcclxuICAgICAgICBQYXRpZW50U2VydmljZSxcclxuICAgICAgICBDb25uZWN0b3JTZXJ2aWNlLFxyXG4gICAgICAgIERhdGFTZXJ2aWNlLFxyXG4gICAgICAgIERhdGFiYXNlLFxyXG4gICAgICAgIFxyXG4gICAgXSxcclxuICAgIHNjaGVtYXM6IFtcclxuICAgICAgICBOT19FUlJPUlNfU0NIRU1BXHJcbiAgICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBcHBNb2R1bGUgeyB9XHJcbiJdfQ==