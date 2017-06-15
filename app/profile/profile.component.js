"use strict";
var core_1 = require("@angular/core");
var app = require("application");
var user_1 = require("../shared/user/user");
var user_service_1 = require("../shared/user/user.service");
var phone = require("nativescript-phone");
var ProfileComponent = (function () {
    function ProfileComponent(userService) {
        this.userService = userService;
        this.app_user = new user_1.User();
    }
    ProfileComponent.prototype.ngOnInit = function () {
        this.app_user = this.userService.getUser();
    };
    ProfileComponent.prototype.hasOtherContacts = function () {
        return true;
    };
    ProfileComponent.prototype.callHealthContact = function () {
        phone.dial("999999999", true);
        //phone.dial(app_user.healthContact, true);
    };
    ProfileComponent.prototype.ngAfterViewInit = function () {
        if (app.android) {
            app.android.on(app.AndroidApplication.activityBackPressedEvent, this.backEvent);
        }
    };
    ProfileComponent.prototype.ngOnDestroy = function () {
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
    ProfileComponent.prototype.backEvent = function (args) {
        args.cancel = true;
        return;
    };
    return ProfileComponent;
}());
ProfileComponent = __decorate([
    core_1.Component({
        selector: "",
        moduleId: module.id,
        providers: [],
        styleUrls: ["./profile.css"],
        templateUrl: "./profile.component.html",
    }),
    __metadata("design:paramtypes", [user_service_1.UserService])
], ProfileComponent);
exports.ProfileComponent = ProfileComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZmlsZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwcm9maWxlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsc0NBQWtEO0FBQ2xELGlDQUFvQztBQUVwQyw0Q0FBMkM7QUFDM0MsNERBQTBEO0FBRTFELElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBRSxvQkFBb0IsQ0FBRSxDQUFDO0FBUzVDLElBQWEsZ0JBQWdCO0lBR3pCLDBCQUFvQixXQUF3QjtRQUF4QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUMxQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksV0FBSSxFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUVELG1DQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDL0MsQ0FBQztJQUVELDJDQUFnQixHQUFoQjtRQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVELDRDQUFpQixHQUFqQjtRQUNJLEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzlCLDJDQUEyQztJQUMvQyxDQUFDO0lBRUQsMENBQWUsR0FBZjtRQUNJLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ2QsR0FBRyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLHdCQUF3QixFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNwRixDQUFDO0lBQ0wsQ0FBQztJQUVELHNDQUFXLEdBQVg7UUFDSSxvQ0FBb0M7UUFDcEMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDZCxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsd0JBQXdCLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3JGLENBQUM7SUFDTCxDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNILG9DQUFTLEdBQVQsVUFBVSxJQUFJO1FBQ1YsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDbkIsTUFBTSxDQUFDO0lBRVgsQ0FBQztJQUNMLHVCQUFDO0FBQUQsQ0FBQyxBQTlDRCxJQThDQztBQTlDWSxnQkFBZ0I7SUFQNUIsZ0JBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxFQUFFO1FBQ1osUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1FBQ25CLFNBQVMsRUFBRSxFQUFFO1FBQ2IsU0FBUyxFQUFFLENBQUMsZUFBZSxDQUFDO1FBQzVCLFdBQVcsRUFBRSwwQkFBMEI7S0FDMUMsQ0FBQztxQ0FJbUMsMEJBQVc7R0FIbkMsZ0JBQWdCLENBOEM1QjtBQTlDWSw0Q0FBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCBhcHAgPSByZXF1aXJlKFwiYXBwbGljYXRpb25cIik7XHJcbmltcG9ydCBwbGF0Zm9ybSA9IHJlcXVpcmUoXCJwbGF0Zm9ybVwiKTtcclxuaW1wb3J0IHsgVXNlciB9IGZyb20gXCIuLi9zaGFyZWQvdXNlci91c2VyXCI7XHJcbmltcG9ydCB7IFVzZXJTZXJ2aWNlIH0gZnJvbSBcIi4uL3NoYXJlZC91c2VyL3VzZXIuc2VydmljZVwiO1xyXG5cclxudmFyIHBob25lID0gcmVxdWlyZSggXCJuYXRpdmVzY3JpcHQtcGhvbmVcIiApO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogXCJcIixcclxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgICBwcm92aWRlcnM6IFtdLFxyXG4gICAgc3R5bGVVcmxzOiBbXCIuL3Byb2ZpbGUuY3NzXCJdLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9wcm9maWxlLmNvbXBvbmVudC5odG1sXCIsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBQcm9maWxlQ29tcG9uZW50e1xyXG4gICAgYXBwX3VzZXI6IFVzZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSB1c2VyU2VydmljZTogVXNlclNlcnZpY2UpIHtcclxuICAgICAgdGhpcy5hcHBfdXNlciA9IG5ldyBVc2VyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5hcHBfdXNlciA9IHRoaXMudXNlclNlcnZpY2UuZ2V0VXNlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIGhhc090aGVyQ29udGFjdHMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgY2FsbEhlYWx0aENvbnRhY3QgKCkge1xyXG4gICAgICAgIHBob25lLmRpYWwoXCI5OTk5OTk5OTlcIiwgdHJ1ZSk7XHJcbiAgICAgICAgLy9waG9uZS5kaWFsKGFwcF91c2VyLmhlYWx0aENvbnRhY3QsIHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcclxuICAgICAgICBpZiAoYXBwLmFuZHJvaWQpIHtcclxuICAgICAgICAgICAgYXBwLmFuZHJvaWQub24oYXBwLkFuZHJvaWRBcHBsaWNhdGlvbi5hY3Rpdml0eUJhY2tQcmVzc2VkRXZlbnQsIHRoaXMuYmFja0V2ZW50KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICAgICAgLy8gY2xlYW5pbmcgdXAgcmVmZXJlbmNlcy9saXN0ZW5lcnMuXHJcbiAgICAgICAgaWYgKGFwcC5hbmRyb2lkKSB7XHJcbiAgICAgICAgICAgIGFwcC5hbmRyb2lkLm9mZihhcHAuQW5kcm9pZEFwcGxpY2F0aW9uLmFjdGl2aXR5QmFja1ByZXNzZWRFdmVudCwgdGhpcy5iYWNrRXZlbnQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEZ1bmN0aW9uIHRvIGRpc2FibGUgYmFjayBidXR0b24gb24gYW5kcm9pZFxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge2FueX0gYXJncyBcclxuICAgICAqIEByZXR1cm5zIFxyXG4gICAgICogXHJcbiAgICAgKiBAbWVtYmVyb2YgUGF0aWVudHNDb21wb25lbnRcclxuICAgICAqL1xyXG4gICAgYmFja0V2ZW50KGFyZ3MpIHtcclxuICAgICAgICBhcmdzLmNhbmNlbCA9IHRydWU7XHJcbiAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgIH1cclxufSJdfQ==