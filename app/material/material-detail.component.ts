import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { Patient } from "../patient/patient";
import { PatientService } from "../patient/patient.service";
import { DataService } from "../shared/data/data.service";
import { Material } from "./material";
import { Rating } from "./rating";
import { Need } from "../need/need";

import app = require("application");
import platform = require("platform");

import buttonModule = require("ui/button");

import { Router } from "@angular/router";


import { openApp } from "nativescript-open-app";
import { openUrl } from "utils/utils";

import { ConnectorService } from "../shared/connector/connector.service";

import 'nativescript-pdf-view';

@Component({
    selector: "material-details",
    moduleId: module.id,
    templateUrl: "./material-detail.component.html",
})
export class MaterialDetailComponent implements OnInit {
    patient: Patient;
    need: Need;
    materialsOfAllNeeds: Material[];
    materialParent: Material;
    materialsToDisplay: Material[];

    hasEvaluationsToDo: boolean;

    ratings: Rating[];
    //ratings.push(new Rating("1", "Mau"));
    // ratings = [Rating("1", "Mau"), Rating("2", "Medio")]

    constructor(
        private patientService: PatientService,
        private route: ActivatedRoute,
        private router: Router,
        private dataService: DataService,
        private connectorService: ConnectorService
    ) {
        this.ratings = [];
    }


    ngOnInit(): void {
        console.log("# COMPONENTE MATERIAL-DETAIL")
        //rating test

        const id = +this.route.snapshot.params["id"];
        const idx = +this.route.snapshot.params["id_material"];

        //return to patients List if do not have connection
        if (!this.connectorService.isConnected()) {
            this.router.navigate(['/patients']);
        }


        console.log("ID PACIENTE " + id + " ID MATERIAL" + idx)
        this.patient = this.patientService.patients.filter(patient => patient.id === id)[0];
        // criar lista de materiais com propriadade adicional need name and need description
        this.addPropertyNeedOnMaterial();
        //console.log("MATERIALOFALLNEEDS : " + JSON.stringify(this.materialsOfAllNeeds, null, 4));
        this.materialParent = this.materialsOfAllNeeds.filter(material => material.id === idx)[0];

        //console.log("---------------------------------------------------------------: ");
        //console.log("MATERIALParent : " + JSON.stringify(this.materialParent, null, 4));
        //verificar se é um composite
        if (this.materialParent.type == "composite") {//material composto -> carregar o array 
            this.materialsToDisplay = this.materialParent.materials;
        } else {//material simples basta carregar para vista
            this.materialsToDisplay = [];
            this.materialsToDisplay.push(this.materialParent);

        }

        // console.log(JSON.stringify(this.materials, null, 4));

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

        //Evaluations
        this.hasEvaluationsToDo = this.patientService.hasEvaluationsToDo();

    }


    /**
     * Function to add properties of the "parent" need to the "child" material
     * 
     * 
     * @memberof MaterialDetailComponent
     */
    addPropertyNeedOnMaterial() {
        let materials_temp: Material[];
        materials_temp = [];

        this.patient.needs.forEach(need => {
            need.materials.forEach(materialOfaNeed => {
                materialOfaNeed["need_id"] = need.id;
                materialOfaNeed["need_description"] = need.description;
                //console.log("MATERIAL : " + JSON.stringify(materialOfaNeed, null, 4));
                materials_temp.push(materialOfaNeed);
            });
        });

        this.materialsOfAllNeeds = materials_temp;
    }



    /**
     * Function to open external materials [pdf ...]
     * 
     * @param {any} id 
     * 
     * @memberof MaterialDetailComponent
     */
    openOnBrowser(id) {
        let material = this.materialsToDisplay.filter(material => material.id === id)[0];
        openUrl(material.url);
    }



    /**
     * Function to rate material [red,yellow,green]
     * 
     * @param {any} level 
     * 
     * @memberof MaterialDetailComponent
     */
    evaluateMaterial(level) {

        let rating = new Rating();
        rating.id = Date.now();
        rating.evaluation = level;
        rating.id_material = this.materialParent.id;

        this.ratings.push(rating);

        this.dataService.setRating(rating);

    }

    /*
     ononMaterialPicker(){
         console.log("MAterial picado")
 
     }
 
     
         avaliarCuidador(id) {
             //rota para o formulario - teddy
             //let material = this.materialsToDisplay.filter(material => material.id === id)[0];
 
             //openUrl(material.url);
             this.router.navigate(['/patient', this.patient.id, 'material', id,"evaluation"]);
         }*/



    getRatings() {
        return this.ratings;
    }



    /**
     * function to navigate to the material questionnaire
     * 
     * @param {any} ref_questionnaire 
     * 
     * @memberof MaterialDetailComponent
     */
    fillQuestionnaire(ref_questionnaire) {
        this.router.navigate(['/evaluation', ref_questionnaire]);
    }

}
