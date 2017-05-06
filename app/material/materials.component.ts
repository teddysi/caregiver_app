import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { Patient } from "../patient/patient";
import { Material } from "../material/material";
import { Need } from "../need/need";
import { PatientService } from "../patient/patient.service";

@Component({
	selector: 'materials',
	moduleId: module.id,
	templateUrl: './materials.component.html',
	styleUrls: ['./materials.component.css']
})

export class MaterialsComponent implements OnInit {
	patient: Patient;
	need: Need;
	materials: Material [];




	constructor(
		private patientService: PatientService,
		private route: ActivatedRoute
	) { }

	ngOnInit(): void {

		

	

		//
		
		const id = +this.route.snapshot.params["id"];
		const idx = +this.route.snapshot.params["id_need"];
		//this.patient = this.patientService.getPatient(id);
		this.patient = this.patientService.patients.filter(patient => patient.id === id)[0];
	
		this.need = this.patient.needs.filter(need => need.id === idx)[0];
		//this.need = this.patient.needs[idx];
		this.materials = this.need.materials;
		console.log('>>>>> ' + this.materials);
		let i;
		
		for(i=0;i<this.materials.length;i++){
			if(this.materials[i].type=='imagem' || this.materials[i].type=='video'){
			this.materials[i].url+=this.materials[i].path;
			}
		}

	

	}
}