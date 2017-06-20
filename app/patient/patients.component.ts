import { Component, OnInit } from "@angular/core";
import app = require("application");
import platform = require("platform");
import { PatientService } from "./patient.service";
import { Patient } from "./patient";
import { Observable } from 'rxjs/Observable';
import { Questionnaire } from "../evaluation/questionnaire";
import { Notification } from "./notification";
import { Router } from "@angular/router";
import { CreateViewEventData } from "ui/placeholder";

import { UserService } from "../shared/user/user.service";

import { ConnectorService } from "../shared/connector/connector.service";
import dialogs = require("ui/dialogs");
import { SwipeGestureEventData } from "ui/gestures";

@Component({
    selector: "ns-items",
    moduleId: module.id,
    providers: [],
    styleUrls: ["./patient-common.css"],
    templateUrl: "./patients.component.html",
})
export class PatientsComponent implements OnInit {
    patients: Patient[];
    caregiverQuestionnaires: Questionnaire[];
    notification: Notification;
    listLoaded = false;
    isLoading = false;
    hasEvaluationsToDo = false; //condition to enable action bar icon evaluations
    public direction: number;

    public fileTextContent: string;

    public successMessage: string;
    public writtenContent: string;
    public isItemVisible: boolean = false;

    constructor(
        private patientService: PatientService,
        private router: Router,
        private userService: UserService,
        private connectorService: ConnectorService
    ) {

    }
    ngOnInit(): void {
        this.isLoading = true;
        ////console.log(this.patientService.isConnected());
        if (!this.patientService.isFirstRequest() && this.patientService.isConnected()) {
            //this.patientService.checkQuizsToSubmit();
            this.patientService.getPatients().subscribe(
                (result) => this.onGetDataSuccess(result),
                (error) => this.onGetDataError(error)
            );
        } else {
            ////console.log("A mostrar da BD");
            if(this.patientService.isConnected()) {
                this.patientService.checkQuizsToSubmit();
            }
            this.patients = this.patientService.getPatients_BD();
        }

        this.isLoading = false;
        this.listLoaded = true;

        this.hasEvaluationsToDo = this.patientService.hasEvaluationsToDo();
        console.log("Has notifications to do: " + this.hasEvaluationsToDo);

    }


    /**
     * Function to load data when http get data success
     * 
     * @private
     * @param {any} result 
     * 
     * @memberof PatientsComponent
     */
    private onGetDataSuccess(result) {
        ////console.log("A tratar dados dp do pedido!")
        //console.log("# COMPONENTE PATIENTES [result]: " + JSON.stringify(result, null, 4));
        //////console.log("# COMPONENTE PATIENTES [quizs]" + JSON.stringify(result.quizs, null, 4));
        this.patients = result.patients; //teddy
        this.caregiverQuestionnaires = result.quizs; //teddy
        this.loadAllQuestionnairesFromResponse();

        //////console.log("# COMPONENTE PATIENTES [result.quizs]" + JSON.stringify(result.quizs, null, 4));
        //////console.log("# COMPONENTE PATIENTES [caregiverQuestionnaires ]" + JSON.stringify(this.caregiverQuestionnaires, null, 4));

        this.patientService.setPatients(this.patients);

        this.patientService.setCaregiverQuestionnaires(this.caregiverQuestionnaires);
        // this.patientService.setCaregiverQuestionnaires(this.caregiverQuestionnaire); TODO

        // verificar se a lista tem so um paciente para poder ir logo para a  lista de necessidades  
        /*if (this.patients.length == 1 && this.firstTime==true) {
        this.firstTime = false;*/
        //////console.log(JSON.stringify(this.patients[0], null, 4));
        //this.router.navigate(["/patient/" + this.patients[0].id + "/needs"]);
        //}
        this.patientService.checkQuizsToSubmit();
        ////console.log("Terminou de tratar dados dp do pedido!!!")
          this.hasEvaluationsToDo = this.patientService.hasEvaluationsToDo();
        ////console.log("EVALUATIONS TO DO: " + this.hasEvaluationsToDo);
        if (this.hasEvaluationsToDo) {
            this.patientService.displayNotification('pending evaluations');
        }
        console.log("Has notifications to do: " + this.hasEvaluationsToDo);
    }

    /**
     * Function to load data when http get data Error
     * 
     * @private
     * @param {(Response | any)} error 
     * 
     * @memberof PatientsComponent
     */
    private onGetDataError(error: Response | any) {
        //////console.log("# COMPONENTE PATIENTES [result]" + JSON.stringify(error, null, 4));
        if (error.status == '401') {
            this.patientService.displayNotification('error-auth');
            this.patientService.userOutdated();
        }
    }



    /**
     * Function to load questionnaires from server response to var caregiverQuestionnaires
     * 
     * 
     * @memberof PatientsComponent
     */
    loadAllQuestionnairesFromResponse() {
        //size of inicial array
        let sizeInitial = this.caregiverQuestionnaires.length;
        //set ref
        this.patients.forEach(element_p => {
            if (element_p.quizs) {
                element_p.quizs.forEach(element_q => {
                    this.caregiverQuestionnaires.push(element_q)
                    element_q["ref_questionnaire"] = (sizeInitial) + ""

                    sizeInitial++;
                });
            }
            element_p.needs.forEach(element_need => {
                element_need.materials.forEach(element_mat => {
                    element_mat.quizs.forEach(element_qu => {
                        this.caregiverQuestionnaires.push(element_qu)
                        element_qu["ref_questionnaire"] = (sizeInitial) + ""
                        sizeInitial++;
                    });
                });
            });

        });
        let index = 0;
        this.caregiverQuestionnaires.forEach(element => {
            element.ref_questionnaire = index + "";
            index++;
            //questionnaire not have response yet
            element.done = false;
        });
    }


    /**
     * Function to navigate to pacient/materials
     * 
     * @param {any} patient_id 
     * 
     * @memberof PatientsComponent
     */
    goToMaterialsOfPatient(patient_id) {
        if (this.connectorService.isConnected()) {
            this.router.navigate(['/patient', patient_id, 'materials']);
        } else {
            dialogs.alert({
                title: "Aviso - Pacientes ",
                message: "Encontra-se sem acesso à internet. Não é possível visualizar os materiais disponíveis para este paciente.",
                okButtonText: "OK"
            })
        }
    }

    init() {
        this.patientService.getPatients().subscribe(
            (result) => this.onGetDataSuccess(result),
            (error) => this.onGetDataError(error)
        );


        this.isLoading = false;
        this.listLoaded = true;

        //this.patientService.hasEvaluationsToDo() ? this.hasEvaluationsToDo = true : this.hasEvaluationsToDo = false;

        //verify and notificate if has evaluations to do

        //this.hasEvaluationsToDo = true;
       // this.patientService.checkQuizsToSubmit();

        if (this.hasEvaluationsToDo = this.patientService.hasEvaluationsToDo()) {
            this.patientService.displayNotification('pending evaluations');
        }
    }

    /**
     * Funtion to refresh all data from the server
     * 
     * 
     * @memberof PatientsComponent
     */
    public refreshData() {
        this.hasEvaluationsToDo = this.patientService.hasEvaluationsToDo();
        this.init();

    }
    onSwipe(args: SwipeGestureEventData) {
        console.log("Swipe!");
        console.log("Object that triggered the event: " + args.object);
        console.log("View that triggered the event: " + args.view);
        console.log("Event name: " + args.eventName);
        console.log("Swipe Direction: " + args.direction);

        this.direction = args.direction;
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
}
