import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { Patient } from "../patient/patient";
import { PatientService } from "../patient/patient.service";
import { Material } from "./material";
import { Rating } from "./rating";
import { Need } from "../need/need";

import app = require("application");
import platform = require("platform");

import buttonModule = require("ui/button");


import { openApp } from "nativescript-open-app";
import { openUrl } from "utils/utils";


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

    ratings: Rating[];
    //ratings.push(new Rating("1", "Mau"));
   // ratings = [Rating("1", "Mau"), Rating("2", "Medio")]

    constructor(
        private patientService: PatientService,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        //rating test
     
     


        const id = +this.route.snapshot.params["id"];
        const idx = +this.route.snapshot.params["id_material"];
        console.log("ID PACIENTE " +id + " ID MATERIAL" +idx)
        this.patient = this.patientService.patients.filter(patient => patient.id === id)[0];
        // criar lista de materiais com propriadade adicional need name and need description
        this.addPropertyNeedOnMaterial();
        //console.log("MATERIALOFALLNEEDS : " + JSON.stringify(this.materialsOfAllNeeds, null, 4));
        this.materialParent = this.materialsOfAllNeeds.filter(material => material.id === idx)[0];
        
        //console.log("---------------------------------------------------------------: ");
       //console.log("MATERIALParent : " + JSON.stringify(this.materialParent, null, 4));
        //verificar se é um composite
        if (this.materialParent.type == "composite") {//material composto -> carregar o array 
            this.materialsToDisplay= this.materialParent.materials;         
        } else {//material simples basta carregar para vista
            this.materialsToDisplay=[];
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

    }

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

    openOnBrowser(id) {
        let material = this.materialsToDisplay.filter(material => material.id === id)[0];

        openUrl(material.url);
    }

    //rating
    onGreen(){
        console.log("GREEN")

    }
    onYellow(){
        console.log("Yellow")

    }
    onRed(){
        console.log("Red")

    }
    ononMaterialPicker(){
        console.log("MAterial picado")

    }
}
