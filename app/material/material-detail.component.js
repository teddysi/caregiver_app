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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0ZXJpYWwtZGV0YWlsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1hdGVyaWFsLWRldGFpbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHNDQUFrRDtBQUNsRCwwQ0FBaUQ7QUFHakQsOERBQTREO0FBQzVELDREQUEwRDtBQUUxRCxtQ0FBa0M7QUFHbEMsaUNBQW9DO0FBS3BDLDBDQUF5QztBQUl6QyxxQ0FBc0M7QUFFdEMsMkVBQXlFO0FBRXpFLGlDQUErQjtBQUUvQiwwQ0FBNEM7QUFHNUMsNERBQTBEO0FBTzFELElBQWEsdUJBQXVCO0lBZWhDLHVDQUF1QztJQUN2Qyx1REFBdUQ7SUFFdkQsaUNBQ1ksY0FBOEIsRUFDOUIsS0FBcUIsRUFDckIsTUFBYyxFQUNkLFdBQXdCLEVBQ3hCLGdCQUFrQyxFQUNsQyxXQUF3QjtRQUx4QixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUFDckIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNkLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3hCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFFaEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQUdELDBDQUFRLEdBQVI7UUFBQSxpQkErQ0M7UUE5Q0csT0FBTyxDQUFDLEdBQUcsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFBO1FBQzNDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDO1FBQzVCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUMzQyw4QkFBOEI7UUFDOUIsSUFBSSxDQUFDLHNCQUFzQixHQUFHLHVDQUF1QyxDQUFDO1FBRXRFLElBQU0sRUFBRSxHQUFH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QUFTLENBQUMsQ0FBQztRQUNwRixDQUFDO0lBQ0wsQ0FBQztJQUVELDZDQUFXLEdBQVg7UUFDSSxvQ0FBb0M7UUFDcEMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDZCxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsd0JBQXdCLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3JGLENBQUM7SUFDTCxDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNILDJDQUFTLEdBQVQsVUFBVSxJQUFJO1FBQ1YsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDbkIsTUFBTSxDQUFDO0lBRVgsQ0FBQztJQUVMLDhCQUFDO0FBQUQsQ0FBQyxBQTVORCxJQTROQztBQTVOWSx1QkFBdUI7SUFMbkMsZ0JBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxrQkFBa0I7UUFDNUIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1FBQ25CLFdBQVcsRUFBRSxrQ0FBa0M7S0FDbEQsQ0FBQztxQ0FvQjhCLGdDQUFjO1FBQ3ZCLHVCQUFjO1FBQ2IsZUFBTTtRQUNELDBCQUFXO1FBQ04sb0NBQWdCO1FBQ3JCLDBCQUFXO0dBeEIzQix1QkFBdUIsQ0E0Tm5DO0FBNU5ZLDBEQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XHJcblxyXG5pbXBvcnQgeyBQYXRpZW50IH0gZnJvbSBcIi4uL3BhdGllbnQvcGF0aWVudFwiO1xyXG5pbXBvcnQgeyBQYXRpZW50U2VydmljZSB9IGZyb20gXCIuLi9wYXRpZW50L3BhdGllbnQuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBEYXRhU2VydmljZSB9IGZyb20gXCIuLi9zaGFyZWQvZGF0YS9kYXRhLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgTWF0ZXJpYWwgfSBmcm9tIFwiLi9tYXRlcmlhbFwiO1xyXG5pbXBvcnQgeyBSYXRpbmcgfSBmcm9tIFwiLi9yYXRpbmdcIjtcclxuaW1wb3J0IHsgTmVlZCB9IGZyb20gXCIuLi9uZWVkL25lZWRcIjtcclxuXHJcbmltcG9ydCBhcHAgPSByZXF1aXJlKFwiYXBwbGljYXRpb25cIik7XHJcbmltcG9ydCBwbGF0Zm9ybSA9IHJlcXVpcmUoXCJwbGF0Zm9ybVwiKTtcclxuXHJcbmltcG9ydCBidXR0b25Nb2R1bGUgPSByZXF1aXJlKFwidWkvYnV0dG9uXCIpO1xyXG5cclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xyXG5cclxuXHJcbmltcG9ydCB7IG9wZW5BcHAgfSBmcm9tIFwibmF0aXZlc2NyaXB0LW9wZW4tYXBwXCI7XHJcbmltcG9ydCB7IG9wZW5VcmwgfSBmcm9tIFwidXRpbHMvdXRpbHNcIjtcclxuXHJcbmltcG9ydCB7IENvbm5lY3RvclNlcnZpY2UgfSBmcm9tIFwiLi4vc2hhcmVkL2Nvbm5lY3Rvci9jb25uZWN0b3Iuc2VydmljZVwiO1xyXG5cclxuaW1wb3J0ICduYXRpdmVzY3JpcHQtcGRmLXZpZXcnO1xyXG5cclxuaW1wb3J0ICogYXMgZW1haWwgZnJvbSBcIm5hdGl2ZXNjcmlwdC1lbWFpbFwiO1xyXG5cclxuaW1wb3J0IHsgVXNlciB9IGZyb20gXCIuLi9zaGFyZWQvdXNlci91c2VyXCI7XHJcbmltcG9ydCB7IFVzZXJTZXJ2aWNlIH0gZnJvbSBcIi4uL3NoYXJlZC91c2VyL3VzZXIuc2VydmljZVwiO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogXCJtYXRlcmlhbC1kZXRhaWxzXCIsXHJcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9tYXRlcmlhbC1kZXRhaWwuY29tcG9uZW50Lmh0bWxcIixcclxufSlcclxuZXhwb3J0IGNsYXNzIE1hdGVyaWFsRGV0YWlsQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICAgIHBhdGllbnQ6IFBhdGllbnQ7XHJcbiAgICBuZWVkOiBOZWVkO1xyXG4gICAgbWF0ZXJpYWxzT2ZBbGxOZWVkczogTWF0ZXJpYWxbXTtcclxuICAgIG1hdGVyaWFsUGFyZW50OiBNYXRlcmlhbDtcclxuICAgIG1hdGVyaWFsc1RvRGlzcGxheTogTWF0ZXJpYWxbXTtcclxuXHJcbiAgICBoYXNFdmFsdWF0aW9uc1RvRG86IGJvb2xlYW47XHJcbiAgICBsb2FkaW5nOiBib29sZWFuO1xyXG5cclxuICAgIGVtYWlsQXZhbGlhYmxlOiBib29sZWFuO1xyXG4gICAgYXBwX3VzZXI6IFVzZXI7XHJcbiAgICBlbWFpbFByb2Zpc3Npb25hbFNhdWRlOiBzdHJpbmc7XHJcblxyXG4gICAgcmF0aW5nczogUmF0aW5nW107XHJcbiAgICAvL3JhdGluZ3MucHVzaChuZXcgUmF0aW5nKFwiMVwiLCBcIk1hdVwiKSk7XHJcbiAgICAvLyByYXRpbmdzID0gW1JhdGluZyhcIjFcIiwgXCJNYXVcIiksIFJhdGluZyhcIjJcIiwgXCJNZWRpb1wiKV1cclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIHBhdGllbnRTZXJ2aWNlOiBQYXRpZW50U2VydmljZSxcclxuICAgICAgICBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcclxuICAgICAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyLFxyXG4gICAgICAgIHByaXZhdGUgZGF0YVNlcnZpY2U6IERhdGFTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgY29ubmVjdG9yU2VydmljZTogQ29ubmVjdG9yU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIHVzZXJTZXJ2aWNlOiBVc2VyU2VydmljZVxyXG4gICAgKSB7XHJcbiAgICAgICAgdGhpcy5yYXRpbmdzID0gW107XHJcbiAgICB9XHJcblxyXG5cclxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiIyBDT01QT05FTlRFIE1BVEVSSUFMLURFVEFJTFwiKVxyXG4gICAgICAgIHRoaXMubG9hZGluZyA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5lbWFpbEF2YWxpYWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuYXBwX3VzZXIgPSB0aGlzLnVzZXJTZXJ2aWNlLmdldFVzZXIoKTtcclxuICAgICAgICAvL1NldCBlbWFpbCBwcm9maXNzaW9uYWwgc2F1ZGVcclxuICAgICAgICB0aGlzLmVtYWlsUHJvZmlzc2lvbmFsU2F1ZGUgPSAnc3VwcG9ydC5jYXJlZ2l2ZXJzQGVtYWlsYXJlZ2lzdGFyLmNvbSc7XHJcblxyXG4gICAgICAgIGNvbnN0IGlkID0gK3RoaXMucm91dGUuc25hcHNob3QucGFyYW1zW1wiaWRcIl07XHJcbiAgICAgICAgY29uc3QgaWR4ID0gK3RoaXMucm91dGUuc25hcHNob3QucGFyYW1zW1wiaWRfbWF0ZXJpYWxcIl07XHJcblxyXG4gICAgICAgIC8vcmV0dXJuIHRvIHBhdGllbnRzIExpc3QgaWYgZG8gbm90IGhhdmUgY29ubmVjdGlvblxyXG4gICAgICAgIGlmICghdGhpcy5jb25uZWN0b3JTZXJ2aWNlLmlzQ29ubmVjdGVkKCkpIHtcclxuICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvcGF0aWVudHMnXSk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJJRCBQQUNJRU5URSBcIiArIGlkICsgXCIgSUQgTUFURVJJQUxcIiArIGlkeClcclxuICAgICAgICB0aGlzLnBhdGllbnQgPSB0aGlzLnBhdGllbnRTZXJ2aWNlLnBhdGllbnRzLmZpbHRlcihwYXRpZW50ID0+IHBhdGllbnQuaWQgPT09IGlkKVswXTtcclxuICAgICAgICAvLyBjcmlhciBsaXN0YSBkZSBtYXRlcmlhaXMgY29tIHByb3ByaWFkYWRlIGFkaWNpb25hbCBuZWVkIG5hbWUgYW5kIG5lZWQgZGVzY3JpcHRpb25cclxuICAgICAgICB0aGlzLmFkZFByb3BlcnR5TmVlZE9uTWF0ZXJpYWwoKTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKFwiTUFURVJJQUxPRkFMTE5FRURTIDogXCIgKyBKU09OLnN0cmluZ2lmeSh0aGlzLm1hdGVyaWFsc09mQWxsTmVlZHMsIG51bGwsIDQpKTtcclxuICAgICAgICB0aGlzLm1hdGVyaWFsUGFyZW50ID0gdGhpcy5tYXRlcmlhbHNPZkFsbE5lZWRzLmZpbHRlcihtYXRlcmlhbCA9PiBtYXRlcmlhbC5pZCA9PT0gaWR4KVswXTtcclxuXHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLTogXCIpO1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coXCJNQVRFUklBTFBhcmVudCA6IFwiICsgSlNPTi5zdHJpbmdpZnkodGhpcy5tYXRlcmlhbFBhcmVudCwgbnVsbCwgNCkpO1xyXG4gICAgICAgIC8vdmVyaWZpY2FyIHNlIMOpIHVtIGNvbXBvc2l0ZVxyXG4gICAgICAgIGlmICh0aGlzLm1hdGVyaWFsUGFyZW50LnR5cGUgPT0gXCJjb21wb3NpdGVcIikgey8vbWF0ZXJpYWwgY29tcG9zdG8gLT4gY2FycmVnYXIgbyBhcnJheVxyXG4gICAgICAgICAgICB0aGlzLm1hdGVyaWFsc1RvRGlzcGxheSA9IHRoaXMubWF0ZXJpYWxQYXJlbnQubWF0ZXJpYWxzO1xyXG4gICAgICAgIH0gZWxzZSB7Ly9tYXRlcmlhbCBzaW1wbGVzIGJhc3RhIGNhcnJlZ2FyIHBhcmEgdmlzdGFcclxuICAgICAgICAgICAgdGhpcy5tYXRlcmlhbHNUb0Rpc3BsYXkgPSBbXTtcclxuICAgICAgICAgICAgdGhpcy5tYXRlcmlhbHNUb0Rpc3BsYXkucHVzaCh0aGlzLm1hdGVyaWFsUGFyZW50KTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnBhdGllbnRTZXJ2aWNlLnJlZ2lzdGVyQWNlc3NlZE1hdGVyaWFsKHRoaXMubWF0ZXJpYWxQYXJlbnQpO1xyXG5cclxuICAgICAgICAvL3ZlcmlmeSBpcyBlbWFpbCBhdmFsaWFibGVcclxuICAgICAgICBlbWFpbC5hdmFpbGFibGUoKS50aGVuKGZ1bmN0aW9uIChhdmFpbCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIiMgQ09NUE9ORU5URSBNQVRFUklBTC1ERVRBSUwgIyBFbWFpbCBhdmFpbGFibGU/IFwiICsgYXZhaWwpO1xyXG4gICAgICAgICAgICByZXR1cm4gYXZhaWw7XHJcbiAgICAgICAgfSkudGhlbigoYXZhaWwpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5lbWFpbEF2YWxpYWJsZSA9IGF2YWlsO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLy9FdmFsdWF0aW9uc1xyXG4gICAgICAgIHRoaXMuaGFzRXZhbHVhdGlvbnNUb0RvID0gdGhpcy5wYXRpZW50U2VydmljZS5oYXNFdmFsdWF0aW9uc1RvRG8oKTtcclxuXHJcbiAgICB9XHJcbiAgICBzdG9wTG9hZGluZygpIHtcclxuICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlBBU1NPVSBBS0lcIilcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGdW5jdGlvbiB0byBhZGQgcHJvcGVydGllcyBvZiB0aGUgXCJwYXJlbnRcIiBuZWVkIHRvIHRoZSBcImNoaWxkXCIgbWF0ZXJpYWxcclxuICAgICAqXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hdGVyaWFsRGV0YWlsQ29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIGFkZFByb3BlcnR5TmVlZE9uTWF0ZXJpYWwoKSB7XHJcbiAgICAgICAgbGV0IG1hdGVyaWFsc190ZW1wOiBNYXRlcmlhbFtdO1xyXG4gICAgICAgIG1hdGVyaWFsc190ZW1wID0gW107XHJcblxyXG4gICAgICAgIHRoaXMucGF0aWVudC5uZWVkcy5mb3JFYWNoKG5lZWQgPT4ge1xyXG4gICAgICAgICAgICBuZWVkLm1hdGVyaWFscy5mb3JFYWNoKG1hdGVyaWFsT2ZhTmVlZCA9PiB7XHJcbiAgICAgICAgICAgICAgICBtYXRlcmlhbE9mYU5lZWRbXCJuZWVkX2lkXCJdID0gbmVlZC5pZDtcclxuICAgICAgICAgICAgICAgIG1hdGVyaWFsT2ZhTmVlZFtcIm5lZWRfZGVzY3JpcHRpb25cIl0gPSBuZWVkLmRlc2NyaXB0aW9uO1xyXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIk1BVEVSSUFMIDogXCIgKyBKU09OLnN0cmluZ2lmeShtYXRlcmlhbE9mYU5lZWQsIG51bGwsIDQpKTtcclxuICAgICAgICAgICAgICAgIG1hdGVyaWFsc190ZW1wLnB1c2gobWF0ZXJpYWxPZmFOZWVkKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMubWF0ZXJpYWxzT2ZBbGxOZWVkcyA9IG1hdGVyaWFsc190ZW1wO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGdW5jdGlvbiB0byBvcGVuIGV4dGVybmFsIG1hdGVyaWFscyBbcGRmIC4uLl1cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge2FueX0gaWRcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWF0ZXJpYWxEZXRhaWxDb21wb25lbnRcclxuICAgICAqL1xyXG4gICAgb3Blbk9uQnJvd3NlcihpZCkge1xyXG4gICAgICAgIGxldCBtYXRlcmlhbCA9IHRoaXMubWF0ZXJpYWxzVG9EaXNwbGF5LmZpbHRlcihtYXRlcmlhbCA9PiBtYXRlcmlhbC5pZCA9PT0gaWQpWzBdO1xyXG4gICAgICAgIG9wZW5VcmwobWF0ZXJpYWwudXJsKTtcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRnVuY3Rpb24gdG8gcmF0ZSBtYXRlcmlhbCBbcmVkLHllbGxvdyxncmVlbl1cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge2FueX0gbGV2ZWxcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWF0ZXJpYWxEZXRhaWxDb21wb25lbnRcclxuICAgICAqL1xyXG4gICAgZXZhbHVhdGVNYXRlcmlhbChsZXZlbCkge1xyXG5cclxuICAgICAgICBsZXQgcmF0aW5nID0gbmV3IFJhdGluZygpO1xyXG5cclxuICAgICAgICByYXRpbmcuZXZhbHVhdGlvbiA9IGxldmVsO1xyXG4gICAgICAgIHJhdGluZy5pZF9tYXRlcmlhbCA9IHRoaXMubWF0ZXJpYWxQYXJlbnQuaWQ7XHJcblxyXG4gICAgICAgIHRoaXMucmF0aW5ncy5wdXNoKHJhdGluZyk7XHJcblxyXG4gICAgICAgIHRoaXMuZGF0YVNlcnZpY2Uuc2V0UmF0aW5nKHJhdGluZyk7XHJcbiAgICAgICAgdGhpcy5wYXRpZW50U2VydmljZS5zZW5kUmF0aW5nKHJhdGluZyk7XHJcblxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBnZXRSYXRpbmdzKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJhdGluZ3M7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIGZ1bmN0aW9uIHRvIG5hdmlnYXRlIHRvIHRoZSBtYXRlcmlhbCBxdWVzdGlvbm5haXJlXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHthbnl9IHJlZl9xdWVzdGlvbm5haXJlXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hdGVyaWFsRGV0YWlsQ29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIGZpbGxRdWVzdGlvbm5haXJlKHJlZl9xdWVzdGlvbm5haXJlKSB7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvZXZhbHVhdGlvbicsIHJlZl9xdWVzdGlvbm5haXJlXSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRnVuY3Rpb24gdG8gc2VuZCBlbWFpbCB0byBwcm9maXNzaW9uYWwgc2F1ZGVcclxuICAgICAqIFxyXG4gICAgICogXHJcbiAgICAgKiBAbWVtYmVyb2YgTWF0ZXJpYWxEZXRhaWxDb21wb25lbnRcclxuICAgICAqL1xyXG4gICAgc2VuZE1haWxUbygpIHtcclxuICAgICAgICBlbWFpbC5jb21wb3NlKHtcclxuICAgICAgICAgICAgc3ViamVjdDogXCJQZWRpZG8gZGUgZXNjbGFyZWNpbWVudG8gZG8gY3VpZGFkb3IgXCIgKyB0aGlzLmFwcF91c2VyLm5hbWUgKyBcIiBjb20gbyBpZDogXCIgKyB0aGlzLmFwcF91c2VyLmlkLFxyXG4gICAgICAgICAgICBib2R5OiBcIkJvbSBkaWEsPHA+XCJcclxuICAgICAgICAgICAgKyBcIk5lY2Vzc2l0byBlc2NsYXJlY2ltZW50byBzb2JyZSBvIHNlZ3VpbnRlIG1hdGVyaWFsOlwiXHJcbiAgICAgICAgICAgICsgXCI8cD5JZCBNYXRlcmlhbDogXCIgKyB0aGlzLm1hdGVyaWFsUGFyZW50LmlkXHJcbiAgICAgICAgICAgICsgXCI8cD5Ob21lIE1hdGVyaWFsOiBcIiArIHRoaXMubWF0ZXJpYWxQYXJlbnQubmFtZVxyXG4gICAgICAgICAgICArIFwiPHA+RGVzY3Jpw6fDo28gTWF0ZXJpYWw6IFwiICsgdGhpcy5tYXRlcmlhbFBhcmVudC5kZXNjcmlwdGlvblxyXG4gICAgICAgICAgICArIFwiPHA+SWQgQ3VpZGFkb3I6IFwiICsgdGhpcy5hcHBfdXNlci5pZFxyXG4gICAgICAgICAgICArIFwiPHA+Tm9tZSBDdWlkYWRvcjogXCIgKyB0aGlzLmFwcF91c2VyLm5hbWVcclxuICAgICAgICAgICAgLFxyXG4gICAgICAgICAgICB0bzogW3RoaXMuZW1haWxQcm9maXNzaW9uYWxTYXVkZV0sXHJcbiAgICAgICAgICAgIGNjOiBbJyddLFxyXG4gICAgICAgICAgICBiY2M6IFsnJywgJyddLFxyXG4gICAgICAgICAgICBhdHRhY2htZW50czogW1xyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBhcHBQaWNrZXJUaXRsZTogJ0NvbXBvc2Ugd2l0aCBhcHAgY2FyZWdpdmVyJyAvLyBmb3IgQW5kcm9pZCwgZGVmYXVsdDogJ09wZW4gd2l0aC4uJ1xyXG4gICAgICAgIH0pLnRoZW4oXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRW1haWwgY29tcG9zZXIgY2xvc2VkXCIpO1xyXG4gICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yOiBcIiArIGVycik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcclxuICAgICAgICBpZiAoYXBwLmFuZHJvaWQpIHtcclxuICAgICAgICAgICAgYXBwLmFuZHJvaWQub24oYXBwLkFuZHJvaWRBcHBsaWNhdGlvbi5hY3Rpdml0eUJhY2tQcmVzc2VkRXZlbnQsIHRoaXMuYmFja0V2ZW50KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICAgICAgLy8gY2xlYW5pbmcgdXAgcmVmZXJlbmNlcy9saXN0ZW5lcnMuXHJcbiAgICAgICAgaWYgKGFwcC5hbmRyb2lkKSB7XHJcbiAgICAgICAgICAgIGFwcC5hbmRyb2lkLm9mZihhcHAuQW5kcm9pZEFwcGxpY2F0aW9uLmFjdGl2aXR5QmFja1ByZXNzZWRFdmVudCwgdGhpcy5iYWNrRXZlbnQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEZ1bmN0aW9uIHRvIGRpc2FibGUgYmFjayBidXR0b24gb24gYW5kcm9pZFxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge2FueX0gYXJncyBcclxuICAgICAqIEByZXR1cm5zIFxyXG4gICAgICogXHJcbiAgICAgKiBAbWVtYmVyb2YgUGF0aWVudHNDb21wb25lbnRcclxuICAgICAqL1xyXG4gICAgYmFja0V2ZW50KGFyZ3MpIHtcclxuICAgICAgICBhcmdzLmNhbmNlbCA9IHRydWU7XHJcbiAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgIH1cclxuXHJcbn1cclxuIl19