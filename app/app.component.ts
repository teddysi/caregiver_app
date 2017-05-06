import { Component } from "@angular/core";
import { DataService } from "./shared/data/data.service";
import { UserService} from "./shared/user/user.service";
import { ConnectorService} from "./shared/connector/connector.service";
import { PatientService } from "./patient/patient.service";

@Component({
    selector: "Caregiver",
    templateUrl: "app.component.html",
    providers: [DataService, UserService, ConnectorService, PatientService]
})
export class AppComponent { }
