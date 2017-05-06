import { Component, ViewChild, ElementRef, Injectable, OnInit } from "@angular/core";
import app = require("application");
import platform = require("platform");
import ImageModule = require("ui/image");

import * as fs from "file-system";
import { Patient } from "../patient/patient";

import {ActivatedRoute} from '@angular/router';


import { PatientService } from "../patient/patient.service";

@Component({
    selector: "ns-items",
    moduleId: module.id,
    templateUrl: "./need.component.html",
})

export class NeedComponent implements OnInit {
    patient: Patient;

    constructor(
        private patientService: PatientService,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        const id = +this.route.snapshot.params["id"];
             this.patient = this.patientService.patients.filter(patient => patient.id === id)[0];
            // return this.patients.filter(patient => patient.id === id)[0];
    }
}