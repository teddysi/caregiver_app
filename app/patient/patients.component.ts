import { Component, OnInit } from "@angular/core";
import app = require("application");
import platform = require("platform");

import * as fs from "file-system";
import { PatientService } from "./patient.service";
import { Patient } from "./patient";

@Component({
    selector: "ns-items",
    moduleId: module.id,
    styleUrls: ["./patient-common.css"],
    templateUrl: "./patients.component.html",
})
export class PatientsComponent implements OnInit {
    patients: Patient[];
    listLoaded = false;
    isLoading = false;
    public folderName: string;
    public fileName: string;
    public fileTextContent: string;

    public successMessage: string;
    public writtenContent: string;
    public isItemVisible: boolean = false;

    public file: fs.File;
    public folder: fs.Folder;

    constructor(private patientService: PatientService) { 
        
    }

    ngOnInit(): void {
      //subscrever o a lista de pacientes
      
      this.isLoading = true;
        this.patientService.getPatients()
            .subscribe(
            (result) => this.onGetDataSuccess(result),
            (error) => this.onGetDataError(error)
            );
            this.isLoading = false;
            this.listLoaded = true;
        
    }
    private onGetDataSuccess(res) {
        //tratar resposta
        this.patients = res;
        console.log("this.patients " + this.patients)
        //adicionar items à lista de pacientes do service
        this.patientService.setPatients(this.patients)
        
    }

    /**
     
     * @private
     * @param {(Response | any)} error 
     * 
     * @memberOf ItemsComponent
     */
    private onGetDataError(error: Response | any) {
        const body = error.json() || "";
        const err = body.error || JSON.stringify(body);
        console.log("onGetDataError: " + err);
    }

    public onCreateFile() {
        // >> fs-create-all-code
        let documents = fs.knownFolders.documents();
        this.folder = documents.getFolder(this.folderName || "testFolder");
        this.file = this.folder.getFile((this.fileName || "testFile") + ".txt");

        
        /*
        this.file.writeText(this.fileTextContent || "some random content")
            .then(result => {
                // Succeeded writing to the file.
                this.file.readText()
                    .then(res => {
                        this.successMessage = "Successfully saved in " + this.file.path;
                        this.writtenContent = res;
                        this.isItemVisible = true;
                    });
            }).catch(err => {
                // Error
            });
        // << fs-create-all-code
        */
    }
}
