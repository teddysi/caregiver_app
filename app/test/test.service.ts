import { Need } from "../need/need";
import { Http, Headers, Response } from "@angular/http";
import { Component, OnInit } from "@angular/core";
import { Injectable } from "@angular/core";

import connectivity = require("connectivity");

@Injectable()
export class TestService implements OnInit {
    public needs: Need[]

    constructor(private http: Http) {        
    }

    ngOnInit(): void {
        this.getConectivity();
        this.startConnMonitor();
        throw new Error('Method not implemented.');

    }

    getConectivity() {
        var connectionType = connectivity.getConnectionType();

        switch (connectionType) {
            case connectivity.connectionType.none:
                console.log("No connection");
                break;
            case connectivity.connectionType.wifi:
                console.log("WiFi connection");
                break;
            case connectivity.connectionType.mobile:
                console.log("Mobile connection");
                break;
        }
    }

    startConnMonitor() {
        connectivity.startMonitoring(function onConnectionTypeChanged(newConnectionType: number) {
            switch (newConnectionType) {
                case connectivity.connectionType.none:
                    console.log("Connection type changed to none.");
                    break;
                case connectivity.connectionType.wifi:
                    console.log("Connection type changed to WiFi.");
                    break;
                case connectivity.connectionType.mobile:
                    console.log("Connection type changed to mobile.");
                    break;
            }
        });
    }
}