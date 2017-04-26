"use strict";
var core_1 = require("@angular/core");
var user_1 = require("../shared/user/user");
var user_service_1 = require("../shared/user/user.service");
var router_1 = require("@angular/router");
var page_1 = require("ui/page");
var LoginComponent = (function () {
    function LoginComponent(router, userService, page) {
        this.router = router;
        this.userService = userService;
        this.page = page;
        this.isLoggingIn = true;
        this.user = new user_1.User();
    }
    LoginComponent.prototype.ngOnInit = function () {
        //se o utilizador tiver token guardada entrar no ecrã seguinte->os meus pacientes e saltar o registo. ou seja aqui faz sempre o login automaticamente com a token.
        //this.login();
        //tb se pode ponderar a expiração da token. se já tiver mais que XX dias, apagar a token e mostrar janela de login
    };
    LoginComponent.prototype.submit = function () {
        //Hardcoded credentials
        this.user.name = "user";
        this.user.password = "password";
        this.signUp();
        //this.login();
    };
    /*
    login() {
        this.userService.login(this.user)
            .subscribe(
            () => this.router.navigate(["/list"]),
            (error) => alert("Unfortunately we could not find your account.")
            );
    }
    */
    LoginComponent.prototype.signUp = function () {
        this.userService.register(this.user);
        this.router.navigate(["/patients"]);
        /*
         .subscribe(
           () => {
             alert("Your account was successfully created.");
             //this.toggleDisplay();
           },
           () => alert("Unfortunately we were unable to create your account.")
         );
         */
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    core_1.Component({
        selector: "my-app",
        providers: [user_service_1.UserService],
        templateUrl: "login/login.html",
        styleUrls: ["login/login-common.css", "login/login.css"],
    }),
    __metadata("design:paramtypes", [router_1.Router, user_service_1.UserService, page_1.Page])
], LoginComponent);
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxzQ0FBeUU7QUFDekUsNENBQTJDO0FBQzNDLDREQUEwRDtBQUMxRCwwQ0FBeUM7QUFDekMsZ0NBQStCO0FBVy9CLElBQWEsY0FBYztJQUl2Qix3QkFBb0IsTUFBYyxFQUFVLFdBQXdCLEVBQVUsSUFBVTtRQUFwRSxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFBVSxTQUFJLEdBQUosSUFBSSxDQUFNO1FBRnhGLGdCQUFXLEdBQUcsSUFBSSxDQUFDO1FBR2pCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxXQUFJLEVBQUUsQ0FBQztJQUN6QixDQUFDO0lBRUQsaUNBQVEsR0FBUjtRQUNFLGtLQUFrSztRQUNsSyxlQUFlO1FBQ2Ysa0hBQWtIO0lBRXBILENBQUM7SUFFRCwrQkFBTSxHQUFOO1FBQ0UsdUJBQXVCO1FBQ3ZCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQztRQUN4QixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxVQUFVLENBQUM7UUFFaEMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2QsZUFBZTtJQUNqQixDQUFDO0lBRUQ7Ozs7Ozs7O01BUUU7SUFDRiwrQkFBTSxHQUFOO1FBQ0UsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztRQUVuQzs7Ozs7Ozs7V0FRRztJQUNOLENBQUM7SUFDTCxxQkFBQztBQUFELENBQUMsQUEvQ0QsSUErQ0M7QUEvQ1ksY0FBYztJQVAxQixnQkFBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLFFBQVE7UUFDbEIsU0FBUyxFQUFFLENBQUMsMEJBQVcsQ0FBQztRQUN4QixXQUFXLEVBQUUsa0JBQWtCO1FBQy9CLFNBQVMsRUFBRSxDQUFDLHdCQUF3QixFQUFFLGlCQUFpQixDQUFDO0tBQ3pELENBQUM7cUNBTThCLGVBQU0sRUFBdUIsMEJBQVcsRUFBZ0IsV0FBSTtHQUovRSxjQUFjLENBK0MxQjtBQS9DWSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgT25Jbml0LCBWaWV3Q2hpbGQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBVc2VyIH0gZnJvbSBcIi4uL3NoYXJlZC91c2VyL3VzZXJcIjtcclxuaW1wb3J0IHsgVXNlclNlcnZpY2UgfSBmcm9tIFwiLi4vc2hhcmVkL3VzZXIvdXNlci5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XHJcbmltcG9ydCB7IENvbG9yIH0gZnJvbSBcImNvbG9yXCI7XHJcbmltcG9ydCB7IFZpZXcgfSBmcm9tIFwidWkvY29yZS92aWV3XCI7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogXCJteS1hcHBcIixcclxuICBwcm92aWRlcnM6IFtVc2VyU2VydmljZV0sXHJcbiAgdGVtcGxhdGVVcmw6IFwibG9naW4vbG9naW4uaHRtbFwiLFxyXG4gIHN0eWxlVXJsczogW1wibG9naW4vbG9naW4tY29tbW9uLmNzc1wiLCBcImxvZ2luL2xvZ2luLmNzc1wiXSxcclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBMb2dpbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdHtcclxuICAgIHVzZXI6IFVzZXI7XHJcbiAgICBpc0xvZ2dpbmdJbiA9IHRydWU7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSB1c2VyU2VydmljZTogVXNlclNlcnZpY2UsIHByaXZhdGUgcGFnZTogUGFnZSkge1xyXG4gICAgICB0aGlzLnVzZXIgPSBuZXcgVXNlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICAvL3NlIG8gdXRpbGl6YWRvciB0aXZlciB0b2tlbiBndWFyZGFkYSBlbnRyYXIgbm8gZWNyw6Mgc2VndWludGUtPm9zIG1ldXMgcGFjaWVudGVzIGUgc2FsdGFyIG8gcmVnaXN0by4gb3Ugc2VqYSBhcXVpIGZheiBzZW1wcmUgbyBsb2dpbiBhdXRvbWF0aWNhbWVudGUgY29tIGEgdG9rZW4uXHJcbiAgICAgIC8vdGhpcy5sb2dpbigpO1xyXG4gICAgICAvL3RiIHNlIHBvZGUgcG9uZGVyYXIgYSBleHBpcmHDp8OjbyBkYSB0b2tlbi4gc2UgasOhIHRpdmVyIG1haXMgcXVlIFhYIGRpYXMsIGFwYWdhciBhIHRva2VuIGUgbW9zdHJhciBqYW5lbGEgZGUgbG9naW5cclxuICAgICAgXHJcbiAgICB9XHJcbiAgICBcclxuICAgIHN1Ym1pdCgpIHtcclxuICAgICAgLy9IYXJkY29kZWQgY3JlZGVudGlhbHNcclxuICAgICAgdGhpcy51c2VyLm5hbWUgPSBcInVzZXJcIjtcclxuICAgICAgdGhpcy51c2VyLnBhc3N3b3JkID0gXCJwYXNzd29yZFwiO1xyXG4gICAgICBcclxuICAgICAgdGhpcy5zaWduVXAoKTtcclxuICAgICAgLy90aGlzLmxvZ2luKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgIGxvZ2luKCkgeyAgIFxyXG4gICAgICAgIHRoaXMudXNlclNlcnZpY2UubG9naW4odGhpcy51c2VyKVxyXG4gICAgICAgICAgICAuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICAoKSA9PiB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCIvbGlzdFwiXSksXHJcbiAgICAgICAgICAgIChlcnJvcikgPT4gYWxlcnQoXCJVbmZvcnR1bmF0ZWx5IHdlIGNvdWxkIG5vdCBmaW5kIHlvdXIgYWNjb3VudC5cIilcclxuICAgICAgICAgICAgKTtcclxuICAgIH1cclxuICAgICovXHJcbiAgICBzaWduVXAoKSB7XHJcbiAgICAgIHRoaXMudXNlclNlcnZpY2UucmVnaXN0ZXIodGhpcy51c2VyKTtcclxuICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiL3BhdGllbnRzXCJdKTtcclxuXHJcbiAgICAgICAvKlxyXG4gICAgICAgIC5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwiWW91ciBhY2NvdW50IHdhcyBzdWNjZXNzZnVsbHkgY3JlYXRlZC5cIik7XHJcbiAgICAgICAgICAgIC8vdGhpcy50b2dnbGVEaXNwbGF5KCk7XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgKCkgPT4gYWxlcnQoXCJVbmZvcnR1bmF0ZWx5IHdlIHdlcmUgdW5hYmxlIHRvIGNyZWF0ZSB5b3VyIGFjY291bnQuXCIpXHJcbiAgICAgICAgKTtcclxuICAgICAgICAqL1xyXG4gICAgfVxyXG59Il19