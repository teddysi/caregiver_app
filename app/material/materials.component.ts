import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import app = require("application");

import { Patient } from "../patient/patient";
import { Material } from "../material/material";
import { Need } from "../need/need";
import { DataService } from "../shared/data/data.service";
import { PatientService } from "../patient/patient.service";

import buttonModule = require("ui/button");
import { Page } from "ui/page";

import { openApp } from "nativescript-open-app";
import { openUrl } from "utils/utils";

import { ConnectorService } from "../shared/connector/connector.service";
import { Router } from "@angular/router";


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
	hasEvaluationsToDo: boolean;

	constructor(
		private patientService: PatientService,
		private route: ActivatedRoute,
		private router: Router,
		private page: Page,
		private dataService: DataService,
		private connectorService: ConnectorService
	) { }

	ngOnInit(): void {
		console.log("# COMPONENT MATERIALS")
		const id = +this.route.snapshot.params["id"];
		const idx = +this.route.snapshot.params["id_need"];

		//return to patients List if do not have connection
		if (!this.connectorService.isConnected()) {
			this.router.navigate(['/patients']);
		}


		this.patientService.getPatients_BD();

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

		//evaluations
		this.hasEvaluationsToDo = this.patientService.hasEvaluationsToDo();
	}



	/**
	 * Function to set color of ratting on materials list
	 * 
	 * @param {any} rating 
	 * @returns 
	 * 
	 * @memberof MaterialsComponent
	 */
	getBorderColor(material) {
		if (material.evaluation == 0 || material.evaluation == 1 || material.evaluation == -1) {
			//console.log('A verficar rating existente dos materiais');
			//console.log(JSON.stringify(material, null, 4));
		
			//console.log("MATERIAL EVALUATION: " + material.evaluation);
			switch (material.evaluation) {
				case 0:
					//console.log('Amarelo');
					return { 'background-color': 'yellow' };
				case -1:
					//console.log('Vermelho');
					return { 'background-color': 'red' };
				case 1:
					//console.log('Verde');
					return { 'background-color': 'green' };
				default:
					return { 'background-color': 'black' };
			}
		}
	}



	/**
	 * Function to add properties of the "parent" need to the "child" material
	 * 
	 * 
	 * @memberof MaterialsComponent
	 */
	addPropertyNeedOnMaterial() {
		let materials_temp: Material[];
		materials_temp = [];

		this.patient.needs.forEach(need => {
			need.materials.forEach(materialOfaNeed => {
				materialOfaNeed["need_id"] = need.id;
				materialOfaNeed["need_description"] = "[ " + need.description + " ]";
				//testar se o material ja está na lista
				if (materials_temp.filter(material => material.id === materialOfaNeed.id).length > 0) {
					materials_temp.filter(material => material.id === materialOfaNeed.id)[0]["need_description"] += " [ " + need.description + " ]";
				} else {
					materials_temp.push(materialOfaNeed);
				}

			});
		});

		this.materials = materials_temp;
	}

	ngAfterViewInit() {
		if (app.android) {
			app.android.on(app.AndroidApplication.activityBackPressedEvent, this.backEvent);
		}
	}

	ngOnDestroy() {
		// cleaning up references/listeners.
		if (app.android) {
			app.android.off(app.AndroidApplication.activityBackPressedEvent, this.backEvent);
		}
	}

	/**
	 * Function to disable back button on android
	 * 
	 * @param {any} args 
	 * @returns 
	 * 
	 * @memberof PatientsComponent
	 */
	backEvent(args) {
		args.cancel = true;
		return;

	}

	getIcon(materialType) {
		switch (materialType) {
			case 'text': return '\uf044';
			case 'image': return '\uf083';
			case 'video': return '\uf008';
			case 'composite': return '\uf26c';
			case 'emergencyContact': return '\uf0f9';
			default:
				break;
		}
	}

}