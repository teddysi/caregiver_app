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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0ZXJpYWwtZGV0YWlsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1hdGVyaWFsLWRldGFpbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHNDQUFrRDtBQUNsRCwwQ0FBaUQ7QUFHakQsOERBQTREO0FBQzVELDREQUEwRDtBQUUxRCxtQ0FBa0M7QUFHbEMsaUNBQW9DO0FBS3BDLDBDQUF5QztBQUl6QyxxQ0FBc0M7QUFFdEMsMkVBQXlFO0FBRXpFLGlDQUErQjtBQUUvQiwwQ0FBNEM7QUFHNUMsNERBQTBEO0FBUTFELElBQWEsdUJBQXVCO0lBZWhDLHVDQUF1QztJQUN2Qyx1REFBdUQ7SUFFdkQsaUNBQ1ksY0FBOEIsRUFDOUIsS0FBcUIsRUFDckIsTUFBYyxFQUNkLFdBQXdCLEVBQ3hCLGdCQUFrQyxFQUNsQyxXQUF3QjtRQUx4QixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUFDckIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNkLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3hCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFFaEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQUdELDBDQUFRLEdBQVI7UUFBQSxpQkErQ0M7UUE5Q0csT0FBTyxDQUFDLEdBQUcsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFBO1FBQzNDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDO1FBQzVCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUMzQyw4QkFBOEI7UUFDOUIsSUFBSSxDQUFDLHNCQUFzQixHQUFHLHVDQUF1QyxDQUFDO1FBRXRFLElBQU0sRUFBRSxHQUFH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QUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ2QsR0FBRyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLHdCQUF3QixFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNwRixDQUFDO0lBQ0wsQ0FBQztJQUVELDZDQUFXLEdBQVg7UUFDSSxvQ0FBb0M7UUFDcEMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDZCxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsd0JBQXdCLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3JGLENBQUM7SUFDTCxDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNILDJDQUFTLEdBQVQsVUFBVSxJQUFJO1FBQ1YsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDbkIsTUFBTSxDQUFDO0lBRVgsQ0FBQztJQUVMLDhCQUFDO0FBQUQsQ0FBQyxBQTVORCxJQTROQztBQTVOWSx1QkFBdUI7SUFObkMsZ0JBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxrQkFBa0I7UUFDNUIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1FBQ25CLFNBQVMsRUFBRSxDQUFDLGlDQUFpQyxDQUFDO1FBQzlDLFdBQVcsRUFBRSxrQ0FBa0M7S0FDbEQsQ0FBQztxQ0FvQjhCLGdDQUFjO1FBQ3ZCLHVCQUFjO1FBQ2IsZUFBTTtRQUNELDBCQUFXO1FBQ04sb0NBQWdCO1FBQ3JCLDBCQUFXO0dBeEIzQix1QkFBdUIsQ0E0Tm5DO0FBNU5ZLDBEQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XHJcblxyXG5pbXBvcnQgeyBQYXRpZW50IH0gZnJvbSBcIi4uL3BhdGllbnQvcGF0aWVudFwiO1xyXG5pbXBvcnQgeyBQYXRpZW50U2VydmljZSB9IGZyb20gXCIuLi9wYXRpZW50L3BhdGllbnQuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBEYXRhU2VydmljZSB9IGZyb20gXCIuLi9zaGFyZWQvZGF0YS9kYXRhLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgTWF0ZXJpYWwgfSBmcm9tIFwiLi9tYXRlcmlhbFwiO1xyXG5pbXBvcnQgeyBSYXRpbmcgfSBmcm9tIFwiLi9yYXRpbmdcIjtcclxuaW1wb3J0IHsgTmVlZCB9IGZyb20gXCIuLi9uZWVkL25lZWRcIjtcclxuXHJcbmltcG9ydCBhcHAgPSByZXF1aXJlKFwiYXBwbGljYXRpb25cIik7XHJcbmltcG9ydCBwbGF0Zm9ybSA9IHJlcXVpcmUoXCJwbGF0Zm9ybVwiKTtcclxuXHJcbmltcG9ydCBidXR0b25Nb2R1bGUgPSByZXF1aXJlKFwidWkvYnV0dG9uXCIpO1xyXG5cclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xyXG5cclxuXHJcbmltcG9ydCB7IG9wZW5BcHAgfSBmcm9tIFwibmF0aXZlc2NyaXB0LW9wZW4tYXBwXCI7XHJcbmltcG9ydCB7IG9wZW5VcmwgfSBmcm9tIFwidXRpbHMvdXRpbHNcIjtcclxuXHJcbmltcG9ydCB7IENvbm5lY3RvclNlcnZpY2UgfSBmcm9tIFwiLi4vc2hhcmVkL2Nvbm5lY3Rvci9jb25uZWN0b3Iuc2VydmljZVwiO1xyXG5cclxuaW1wb3J0ICduYXRpdmVzY3JpcHQtcGRmLXZpZXcnO1xyXG5cclxuaW1wb3J0ICogYXMgZW1haWwgZnJvbSBcIm5hdGl2ZXNjcmlwdC1lbWFpbFwiO1xyXG5cclxuaW1wb3J0IHsgVXNlciB9IGZyb20gXCIuLi9zaGFyZWQvdXNlci91c2VyXCI7XHJcbmltcG9ydCB7IFVzZXJTZXJ2aWNlIH0gZnJvbSBcIi4uL3NoYXJlZC91c2VyL3VzZXIuc2VydmljZVwiO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogXCJtYXRlcmlhbC1kZXRhaWxzXCIsXHJcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gICAgc3R5bGVVcmxzOiBbXCIuL21hdGVyaWFsLWRldGFpbC5jb21wb25lbnQuY3NzXCJdLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9tYXRlcmlhbC1kZXRhaWwuY29tcG9uZW50Lmh0bWxcIixcclxufSlcclxuZXhwb3J0IGNsYXNzIE1hdGVyaWFsRGV0YWlsQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICAgIHBhdGllbnQ6IFBhdGllbnQ7XHJcbiAgICBuZWVkOiBOZWVkO1xyXG4gICAgbWF0ZXJpYWxzT2ZBbGxOZWVkczogTWF0ZXJpYWxbXTtcclxuICAgIG1hdGVyaWFsUGFyZW50OiBNYXRlcmlhbDtcclxuICAgIG1hdGVyaWFsc1RvRGlzcGxheTogTWF0ZXJpYWxbXTtcclxuXHJcbiAgICBoYXNFdmFsdWF0aW9uc1RvRG86IGJvb2xlYW47XHJcbiAgICBsb2FkaW5nOiBib29sZWFuO1xyXG5cclxuICAgIGVtYWlsQXZhbGlhYmxlOiBib29sZWFuO1xyXG4gICAgYXBwX3VzZXI6IFVzZXI7XHJcbiAgICBlbWFpbFByb2Zpc3Npb25hbFNhdWRlOiBzdHJpbmc7XHJcblxyXG4gICAgcmF0aW5nczogUmF0aW5nW107XHJcbiAgICAvL3JhdGluZ3MucHVzaChuZXcgUmF0aW5nKFwiMVwiLCBcIk1hdVwiKSk7XHJcbiAgICAvLyByYXRpbmdzID0gW1JhdGluZyhcIjFcIiwgXCJNYXVcIiksIFJhdGluZyhcIjJcIiwgXCJNZWRpb1wiKV1cclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIHBhdGllbnRTZXJ2aWNlOiBQYXRpZW50U2VydmljZSxcclxuICAgICAgICBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcclxuICAgICAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyLFxyXG4gICAgICAgIHByaXZhdGUgZGF0YVNlcnZpY2U6IERhdGFTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgY29ubmVjdG9yU2VydmljZTogQ29ubmVjdG9yU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIHVzZXJTZXJ2aWNlOiBVc2VyU2VydmljZVxyXG4gICAgKSB7XHJcbiAgICAgICAgdGhpcy5yYXRpbmdzID0gW107XHJcbiAgICB9XHJcblxyXG5cclxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiIyBDT01QT05FTlRFIE1BVEVSSUFMLURFVEFJTFwiKVxyXG4gICAgICAgIHRoaXMubG9hZGluZyA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5lbWFpbEF2YWxpYWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuYXBwX3VzZXIgPSB0aGlzLnVzZXJTZXJ2aWNlLmdldFVzZXIoKTtcclxuICAgICAgICAvL1NldCBlbWFpbCBwcm9maXNzaW9uYWwgc2F1ZGVcclxuICAgICAgICB0aGlzLmVtYWlsUHJvZmlzc2lvbmFsU2F1ZGUgPSAnc3VwcG9ydC5jYXJlZ2l2ZXJzQGVtYWlsYXJlZ2lzdGFyLmNvbSc7XHJcblxyXG4gICAgICAgIGNvbnN0IGlkID0gK3RoaXMucm91dGUuc25hcHNob3QucGFyYW1zW1wiaWRcIl07XHJcbiAgICAgICAgY29uc3QgaWR4ID0gK3RoaXMucm91dGUuc25hcHNob3QucGFyYW1zW1wiaWRfbWF0ZXJpYWxcIl07XHJcblxyXG4gICAgICAgIC8vcmV0dXJuIHRvIHBhdGllbnRzIExpc3QgaWYgZG8gbm90IGhhdmUgY29ubmVjdGlvblxyXG4gICAgICAgIGlmICghdGhpcy5jb25uZWN0b3JTZXJ2aWNlLmlzQ29ubmVjdGVkKCkpIHtcclxuICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvcGF0aWVudHMnXSk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJJRCBQQUNJRU5URSBcIiArIGlkICsgXCIgSUQgTUFURVJJQUxcIiArIGlkeClcclxuICAgICAgICB0aGlzLnBhdGllbnQgPSB0aGlzLnBhdGllbnRTZXJ2aWNlLnBhdGllbnRzLmZpbHRlcihwYXRpZW50ID0+IHBhdGllbnQuaWQgPT09IGlkKVswXTtcclxuICAgICAgICAvLyBjcmlhciBsaXN0YSBkZSBtYXRlcmlhaXMgY29tIHByb3ByaWFkYWRlIGFkaWNpb25hbCBuZWVkIG5hbWUgYW5kIG5lZWQgZGVzY3JpcHRpb25cclxuICAgICAgICB0aGlzLmFkZFByb3BlcnR5TmVlZE9uTWF0ZXJpYWwoKTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKFwiTUFURVJJQUxPRkFMTE5FRURTIDogXCIgKyBKU09OLnN0cmluZ2lmeSh0aGlzLm1hdGVyaWFsc09mQWxsTmVlZHMsIG51bGwsIDQpKTtcclxuICAgICAgICB0aGlzLm1hdGVyaWFsUGFyZW50ID0gdGhpcy5tYXRlcmlhbHNPZkFsbE5lZWRzLmZpbHRlcihtYXRlcmlhbCA9PiBtYXRlcmlhbC5pZCA9PT0gaWR4KVswXTtcclxuXHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLTogXCIpO1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coXCJNQVRFUklBTFBhcmVudCA6IFwiICsgSlNPTi5zdHJpbmdpZnkodGhpcy5tYXRlcmlhbFBhcmVudCwgbnVsbCwgNCkpO1xyXG4gICAgICAgIC8vdmVyaWZpY2FyIHNlIMOpIHVtIGNvbXBvc2l0ZVxyXG4gICAgICAgIGlmICh0aGlzLm1hdGVyaWFsUGFyZW50LnR5cGUgPT0gXCJjb21wb3NpdGVcIikgey8vbWF0ZXJpYWwgY29tcG9zdG8gLT4gY2FycmVnYXIgbyBhcnJheVxyXG4gICAgICAgICAgICB0aGlzLm1hdGVyaWFsc1RvRGlzcGxheSA9IHRoaXMubWF0ZXJpYWxQYXJlbnQubWF0ZXJpYWxzO1xyXG4gICAgICAgIH0gZWxzZSB7Ly9tYXRlcmlhbCBzaW1wbGVzIGJhc3RhIGNhcnJlZ2FyIHBhcmEgdmlzdGFcclxuICAgICAgICAgICAgdGhpcy5tYXRlcmlhbHNUb0Rpc3BsYXkgPSBbXTtcclxuICAgICAgICAgICAgdGhpcy5tYXRlcmlhbHNUb0Rpc3BsYXkucHVzaCh0aGlzLm1hdGVyaWFsUGFyZW50KTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnBhdGllbnRTZXJ2aWNlLnJlZ2lzdGVyQWNlc3NlZE1hdGVyaWFsKHRoaXMucGF0aWVudCwgdGhpcy5tYXRlcmlhbFBhcmVudCk7XHJcblxyXG4gICAgICAgIC8vdmVyaWZ5IGlzIGVtYWlsIGF2YWxpYWJsZVxyXG4gICAgICAgIGVtYWlsLmF2YWlsYWJsZSgpLnRoZW4oZnVuY3Rpb24gKGF2YWlsKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiIyBDT01QT05FTlRFIE1BVEVSSUFMLURFVEFJTCAjIEVtYWlsIGF2YWlsYWJsZT8gXCIgKyBhdmFpbCk7XHJcbiAgICAgICAgICAgIHJldHVybiBhdmFpbDtcclxuICAgICAgICB9KS50aGVuKChhdmFpbCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmVtYWlsQXZhbGlhYmxlID0gYXZhaWw7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAvL0V2YWx1YXRpb25zXHJcbiAgICAgICAgdGhpcy5oYXNFdmFsdWF0aW9uc1RvRG8gPSB0aGlzLnBhdGllbnRTZXJ2aWNlLmhhc0V2YWx1YXRpb25zVG9EbygpO1xyXG5cclxuICAgIH1cclxuICAgIHN0b3BMb2FkaW5nKCkge1xyXG4gICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiUEFTU09VIEFLSVwiKVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEZ1bmN0aW9uIHRvIGFkZCBwcm9wZXJ0aWVzIG9mIHRoZSBcInBhcmVudFwiIG5lZWQgdG8gdGhlIFwiY2hpbGRcIiBtYXRlcmlhbFxyXG4gICAgICpcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWF0ZXJpYWxEZXRhaWxDb21wb25lbnRcclxuICAgICAqL1xyXG4gICAgYWRkUHJvcGVydHlOZWVkT25NYXRlcmlhbCgpIHtcclxuICAgICAgICBsZXQgbWF0ZXJpYWxzX3RlbXA6IE1hdGVyaWFsW107XHJcbiAgICAgICAgbWF0ZXJpYWxzX3RlbXAgPSBbXTtcclxuXHJcbiAgICAgICAgdGhpcy5wYXRpZW50Lm5lZWRzLmZvckVhY2gobmVlZCA9PiB7XHJcbiAgICAgICAgICAgIG5lZWQubWF0ZXJpYWxzLmZvckVhY2gobWF0ZXJpYWxPZmFOZWVkID0+IHtcclxuICAgICAgICAgICAgICAgIG1hdGVyaWFsT2ZhTmVlZFtcIm5lZWRfaWRcIl0gPSBuZWVkLmlkO1xyXG4gICAgICAgICAgICAgICAgbWF0ZXJpYWxPZmFOZWVkW1wibmVlZF9kZXNjcmlwdGlvblwiXSA9IG5lZWQuZGVzY3JpcHRpb247XHJcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiTUFURVJJQUwgOiBcIiArIEpTT04uc3RyaW5naWZ5KG1hdGVyaWFsT2ZhTmVlZCwgbnVsbCwgNCkpO1xyXG4gICAgICAgICAgICAgICAgbWF0ZXJpYWxzX3RlbXAucHVzaChtYXRlcmlhbE9mYU5lZWQpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5tYXRlcmlhbHNPZkFsbE5lZWRzID0gbWF0ZXJpYWxzX3RlbXA7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEZ1bmN0aW9uIHRvIG9wZW4gZXh0ZXJuYWwgbWF0ZXJpYWxzIFtwZGYgLi4uXVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7YW55fSBpZFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXRlcmlhbERldGFpbENvbXBvbmVudFxyXG4gICAgICovXHJcbiAgICBvcGVuT25Ccm93c2VyKGlkKSB7XHJcbiAgICAgICAgbGV0IG1hdGVyaWFsID0gdGhpcy5tYXRlcmlhbHNUb0Rpc3BsYXkuZmlsdGVyKG1hdGVyaWFsID0+IG1hdGVyaWFsLmlkID09PSBpZClbMF07XHJcbiAgICAgICAgb3BlblVybChtYXRlcmlhbC51cmwpO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGdW5jdGlvbiB0byByYXRlIG1hdGVyaWFsIFtyZWQseWVsbG93LGdyZWVuXVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7YW55fSBsZXZlbFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXRlcmlhbERldGFpbENvbXBvbmVudFxyXG4gICAgICovXHJcbiAgICBldmFsdWF0ZU1hdGVyaWFsKGxldmVsKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJORVcgRVZBTFVUSU9OOiBcIiArIGxldmVsKTtcclxuICAgICAgICBsZXQgcmF0aW5nID0gbmV3IFJhdGluZygpO1xyXG5cclxuICAgICAgICByYXRpbmcuZXZhbHVhdGlvbiA9IGxldmVsO1xyXG4gICAgICAgIHJhdGluZy5pZF9tYXRlcmlhbCA9IHRoaXMubWF0ZXJpYWxQYXJlbnQuaWQudG9TdHJpbmcoKTtcclxuXHJcbiAgICAgICAgdGhpcy5yYXRpbmdzLnB1c2gocmF0aW5nKTtcclxuXHJcbiAgICAgICAgdGhpcy5kYXRhU2VydmljZS5zZXRSYXRpbmcodGhpcy5tYXRlcmlhbFBhcmVudCwgbGV2ZWwpO1xyXG4gICAgICAgIHRoaXMucGF0aWVudFNlcnZpY2Uuc2VuZFJhdGluZyhyYXRpbmcpO1xyXG5cclxuICAgIH1cclxuXHJcblxyXG4gICAgZ2V0UmF0aW5ncygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5yYXRpbmdzO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBmdW5jdGlvbiB0byBuYXZpZ2F0ZSB0byB0aGUgbWF0ZXJpYWwgcXVlc3Rpb25uYWlyZVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7YW55fSByZWZfcXVlc3Rpb25uYWlyZVxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXRlcmlhbERldGFpbENvbXBvbmVudFxyXG4gICAgICovXHJcbiAgICBmaWxsUXVlc3Rpb25uYWlyZShyZWZfcXVlc3Rpb25uYWlyZSkge1xyXG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL2V2YWx1YXRpb24nLCByZWZfcXVlc3Rpb25uYWlyZV0pO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEZ1bmN0aW9uIHRvIHNlbmQgZW1haWwgdG8gcHJvZmlzc2lvbmFsIHNhdWRlXHJcbiAgICAgKiBcclxuICAgICAqIFxyXG4gICAgICogQG1lbWJlcm9mIE1hdGVyaWFsRGV0YWlsQ29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIHNlbmRNYWlsVG8oKSB7XHJcbiAgICAgICAgZW1haWwuY29tcG9zZSh7XHJcbiAgICAgICAgICAgIHN1YmplY3Q6IFwiUGVkaWRvIGRlIGVzY2xhcmVjaW1lbnRvIGRvIGN1aWRhZG9yIFwiICsgdGhpcy5hcHBfdXNlci5uYW1lICsgXCIgY29tIG8gaWQ6IFwiICsgdGhpcy5hcHBfdXNlci5pZCxcclxuICAgICAgICAgICAgYm9keTogXCJCb20gZGlhLDxwPlwiXHJcbiAgICAgICAgICAgICsgXCJOZWNlc3NpdG8gZXNjbGFyZWNpbWVudG8gc29icmUgbyBzZWd1aW50ZSBtYXRlcmlhbDpcIlxyXG4gICAgICAgICAgICArIFwiPHA+SWQgTWF0ZXJpYWw6IFwiICsgdGhpcy5tYXRlcmlhbFBhcmVudC5pZFxyXG4gICAgICAgICAgICArIFwiPHA+Tm9tZSBNYXRlcmlhbDogXCIgKyB0aGlzLm1hdGVyaWFsUGFyZW50Lm5hbWVcclxuICAgICAgICAgICAgKyBcIjxwPkRlc2NyacOnw6NvIE1hdGVyaWFsOiBcIiArIHRoaXMubWF0ZXJpYWxQYXJlbnQuZGVzY3JpcHRpb25cclxuICAgICAgICAgICAgKyBcIjxwPklkIEN1aWRhZG9yOiBcIiArIHRoaXMuYXBwX3VzZXIuaWRcclxuICAgICAgICAgICAgKyBcIjxwPk5vbWUgQ3VpZGFkb3I6IFwiICsgdGhpcy5hcHBfdXNlci5uYW1lXHJcbiAgICAgICAgICAgICxcclxuICAgICAgICAgICAgdG86IFt0aGlzLmVtYWlsUHJvZmlzc2lvbmFsU2F1ZGVdLFxyXG4gICAgICAgICAgICBjYzogWycnXSxcclxuICAgICAgICAgICAgYmNjOiBbJycsICcnXSxcclxuICAgICAgICAgICAgYXR0YWNobWVudHM6IFtcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgYXBwUGlja2VyVGl0bGU6ICdDb21wb3NlIHdpdGggYXBwIGNhcmVnaXZlcicgLy8gZm9yIEFuZHJvaWQsIGRlZmF1bHQ6ICdPcGVuIHdpdGguLidcclxuICAgICAgICB9KS50aGVuKFxyXG4gICAgICAgICAgICBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVtYWlsIGNvbXBvc2VyIGNsb3NlZFwiKTtcclxuICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvcjogXCIgKyBlcnIpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XHJcbiAgICAgICAgaWYgKGFwcC5hbmRyb2lkKSB7XHJcbiAgICAgICAgICAgIGFwcC5hbmRyb2lkLm9uKGFwcC5BbmRyb2lkQXBwbGljYXRpb24uYWN0aXZpdHlCYWNrUHJlc3NlZEV2ZW50LCB0aGlzLmJhY2tFdmVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG5nT25EZXN0cm95KCkge1xyXG4gICAgICAgIC8vIGNsZWFuaW5nIHVwIHJlZmVyZW5jZXMvbGlzdGVuZXJzLlxyXG4gICAgICAgIGlmIChhcHAuYW5kcm9pZCkge1xyXG4gICAgICAgICAgICBhcHAuYW5kcm9pZC5vZmYoYXBwLkFuZHJvaWRBcHBsaWNhdGlvbi5hY3Rpdml0eUJhY2tQcmVzc2VkRXZlbnQsIHRoaXMuYmFja0V2ZW50KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGdW5jdGlvbiB0byBkaXNhYmxlIGJhY2sgYnV0dG9uIG9uIGFuZHJvaWRcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHthbnl9IGFyZ3MgXHJcbiAgICAgKiBAcmV0dXJucyBcclxuICAgICAqIFxyXG4gICAgICogQG1lbWJlcm9mIFBhdGllbnRzQ29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIGJhY2tFdmVudChhcmdzKSB7XHJcbiAgICAgICAgYXJncy5jYW5jZWwgPSB0cnVlO1xyXG4gICAgICAgIHJldHVybjtcclxuXHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==