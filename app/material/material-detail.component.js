"use strict";
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var patient_service_1 = require("../patient/patient.service");
var data_service_1 = require("../shared/data/data.service");
var rating_1 = require("./rating");
var router_2 = require("@angular/router");
var utils_1 = require("utils/utils");
var connector_service_1 = require("../shared/connector/connector.service");
require("nativescript-pdf-view");
var email = require("nativescript-email");
var user_service_1 = require("../shared/user/user.service");
var MaterialDetailComponent = (function () {
    //ratings.push(new Rating("1", "Mau"));
    // ratings = [Rating("1", "Mau"), Rating("2", "Medio")]
    function MaterialDetailComponent(patientService, route, router, dataService, connectorService, userService) {
        this.patientService = patientService;
        this.route = route;
        this.router = router;
        this.dataService = dataService;
        this.connectorService = connectorService;
        this.userService = userService;
        this.ratings = [];
    }
    MaterialDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log("# COMPONENTE MATERIAL-DETAIL");
        this.loading = true;
        this.emailAvaliable = false;
        this.app_user = this.userService.getUser();
        //Set email profissional saude
        this.emailProfissionalSaude = 'support.caregivers@emailaregistar.com';
        var id = +this.route.snapshot.params["id"];
        var idx = +this.route.snapshot.params["id_material"];
        //return to patients List if do not have connection
        if (!this.connectorService.isConnected()) {
            this.router.navigate(['/patients']);
        }
        console.log("ID PACIENTE " + id + " ID MATERIAL" + idx);
        this.patient = this.patientService.patients.filter(function (patient) { return patient.id === id; })[0];
        // criar lista de materiais com propriadade adicional need name and need description
        this.addPropertyNeedOnMaterial();
        //console.log("MATERIALOFALLNEEDS : " + JSON.stringify(this.materialsOfAllNeeds, null, 4));
        this.materialParent = this.materialsOfAllNeeds.filter(function (material) { return material.id === idx; })[0];
        //console.log("---------------------------------------------------------------: ");
        //console.log("MATERIALParent : " + JSON.stringify(this.materialParent, null, 4));
        //verificar se é um composite
        if (this.materialParent.type == "composite") {
            this.materialsToDisplay = this.materialParent.materials;
        }
        else {
            this.materialsToDisplay = [];
            this.materialsToDisplay.push(this.materialParent);
        }
        this.patientService.registerAcessedMaterial(this.patient, this.materialParent);
        //verify is email avaliable
        email.available().then(function (avail) {
            console.log("# COMPONENTE MATERIAL-DETAIL # Email available? " + avail);
            return avail;
        }).then(function (avail) {
            _this.emailAvaliable = avail;
        });
        //Evaluations
        this.hasEvaluationsToDo = this.patientService.hasEvaluationsToDo();
    };
    MaterialDetailComponent.prototype.stopLoading = function () {
        this.loading = false;
        console.log("PASSOU AKI");
    };
    /**
     * Function to add properties of the "parent" need to the "child" material
     *
     *
     * @memberof MaterialDetailComponent
     */
    MaterialDetailComponent.prototype.addPropertyNeedOnMaterial = function () {
        var materials_temp;
        materials_temp = [];
        this.patient.needs.forEach(function (need) {
            need.materials.forEach(function (materialOfaNeed) {
                materialOfaNeed["need_id"] = need.id;
                materialOfaNeed["need_description"] = need.description;
                //console.log("MATERIAL : " + JSON.stringify(materialOfaNeed, null, 4));
                materials_temp.push(materialOfaNeed);
            });
        });
        this.materialsOfAllNeeds = materials_temp;
    };
    /**
     * Function to open external materials [pdf ...]
     *
     * @param {any} id
     *
     * @memberof MaterialDetailComponent
     */
    MaterialDetailComponent.prototype.openOnBrowser = function (id) {
        var material = this.materialsToDisplay.filter(function (material) { return material.id === id; })[0];
        utils_1.openUrl(material.url);
    };
    /**
     * Function to rate material [red,yellow,green]
     *
     * @param {any} level
     *
     * @memberof MaterialDetailComponent
     */
    MaterialDetailComponent.prototype.evaluateMaterial = function (level) {
        var rating = new rating_1.Rating();
        rating.evaluation = level;
        rating.id_material = this.materialParent.id;
        this.ratings.push(rating);
        this.dataService.setRating(rating);
        this.patientService.sendRating(rating);
    };
    MaterialDetailComponent.prototype.getRatings = function () {
        return this.ratings;
    };
    /**
     * function to navigate to the material questionnaire
     *
     * @param {any} ref_questionnaire
     *
     * @memberof MaterialDetailComponent
     */
    MaterialDetailComponent.prototype.fillQuestionnaire = function (ref_questionnaire) {
        this.router.navigate(['/evaluation', ref_questionnaire]);
    };
    /**
     * Function to send email to profissional saude
     *
     *
     * @memberof MaterialDetailComponent
     */
    MaterialDetailComponent.prototype.sendMailTo = function () {
        email.compose({
            subject: "Pedido de esclarecimento do cuidador " + this.app_user.name + " com o id: " + this.app_user.id,
            body: "Bom dia,<p>"
                + "Necessito esclarecimento sobre o seguinte material:"
                + "<p>Id Material: " + this.materialParent.id
                + "<p>Nome Material: " + this.materialParent.name
                + "<p>Descrição Material: " + this.materialParent.description
                + "<p>Id Cuidador: " + this.app_user.id
                + "<p>Nome Cuidador: " + this.app_user.name,
            to: [this.emailProfissionalSaude],
            cc: [''],
            bcc: ['', ''],
            attachments: [],
            appPickerTitle: 'Compose with app caregiver' // for Android, default: 'Open with..'
        }).then(function () {
            console.log("Email composer closed");
        }, function (err) {
            console.log("Error: " + err);
        });
    };
    return MaterialDetailComponent;
}());
MaterialDetailComponent = __decorate([
    core_1.Component({
        selector: "material-details",
        moduleId: module.id,
        templateUrl: "./material-detail.component.html",
    }),
    __metadata("design:paramtypes", [patient_service_1.PatientService,
        router_1.ActivatedRoute,
        router_2.Router,
        data_service_1.DataService,
        connector_service_1.ConnectorService,
        user_service_1.UserService])
], MaterialDetailComponent);
exports.MaterialDetailComponent = MaterialDetailComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0ZXJpYWwtZGV0YWlsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1hdGVyaWFsLWRldGFpbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHNDQUFrRDtBQUNsRCwwQ0FBaUQ7QUFHakQsOERBQTREO0FBQzVELDREQUEwRDtBQUUxRCxtQ0FBa0M7QUFRbEMsMENBQXlDO0FBSXpDLHFDQUFzQztBQUV0QywyRUFBeUU7QUFFekUsaUNBQStCO0FBRS9CLDBDQUE0QztBQUc1Qyw0REFBMEQ7QUFPMUQsSUFBYSx1QkFBdUI7SUFlaEMsdUNBQXVDO0lBQ3ZDLHVEQUF1RDtJQUV2RCxpQ0FDWSxjQUE4QixFQUM5QixLQUFxQixFQUNyQixNQUFjLEVBQ2QsV0FBd0IsRUFDeEIsZ0JBQWtDLEVBQ2xDLFdBQXdCO1FBTHhCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUNyQixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2QsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNsQyxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUVoQyxJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBR0QsMENBQVEsR0FBUjtRQUFBLGlCQStDQztRQTlDRyxPQUFPLENBQUMsR0FBRyxDQUFDLDhCQUE4QixDQUFDLENBQUE7UUFDM0MsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDcEIsSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7UUFDNUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQzNDLDhCQUE4QjtRQUM5QixJQUFJLENBQUMsc0JBQXNCLEdBQUcsdUNBQXVDLENBQUM7UUFFdEUsSUFBTSxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDN0MsSUFBTSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7UUFFdkQsbURBQW1EO1FBQ25ELEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN2QyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7UUFDeEMsQ0FBQztRQUdELE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxHQUFHLEVBQUUsR0FBRyxjQUFjLEdBQUcsR0FBRyxDQUFDLENBQUE7UUFDdkQsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsVUFBQSxPQUFPLElBQUksT0FBQSxPQUFPLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBakIsQ0FBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3BGLG9GQUFvRjtRQUNwRixJQUFJLENBQUMseUJBQXlCLEVBQUUsQ0FBQztRQUNqQywyRkFBMkY7UUFDM0YsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLFVBQUEsUUFBUSxJQUFJLE9BQUEsUUFBUSxDQUFDLEVBQUUsS0FBSyxHQUFHLEVBQW5CLENBQW1CLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUUxRixtRkFBbUY7UUFDbkYsa0ZBQWtGO1FBQ2xGLDZCQUE2QjtRQUM3QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksSUFBSSxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQzFDLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQztRQUM1RCxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixJQUFJLENBQUMsa0JBQWtCLEdBQUcsRUFBRSxDQUFDO1lBQzdCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBRXRELENBQUM7UUFFRCxJQUFJLENBQUMsY0FBYyxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBRS9FLDJCQUEyQjtRQUMzQixLQUFLLENBQUMsU0FBUyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsS0FBSztZQUNsQyxPQUFPLENBQUMsR0FBRyxDQUFDLGtEQUFrRCxHQUFHLEtBQUssQ0FBQyxDQUFDO1lBQzdELE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDNUIsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsS0FBSztZQUNWLEtBQUksQ0FBQyxjQUFjLEdBQUMsS0FBSyxDQUFDO1FBQzlCLENBQUMsQ0FBQyxDQUFBO1FBQ0YsYUFBYTtRQUNiLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLGtCQUFrQixFQUFFLENBQUM7SUFFdkUsQ0FBQztJQUNELDZDQUFXLEdBQVg7UUFDSSxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUNyQixPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFBO0lBQzdCLENBQUM7SUFHRDs7Ozs7T0FLRztJQUNILDJEQUF5QixHQUF6QjtRQUNJLElBQUksY0FBMEIsQ0FBQztRQUMvQixjQUFjLEdBQUcsRUFBRSxDQUFDO1FBRXBCLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFBLElBQUk7WUFDM0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsVUFBQSxlQUFlO2dCQUNsQyxlQUFlLENBQUMsU0FBUyxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQztnQkFDckMsZUFBZSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztnQkFDdkQsd0VBQXdFO2dCQUN4RSxjQUFjLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQ3pDLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsbUJBQW1CLEdBQUcsY0FBYyxDQUFDO0lBQzlDLENBQUM7SUFJRDs7Ozs7O09BTUc7SUFDSCwrQ0FBYSxHQUFiLFVBQWMsRUFBRTtRQUNaLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsVUFBQSxRQUFRLElBQUksT0FBQSxRQUFRLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBbEIsQ0FBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2pGLGVBQU8sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDMUIsQ0FBQztJQUlEOzs7Ozs7T0FNRztJQUNILGtEQUFnQixHQUFoQixVQUFpQixLQUFLO1FBRWxCLElBQUksTUFBTSxHQUFHLElBQUksZUFBTSxFQUFFLENBQUM7UUFFMUIsTUFBTSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7UUFDMUIsTUFBTSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQztRQUU1QyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUUxQixJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNuQyxJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUUzQyxDQUFDO0lBR0QsNENBQVUsR0FBVjtRQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3hCLENBQUM7SUFJRDs7Ozs7O09BTUc7SUFDSCxtREFBaUIsR0FBakIsVUFBa0IsaUJBQWlCO1FBQy9CLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsYUFBYSxFQUFFLGlCQUFpQixDQUFDLENBQUMsQ0FBQztJQUM3RCxDQUFDO0lBR0Q7Ozs7O09BS0c7SUFDSCw0Q0FBVSxHQUFWO1FBQ0ksS0FBSyxDQUFDLE9BQU8sQ0FBQztZQUNWLE9BQU8sRUFBRSx1Q0FBdUMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxhQUFhLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ3hHLElBQUksRUFBRSxhQUFhO2tCQUNsQixxREFBcUQ7a0JBQ3BELGtCQUFrQixHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsRUFBRTtrQkFDM0Msb0JBQW9CLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJO2tCQUMvQyx5QkFBeUIsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVc7a0JBQzNELGtCQUFrQixHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRTtrQkFDckMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJO1lBRTNDLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQztZQUNqQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUM7WUFDUixHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO1lBQ2IsV0FBVyxFQUFFLEVBQ1I7WUFDTCxjQUFjLEVBQUUsNEJBQTRCLENBQUMsc0NBQXNDO1NBQ3RGLENBQUMsQ0FBQyxJQUFJLENBQ0g7WUFDSSxPQUFPLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDLENBQUM7UUFDekMsQ0FBQyxFQUFFLFVBQVUsR0FBRztZQUNaLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ2pDLENBQUMsQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQUVMLDhCQUFDO0FBQUQsQ0FBQyxBQWpNRCxJQWlNQztBQWpNWSx1QkFBdUI7SUFMbkMsZ0JBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxrQkFBa0I7UUFDNUIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1FBQ25CLFdBQVcsRUFBRSxrQ0FBa0M7S0FDbEQsQ0FBQztxQ0FvQjhCLGdDQUFjO1FBQ3ZCLHVCQUFjO1FBQ2IsZUFBTTtRQUNELDBCQUFXO1FBQ04sb0NBQWdCO1FBQ3JCLDBCQUFXO0dBeEIzQix1QkFBdUIsQ0FpTW5DO0FBak1ZLDBEQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XHJcbiBcclxuaW1wb3J0IHsgUGF0aWVudCB9IGZyb20gXCIuLi9wYXRpZW50L3BhdGllbnRcIjtcclxuaW1wb3J0IHsgUGF0aWVudFNlcnZpY2UgfSBmcm9tIFwiLi4vcGF0aWVudC9wYXRpZW50LnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgRGF0YVNlcnZpY2UgfSBmcm9tIFwiLi4vc2hhcmVkL2RhdGEvZGF0YS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IE1hdGVyaWFsIH0gZnJvbSBcIi4vbWF0ZXJpYWxcIjtcclxuaW1wb3J0IHsgUmF0aW5nIH0gZnJvbSBcIi4vcmF0aW5nXCI7XHJcbmltcG9ydCB7IE5lZWQgfSBmcm9tIFwiLi4vbmVlZC9uZWVkXCI7XHJcbiBcclxuaW1wb3J0IGFwcCA9IHJlcXVpcmUoXCJhcHBsaWNhdGlvblwiKTtcclxuaW1wb3J0IHBsYXRmb3JtID0gcmVxdWlyZShcInBsYXRmb3JtXCIpO1xyXG4gXHJcbmltcG9ydCBidXR0b25Nb2R1bGUgPSByZXF1aXJlKFwidWkvYnV0dG9uXCIpO1xyXG4gXHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuIFxyXG4gXHJcbmltcG9ydCB7IG9wZW5BcHAgfSBmcm9tIFwibmF0aXZlc2NyaXB0LW9wZW4tYXBwXCI7XHJcbmltcG9ydCB7IG9wZW5VcmwgfSBmcm9tIFwidXRpbHMvdXRpbHNcIjtcclxuIFxyXG5pbXBvcnQgeyBDb25uZWN0b3JTZXJ2aWNlIH0gZnJvbSBcIi4uL3NoYXJlZC9jb25uZWN0b3IvY29ubmVjdG9yLnNlcnZpY2VcIjtcclxuIFxyXG5pbXBvcnQgJ25hdGl2ZXNjcmlwdC1wZGYtdmlldyc7XHJcblxyXG5pbXBvcnQgKiBhcyBlbWFpbCBmcm9tIFwibmF0aXZlc2NyaXB0LWVtYWlsXCI7XHJcblxyXG5pbXBvcnQgeyBVc2VyIH0gZnJvbSBcIi4uL3NoYXJlZC91c2VyL3VzZXJcIjtcclxuaW1wb3J0IHsgVXNlclNlcnZpY2UgfSBmcm9tIFwiLi4vc2hhcmVkL3VzZXIvdXNlci5zZXJ2aWNlXCI7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiBcIm1hdGVyaWFsLWRldGFpbHNcIixcclxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCIuL21hdGVyaWFsLWRldGFpbC5jb21wb25lbnQuaHRtbFwiLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTWF0ZXJpYWxEZXRhaWxDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gICAgcGF0aWVudDogUGF0aWVudDtcclxuICAgIG5lZWQ6IE5lZWQ7XHJcbiAgICBtYXRlcmlhbHNPZkFsbE5lZWRzOiBNYXRlcmlhbFtdO1xyXG4gICAgbWF0ZXJpYWxQYXJlbnQ6IE1hdGVyaWFsO1xyXG4gICAgbWF0ZXJpYWxzVG9EaXNwbGF5OiBNYXRlcmlhbFtdO1xyXG4gXHJcbiAgICBoYXNFdmFsdWF0aW9uc1RvRG86IGJvb2xlYW47XHJcbiAgICBsb2FkaW5nOiBib29sZWFuO1xyXG5cclxuICAgIGVtYWlsQXZhbGlhYmxlOiBib29sZWFuO1xyXG4gICAgYXBwX3VzZXI6IFVzZXI7XHJcbiAgICBlbWFpbFByb2Zpc3Npb25hbFNhdWRlOnN0cmluZztcclxuXHJcbiAgICByYXRpbmdzOiBSYXRpbmdbXTtcclxuICAgIC8vcmF0aW5ncy5wdXNoKG5ldyBSYXRpbmcoXCIxXCIsIFwiTWF1XCIpKTtcclxuICAgIC8vIHJhdGluZ3MgPSBbUmF0aW5nKFwiMVwiLCBcIk1hdVwiKSwgUmF0aW5nKFwiMlwiLCBcIk1lZGlvXCIpXVxyXG4gXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIHBhdGllbnRTZXJ2aWNlOiBQYXRpZW50U2VydmljZSxcclxuICAgICAgICBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcclxuICAgICAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyLFxyXG4gICAgICAgIHByaXZhdGUgZGF0YVNlcnZpY2U6IERhdGFTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgY29ubmVjdG9yU2VydmljZTogQ29ubmVjdG9yU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIHVzZXJTZXJ2aWNlOiBVc2VyU2VydmljZVxyXG4gICAgKSB7XHJcbiAgICAgICAgdGhpcy5yYXRpbmdzID0gW107XHJcbiAgICB9XHJcbiBcclxuIFxyXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCIjIENPTVBPTkVOVEUgTUFURVJJQUwtREVUQUlMXCIpXHJcbiAgICAgICAgdGhpcy5sb2FkaW5nID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmVtYWlsQXZhbGlhYmxlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5hcHBfdXNlciA9IHRoaXMudXNlclNlcnZpY2UuZ2V0VXNlcigpO1xyXG4gICAgICAgIC8vU2V0IGVtYWlsIHByb2Zpc3Npb25hbCBzYXVkZVxyXG4gICAgICAgIHRoaXMuZW1haWxQcm9maXNzaW9uYWxTYXVkZSA9ICdzdXBwb3J0LmNhcmVnaXZlcnNAZW1haWxhcmVnaXN0YXIuY29tJztcclxuICAgICBcclxuICAgICAgICBjb25zdCBpZCA9ICt0aGlzLnJvdXRlLnNuYXBzaG90LnBhcmFtc1tcImlkXCJdO1xyXG4gICAgICAgIGNvbnN0IGlkeCA9ICt0aGlzLnJvdXRlLnNuYXBzaG90LnBhcmFtc1tcImlkX21hdGVyaWFsXCJdO1xyXG4gXHJcbiAgICAgICAgLy9yZXR1cm4gdG8gcGF0aWVudHMgTGlzdCBpZiBkbyBub3QgaGF2ZSBjb25uZWN0aW9uXHJcbiAgICAgICAgaWYgKCF0aGlzLmNvbm5lY3RvclNlcnZpY2UuaXNDb25uZWN0ZWQoKSkge1xyXG4gICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9wYXRpZW50cyddKTtcclxuICAgICAgICB9XHJcbiBcclxuIFxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiSUQgUEFDSUVOVEUgXCIgKyBpZCArIFwiIElEIE1BVEVSSUFMXCIgKyBpZHgpXHJcbiAgICAgICAgdGhpcy5wYXRpZW50ID0gdGhpcy5wYXRpZW50U2VydmljZS5wYXRpZW50cy5maWx0ZXIocGF0aWVudCA9PiBwYXRpZW50LmlkID09PSBpZClbMF07XHJcbiAgICAgICAgLy8gY3JpYXIgbGlzdGEgZGUgbWF0ZXJpYWlzIGNvbSBwcm9wcmlhZGFkZSBhZGljaW9uYWwgbmVlZCBuYW1lIGFuZCBuZWVkIGRlc2NyaXB0aW9uXHJcbiAgICAgICAgdGhpcy5hZGRQcm9wZXJ0eU5lZWRPbk1hdGVyaWFsKCk7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIk1BVEVSSUFMT0ZBTExORUVEUyA6IFwiICsgSlNPTi5zdHJpbmdpZnkodGhpcy5tYXRlcmlhbHNPZkFsbE5lZWRzLCBudWxsLCA0KSk7XHJcbiAgICAgICAgdGhpcy5tYXRlcmlhbFBhcmVudCA9IHRoaXMubWF0ZXJpYWxzT2ZBbGxOZWVkcy5maWx0ZXIobWF0ZXJpYWwgPT4gbWF0ZXJpYWwuaWQgPT09IGlkeClbMF07XHJcbiBcclxuICAgICAgICAvL2NvbnNvbGUubG9nKFwiLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tOiBcIik7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIk1BVEVSSUFMUGFyZW50IDogXCIgKyBKU09OLnN0cmluZ2lmeSh0aGlzLm1hdGVyaWFsUGFyZW50LCBudWxsLCA0KSk7XHJcbiAgICAgICAgLy92ZXJpZmljYXIgc2Ugw6kgdW0gY29tcG9zaXRlXHJcbiAgICAgICAgaWYgKHRoaXMubWF0ZXJpYWxQYXJlbnQudHlwZSA9PSBcImNvbXBvc2l0ZVwiKSB7Ly9tYXRlcmlhbCBjb21wb3N0byAtPiBjYXJyZWdhciBvIGFycmF5XHJcbiAgICAgICAgICAgIHRoaXMubWF0ZXJpYWxzVG9EaXNwbGF5ID0gdGhpcy5tYXRlcmlhbFBhcmVudC5tYXRlcmlhbHM7XHJcbiAgICAgICAgfSBlbHNlIHsvL21hdGVyaWFsIHNpbXBsZXMgYmFzdGEgY2FycmVnYXIgcGFyYSB2aXN0YVxyXG4gICAgICAgICAgICB0aGlzLm1hdGVyaWFsc1RvRGlzcGxheSA9IFtdO1xyXG4gICAgICAgICAgICB0aGlzLm1hdGVyaWFsc1RvRGlzcGxheS5wdXNoKHRoaXMubWF0ZXJpYWxQYXJlbnQpO1xyXG4gXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnBhdGllbnRTZXJ2aWNlLnJlZ2lzdGVyQWNlc3NlZE1hdGVyaWFsKHRoaXMucGF0aWVudCwgdGhpcy5tYXRlcmlhbFBhcmVudCk7XHJcblxyXG4gICAgICAgIC8vdmVyaWZ5IGlzIGVtYWlsIGF2YWxpYWJsZVxyXG4gICAgICAgIGVtYWlsLmF2YWlsYWJsZSgpLnRoZW4oZnVuY3Rpb24gKGF2YWlsKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiIyBDT01QT05FTlRFIE1BVEVSSUFMLURFVEFJTCAjIEVtYWlsIGF2YWlsYWJsZT8gXCIgKyBhdmFpbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGF2YWlsO1xyXG4gICAgICAgIH0pLnRoZW4oKGF2YWlsKT0+e1xyXG4gICAgICAgICAgICB0aGlzLmVtYWlsQXZhbGlhYmxlPWF2YWlsO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLy9FdmFsdWF0aW9uc1xyXG4gICAgICAgIHRoaXMuaGFzRXZhbHVhdGlvbnNUb0RvID0gdGhpcy5wYXRpZW50U2VydmljZS5oYXNFdmFsdWF0aW9uc1RvRG8oKTtcclxuIFxyXG4gICAgfVxyXG4gICAgc3RvcExvYWRpbmcoKSB7XHJcbiAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJQQVNTT1UgQUtJXCIpXHJcbiAgICB9XHJcbiBcclxuIFxyXG4gICAgLyoqXHJcbiAgICAgKiBGdW5jdGlvbiB0byBhZGQgcHJvcGVydGllcyBvZiB0aGUgXCJwYXJlbnRcIiBuZWVkIHRvIHRoZSBcImNoaWxkXCIgbWF0ZXJpYWxcclxuICAgICAqXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hdGVyaWFsRGV0YWlsQ29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIGFkZFByb3BlcnR5TmVlZE9uTWF0ZXJpYWwoKSB7XHJcbiAgICAgICAgbGV0IG1hdGVyaWFsc190ZW1wOiBNYXRlcmlhbFtdO1xyXG4gICAgICAgIG1hdGVyaWFsc190ZW1wID0gW107XHJcbiBcclxuICAgICAgICB0aGlzLnBhdGllbnQubmVlZHMuZm9yRWFjaChuZWVkID0+IHtcclxuICAgICAgICAgICAgbmVlZC5tYXRlcmlhbHMuZm9yRWFjaChtYXRlcmlhbE9mYU5lZWQgPT4ge1xyXG4gICAgICAgICAgICAgICAgbWF0ZXJpYWxPZmFOZWVkW1wibmVlZF9pZFwiXSA9IG5lZWQuaWQ7XHJcbiAgICAgICAgICAgICAgICBtYXRlcmlhbE9mYU5lZWRbXCJuZWVkX2Rlc2NyaXB0aW9uXCJdID0gbmVlZC5kZXNjcmlwdGlvbjtcclxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJNQVRFUklBTCA6IFwiICsgSlNPTi5zdHJpbmdpZnkobWF0ZXJpYWxPZmFOZWVkLCBudWxsLCA0KSk7XHJcbiAgICAgICAgICAgICAgICBtYXRlcmlhbHNfdGVtcC5wdXNoKG1hdGVyaWFsT2ZhTmVlZCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gXHJcbiAgICAgICAgdGhpcy5tYXRlcmlhbHNPZkFsbE5lZWRzID0gbWF0ZXJpYWxzX3RlbXA7XHJcbiAgICB9XHJcbiBcclxuIFxyXG4gXHJcbiAgICAvKipcclxuICAgICAqIEZ1bmN0aW9uIHRvIG9wZW4gZXh0ZXJuYWwgbWF0ZXJpYWxzIFtwZGYgLi4uXVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7YW55fSBpZFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXRlcmlhbERldGFpbENvbXBvbmVudFxyXG4gICAgICovXHJcbiAgICBvcGVuT25Ccm93c2VyKGlkKSB7XHJcbiAgICAgICAgbGV0IG1hdGVyaWFsID0gdGhpcy5tYXRlcmlhbHNUb0Rpc3BsYXkuZmlsdGVyKG1hdGVyaWFsID0+IG1hdGVyaWFsLmlkID09PSBpZClbMF07XHJcbiAgICAgICAgb3BlblVybChtYXRlcmlhbC51cmwpO1xyXG4gICAgfVxyXG4gXHJcbiBcclxuIFxyXG4gICAgLyoqXHJcbiAgICAgKiBGdW5jdGlvbiB0byByYXRlIG1hdGVyaWFsIFtyZWQseWVsbG93LGdyZWVuXVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7YW55fSBsZXZlbFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXRlcmlhbERldGFpbENvbXBvbmVudFxyXG4gICAgICovXHJcbiAgICBldmFsdWF0ZU1hdGVyaWFsKGxldmVsKSB7XHJcbiBcclxuICAgICAgICBsZXQgcmF0aW5nID0gbmV3IFJhdGluZygpO1xyXG5cclxuICAgICAgICByYXRpbmcuZXZhbHVhdGlvbiA9IGxldmVsO1xyXG4gICAgICAgIHJhdGluZy5pZF9tYXRlcmlhbCA9IHRoaXMubWF0ZXJpYWxQYXJlbnQuaWQ7XHJcbiBcclxuICAgICAgICB0aGlzLnJhdGluZ3MucHVzaChyYXRpbmcpO1xyXG4gXHJcbiAgICAgICAgdGhpcy5kYXRhU2VydmljZS5zZXRSYXRpbmcocmF0aW5nKTtcclxuICAgICAgICB0aGlzLnBhdGllbnRTZXJ2aWNlLnNlbmRSYXRpbmcocmF0aW5nKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgXHJcbiAgICBnZXRSYXRpbmdzKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJhdGluZ3M7XHJcbiAgICB9XHJcbiBcclxuIFxyXG4gXHJcbiAgICAvKipcclxuICAgICAqIGZ1bmN0aW9uIHRvIG5hdmlnYXRlIHRvIHRoZSBtYXRlcmlhbCBxdWVzdGlvbm5haXJlXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHthbnl9IHJlZl9xdWVzdGlvbm5haXJlXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hdGVyaWFsRGV0YWlsQ29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIGZpbGxRdWVzdGlvbm5haXJlKHJlZl9xdWVzdGlvbm5haXJlKSB7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvZXZhbHVhdGlvbicsIHJlZl9xdWVzdGlvbm5haXJlXSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRnVuY3Rpb24gdG8gc2VuZCBlbWFpbCB0byBwcm9maXNzaW9uYWwgc2F1ZGVcclxuICAgICAqIFxyXG4gICAgICogXHJcbiAgICAgKiBAbWVtYmVyb2YgTWF0ZXJpYWxEZXRhaWxDb21wb25lbnRcclxuICAgICAqL1xyXG4gICAgc2VuZE1haWxUbygpIHtcclxuICAgICAgICBlbWFpbC5jb21wb3NlKHtcclxuICAgICAgICAgICAgc3ViamVjdDogXCJQZWRpZG8gZGUgZXNjbGFyZWNpbWVudG8gZG8gY3VpZGFkb3IgXCIgKyB0aGlzLmFwcF91c2VyLm5hbWUgKyBcIiBjb20gbyBpZDogXCIgKyB0aGlzLmFwcF91c2VyLmlkLFxyXG4gICAgICAgICAgICBib2R5OiBcIkJvbSBkaWEsPHA+XCJcclxuICAgICAgICAgICAgK1wiTmVjZXNzaXRvIGVzY2xhcmVjaW1lbnRvIHNvYnJlIG8gc2VndWludGUgbWF0ZXJpYWw6XCIgXHJcbiAgICAgICAgICAgICsgXCI8cD5JZCBNYXRlcmlhbDogXCIgKyB0aGlzLm1hdGVyaWFsUGFyZW50LmlkXHJcbiAgICAgICAgICAgICsgXCI8cD5Ob21lIE1hdGVyaWFsOiBcIiArIHRoaXMubWF0ZXJpYWxQYXJlbnQubmFtZVxyXG4gICAgICAgICAgICArIFwiPHA+RGVzY3Jpw6fDo28gTWF0ZXJpYWw6IFwiICsgdGhpcy5tYXRlcmlhbFBhcmVudC5kZXNjcmlwdGlvblxyXG4gICAgICAgICAgICArIFwiPHA+SWQgQ3VpZGFkb3I6IFwiICsgdGhpcy5hcHBfdXNlci5pZFxyXG4gICAgICAgICAgICArIFwiPHA+Tm9tZSBDdWlkYWRvcjogXCIgKyB0aGlzLmFwcF91c2VyLm5hbWVcclxuICAgICAgICAgICAgLCAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0bzogW3RoaXMuZW1haWxQcm9maXNzaW9uYWxTYXVkZV0sXHJcbiAgICAgICAgICAgIGNjOiBbJyddLFxyXG4gICAgICAgICAgICBiY2M6IFsnJywgJyddLFxyXG4gICAgICAgICAgICBhdHRhY2htZW50czogW1xyXG4gICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgYXBwUGlja2VyVGl0bGU6ICdDb21wb3NlIHdpdGggYXBwIGNhcmVnaXZlcicgLy8gZm9yIEFuZHJvaWQsIGRlZmF1bHQ6ICdPcGVuIHdpdGguLidcclxuICAgICAgICB9KS50aGVuKFxyXG4gICAgICAgICAgICBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVtYWlsIGNvbXBvc2VyIGNsb3NlZFwiKTtcclxuICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvcjogXCIgKyBlcnIpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbn1cclxuIl19