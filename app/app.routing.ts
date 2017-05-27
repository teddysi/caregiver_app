import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

import { LoginComponent } from "./login/login.component";
import { PatientsComponent } from "./patient/patients.component";
import { PatientDetailComponent } from "./patient/patient-detail.component";
import { MaterialsComponent } from "./material/materials.component";
import { MaterialDetailComponent } from "./material/material-detail.component";
import { NeedComponent } from "./need/need.component";
import { TestComponent } from "./test/test.component";
import { EvaluationComponent } from "./evaluation/evaluation.component";
 
import { EvaluationListComponent } from "./evaluation/evaluation-list.component";

const routes: Routes = [
    { path: "", component: LoginComponent }, 
    //{ path: "", redirectTo: "/patients", pathMatch: "full" },
    //{ path: "test", component: TestComponent },
    //{ path: "needs", component: NeedComponent },
    { path: "patients", component: PatientsComponent },
    { path: "patient/:id", component: PatientDetailComponent },

    //{path: "patient/:id/needs", component: NeedComponent }, // teddy - Tota e vista pode vir a ser usada para fins de classificacao
    //Materials
    { path: "patient/:id/materials", component: MaterialsComponent },
    { path: "patient/:id/material/:id_material", component: MaterialDetailComponent },

    //Evaluation
   { path: "evaluations", component: EvaluationListComponent },
   { path: "evaluation/:ref_questionnaire", component: EvaluationComponent },

   { path: "patient/:id/material/:id_material/evaluation", component: EvaluationComponent }
       
];

export const navigatableComponents = [
  LoginComponent
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})

export class AppRoutingModule { }