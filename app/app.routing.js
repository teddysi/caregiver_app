"use strict";
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var login_component_1 = require("./login/login.component");
var patients_component_1 = require("./patient/patients.component");
var patient_detail_component_1 = require("./patient/patient-detail.component");
var materials_component_1 = require("./material/materials.component");
var material_detail_component_1 = require("./material/material-detail.component");
var evaluation_component_1 = require("./evaluation/evaluation.component");
var evaluation_list_component_1 = require("./evaluation/evaluation-list.component");
var routes = [
    { path: "", component: login_component_1.LoginComponent },
    //{ path: "", redirectTo: "/patients", pathMatch: "full" },
    //{ path: "test", component: TestComponent },
    //{ path: "needs", component: NeedComponent },
    { path: "patients", component: patients_component_1.PatientsComponent },
    { path: "patient/:id", component: patient_detail_component_1.PatientDetailComponent },
    //{path: "patient/:id/needs", component: NeedComponent }, // teddy - Tota e vista pode vir a ser usada para fins de classificacao
    //Materials
    { path: "patient/:id/materials", component: materials_component_1.MaterialsComponent },
    { path: "patient/:id/material/:id_material", component: material_detail_component_1.MaterialDetailComponent },
    //Evaluation
    { path: "evaluations", component: evaluation_list_component_1.EvaluationListComponent },
    { path: "patient/:id/material/:id_material/evaluation", component: evaluation_component_1.EvaluationComponent }
];
exports.navigatableComponents = [
    login_component_1.LoginComponent
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    return AppRoutingModule;
}());
AppRoutingModule = __decorate([
    core_1.NgModule({
        imports: [router_1.NativeScriptRouterModule.forRoot(routes)],
        exports: [router_1.NativeScriptRouterModule]
    })
], AppRoutingModule);
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLnJvdXRpbmcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhcHAucm91dGluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsc0NBQXlDO0FBQ3pDLHNEQUF1RTtBQUd2RSwyREFBeUQ7QUFDekQsbUVBQWlFO0FBQ2pFLCtFQUE0RTtBQUM1RSxzRUFBb0U7QUFDcEUsa0ZBQStFO0FBRy9FLDBFQUF3RTtBQUV4RSxvRkFBaUY7QUFFakYsSUFBTSxNQUFNLEdBQVc7SUFDbkIsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxnQ0FBYyxFQUFFO0lBQ3ZDLDJEQUEyRDtJQUMzRCw2Q0FBNkM7SUFDN0MsOENBQThDO0lBQzlDLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsc0NBQWlCLEVBQUU7SUFDbEQsRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLFNBQVMsRUFBRSxpREFBc0IsRUFBRTtJQUUxRCxpSUFBaUk7SUFDakksV0FBVztJQUNYLEVBQUUsSUFBSSxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSx3Q0FBa0IsRUFBRTtJQUNoRSxFQUFFLElBQUksRUFBRSxtQ0FBbUMsRUFBRSxTQUFTLEVBQUUsbURBQXVCLEVBQUU7SUFFakYsWUFBWTtJQUNiLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxTQUFTLEVBQUUsbURBQXVCLEVBQUU7SUFDM0QsRUFBRSxJQUFJLEVBQUUsOENBQThDLEVBQUUsU0FBUyxFQUFFLDBDQUFtQixFQUFFO0NBRTFGLENBQUM7QUFFVyxRQUFBLHFCQUFxQixHQUFHO0lBQ25DLGdDQUFjO0NBQ2YsQ0FBQztBQU9GLElBQWEsZ0JBQWdCO0lBQTdCO0lBQWdDLENBQUM7SUFBRCx1QkFBQztBQUFELENBQUMsQUFBakMsSUFBaUM7QUFBcEIsZ0JBQWdCO0lBTDVCLGVBQVEsQ0FBQztRQUNOLE9BQU8sRUFBRSxDQUFDLGlDQUF3QixDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNuRCxPQUFPLEVBQUUsQ0FBQyxpQ0FBd0IsQ0FBQztLQUN0QyxDQUFDO0dBRVcsZ0JBQWdCLENBQUk7QUFBcEIsNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IFJvdXRlcyB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuXHJcbmltcG9ydCB7IExvZ2luQ29tcG9uZW50IH0gZnJvbSBcIi4vbG9naW4vbG9naW4uY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IFBhdGllbnRzQ29tcG9uZW50IH0gZnJvbSBcIi4vcGF0aWVudC9wYXRpZW50cy5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgUGF0aWVudERldGFpbENvbXBvbmVudCB9IGZyb20gXCIuL3BhdGllbnQvcGF0aWVudC1kZXRhaWwuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IE1hdGVyaWFsc0NvbXBvbmVudCB9IGZyb20gXCIuL21hdGVyaWFsL21hdGVyaWFscy5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgTWF0ZXJpYWxEZXRhaWxDb21wb25lbnQgfSBmcm9tIFwiLi9tYXRlcmlhbC9tYXRlcmlhbC1kZXRhaWwuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IE5lZWRDb21wb25lbnQgfSBmcm9tIFwiLi9uZWVkL25lZWQuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IFRlc3RDb21wb25lbnQgfSBmcm9tIFwiLi90ZXN0L3Rlc3QuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IEV2YWx1YXRpb25Db21wb25lbnQgfSBmcm9tIFwiLi9ldmFsdWF0aW9uL2V2YWx1YXRpb24uY29tcG9uZW50XCI7XHJcbiBcclxuaW1wb3J0IHsgRXZhbHVhdGlvbkxpc3RDb21wb25lbnQgfSBmcm9tIFwiLi9ldmFsdWF0aW9uL2V2YWx1YXRpb24tbGlzdC5jb21wb25lbnRcIjtcclxuXHJcbmNvbnN0IHJvdXRlczogUm91dGVzID0gW1xyXG4gICAgeyBwYXRoOiBcIlwiLCBjb21wb25lbnQ6IExvZ2luQ29tcG9uZW50IH0sIFxyXG4gICAgLy97IHBhdGg6IFwiXCIsIHJlZGlyZWN0VG86IFwiL3BhdGllbnRzXCIsIHBhdGhNYXRjaDogXCJmdWxsXCIgfSxcclxuICAgIC8veyBwYXRoOiBcInRlc3RcIiwgY29tcG9uZW50OiBUZXN0Q29tcG9uZW50IH0sXHJcbiAgICAvL3sgcGF0aDogXCJuZWVkc1wiLCBjb21wb25lbnQ6IE5lZWRDb21wb25lbnQgfSxcclxuICAgIHsgcGF0aDogXCJwYXRpZW50c1wiLCBjb21wb25lbnQ6IFBhdGllbnRzQ29tcG9uZW50IH0sXHJcbiAgICB7IHBhdGg6IFwicGF0aWVudC86aWRcIiwgY29tcG9uZW50OiBQYXRpZW50RGV0YWlsQ29tcG9uZW50IH0sXHJcblxyXG4gICAgLy97cGF0aDogXCJwYXRpZW50LzppZC9uZWVkc1wiLCBjb21wb25lbnQ6IE5lZWRDb21wb25lbnQgfSwgLy8gdGVkZHkgLSBUb3RhIGUgdmlzdGEgcG9kZSB2aXIgYSBzZXIgdXNhZGEgcGFyYSBmaW5zIGRlIGNsYXNzaWZpY2FjYW9cclxuICAgIC8vTWF0ZXJpYWxzXHJcbiAgICB7IHBhdGg6IFwicGF0aWVudC86aWQvbWF0ZXJpYWxzXCIsIGNvbXBvbmVudDogTWF0ZXJpYWxzQ29tcG9uZW50IH0sXHJcbiAgICB7IHBhdGg6IFwicGF0aWVudC86aWQvbWF0ZXJpYWwvOmlkX21hdGVyaWFsXCIsIGNvbXBvbmVudDogTWF0ZXJpYWxEZXRhaWxDb21wb25lbnQgfSxcclxuXHJcbiAgICAvL0V2YWx1YXRpb25cclxuICAgeyBwYXRoOiBcImV2YWx1YXRpb25zXCIsIGNvbXBvbmVudDogRXZhbHVhdGlvbkxpc3RDb21wb25lbnQgfSxcclxuICAgeyBwYXRoOiBcInBhdGllbnQvOmlkL21hdGVyaWFsLzppZF9tYXRlcmlhbC9ldmFsdWF0aW9uXCIsIGNvbXBvbmVudDogRXZhbHVhdGlvbkNvbXBvbmVudCB9XHJcbiAgICAgICBcclxuXTtcclxuXHJcbmV4cG9ydCBjb25zdCBuYXZpZ2F0YWJsZUNvbXBvbmVudHMgPSBbXHJcbiAgTG9naW5Db21wb25lbnRcclxuXTtcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgICBpbXBvcnRzOiBbTmF0aXZlU2NyaXB0Um91dGVyTW9kdWxlLmZvclJvb3Qocm91dGVzKV0sXHJcbiAgICBleHBvcnRzOiBbTmF0aXZlU2NyaXB0Um91dGVyTW9kdWxlXVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIEFwcFJvdXRpbmdNb2R1bGUgeyB9Il19