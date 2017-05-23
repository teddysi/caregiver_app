import { UserService} from "./shared/user/user.service";
import { ConnectorService} from "./shared/connector/connector.service";
import { PatientService } from "./patient/patient.service";
import { DataService } from "./shared/data/data.service";
import { Database } from "./shared/data/database";
import { Component } from "@angular/core";

@Component({
    selector: "Caregiver",
    templateUrl: "app.component.html",
    providers: [DataService, UserService, ConnectorService, PatientService]
})
export class AppComponent { }
