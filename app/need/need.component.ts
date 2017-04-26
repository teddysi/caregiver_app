import { Component, ViewChild, ElementRef, Injectable, OnInit } from "@angular/core";
import app = require("application");
import platform = require("platform");
import ImageModule = require("ui/image");

import * as fs from "file-system";
import { Patient } from "../patient/patient";
import { NeedService } from "../need/need.service";

@Component({
    selector: "ns-items",
    providers: [NeedService],
    moduleId: module.id,
    templateUrl: "./need.component.html",
})

export class NeedComponent implements OnInit {
    patient: Patient;

   
    constructor(private needService: NeedService) { 
        
    }
    
    ngOnInit(): void {
        
    }
}