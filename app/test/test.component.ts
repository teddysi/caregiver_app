import { Component, ViewChild, ElementRef, Injectable, OnInit } from "@angular/core";
import app = require("application");
import platform = require("platform");
import ImageModule = require("ui/image");

import * as fs from "file-system";
import { Patient } from "../patient/patient";
import { NeedService } from "../need/need.service";

//VideoPlayer
import {registerElement} from "nativescript-angular/element-registry";
registerElement("VideoPlayer", () => require("nativescript-videoplayer").Video);

//FileReader(para ficheiros de texto)
var documents = fs.knownFolders.documents();
var myFile = documents.getFile("~/materials/text/Latin-Lipsum.txt");
import textViewModule = require("ui/text-view");

//PDF
import 'nativescript-pdf-view';

@Component({
    selector: "ns-items",
    providers: [NeedService],
    moduleId: module.id,
    templateUrl: "./test.component.html",
})

export class TestComponent implements OnInit {
    patient: Patient;
    written: boolean;
    textView = new textViewModule.TextView();
   
    
    // similar to getViewById
    @ViewChild("myImage") myImageRef: ElementRef;
    @ViewChild("myVideo") myVideoRef: ElementRef;
    @ViewChild("myTextContent") myTextRef: ElementRef;
    @ViewChild("myPdf") myPdfRef: ElementRef;

    // angular2 method triggers after view init
    ngAfterViewInit() {
        this.myImageRef.nativeElement.src = "res://logo";
        //this.readText();
        //this.myPdfRef.nativeElement.src="~/materials/pdf/exemplo.pdf";
    }

    local() {
        this.myImageRef.nativeElement.src = "~/materials/image/2.png";
        this.myVideoRef.nativeElement.src = "~/materials/video/Copy.mp4";
    }
    
    readText() {
        myFile.readText()
            .then(function (content) {
                this.myTextRef.nativeElement.text = "ole";
            }, function (error) {
                // Failed to read from the file.
            });
    }

    // custom func with params
    submit(source) {
        this.myImageRef.nativeElement.src = source;
    }
    
    constructor(private needService: NeedService) { 
        
    }
    ngOnInit(): void {
        
    }
}