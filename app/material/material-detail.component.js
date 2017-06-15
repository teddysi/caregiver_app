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
        this.patientService.registerAcessedMaterial(this.materialParent);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0ZXJpYWwtZGV0YWlsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1hdGVyaWFsLWRldGFpbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHNDQUFrRDtBQUNsRCwwQ0FBaUQ7QUFHakQsOERBQTREO0FBQzVELDREQUEwRDtBQUUxRCxtQ0FBa0M7QUFRbEMsMENBQXlDO0FBSXpDLHFDQUFzQztBQUV0QywyRUFBeUU7QUFFekUsaUNBQStCO0FBRS9CLDBDQUE0QztBQUc1Qyw0REFBMEQ7QUFPMUQsSUFBYSx1QkFBdUI7SUFlaEMsdUNBQXVDO0lBQ3ZDLHVEQUF1RDtJQUV2RCxpQ0FDWSxjQUE4QixFQUM5QixLQUFxQixFQUNyQixNQUFjLEVBQ2QsV0FBd0IsRUFDeEIsZ0JBQWtDLEVBQ2xDLFdBQXdCO1FBTHhCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUNyQixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2QsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNsQyxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUVoQyxJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBR0QsMENBQVEsR0FBUjtRQUFBLGlCQStDQztRQTlDRyxPQUFPLENBQUMsR0FBRyxDQUFDLDhCQUE4QixDQUFDLENBQUE7UUFDM0MsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDcEIsSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7UUFDNUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQzNDLDhCQUE4QjtRQUM5QixJQUFJLENBQUMsc0JBQXNCLEdBQUcsdUNBQXVDLENBQUM7UUFFdEUsSUFBTSxFQUFFLEdBQUcsQ0FBQyxJQUFJLENB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Q0FBYztRQUN2Qix1QkFBYztRQUNiLGVBQU07UUFDRCwwQkFBVztRQUNOLG9DQUFnQjtRQUNyQiwwQkFBVztHQXhCM0IsdUJBQXVCLENBaU1uQztBQWpNWSwwREFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xyXG4gXHJcbmltcG9ydCB7IFBhdGllbnQgfSBmcm9tIFwiLi4vcGF0aWVudC9wYXRpZW50XCI7XHJcbmltcG9ydCB7IFBhdGllbnRTZXJ2aWNlIH0gZnJvbSBcIi4uL3BhdGllbnQvcGF0aWVudC5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IERhdGFTZXJ2aWNlIH0gZnJvbSBcIi4uL3NoYXJlZC9kYXRhL2RhdGEuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBNYXRlcmlhbCB9IGZyb20gXCIuL21hdGVyaWFsXCI7XHJcbmltcG9ydCB7IFJhdGluZyB9IGZyb20gXCIuL3JhdGluZ1wiO1xyXG5pbXBvcnQgeyBOZWVkIH0gZnJvbSBcIi4uL25lZWQvbmVlZFwiO1xyXG4gXHJcbmltcG9ydCBhcHAgPSByZXF1aXJlKFwiYXBwbGljYXRpb25cIik7XHJcbmltcG9ydCBwbGF0Zm9ybSA9IHJlcXVpcmUoXCJwbGF0Zm9ybVwiKTtcclxuIFxyXG5pbXBvcnQgYnV0dG9uTW9kdWxlID0gcmVxdWlyZShcInVpL2J1dHRvblwiKTtcclxuIFxyXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XHJcbiBcclxuIFxyXG5pbXBvcnQgeyBvcGVuQXBwIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1vcGVuLWFwcFwiO1xyXG5pbXBvcnQgeyBvcGVuVXJsIH0gZnJvbSBcInV0aWxzL3V0aWxzXCI7XHJcbiBcclxuaW1wb3J0IHsgQ29ubmVjdG9yU2VydmljZSB9IGZyb20gXCIuLi9zaGFyZWQvY29ubmVjdG9yL2Nvbm5lY3Rvci5zZXJ2aWNlXCI7XHJcbiBcclxuaW1wb3J0ICduYXRpdmVzY3JpcHQtcGRmLXZpZXcnO1xyXG5cclxuaW1wb3J0ICogYXMgZW1haWwgZnJvbSBcIm5hdGl2ZXNjcmlwdC1lbWFpbFwiO1xyXG5cclxuaW1wb3J0IHsgVXNlciB9IGZyb20gXCIuLi9zaGFyZWQvdXNlci91c2VyXCI7XHJcbmltcG9ydCB7IFVzZXJTZXJ2aWNlIH0gZnJvbSBcIi4uL3NoYXJlZC91c2VyL3VzZXIuc2VydmljZVwiO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogXCJtYXRlcmlhbC1kZXRhaWxzXCIsXHJcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9tYXRlcmlhbC1kZXRhaWwuY29tcG9uZW50Lmh0bWxcIixcclxufSlcclxuZXhwb3J0IGNsYXNzIE1hdGVyaWFsRGV0YWlsQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICAgIHBhdGllbnQ6IFBhdGllbnQ7XHJcbiAgICBuZWVkOiBOZWVkO1xyXG4gICAgbWF0ZXJpYWxzT2ZBbGxOZWVkczogTWF0ZXJpYWxbXTtcclxuICAgIG1hdGVyaWFsUGFyZW50OiBNYXRlcmlhbDtcclxuICAgIG1hdGVyaWFsc1RvRGlzcGxheTogTWF0ZXJpYWxbXTtcclxuIFxyXG4gICAgaGFzRXZhbHVhdGlvbnNUb0RvOiBib29sZWFuO1xyXG4gICAgbG9hZGluZzogYm9vbGVhbjtcclxuXHJcbiAgICBlbWFpbEF2YWxpYWJsZTogYm9vbGVhbjtcclxuICAgIGFwcF91c2VyOiBVc2VyO1xyXG4gICAgZW1haWxQcm9maXNzaW9uYWxTYXVkZTpzdHJpbmc7XHJcblxyXG4gICAgcmF0aW5nczogUmF0aW5nW107XHJcbiAgICAvL3JhdGluZ3MucHVzaChuZXcgUmF0aW5nKFwiMVwiLCBcIk1hdVwiKSk7XHJcbiAgICAvLyByYXRpbmdzID0gW1JhdGluZyhcIjFcIiwgXCJNYXVcIiksIFJhdGluZyhcIjJcIiwgXCJNZWRpb1wiKV1cclxuIFxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSBwYXRpZW50U2VydmljZTogUGF0aWVudFNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUsXHJcbiAgICAgICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcixcclxuICAgICAgICBwcml2YXRlIGRhdGFTZXJ2aWNlOiBEYXRhU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIGNvbm5lY3RvclNlcnZpY2U6IENvbm5lY3RvclNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSB1c2VyU2VydmljZTogVXNlclNlcnZpY2VcclxuICAgICkge1xyXG4gICAgICAgIHRoaXMucmF0aW5ncyA9IFtdO1xyXG4gICAgfVxyXG4gXHJcbiBcclxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiIyBDT01QT05FTlRFIE1BVEVSSUFMLURFVEFJTFwiKVxyXG4gICAgICAgIHRoaXMubG9hZGluZyA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5lbWFpbEF2YWxpYWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuYXBwX3VzZXIgPSB0aGlzLnVzZXJTZXJ2aWNlLmdldFVzZXIoKTtcclxuICAgICAgICAvL1NldCBlbWFpbCBwcm9maXNzaW9uYWwgc2F1ZGVcclxuICAgICAgICB0aGlzLmVtYWlsUHJvZmlzc2lvbmFsU2F1ZGUgPSAnc3VwcG9ydC5jYXJlZ2l2ZXJzQGVtYWlsYXJlZ2lzdGFyLmNvbSc7XHJcbiAgICAgXHJcbiAgICAgICAgY29uc3QgaWQgPSArdGhpcy5yb3V0ZS5zbmFwc2hvdC5wYXJhbXNbXCJpZFwiXTtcclxuICAgICAgICBjb25zdCBpZHggPSArdGhpcy5yb3V0ZS5zbmFwc2hvdC5wYXJhbXNbXCJpZF9tYXRlcmlhbFwiXTtcclxuIFxyXG4gICAgICAgIC8vcmV0dXJuIHRvIHBhdGllbnRzIExpc3QgaWYgZG8gbm90IGhhdmUgY29ubmVjdGlvblxyXG4gICAgICAgIGlmICghdGhpcy5jb25uZWN0b3JTZXJ2aWNlLmlzQ29ubmVjdGVkKCkpIHtcclxuICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvcGF0aWVudHMnXSk7XHJcbiAgICAgICAgfVxyXG4gXHJcbiBcclxuICAgICAgICBjb25zb2xlLmxvZyhcIklEIFBBQ0lFTlRFIFwiICsgaWQgKyBcIiBJRCBNQVRFUklBTFwiICsgaWR4KVxyXG4gICAgICAgIHRoaXMucGF0aWVudCA9IHRoaXMucGF0aWVudFNlcnZpY2UucGF0aWVudHMuZmlsdGVyKHBhdGllbnQgPT4gcGF0aWVudC5pZCA9PT0gaWQpWzBdO1xyXG4gICAgICAgIC8vIGNyaWFyIGxpc3RhIGRlIG1hdGVyaWFpcyBjb20gcHJvcHJpYWRhZGUgYWRpY2lvbmFsIG5lZWQgbmFtZSBhbmQgbmVlZCBkZXNjcmlwdGlvblxyXG4gICAgICAgIHRoaXMuYWRkUHJvcGVydHlOZWVkT25NYXRlcmlhbCgpO1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coXCJNQVRFUklBTE9GQUxMTkVFRFMgOiBcIiArIEpTT04uc3RyaW5naWZ5KHRoaXMubWF0ZXJpYWxzT2ZBbGxOZWVkcywgbnVsbCwgNCkpO1xyXG4gICAgICAgIHRoaXMubWF0ZXJpYWxQYXJlbnQgPSB0aGlzLm1hdGVyaWFsc09mQWxsTmVlZHMuZmlsdGVyKG1hdGVyaWFsID0+IG1hdGVyaWFsLmlkID09PSBpZHgpWzBdO1xyXG4gXHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLTogXCIpO1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coXCJNQVRFUklBTFBhcmVudCA6IFwiICsgSlNPTi5zdHJpbmdpZnkodGhpcy5tYXRlcmlhbFBhcmVudCwgbnVsbCwgNCkpO1xyXG4gICAgICAgIC8vdmVyaWZpY2FyIHNlIMOpIHVtIGNvbXBvc2l0ZVxyXG4gICAgICAgIGlmICh0aGlzLm1hdGVyaWFsUGFyZW50LnR5cGUgPT0gXCJjb21wb3NpdGVcIikgey8vbWF0ZXJpYWwgY29tcG9zdG8gLT4gY2FycmVnYXIgbyBhcnJheVxyXG4gICAgICAgICAgICB0aGlzLm1hdGVyaWFsc1RvRGlzcGxheSA9IHRoaXMubWF0ZXJpYWxQYXJlbnQubWF0ZXJpYWxzO1xyXG4gICAgICAgIH0gZWxzZSB7Ly9tYXRlcmlhbCBzaW1wbGVzIGJhc3RhIGNhcnJlZ2FyIHBhcmEgdmlzdGFcclxuICAgICAgICAgICAgdGhpcy5tYXRlcmlhbHNUb0Rpc3BsYXkgPSBbXTtcclxuICAgICAgICAgICAgdGhpcy5tYXRlcmlhbHNUb0Rpc3BsYXkucHVzaCh0aGlzLm1hdGVyaWFsUGFyZW50KTtcclxuIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5wYXRpZW50U2VydmljZS5yZWdpc3RlckFjZXNzZWRNYXRlcmlhbCh0aGlzLm1hdGVyaWFsUGFyZW50KTtcclxuXHJcbiAgICAgICAgLy92ZXJpZnkgaXMgZW1haWwgYXZhbGlhYmxlXHJcbiAgICAgICAgZW1haWwuYXZhaWxhYmxlKCkudGhlbihmdW5jdGlvbiAoYXZhaWwpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCIjIENPTVBPTkVOVEUgTUFURVJJQUwtREVUQUlMICMgRW1haWwgYXZhaWxhYmxlPyBcIiArIGF2YWlsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYXZhaWw7XHJcbiAgICAgICAgfSkudGhlbigoYXZhaWwpPT57XHJcbiAgICAgICAgICAgIHRoaXMuZW1haWxBdmFsaWFibGU9YXZhaWw7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAvL0V2YWx1YXRpb25zXHJcbiAgICAgICAgdGhpcy5oYXNFdmFsdWF0aW9uc1RvRG8gPSB0aGlzLnBhdGllbnRTZXJ2aWNlLmhhc0V2YWx1YXRpb25zVG9EbygpO1xyXG4gXHJcbiAgICB9XHJcbiAgICBzdG9wTG9hZGluZygpIHtcclxuICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlBBU1NPVSBBS0lcIilcclxuICAgIH1cclxuIFxyXG4gXHJcbiAgICAvKipcclxuICAgICAqIEZ1bmN0aW9uIHRvIGFkZCBwcm9wZXJ0aWVzIG9mIHRoZSBcInBhcmVudFwiIG5lZWQgdG8gdGhlIFwiY2hpbGRcIiBtYXRlcmlhbFxyXG4gICAgICpcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWF0ZXJpYWxEZXRhaWxDb21wb25lbnRcclxuICAgICAqL1xyXG4gICAgYWRkUHJvcGVydHlOZWVkT25NYXRlcmlhbCgpIHtcclxuICAgICAgICBsZXQgbWF0ZXJpYWxzX3RlbXA6IE1hdGVyaWFsW107XHJcbiAgICAgICAgbWF0ZXJpYWxzX3RlbXAgPSBbXTtcclxuIFxyXG4gICAgICAgIHRoaXMucGF0aWVudC5uZWVkcy5mb3JFYWNoKG5lZWQgPT4ge1xyXG4gICAgICAgICAgICBuZWVkLm1hdGVyaWFscy5mb3JFYWNoKG1hdGVyaWFsT2ZhTmVlZCA9PiB7XHJcbiAgICAgICAgICAgICAgICBtYXRlcmlhbE9mYU5lZWRbXCJuZWVkX2lkXCJdID0gbmVlZC5pZDtcclxuICAgICAgICAgICAgICAgIG1hdGVyaWFsT2ZhTmVlZFtcIm5lZWRfZGVzY3JpcHRpb25cIl0gPSBuZWVkLmRlc2NyaXB0aW9uO1xyXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIk1BVEVSSUFMIDogXCIgKyBKU09OLnN0cmluZ2lmeShtYXRlcmlhbE9mYU5lZWQsIG51bGwsIDQpKTtcclxuICAgICAgICAgICAgICAgIG1hdGVyaWFsc190ZW1wLnB1c2gobWF0ZXJpYWxPZmFOZWVkKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiBcclxuICAgICAgICB0aGlzLm1hdGVyaWFsc09mQWxsTmVlZHMgPSBtYXRlcmlhbHNfdGVtcDtcclxuICAgIH1cclxuIFxyXG4gXHJcbiBcclxuICAgIC8qKlxyXG4gICAgICogRnVuY3Rpb24gdG8gb3BlbiBleHRlcm5hbCBtYXRlcmlhbHMgW3BkZiAuLi5dXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHthbnl9IGlkXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hdGVyaWFsRGV0YWlsQ29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIG9wZW5PbkJyb3dzZXIoaWQpIHtcclxuICAgICAgICBsZXQgbWF0ZXJpYWwgPSB0aGlzLm1hdGVyaWFsc1RvRGlzcGxheS5maWx0ZXIobWF0ZXJpYWwgPT4gbWF0ZXJpYWwuaWQgPT09IGlkKVswXTtcclxuICAgICAgICBvcGVuVXJsKG1hdGVyaWFsLnVybCk7XHJcbiAgICB9XHJcbiBcclxuIFxyXG4gXHJcbiAgICAvKipcclxuICAgICAqIEZ1bmN0aW9uIHRvIHJhdGUgbWF0ZXJpYWwgW3JlZCx5ZWxsb3csZ3JlZW5dXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHthbnl9IGxldmVsXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hdGVyaWFsRGV0YWlsQ29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIGV2YWx1YXRlTWF0ZXJpYWwobGV2ZWwpIHtcclxuIFxyXG4gICAgICAgIGxldCByYXRpbmcgPSBuZXcgUmF0aW5nKCk7XHJcblxyXG4gICAgICAgIHJhdGluZy5ldmFsdWF0aW9uID0gbGV2ZWw7XHJcbiAgICAgICAgcmF0aW5nLmlkX21hdGVyaWFsID0gdGhpcy5tYXRlcmlhbFBhcmVudC5pZDtcclxuIFxyXG4gICAgICAgIHRoaXMucmF0aW5ncy5wdXNoKHJhdGluZyk7XHJcbiBcclxuICAgICAgICB0aGlzLmRhdGFTZXJ2aWNlLnNldFJhdGluZyhyYXRpbmcpO1xyXG4gICAgICAgIHRoaXMucGF0aWVudFNlcnZpY2Uuc2VuZFJhdGluZyhyYXRpbmcpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBcclxuICAgIGdldFJhdGluZ3MoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucmF0aW5ncztcclxuICAgIH1cclxuIFxyXG4gXHJcbiBcclxuICAgIC8qKlxyXG4gICAgICogZnVuY3Rpb24gdG8gbmF2aWdhdGUgdG8gdGhlIG1hdGVyaWFsIHF1ZXN0aW9ubmFpcmVcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge2FueX0gcmVmX3F1ZXN0aW9ubmFpcmVcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWF0ZXJpYWxEZXRhaWxDb21wb25lbnRcclxuICAgICAqL1xyXG4gICAgZmlsbFF1ZXN0aW9ubmFpcmUocmVmX3F1ZXN0aW9ubmFpcmUpIHtcclxuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9ldmFsdWF0aW9uJywgcmVmX3F1ZXN0aW9ubmFpcmVdKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGdW5jdGlvbiB0byBzZW5kIGVtYWlsIHRvIHByb2Zpc3Npb25hbCBzYXVkZVxyXG4gICAgICogXHJcbiAgICAgKiBcclxuICAgICAqIEBtZW1iZXJvZiBNYXRlcmlhbERldGFpbENvbXBvbmVudFxyXG4gICAgICovXHJcbiAgICBzZW5kTWFpbFRvKCkge1xyXG4gICAgICAgIGVtYWlsLmNvbXBvc2Uoe1xyXG4gICAgICAgICAgICBzdWJqZWN0OiBcIlBlZGlkbyBkZSBlc2NsYXJlY2ltZW50byBkbyBjdWlkYWRvciBcIiArIHRoaXMuYXBwX3VzZXIubmFtZSArIFwiIGNvbSBvIGlkOiBcIiArIHRoaXMuYXBwX3VzZXIuaWQsXHJcbiAgICAgICAgICAgIGJvZHk6IFwiQm9tIGRpYSw8cD5cIlxyXG4gICAgICAgICAgICArXCJOZWNlc3NpdG8gZXNjbGFyZWNpbWVudG8gc29icmUgbyBzZWd1aW50ZSBtYXRlcmlhbDpcIiBcclxuICAgICAgICAgICAgKyBcIjxwPklkIE1hdGVyaWFsOiBcIiArIHRoaXMubWF0ZXJpYWxQYXJlbnQuaWRcclxuICAgICAgICAgICAgKyBcIjxwPk5vbWUgTWF0ZXJpYWw6IFwiICsgdGhpcy5tYXRlcmlhbFBhcmVudC5uYW1lXHJcbiAgICAgICAgICAgICsgXCI8cD5EZXNjcmnDp8OjbyBNYXRlcmlhbDogXCIgKyB0aGlzLm1hdGVyaWFsUGFyZW50LmRlc2NyaXB0aW9uXHJcbiAgICAgICAgICAgICsgXCI8cD5JZCBDdWlkYWRvcjogXCIgKyB0aGlzLmFwcF91c2VyLmlkXHJcbiAgICAgICAgICAgICsgXCI8cD5Ob21lIEN1aWRhZG9yOiBcIiArIHRoaXMuYXBwX3VzZXIubmFtZVxyXG4gICAgICAgICAgICAsICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRvOiBbdGhpcy5lbWFpbFByb2Zpc3Npb25hbFNhdWRlXSxcclxuICAgICAgICAgICAgY2M6IFsnJ10sXHJcbiAgICAgICAgICAgIGJjYzogWycnLCAnJ10sXHJcbiAgICAgICAgICAgIGF0dGFjaG1lbnRzOiBbXHJcbiAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBhcHBQaWNrZXJUaXRsZTogJ0NvbXBvc2Ugd2l0aCBhcHAgY2FyZWdpdmVyJyAvLyBmb3IgQW5kcm9pZCwgZGVmYXVsdDogJ09wZW4gd2l0aC4uJ1xyXG4gICAgICAgIH0pLnRoZW4oXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRW1haWwgY29tcG9zZXIgY2xvc2VkXCIpO1xyXG4gICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yOiBcIiArIGVycik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=