"use strict";
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var evaluation_1 = require("../evaluation/evaluation");
var patient_service_1 = require("../patient/patient.service");
var EvaluationComponent = (function () {
    function EvaluationComponent(patientService, route) {
        this.patientService = patientService;
        this.route = route;
    }
    EvaluationComponent.prototype.ngOnInit = function () {
        console.log("# COMPONENT EVALUATION ");
        //************************************************************************* */
        //para teste -> depois substituir pelo formulario que vem do servidor
        this.evaluations = [];
        this.evaluations.push(new evaluation_1.Evaluation());
        this.evaluations[0].id = 0;
        this.evaluations[0].description = "Nivel de facilidade";
        this.evaluations.push(new evaluation_1.Evaluation());
        this.evaluations[1].id = 1;
        this.evaluations[1].description = "Esta apto para continuar?";
        this.evaluations.push(new evaluation_1.Evaluation());
        this.evaluations[2].id = 2;
        this.evaluations[2].description = "Tem experiencia na aplicacao deste material ?";
        //****************************************************************************** */
        //router params
        var id = +this.route.snapshot.params["id"];
        var idx = +this.route.snapshot.params["id_material"];
        //Get Patient
        this.patient = this.patientService.patients.filter(function (patient) { return patient.id === id; })[0];
        //criar lista de materiais com propriadade adicional need name and need description
        this.addPropertyNeedOnMaterial();
        //Select material
        this.materialParent = this.materialsOfAllNeeds.filter(function (material) { return material.id === idx; })[0];
    };
    /**
     *
     *
     *
     * @memberof EvaluationComponent
     */
    EvaluationComponent.prototype.addPropertyNeedOnMaterial = function () {
        var materials_temp;
        materials_temp = [];
        this.patient.needs.forEach(function (need) {
            need.materials.forEach(function (materialOfaNeed) {
                materialOfaNeed["need_id"] = need.id;
                materialOfaNeed["need_description"] = need.description;
                materials_temp.push(materialOfaNeed);
            });
        });
        this.materialsOfAllNeeds = materials_temp;
    };
    /**
     *
     *
     *
     * @memberof EvaluationComponent
     */
    EvaluationComponent.prototype.submeterAvaliacao = function () {
        console.log("# Evaluation 0 -> " + this.evaluations[0].response);
        console.log("# Evaluation 1 -> " + this.evaluations[1].response);
    };
    return EvaluationComponent;
}());
EvaluationComponent = __decorate([
    core_1.Component({
        selector: 'evaluation',
        moduleId: module.id,
        templateUrl: './evaluation.component.html',
        styleUrls: ['./evaluation.component.css']
    }),
    __metadata("design:paramtypes", [patient_service_1.PatientService,
        router_1.ActivatedRoute])
], EvaluationComponent);
exports.EvaluationComponent = EvaluationComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZhbHVhdGlvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJldmFsdWF0aW9uLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsc0NBQWtEO0FBQ2xELDBDQUFpRDtBQUdqRCx1REFBc0Q7QUFFdEQsOERBQTREO0FBYTVELElBQWEsbUJBQW1CO0lBTzVCLDZCQUNZLGNBQThCLEVBQzlCLEtBQXFCO1FBRHJCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixVQUFLLEdBQUwsS0FBSyxDQUFnQjtJQUM3QixDQUFDO0lBRUwsc0NBQVEsR0FBUjtRQUNJLE9BQU8sQ0FBQyxHQUFHLENBQUMseUJBQXlCLENBQUMsQ0FBQTtRQUV0Qyw4RUFBOEU7UUFDOUUscUVBQXFFO1FBQ3JFLElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksdUJBQVUsRUFBRSxDQUFDLENBQUE7UUFDdkMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQzNCLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxHQUFHLHFCQUFxQixDQUFDO1FBQ3hELElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksdUJBQVUsRUFBRSxDQUFDLENBQUE7UUFDdkMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQzNCLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxHQUFHLDJCQUEyQixDQUFDO1FBQzlELElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksdUJBQVUsRUFBRSxDQUFDLENBQUE7UUFDdkMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQzNCLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxHQUFHLCtDQUErQyxDQUFDO1FBQ2xGLG1GQUFtRjtRQUVuRixlQUFlO1FBQ2YsSUFBTSxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDN0MsSUFBTSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDdkQsYUFBYTtRQUNiLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFVBQUEsT0FBTyxJQUFJLE9BQUEsT0FBTyxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQWpCLENBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNwRixtRkFBbUY7UUFDbkYsSUFBSSxDQUFDLHlCQUF5QixFQUFFLENBQUM7UUFDakMsaUJBQWlCO1FBQ2pCLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxVQUFBLFFBQVEsSUFBSSxPQUFBLFFBQVEsQ0FBQyxFQUFFLEtBQUssR0FBRyxFQUFuQixDQUFtQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDOUYsQ0FBQztJQUdEOzs7OztPQUtHO0lBQ0gsdURBQXlCLEdBQXpCO1FBQ0ksSUFBSSxjQUEwQixDQUFDO1FBQy9CLGNBQWMsR0FBRyxFQUFFLENBQUM7UUFFcEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQUEsSUFBSTtZQUMzQixJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxVQUFBLGVBQWU7Z0JBQ2xDLGVBQWUsQ0FBQyxTQUFTLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDO2dCQUNyQyxlQUFlLENBQUMsa0JBQWtCLENBQUMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO2dCQUN2RCxjQUFjLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQ3pDLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsbUJBQW1CLEdBQUcsY0FBYyxDQUFDO0lBQzlDLENBQUM7SUFHRDs7Ozs7T0FLRztJQUNILCtDQUFpQixHQUFqQjtRQUNJLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQTtRQUNoRSxPQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFvQixHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUE7SUFDcEUsQ0FBQztJQUVMLDBCQUFDO0FBQUQsQ0FBQyxBQTFFRCxJQTBFQztBQTFFWSxtQkFBbUI7SUFQL0IsZ0JBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxZQUFZO1FBQ3RCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtRQUNuQixXQUFXLEVBQUUsNkJBQTZCO1FBQzFDLFNBQVMsRUFBRSxDQUFDLDRCQUE0QixDQUFDO0tBQzVDLENBQUM7cUNBVThCLGdDQUFjO1FBQ3ZCLHVCQUFjO0dBVHhCLG1CQUFtQixDQTBFL0I7QUExRVksa0RBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IFBhdGllbnQgfSBmcm9tIFwiLi4vcGF0aWVudC9wYXRpZW50XCI7XHJcbmltcG9ydCB7IE1hdGVyaWFsIH0gZnJvbSBcIi4uL21hdGVyaWFsL21hdGVyaWFsXCI7XHJcbmltcG9ydCB7IEV2YWx1YXRpb24gfSBmcm9tIFwiLi4vZXZhbHVhdGlvbi9ldmFsdWF0aW9uXCI7XHJcbmltcG9ydCB7IE5lZWQgfSBmcm9tIFwiLi4vbmVlZC9uZWVkXCI7XHJcbmltcG9ydCB7IFBhdGllbnRTZXJ2aWNlIH0gZnJvbSBcIi4uL3BhdGllbnQvcGF0aWVudC5zZXJ2aWNlXCI7XHJcbmltcG9ydCBidXR0b25Nb2R1bGUgPSByZXF1aXJlKFwidWkvYnV0dG9uXCIpO1xyXG5pbXBvcnQgeyBvcGVuQXBwIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1vcGVuLWFwcFwiO1xyXG5pbXBvcnQgeyBvcGVuVXJsIH0gZnJvbSBcInV0aWxzL3V0aWxzXCI7XHJcblxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ2V2YWx1YXRpb24nLFxyXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHRlbXBsYXRlVXJsOiAnLi9ldmFsdWF0aW9uLmNvbXBvbmVudC5odG1sJyxcclxuICAgIHN0eWxlVXJsczogWycuL2V2YWx1YXRpb24uY29tcG9uZW50LmNzcyddXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgRXZhbHVhdGlvbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgICBwYXRpZW50OiBQYXRpZW50O1xyXG4gICAgbmVlZDogTmVlZDtcclxuICAgIG1hdGVyaWFsc09mQWxsTmVlZHM6IE1hdGVyaWFsW107XHJcbiAgICBtYXRlcmlhbFBhcmVudDogTWF0ZXJpYWw7IC8vw6kgbyBtYXRlcmlhbFxyXG4gICAgZXZhbHVhdGlvbnM6IEV2YWx1YXRpb25bXTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIHBhdGllbnRTZXJ2aWNlOiBQYXRpZW50U2VydmljZSxcclxuICAgICAgICBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZVxyXG4gICAgKSB7IH1cclxuXHJcbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIiMgQ09NUE9ORU5UIEVWQUxVQVRJT04gXCIpXHJcblxyXG4gICAgICAgIC8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4gICAgICAgIC8vcGFyYSB0ZXN0ZSAtPiBkZXBvaXMgc3Vic3RpdHVpciBwZWxvIGZvcm11bGFyaW8gcXVlIHZlbSBkbyBzZXJ2aWRvclxyXG4gICAgICAgIHRoaXMuZXZhbHVhdGlvbnMgPSBbXTtcclxuICAgICAgICB0aGlzLmV2YWx1YXRpb25zLnB1c2gobmV3IEV2YWx1YXRpb24oKSlcclxuICAgICAgICB0aGlzLmV2YWx1YXRpb25zWzBdLmlkID0gMDtcclxuICAgICAgICB0aGlzLmV2YWx1YXRpb25zWzBdLmRlc2NyaXB0aW9uID0gXCJOaXZlbCBkZSBmYWNpbGlkYWRlXCI7XHJcbiAgICAgICAgdGhpcy5ldmFsdWF0aW9ucy5wdXNoKG5ldyBFdmFsdWF0aW9uKCkpXHJcbiAgICAgICAgdGhpcy5ldmFsdWF0aW9uc1sxXS5pZCA9IDE7XHJcbiAgICAgICAgdGhpcy5ldmFsdWF0aW9uc1sxXS5kZXNjcmlwdGlvbiA9IFwiRXN0YSBhcHRvIHBhcmEgY29udGludWFyP1wiO1xyXG4gICAgICAgIHRoaXMuZXZhbHVhdGlvbnMucHVzaChuZXcgRXZhbHVhdGlvbigpKVxyXG4gICAgICAgIHRoaXMuZXZhbHVhdGlvbnNbMl0uaWQgPSAyO1xyXG4gICAgICAgIHRoaXMuZXZhbHVhdGlvbnNbMl0uZGVzY3JpcHRpb24gPSBcIlRlbSBleHBlcmllbmNpYSBuYSBhcGxpY2FjYW8gZGVzdGUgbWF0ZXJpYWwgP1wiO1xyXG4gICAgICAgIC8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcblxyXG4gICAgICAgIC8vcm91dGVyIHBhcmFtc1xyXG4gICAgICAgIGNvbnN0IGlkID0gK3RoaXMucm91dGUuc25hcHNob3QucGFyYW1zW1wiaWRcIl07XHJcbiAgICAgICAgY29uc3QgaWR4ID0gK3RoaXMucm91dGUuc25hcHNob3QucGFyYW1zW1wiaWRfbWF0ZXJpYWxcIl07XHJcbiAgICAgICAgLy9HZXQgUGF0aWVudFxyXG4gICAgICAgIHRoaXMucGF0aWVudCA9IHRoaXMucGF0aWVudFNlcnZpY2UucGF0aWVudHMuZmlsdGVyKHBhdGllbnQgPT4gcGF0aWVudC5pZCA9PT0gaWQpWzBdO1xyXG4gICAgICAgIC8vY3JpYXIgbGlzdGEgZGUgbWF0ZXJpYWlzIGNvbSBwcm9wcmlhZGFkZSBhZGljaW9uYWwgbmVlZCBuYW1lIGFuZCBuZWVkIGRlc2NyaXB0aW9uXHJcbiAgICAgICAgdGhpcy5hZGRQcm9wZXJ0eU5lZWRPbk1hdGVyaWFsKCk7XHJcbiAgICAgICAgLy9TZWxlY3QgbWF0ZXJpYWxcclxuICAgICAgICB0aGlzLm1hdGVyaWFsUGFyZW50ID0gdGhpcy5tYXRlcmlhbHNPZkFsbE5lZWRzLmZpbHRlcihtYXRlcmlhbCA9PiBtYXRlcmlhbC5pZCA9PT0gaWR4KVswXTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIFxyXG4gICAgICogXHJcbiAgICAgKiBAbWVtYmVyb2YgRXZhbHVhdGlvbkNvbXBvbmVudFxyXG4gICAgICovXHJcbiAgICBhZGRQcm9wZXJ0eU5lZWRPbk1hdGVyaWFsKCkge1xyXG4gICAgICAgIGxldCBtYXRlcmlhbHNfdGVtcDogTWF0ZXJpYWxbXTtcclxuICAgICAgICBtYXRlcmlhbHNfdGVtcCA9IFtdO1xyXG5cclxuICAgICAgICB0aGlzLnBhdGllbnQubmVlZHMuZm9yRWFjaChuZWVkID0+IHtcclxuICAgICAgICAgICAgbmVlZC5tYXRlcmlhbHMuZm9yRWFjaChtYXRlcmlhbE9mYU5lZWQgPT4ge1xyXG4gICAgICAgICAgICAgICAgbWF0ZXJpYWxPZmFOZWVkW1wibmVlZF9pZFwiXSA9IG5lZWQuaWQ7XHJcbiAgICAgICAgICAgICAgICBtYXRlcmlhbE9mYU5lZWRbXCJuZWVkX2Rlc2NyaXB0aW9uXCJdID0gbmVlZC5kZXNjcmlwdGlvbjtcclxuICAgICAgICAgICAgICAgIG1hdGVyaWFsc190ZW1wLnB1c2gobWF0ZXJpYWxPZmFOZWVkKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMubWF0ZXJpYWxzT2ZBbGxOZWVkcyA9IG1hdGVyaWFsc190ZW1wO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogXHJcbiAgICAgKiBcclxuICAgICAqIEBtZW1iZXJvZiBFdmFsdWF0aW9uQ29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIHN1Ym1ldGVyQXZhbGlhY2FvKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiIyBFdmFsdWF0aW9uIDAgLT4gXCIgKyB0aGlzLmV2YWx1YXRpb25zWzBdLnJlc3BvbnNlKVxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiIyBFdmFsdWF0aW9uIDEgLT4gXCIgKyB0aGlzLmV2YWx1YXRpb25zWzFdLnJlc3BvbnNlKVxyXG4gICAgfVxyXG5cclxufSJdfQ==