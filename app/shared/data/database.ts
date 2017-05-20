import { Injectable } from "@angular/core";
import { Couchbase } from "nativescript-couchbase";
import { ConnectorService } from "../connector/connector.service";

Injectable()
export class Database {
    private storage: any;
    private isInstantiated: boolean;
    /*
    private pull: any;
    private push: any;
    */
    public constructor(//private connectorService: ConnectorService
    ) {
        if(!this.isInstantiated) {
            this.storage = new Couchbase("caregiver");
            this.createViews();
          
            this.isInstantiated = true;
        }
    }
    private createViews() {
        this.storage.createView("data", "1", (document, emitter) => {
            if(document.type == "data") {
                emitter.emit(document._id, document);
            } 
        });
        this.storage.createView("user", "1", (document, emitter) => {
            if(document.type == "user") {
                emitter.emit(document._id, document);
            }
        });
        this.storage.createView("materials", "1", (document, emitter) => {
            if(document.type == "materials") {
                emitter.emit(document._id, document);
            }
        });
        this.storage.createView("needs", "1", (document, emitter) => {
            if(document.type == "needs") {
                emitter.emit(document._id, document);
            }
        });
        this.storage.createView("patients", "1", (document, emitter) => {
            if(document.type == "patients") {
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
