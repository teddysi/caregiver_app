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
        console.log('Instanciou - UserService!');
    }
    UserService.prototype.register = function (user) {
        return this.connectorService.requestLogin(user.name, user.password);
    };
    UserService.prototype.handleErrors = function (error) {
        console.log(JSON.stringify(error.json()));
        return Rx_1.Observable.throw(error);
    };
    UserService.prototype.createUser = function ($newUser) {
        console.log('A instanciar o utilizador');
        this.user = new user_1.User();
        this.user.id = $newUser.id;
        this.user.username = $newUser.username;
        this.user.name = $newUser.name;
        this.user.email = $newUser.email;
        this.user.location = $newUser.location;
        this.user.token = $newUser.token;
        this.user.created_at = $newUser.created_at;
        this.user.updated_at = $newUser.updated_at;
        this.user.contacts = $newUser.contacts;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidXNlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxzQ0FBMkM7QUFDM0Msc0NBQXdEO0FBQ3hELDhCQUFxQztBQUNyQywrQkFBOEI7QUFFOUIsb0VBQWtFO0FBQ2xFLGdDQUE4QjtBQUM5QixpQ0FBK0I7QUFHL0IsSUFBYSxXQUFXO0lBR3BCLHFCQUFvQixJQUFVLEVBQVUsZ0JBQWtDO1FBQXRELFNBQUksR0FBSixJQUFJLENBQU07UUFBVSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ3RFLE9BQU8sQ0FBQyxHQUFHLENBQUMsMkJBQTJCLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBRUQsOEJBQVEsR0FBUixVQUFTLElBQVU7UUFDZixNQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN4RSxDQUFDO0lBRUQsa0NBQVksR0FBWixVQUFhLEtBQWU7UUFDeEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDMUMsTUFBTSxDQUFDLGVBQVUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVELGdDQUFVLEdBQVYsVUFBVyxRQUFRO1FBRWYsT0FBTyxDQUFDLEdBQUcsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO1FBQ3pDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxXQUFJLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxRQUFRLENBQUMsRUFBRSxDQUFDO1FBQzNCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUM7UUFDdkMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQztRQUMvQixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUM7UUFDdkMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQztRQUNqQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxRQUFRLENBQUMsVUFBVSxDQUFDO1FBQzNDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUM7UUFDM0MsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQztJQUMzQyxDQUFDO0lBQ0QsNkJBQU8sR0FBUDtRQUVJLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQ3JCLENBQUM7SUFDTCxrQkFBQztBQUFELENBQUMsQUFsQ0QsSUFrQ0M7QUFsQ1ksV0FBVztJQUR2QixpQkFBVSxFQUFFO3FDQUlpQixXQUFJLEVBQTRCLG9DQUFnQjtHQUhqRSxXQUFXLENBa0N2QjtBQWxDWSxrQ0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBIdHRwLCBIZWFkZXJzLCBSZXNwb25zZSB9IGZyb20gXCJAYW5ndWxhci9odHRwXCI7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tIFwicnhqcy9SeFwiO1xyXG5pbXBvcnQgeyBVc2VyIH0gZnJvbSBcIi4vdXNlclwiO1xyXG5pbXBvcnQgeyBDb25maWcgfSBmcm9tIFwiLi4vY29uZmlnXCI7XHJcbmltcG9ydCB7IENvbm5lY3RvclNlcnZpY2UgfSBmcm9tIFwiLi4vY29ubmVjdG9yL2Nvbm5lY3Rvci5zZXJ2aWNlXCI7XHJcbmltcG9ydCBcInJ4anMvYWRkL29wZXJhdG9yL2RvXCI7XHJcbmltcG9ydCBcInJ4anMvYWRkL29wZXJhdG9yL21hcFwiO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgVXNlclNlcnZpY2Uge1xyXG4gICAgcHJpdmF0ZSB1c2VyOiBVc2VyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cCwgcHJpdmF0ZSBjb25uZWN0b3JTZXJ2aWNlOiBDb25uZWN0b3JTZXJ2aWNlKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ0luc3RhbmNpb3UgLSBVc2VyU2VydmljZSEnKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcmVnaXN0ZXIodXNlcjogVXNlcikge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNvbm5lY3RvclNlcnZpY2UucmVxdWVzdExvZ2luKHVzZXIubmFtZSwgdXNlci5wYXNzd29yZCk7XHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlRXJyb3JzKGVycm9yOiBSZXNwb25zZSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGVycm9yLmpzb24oKSkpO1xyXG4gICAgICAgIHJldHVybiBPYnNlcnZhYmxlLnRocm93KGVycm9yKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgY3JlYXRlVXNlcigkbmV3VXNlcilcclxuICAgIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnQSBpbnN0YW5jaWFyIG8gdXRpbGl6YWRvcicpO1xyXG4gICAgICAgIHRoaXMudXNlciA9IG5ldyBVc2VyKCk7XHJcbiAgICAgICAgdGhpcy51c2VyLmlkID0gJG5ld1VzZXIuaWQ7XHJcbiAgICAgICAgdGhpcy51c2VyLnVzZXJuYW1lID0gJG5ld1VzZXIudXNlcm5hbWU7XHJcbiAgICAgICAgdGhpcy51c2VyLm5hbWUgPSAkbmV3VXNlci5uYW1lO1xyXG4gICAgICAgIHRoaXMudXNlci5lbWFpbCA9ICRuZXdVc2VyLmVtYWlsO1xyXG4gICAgICAgIHRoaXMudXNlci5sb2NhdGlvbiA9ICRuZXdVc2VyLmxvY2F0aW9uO1xyXG4gICAgICAgIHRoaXMudXNlci50b2tlbiA9ICRuZXdVc2VyLnRva2VuO1xyXG4gICAgICAgIHRoaXMudXNlci5jcmVhdGVkX2F0ID0gJG5ld1VzZXIuY3JlYXRlZF9hdDtcclxuICAgICAgICB0aGlzLnVzZXIudXBkYXRlZF9hdCA9ICRuZXdVc2VyLnVwZGF0ZWRfYXQ7XHJcbiAgICAgICAgdGhpcy51c2VyLmNvbnRhY3RzID0gJG5ld1VzZXIuY29udGFjdHM7XHJcbiAgICB9XHJcbiAgICBnZXRVc2VyKClcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy51c2VyO1xyXG4gICAgfVxyXG59XHJcblxyXG4iXX0=