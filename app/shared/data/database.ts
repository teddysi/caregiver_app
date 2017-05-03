import { Injectable } from "@angular/core";
import { Couchbase } from "nativescript-couchbase";

Injectable()
export class Database {
    private storage: any;
    private isInstantiated: boolean;
    /*
    private pull: any;
    private push: any;
    */ 
    public constructor() {
        if(!this.isInstantiated) {
            
            this.storage = new Couchbase("caregiver");
            this.createDBViews();       
            this.isInstantiated = true;
        }
    }

    public createDBViews() {
        //para ver para ver na bd os dados dos materiais retirados do servidor
        this.storage.createView("data", "1", (document, emitter) => {
            if(document.type == "data") {
                emitter.emit(document._id, document);
            } 
        });
        //para ver para ver na bd caregiver os dados de todos os utilizadores da app
        this.storage.createView("user", "2", (document, emitter) => {
            if(document.type == "user") {
                emitter.emit(document._id, document);
            }
        });
        //para ver na bd caregiver os dados de acesso ao servidor. Ainda n utilizado
        this.storage.createView("config", "3", (document, emitter) => {
            if(document.type == "config") {
                emitter.emit(document._id, document);
            } 
        });
    }
    public getDatabase() {
        return this.storage;
    }
    /*
        public startSync(continuous: boolean) {
        this.push = this.storage.createPushReplication("http://192.168.57.1:4984/test-database");
        this.pull = this.storage.createPullReplication("http://192.168.57.1:4984/test-database");

        this.push.setContinuous(continuous);
        this.pull.setContinuous(continuous);

        this.push.start();
        this.pull.start();
    }

    public stopSync() {
        this.push.stop();
        this.pull.stop();
    }
    */
}
