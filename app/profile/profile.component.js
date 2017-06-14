"use strict";
var core_1 = require("@angular/core");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZmlsZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwcm9maWxlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsc0NBQWtEO0FBR2xELDRDQUEyQztBQUMzQyw0REFBMEQ7QUFFMUQsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFFLG9CQUFvQixDQUFFLENBQUM7QUFTNUMsSUFBYSxnQkFBZ0I7SUFHekIsMEJBQW9CLFdBQXdCO1FBQXhCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQzFDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxXQUFJLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBRUQsbUNBQVEsR0FBUjtRQUNJLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUMvQyxDQUFDO0lBRUQsMkNBQWdCLEdBQWhCO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQsNENBQWlCLEdBQWpCO1FBQ0ksS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDOUIsMkNBQTJDO0lBQy9DLENBQUM7SUFDTCx1QkFBQztBQUFELENBQUMsQUFuQkQsSUFtQkM7QUFuQlksZ0JBQWdCO0lBUDVCLGdCQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsRUFBRTtRQUNaLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtRQUNuQixTQUFTLEVBQUUsRUFBRTtRQUNiLFNBQVMsRUFBRSxDQUFDLGVBQWUsQ0FBQztRQUM1QixXQUFXLEVBQUUsMEJBQTBCO0tBQzFDLENBQUM7cUNBSW1DLDBCQUFXO0dBSG5DLGdCQUFnQixDQW1CNUI7QUFuQlksNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgYXBwID0gcmVxdWlyZShcImFwcGxpY2F0aW9uXCIpO1xyXG5pbXBvcnQgcGxhdGZvcm0gPSByZXF1aXJlKFwicGxhdGZvcm1cIik7XHJcbmltcG9ydCB7IFVzZXIgfSBmcm9tIFwiLi4vc2hhcmVkL3VzZXIvdXNlclwiO1xyXG5pbXBvcnQgeyBVc2VyU2VydmljZSB9IGZyb20gXCIuLi9zaGFyZWQvdXNlci91c2VyLnNlcnZpY2VcIjtcclxuXHJcbnZhciBwaG9uZSA9IHJlcXVpcmUoIFwibmF0aXZlc2NyaXB0LXBob25lXCIgKTtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6IFwiXCIsXHJcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gICAgcHJvdmlkZXJzOiBbXSxcclxuICAgIHN0eWxlVXJsczogW1wiLi9wcm9maWxlLmNzc1wiXSxcclxuICAgIHRlbXBsYXRlVXJsOiBcIi4vcHJvZmlsZS5jb21wb25lbnQuaHRtbFwiLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgUHJvZmlsZUNvbXBvbmVudHtcclxuICAgIGFwcF91c2VyOiBVc2VyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgdXNlclNlcnZpY2U6IFVzZXJTZXJ2aWNlKSB7XHJcbiAgICAgIHRoaXMuYXBwX3VzZXIgPSBuZXcgVXNlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICAgIHRoaXMuYXBwX3VzZXIgPSB0aGlzLnVzZXJTZXJ2aWNlLmdldFVzZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBoYXNPdGhlckNvbnRhY3RzKCkge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGNhbGxIZWFsdGhDb250YWN0ICgpIHtcclxuICAgICAgICBwaG9uZS5kaWFsKFwiOTk5OTk5OTk5XCIsIHRydWUpO1xyXG4gICAgICAgIC8vcGhvbmUuZGlhbChhcHBfdXNlci5oZWFsdGhDb250YWN0LCB0cnVlKTtcclxuICAgIH1cclxufSJdfQ==