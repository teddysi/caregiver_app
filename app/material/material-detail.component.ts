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

import * as email from "nativescript-email";
import * as Toast from 'nativescript-toast';

import { User } from "../shared/user/user";
import { UserService } from "../shared/user/user.service";

@Component({
    selector: "material-details",
    moduleId: module.id,
    styleUrls: ["./material-detail.component.css"],
    templateUrl: "./material-detail.component.html",
})
export class MaterialDetailComponent implements OnInit {
    patient: Patient;
    need: Need;
    materialsOfAllNeeds: Material[];
    materialParent: Material;
    materialsToDisplay: Material[];

    hasEvaluationsToDo: boolean;
    loading: boolean;

    emailAvaliable: boolean;
    app_user: User;
    emailProfissionalSaude: string;
    hasQuiz: boolean;

    ratings: Rating[];
    //ratings.push(new Rating("1", "Mau"));
    // ratings = [Rating("1", "Mau"), Rating("2", "Medio")]

    constructor(
        private patientService: PatientService,
        private route: ActivatedRoute,
        private router: Router,
        private dataService: DataService,
        private connectorService: ConnectorService,
        private userService: UserService
    ) {
        this.ratings = [];
    }


    ngOnInit(): void {
        console.log("# COMPONENTE MATERIAL-DETAIL")
        this.loading = true;
        this.emailAvaliable = false;
        this.app_user = this.userService.getUser();
        //Set email profissional saude
        this.emailProfissionalSaude = 'support.caregivers@emailaregistar.com';

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

        //verify if has a quiz
        this.materialHasQuiz();

        this.patientService.registerAcessedMaterial(this.patient, this.materialParent);

        //verify is email avaliable
        email.available().then(function (avail) {
            console.log("# COMPONENTE MATERIAL-DETAIL # Email available? " + avail);
            return avail;
        }).then((avail) => {
            this.emailAvaliable = avail;
        })
        //Evaluations
        this.hasEvaluationsToDo = this.patientService.hasEvaluationsToDo();

    }
    stopLoading() {
        this.loading = false;
        console.log("PASSOU AKI")
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
        console.log("NEW EVALUTION: " + level);
        let rating = new Rating();

        rating.evaluation = level;
        rating.id_material = this.materialParent.id.toString();

        this.ratings.push(rating);

        this.dataService.setRating(this.materialParent, level);
        this.patientService.sendRating(rating);



        Toast.makeText("A sua avaliação do material foi atualizada. Obrigado.").show();

    }


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


    /**
     * Function to send email to profissional saude
     * 
     * 
     * @memberof MaterialDetailComponent
     */
    sendMailTo() {
        email.compose({
            subject: "Pedido de esclarecimento do cuidador " + this.app_user.name + " com o id: " + this.app_user.id,
            body: "Bom dia,<p>"
            + "Necessito esclarecimento sobre o seguinte material:"
            + "<p>Id Material: " + this.materialParent.id
            + "<p>Nome Material: " + this.materialParent.name
            + "<p>Descrição Material: " + this.materialParent.description
            + "<p>Id Cuidador: " + this.app_user.id
            + "<p>Nome Cuidador: " + this.app_user.name
            ,
            to: [this.emailProfissionalSaude],
            cc: [''],
            bcc: ['', ''],
            attachments: [
            ],
            appPickerTitle: 'Compose with app caregiver' // for Android, default: 'Open with..'
        }).then(
            function () {
                console.log("Email composer closed");
            }, function (err) {
                console.log("Error: " + err);
            });
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

    /**
     * Function to verify if material have some quiz to do.
     * 
     * @param {any} material 
     * @returns 
     * @memberof MaterialDetailComponent
     */
    materialHasQuiz() {
        this.hasQuiz = false;
        if (this.dataService.getQuizs().length > 0) {
            this.dataService.getQuizs().forEach(element => {
                if (element.reference == "material" && element.reference_id == this.materialParent.id) {
                    this.hasQuiz = true;
                }
            });
        }
    }
}
