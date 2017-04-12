import {NativeScriptHttpModule} from 'nativescript-angular';
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { AppRoutingModule } from "./app.routing";
import { AppComponent } from "./app.component";


import { PatientService } from "./patient/patient.service";
import { PatientsComponent } from "./patient/patients.component";
import { PatientDetailComponent } from "./patient/patient-detail.component";

import { HttpModule } from '@angular/http';
import { MaterialsComponent } from "./material/materials.component";

//import { NS_HTTP_PROVIDERS } from 'nativescript-angular/http';



@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        HttpModule,
        NativeScriptHttpModule
        
    ],
    declarations: [
        AppComponent,
        PatientsComponent,
        PatientDetailComponent,
        MaterialsComponent
    ],
    providers: [
        PatientService,
        
       
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
