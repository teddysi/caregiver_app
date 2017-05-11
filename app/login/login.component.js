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
        var user_token = this.dataService.getToken();
        if (user_token) {
            this.userService.createUser(this.dataService.getLatestUserToRegister());
            this.login();
        }
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
        this.dataService.setUser(result);
        this.userService.createUser(this.dataService.getLatestUserToRegister());
        /*
        dialogs.alert({
              title: "Autenticação Validada",
              message: "Bem vindo(a) " + this.auth_user.name,
              okButtonText: "OK"
          }).then(() => {
              console.log("Dialog closed!");
          });
        */
        this.router.navigate(["/patients"]);
        return true;
    };
    LoginComponent.prototype.invalidRegister = function (error) {
        dialogs.alert({
            title: "Aviso - Autenticação",
            message: "Os dados introduzidos não são válidos.",
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
        providers: [user_service_1.UserService, connector_service_1.ConnectorService],
        templateUrl: "login/login.html",
        styleUrls: ["login/login-common.css", "login/login.css"],
    }),
    __metadata("design:paramtypes", [router_1.Router, user_service_1.UserService, connector_service_1.ConnectorService, page_1.Page, data_service_1.DataService])
], LoginComponent);
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxzQ0FBeUU7QUFDekUsNENBQTJDO0FBQzNDLDREQUEwRDtBQUMxRCwyRUFBeUU7QUFDekUsNERBQTBEO0FBQzFELDBDQUF5QztBQUN6QyxnQ0FBK0I7QUFJL0Isb0NBQXVDO0FBU3ZDLElBQWEsY0FBYztJQUl2Qix3QkFBb0IsTUFBYyxFQUFVLFdBQXdCLEVBQVUsZ0JBQWtDLEVBQVUsSUFBVSxFQUFVLFdBQXdCO1FBQWxKLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUFVLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFBVSxTQUFJLEdBQUosSUFBSSxDQUFNO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFGdEssZ0JBQVcsR0FBRyxJQUFJLENBQUM7UUFHakIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLFdBQUksRUFBRSxDQUFDO0lBQzlCLENBQUM7SUFFRCxpQ0FBUSxHQUFSO1FBQ0UsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUU3QyxFQUFFLENBQUEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQ2QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyx1QkFBdUIsRUFBRSxDQUFDLENBQUM7WUFDeEUsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2YsQ0FBQztRQUNELHFIQUFxSDtJQUN2SCxDQUFDO0lBRUQsK0JBQU0sR0FBTjtRQUNFLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNsRCxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDaEIsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sT0FBTyxDQUFDLEtBQUssQ0FBQztnQkFDVixLQUFLLEVBQUUsc0JBQXNCO2dCQUM3QixPQUFPLEVBQUUsK0JBQStCO2dCQUN4QyxZQUFZLEVBQUUsSUFBSTthQUNyQixDQUFDLENBQUMsSUFBSSxDQUFDO2dCQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUNsQyxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUM7SUFDSCxDQUFDO0lBQ0QsOEJBQUssR0FBTDtRQUNFLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQTtJQUNyQyxDQUFDO0lBQ0QsK0JBQU0sR0FBTjtRQUFBLGlCQUtDO1FBSkMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLFNBQVMsQ0FDakQsVUFBQyxNQUFNLElBQUssT0FBQSxLQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxFQUExQixDQUEwQixFQUN0QyxVQUFDLEtBQUssSUFBSyxPQUFBLEtBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLEVBQTNCLENBQTJCLENBQ3ZDLENBQUM7SUFDSixDQUFDO0lBQ0Qsc0NBQWEsR0FBYixVQUFjLE1BQU07UUFFbEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDakMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyx1QkFBdUIsRUFBRSxDQUFDLENBQUM7UUFDeEU7Ozs7Ozs7O1VBUUU7UUFDRixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7UUFDcEMsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRCx3Q0FBZSxHQUFmLFVBQWdCLEtBQUs7UUFDcEIsT0FBTyxDQUFDLEtBQUssQ0FBQztZQUNQLEtBQUssRUFBRSxzQkFBc0I7WUFDN0IsT0FBTyxFQUFFLHdDQUF3QztZQUNqRCxZQUFZLEVBQUUsSUFBSTtTQUNyQixDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ0osT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ2xDLENBQUMsQ0FBQyxDQUFDO1FBQ0wsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUNmLENBQUM7SUFDTCxxQkFBQztBQUFELENBQUMsQUFuRUQsSUFtRUM7QUFuRVksY0FBYztJQVAxQixnQkFBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLFFBQVE7UUFDbEIsU0FBUyxFQUFFLENBQUMsMEJBQVcsRUFBRSxvQ0FBZ0IsQ0FBQztRQUMxQyxXQUFXLEVBQUUsa0JBQWtCO1FBQy9CLFNBQVMsRUFBRSxDQUFDLHdCQUF3QixFQUFFLGlCQUFpQixDQUFDO0tBQ3pELENBQUM7cUNBTThCLGVBQU0sRUFBdUIsMEJBQVcsRUFBNEIsb0NBQWdCLEVBQWdCLFdBQUksRUFBdUIsMEJBQVc7R0FKN0osY0FBYyxDQW1FMUI7QUFuRVksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIE9uSW5pdCwgVmlld0NoaWxkIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgVXNlciB9IGZyb20gXCIuLi9zaGFyZWQvdXNlci91c2VyXCI7XHJcbmltcG9ydCB7IFVzZXJTZXJ2aWNlIH0gZnJvbSBcIi4uL3NoYXJlZC91c2VyL3VzZXIuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBDb25uZWN0b3JTZXJ2aWNlIH0gZnJvbSBcIi4uL3NoYXJlZC9jb25uZWN0b3IvY29ubmVjdG9yLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgRGF0YVNlcnZpY2UgfSBmcm9tIFwiLi4vc2hhcmVkL2RhdGEvZGF0YS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XHJcbmltcG9ydCB7IENvbG9yIH0gZnJvbSBcImNvbG9yXCI7XHJcbmltcG9ydCB7IFZpZXcgfSBmcm9tIFwidWkvY29yZS92aWV3XCI7XHJcblxyXG5pbXBvcnQgZGlhbG9ncyA9IHJlcXVpcmUoXCJ1aS9kaWFsb2dzXCIpO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6IFwibXktYXBwXCIsXHJcbiAgcHJvdmlkZXJzOiBbVXNlclNlcnZpY2UsIENvbm5lY3RvclNlcnZpY2VdLFxyXG4gIHRlbXBsYXRlVXJsOiBcImxvZ2luL2xvZ2luLmh0bWxcIixcclxuICBzdHlsZVVybHM6IFtcImxvZ2luL2xvZ2luLWNvbW1vbi5jc3NcIiwgXCJsb2dpbi9sb2dpbi5jc3NcIl0sXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgTG9naW5Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXR7XHJcbiAgICBhdXRoX3VzZXI6IFVzZXI7XHJcbiAgICBpc0xvZ2dpbmdJbiA9IHRydWU7IFxyXG4gICAgXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlcjogUm91dGVyLCBwcml2YXRlIHVzZXJTZXJ2aWNlOiBVc2VyU2VydmljZSwgcHJpdmF0ZSBDb25uZWN0b3JTZXJ2aWNlOiBDb25uZWN0b3JTZXJ2aWNlLCBwcml2YXRlIHBhZ2U6IFBhZ2UsIHByaXZhdGUgZGF0YVNlcnZpY2U6IERhdGFTZXJ2aWNlKSB7XHJcbiAgICAgIHRoaXMuYXV0aF91c2VyID0gbmV3IFVzZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgICAgdmFyIHVzZXJfdG9rZW4gPSB0aGlzLmRhdGFTZXJ2aWNlLmdldFRva2VuKCk7XHJcbiAgICAgXHJcbiAgICAgIGlmKHVzZXJfdG9rZW4pIHtcclxuICAgICAgICB0aGlzLnVzZXJTZXJ2aWNlLmNyZWF0ZVVzZXIodGhpcy5kYXRhU2VydmljZS5nZXRMYXRlc3RVc2VyVG9SZWdpc3RlcigpKTsgXHJcbiAgICAgICAgdGhpcy5sb2dpbigpO1xyXG4gICAgICB9XHJcbiAgICAgIC8vdGIgc2UgcG9kZSBwb25kZXJhciBhIGV4cGlyYcOnw6NvIGRhIHRva2VuLiBzZSBqw6EgdGl2ZXIgbWFpcyBxdWUgWFggZGlhcywgYXBhZ2FyIGEgdG9rZW4gZSBtb3N0cmFyIGphbmVsYSBkZSBsb2dpbiAgIFxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBzdWJtaXQoKSB7ICAgICAgXHJcbiAgICAgIGlmKHRoaXMuYXV0aF91c2VyLm5hbWUgJiYgdGhpcy5hdXRoX3VzZXIucGFzc3dvcmQpIHtcclxuICAgICAgICB0aGlzLnNpZ25VcCgpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGRpYWxvZ3MuYWxlcnQoe1xyXG4gICAgICAgICAgICB0aXRsZTogXCJBdmlzbyAtIEF1dGVudGljYcOnw6NvXCIsXHJcbiAgICAgICAgICAgIG1lc3NhZ2U6IFwiUG9yIGZhdm9yIGNvbXBsZXRlIG9zIGNhbXBvcy5cIixcclxuICAgICAgICAgICAgb2tCdXR0b25UZXh0OiBcIk9LXCJcclxuICAgICAgICB9KS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJEaWFsb2cgY2xvc2VkIVwiKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfSAgXHJcbiAgICBsb2dpbigpIHtcclxuICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiL3BhdGllbnRzXCJdKSAgXHJcbiAgICB9XHJcbiAgICBzaWduVXAoKSB7XHJcbiAgICAgIHRoaXMudXNlclNlcnZpY2UucmVnaXN0ZXIodGhpcy5hdXRoX3VzZXIpLnN1YnNjcmliZShcclxuICAgICAgICAocmVzdWx0KSA9PiB0aGlzLnZhbGlkUmVnaXN0ZXIocmVzdWx0KSxcclxuICAgICAgICAoZXJyb3IpID0+IHRoaXMuaW52YWxpZFJlZ2lzdGVyKGVycm9yKVxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gICAgdmFsaWRSZWdpc3RlcihyZXN1bHQpIHtcclxuXHJcbiAgICAgIHRoaXMuZGF0YVNlcnZpY2Uuc2V0VXNlcihyZXN1bHQpO1xyXG4gICAgICB0aGlzLnVzZXJTZXJ2aWNlLmNyZWF0ZVVzZXIodGhpcy5kYXRhU2VydmljZS5nZXRMYXRlc3RVc2VyVG9SZWdpc3RlcigpKTtcclxuICAgICAgLypcclxuICAgICAgZGlhbG9ncy5hbGVydCh7XHJcbiAgICAgICAgICAgIHRpdGxlOiBcIkF1dGVudGljYcOnw6NvIFZhbGlkYWRhXCIsXHJcbiAgICAgICAgICAgIG1lc3NhZ2U6IFwiQmVtIHZpbmRvKGEpIFwiICsgdGhpcy5hdXRoX3VzZXIubmFtZSxcclxuICAgICAgICAgICAgb2tCdXR0b25UZXh0OiBcIk9LXCJcclxuICAgICAgICB9KS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJEaWFsb2cgY2xvc2VkIVwiKTtcclxuICAgICAgICB9KTtcclxuICAgICAgKi9cclxuICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiL3BhdGllbnRzXCJdKTtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgaW52YWxpZFJlZ2lzdGVyKGVycm9yKSB7XHJcbiAgICAgZGlhbG9ncy5hbGVydCh7XHJcbiAgICAgICAgICAgIHRpdGxlOiBcIkF2aXNvIC0gQXV0ZW50aWNhw6fDo29cIixcclxuICAgICAgICAgICAgbWVzc2FnZTogXCJPcyBkYWRvcyBpbnRyb2R1emlkb3MgbsOjbyBzw6NvIHbDoWxpZG9zLlwiLFxyXG4gICAgICAgICAgICBva0J1dHRvblRleHQ6IFwiT0tcIlxyXG4gICAgICAgIH0pLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRpYWxvZyBjbG9zZWQhXCIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbn0iXX0=