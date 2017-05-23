import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { Patient } from "../patient/patient";
import { Material } from "../material/material";
import { Need } from "../need/need";
import { DataService } from "../shared/data/data.service";
import { PatientService } from "../patient/patient.service";

import buttonModule = require("ui/button");
import { Page } from "ui/page";

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
	materials: Material[];
	rating_colors: {};

	constructor(
		private patientService: PatientService,
		private route: ActivatedRoute,
		private page: Page,
		private dataService: DataService
	) { }

	ngOnInit(): void {

		const id = +this.route.snapshot.params["id"];
		const idx = +this.route.snapshot.params["id_need"];

		this.patient = this.patientService.patients.filter(patient => patient.id === id)[0];

		// criar lista de materiais com propriadade adicional need name and need description
		this.addPropertyNeedOnMaterial();
		
		//	this.need = this.patient.needs.filter(need => need.id === idx)[0];
		//	this.materials = this.need.materials;
		//console.log("MATERIALS : " + JSON.stringify(this.materials, null, 4));

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

	getBorderColor(rating) {
		console.log('ENTROU!!!!!!!!!!!!!!!!!!!')
		if(rating) {
			console.log(JSON.stringify(rating[0], null, 4));
		}
		
		switch (rating) {
			case '0': 
				return 'yellow';
			case '-1': 
				return 'red';
			case '1': 
				return 'green';	
			default:
				return 'black';
		}	
	}
	addPropertyNeedOnMaterial() {
		let materials_temp: Material[];
		materials_temp = [];
		
		this.patient.needs.forEach(need => {
			need.materials.forEach(materialOfaNeed => {
				materialOfaNeed["need_id"] = need.id;
				materialOfaNeed["need_description"] = "[ " +need.description +" ]";
				//console.log("MATERIAL : " + JSON.stringify(materialOfaNeed, null, 4));
				//testar se o material ja está na lista
				if (materials_temp.filter(material => material.id === materialOfaNeed.id).length > 0) {
					materials_temp.filter(material => material.id === materialOfaNeed.id)[0]["need_description"] += " [ " + need.description + " ]";
				} else {
					materials_temp.push(materialOfaNeed);
				}

			});
		});
		
		//console.log(JSON.stringify(materials_temp, null, 4));
		//this.materials = this.dataService.getNeedMaterials();
		//console.log(JSON.stringify(this.dataService.getNeedMaterials()[0], null, 4));
		
		//console.log(JSON.stringify(materials_temp[0], null, 4));
		this.materials = materials_temp;
	}

	autoavaliarCuidador(id) {
		//rota para o formulario - teddy
		//let material = this.materialsToDisplay.filter(material => material.id === id)[0];

		//openUrl(material.url);
	}



}