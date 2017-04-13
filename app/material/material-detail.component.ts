import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { Patient } from "../patient/patient";
import { PatientService } from "../patient/patient.service";
import { Material } from "./material";

import 'nativescript-pdf-view';

@Component({
    selector: "material-details",
    moduleId: module.id,
    templateUrl: "./material-detail.component.html",
})
export class MaterialDetailComponent implements OnInit {
    patient: Patient;
    material: Material;
   

    constructor(
        private patientService: PatientService,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        const id = +this.route.snapshot.params["id"];
        const idx = +this.route.snapshot.params["idx"]; 
        this.patient = this.patientService.getPatient(id);
        this.material = this.patient.materials[idx];
        
    }
}
