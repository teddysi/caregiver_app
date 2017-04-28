import { Component, ViewChild, ElementRef, Injectable, OnInit } from "@angular/core";
import app = require("application");
import platform = require("platform");
import ImageModule = require("ui/image");

import { Patient } from "../patient/patient";
import { NeedService } from "../need/need.service";

//VideoPlayer
import {registerElement} from "nativescript-angular/element-registry";
registerElement("VideoPlayer", () => require("nativescript-videoplayer").Video);

//FileReader(para ficheiros de texto)
import * as fs from "file-system";

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
    public oneway: string;
    
    // similar to getViewById
    /*
    @ViewChild("myImage") myImageRef: ElementRef;
    @ViewChild("myVideo") myVideoRef: ElementRef;
    @ViewChild("myTextContent") myTextRef: ElementRef;
    @ViewChild("myPdf") myPdfRef: ElementRef;
    */
    // angular2 method triggers after view init
    ngAfterViewInit() {
        //this.myImageRef.nativeElement.src = "res://logo";
        //this.myPdfRef.nativeElement.src="~/materials/pdf/exemplo.pdf";

        /**
         * Escrever e/ou ler texto para a pasta default files (antes da app)
         */
        var documents = fs.knownFolders.documents();
        var path = fs.path.join(documents.path, "test.txt");
        var file = fs.File.fromPath(path);

        // Writing text to the file.
        file.writeText("Something")
            .then(function () {
                console.log("Escreveu");
            }, function (error) {
                console.log("Falhou");
            });

        file.readText()
            .then(function (content) {
                console.log(content);
            }, function (error) {
                console.log('erro');
            });

        /**
         * Escrever e/ou ler ficheiro binário para .... falta testar
         */
        var fileName = "res://logo";
        var error;

        var sourceFile = fs.File.fromPath(__dirname + "/" + fileName);
        var destinationFile = fs.knownFolders.documents().getFile(fileName);

        var source = sourceFile.readSync(e=> { error = e; });

        destinationFile.writeSync(source, e=> { error = e; });

        /**
         * Abrir todo o conteúdo da pasta materials
         */
        var documents = fs.knownFolders.documents();
        var path = fs.path.join(documents.path, "app/materials");
        var folder = fs.Folder.fromPath(path);

        folder.getEntities()
        .then(function (entities) {
            // entities is array with the document's files and folders.
            entities.forEach(function (entity) {
                console.log(JSON.stringify(entity, null, 4));
            });
            console.log(JSON.stringify(documents, null, 4));
        }, function (error) {
        });
    }
    /*
    local() {
        this.myImageRef.nativeElement.src = "~/materials/image/2.png";
        this.myVideoRef.nativeElement.src = "~/materials/video/Copy.mp4";
    }
    
    // custom func with params
    submit(source) {
        this.myImageRef.nativeElement.src = source;
    }
    */
    constructor(private needService: NeedService) {

    }
    ngOnInit(): void {
        
    }
}