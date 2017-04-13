import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

import { PatientsComponent } from "./patient/patients.component";
import { PatientDetailComponent } from "./patient/patient-detail.component";
import { MaterialsComponent } from "./material/materials.component";


const routes: Routes = [
    { path: "", redirectTo: "/patients", pathMatch: "full" },
    { path: "patients", component: PatientsComponent },
    { path: "patient/:id", component: PatientDetailComponent },
    {path: "patient/:id/materials", component: MaterialsComponent }
       
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }