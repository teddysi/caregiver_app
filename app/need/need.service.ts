import { Need } from "./need";
import { Http, Headers, Response } from "@angular/http";
import { Component, OnInit } from "@angular/core";
import { Injectable } from "@angular/core";

import connectivity = require("connectivity");

@Injectable()
export class NeedService implements OnInit {
    
    public needs: Need[]

    constructor(private http: Http) {        
    }

    ngOnInit(): void {
        throw new Error('Method not implemented.');
    }
}