"use strict";
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var patient_service_1 = require("../patient/patient.service");
var data_service_1 = require("../shared/data/data.service");
var rating_1 = require("./rating");
var app = require("application");
var router_2 = require("@angular/router");
var utils_1 = require("utils/utils");
var connector_service_1 = require("../shared/connector/connector.service");
require("nativescript-pdf-view");
var email = require("nativescript-email");
var Toast = require("nativescript-toast");
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
        //verify if has a quiz
        this.materialHasQuiz();
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
        console.log("NEW EVALUTION: " + level);
        var rating = new rating_1.Rating();
        rating.evaluation = level;
        rating.id_material = this.materialParent.id.toString();
        this.ratings.push(rating);
        this.dataService.setRating(this.materialParent, level);
        this.patientService.sendRating(rating);
        Toast.makeText("A sua avaliação do material foi atualizada. Obrigado.").show();
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
    MaterialDetailComponent.prototype.ngAfterViewInit = function () {
        if (app.android) {
            app.android.on(app.AndroidApplication.activityBackPressedEvent, this.backEvent);
        }
    };
    MaterialDetailComponent.prototype.ngOnDestroy = function () {
        // cleaning up references/listeners.
        if (app.android) {
            app.android.off(app.AndroidApplication.activityBackPressedEvent, this.backEvent);
        }
    };
    /**
     * Function to disable back button on android
     *
     * @param {any} args
     * @returns
     *
     * @memberof PatientsComponent
     */
    MaterialDetailComponent.prototype.backEvent = function (args) {
        args.cancel = true;
        return;
    };
    /**
     * Function to verify if material have some quiz to do.
     *
     * @param {any} material
     * @returns
     * @memberof MaterialDetailComponent
     */
    MaterialDetailComponent.prototype.materialHasQuiz = function () {
        var _this = this;
        this.hasQuiz = false;
        if (this.dataService.getQuizs().length > 0) {
            this.dataService.getQuizs().forEach(function (element) {
                if (element.reference == "material" && element.reference_id == _this.materialParent.id) {
                    _this.hasQuiz = true;
                }
            });
        }
    };
    return MaterialDetailComponent;
}());
MaterialDetailComponent = __decorate([
    core_1.Component({
        selector: "material-details",
        moduleId: module.id,
        styleUrls: ["./material-detail.component.css"],
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0ZXJpYWwtZGV0YWlsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1hdGVyaWFsLWRldGFpbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHNDQUFrRDtBQUNsRCwwQ0FBaUQ7QUFHakQsOERBQTREO0FBQzVELDREQUEwRDtBQUUxRCxtQ0FBa0M7QUFHbEMsaUNBQW9DO0FBS3BDLDBDQUF5QztBQUl6QyxxQ0FBc0M7QUFFdEMsMkVBQXlFO0FBRXpFLGlDQUErQjtBQUUvQiwwQ0FBNEM7QUFDNUMsMENBQTRDO0FBRzVDLDREQUEwRDtBQVExRCxJQUFhLHVCQUF1QjtJQWdCaEMsdUNBQXVDO0lBQ3ZDLHVEQUF1RDtJQUV2RCxpQ0FDWSxjQUE4QixFQUM5QixLQUFxQixFQUNyQixNQUFjLEVBQ2QsV0FBd0IsRUFDeEIsZ0JBQWtDLEVBQ2xDLFdBQXdCO1FBTHhCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUNyQixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2QsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNsQyxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUVoQyxJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBR0QsMENBQVEsR0FBUjtRQUFBLGlCQWtEQztRQWpERyxPQUFPLENBQUMsR0FBRyxDQUFDLDhCQUE4QixDQUFDLENBQUE7UUFDM0MsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDcEIsSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7UUFDNUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQzNDLDhCQUE4QjtRQUM5QixJQUFJLENBQUMsc0JBQXNCLEdBQUcsdUNBQXVDLENBQUM7UUFFdEUs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QUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztnQkFDeEIsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztJQUNMLENBQUM7SUFDTCw4QkFBQztBQUFELENBQUMsQUFyUEQsSUFxUEM7QUFyUFksdUJBQXVCO0lBTm5DLGdCQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsa0JBQWtCO1FBQzVCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtRQUNuQixTQUFTLEVBQUUsQ0FBQyxpQ0FBaUMsQ0FBQztRQUM5QyxXQUFXLEVBQUUsa0NBQWtDO0tBQ2xELENBQUM7cUNBcUI4QixnQ0FBYztRQUN2Qix1QkFBYztRQUNiLGVBQU07UUFDRCwwQkFBVztRQUNOLG9DQUFnQjtRQUNyQiwwQkFBVztHQXpCM0IsdUJBQXVCLENBcVBuQztBQXJQWSwwREFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xyXG5cclxuaW1wb3J0IHsgUGF0aWVudCB9IGZyb20gXCIuLi9wYXRpZW50L3BhdGllbnRcIjtcclxuaW1wb3J0IHsgUGF0aWVudFNlcnZpY2UgfSBmcm9tIFwiLi4vcGF0aWVudC9wYXRpZW50LnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgRGF0YVNlcnZpY2UgfSBmcm9tIFwiLi4vc2hhcmVkL2RhdGEvZGF0YS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IE1hdGVyaWFsIH0gZnJvbSBcIi4vbWF0ZXJpYWxcIjtcclxuaW1wb3J0IHsgUmF0aW5nIH0gZnJvbSBcIi4vcmF0aW5nXCI7XHJcbmltcG9ydCB7IE5lZWQgfSBmcm9tIFwiLi4vbmVlZC9uZWVkXCI7XHJcblxyXG5pbXBvcnQgYXBwID0gcmVxdWlyZShcImFwcGxpY2F0aW9uXCIpO1xyXG5pbXBvcnQgcGxhdGZvcm0gPSByZXF1aXJlKFwicGxhdGZvcm1cIik7XHJcblxyXG5pbXBvcnQgYnV0dG9uTW9kdWxlID0gcmVxdWlyZShcInVpL2J1dHRvblwiKTtcclxuXHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuXHJcblxyXG5pbXBvcnQgeyBvcGVuQXBwIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1vcGVuLWFwcFwiO1xyXG5pbXBvcnQgeyBvcGVuVXJsIH0gZnJvbSBcInV0aWxzL3V0aWxzXCI7XHJcblxyXG5pbXBvcnQgeyBDb25uZWN0b3JTZXJ2aWNlIH0gZnJvbSBcIi4uL3NoYXJlZC9jb25uZWN0b3IvY29ubmVjdG9yLnNlcnZpY2VcIjtcclxuXHJcbmltcG9ydCAnbmF0aXZlc2NyaXB0LXBkZi12aWV3JztcclxuXHJcbmltcG9ydCAqIGFzIGVtYWlsIGZyb20gXCJuYXRpdmVzY3JpcHQtZW1haWxcIjtcclxuaW1wb3J0ICogYXMgVG9hc3QgZnJvbSAnbmF0aXZlc2NyaXB0LXRvYXN0JztcclxuXHJcbmltcG9ydCB7IFVzZXIgfSBmcm9tIFwiLi4vc2hhcmVkL3VzZXIvdXNlclwiO1xyXG5pbXBvcnQgeyBVc2VyU2VydmljZSB9IGZyb20gXCIuLi9zaGFyZWQvdXNlci91c2VyLnNlcnZpY2VcIjtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6IFwibWF0ZXJpYWwtZGV0YWlsc1wiLFxyXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHN0eWxlVXJsczogW1wiLi9tYXRlcmlhbC1kZXRhaWwuY29tcG9uZW50LmNzc1wiXSxcclxuICAgIHRlbXBsYXRlVXJsOiBcIi4vbWF0ZXJpYWwtZGV0YWlsLmNvbXBvbmVudC5odG1sXCIsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNYXRlcmlhbERldGFpbENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgICBwYXRpZW50OiBQYXRpZW50O1xyXG4gICAgbmVlZDogTmVlZDtcclxuICAgIG1hdGVyaWFsc09mQWxsTmVlZHM6IE1hdGVyaWFsW107XHJcbiAgICBtYXRlcmlhbFBhcmVudDogTWF0ZXJpYWw7XHJcbiAgICBtYXRlcmlhbHNUb0Rpc3BsYXk6IE1hdGVyaWFsW107XHJcblxyXG4gICAgaGFzRXZhbHVhdGlvbnNUb0RvOiBib29sZWFuO1xyXG4gICAgbG9hZGluZzogYm9vbGVhbjtcclxuXHJcbiAgICBlbWFpbEF2YWxpYWJsZTogYm9vbGVhbjtcclxuICAgIGFwcF91c2VyOiBVc2VyO1xyXG4gICAgZW1haWxQcm9maXNzaW9uYWxTYXVkZTogc3RyaW5nO1xyXG4gICAgaGFzUXVpejogYm9vbGVhbjtcclxuXHJcbiAgICByYXRpbmdzOiBSYXRpbmdbXTtcclxuICAgIC8vcmF0aW5ncy5wdXNoKG5ldyBSYXRpbmcoXCIxXCIsIFwiTWF1XCIpKTtcclxuICAgIC8vIHJhdGluZ3MgPSBbUmF0aW5nKFwiMVwiLCBcIk1hdVwiKSwgUmF0aW5nKFwiMlwiLCBcIk1lZGlvXCIpXVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgcGF0aWVudFNlcnZpY2U6IFBhdGllbnRTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlLFxyXG4gICAgICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsXHJcbiAgICAgICAgcHJpdmF0ZSBkYXRhU2VydmljZTogRGF0YVNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBjb25uZWN0b3JTZXJ2aWNlOiBDb25uZWN0b3JTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgdXNlclNlcnZpY2U6IFVzZXJTZXJ2aWNlXHJcbiAgICApIHtcclxuICAgICAgICB0aGlzLnJhdGluZ3MgPSBbXTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCIjIENPTVBPTkVOVEUgTUFURVJJQUwtREVUQUlMXCIpXHJcbiAgICAgICAgdGhpcy5sb2FkaW5nID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmVtYWlsQXZhbGlhYmxlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5hcHBfdXNlciA9IHRoaXMudXNlclNlcnZpY2UuZ2V0VXNlcigpO1xyXG4gICAgICAgIC8vU2V0IGVtYWlsIHByb2Zpc3Npb25hbCBzYXVkZVxyXG4gICAgICAgIHRoaXMuZW1haWxQcm9maXNzaW9uYWxTYXVkZSA9ICdzdXBwb3J0LmNhcmVnaXZlcnNAZW1haWxhcmVnaXN0YXIuY29tJztcclxuXHJcbiAgICAgICAgY29uc3QgaWQgPSArdGhpcy5yb3V0ZS5zbmFwc2hvdC5wYXJhbXNbXCJpZFwiXTtcclxuICAgICAgICBjb25zdCBpZHggPSArdGhpcy5yb3V0ZS5zbmFwc2hvdC5wYXJhbXNbXCJpZF9tYXRlcmlhbFwiXTtcclxuXHJcbiAgICAgICAgLy9yZXR1cm4gdG8gcGF0aWVudHMgTGlzdCBpZiBkbyBub3QgaGF2ZSBjb25uZWN0aW9uXHJcbiAgICAgICAgaWYgKCF0aGlzLmNvbm5lY3RvclNlcnZpY2UuaXNDb25uZWN0ZWQoKSkge1xyXG4gICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9wYXRpZW50cyddKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhcIklEIFBBQ0lFTlRFIFwiICsgaWQgKyBcIiBJRCBNQVRFUklBTFwiICsgaWR4KVxyXG4gICAgICAgIHRoaXMucGF0aWVudCA9IHRoaXMucGF0aWVudFNlcnZpY2UucGF0aWVudHMuZmlsdGVyKHBhdGllbnQgPT4gcGF0aWVudC5pZCA9PT0gaWQpWzBdO1xyXG4gICAgICAgIC8vIGNyaWFyIGxpc3RhIGRlIG1hdGVyaWFpcyBjb20gcHJvcHJpYWRhZGUgYWRpY2lvbmFsIG5lZWQgbmFtZSBhbmQgbmVlZCBkZXNjcmlwdGlvblxyXG4gICAgICAgIHRoaXMuYWRkUHJvcGVydHlOZWVkT25NYXRlcmlhbCgpO1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coXCJNQVRFUklBTE9GQUxMTkVFRFMgOiBcIiArIEpTT04uc3RyaW5naWZ5KHRoaXMubWF0ZXJpYWxzT2ZBbGxOZWVkcywgbnVsbCwgNCkpO1xyXG4gICAgICAgIHRoaXMubWF0ZXJpYWxQYXJlbnQgPSB0aGlzLm1hdGVyaWFsc09mQWxsTmVlZHMuZmlsdGVyKG1hdGVyaWFsID0+IG1hdGVyaWFsLmlkID09PSBpZHgpWzBdO1xyXG5cclxuICAgICAgICAvL2NvbnNvbGUubG9nKFwiLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tOiBcIik7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIk1BVEVSSUFMUGFyZW50IDogXCIgKyBKU09OLnN0cmluZ2lmeSh0aGlzLm1hdGVyaWFsUGFyZW50LCBudWxsLCA0KSk7XHJcbiAgICAgICAgLy92ZXJpZmljYXIgc2Ugw6kgdW0gY29tcG9zaXRlXHJcbiAgICAgICAgaWYgKHRoaXMubWF0ZXJpYWxQYXJlbnQudHlwZSA9PSBcImNvbXBvc2l0ZVwiKSB7Ly9tYXRlcmlhbCBjb21wb3N0byAtPiBjYXJyZWdhciBvIGFycmF5XHJcbiAgICAgICAgICAgIHRoaXMubWF0ZXJpYWxzVG9EaXNwbGF5ID0gdGhpcy5tYXRlcmlhbFBhcmVudC5tYXRlcmlhbHM7XHJcbiAgICAgICAgfSBlbHNlIHsvL21hdGVyaWFsIHNpbXBsZXMgYmFzdGEgY2FycmVnYXIgcGFyYSB2aXN0YVxyXG4gICAgICAgICAgICB0aGlzLm1hdGVyaWFsc1RvRGlzcGxheSA9IFtdO1xyXG4gICAgICAgICAgICB0aGlzLm1hdGVyaWFsc1RvRGlzcGxheS5wdXNoKHRoaXMubWF0ZXJpYWxQYXJlbnQpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vdmVyaWZ5IGlmIGhhcyBhIHF1aXpcclxuICAgICAgICB0aGlzLm1hdGVyaWFsSGFzUXVpeigpO1xyXG5cclxuICAgICAgICB0aGlzLnBhdGllbnRTZXJ2aWNlLnJlZ2lzdGVyQWNlc3NlZE1hdGVyaWFsKHRoaXMucGF0aWVudCwgdGhpcy5tYXRlcmlhbFBhcmVudCk7XHJcblxyXG4gICAgICAgIC8vdmVyaWZ5IGlzIGVtYWlsIGF2YWxpYWJsZVxyXG4gICAgICAgIGVtYWlsLmF2YWlsYWJsZSgpLnRoZW4oZnVuY3Rpb24gKGF2YWlsKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiIyBDT01QT05FTlRFIE1BVEVSSUFMLURFVEFJTCAjIEVtYWlsIGF2YWlsYWJsZT8gXCIgKyBhdmFpbCk7XHJcbiAgICAgICAgICAgIHJldHVybiBhdmFpbDtcclxuICAgICAgICB9KS50aGVuKChhdmFpbCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmVtYWlsQXZhbGlhYmxlID0gYXZhaWw7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAvL0V2YWx1YXRpb25zXHJcbiAgICAgICAgdGhpcy5oYXNFdmFsdWF0aW9uc1RvRG8gPSB0aGlzLnBhdGllbnRTZXJ2aWNlLmhhc0V2YWx1YXRpb25zVG9EbygpO1xyXG5cclxuICAgIH1cclxuICAgIHN0b3BMb2FkaW5nKCkge1xyXG4gICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiUEFTU09VIEFLSVwiKVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEZ1bmN0aW9uIHRvIGFkZCBwcm9wZXJ0aWVzIG9mIHRoZSBcInBhcmVudFwiIG5lZWQgdG8gdGhlIFwiY2hpbGRcIiBtYXRlcmlhbFxyXG4gICAgICpcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWF0ZXJpYWxEZXRhaWxDb21wb25lbnRcclxuICAgICAqL1xyXG4gICAgYWRkUHJvcGVydHlOZWVkT25NYXRlcmlhbCgpIHtcclxuICAgICAgICBsZXQgbWF0ZXJpYWxzX3RlbXA6IE1hdGVyaWFsW107XHJcbiAgICAgICAgbWF0ZXJpYWxzX3RlbXAgPSBbXTtcclxuXHJcbiAgICAgICAgdGhpcy5wYXRpZW50Lm5lZWRzLmZvckVhY2gobmVlZCA9PiB7XHJcbiAgICAgICAgICAgIG5lZWQubWF0ZXJpYWxzLmZvckVhY2gobWF0ZXJpYWxPZmFOZWVkID0+IHtcclxuICAgICAgICAgICAgICAgIG1hdGVyaWFsT2ZhTmVlZFtcIm5lZWRfaWRcIl0gPSBuZWVkLmlkO1xyXG4gICAgICAgICAgICAgICAgbWF0ZXJpYWxPZmFOZWVkW1wibmVlZF9kZXNjcmlwdGlvblwiXSA9IG5lZWQuZGVzY3JpcHRpb247XHJcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiTUFURVJJQUwgOiBcIiArIEpTT04uc3RyaW5naWZ5KG1hdGVyaWFsT2ZhTmVlZCwgbnVsbCwgNCkpO1xyXG4gICAgICAgICAgICAgICAgbWF0ZXJpYWxzX3RlbXAucHVzaChtYXRlcmlhbE9mYU5lZWQpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5tYXRlcmlhbHNPZkFsbE5lZWRzID0gbWF0ZXJpYWxzX3RlbXA7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEZ1bmN0aW9uIHRvIG9wZW4gZXh0ZXJuYWwgbWF0ZXJpYWxzIFtwZGYgLi4uXVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7YW55fSBpZFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXRlcmlhbERldGFpbENvbXBvbmVudFxyXG4gICAgICovXHJcbiAgICBvcGVuT25Ccm93c2VyKGlkKSB7XHJcbiAgICAgICAgbGV0IG1hdGVyaWFsID0gdGhpcy5tYXRlcmlhbHNUb0Rpc3BsYXkuZmlsdGVyKG1hdGVyaWFsID0+IG1hdGVyaWFsLmlkID09PSBpZClbMF07XHJcbiAgICAgICAgb3BlblVybChtYXRlcmlhbC51cmwpO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGdW5jdGlvbiB0byByYXRlIG1hdGVyaWFsIFtyZWQseWVsbG93LGdyZWVuXVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7YW55fSBsZXZlbFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXRlcmlhbERldGFpbENvbXBvbmVudFxyXG4gICAgICovXHJcbiAgICBldmFsdWF0ZU1hdGVyaWFsKGxldmVsKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJORVcgRVZBTFVUSU9OOiBcIiArIGxldmVsKTtcclxuICAgICAgICBsZXQgcmF0aW5nID0gbmV3IFJhdGluZygpO1xyXG5cclxuICAgICAgICByYXRpbmcuZXZhbHVhdGlvbiA9IGxldmVsO1xyXG4gICAgICAgIHJhdGluZy5pZF9tYXRlcmlhbCA9IHRoaXMubWF0ZXJpYWxQYXJlbnQuaWQudG9TdHJpbmcoKTtcclxuXHJcbiAgICAgICAgdGhpcy5yYXRpbmdzLnB1c2gocmF0aW5nKTtcclxuXHJcbiAgICAgICAgdGhpcy5kYXRhU2VydmljZS5zZXRSYXRpbmcodGhpcy5tYXRlcmlhbFBhcmVudCwgbGV2ZWwpO1xyXG4gICAgICAgIHRoaXMucGF0aWVudFNlcnZpY2Uuc2VuZFJhdGluZyhyYXRpbmcpO1xyXG5cclxuXHJcblxyXG4gICAgICAgIFRvYXN0Lm1ha2VUZXh0KFwiQSBzdWEgYXZhbGlhw6fDo28gZG8gbWF0ZXJpYWwgZm9pIGF0dWFsaXphZGEuIE9icmlnYWRvLlwiKS5zaG93KCk7XHJcblxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBnZXRSYXRpbmdzKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJhdGluZ3M7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIGZ1bmN0aW9uIHRvIG5hdmlnYXRlIHRvIHRoZSBtYXRlcmlhbCBxdWVzdGlvbm5haXJlXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHthbnl9IHJlZl9xdWVzdGlvbm5haXJlXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hdGVyaWFsRGV0YWlsQ29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIGZpbGxRdWVzdGlvbm5haXJlKHJlZl9xdWVzdGlvbm5haXJlKSB7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvZXZhbHVhdGlvbicsIHJlZl9xdWVzdGlvbm5haXJlXSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRnVuY3Rpb24gdG8gc2VuZCBlbWFpbCB0byBwcm9maXNzaW9uYWwgc2F1ZGVcclxuICAgICAqIFxyXG4gICAgICogXHJcbiAgICAgKiBAbWVtYmVyb2YgTWF0ZXJpYWxEZXRhaWxDb21wb25lbnRcclxuICAgICAqL1xyXG4gICAgc2VuZE1haWxUbygpIHtcclxuICAgICAgICBlbWFpbC5jb21wb3NlKHtcclxuICAgICAgICAgICAgc3ViamVjdDogXCJQZWRpZG8gZGUgZXNjbGFyZWNpbWVudG8gZG8gY3VpZGFkb3IgXCIgKyB0aGlzLmFwcF91c2VyLm5hbWUgKyBcIiBjb20gbyBpZDogXCIgKyB0aGlzLmFwcF91c2VyLmlkLFxyXG4gICAgICAgICAgICBib2R5OiBcIkJvbSBkaWEsPHA+XCJcclxuICAgICAgICAgICAgKyBcIk5lY2Vzc2l0byBlc2NsYXJlY2ltZW50byBzb2JyZSBvIHNlZ3VpbnRlIG1hdGVyaWFsOlwiXHJcbiAgICAgICAgICAgICsgXCI8cD5JZCBNYXRlcmlhbDogXCIgKyB0aGlzLm1hdGVyaWFsUGFyZW50LmlkXHJcbiAgICAgICAgICAgICsgXCI8cD5Ob21lIE1hdGVyaWFsOiBcIiArIHRoaXMubWF0ZXJpYWxQYXJlbnQubmFtZVxyXG4gICAgICAgICAgICArIFwiPHA+RGVzY3Jpw6fDo28gTWF0ZXJpYWw6IFwiICsgdGhpcy5tYXRlcmlhbFBhcmVudC5kZXNjcmlwdGlvblxyXG4gICAgICAgICAgICArIFwiPHA+SWQgQ3VpZGFkb3I6IFwiICsgdGhpcy5hcHBfdXNlci5pZFxyXG4gICAgICAgICAgICArIFwiPHA+Tm9tZSBDdWlkYWRvcjogXCIgKyB0aGlzLmFwcF91c2VyLm5hbWVcclxuICAgICAgICAgICAgLFxyXG4gICAgICAgICAgICB0bzogW3RoaXMuZW1haWxQcm9maXNzaW9uYWxTYXVkZV0sXHJcbiAgICAgICAgICAgIGNjOiBbJyddLFxyXG4gICAgICAgICAgICBiY2M6IFsnJywgJyddLFxyXG4gICAgICAgICAgICBhdHRhY2htZW50czogW1xyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBhcHBQaWNrZXJUaXRsZTogJ0NvbXBvc2Ugd2l0aCBhcHAgY2FyZWdpdmVyJyAvLyBmb3IgQW5kcm9pZCwgZGVmYXVsdDogJ09wZW4gd2l0aC4uJ1xyXG4gICAgICAgIH0pLnRoZW4oXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRW1haWwgY29tcG9zZXIgY2xvc2VkXCIpO1xyXG4gICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yOiBcIiArIGVycik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcclxuICAgICAgICBpZiAoYXBwLmFuZHJvaWQpIHtcclxuICAgICAgICAgICAgYXBwLmFuZHJvaWQub24oYXBwLkFuZHJvaWRBcHBsaWNhdGlvbi5hY3Rpdml0eUJhY2tQcmVzc2VkRXZlbnQsIHRoaXMuYmFja0V2ZW50KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICAgICAgLy8gY2xlYW5pbmcgdXAgcmVmZXJlbmNlcy9saXN0ZW5lcnMuXHJcbiAgICAgICAgaWYgKGFwcC5hbmRyb2lkKSB7XHJcbiAgICAgICAgICAgIGFwcC5hbmRyb2lkLm9mZihhcHAuQW5kcm9pZEFwcGxpY2F0aW9uLmFjdGl2aXR5QmFja1ByZXNzZWRFdmVudCwgdGhpcy5iYWNrRXZlbnQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEZ1bmN0aW9uIHRvIGRpc2FibGUgYmFjayBidXR0b24gb24gYW5kcm9pZFxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge2FueX0gYXJncyBcclxuICAgICAqIEByZXR1cm5zIFxyXG4gICAgICogXHJcbiAgICAgKiBAbWVtYmVyb2YgUGF0aWVudHNDb21wb25lbnRcclxuICAgICAqL1xyXG4gICAgYmFja0V2ZW50KGFyZ3MpIHtcclxuICAgICAgICBhcmdzLmNhbmNlbCA9IHRydWU7XHJcbiAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEZ1bmN0aW9uIHRvIHZlcmlmeSBpZiBtYXRlcmlhbCBoYXZlIHNvbWUgcXVpeiB0byBkby5cclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHthbnl9IG1hdGVyaWFsIFxyXG4gICAgICogQHJldHVybnMgXHJcbiAgICAgKiBAbWVtYmVyb2YgTWF0ZXJpYWxEZXRhaWxDb21wb25lbnRcclxuICAgICAqL1xyXG4gICAgbWF0ZXJpYWxIYXNRdWl6KCkge1xyXG4gICAgICAgIHRoaXMuaGFzUXVpeiA9IGZhbHNlO1xyXG4gICAgICAgIGlmICh0aGlzLmRhdGFTZXJ2aWNlLmdldFF1aXpzKCkubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmRhdGFTZXJ2aWNlLmdldFF1aXpzKCkuZm9yRWFjaChlbGVtZW50ID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChlbGVtZW50LnJlZmVyZW5jZSA9PSBcIm1hdGVyaWFsXCIgJiYgZWxlbWVudC5yZWZlcmVuY2VfaWQgPT0gdGhpcy5tYXRlcmlhbFBhcmVudC5pZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFzUXVpeiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=