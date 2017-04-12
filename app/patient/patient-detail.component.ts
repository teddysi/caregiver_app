import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { Patient} from "./patient";
import { PatientService } from "./patient.service";

@Component({
    selector: "ns-details",
    moduleId: module.id,
    templateUrl: "./patient-detail.component.html",
})
export class PatientDetailComponent implements OnInit {
    patient: Patient;

    constructor(
        private patientService: PatientService,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        const id = +this.route.snapshot.params["id"];
        this.patient = this.patientService.getPatient(id);
    }
}
