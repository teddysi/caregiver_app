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
        rating.id = Date.now();
        rating.evaluation = level;
        rating.id_material = this.materialParent.id;
        this.ratings.push(rating);
        this.dataService.setRating(rating);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0ZXJpYWwtZGV0YWlsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1hdGVyaWFsLWRldGFpbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHNDQUFrRDtBQUNsRCwwQ0FBaUQ7QUFHakQsOERBQTREO0FBQzVELDREQUEwRDtBQUUxRCxtQ0FBa0M7QUFRbEMsMENBQXlDO0FBSXpDLHFDQUFzQztBQUV0QywyRUFBeUU7QUFFekUsaUNBQStCO0FBRS9CLDBDQUE0QztBQUc1Qyw0REFBMEQ7QUFPMUQsSUFBYSx1QkFBdUI7SUFlaEMsdUNBQXVDO0lBQ3ZDLHVEQUF1RDtJQUV2RCxpQ0FDWSxjQUE4QixFQUM5QixLQUFxQixFQUNyQixNQUFjLEVBQ2QsV0FBd0IsRUFDeEIsZ0JBQWtDLEVBQ2xDLFdBQXdCO1FBTHhCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUNyQixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2QsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNsQyxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUVoQyxJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBR0QsMENBQVEsR0FBUjtRQUFBLGlCQWdEQztRQS9DRyxPQUFPLENBQUMsR0FBRyxDQUFDLDhCQUE4QixDQUFDLENBQUE7UUFDM0MsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDcEIsSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7UUFDNUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQzNDLDhCQUE4QjtRQUM5QixJQUFJLENBQUMsc0JBQXNCLEdBQUcsdUNBQXVDLENBQUM7UUFFdEUsSUFBTSxFQUFFLEdBQUcsQ0FBQyxJQUFJLENB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QXhCM0IsdUJBQXVCLENBbU1uQztBQW5NWSwwREFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xyXG4gXHJcbmltcG9ydCB7IFBhdGllbnQgfSBmcm9tIFwiLi4vcGF0aWVudC9wYXRpZW50XCI7XHJcbmltcG9ydCB7IFBhdGllbnRTZXJ2aWNlIH0gZnJvbSBcIi4uL3BhdGllbnQvcGF0aWVudC5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IERhdGFTZXJ2aWNlIH0gZnJvbSBcIi4uL3NoYXJlZC9kYXRhL2RhdGEuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBNYXRlcmlhbCB9IGZyb20gXCIuL21hdGVyaWFsXCI7XHJcbmltcG9ydCB7IFJhdGluZyB9IGZyb20gXCIuL3JhdGluZ1wiO1xyXG5pbXBvcnQgeyBOZWVkIH0gZnJvbSBcIi4uL25lZWQvbmVlZFwiO1xyXG4gXHJcbmltcG9ydCBhcHAgPSByZXF1aXJlKFwiYXBwbGljYXRpb25cIik7XHJcbmltcG9ydCBwbGF0Zm9ybSA9IHJlcXVpcmUoXCJwbGF0Zm9ybVwiKTtcclxuIFxyXG5pbXBvcnQgYnV0dG9uTW9kdWxlID0gcmVxdWlyZShcInVpL2J1dHRvblwiKTtcclxuIFxyXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XHJcbiBcclxuIFxyXG5pbXBvcnQgeyBvcGVuQXBwIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1vcGVuLWFwcFwiO1xyXG5pbXBvcnQgeyBvcGVuVXJsIH0gZnJvbSBcInV0aWxzL3V0aWxzXCI7XHJcbiBcclxuaW1wb3J0IHsgQ29ubmVjdG9yU2VydmljZSB9IGZyb20gXCIuLi9zaGFyZWQvY29ubmVjdG9yL2Nvbm5lY3Rvci5zZXJ2aWNlXCI7XHJcbiBcclxuaW1wb3J0ICduYXRpdmVzY3JpcHQtcGRmLXZpZXcnO1xyXG4gXHJcbmltcG9ydCAqIGFzIGVtYWlsIGZyb20gXCJuYXRpdmVzY3JpcHQtZW1haWxcIjtcclxuIFxyXG5pbXBvcnQgeyBVc2VyIH0gZnJvbSBcIi4uL3NoYXJlZC91c2VyL3VzZXJcIjtcclxuaW1wb3J0IHsgVXNlclNlcnZpY2UgfSBmcm9tIFwiLi4vc2hhcmVkL3VzZXIvdXNlci5zZXJ2aWNlXCI7XHJcbiBcclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogXCJtYXRlcmlhbC1kZXRhaWxzXCIsXHJcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9tYXRlcmlhbC1kZXRhaWwuY29tcG9uZW50Lmh0bWxcIixcclxufSlcclxuZXhwb3J0IGNsYXNzIE1hdGVyaWFsRGV0YWlsQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICAgIHBhdGllbnQ6IFBhdGllbnQ7XHJcbiAgICBuZWVkOiBOZWVkO1xyXG4gICAgbWF0ZXJpYWxzT2ZBbGxOZWVkczogTWF0ZXJpYWxbXTtcclxuICAgIG1hdGVyaWFsUGFyZW50OiBNYXRlcmlhbDtcclxuICAgIG1hdGVyaWFsc1RvRGlzcGxheTogTWF0ZXJpYWxbXTtcclxuIFxyXG4gICAgaGFzRXZhbHVhdGlvbnNUb0RvOiBib29sZWFuO1xyXG4gICAgbG9hZGluZzogYm9vbGVhbjtcclxuIFxyXG4gICAgZW1haWxBdmFsaWFibGU6IGJvb2xlYW47XHJcbiAgICBhcHBfdXNlcjogVXNlcjtcclxuICAgIGVtYWlsUHJvZmlzc2lvbmFsU2F1ZGU6c3RyaW5nO1xyXG4gXHJcbiAgICByYXRpbmdzOiBSYXRpbmdbXTtcclxuICAgIC8vcmF0aW5ncy5wdXNoKG5ldyBSYXRpbmcoXCIxXCIsIFwiTWF1XCIpKTtcclxuICAgIC8vIHJhdGluZ3MgPSBbUmF0aW5nKFwiMVwiLCBcIk1hdVwiKSwgUmF0aW5nKFwiMlwiLCBcIk1lZGlvXCIpXVxyXG4gXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIHBhdGllbnRTZXJ2aWNlOiBQYXRpZW50U2VydmljZSxcclxuICAgICAgICBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcclxuICAgICAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyLFxyXG4gICAgICAgIHByaXZhdGUgZGF0YVNlcnZpY2U6IERhdGFTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgY29ubmVjdG9yU2VydmljZTogQ29ubmVjdG9yU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIHVzZXJTZXJ2aWNlOiBVc2VyU2VydmljZVxyXG4gICAgKSB7XHJcbiAgICAgICAgdGhpcy5yYXRpbmdzID0gW107XHJcbiAgICB9XHJcbiBcclxuIFxyXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCIjIENPTVBPTkVOVEUgTUFURVJJQUwtREVUQUlMXCIpXHJcbiAgICAgICAgdGhpcy5sb2FkaW5nID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmVtYWlsQXZhbGlhYmxlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5hcHBfdXNlciA9IHRoaXMudXNlclNlcnZpY2UuZ2V0VXNlcigpO1xyXG4gICAgICAgIC8vU2V0IGVtYWlsIHByb2Zpc3Npb25hbCBzYXVkZVxyXG4gICAgICAgIHRoaXMuZW1haWxQcm9maXNzaW9uYWxTYXVkZSA9ICdzdXBwb3J0LmNhcmVnaXZlcnNAZW1haWxhcmVnaXN0YXIuY29tJztcclxuICAgICBcclxuICAgICAgICBjb25zdCBpZCA9ICt0aGlzLnJvdXRlLnNuYXBzaG90LnBhcmFtc1tcImlkXCJdO1xyXG4gICAgICAgIGNvbnN0IGlkeCA9ICt0aGlzLnJvdXRlLnNuYXBzaG90LnBhcmFtc1tcImlkX21hdGVyaWFsXCJdO1xyXG4gXHJcbiAgICAgICAgLy9yZXR1cm4gdG8gcGF0aWVudHMgTGlzdCBpZiBkbyBub3QgaGF2ZSBjb25uZWN0aW9uXHJcbiAgICAgICAgaWYgKCF0aGlzLmNvbm5lY3RvclNlcnZpY2UuaXNDb25uZWN0ZWQoKSkge1xyXG4gICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9wYXRpZW50cyddKTtcclxuICAgICAgICB9XHJcbiBcclxuIFxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiSUQgUEFDSUVOVEUgXCIgKyBpZCArIFwiIElEIE1BVEVSSUFMXCIgKyBpZHgpXHJcbiAgICAgICAgdGhpcy5wYXRpZW50ID0gdGhpcy5wYXRpZW50U2VydmljZS5wYXRpZW50cy5maWx0ZXIocGF0aWVudCA9PiBwYXRpZW50LmlkID09PSBpZClbMF07XHJcbiAgICAgICAgLy8gY3JpYXIgbGlzdGEgZGUgbWF0ZXJpYWlzIGNvbSBwcm9wcmlhZGFkZSBhZGljaW9uYWwgbmVlZCBuYW1lIGFuZCBuZWVkIGRlc2NyaXB0aW9uXHJcbiAgICAgICAgdGhpcy5hZGRQcm9wZXJ0eU5lZWRPbk1hdGVyaWFsKCk7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIk1BVEVSSUFMT0ZBTExORUVEUyA6IFwiICsgSlNPTi5zdHJpbmdpZnkodGhpcy5tYXRlcmlhbHNPZkFsbE5lZWRzLCBudWxsLCA0KSk7XHJcbiAgICAgICAgdGhpcy5tYXRlcmlhbFBhcmVudCA9IHRoaXMubWF0ZXJpYWxzT2ZBbGxOZWVkcy5maWx0ZXIobWF0ZXJpYWwgPT4gbWF0ZXJpYWwuaWQgPT09IGlkeClbMF07XHJcbiBcclxuICAgICAgICAvL2NvbnNvbGUubG9nKFwiLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tOiBcIik7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIk1BVEVSSUFMUGFyZW50IDogXCIgKyBKU09OLnN0cmluZ2lmeSh0aGlzLm1hdGVyaWFsUGFyZW50LCBudWxsLCA0KSk7XHJcbiAgICAgICAgLy92ZXJpZmljYXIgc2Ugw6kgdW0gY29tcG9zaXRlXHJcbiAgICAgICAgaWYgKHRoaXMubWF0ZXJpYWxQYXJlbnQudHlwZSA9PSBcImNvbXBvc2l0ZVwiKSB7Ly9tYXRlcmlhbCBjb21wb3N0byAtPiBjYXJyZWdhciBvIGFycmF5XHJcbiAgICAgICAgICAgIHRoaXMubWF0ZXJpYWxzVG9EaXNwbGF5ID0gdGhpcy5tYXRlcmlhbFBhcmVudC5tYXRlcmlhbHM7XHJcbiAgICAgICAgfSBlbHNlIHsvL21hdGVyaWFsIHNpbXBsZXMgYmFzdGEgY2FycmVnYXIgcGFyYSB2aXN0YVxyXG4gICAgICAgICAgICB0aGlzLm1hdGVyaWFsc1RvRGlzcGxheSA9IFtdO1xyXG4gICAgICAgICAgICB0aGlzLm1hdGVyaWFsc1RvRGlzcGxheS5wdXNoKHRoaXMubWF0ZXJpYWxQYXJlbnQpO1xyXG4gXHJcbiAgICAgICAgfVxyXG4gXHJcbiAgICAgICBcclxuIFxyXG4gICAgICAgIC8vdmVyaWZ5IGlzIGVtYWlsIGF2YWxpYWJsZVxyXG4gICAgICAgIGVtYWlsLmF2YWlsYWJsZSgpLnRoZW4oZnVuY3Rpb24gKGF2YWlsKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiIyBDT01QT05FTlRFIE1BVEVSSUFMLURFVEFJTCAjIEVtYWlsIGF2YWlsYWJsZT8gXCIgKyBhdmFpbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGF2YWlsO1xyXG4gICAgICAgIH0pLnRoZW4oKGF2YWlsKT0+e1xyXG4gICAgICAgICAgICB0aGlzLmVtYWlsQXZhbGlhYmxlPWF2YWlsO1xyXG4gICAgICAgIH0pXHJcbiBcclxuICAgICAgICAvL0V2YWx1YXRpb25zXHJcbiAgICAgICAgdGhpcy5oYXNFdmFsdWF0aW9uc1RvRG8gPSB0aGlzLnBhdGllbnRTZXJ2aWNlLmhhc0V2YWx1YXRpb25zVG9EbygpO1xyXG4gXHJcbiAgICB9XHJcbiBcclxuICAgIHN0b3BMb2FkaW5nKCkge1xyXG4gICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiUEFTU09VIEFLSVwiKVxyXG4gICAgfVxyXG4gXHJcbiBcclxuICAgIC8qKlxyXG4gICAgICogRnVuY3Rpb24gdG8gYWRkIHByb3BlcnRpZXMgb2YgdGhlIFwicGFyZW50XCIgbmVlZCB0byB0aGUgXCJjaGlsZFwiIG1hdGVyaWFsXHJcbiAgICAgKlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXRlcmlhbERldGFpbENvbXBvbmVudFxyXG4gICAgICovXHJcbiAgICBhZGRQcm9wZXJ0eU5lZWRPbk1hdGVyaWFsKCkge1xyXG4gICAgICAgIGxldCBtYXRlcmlhbHNfdGVtcDogTWF0ZXJpYWxbXTtcclxuICAgICAgICBtYXRlcmlhbHNfdGVtcCA9IFtdO1xyXG4gXHJcbiAgICAgICAgdGhpcy5wYXRpZW50Lm5lZWRzLmZvckVhY2gobmVlZCA9PiB7XHJcbiAgICAgICAgICAgIG5lZWQubWF0ZXJpYWxzLmZvckVhY2gobWF0ZXJpYWxPZmFOZWVkID0+IHtcclxuICAgICAgICAgICAgICAgIG1hdGVyaWFsT2ZhTmVlZFtcIm5lZWRfaWRcIl0gPSBuZWVkLmlkO1xyXG4gICAgICAgICAgICAgICAgbWF0ZXJpYWxPZmFOZWVkW1wibmVlZF9kZXNjcmlwdGlvblwiXSA9IG5lZWQuZGVzY3JpcHRpb247XHJcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiTUFURVJJQUwgOiBcIiArIEpTT04uc3RyaW5naWZ5KG1hdGVyaWFsT2ZhTmVlZCwgbnVsbCwgNCkpO1xyXG4gICAgICAgICAgICAgICAgbWF0ZXJpYWxzX3RlbXAucHVzaChtYXRlcmlhbE9mYU5lZWQpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuIFxyXG4gICAgICAgIHRoaXMubWF0ZXJpYWxzT2ZBbGxOZWVkcyA9IG1hdGVyaWFsc190ZW1wO1xyXG4gICAgfVxyXG4gXHJcbiBcclxuIFxyXG4gICAgLyoqXHJcbiAgICAgKiBGdW5jdGlvbiB0byBvcGVuIGV4dGVybmFsIG1hdGVyaWFscyBbcGRmIC4uLl1cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge2FueX0gaWRcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWF0ZXJpYWxEZXRhaWxDb21wb25lbnRcclxuICAgICAqL1xyXG4gICAgb3Blbk9uQnJvd3NlcihpZCkge1xyXG4gICAgICAgIGxldCBtYXRlcmlhbCA9IHRoaXMubWF0ZXJpYWxzVG9EaXNwbGF5LmZpbHRlcihtYXRlcmlhbCA9PiBtYXRlcmlhbC5pZCA9PT0gaWQpWzBdO1xyXG4gICAgICAgIG9wZW5VcmwobWF0ZXJpYWwudXJsKTtcclxuICAgIH1cclxuIFxyXG4gXHJcbiBcclxuICAgIC8qKlxyXG4gICAgICogRnVuY3Rpb24gdG8gcmF0ZSBtYXRlcmlhbCBbcmVkLHllbGxvdyxncmVlbl1cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge2FueX0gbGV2ZWxcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWF0ZXJpYWxEZXRhaWxDb21wb25lbnRcclxuICAgICAqL1xyXG4gICAgZXZhbHVhdGVNYXRlcmlhbChsZXZlbCkge1xyXG4gXHJcbiAgICAgICAgbGV0IHJhdGluZyA9IG5ldyBSYXRpbmcoKTtcclxuICAgICAgICByYXRpbmcuaWQgPSBEYXRlLm5vdygpO1xyXG4gICAgICAgIHJhdGluZy5ldmFsdWF0aW9uID0gbGV2ZWw7XHJcbiAgICAgICAgcmF0aW5nLmlkX21hdGVyaWFsID0gdGhpcy5tYXRlcmlhbFBhcmVudC5pZDtcclxuIFxyXG4gICAgICAgIHRoaXMucmF0aW5ncy5wdXNoKHJhdGluZyk7XHJcbiBcclxuICAgICAgICB0aGlzLmRhdGFTZXJ2aWNlLnNldFJhdGluZyhyYXRpbmcpO1xyXG4gXHJcbiAgICB9XHJcbiBcclxuICAgXHJcbiAgICBnZXRSYXRpbmdzKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJhdGluZ3M7XHJcbiAgICB9XHJcbiBcclxuIFxyXG4gXHJcbiAgICAvKipcclxuICAgICAqIGZ1bmN0aW9uIHRvIG5hdmlnYXRlIHRvIHRoZSBtYXRlcmlhbCBxdWVzdGlvbm5haXJlXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHthbnl9IHJlZl9xdWVzdGlvbm5haXJlXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hdGVyaWFsRGV0YWlsQ29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIGZpbGxRdWVzdGlvbm5haXJlKHJlZl9xdWVzdGlvbm5haXJlKSB7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvZXZhbHVhdGlvbicsIHJlZl9xdWVzdGlvbm5haXJlXSk7XHJcbiAgICB9XHJcbiBcclxuIFxyXG4gICAgLyoqXHJcbiAgICAgKiBGdW5jdGlvbiB0byBzZW5kIGVtYWlsIHRvIHByb2Zpc3Npb25hbCBzYXVkZVxyXG4gICAgICpcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWF0ZXJpYWxEZXRhaWxDb21wb25lbnRcclxuICAgICAqL1xyXG4gICAgc2VuZE1haWxUbygpIHtcclxuICAgICAgICBlbWFpbC5jb21wb3NlKHtcclxuICAgICAgICAgICAgc3ViamVjdDogXCJQZWRpZG8gZGUgZXNjbGFyZWNpbWVudG8gZG8gY3VpZGFkb3IgXCIgKyB0aGlzLmFwcF91c2VyLm5hbWUgKyBcIiBjb20gbyBpZDogXCIgKyB0aGlzLmFwcF91c2VyLmlkLFxyXG4gICAgICAgICAgICBib2R5OiBcIkJvbSBkaWEsPHA+XCJcclxuICAgICAgICAgICAgK1wiTmVjZXNzaXRvIGVzY2xhcmVjaW1lbnRvIHNvYnJlIG8gc2VndWludGUgbWF0ZXJpYWw6XCJcclxuICAgICAgICAgICAgKyBcIjxwPklkIE1hdGVyaWFsOiBcIiArIHRoaXMubWF0ZXJpYWxQYXJlbnQuaWRcclxuICAgICAgICAgICAgKyBcIjxwPk5vbWUgTWF0ZXJpYWw6IFwiICsgdGhpcy5tYXRlcmlhbFBhcmVudC5uYW1lXHJcbiAgICAgICAgICAgICsgXCI8cD5EZXNjcmnDp8OjbyBNYXRlcmlhbDogXCIgKyB0aGlzLm1hdGVyaWFsUGFyZW50LmRlc2NyaXB0aW9uXHJcbiAgICAgICAgICAgICsgXCI8cD5JZCBDdWlkYWRvcjogXCIgKyB0aGlzLmFwcF91c2VyLmlkXHJcbiAgICAgICAgICAgICsgXCI8cD5Ob21lIEN1aWRhZG9yOiBcIiArIHRoaXMuYXBwX3VzZXIubmFtZVxyXG4gXHJcbiAgICAgICAgICAgICwgICAgICAgICAgICBcclxuICAgICAgICAgICAgdG86IFt0aGlzLmVtYWlsUHJvZmlzc2lvbmFsU2F1ZGVdLFxyXG4gICAgICAgICAgICBjYzogWycnXSxcclxuICAgICAgICAgICAgYmNjOiBbJycsICcnXSxcclxuICAgICAgICAgICAgYXR0YWNobWVudHM6IFtcclxuICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIGFwcFBpY2tlclRpdGxlOiAnQ29tcG9zZSB3aXRoIGFwcCBjYXJlZ2l2ZXInIC8vIGZvciBBbmRyb2lkLCBkZWZhdWx0OiAnT3BlbiB3aXRoLi4nXHJcbiAgICAgICAgfSkudGhlbihcclxuICAgICAgICAgICAgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFbWFpbCBjb21wb3NlciBjbG9zZWRcIik7XHJcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3I6IFwiICsgZXJyKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcbiBcclxufSJdfQ==