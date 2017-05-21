import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Patient } from "../patient/patient";
import { Material } from "../material/material";
import { Evaluation } from "../evaluation/evaluation";
import { Need } from "../need/need";
import { PatientService } from "../patient/patient.service";
import buttonModule = require("ui/button");
import { openApp } from "nativescript-open-app";
import { openUrl } from "utils/utils";


@Component({
    selector: 'evaluation',
    moduleId: module.id,
    templateUrl: './evaluation.component.html',
    styleUrls: ['./evaluation.component.css']
})

export class EvaluationComponent implements OnInit {
    patient: Patient;
    need: Need;
    materialsOfAllNeeds: Material[];
    materialParent: Material; //é o material
    evaluations: Evaluation[];

    constructor(
        private patientService: PatientService,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        console.log("# COMPONENT EVALUATION ")

        //************************************************************************* */
        //para teste -> depois substituir pelo formulario que vem do servidor
        this.evaluations = [];
        this.evaluations.push(new Evaluation())
        this.evaluations[0].id = 0;
        this.evaluations[0].description = "Nivel de facilidade";
        this.evaluations.push(new Evaluation())
        this.evaluations[1].id = 1;
        this.evaluations[1].description = "Esta apto para continuar?";
        this.evaluations.push(new Evaluation())
        this.evaluations[2].id = 2;
        this.evaluations[2].description = "Tem experiencia na aplicacao deste material ?";
        //****************************************************************************** */

        //router params
        const id = +this.route.snapshot.params["id"];
        const idx = +this.route.snapshot.params["id_material"];
        //Get Patient
        this.patient = this.patientService.patients.filter(patient => patient.id === id)[0];
        //criar lista de materiais com propriadade adicional need name and need description
        this.addPropertyNeedOnMaterial();
        //Select material
        this.materialParent = this.materialsOfAllNeeds.filter(material => material.id === idx)[0];
    }


    /**
     * 
     * 
     * 
     * @memberof EvaluationComponent
     */
    addPropertyNeedOnMaterial() {
        let materials_temp: Material[];
        materials_temp = [];

        this.patient.needs.forEach(need => {
            need.materials.forEach(materialOfaNeed => {
                materialOfaNeed["need_id"] = need.id;
                materialOfaNeed["need_description"] = need.description;
                materials_temp.push(materialOfaNeed);
            });
        });

        this.materialsOfAllNeeds = materials_temp;
    }


    /**
     * 
     * 
     * 
     * @memberof EvaluationComponent
     */
    submeterAvaliacao() {
        console.log("# Evaluation 0 -> " + this.evaluations[0].response)
        console.log("# Evaluation 1 -> " + this.evaluations[1].response)
    }

}