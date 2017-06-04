"use strict";
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var data_service_1 = require("../shared/data/data.service");
var patient_service_1 = require("../patient/patient.service");
var page_1 = require("ui/page");
var connector_service_1 = require("../shared/connector/connector.service");
var router_2 = require("@angular/router");
var MaterialsComponent = (function () {
    function MaterialsComponent(patientService, route, router, page, dataService, connectorService) {
        this.patientService = patientService;
        this.route = route;
        this.router = router;
        this.page = page;
        this.dataService = dataService;
        this.connectorService = connectorService;
    }
    MaterialsComponent.prototype.ngOnInit = function () {
        console.log("# COMPONENT MATERIALS");
        var id = +this.route.snapshot.params["id"];
        var idx = +this.route.snapshot.params["id_need"];
        //return to patients List if do not have connection
        if (!this.connectorService.isConnected()) {
            this.router.navigate(['/patients']);
        }
        this.patientService.getPatients_BD();
        this.patient = this.patientService.patients.filter(function (patient) { return patient.id === id; })[0];
        // criar lista de materiais com propriadade adicional need name and need description
        this.addPropertyNeedOnMaterial();
        //	this.need = this.patient.needs.filter(need => need.id === idx)[0];
        //	this.materials = this.need.materials;
        //console.log("MATERIALS : " + JSON.stringify(this.materials, null, 4));
        //openApp("com.facebook.katana");
        //openUrl("http://192.168.99.100/caregivers/public/materialsAPI/21/showContent")
        /*let i;
        let control = false;
        if(!control)
        for(i=0;i<this.materials.length;i++){
            if(this.materials[i].url && this.materials[i].path) {
                this.materials[i].url+=this.materials[i].path;
                this.materials[i].path = '';
            }
            control = true;
        }
        */
        //evaluations
        this.hasEvaluationsToDo = this.patientService.hasEvaluationsToDo();
    };
    /**
     * Function to set color of ratting on materials list
     *
     * @param {any} rating
     * @returns
     *
     * @memberof MaterialsComponent
     */
    MaterialsComponent.prototype.getBorderColor = function (rating) {
        if (rating) {
            console.log('A verficar rating existente dos materiais');
            console.log(JSON.stringify(rating, null, 4));
            switch (rating.evaluation) {
                case '0':
                    console.log('Amarelo');
                    return { 'background-color': 'yellow' };
                case '-1':
                    console.log('Vermelho');
                    return { 'background-color': 'red' };
                case '1':
                    console.log('Verde');
                    return { 'background-color': 'green' };
                default:
                    return { 'background-color': 'black' };
            }
        }
    };
    /**
     * Function to add properties of the "parent" need to the "child" material
     *
     *
     * @memberof MaterialsComponent
     */
    MaterialsComponent.prototype.addPropertyNeedOnMaterial = function () {
        var materials_temp;
        materials_temp = [];
        this.patient.needs.forEach(function (need) {
            need.materials.forEach(function (materialOfaNeed) {
                materialOfaNeed["need_id"] = need.id;
                materialOfaNeed["need_description"] = "[ " + need.description + " ]";
                //testar se o material ja está na lista
                if (materials_temp.filter(function (material) { return material.id === materialOfaNeed.id; }).length > 0) {
                    materials_temp.filter(function (material) { return material.id === materialOfaNeed.id; })[0]["need_description"] += " [ " + need.description + " ]";
                }
                else {
                    materials_temp.push(materialOfaNeed);
                }
            });
        });
        this.materials = materials_temp;
    };
    return MaterialsComponent;
}());
MaterialsComponent = __decorate([
    core_1.Component({
        selector: 'materials',
        moduleId: module.id,
        templateUrl: './materials.component.html',
        styleUrls: ['./materials.component.css']
    }),
    __metadata("design:paramtypes", [patient_service_1.PatientService,
        router_1.ActivatedRoute,
        router_2.Router,
        page_1.Page,
        data_service_1.DataService,
        connector_service_1.ConnectorService])
], MaterialsComponent);
exports.MaterialsComponent = MaterialsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0ZXJpYWxzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1hdGVyaWFscy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHNDQUFrRDtBQUNsRCwwQ0FBaUQ7QUFLakQsNERBQTBEO0FBQzFELDhEQUE0RDtBQUc1RCxnQ0FBK0I7QUFLL0IsMkVBQXlFO0FBQ3pFLDBDQUF5QztBQVV6QyxJQUFhLGtCQUFrQjtJQU85Qiw0QkFDUyxjQUE4QixFQUM5QixLQUFxQixFQUNyQixNQUFjLEVBQ2QsSUFBVSxFQUNWLFdBQXdCLEVBQ3hCLGdCQUFrQztRQUxsQyxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUFDckIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNkLFNBQUksR0FBSixJQUFJLENBQU07UUFDVixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4QixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO0lBQ3ZDLENBQUM7SUFFTCxxQ0FBUSxHQUFSO1FBQ0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFBO1FBQ3BDLElBQU0sRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzdDLElBQU0sR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRW5ELG1EQUFtRDtRQUNuRCxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDMUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1FBQ3JDLENBQUM7UUFHRCxJQUFJLENBQUMsY0FBYyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FB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QUM7UUFFSCxJQUFJLENBQUMsU0FBUyxHQUFHLGNBQWMsQ0FBQztJQUNqQyxDQUFDO0lBR0YseUJBQUM7QUFBRCxDQUFDLEFBckhELElBcUhDO0FBckhZLGtCQUFrQjtJQVA5QixnQkFBUyxDQUFDO1FBQ1YsUUFBUSxFQUFFLFdBQVc7UUFDckIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1FBQ25CLFdBQVcsRUFBRSw0QkFBNEI7UUFDekMsU0FBUyxFQUFFLENBQUMsMkJBQTJCLENBQUM7S0FDeEMsQ0FBQztxQ0FVd0IsZ0NBQWM7UUFDdkIsdUJBQWM7UUFDYixlQUFNO1FBQ1IsV0FBSTtRQUNHLDBCQUFXO1FBQ04sb0NBQWdCO0dBYi9CLGtCQUFrQixDQXFIOUI7QUFySFksZ0RBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XHJcblxyXG5pbXBvcnQgeyBQYXRpZW50IH0gZnJvbSBcIi4uL3BhdGllbnQvcGF0aWVudFwiO1xyXG5pbXBvcnQgeyBNYXRlcmlhbCB9IGZyb20gXCIuLi9tYXRlcmlhbC9tYXRlcmlhbFwiO1xyXG5pbXBvcnQgeyBOZWVkIH0gZnJvbSBcIi4uL25lZWQvbmVlZFwiO1xyXG5pbXBvcnQgeyBEYXRhU2VydmljZSB9IGZyb20gXCIuLi9zaGFyZWQvZGF0YS9kYXRhLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgUGF0aWVudFNlcnZpY2UgfSBmcm9tIFwiLi4vcGF0aWVudC9wYXRpZW50LnNlcnZpY2VcIjtcclxuXHJcbmltcG9ydCBidXR0b25Nb2R1bGUgPSByZXF1aXJlKFwidWkvYnV0dG9uXCIpO1xyXG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjtcclxuXHJcbmltcG9ydCB7IG9wZW5BcHAgfSBmcm9tIFwibmF0aXZlc2NyaXB0LW9wZW4tYXBwXCI7XHJcbmltcG9ydCB7IG9wZW5VcmwgfSBmcm9tIFwidXRpbHMvdXRpbHNcIjtcclxuXHJcbmltcG9ydCB7IENvbm5lY3RvclNlcnZpY2UgfSBmcm9tIFwiLi4vc2hhcmVkL2Nvbm5lY3Rvci9jb25uZWN0b3Iuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XHJcblxyXG5cclxuQENvbXBvbmVudCh7XHJcblx0c2VsZWN0b3I6ICdtYXRlcmlhbHMnLFxyXG5cdG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcblx0dGVtcGxhdGVVcmw6ICcuL21hdGVyaWFscy5jb21wb25lbnQuaHRtbCcsXHJcblx0c3R5bGVVcmxzOiBbJy4vbWF0ZXJpYWxzLmNvbXBvbmVudC5jc3MnXVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIE1hdGVyaWFsc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcblx0cGF0aWVudDogUGF0aWVudDtcclxuXHRuZWVkOiBOZWVkO1xyXG5cdG1hdGVyaWFsczogTWF0ZXJpYWxbXTtcclxuXHRyYXRpbmdfY29sb3JzOiB7fTtcclxuXHRoYXNFdmFsdWF0aW9uc1RvRG86IGJvb2xlYW47XHJcblxyXG5cdGNvbnN0cnVjdG9yKFxyXG5cdFx0cHJpdmF0ZSBwYXRpZW50U2VydmljZTogUGF0aWVudFNlcnZpY2UsXHJcblx0XHRwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcclxuXHRcdHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsXHJcblx0XHRwcml2YXRlIHBhZ2U6IFBhZ2UsXHJcblx0XHRwcml2YXRlIGRhdGFTZXJ2aWNlOiBEYXRhU2VydmljZSxcclxuXHRcdHByaXZhdGUgY29ubmVjdG9yU2VydmljZTogQ29ubmVjdG9yU2VydmljZVxyXG5cdCkgeyB9XHJcblxyXG5cdG5nT25Jbml0KCk6IHZvaWQge1xyXG5cdFx0Y29uc29sZS5sb2coXCIjIENPTVBPTkVOVCBNQVRFUklBTFNcIilcclxuXHRcdGNvbnN0IGlkID0gK3RoaXMucm91dGUuc25hcHNob3QucGFyYW1zW1wiaWRcIl07XHJcblx0XHRjb25zdCBpZHggPSArdGhpcy5yb3V0ZS5zbmFwc2hvdC5wYXJhbXNbXCJpZF9uZWVkXCJdO1xyXG5cclxuXHRcdC8vcmV0dXJuIHRvIHBhdGllbnRzIExpc3QgaWYgZG8gbm90IGhhdmUgY29ubmVjdGlvblxyXG5cdFx0aWYgKCF0aGlzLmNvbm5lY3RvclNlcnZpY2UuaXNDb25uZWN0ZWQoKSkge1xyXG5cdFx0XHR0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9wYXRpZW50cyddKTtcclxuXHRcdH1cclxuXHJcblxyXG5cdFx0dGhpcy5wYXRpZW50U2VydmljZS5nZXRQYXRpZW50c19CRCgpO1xyXG5cclxuXHRcdHRoaXMucGF0aWVudCA9IHRoaXMucGF0aWVudFNlcnZpY2UucGF0aWVudHMuZmlsdGVyKHBhdGllbnQgPT4gcGF0aWVudC5pZCA9PT0gaWQpWzBdO1xyXG5cclxuXHRcdC8vIGNyaWFyIGxpc3RhIGRlIG1hdGVyaWFpcyBjb20gcHJvcHJpYWRhZGUgYWRpY2lvbmFsIG5lZWQgbmFtZSBhbmQgbmVlZCBkZXNjcmlwdGlvblxyXG5cdFx0dGhpcy5hZGRQcm9wZXJ0eU5lZWRPbk1hdGVyaWFsKCk7XHJcblxyXG5cdFx0Ly9cdHRoaXMubmVlZCA9IHRoaXMucGF0aWVudC5uZWVkcy5maWx0ZXIobmVlZCA9PiBuZWVkLmlkID09PSBpZHgpWzBdO1xyXG5cdFx0Ly9cdHRoaXMubWF0ZXJpYWxzID0gdGhpcy5uZWVkLm1hdGVyaWFscztcclxuXHRcdC8vY29uc29sZS5sb2coXCJNQVRFUklBTFMgOiBcIiArIEpTT04uc3RyaW5naWZ5KHRoaXMubWF0ZXJpYWxzLCBudWxsLCA0KSk7XHJcblxyXG5cdFx0Ly9vcGVuQXBwKFwiY29tLmZhY2Vib29rLmthdGFuYVwiKTtcclxuXHRcdC8vb3BlblVybChcImh0dHA6Ly8xOTIuMTY4Ljk5LjEwMC9jYXJlZ2l2ZXJzL3B1YmxpYy9tYXRlcmlhbHNBUEkvMjEvc2hvd0NvbnRlbnRcIilcclxuXHRcdC8qbGV0IGk7XHJcblx0XHRsZXQgY29udHJvbCA9IGZhbHNlO1xyXG5cdFx0aWYoIWNvbnRyb2wpXHJcblx0XHRmb3IoaT0wO2k8dGhpcy5tYXRlcmlhbHMubGVuZ3RoO2krKyl7XHJcblx0XHRcdGlmKHRoaXMubWF0ZXJpYWxzW2ldLnVybCAmJiB0aGlzLm1hdGVyaWFsc1tpXS5wYXRoKSB7XHJcblx0XHRcdFx0dGhpcy5tYXRlcmlhbHNbaV0udXJsKz10aGlzLm1hdGVyaWFsc1tpXS5wYXRoO1xyXG5cdFx0XHRcdHRoaXMubWF0ZXJpYWxzW2ldLnBhdGggPSAnJztcclxuXHRcdFx0fVxyXG5cdFx0XHRjb250cm9sID0gdHJ1ZTtcdFx0XHJcblx0XHR9XHJcblx0XHQqL1xyXG5cclxuXHRcdC8vZXZhbHVhdGlvbnNcclxuXHRcdHRoaXMuaGFzRXZhbHVhdGlvbnNUb0RvID0gdGhpcy5wYXRpZW50U2VydmljZS5oYXNFdmFsdWF0aW9uc1RvRG8oKTtcclxuXHR9XHJcblxyXG5cclxuXHJcblx0LyoqXHJcblx0ICogRnVuY3Rpb24gdG8gc2V0IGNvbG9yIG9mIHJhdHRpbmcgb24gbWF0ZXJpYWxzIGxpc3RcclxuXHQgKiBcclxuXHQgKiBAcGFyYW0ge2FueX0gcmF0aW5nIFxyXG5cdCAqIEByZXR1cm5zIFxyXG5cdCAqIFxyXG5cdCAqIEBtZW1iZXJvZiBNYXRlcmlhbHNDb21wb25lbnRcclxuXHQgKi9cclxuXHRnZXRCb3JkZXJDb2xvcihyYXRpbmcpIHtcclxuXHRcdGlmIChyYXRpbmcpIHtcclxuXHRcdFx0Y29uc29sZS5sb2coJ0EgdmVyZmljYXIgcmF0aW5nIGV4aXN0ZW50ZSBkb3MgbWF0ZXJpYWlzJyk7XHJcblx0XHRcdGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHJhdGluZywgbnVsbCwgNCkpO1xyXG5cclxuXHRcdFx0c3dpdGNoIChyYXRpbmcuZXZhbHVhdGlvbikge1xyXG5cdFx0XHRcdGNhc2UgJzAnOlxyXG5cdFx0XHRcdFx0Y29uc29sZS5sb2coJ0FtYXJlbG8nKTtcclxuXHRcdFx0XHRcdHJldHVybiB7ICdiYWNrZ3JvdW5kLWNvbG9yJzogJ3llbGxvdycgfTtcclxuXHRcdFx0XHRjYXNlICctMSc6XHJcblx0XHRcdFx0XHRjb25zb2xlLmxvZygnVmVybWVsaG8nKTtcclxuXHRcdFx0XHRcdHJldHVybiB7ICdiYWNrZ3JvdW5kLWNvbG9yJzogJ3JlZCcgfTtcclxuXHRcdFx0XHRjYXNlICcxJzpcclxuXHRcdFx0XHRcdGNvbnNvbGUubG9nKCdWZXJkZScpO1xyXG5cdFx0XHRcdFx0cmV0dXJuIHsgJ2JhY2tncm91bmQtY29sb3InOiAnZ3JlZW4nIH07XHJcblx0XHRcdFx0ZGVmYXVsdDpcclxuXHRcdFx0XHRcdHJldHVybiB7ICdiYWNrZ3JvdW5kLWNvbG9yJzogJ2JsYWNrJyB9O1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHJcblxyXG5cdC8qKlxyXG5cdCAqIEZ1bmN0aW9uIHRvIGFkZCBwcm9wZXJ0aWVzIG9mIHRoZSBcInBhcmVudFwiIG5lZWQgdG8gdGhlIFwiY2hpbGRcIiBtYXRlcmlhbFxyXG5cdCAqIFxyXG5cdCAqIFxyXG5cdCAqIEBtZW1iZXJvZiBNYXRlcmlhbHNDb21wb25lbnRcclxuXHQgKi9cclxuXHRhZGRQcm9wZXJ0eU5lZWRPbk1hdGVyaWFsKCkge1xyXG5cdFx0bGV0IG1hdGVyaWFsc190ZW1wOiBNYXRlcmlhbFtdO1xyXG5cdFx0bWF0ZXJpYWxzX3RlbXAgPSBbXTtcclxuXHJcblx0XHR0aGlzLnBhdGllbnQubmVlZHMuZm9yRWFjaChuZWVkID0+IHtcclxuXHRcdFx0bmVlZC5tYXRlcmlhbHMuZm9yRWFjaChtYXRlcmlhbE9mYU5lZWQgPT4ge1xyXG5cdFx0XHRcdG1hdGVyaWFsT2ZhTmVlZFtcIm5lZWRfaWRcIl0gPSBuZWVkLmlkO1xyXG5cdFx0XHRcdG1hdGVyaWFsT2ZhTmVlZFtcIm5lZWRfZGVzY3JpcHRpb25cIl0gPSBcIlsgXCIgKyBuZWVkLmRlc2NyaXB0aW9uICsgXCIgXVwiO1xyXG5cdFx0XHRcdC8vdGVzdGFyIHNlIG8gbWF0ZXJpYWwgamEgZXN0w6EgbmEgbGlzdGFcclxuXHRcdFx0XHRpZiAobWF0ZXJpYWxzX3RlbXAuZmlsdGVyKG1hdGVyaWFsID0+IG1hdGVyaWFsLmlkID09PSBtYXRlcmlhbE9mYU5lZWQuaWQpLmxlbmd0aCA+IDApIHtcclxuXHRcdFx0XHRcdG1hdGVyaWFsc190ZW1wLmZpbHRlcihtYXRlcmlhbCA9PiBtYXRlcmlhbC5pZCA9PT0gbWF0ZXJpYWxPZmFOZWVkLmlkKVswXVtcIm5lZWRfZGVzY3JpcHRpb25cIl0gKz0gXCIgWyBcIiArIG5lZWQuZGVzY3JpcHRpb24gKyBcIiBdXCI7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdG1hdGVyaWFsc190ZW1wLnB1c2gobWF0ZXJpYWxPZmFOZWVkKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHR9KTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdHRoaXMubWF0ZXJpYWxzID0gbWF0ZXJpYWxzX3RlbXA7XHJcblx0fVxyXG5cclxuXHJcbn0iXX0=