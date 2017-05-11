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

@Injectable()
export class DataService {

    public data: any;
 
    constructor(private database: Database, //private userService: UserService erro ao injetar
        ) {
        //this.data = database.getDatabase();
        //this.deleteData('user');
        //this.deleteData('data');
        //this.showData('data'); //Esta a dar excepcao e a imprimir os users tb???!!!!! (por confirmar) pq n tem dados e estoira?? mas imprime o user pq?
        //this.showData('user');
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
        console.log('A mostrar bd: ' + view + ' com ' + this.database.getDatabase().executeQuery(view).length + ' elementos');
        if(this.database.getDatabase().executeQuery(view).length > 0) {     
            console.log(JSON.stringify(this.database.getDatabase().executeQuery(view), null, 4));
        }
    }
}