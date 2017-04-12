import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { Patient } from "../patient/patient";
import { PatientService } from "../patient/patient.service";

@Component({
	selector: 'materials',
	moduleId: module.id,
	templateUrl: './materials.component.html',
	styleUrls: ['./materials.component.css']
})

export class MaterialsComponent implements OnInit {
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