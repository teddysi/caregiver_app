import { platformNativeScriptDynamic} from "nativescript-angular/platform";
import { NativeScriptHttpModule } from 'nativescript-angular';
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { AppRoutingModule, navigatableComponents } from "./app.routing";
import { AppComponent } from "./app.component";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { HttpModule } from '@angular/http';
import { TestComponent } from "./test/test.component";
import { ConnectorService } from "./shared/connector/connector.service";

import { PatientService } from "./patient/patient.service";
import { PatientsComponent } from "./patient/patients.component";
import { PatientDetailComponent } from "./patient/patient-detail.component";

import { MaterialsComponent } from "./material/materials.component";
import { MaterialDetailComponent } from "./material/material-detail.component";

import { NeedComponent } from "./need/need.component";

import { UserService } from "./shared/user/user.service";

import { DataService } from "./shared/data/data.service";
import { Database } from "./shared/data/database";

//import { NS_HTTP_PROVIDERS } from 'nativescript-angular/http';

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        NativeScriptFormsModule,
        AppRoutingModule,
        HttpModule,
        NativeScriptHttpModule
        
    ],
    declarations: [
        AppComponent,
        PatientsComponent,
        PatientDetailComponent,
        MaterialsComponent,
        NeedComponent,
        TestComponent,
        MaterialDetailComponent,
        ...navigatableComponents
       
    ],
    providers: [
        
        UserService,
        PatientService,
        ConnectorService,
        DataService,
        Database,
        
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
