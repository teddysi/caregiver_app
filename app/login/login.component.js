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
        this.user = new user_1.User();
    }
    LoginComponent.prototype.ngOnInit = function () {
        var user_token = this.dataService.getToken();
        if (user_token) {
            this.userService.createUser(this.dataService.getLatestUserToRegister());
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
            dialogs.alert({
                title: "Aviso - Autenticação",
                message: "Por favor complete os campos.",
                okButtonText: "OK"
            }).then(function () {
                console.log("Dialog closed!");
            });
        }
        //this.login();
    };
    LoginComponent.prototype.login = function () {
        console.log('AQUI');
        console.log(JSON.stringify(this.userService.getUser()));
        this.router.navigate(["/patients"]);
    };
    LoginComponent.prototype.signUp = function () {
        var _this = this;
        this.userService.register(this.user).subscribe(function (result) { return _this.validRegister(result); }, function (error) { return _this.invalidRegister(error); });
    };
    LoginComponent.prototype.validRegister = function (user) {
        this.dataService.setUser(user);
        this.userService.createUser(this.dataService.getLatestUserToRegister());
        dialogs.alert({
            title: "Autenticação Validada",
            message: "Bem vindo(a) " + user.name,
            okButtonText: "OK"
        }).then(function () {
            console.log("Dialog closed!");
        });
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
    LoginComponent.prototype.saveUserSuccessfull = function (result) {
        console.log('User saved in BD and Object created');
        return true;
    };
    LoginComponent.prototype.saveUserError = function (error) {
        console.log('User wasnt saved');
        console.log(error);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxzQ0FBeUU7QUFDekUsNENBQTJDO0FBQzNDLDREQUEwRDtBQUMxRCwyRUFBeUU7QUFDekUsNERBQTBEO0FBQzFELDBDQUF5QztBQUN6QyxnQ0FBK0I7QUFJL0Isb0NBQXVDO0FBU3ZDLElBQWEsY0FBYztJQUd2Qix3QkFBb0IsTUFBYyxFQUFVLFdBQXdCLEVBQVUsZ0JBQWtDLEVBQVUsSUFBVSxFQUFVLFdBQXdCO1FBQWxKLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUFVLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFBVSxTQUFJLEdBQUosSUFBSSxDQUFNO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFEdEssZ0JBQVcsR0FBRyxJQUFJLENBQUM7UUFFakIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLFdBQUksRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFFRCxpQ0FBUSxHQUFSO1FBQ0UsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUU3QyxFQUFFLENBQUEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQ2QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyx1QkFBdUIsRUFBRSxDQUFDLENBQUM7WUFFeEUsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2YsQ0FBQztRQUNELGtLQUFrSztRQUNsSyxFQUFFO1FBQ0Ysa0hBQWtIO0lBRXBILENBQUM7SUFFRCwrQkFBTSxHQUFOO1FBQ0UsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ3hD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QUUsa0JBQWtCO1FBQy9CLFNBQVMsRUFBRSxDQUFDLHdCQUF3QixFQUFFLGlCQUFpQixDQUFDO0tBQ3pELENBQUM7cUNBSzhCLGVBQU0sRUFBdUIsMEJBQVcsRUFBNEIsb0NBQWdCLEVBQWdCLFdBQUksRUFBdUIsMEJBQVc7R0FIN0osY0FBYyxDQXdGMUI7QUF4Rlksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIE9uSW5pdCwgVmlld0NoaWxkIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgVXNlciB9IGZyb20gXCIuLi9zaGFyZWQvdXNlci91c2VyXCI7XHJcbmltcG9ydCB7IFVzZXJTZXJ2aWNlIH0gZnJvbSBcIi4uL3NoYXJlZC91c2VyL3VzZXIuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBDb25uZWN0b3JTZXJ2aWNlIH0gZnJvbSBcIi4uL3NoYXJlZC9jb25uZWN0b3IvY29ubmVjdG9yLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgRGF0YVNlcnZpY2UgfSBmcm9tIFwiLi4vc2hhcmVkL2RhdGEvZGF0YS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XHJcbmltcG9ydCB7IENvbG9yIH0gZnJvbSBcImNvbG9yXCI7XHJcbmltcG9ydCB7IFZpZXcgfSBmcm9tIFwidWkvY29yZS92aWV3XCI7XHJcblxyXG5pbXBvcnQgZGlhbG9ncyA9IHJlcXVpcmUoXCJ1aS9kaWFsb2dzXCIpO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6IFwibXktYXBwXCIsXHJcbiAgcHJvdmlkZXJzOiBbVXNlclNlcnZpY2UsIENvbm5lY3RvclNlcnZpY2VdLFxyXG4gIHRlbXBsYXRlVXJsOiBcImxvZ2luL2xvZ2luLmh0bWxcIixcclxuICBzdHlsZVVybHM6IFtcImxvZ2luL2xvZ2luLWNvbW1vbi5jc3NcIiwgXCJsb2dpbi9sb2dpbi5jc3NcIl0sXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgTG9naW5Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXR7XHJcbiAgICB1c2VyOiBVc2VyO1xyXG4gICAgaXNMb2dnaW5nSW4gPSB0cnVlOyBcclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgdXNlclNlcnZpY2U6IFVzZXJTZXJ2aWNlLCBwcml2YXRlIENvbm5lY3RvclNlcnZpY2U6IENvbm5lY3RvclNlcnZpY2UsIHByaXZhdGUgcGFnZTogUGFnZSwgcHJpdmF0ZSBkYXRhU2VydmljZTogRGF0YVNlcnZpY2UpIHtcclxuICAgICAgdGhpcy51c2VyID0gbmV3IFVzZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgICAgdmFyIHVzZXJfdG9rZW4gPSB0aGlzLmRhdGFTZXJ2aWNlLmdldFRva2VuKCk7XHJcbiAgICAgXHJcbiAgICAgIGlmKHVzZXJfdG9rZW4pIHtcclxuICAgICAgICB0aGlzLnVzZXJTZXJ2aWNlLmNyZWF0ZVVzZXIodGhpcy5kYXRhU2VydmljZS5nZXRMYXRlc3RVc2VyVG9SZWdpc3RlcigpKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmxvZ2luKCk7XHJcbiAgICAgIH1cclxuICAgICAgLy9zZSBvIHV0aWxpemFkb3IgdGl2ZXIgdG9rZW4gZ3VhcmRhZGEgZW50cmFyIG5vIGVjcsOjIHNlZ3VpbnRlLT5vcyBtZXVzIHBhY2llbnRlcyBlIHNhbHRhciBvIHJlZ2lzdG8uIG91IHNlamEgYXF1aSBmYXogc2VtcHJlIG8gbG9naW4gYXV0b21hdGljYW1lbnRlIGNvbSBhIHRva2VuLlxyXG4gICAgICAvL1xyXG4gICAgICAvL3RiIHNlIHBvZGUgcG9uZGVyYXIgYSBleHBpcmHDp8OjbyBkYSB0b2tlbi4gc2UgasOhIHRpdmVyIG1haXMgcXVlIFhYIGRpYXMsIGFwYWdhciBhIHRva2VuIGUgbW9zdHJhciBqYW5lbGEgZGUgbG9naW5cclxuICAgICAgXHJcbiAgICB9XHJcbiAgICBcclxuICAgIHN1Ym1pdCgpIHsgICAgICBcclxuICAgICAgaWYodGhpcy51c2VyLm5hbWUgJiYgdGhpcy51c2VyLnBhc3N3b3JkKSB7XHJcbiAgICAgICAgdGhpcy5zaWduVXAoKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBkaWFsb2dzLmFsZXJ0KHtcclxuICAgICAgICAgICAgdGl0bGU6IFwiQXZpc28gLSBBdXRlbnRpY2HDp8Ojb1wiLFxyXG4gICAgICAgICAgICBtZXNzYWdlOiBcIlBvciBmYXZvciBjb21wbGV0ZSBvcyBjYW1wb3MuXCIsXHJcbiAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogXCJPS1wiXHJcbiAgICAgICAgfSkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRGlhbG9nIGNsb3NlZCFcIik7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgICAgXHJcbiAgICAgIC8vdGhpcy5sb2dpbigpO1xyXG4gICAgfVxyXG5cclxuICAgIFxyXG4gICAgbG9naW4oKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdBUVVJJyk7XHJcbiAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHRoaXMudXNlclNlcnZpY2UuZ2V0VXNlcigpKSk7XHJcbiAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcIi9wYXRpZW50c1wiXSkgIFxyXG4gICAgfVxyXG4gICAgc2lnblVwKCkge1xyXG4gICAgICB0aGlzLnVzZXJTZXJ2aWNlLnJlZ2lzdGVyKHRoaXMudXNlcikuc3Vic2NyaWJlKFxyXG4gICAgICAgIChyZXN1bHQpID0+IHRoaXMudmFsaWRSZWdpc3RlcihyZXN1bHQpLFxyXG4gICAgICAgIChlcnJvcikgPT4gdGhpcy5pbnZhbGlkUmVnaXN0ZXIoZXJyb3IpXHJcbiAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgdmFsaWRSZWdpc3Rlcih1c2VyKSB7XHJcbiAgICAgIHRoaXMuZGF0YVNlcnZpY2Uuc2V0VXNlcih1c2VyKTtcclxuICAgICAgdGhpcy51c2VyU2VydmljZS5jcmVhdGVVc2VyKHRoaXMuZGF0YVNlcnZpY2UuZ2V0TGF0ZXN0VXNlclRvUmVnaXN0ZXIoKSk7XHJcblxyXG4gICAgICBkaWFsb2dzLmFsZXJ0KHtcclxuICAgICAgICAgICAgdGl0bGU6IFwiQXV0ZW50aWNhw6fDo28gVmFsaWRhZGFcIixcclxuICAgICAgICAgICAgbWVzc2FnZTogXCJCZW0gdmluZG8oYSkgXCIgKyB1c2VyLm5hbWUsXHJcbiAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogXCJPS1wiXHJcbiAgICAgICAgfSkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRGlhbG9nIGNsb3NlZCFcIik7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIFxyXG4gICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCIvcGF0aWVudHNcIl0pO1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBpbnZhbGlkUmVnaXN0ZXIoZXJyb3IpIHtcclxuICAgICBkaWFsb2dzLmFsZXJ0KHtcclxuICAgICAgICAgICAgdGl0bGU6IFwiQXZpc28gLSBBdXRlbnRpY2HDp8Ojb1wiLFxyXG4gICAgICAgICAgICBtZXNzYWdlOiBcIk9zIGRhZG9zIGludHJvZHV6aWRvcyBuw6NvIHPDo28gdsOhbGlkb3MuXCIsXHJcbiAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogXCJPS1wiXHJcbiAgICAgICAgfSkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRGlhbG9nIGNsb3NlZCFcIik7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBzYXZlVXNlclN1Y2Nlc3NmdWxsKHJlc3VsdClcclxuICAgIHtcclxuICAgICAgY29uc29sZS5sb2coJ1VzZXIgc2F2ZWQgaW4gQkQgYW5kIE9iamVjdCBjcmVhdGVkJyk7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHNhdmVVc2VyRXJyb3IoZXJyb3IpXHJcbiAgICB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdVc2VyIHdhc250IHNhdmVkJyk7XHJcbiAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgIH1cclxufSJdfQ==