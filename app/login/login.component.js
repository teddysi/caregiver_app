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
        this.ConnectorService.testingDownload();
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
        dialogs.alert({
            title: "Autenticação Validada",
            message: "Bem vindo(a) " + this.auth_user.name,
            okButtonText: "OK"
        }).then(function () {
            console.log("Dialog closed!");
        });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxzQ0FBeUU7QUFDekUsNENBQTJDO0FBQzNDLDREQUEwRDtBQUMxRCwyRUFBeUU7QUFDekUsNERBQTBEO0FBQzFELDBDQUF5QztBQUN6QyxnQ0FBK0I7QUFJL0Isb0NBQXVDO0FBU3ZDLElBQWEsY0FBYztJQUl2Qix3QkFBb0IsTUFBYyxFQUFVLFdBQXdCLEVBQVUsZ0JBQWtDLEVBQVUsSUFBVSxFQUFVLFdBQXdCO1FBQWxKLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUFVLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFBVSxTQUFJLEdBQUosSUFBSSxDQUFNO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFGdEssZ0JBQVcsR0FBRyxJQUFJLENBQUM7UUFHakIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLFdBQUksRUFBRSxDQUFDO0lBQzlCLENBQUM7SUFFRCxpQ0FBUSxHQUFSO1FBQ0UsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDakMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyx1QkFBdUIsRUFBRSxDQUFDLENBQUM7WUFDeEUsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2YsQ0FBQztRQUNELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN4QyxxSEFBcUg7SUFDdkgsQ0FBQztJQUVELCtCQUFNLEdBQU47UUFDRSxFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDbEQsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2hCLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLE9BQU8sQ0FBQyxLQUFLLENBQUM7Z0JBQ1YsS0FBSyxFQUFFLHNCQUFzQjtnQkFDN0IsT0FBTyxFQUFFLCtCQUErQjtnQkFDeEMsWUFBWSxFQUFFLElBQUk7YUFDckIsQ0FBQyxDQUFDLElBQUksQ0FBQztnQkFDSixPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFDbEMsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDO0lBQ0gsQ0FBQztJQUNELDhCQUFLLEdBQUw7UUFDRSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUNELCtCQUFNLEdBQU47UUFBQSxpQkFLQztRQUpDLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxTQUFTLENBQ2pELFVBQUMsTUFBTSxJQUFLLE9BQUEsS0FBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsRUFBMUIsQ0FBMEIsRUFDdEMsVUFBQyxLQUFLLElBQUssT0FBQSxLQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxFQUEzQixDQUEyQixDQUN2QyxDQUFDO0lBQ0osQ0FBQztJQUNELHNDQUFhLEdBQWIsVUFBYyxNQUFNO1FBQ2xCLCtDQUErQztRQUMvQyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNqQyxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUVwQyxPQUFPLENBQUMsS0FBSyxDQUFDO1lBQ1IsS0FBSyxFQUFFLHVCQUF1QjtZQUM5QixPQUFPLEVBQUUsZUFBZSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSTtZQUM5QyxZQUFZLEVBQUUsSUFBSTtTQUNyQixDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ0osT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ2xDLENBQUMsQ0FBQyxDQUFDO1FBRUwsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7UUFDcEMsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNkLENBQUM7SUFDRCx3Q0FBZSxHQUFmLFVBQWdCLEtBQUs7UUFFcEIsT0FBTyxDQUFDLEtBQUssQ0FBQztZQUNQLEtBQUssRUFBRSx3QkFBd0I7WUFDL0IsT0FBTyxFQUFFLHNFQUFzRTtZQUMvRSxZQUFZLEVBQUUsSUFBSTtTQUNyQixDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ0osT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ2xDLENBQUMsQ0FBQyxDQUFDO1FBQ0wsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUNmLENBQUM7SUFDTCxxQkFBQztBQUFELENBQUMsQUFuRUQsSUFtRUM7QUFuRVksY0FBYztJQVAxQixnQkFBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLFFBQVE7UUFDbEIsU0FBUyxFQUFFLEVBQUU7UUFDYixXQUFXLEVBQUUsa0JBQWtCO1FBQy9CLFNBQVMsRUFBRSxDQUFDLHdCQUF3QixFQUFFLGlCQUFpQixDQUFDO0tBQ3pELENBQUM7cUNBTThCLGVBQU0sRUFBdUIsMEJBQVcsRUFBNEIsb0NBQWdCLEVBQWdCLFdBQUksRUFBdUIsMEJBQVc7R0FKN0osY0FBYyxDQW1FMUI7QUFuRVksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIE9uSW5pdCwgVmlld0NoaWxkIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgVXNlciB9IGZyb20gXCIuLi9zaGFyZWQvdXNlci91c2VyXCI7XHJcbmltcG9ydCB7IFVzZXJTZXJ2aWNlIH0gZnJvbSBcIi4uL3NoYXJlZC91c2VyL3VzZXIuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBDb25uZWN0b3JTZXJ2aWNlIH0gZnJvbSBcIi4uL3NoYXJlZC9jb25uZWN0b3IvY29ubmVjdG9yLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgRGF0YVNlcnZpY2UgfSBmcm9tIFwiLi4vc2hhcmVkL2RhdGEvZGF0YS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XHJcbmltcG9ydCB7IENvbG9yIH0gZnJvbSBcImNvbG9yXCI7XHJcbmltcG9ydCB7IFZpZXcgfSBmcm9tIFwidWkvY29yZS92aWV3XCI7XHJcblxyXG5pbXBvcnQgZGlhbG9ncyA9IHJlcXVpcmUoXCJ1aS9kaWFsb2dzXCIpO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6IFwibXktYXBwXCIsXHJcbiAgcHJvdmlkZXJzOiBbXSxcclxuICB0ZW1wbGF0ZVVybDogXCJsb2dpbi9sb2dpbi5odG1sXCIsXHJcbiAgc3R5bGVVcmxzOiBbXCJsb2dpbi9sb2dpbi1jb21tb24uY3NzXCIsIFwibG9naW4vbG9naW4uY3NzXCJdLFxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIExvZ2luQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0e1xyXG4gICAgYXV0aF91c2VyOiBVc2VyO1xyXG4gICAgaXNMb2dnaW5nSW4gPSB0cnVlOyBcclxuICAgIFxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSB1c2VyU2VydmljZTogVXNlclNlcnZpY2UsIHByaXZhdGUgQ29ubmVjdG9yU2VydmljZTogQ29ubmVjdG9yU2VydmljZSwgcHJpdmF0ZSBwYWdlOiBQYWdlLCBwcml2YXRlIGRhdGFTZXJ2aWNlOiBEYXRhU2VydmljZSkge1xyXG4gICAgICB0aGlzLmF1dGhfdXNlciA9IG5ldyBVc2VyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgIGlmKHRoaXMuZGF0YVNlcnZpY2UuaXNVc2VyQXV0aCgpKSB7XHJcbiAgICAgICAgdGhpcy51c2VyU2VydmljZS5jcmVhdGVVc2VyKHRoaXMuZGF0YVNlcnZpY2UuZ2V0TGF0ZXN0VXNlclRvUmVnaXN0ZXIoKSk7IFxyXG4gICAgICAgIHRoaXMubG9naW4oKTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLkNvbm5lY3RvclNlcnZpY2UudGVzdGluZ0Rvd25sb2FkKCk7XHJcbiAgICAgIC8vdGIgc2UgcG9kZSBwb25kZXJhciBhIGV4cGlyYcOnw6NvIGRhIHRva2VuLiBzZSBqw6EgdGl2ZXIgbWFpcyBxdWUgWFggZGlhcywgYXBhZ2FyIGEgdG9rZW4gZSBtb3N0cmFyIGphbmVsYSBkZSBsb2dpbiAgIFxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBzdWJtaXQoKSB7ICAgICAgXHJcbiAgICAgIGlmKHRoaXMuYXV0aF91c2VyLm5hbWUgJiYgdGhpcy5hdXRoX3VzZXIucGFzc3dvcmQpIHtcclxuICAgICAgICB0aGlzLnNpZ25VcCgpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGRpYWxvZ3MuYWxlcnQoe1xyXG4gICAgICAgICAgICB0aXRsZTogXCJBdmlzbyAtIEF1dGVudGljYcOnw6NvXCIsXHJcbiAgICAgICAgICAgIG1lc3NhZ2U6IFwiUG9yIGZhdm9yIGNvbXBsZXRlIG9zIGNhbXBvcy5cIixcclxuICAgICAgICAgICAgb2tCdXR0b25UZXh0OiBcIk9LXCJcclxuICAgICAgICB9KS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJEaWFsb2cgY2xvc2VkIVwiKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfSAgXHJcbiAgICBsb2dpbigpIHtcclxuICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiL3BhdGllbnRzXCJdKTtcclxuICAgIH1cclxuICAgIHNpZ25VcCgpIHtcclxuICAgICAgdGhpcy51c2VyU2VydmljZS5yZWdpc3Rlcih0aGlzLmF1dGhfdXNlcikuc3Vic2NyaWJlKFxyXG4gICAgICAgIChyZXN1bHQpID0+IHRoaXMudmFsaWRSZWdpc3RlcihyZXN1bHQpLFxyXG4gICAgICAgIChlcnJvcikgPT4gdGhpcy5pbnZhbGlkUmVnaXN0ZXIoZXJyb3IpXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgICB2YWxpZFJlZ2lzdGVyKHJlc3VsdCkge1xyXG4gICAgICAvL2NvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHJlc3VsdCwgbnVsbCwgNCkpO1xyXG4gICAgICB0aGlzLmRhdGFTZXJ2aWNlLnNldFVzZXIocmVzdWx0KTtcclxuICAgICAgdGhpcy51c2VyU2VydmljZS5jcmVhdGVVc2VyKHJlc3VsdCk7XHJcbiAgICAgIFxyXG4gICAgICBkaWFsb2dzLmFsZXJ0KHtcclxuICAgICAgICAgICAgdGl0bGU6IFwiQXV0ZW50aWNhw6fDo28gVmFsaWRhZGFcIixcclxuICAgICAgICAgICAgbWVzc2FnZTogXCJCZW0gdmluZG8oYSkgXCIgKyB0aGlzLmF1dGhfdXNlci5uYW1lLFxyXG4gICAgICAgICAgICBva0J1dHRvblRleHQ6IFwiT0tcIlxyXG4gICAgICAgIH0pLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRpYWxvZyBjbG9zZWQhXCIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICBcclxuICAgICAgdGhpcy5kYXRhU2VydmljZS5zeW5jKCk7XHJcbiAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcIi9wYXRpZW50c1wiXSk7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgaW52YWxpZFJlZ2lzdGVyKGVycm9yKSB7XHJcbiAgICBcclxuICAgICBkaWFsb2dzLmFsZXJ0KHtcclxuICAgICAgICAgICAgdGl0bGU6IFwiRmFsaGEgbmEgYXV0ZW50aWNhw6fDo28uXCIsXHJcbiAgICAgICAgICAgIG1lc3NhZ2U6IFwiVmVyaWZpcXVlIG8gc2V1IGFjZXNzbyDDoCBJbnRlcm5ldCBlIGNvbmZpcm1lIG9zIHNldXMgZGFkb3MgZGUgYWNlc3NvXCIsXHJcbiAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogXCJPS1wiXHJcbiAgICAgICAgfSkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRGlhbG9nIGNsb3NlZCFcIik7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxufSJdfQ==