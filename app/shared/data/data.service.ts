import * as fs from "file-system";
import 'rxjs/add/operator/map';
import { ConnectorService } from '../../shared/connector/connector.service';

import { Injectable } from "@angular/core";
import { Materials } from "./materials";
import { Data } from "./data";
import { Needs } from "./needs";
import { Patient } from "../../patient/patient";
import { Couchbase } from "nativescript-couchbase";
import { Database } from "./database";
import { Observable } from 'rxjs/Observable';
import { UserService } from '../user/user.service';

@Injectable()
export class DataService {

    public patientsData_id: any;
    public userData_id: any;
    public file: fs.File;
    public folder: fs.Folder;
    public folderName: string;
    public fileName: string;
 
    constructor(public database: Database, public connectorService: ConnectorService) {
            console.log('Instanciou - DataService!');
            //this.data = database.getDatabase();
            //this.deleteData('data');
            //this.deleteData('user');
            //this.showData('data'); //Esta a dar excepcao e a imprimir os users tb???!!!!! (por confirmar) pq n tem dados e estoira?? mas imprime o user pq?
            //this.showData('user');
            //this.userData_id = this.getCurrentUserDocID();
    }

    ngOnInit() {
    }
    sync() {
        /*
        this.connectorService.getPatients()
            .subscribe(
            (result) => this.onGetDataSuccess(result),
            (error) => this.onGetDataError(error)
            );
            */
    }
 
    setUser(registeredUser) {
        this.userData_id = this.database.getDatabase().createDocument({
            "type": "user",
            "user": registeredUser
        });
        //console.log("AQUI"+JSON.stringify(this.database.getDatabase().getDocument(this.userData_id, null, 4)));
    }
    setPatients() {

    }
    setMaterials() {

    }
    getPatientsData(){   
        return this.database.getDatabase().getDocument(this.patientsData_id).data;
    }
    setPatientsData(data) {
        //console.log("AQUI"+JSON.stringify(data));
        this.patientsData_id = this.database.getDatabase().createDocument({
            "type": "data",
            "data": data
        });
        //console.log("AQUI10"+JSON.stringify(this.database.getDatabase().getDocument(this.patientsData_id).data,null,4));
    }
    setNeeds() {

    }
    getToken(): string {
        return this.database.getDatabase().getDocument(this.userData_id).user.caregiver_token;
    }
    getUserID(): string {
        return this.database.getDatabase().getDocument(this.userData_id).user.id;
    }
    getLatestUserToRegister() {
        var users = this.getAllUsers();
        
        if(users) {
            var lastUser;
            for (var i in users) {
                if (users.hasOwnProperty(i) && typeof(i) !== 'function') {
                    lastUser = users[i];
                    break;
                }
            }
            return lastUser.user;
        }
        return false;
    }
    public deleteData(view) {
        let documents = this.database.getDatabase().executeQuery(view);
        console.log('A apagar bd: ' + view);
        // loop over all documents
        if(this.database.getDatabase().executeQuery(view).length > 0) {
            for (let i = 0; i < documents.length; i++) {
                // delete each document
                // couchbase will assign an id (_id) to a document when created
                this.database.getDatabase().deleteDocument(documents[i]._id);
            }
        }
    }
    public getAllUsers(){
        if(this.database.getDatabase().executeQuery("user").length > 0) {
            return this.database.getDatabase().executeQuery("user");
        }         
        return false;
    }
    public showData(view) {
        console.log('A mostrar bd: ' + view + ' com ' + this.database.getDatabase().executeQuery(view).length + ' elementos');
        if(this.database.getDatabase().executeQuery(view).length > 0) {     
            console.log(JSON.stringify(this.database.getDatabase().executeQuery(view), null, 4));
        }
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
    public getCurrentUserDocID() {
        var users = this.getAllUsers();
        
        if(users) {
            var lastUser;
            for (var i in users) {
                if (users.hasOwnProperty(i) && typeof(i) !== 'function') {
                    lastUser = users[i];
                    break;
                }
            }
            return lastUser._id;
        }
        return null;
    }
    public isUserAuth() {
        if(this.userData_id) {
            return true;
        }
        return false; 
    }
}