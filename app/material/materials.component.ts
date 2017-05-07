import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { Patient } from "../patient/patient";
import { Material } from "../material/material";
import { Need } from "../need/need";
import { PatientService } from "../patient/patient.service";

import buttonModule = require("ui/button");


import { openApp } from "nativescript-open-app";
import { openUrl } from "utils/utils";


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
		
		const id = +this.route.snapshot.params["id"];
		const idx = +this.route.snapshot.params["id_need"];

		

		this.patient = this.patientService.patients.filter(patient => patient.id === id)[0];
		this.need = this.patient.needs.filter(need => need.id === idx)[0];
		this.materials = this.need.materials;
		console.log(JSON.stringify(this.materials, null, 4));

		//openApp("com.facebook.katana");
		//openUrl("http://192.168.99.100/caregivers/public/materialsAPI/21/showContent")
		/*let i;
		let control = false;
		if(!control)
		for(i=0;i<this.materials.length;i++){
			if(this.materials[i].url && this.materials[i].path) {
				this.materials[i].url+=this.materials[i].path;
				this.materials[i].path = '';
			}
			control = true;		
		}
		*/
		
	}

	openOnBrowser(id) {
		let material = this.materials.filter(material => material.id === id)[0];

		openUrl(material.url);
	}
}