"use strict";
var core_1 = require("@angular/core");
var user_1 = require("../shared/user/user");
var user_service_1 = require("../shared/user/user.service");
var connector_service_1 = require("../shared/connector/connector.service");
var data_service_1 = require("../shared/data/data.service");
var router_1 = require("@angular/router");
var page_1 = require("ui/page");
var dialogs = require("ui/dialogs");
var LoginComponent = (function () {
    function LoginComponent(router, userService, ConnectorService, page, dataService) {
        this.router = router;
        this.userService = userService;
        this.ConnectorService = ConnectorService;
        this.page = page;
        this.dataService = dataService;
        this.isLoggingIn = true;
        this.auth_user = new user_1.User();
    }
    LoginComponent.prototype.ngOnInit = function () {
        if (this.dataService.isUserAuth()) {
            this.userService.createUser(this.dataService.getLatestUserToRegister());
            this.login();
        }
        //this.ConnectorService.testingDownload();
        //tb se pode ponderar a expiração da token. se já tiver mais que XX dias, apagar a token e mostrar janela de login   
    };
    LoginComponent.prototype.submit = function () {
        if (this.auth_user.name && this.auth_user.password) {
            this.signUp();
        }
        else {
            dialogs.alert({
                title: "Aviso - Autenticação",
                message: "Por favor complete os campos.",
                okButtonText: "OK"
            }).then(function () {
                console.log("Dialog closed!");
            });
        }
    };
    LoginComponent.prototype.login = function () {
        this.router.navigate(["/patients"]);
    };
    LoginComponent.prototype.signUp = function () {
        var _this = this;
        this.userService.register(this.auth_user).subscribe(function (result) { return _this.validRegister(result); }, function (error) { return _this.invalidRegister(error); });
    };
    LoginComponent.prototype.validRegister = function (result) {
        //console.log(JSON.stringify(result, null, 4));
        this.dataService.setUser(result);
        this.userService.createUser(result);
        this.dataService.sync();
        this.router.navigate(["/patients"]);
        return true;
    };
    LoginComponent.prototype.invalidRegister = function (error) {
        dialogs.alert({
            title: "Falha na autenticação.",
            message: "Verifique o seu acesso à Internet e confirme os seus dados de acesso",
            okButtonText: "OK"
        }).then(function () {
            console.log("Dialog closed!");
        });
        return false;
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    core_1.Component({
        selector: "my-app",
        providers: [],
        templateUrl: "login/login.html",
        styleUrls: ["login/login-common.css", "login/login.css"],
    }),
    __metadata("design:paramtypes", [router_1.Router, user_service_1.UserService, connector_service_1.ConnectorService, page_1.Page, data_service_1.DataService])
], LoginComponent);
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxzQ0FBeUU7QUFDekUsNENBQTJDO0FBQzNDLDREQUEwRDtBQUMxRCwyRUFBeUU7QUFDekUsNERBQTBEO0FBQzFELDBDQUF5QztBQUN6QyxnQ0FBK0I7QUFJL0Isb0NBQXVDO0FBU3ZDLElBQWEsY0FBYztJQUl2Qix3QkFBb0IsTUFBYyxFQUFVLFdBQXdCLEVBQVUsZ0JBQWtDLEVBQVUsSUFBVSxFQUFVLFdBQXdCO1FBQWxKLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUFVLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFBVSxTQUFJLEdBQUosSUFBSSxDQUFNO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFGdEssZ0JBQVcsR0FBRyxJQUFJLENBQUM7UUFHakIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLFdBQUksRUFBRSxDQUFDO0lBQzlCLENBQUM7SUFFRCxpQ0FBUSxHQUFSO1FBQ0UsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDakMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyx1QkFBdUIsRUFBRSxDQUFDLENBQUM7WUFDeEUsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2YsQ0FBQztRQUNELDBDQUEwQztRQUMxQyxxSEFBcUg7SUFDdkgsQ0FBQztJQUVELCtCQUFNLEdBQU47UUFDRSxFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDbEQsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2hCLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLE9BQU8sQ0FBQyxLQUFLLENBQUM7Z0JBQ1YsS0FBSyxFQUFFLHNCQUFzQjtnQkFDN0IsT0FBTyxFQUFFLCtCQUErQjtnQkFDeEMsWUFBWSxFQUFFLElBQUk7YUFDckIsQ0FBQyxDQUFDLElBQUksQ0FBQztnQkFDSixPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFDbEMsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDO0lBQ0gsQ0FBQztJQUNELDhCQUFLLEdBQUw7UUFDRSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUNELCtCQUFNLEdBQU47UUFBQSxpQkFLQztRQUpDLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxTQUFTLENBQ2pELFVBQUMsTUFBTSxJQUFLLE9BQUEsS0FBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsRUFBMUIsQ0FBMEIsRUFDdEMsVUFBQyxLQUFLLElBQUssT0FBQSxLQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxFQUEzQixDQUEyQixDQUN2QyxDQUFDO0lBQ0osQ0FBQztJQUNELHNDQUFhLEdBQWIsVUFBYyxNQUFNO1FBQ2xCLCtDQUErQztRQUMvQyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNqQyxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUVwQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztRQUNwQyxNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUNELHdDQUFlLEdBQWYsVUFBZ0IsS0FBSztRQUVwQixPQUFPLENBQUMsS0FBSyxDQUFDO1lBQ1AsS0FBSyxFQUFFLHdCQUF3QjtZQUMvQixPQUFPLEVBQUUsc0VBQXNFO1lBQy9FLFlBQVksRUFBRSxJQUFJO1NBQ3JCLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDSixPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDbEMsQ0FBQyxDQUFDLENBQUM7UUFDTCxNQUFNLENBQUMsS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUNMLHFCQUFDO0FBQUQsQ0FBQyxBQTNERCxJQTJEQztBQTNEWSxjQUFjO0lBUDFCLGdCQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsUUFBUTtRQUNsQixTQUFTLEVBQUUsRUFBRTtRQUNiLFdBQVcsRUFBRSxrQkFBa0I7UUFDL0IsU0FBUyxFQUFFLENBQUMsd0JBQXdCLEVBQUUsaUJBQWlCLENBQUM7S0FDekQsQ0FBQztxQ0FNOEIsZUFBTSxFQUF1QiwwQkFBVyxFQUE0QixvQ0FBZ0IsRUFBZ0IsV0FBSSxFQUF1QiwwQkFBVztHQUo3SixjQUFjLENBMkQxQjtBQTNEWSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgT25Jbml0LCBWaWV3Q2hpbGQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBVc2VyIH0gZnJvbSBcIi4uL3NoYXJlZC91c2VyL3VzZXJcIjtcclxuaW1wb3J0IHsgVXNlclNlcnZpY2UgfSBmcm9tIFwiLi4vc2hhcmVkL3VzZXIvdXNlci5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IENvbm5lY3RvclNlcnZpY2UgfSBmcm9tIFwiLi4vc2hhcmVkL2Nvbm5lY3Rvci9jb25uZWN0b3Iuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBEYXRhU2VydmljZSB9IGZyb20gXCIuLi9zaGFyZWQvZGF0YS9kYXRhLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjtcclxuaW1wb3J0IHsgQ29sb3IgfSBmcm9tIFwiY29sb3JcIjtcclxuaW1wb3J0IHsgVmlldyB9IGZyb20gXCJ1aS9jb3JlL3ZpZXdcIjtcclxuXHJcbmltcG9ydCBkaWFsb2dzID0gcmVxdWlyZShcInVpL2RpYWxvZ3NcIik7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogXCJteS1hcHBcIixcclxuICBwcm92aWRlcnM6IFtdLFxyXG4gIHRlbXBsYXRlVXJsOiBcImxvZ2luL2xvZ2luLmh0bWxcIixcclxuICBzdHlsZVVybHM6IFtcImxvZ2luL2xvZ2luLWNvbW1vbi5jc3NcIiwgXCJsb2dpbi9sb2dpbi5jc3NcIl0sXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgTG9naW5Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXR7XHJcbiAgICBhdXRoX3VzZXI6IFVzZXI7XHJcbiAgICBpc0xvZ2dpbmdJbiA9IHRydWU7IFxyXG4gICAgXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlcjogUm91dGVyLCBwcml2YXRlIHVzZXJTZXJ2aWNlOiBVc2VyU2VydmljZSwgcHJpdmF0ZSBDb25uZWN0b3JTZXJ2aWNlOiBDb25uZWN0b3JTZXJ2aWNlLCBwcml2YXRlIHBhZ2U6IFBhZ2UsIHByaXZhdGUgZGF0YVNlcnZpY2U6IERhdGFTZXJ2aWNlKSB7XHJcbiAgICAgIHRoaXMuYXV0aF91c2VyID0gbmV3IFVzZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgICAgaWYodGhpcy5kYXRhU2VydmljZS5pc1VzZXJBdXRoKCkpIHtcclxuICAgICAgICB0aGlzLnVzZXJTZXJ2aWNlLmNyZWF0ZVVzZXIodGhpcy5kYXRhU2VydmljZS5nZXRMYXRlc3RVc2VyVG9SZWdpc3RlcigpKTsgXHJcbiAgICAgICAgdGhpcy5sb2dpbigpO1xyXG4gICAgICB9XHJcbiAgICAgIC8vdGhpcy5Db25uZWN0b3JTZXJ2aWNlLnRlc3RpbmdEb3dubG9hZCgpO1xyXG4gICAgICAvL3RiIHNlIHBvZGUgcG9uZGVyYXIgYSBleHBpcmHDp8OjbyBkYSB0b2tlbi4gc2UgasOhIHRpdmVyIG1haXMgcXVlIFhYIGRpYXMsIGFwYWdhciBhIHRva2VuIGUgbW9zdHJhciBqYW5lbGEgZGUgbG9naW4gICBcclxuICAgIH1cclxuICAgIFxyXG4gICAgc3VibWl0KCkgeyAgICAgIFxyXG4gICAgICBpZih0aGlzLmF1dGhfdXNlci5uYW1lICYmIHRoaXMuYXV0aF91c2VyLnBhc3N3b3JkKSB7XHJcbiAgICAgICAgdGhpcy5zaWduVXAoKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBkaWFsb2dzLmFsZXJ0KHtcclxuICAgICAgICAgICAgdGl0bGU6IFwiQXZpc28gLSBBdXRlbnRpY2HDp8Ojb1wiLFxyXG4gICAgICAgICAgICBtZXNzYWdlOiBcIlBvciBmYXZvciBjb21wbGV0ZSBvcyBjYW1wb3MuXCIsXHJcbiAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogXCJPS1wiXHJcbiAgICAgICAgfSkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRGlhbG9nIGNsb3NlZCFcIik7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH0gIFxyXG4gICAgbG9naW4oKSB7XHJcbiAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcIi9wYXRpZW50c1wiXSk7XHJcbiAgICB9XHJcbiAgICBzaWduVXAoKSB7XHJcbiAgICAgIHRoaXMudXNlclNlcnZpY2UucmVnaXN0ZXIodGhpcy5hdXRoX3VzZXIpLnN1YnNjcmliZShcclxuICAgICAgICAocmVzdWx0KSA9PiB0aGlzLnZhbGlkUmVnaXN0ZXIocmVzdWx0KSxcclxuICAgICAgICAoZXJyb3IpID0+IHRoaXMuaW52YWxpZFJlZ2lzdGVyKGVycm9yKVxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gICAgdmFsaWRSZWdpc3RlcihyZXN1bHQpIHtcclxuICAgICAgLy9jb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShyZXN1bHQsIG51bGwsIDQpKTtcclxuICAgICAgdGhpcy5kYXRhU2VydmljZS5zZXRVc2VyKHJlc3VsdCk7XHJcbiAgICAgIHRoaXMudXNlclNlcnZpY2UuY3JlYXRlVXNlcihyZXN1bHQpO1xyXG4gICAgICBcclxuICAgICAgdGhpcy5kYXRhU2VydmljZS5zeW5jKCk7XHJcbiAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcIi9wYXRpZW50c1wiXSk7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgaW52YWxpZFJlZ2lzdGVyKGVycm9yKSB7XHJcbiAgICBcclxuICAgICBkaWFsb2dzLmFsZXJ0KHtcclxuICAgICAgICAgICAgdGl0bGU6IFwiRmFsaGEgbmEgYXV0ZW50aWNhw6fDo28uXCIsXHJcbiAgICAgICAgICAgIG1lc3NhZ2U6IFwiVmVyaWZpcXVlIG8gc2V1IGFjZXNzbyDDoCBJbnRlcm5ldCBlIGNvbmZpcm1lIG9zIHNldXMgZGFkb3MgZGUgYWNlc3NvXCIsXHJcbiAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogXCJPS1wiXHJcbiAgICAgICAgfSkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRGlhbG9nIGNsb3NlZCFcIik7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxufSJdfQ==