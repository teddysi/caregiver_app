import { Injectable } from "@angular/core";
import { Materials } from "./materials";
import { Data } from "./data";
import { Needs } from "./needs";
import { Patients } from "./patients";
import { Couchbase } from "nativescript-couchbase";
import { Database } from "./database";
import { Observable } from 'rxjs/Observable';
import { UserService } from '../user/user.service';
import 'rxjs/add/operator/map';
import { ConnectorService } from "../connector/connector.service";

@Injectable()
export class DataService {

    public data: any;
<<<<<<< HEAD

    constructor(private database: Database, private connectorService: ConnectorService) {
        //this.data = database.getDatabase();
        //this.deleteData();
=======
 
    constructor(private database: Database, //private userService: UserService erro ao injetar
        ) {
        //this.data = database.getDatabase();
        this.deleteData('user');
        this.showData('data');
        this.showData('user');
>>>>>>> 49503d25fee8f5eee665ca5ac57ebb8177b46ef7
    }

    ngOnInit() {
    }

    setUser(registeredUser) {
        this.database.getDatabase().createDocument({
            "type": "user",
            "user": registeredUser
        });
        //this.userService.createUser(registeredUser);
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

    getToken(): string {
        var user;
        if(user = this.getLatestUserToRegister()) {

            return user.caregiver_token;
        }
        return null;
    }

    getUserID(): string {
        var user;
        if(user = this.getLatestUserToRegister()) {
            
            return user.id;
        }
        return null;
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

    public showData(view) {
        console.log('A mostrar bd: ' + view);
        if(this.database.getDatabase().executeQuery(view).length > 0) {     
            console.log(JSON.stringify(this.database.getDatabase().executeQuery(view), null, 4));
        }
    }
}