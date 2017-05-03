import { Injectable } from "@angular/core";
import { Materials } from "./materials";
import { Data } from "./data";
import { Needs } from "./needs";
import { Patients } from "./patients";
import { Couchbase } from "nativescript-couchbase";
import { Database } from "./database";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { ConnectorService } from "../connector/connector.service";

@Injectable()
export class DataService {

    public data: any;

    constructor(private database: Database, private connectorService: ConnectorService) {
        //this.data = database.getDatabase();
        //this.deleteData();
    }

    ngOnInit() {
    }

    setUser(registeredUser) {
        this.database.getDatabase().createDocument({
            "type": "user",
            "user": registeredUser
        })
    }
    getAllData() {
        //verificar se há conectividade
        //se houver verificar atualizacoes e vai buscar se houver (deve ir buscar só o q está para atualizar)
       
        if(this.database.getDatabase().executeQuery("data").length > 0) {
            //Só tá a criar qd os dados estão vazios. n atualiza nada
            this.setData(this.connectorService.getAllData());
        }
        console.log(JSON.stringify(this.database.getDatabase().executeQuery("data"), null, 4));
        return this.database.getDatabase().executeQuery("data");

        //se não houver conetividade ou se n houver nada para atualizar devolve os dados da bd dos materiais
    }
    setPatients() {

    }
    setMaterials() {

    }
    setData(data) {
       this.database.getDatabase().createDocument({
            "type": "data",
            "data": data
       });
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