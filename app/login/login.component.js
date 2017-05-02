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
        console.log(user_token);
        if (user_token) {
            this.login();
        }
        //se o utilizador tiver token guardada entrar no ecrã seguinte->os meus pacientes e saltar o registo. ou seja aqui faz sempre o login automaticamente com a token.
        //
        //tb se pode ponderar a expiração da token. se já tiver mais que XX dias, apagar a token e mostrar janela de login
    };
    LoginComponent.prototype.submit = function () {
        if (this.user.name && this.user.password) {
            this.signUp();
        }
        else {
            alert("Por favor complete os campos.");
        }
        this.login();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxzQ0FBeUU7QUFDekUsNENBQTJDO0FBQzNDLDREQUEwRDtBQUMxRCwyRUFBeUU7QUFDekUsNERBQTBEO0FBQzFELDBDQUF5QztBQUN6QyxnQ0FBK0I7QUFXL0IsSUFBYSxjQUFjO0lBSXZCLHdCQUFvQixNQUFjLEVBQVUsV0FBd0IsRUFBVSxnQkFBa0MsRUFBVSxJQUFVLEVBQVUsV0FBd0I7UUFBbEosV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQVUscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUFVLFNBQUksR0FBSixJQUFJLENBQU07UUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUZ0SyxnQkFBVyxHQUFHLElBQUksQ0FBQztRQUdqQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksV0FBSSxFQUFFLENBQUM7SUFDekIsQ0FBQztJQUVELGlDQUFRLEdBQVI7UUFDRSxJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQzdDLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDeEIsRUFBRSxDQUFBLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUNkLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNmLENBQUM7UUFDRCxrS0FBa0s7UUFDbEssRUFBRTtRQUNGLGtIQUFrSDtJQUVwSCxDQUFDO0lBRUQsK0JBQU0sR0FBTjtRQUNFLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUN4QyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDaEIsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sS0FBSyxDQUFDLCtCQUErQixDQUFDLENBQUM7UUFDekMsQ0FBQztRQUVELElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNmLENBQUM7SUFHRCw4QkFBSyxHQUFMO1FBQ0UsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFBO0lBQ3JDLENBQUM7SUFDRCwrQkFBTSxHQUFOO1FBQUEsaUJBS0M7UUFKQyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUM1QyxVQUFDLE1BQU0sSUFBSyxPQUFBLEtBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLEVBQTFCLENBQTBCLEVBQ3RDLFVBQUMsS0FBSyxJQUFLLE9BQUEsS0FBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsRUFBM0IsQ0FBMkIsQ0FDdkMsQ0FBQztJQUNKLENBQUM7SUFFRCxzQ0FBYSxHQUFiLFVBQWMsSUFBSTtRQUNoQixJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMvQixNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVELHdDQUFlLEdBQWYsVUFBZ0IsS0FBSztRQUNuQixLQUFLLENBQUMsOEJBQThCLENBQUMsQ0FBQztRQUN0QyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ25CLE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFDZixDQUFDO0lBQ0wscUJBQUM7QUFBRCxDQUFDLEFBbkRELElBbURDO0FBbkRZLGNBQWM7SUFQMUIsZ0JBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxRQUFRO1FBQ2xCLFNBQVMsRUFBRSxDQUFDLDBCQUFXLEVBQUUsb0NBQWdCLENBQUM7UUFDMUMsV0FBVyxFQUFFLGtCQUFrQjtRQUMvQixTQUFTLEVBQUUsQ0FBQyx3QkFBd0IsRUFBRSxpQkFBaUIsQ0FBQztLQUN6RCxDQUFDO3FDQU04QixlQUFNLEVBQXVCLDBCQUFXLEVBQTRCLG9DQUFnQixFQUFnQixXQUFJLEVBQXVCLDBCQUFXO0dBSjdKLGNBQWMsQ0FtRDFCO0FBbkRZLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBPbkluaXQsIFZpZXdDaGlsZCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IFVzZXIgfSBmcm9tIFwiLi4vc2hhcmVkL3VzZXIvdXNlclwiO1xyXG5pbXBvcnQgeyBVc2VyU2VydmljZSB9IGZyb20gXCIuLi9zaGFyZWQvdXNlci91c2VyLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgQ29ubmVjdG9yU2VydmljZSB9IGZyb20gXCIuLi9zaGFyZWQvY29ubmVjdG9yL2Nvbm5lY3Rvci5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IERhdGFTZXJ2aWNlIH0gZnJvbSBcIi4uL3NoYXJlZC9kYXRhL2RhdGEuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiO1xyXG5pbXBvcnQgeyBDb2xvciB9IGZyb20gXCJjb2xvclwiO1xyXG5pbXBvcnQgeyBWaWV3IH0gZnJvbSBcInVpL2NvcmUvdmlld1wiO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6IFwibXktYXBwXCIsXHJcbiAgcHJvdmlkZXJzOiBbVXNlclNlcnZpY2UsIENvbm5lY3RvclNlcnZpY2VdLFxyXG4gIHRlbXBsYXRlVXJsOiBcImxvZ2luL2xvZ2luLmh0bWxcIixcclxuICBzdHlsZVVybHM6IFtcImxvZ2luL2xvZ2luLWNvbW1vbi5jc3NcIiwgXCJsb2dpbi9sb2dpbi5jc3NcIl0sXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgTG9naW5Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXR7XHJcbiAgICB1c2VyOiBVc2VyO1xyXG4gICAgaXNMb2dnaW5nSW4gPSB0cnVlO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgdXNlclNlcnZpY2U6IFVzZXJTZXJ2aWNlLCBwcml2YXRlIENvbm5lY3RvclNlcnZpY2U6IENvbm5lY3RvclNlcnZpY2UsIHByaXZhdGUgcGFnZTogUGFnZSwgcHJpdmF0ZSBkYXRhU2VydmljZTogRGF0YVNlcnZpY2UpIHtcclxuICAgICAgdGhpcy51c2VyID0gbmV3IFVzZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgICAgdmFyIHVzZXJfdG9rZW4gPSB0aGlzLmRhdGFTZXJ2aWNlLmdldFRva2VuKCk7XHJcbiAgICAgIGNvbnNvbGUubG9nKHVzZXJfdG9rZW4pO1xyXG4gICAgICBpZih1c2VyX3Rva2VuKSB7XHJcbiAgICAgICAgdGhpcy5sb2dpbigpO1xyXG4gICAgICB9XHJcbiAgICAgIC8vc2UgbyB1dGlsaXphZG9yIHRpdmVyIHRva2VuIGd1YXJkYWRhIGVudHJhciBubyBlY3LDoyBzZWd1aW50ZS0+b3MgbWV1cyBwYWNpZW50ZXMgZSBzYWx0YXIgbyByZWdpc3RvLiBvdSBzZWphIGFxdWkgZmF6IHNlbXByZSBvIGxvZ2luIGF1dG9tYXRpY2FtZW50ZSBjb20gYSB0b2tlbi5cclxuICAgICAgLy9cclxuICAgICAgLy90YiBzZSBwb2RlIHBvbmRlcmFyIGEgZXhwaXJhw6fDo28gZGEgdG9rZW4uIHNlIGrDoSB0aXZlciBtYWlzIHF1ZSBYWCBkaWFzLCBhcGFnYXIgYSB0b2tlbiBlIG1vc3RyYXIgamFuZWxhIGRlIGxvZ2luXHJcbiAgICAgIFxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBzdWJtaXQoKSB7ICAgICAgXHJcbiAgICAgIGlmKHRoaXMudXNlci5uYW1lICYmIHRoaXMudXNlci5wYXNzd29yZCkge1xyXG4gICAgICAgIHRoaXMuc2lnblVwKCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgYWxlcnQoXCJQb3IgZmF2b3IgY29tcGxldGUgb3MgY2FtcG9zLlwiKTtcclxuICAgICAgfVxyXG4gICAgICBcclxuICAgICAgdGhpcy5sb2dpbigpO1xyXG4gICAgfVxyXG5cclxuICAgIFxyXG4gICAgbG9naW4oKSB7ICAgXHJcbiAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcIi9wYXRpZW50c1wiXSkgIFxyXG4gICAgfVxyXG4gICAgc2lnblVwKCkge1xyXG4gICAgICB0aGlzLnVzZXJTZXJ2aWNlLnJlZ2lzdGVyKHRoaXMudXNlcikuc3Vic2NyaWJlKFxyXG4gICAgICAgIChyZXN1bHQpID0+IHRoaXMudmFsaWRSZWdpc3RlcihyZXN1bHQpLFxyXG4gICAgICAgIChlcnJvcikgPT4gdGhpcy5pbnZhbGlkUmVnaXN0ZXIoZXJyb3IpXHJcbiAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgdmFsaWRSZWdpc3Rlcih1c2VyKSB7XHJcbiAgICAgIHRoaXMuZGF0YVNlcnZpY2Uuc2V0VXNlcih1c2VyKTtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgaW52YWxpZFJlZ2lzdGVyKGVycm9yKSB7XHJcbiAgICAgIGFsZXJ0KFwiVXRpbGl6YWRvciBuw6NvIGlkZW50aWZpY2Fkby5cIik7XHJcbiAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG59Il19