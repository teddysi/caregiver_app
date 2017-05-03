"use strict";
var core_1 = require("@angular/core");
var user_1 = require("../shared/user/user");
var user_service_1 = require("../shared/user/user.service");
var connector_service_1 = require("../shared/connector/connector.service");
var data_service_1 = require("../shared/data/data.service");
var router_1 = require("@angular/router");
var page_1 = require("ui/page");
var LoginComponent = (function () {
    function LoginComponent(router, userService, ConnectorService, page, dataService) {
        this.router = router;
        this.userService = userService;
        this.ConnectorService = ConnectorService;
        this.page = page;
        this.dataService = dataService;
        this.isLoggingIn = true;
        this.user = new user_1.User();
    }
    LoginComponent.prototype.ngOnInit = function () {
        var user_token = this.dataService.getToken();
        if (user_token) {
            this.ConnectorService.setConnectorToken(user_token);
            this.login();
        }
        //tb se pode ponderar a expiração da token. se já tiver mais que XX dias, apagar a token e mostrar janela de login
    };
    LoginComponent.prototype.submit = function () {
        if (this.user.name && this.user.password) {
            this.signUp();
        }
        else {
            alert("Por favor complete os campos.");
        }
    };
    LoginComponent.prototype.login = function () {
        this.router.navigate(["/patients"]);
    };
    LoginComponent.prototype.signUp = function () {
        var _this = this;
        this.userService.register(this.user).subscribe(function (result) { return _this.validRegister(result); }, function (error) { return _this.invalidRegister(error); });
    };
    LoginComponent.prototype.validRegister = function (user) {
        this.dataService.setUser(user);
        this.router.navigate(["/patients"]);
        return true;
    };
    LoginComponent.prototype.invalidRegister = function (error) {
        alert("Utilizador não identificado.");
        console.log(error);
        return false;
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    core_1.Component({
        selector: "my-app",
        providers: [user_service_1.UserService, connector_service_1.ConnectorService],
        templateUrl: "login/login.html",
        styleUrls: ["login/login-common.css", "login/login.css"],
    }),
    __metadata("design:paramtypes", [router_1.Router, user_service_1.UserService, connector_service_1.ConnectorService, page_1.Page, data_service_1.DataService])
], LoginComponent);
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxzQ0FBeUU7QUFDekUsNENBQTJDO0FBQzNDLDREQUEwRDtBQUMxRCwyRUFBeUU7QUFDekUsNERBQTBEO0FBQzFELDBDQUF5QztBQUN6QyxnQ0FBK0I7QUFXL0IsSUFBYSxjQUFjO0lBR3ZCLHdCQUFvQixNQUFjLEVBQVUsV0FBd0IsRUFBVSxnQkFBa0MsRUFBVSxJQUFVLEVBQVUsV0FBd0I7UUFBbEosV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQVUscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUFVLFNBQUksR0FBSixJQUFJLENBQU07UUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUR0SyxnQkFBVyxHQUFHLElBQUksQ0FBQztRQUVqQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksV0FBSSxFQUFFLENBQUM7SUFDekIsQ0FBQztJQUVELGlDQUFRLEdBQVI7UUFDRSxJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBRTdDLEVBQUUsQ0FBQSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDZCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsaUJBQWlCLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDcEQsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2YsQ0FBQztRQUNELGtIQUFrSDtJQUNwSCxDQUFDO0lBRUQsK0JBQU0sR0FBTjtRQUNFLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUN4QyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDaEIsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sS0FBSyxDQUFDLCtCQUErQixDQUFDLENBQUM7UUFDekMsQ0FBQztJQUNILENBQUM7SUFHRCw4QkFBSyxHQUFMO1FBQ0UsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFBO0lBQ3JDLENBQUM7SUFDRCwrQkFBTSxHQUFOO1FBQUEsaUJBS0M7UUFKQyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUM1QyxVQUFDLE1BQU0sSUFBSyxPQUFBLEtBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLEVBQTFCLENBQTBCLEVBQ3RDLFVBQUMsS0FBSyxJQUFLLE9BQUEsS0FBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsRUFBM0IsQ0FBMkIsQ0FDdkMsQ0FBQztJQUNKLENBQUM7SUFFRCxzQ0FBYSxHQUFiLFVBQWMsSUFBSTtRQUNoQixJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMvQixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUE7UUFDbkMsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRCx3Q0FBZSxHQUFmLFVBQWdCLEtBQUs7UUFDbkIsS0FBSyxDQUFDLDhCQUE4QixDQUFDLENBQUM7UUFDdEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNuQixNQUFNLENBQUMsS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUNMLHFCQUFDO0FBQUQsQ0FBQyxBQS9DRCxJQStDQztBQS9DWSxjQUFjO0lBUDFCLGdCQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsUUFBUTtRQUNsQixTQUFTLEVBQUUsQ0FBQywwQkFBVyxFQUFFLG9DQUFnQixDQUFDO1FBQzFDLFdBQVcsRUFBRSxrQkFBa0I7UUFDL0IsU0FBUyxFQUFFLENBQUMsd0JBQXdCLEVBQUUsaUJBQWlCLENBQUM7S0FDekQsQ0FBQztxQ0FLOEIsZUFBTSxFQUF1QiwwQkFBVyxFQUE0QixvQ0FBZ0IsRUFBZ0IsV0FBSSxFQUF1QiwwQkFBVztHQUg3SixjQUFjLENBK0MxQjtBQS9DWSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgT25Jbml0LCBWaWV3Q2hpbGQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBVc2VyIH0gZnJvbSBcIi4uL3NoYXJlZC91c2VyL3VzZXJcIjtcclxuaW1wb3J0IHsgVXNlclNlcnZpY2UgfSBmcm9tIFwiLi4vc2hhcmVkL3VzZXIvdXNlci5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IENvbm5lY3RvclNlcnZpY2UgfSBmcm9tIFwiLi4vc2hhcmVkL2Nvbm5lY3Rvci9jb25uZWN0b3Iuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBEYXRhU2VydmljZSB9IGZyb20gXCIuLi9zaGFyZWQvZGF0YS9kYXRhLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjtcclxuaW1wb3J0IHsgQ29sb3IgfSBmcm9tIFwiY29sb3JcIjtcclxuaW1wb3J0IHsgVmlldyB9IGZyb20gXCJ1aS9jb3JlL3ZpZXdcIjtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiBcIm15LWFwcFwiLFxyXG4gIHByb3ZpZGVyczogW1VzZXJTZXJ2aWNlLCBDb25uZWN0b3JTZXJ2aWNlXSxcclxuICB0ZW1wbGF0ZVVybDogXCJsb2dpbi9sb2dpbi5odG1sXCIsXHJcbiAgc3R5bGVVcmxzOiBbXCJsb2dpbi9sb2dpbi1jb21tb24uY3NzXCIsIFwibG9naW4vbG9naW4uY3NzXCJdLFxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIExvZ2luQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0e1xyXG4gICAgdXNlcjogVXNlcjtcclxuICAgIGlzTG9nZ2luZ0luID0gdHJ1ZTsgXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlcjogUm91dGVyLCBwcml2YXRlIHVzZXJTZXJ2aWNlOiBVc2VyU2VydmljZSwgcHJpdmF0ZSBDb25uZWN0b3JTZXJ2aWNlOiBDb25uZWN0b3JTZXJ2aWNlLCBwcml2YXRlIHBhZ2U6IFBhZ2UsIHByaXZhdGUgZGF0YVNlcnZpY2U6IERhdGFTZXJ2aWNlKSB7XHJcbiAgICAgIHRoaXMudXNlciA9IG5ldyBVc2VyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgIHZhciB1c2VyX3Rva2VuID0gdGhpcy5kYXRhU2VydmljZS5nZXRUb2tlbigpO1xyXG4gICAgIFxyXG4gICAgICBpZih1c2VyX3Rva2VuKSB7XHJcbiAgICAgICAgdGhpcy5Db25uZWN0b3JTZXJ2aWNlLnNldENvbm5lY3RvclRva2VuKHVzZXJfdG9rZW4pO1xyXG4gICAgICAgIHRoaXMubG9naW4oKTtcclxuICAgICAgfVxyXG4gICAgICAvL3RiIHNlIHBvZGUgcG9uZGVyYXIgYSBleHBpcmHDp8OjbyBkYSB0b2tlbi4gc2UgasOhIHRpdmVyIG1haXMgcXVlIFhYIGRpYXMsIGFwYWdhciBhIHRva2VuIGUgbW9zdHJhciBqYW5lbGEgZGUgbG9naW5cclxuICAgIH1cclxuICAgIFxyXG4gICAgc3VibWl0KCkgeyAgICAgIFxyXG4gICAgICBpZih0aGlzLnVzZXIubmFtZSAmJiB0aGlzLnVzZXIucGFzc3dvcmQpIHtcclxuICAgICAgICB0aGlzLnNpZ25VcCgpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGFsZXJ0KFwiUG9yIGZhdm9yIGNvbXBsZXRlIG9zIGNhbXBvcy5cIik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBcclxuICAgIGxvZ2luKCkgeyAgIFxyXG4gICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCIvcGF0aWVudHNcIl0pICBcclxuICAgIH1cclxuICAgIHNpZ25VcCgpIHtcclxuICAgICAgdGhpcy51c2VyU2VydmljZS5yZWdpc3Rlcih0aGlzLnVzZXIpLnN1YnNjcmliZShcclxuICAgICAgICAocmVzdWx0KSA9PiB0aGlzLnZhbGlkUmVnaXN0ZXIocmVzdWx0KSxcclxuICAgICAgICAoZXJyb3IpID0+IHRoaXMuaW52YWxpZFJlZ2lzdGVyKGVycm9yKVxyXG4gICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHZhbGlkUmVnaXN0ZXIodXNlcikge1xyXG4gICAgICB0aGlzLmRhdGFTZXJ2aWNlLnNldFVzZXIodXNlcik7XHJcbiAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcIi9wYXRpZW50c1wiXSlcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgaW52YWxpZFJlZ2lzdGVyKGVycm9yKSB7XHJcbiAgICAgIGFsZXJ0KFwiVXRpbGl6YWRvciBuw6NvIGlkZW50aWZpY2Fkby5cIik7XHJcbiAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG59Il19