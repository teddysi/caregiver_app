"use strict";
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Rx_1 = require("rxjs/Rx");
var user_1 = require("./user");
var connector_service_1 = require("../connector/connector.service");
require("rxjs/add/operator/do");
require("rxjs/add/operator/map");
var UserService = (function () {
    function UserService(http, connectorService) {
        this.http = http;
        this.connectorService = connectorService;
    }
    UserService.prototype.register = function (user) {
        return this.connectorService.requestLogin(user.name, user.password);
    };
    UserService.prototype.handleErrors = function (error) {
        console.log(JSON.stringify(error.json()));
        return Rx_1.Observable.throw(error);
    };
    /*
      login(user: User) {
          let headers = new Headers();
          headers.append("Content-Type", "application/json");
  
          return this.http.post(
              Config.apiUrl + "oauth/token",
              JSON.stringify({
              username: user.email,
              password: user.password,
              grant_type: "password"
              }),
              { headers: headers }
          )
          .map(response => response.json())
          .do(data => {
              Config.token = data.Result.access_token;
          })
          .catch(this.handleErrors);
      }
      */
    UserService.prototype.createUser = function ($newUser) {
        this.user = new user_1.User();
        console.log(JSON.stringify($newUser, null, 4));
    };
    return UserService;
}());
UserService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, connector_service_1.ConnectorService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidXNlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxzQ0FBMkM7QUFDM0Msc0NBQXdEO0FBQ3hELDhCQUFxQztBQUNyQywrQkFBOEI7QUFFOUIsb0VBQWtFO0FBQ2xFLGdDQUE4QjtBQUM5QixpQ0FBK0I7QUFHL0IsSUFBYSxXQUFXO0lBR3RCLHFCQUFvQixJQUFVLEVBQVUsZ0JBQWtDO1FBQXRELFNBQUksR0FBSixJQUFJLENBQU07UUFBVSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO0lBQUcsQ0FBQztJQUU5RSw4QkFBUSxHQUFSLFVBQVMsSUFBVTtRQUNqQixNQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN0RSxDQUFDO0lBRUQsa0NBQVksR0FBWixVQUFhLEtBQWU7UUFDMUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDMUMsTUFBTSxDQUFDLGVBQVUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztRQW9CSTtJQUVGLGdDQUFVLEdBQVYsVUFBVyxRQUFRO1FBRWYsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLFdBQUksRUFBRSxDQUFDO1FBQ3ZCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbkQsQ0FBQztJQUVMLGtCQUFDO0FBQUQsQ0FBQyxBQTFDRCxJQTBDQztBQTFDWSxXQUFXO0lBRHZCLGlCQUFVLEVBQUU7cUNBSWUsV0FBSSxFQUE0QixvQ0FBZ0I7R0FIL0QsV0FBVyxDQTBDdkI7QUExQ1ksa0NBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgSHR0cCwgSGVhZGVycywgUmVzcG9uc2UgfSBmcm9tIFwiQGFuZ3VsYXIvaHR0cFwiO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSBcInJ4anMvUnhcIjtcclxuaW1wb3J0IHsgVXNlciB9IGZyb20gXCIuL3VzZXJcIjtcclxuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSBcIi4uL2NvbmZpZ1wiO1xyXG5pbXBvcnQgeyBDb25uZWN0b3JTZXJ2aWNlIH0gZnJvbSBcIi4uL2Nvbm5lY3Rvci9jb25uZWN0b3Iuc2VydmljZVwiO1xyXG5pbXBvcnQgXCJyeGpzL2FkZC9vcGVyYXRvci9kb1wiO1xyXG5pbXBvcnQgXCJyeGpzL2FkZC9vcGVyYXRvci9tYXBcIjtcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIFVzZXJTZXJ2aWNlIHtcclxuICAgIHByaXZhdGUgdXNlcjogVXNlcjtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwLCBwcml2YXRlIGNvbm5lY3RvclNlcnZpY2U6IENvbm5lY3RvclNlcnZpY2UpIHt9XHJcbiAgXHJcbiAgcmVnaXN0ZXIodXNlcjogVXNlcikge1xyXG4gICAgcmV0dXJuIHRoaXMuY29ubmVjdG9yU2VydmljZS5yZXF1ZXN0TG9naW4odXNlci5uYW1lLCB1c2VyLnBhc3N3b3JkKTtcclxuICB9XHJcblxyXG4gIGhhbmRsZUVycm9ycyhlcnJvcjogUmVzcG9uc2UpIHtcclxuICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGVycm9yLmpzb24oKSkpO1xyXG4gICAgcmV0dXJuIE9ic2VydmFibGUudGhyb3coZXJyb3IpO1xyXG4gIH1cclxuXHJcbiAgLypcclxuICAgIGxvZ2luKHVzZXI6IFVzZXIpIHtcclxuICAgICAgICBsZXQgaGVhZGVycyA9IG5ldyBIZWFkZXJzKCk7XHJcbiAgICAgICAgaGVhZGVycy5hcHBlbmQoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QoXHJcbiAgICAgICAgICAgIENvbmZpZy5hcGlVcmwgKyBcIm9hdXRoL3Rva2VuXCIsXHJcbiAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgICAgICAgdXNlcm5hbWU6IHVzZXIuZW1haWwsXHJcbiAgICAgICAgICAgIHBhc3N3b3JkOiB1c2VyLnBhc3N3b3JkLFxyXG4gICAgICAgICAgICBncmFudF90eXBlOiBcInBhc3N3b3JkXCJcclxuICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgIHsgaGVhZGVyczogaGVhZGVycyB9XHJcbiAgICAgICAgKVxyXG4gICAgICAgIC5tYXAocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4gICAgICAgIC5kbyhkYXRhID0+IHtcclxuICAgICAgICAgICAgQ29uZmlnLnRva2VuID0gZGF0YS5SZXN1bHQuYWNjZXNzX3Rva2VuO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3JzKTtcclxuICAgIH1cclxuICAgICovXHJcbiAgICBcclxuICAgIGNyZWF0ZVVzZXIoJG5ld1VzZXIpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy51c2VyID0gbmV3IFVzZXIoKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeSgkbmV3VXNlciwgbnVsbCwgNCkpO1xyXG4gICAgfVxyXG4gICAgXHJcbn1cclxuXHJcbiJdfQ==