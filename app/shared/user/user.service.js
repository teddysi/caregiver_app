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
    UserService.prototype.createUser = function ($newUser) {
        this.user = new user_1.User();
        this.user.id = $newUser.id;
        this.user.username = $newUser.username;
        this.user.name = $newUser.name;
        this.user.email = $newUser.email;
        this.user.location = $newUser.location;
        this.user.token = $newUser.token;
        this.user.created_at = $newUser.created_at;
        this.user.updated_at = $newUser.updated_at;
    };
    UserService.prototype.getUser = function () {
        return this.user;
    };
    return UserService;
}());
UserService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, connector_service_1.ConnectorService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidXNlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxzQ0FBMkM7QUFDM0Msc0NBQXdEO0FBQ3hELDhCQUFxQztBQUNyQywrQkFBOEI7QUFFOUIsb0VBQWtFO0FBQ2xFLGdDQUE4QjtBQUM5QixpQ0FBK0I7QUFHL0IsSUFBYSxXQUFXO0lBR3BCLHFCQUFvQixJQUFVLEVBQVUsZ0JBQWtDO1FBQXRELFNBQUksR0FBSixJQUFJLENBQU07UUFBVSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO0lBQUcsQ0FBQztJQUU5RSw4QkFBUSxHQUFSLFVBQVMsSUFBVTtRQUNmLE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3hFLENBQUM7SUFFRCxrQ0FBWSxHQUFaLFVBQWEsS0FBZTtRQUN4QixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztRQUMxQyxNQUFNLENBQUMsZUFBVSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRUQsZ0NBQVUsR0FBVixVQUFXLFFBQVE7UUFFZixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksV0FBSSxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsUUFBUSxDQUFDLEVBQUUsQ0FBQztRQUMzQixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUM7UUFDL0IsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQztRQUNqQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUM7UUFDakMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztRQUMzQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxRQUFRLENBQUMsVUFBVSxDQUFDO0lBQy9DLENBQUM7SUFDRCw2QkFBTyxHQUFQO1FBRUksTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDckIsQ0FBQztJQUdMLGtCQUFDO0FBQUQsQ0FBQyxBQWhDRCxJQWdDQztBQWhDWSxXQUFXO0lBRHZCLGlCQUFVLEVBQUU7cUNBSWlCLFdBQUksRUFBNEIsb0NBQWdCO0dBSGpFLFdBQVcsQ0FnQ3ZCO0FBaENZLGtDQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IEh0dHAsIEhlYWRlcnMsIFJlc3BvbnNlIH0gZnJvbSBcIkBhbmd1bGFyL2h0dHBcIjtcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gXCJyeGpzL1J4XCI7XHJcbmltcG9ydCB7IFVzZXIgfSBmcm9tIFwiLi91c2VyXCI7XHJcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gXCIuLi9jb25maWdcIjtcclxuaW1wb3J0IHsgQ29ubmVjdG9yU2VydmljZSB9IGZyb20gXCIuLi9jb25uZWN0b3IvY29ubmVjdG9yLnNlcnZpY2VcIjtcclxuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvZG9cIjtcclxuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvbWFwXCI7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBVc2VyU2VydmljZSB7XHJcbiAgICBwcml2YXRlIHVzZXI6IFVzZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwLCBwcml2YXRlIGNvbm5lY3RvclNlcnZpY2U6IENvbm5lY3RvclNlcnZpY2UpIHt9XHJcbiAgICBcclxuICAgIHJlZ2lzdGVyKHVzZXI6IFVzZXIpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jb25uZWN0b3JTZXJ2aWNlLnJlcXVlc3RMb2dpbih1c2VyLm5hbWUsIHVzZXIucGFzc3dvcmQpO1xyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZUVycm9ycyhlcnJvcjogUmVzcG9uc2UpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShlcnJvci5qc29uKCkpKTtcclxuICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS50aHJvdyhlcnJvcik7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGNyZWF0ZVVzZXIoJG5ld1VzZXIpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy51c2VyID0gbmV3IFVzZXIoKTtcclxuICAgICAgICB0aGlzLnVzZXIuaWQgPSAkbmV3VXNlci5pZDtcclxuICAgICAgICB0aGlzLnVzZXIudXNlcm5hbWUgPSAkbmV3VXNlci51c2VybmFtZTtcclxuICAgICAgICB0aGlzLnVzZXIubmFtZSA9ICRuZXdVc2VyLm5hbWU7XHJcbiAgICAgICAgdGhpcy51c2VyLmVtYWlsID0gJG5ld1VzZXIuZW1haWw7XHJcbiAgICAgICAgdGhpcy51c2VyLmxvY2F0aW9uID0gJG5ld1VzZXIubG9jYXRpb247XHJcbiAgICAgICAgdGhpcy51c2VyLnRva2VuID0gJG5ld1VzZXIudG9rZW47XHJcbiAgICAgICAgdGhpcy51c2VyLmNyZWF0ZWRfYXQgPSAkbmV3VXNlci5jcmVhdGVkX2F0O1xyXG4gICAgICAgIHRoaXMudXNlci51cGRhdGVkX2F0ID0gJG5ld1VzZXIudXBkYXRlZF9hdDtcclxuICAgIH1cclxuICAgIGdldFVzZXIoKVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnVzZXI7XHJcbiAgICB9XHJcblxyXG4gICAgXHJcbn1cclxuXHJcbiJdfQ==