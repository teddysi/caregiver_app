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
        this.dataService.sync();
        //this.router.navigate(["/patients"])  
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
        //this.router.navigate(["/patients"]);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxzQ0FBeUU7QUFDekUsNENBQTJDO0FBQzNDLDREQUEwRDtBQUMxRCwyRUFBeUU7QUFDekUsNERBQTBEO0FBQzFELDBDQUF5QztBQUN6QyxnQ0FBK0I7QUFJL0Isb0NBQXVDO0FBU3ZDLElBQWEsY0FBYztJQUl2Qix3QkFBb0IsTUFBYyxFQUFVLFdBQXdCLEVBQVUsZ0JBQWtDLEVBQVUsSUFBVSxFQUFVLFdBQXdCO1FBQWxKLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUFVLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFBVSxTQUFJLEdBQUosSUFBSSxDQUFNO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFGdEssZ0JBQVcsR0FBRyxJQUFJLENBQUM7UUFHakIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLFdBQUksRUFBRSxDQUFDO0lBQzlCLENBQUM7SUFFRCxpQ0FBUSxHQUFSO1FBQ0UsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDakMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyx1QkFBdUIsRUFBRSxDQUFDLENBQUM7WUFDeEUsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2YsQ0FBQztRQUNELHFIQUFxSDtJQUN2SCxDQUFDO0lBRUQsK0JBQU0sR0FBTjtRQUNFLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNsRCxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDaEIsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sT0FBTyxDQUFDLEtBQUssQ0FBQztnQkFDVixLQUFLLEVBQUUsc0JBQXNCO2dCQUM3QixPQUFPLEVBQUUsK0JBQStCO2dCQUN4QyxZQUFZLEVBQUUsSUFBSTthQUNyQixDQUFDLENBQUMsSUFBSSxDQUFDO2dCQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUNsQyxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUM7SUFDSCxDQUFDO0lBQ0QsOEJBQUssR0FBTDtRQUNFLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDeEIsdUNBQXVDO0lBQ3pDLENBQUM7SUFDRCwrQkFBTSxHQUFOO1FBQUEsaUJBS0M7UUFKQyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsU0FBUyxDQUNqRCxVQUFDLE1BQU0sSUFBSyxPQUFBLEtBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLEVBQTFCLENBQTBCLEVBQ3RDLFVBQUMsS0FBSyxJQUFLLE9BQUEsS0FBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsRUFBM0IsQ0FBMkIsQ0FDdkMsQ0FBQztJQUNKLENBQUM7SUFDRCxzQ0FBYSxHQUFiLFVBQWMsTUFBTTtRQUNsQiwrQ0FBK0M7UUFDL0MsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDakMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFcEMsT0FBTyxDQUFDLEtBQUssQ0FBQztZQUNSLEtBQUssRUFBRSx1QkFBdUI7WUFDOUIsT0FBTyxFQUFFLGVBQWUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUk7WUFDOUMsWUFBWSxFQUFFLElBQUk7U0FDckIsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUNsQyxDQUFDLENBQUMsQ0FBQztRQUVMLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDeEIsc0NBQXNDO1FBQ3RDLE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBQ0Qsd0NBQWUsR0FBZixVQUFnQixLQUFLO1FBRXBCLE9BQU8sQ0FBQyxLQUFLLENBQUM7WUFDUCxLQUFLLEVBQUUsd0JBQXdCO1lBQy9CLE9BQU8sRUFBRSxzRUFBc0U7WUFDL0UsWUFBWSxFQUFFLElBQUk7U0FDckIsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUNsQyxDQUFDLENBQUMsQ0FBQztRQUNMLE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFDZixDQUFDO0lBQ0wscUJBQUM7QUFBRCxDQUFDLEFBbkVELElBbUVDO0FBbkVZLGNBQWM7SUFQMUIsZ0JBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxRQUFRO1FBQ2xCLFNBQVMsRUFBRSxFQUFFO1FBQ2IsV0FBVyxFQUFFLGtCQUFrQjtRQUMvQixTQUFTLEVBQUUsQ0FBQyx3QkFBd0IsRUFBRSxpQkFBaUIsQ0FBQztLQUN6RCxDQUFDO3FDQU04QixlQUFNLEVBQXVCLDBCQUFXLEVBQTRCLG9DQUFnQixFQUFnQixXQUFJLEVBQXVCLDBCQUFXO0dBSjdKLGNBQWMsQ0FtRTFCO0FBbkVZLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBPbkluaXQsIFZpZXdDaGlsZCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IFVzZXIgfSBmcm9tIFwiLi4vc2hhcmVkL3VzZXIvdXNlclwiO1xyXG5pbXBvcnQgeyBVc2VyU2VydmljZSB9IGZyb20gXCIuLi9zaGFyZWQvdXNlci91c2VyLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgQ29ubmVjdG9yU2VydmljZSB9IGZyb20gXCIuLi9zaGFyZWQvY29ubmVjdG9yL2Nvbm5lY3Rvci5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IERhdGFTZXJ2aWNlIH0gZnJvbSBcIi4uL3NoYXJlZC9kYXRhL2RhdGEuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiO1xyXG5pbXBvcnQgeyBDb2xvciB9IGZyb20gXCJjb2xvclwiO1xyXG5pbXBvcnQgeyBWaWV3IH0gZnJvbSBcInVpL2NvcmUvdmlld1wiO1xyXG5cclxuaW1wb3J0IGRpYWxvZ3MgPSByZXF1aXJlKFwidWkvZGlhbG9nc1wiKTtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiBcIm15LWFwcFwiLFxyXG4gIHByb3ZpZGVyczogW10sXHJcbiAgdGVtcGxhdGVVcmw6IFwibG9naW4vbG9naW4uaHRtbFwiLFxyXG4gIHN0eWxlVXJsczogW1wibG9naW4vbG9naW4tY29tbW9uLmNzc1wiLCBcImxvZ2luL2xvZ2luLmNzc1wiXSxcclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBMb2dpbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdHtcclxuICAgIGF1dGhfdXNlcjogVXNlcjtcclxuICAgIGlzTG9nZ2luZ0luID0gdHJ1ZTsgXHJcbiAgICBcclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgdXNlclNlcnZpY2U6IFVzZXJTZXJ2aWNlLCBwcml2YXRlIENvbm5lY3RvclNlcnZpY2U6IENvbm5lY3RvclNlcnZpY2UsIHByaXZhdGUgcGFnZTogUGFnZSwgcHJpdmF0ZSBkYXRhU2VydmljZTogRGF0YVNlcnZpY2UpIHtcclxuICAgICAgdGhpcy5hdXRoX3VzZXIgPSBuZXcgVXNlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICBpZih0aGlzLmRhdGFTZXJ2aWNlLmlzVXNlckF1dGgoKSkge1xyXG4gICAgICAgIHRoaXMudXNlclNlcnZpY2UuY3JlYXRlVXNlcih0aGlzLmRhdGFTZXJ2aWNlLmdldExhdGVzdFVzZXJUb1JlZ2lzdGVyKCkpOyBcclxuICAgICAgICB0aGlzLmxvZ2luKCk7XHJcbiAgICAgIH1cclxuICAgICAgLy90YiBzZSBwb2RlIHBvbmRlcmFyIGEgZXhwaXJhw6fDo28gZGEgdG9rZW4uIHNlIGrDoSB0aXZlciBtYWlzIHF1ZSBYWCBkaWFzLCBhcGFnYXIgYSB0b2tlbiBlIG1vc3RyYXIgamFuZWxhIGRlIGxvZ2luICAgXHJcbiAgICB9XHJcbiAgICBcclxuICAgIHN1Ym1pdCgpIHsgICAgICBcclxuICAgICAgaWYodGhpcy5hdXRoX3VzZXIubmFtZSAmJiB0aGlzLmF1dGhfdXNlci5wYXNzd29yZCkge1xyXG4gICAgICAgIHRoaXMuc2lnblVwKCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZGlhbG9ncy5hbGVydCh7XHJcbiAgICAgICAgICAgIHRpdGxlOiBcIkF2aXNvIC0gQXV0ZW50aWNhw6fDo29cIixcclxuICAgICAgICAgICAgbWVzc2FnZTogXCJQb3IgZmF2b3IgY29tcGxldGUgb3MgY2FtcG9zLlwiLFxyXG4gICAgICAgICAgICBva0J1dHRvblRleHQ6IFwiT0tcIlxyXG4gICAgICAgIH0pLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRpYWxvZyBjbG9zZWQhXCIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9ICBcclxuICAgIGxvZ2luKCkge1xyXG4gICAgICB0aGlzLmRhdGFTZXJ2aWNlLnN5bmMoKTtcclxuICAgICAgLy90aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCIvcGF0aWVudHNcIl0pICBcclxuICAgIH1cclxuICAgIHNpZ25VcCgpIHtcclxuICAgICAgdGhpcy51c2VyU2VydmljZS5yZWdpc3Rlcih0aGlzLmF1dGhfdXNlcikuc3Vic2NyaWJlKFxyXG4gICAgICAgIChyZXN1bHQpID0+IHRoaXMudmFsaWRSZWdpc3RlcihyZXN1bHQpLFxyXG4gICAgICAgIChlcnJvcikgPT4gdGhpcy5pbnZhbGlkUmVnaXN0ZXIoZXJyb3IpXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgICB2YWxpZFJlZ2lzdGVyKHJlc3VsdCkge1xyXG4gICAgICAvL2NvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHJlc3VsdCwgbnVsbCwgNCkpO1xyXG4gICAgICB0aGlzLmRhdGFTZXJ2aWNlLnNldFVzZXIocmVzdWx0KTtcclxuICAgICAgdGhpcy51c2VyU2VydmljZS5jcmVhdGVVc2VyKHJlc3VsdCk7XHJcbiAgICAgIFxyXG4gICAgICBkaWFsb2dzLmFsZXJ0KHtcclxuICAgICAgICAgICAgdGl0bGU6IFwiQXV0ZW50aWNhw6fDo28gVmFsaWRhZGFcIixcclxuICAgICAgICAgICAgbWVzc2FnZTogXCJCZW0gdmluZG8oYSkgXCIgKyB0aGlzLmF1dGhfdXNlci5uYW1lLFxyXG4gICAgICAgICAgICBva0J1dHRvblRleHQ6IFwiT0tcIlxyXG4gICAgICAgIH0pLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRpYWxvZyBjbG9zZWQhXCIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICBcclxuICAgICAgdGhpcy5kYXRhU2VydmljZS5zeW5jKCk7XHJcbiAgICAgIC8vdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiL3BhdGllbnRzXCJdKTtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICBpbnZhbGlkUmVnaXN0ZXIoZXJyb3IpIHtcclxuICAgIFxyXG4gICAgIGRpYWxvZ3MuYWxlcnQoe1xyXG4gICAgICAgICAgICB0aXRsZTogXCJGYWxoYSBuYSBhdXRlbnRpY2HDp8Ojby5cIixcclxuICAgICAgICAgICAgbWVzc2FnZTogXCJWZXJpZmlxdWUgbyBzZXUgYWNlc3NvIMOgIEludGVybmV0IGUgY29uZmlybWUgb3Mgc2V1cyBkYWRvcyBkZSBhY2Vzc29cIixcclxuICAgICAgICAgICAgb2tCdXR0b25UZXh0OiBcIk9LXCJcclxuICAgICAgICB9KS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJEaWFsb2cgY2xvc2VkIVwiKTtcclxuICAgICAgICB9KTtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG59Il19