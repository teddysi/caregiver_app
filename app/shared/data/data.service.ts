import { Injectable } from "@angular/core";
import { Materials } from "./materials";
import { Data } from "./data";
import { Needs } from "./needs";
import { Patients } from "./patients";
import { Couchbase } from "nativescript-couchbase";
import { Database } from "./database";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

    public data: any;

    constructor(private database: Database) {
        this.data = database.getDatabase();
        this.deleteData();
    }

    ngOnInit() {
    }

    setUser(registeredUser) {
        this.database.getDatabase().createDocument({
            "type": "user",
            "user": registeredUser
        })
    }
    setPatients() {

    }
    setMaterials() {

    }
    setData(data) {
        /*
        console.log('ola');
        let rows = this.database.getDatabase().executeQuery("data");
        console.log(rows.length);
        for(let i = 0; i < rows.length; i++) {
            this.data.push(rows[i]);
            console.log('a inserir');
        }

        console.log(JSON.stringify(this.data, null, 4));
        */
        //this.data = data;
    }
    setNeeds() {

    }

    getToken() {
        var user;
        if(user = this.getLatestUserToRegister()) {
            return user.caregiver_token;
        }
        return false;
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

    public deleteData() {
        let documents = this.database.getDatabase().executeQuery("user");

        // loop over all documents
        for (let i = 0; i < documents.length; i++) {
            // delete each document
            // couchbase will assign an id (_id) to a document when created
            this.database.getDatabase().deleteDocument(documents[i]._id);
        }
    }

    public getAllUsers(){
        if(this.database.getDatabase().executeQuery("user").length > 0) {
            return this.database.getDatabase().executeQuery("user");
        }         
        return false;
    }
}