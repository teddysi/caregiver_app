"use strict";
var core_1 = require("@angular/core");
var database_1 = require("./database");
require("rxjs/add/operator/map");
var connector_service_1 = require("../connector/connector.service");
var DataService = (function () {
    function DataService(database, connectorService) {
        this.database = database;
<<<<<<< HEAD
        this.connectorService = connectorService;
        //this.data = database.getDatabase();
        //this.deleteData();
=======
        //this.data = database.getDatabase();
        this.deleteData('user');
        this.showData('data');
        this.showData('user');
>>>>>>> 49503d25fee8f5eee665ca5ac57ebb8177b46ef7
    }
    DataService.prototype.ngOnInit = function () {
    };
    DataService.prototype.setUser = function (registeredUser) {
        this.database.getDatabase().createDocument({
            "type": "user",
            "user": registeredUser
        });
        //this.userService.createUser(registeredUser);
    };
    DataService.prototype.getAllData = function () {
        //verificar se há conectividade
        //se houver verificar atualizacoes e vai buscar se houver (deve ir buscar só o q está para atualizar)
        if (this.database.getDatabase().executeQuery("data").length > 0) {
            //Só tá a criar qd os dados estão vazios. n atualiza nada
            this.setData(this.connectorService.getAllData());
        }
        console.log(JSON.stringify(this.database.getDatabase().executeQuery("data"), null, 4));
        return this.database.getDatabase().executeQuery("data");
        //se não houver conetividade ou se n houver nada para atualizar devolve os dados da bd dos materiais
    };
    DataService.prototype.setPatients = function () {
    };
    DataService.prototype.setMaterials = function () {
    };
    DataService.prototype.setData = function (data) {
        this.database.getDatabase().createDocument({
            "type": "data",
            "data": data
        });
    };
    DataService.prototype.setNeeds = function () {
    };
    DataService.prototype.getToken = function () {
        var user;
        if (user = this.getLatestUserToRegister()) {
            return user.caregiver_token;
        }
        return null;
    };
    DataService.prototype.getUserID = function () {
        var user;
        if (user = this.getLatestUserToRegister()) {
            return user.id;
        }
        return null;
    };
    DataService.prototype.getLatestUserToRegister = function () {
        var users = this.getAllUsers();
        if (users) {
            var lastUser;
            for (var i in users) {
                if (users.hasOwnProperty(i) && typeof (i) !== 'function') {
                    lastUser = users[i];
                    break;
                }
            }
            return lastUser.user;
        }
        return false;
    };
    DataService.prototype.deleteData = function (view) {
        var documents = this.database.getDatabase().executeQuery(view);
        console.log('A apagar bd: ' + view);
        // loop over all documents
        for (var i = 0; i < documents.length; i++) {
            // delete each document
            // couchbase will assign an id (_id) to a document when created
            this.database.getDatabase().deleteDocument(documents[i]._id);
        }
    };
    DataService.prototype.getAllUsers = function () {
        if (this.database.getDatabase().executeQuery("user").length > 0) {
            return this.database.getDatabase().executeQuery("user");
        }
        return false;
    };
    DataService.prototype.showData = function (view) {
        console.log('A mostrar bd: ' + view);
        if (this.database.getDatabase().executeQuery(view).length > 0) {
            console.log(JSON.stringify(this.database.getDatabase().executeQuery(view), null, 4));
        }
    };
    return DataService;
}());
DataService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [database_1.Database, connector_service_1.ConnectorService])
], DataService);
exports.DataService = DataService;
<<<<<<< HEAD
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGF0YS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxzQ0FBMkM7QUFNM0MsdUNBQXNDO0FBRXRDLGlDQUErQjtBQUMvQixvRUFBa0U7QUFHbEUsSUFBYSxXQUFXO0lBSXBCLHFCQUFvQixRQUFrQixFQUFVLGdCQUFrQztRQUE5RCxhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQVUscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUM5RSxxQ0FBcUM7UUFDckMsb0JBQW9CO0lBQ3hCLENBQUM7SUFFRCw4QkFBUSxHQUFSO0lBQ0EsQ0FBQztJQUVELDZCQUFPLEdBQVAsVUFBUSxjQUFjO1FBQ2xCLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUMsY0FBYyxDQUFDO1lBQ3ZDLE1BQU0sRUFBRSxNQUFNO1lBQ2QsTUFBTSxFQUFFLGNBQWM7U0FDekIsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUNELGdDQUFVLEdBQVY7UUFDSSwrQkFBK0I7UUFDL0IscUdBQXFHO1FBRXJHLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzdELHlEQUF5RDtZQUN6RCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDO1FBQ3JELENBQUM7UUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkYsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRXhELG9HQUFvRztJQUN4RyxDQUFDO0lBQ0QsaUNBQVcsR0FBWDtJQUVBLENBQUM7SUFDRCxrQ0FBWSxHQUFaO0lBRUEsQ0FBQztJQUNELDZCQUFPLEdBQVAsVUFBUSxJQUFJO1FBQ1QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxjQUFjLENBQUM7WUFDdEMsTUFBTSxFQUFFLE1BQU07WUFDZCxNQUFNLEVBQUUsSUFBSTtTQUNoQixDQUFDLENBQUM7SUFDTixDQUFDO0lBQ0QsOEJBQVEsR0FBUjtJQUVBLENBQUM7SUFFRCw4QkFBUSxHQUFSO1FBQ0ksSUFBSSxJQUFJLENBQUM7UUFDVCxFQUFFLENBQUEsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLHVCQUF1QixFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3ZDLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDO1FBQ2hDLENBQUM7UUFDRCxNQUFNLENBQUMsS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFFRCw2Q0FBdUIsR0FBdkI7UUFDSSxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFFL0IsRUFBRSxDQUFBLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNQLElBQUksUUFBUSxDQUFDO1lBQ2IsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDbEIsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsSUFBSSxPQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssVUFBVSxDQUFDLENBQUMsQ0FBQztvQkFDdEQsUUFBUSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDcEIsS0FBSyxDQUFDO2dCQUNWLENBQUM7WUFDTCxDQUFDO1lBQ0QsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7UUFDekIsQ0FBQztRQUNELE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUVNLGdDQUFVLEdBQWpCO1FBQ0ksSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFakUsMEJBQTBCO1FBQzFCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQ3hDLHVCQUF1QjtZQUN2QiwrREFBK0Q7WUFDL0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2pFLENBQUM7SUFDTCxDQUFDO0lBRU0saUNBQVcsR0FBbEI7UUFDSSxFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM3RCxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDNUQsQ0FBQztRQUNELE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUNMLGtCQUFDO0FBQUQsQ0FBQyxBQXhGRCxJQXdGQztBQXhGWSxXQUFXO0lBRHZCLGlCQUFVLEVBQUU7cUNBS3FCLG1CQUFRLEVBQTRCLG9DQUFnQjtHQUp6RSxXQUFXLENBd0Z2QjtBQXhGWSxrQ0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBNYXRlcmlhbHMgfSBmcm9tIFwiLi9tYXRlcmlhbHNcIjtcclxuaW1wb3J0IHsgRGF0YSB9IGZyb20gXCIuL2RhdGFcIjtcclxuaW1wb3J0IHsgTmVlZHMgfSBmcm9tIFwiLi9uZWVkc1wiO1xyXG5pbXBvcnQgeyBQYXRpZW50cyB9IGZyb20gXCIuL3BhdGllbnRzXCI7XHJcbmltcG9ydCB7IENvdWNoYmFzZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtY291Y2hiYXNlXCI7XHJcbmltcG9ydCB7IERhdGFiYXNlIH0gZnJvbSBcIi4vZGF0YWJhc2VcIjtcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XHJcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvbWFwJztcclxuaW1wb3J0IHsgQ29ubmVjdG9yU2VydmljZSB9IGZyb20gXCIuLi9jb25uZWN0b3IvY29ubmVjdG9yLnNlcnZpY2VcIjtcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIERhdGFTZXJ2aWNlIHtcclxuXHJcbiAgICBwdWJsaWMgZGF0YTogYW55O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZGF0YWJhc2U6IERhdGFiYXNlLCBwcml2YXRlIGNvbm5lY3RvclNlcnZpY2U6IENvbm5lY3RvclNlcnZpY2UpIHtcclxuICAgICAgICAvL3RoaXMuZGF0YSA9IGRhdGFiYXNlLmdldERhdGFiYXNlKCk7XHJcbiAgICAgICAgLy90aGlzLmRlbGV0ZURhdGEoKTtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgIH1cclxuXHJcbiAgICBzZXRVc2VyKHJlZ2lzdGVyZWRVc2VyKSB7XHJcbiAgICAgICAgdGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmNyZWF0ZURvY3VtZW50KHtcclxuICAgICAgICAgICAgXCJ0eXBlXCI6IFwidXNlclwiLFxyXG4gICAgICAgICAgICBcInVzZXJcIjogcmVnaXN0ZXJlZFVzZXJcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG4gICAgZ2V0QWxsRGF0YSgpIHtcclxuICAgICAgICAvL3ZlcmlmaWNhciBzZSBow6EgY29uZWN0aXZpZGFkZVxyXG4gICAgICAgIC8vc2UgaG91dmVyIHZlcmlmaWNhciBhdHVhbGl6YWNvZXMgZSB2YWkgYnVzY2FyIHNlIGhvdXZlciAoZGV2ZSBpciBidXNjYXIgc8OzIG8gcSBlc3TDoSBwYXJhIGF0dWFsaXphcilcclxuICAgICAgIFxyXG4gICAgICAgIGlmKHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5leGVjdXRlUXVlcnkoXCJkYXRhXCIpLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgLy9Tw7MgdMOhIGEgY3JpYXIgcWQgb3MgZGFkb3MgZXN0w6NvIHZhemlvcy4gbiBhdHVhbGl6YSBuYWRhXHJcbiAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh0aGlzLmNvbm5lY3RvclNlcnZpY2UuZ2V0QWxsRGF0YSgpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkodGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmV4ZWN1dGVRdWVyeShcImRhdGFcIiksIG51bGwsIDQpKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmV4ZWN1dGVRdWVyeShcImRhdGFcIik7XHJcblxyXG4gICAgICAgIC8vc2UgbsOjbyBob3V2ZXIgY29uZXRpdmlkYWRlIG91IHNlIG4gaG91dmVyIG5hZGEgcGFyYSBhdHVhbGl6YXIgZGV2b2x2ZSBvcyBkYWRvcyBkYSBiZCBkb3MgbWF0ZXJpYWlzXHJcbiAgICB9XHJcbiAgICBzZXRQYXRpZW50cygpIHtcclxuXHJcbiAgICB9XHJcbiAgICBzZXRNYXRlcmlhbHMoKSB7XHJcblxyXG4gICAgfVxyXG4gICAgc2V0RGF0YShkYXRhKSB7XHJcbiAgICAgICB0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuY3JlYXRlRG9jdW1lbnQoe1xyXG4gICAgICAgICAgICBcInR5cGVcIjogXCJkYXRhXCIsXHJcbiAgICAgICAgICAgIFwiZGF0YVwiOiBkYXRhXHJcbiAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHNldE5lZWRzKCkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBnZXRUb2tlbigpIHtcclxuICAgICAgICB2YXIgdXNlcjtcclxuICAgICAgICBpZih1c2VyID0gdGhpcy5nZXRMYXRlc3RVc2VyVG9SZWdpc3RlcigpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB1c2VyLmNhcmVnaXZlcl90b2tlbjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldExhdGVzdFVzZXJUb1JlZ2lzdGVyKCkge1xyXG4gICAgICAgIHZhciB1c2VycyA9IHRoaXMuZ2V0QWxsVXNlcnMoKTtcclxuICAgICAgICBcclxuICAgICAgICBpZih1c2Vycykge1xyXG4gICAgICAgICAgICB2YXIgbGFzdFVzZXI7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgaW4gdXNlcnMpIHtcclxuICAgICAgICAgICAgICAgIGlmICh1c2Vycy5oYXNPd25Qcm9wZXJ0eShpKSAmJiB0eXBlb2YoaSkgIT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgICAgICAgICBsYXN0VXNlciA9IHVzZXJzW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBsYXN0VXNlci51c2VyO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRlbGV0ZURhdGEoKSB7XHJcbiAgICAgICAgbGV0IGRvY3VtZW50cyA9IHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5leGVjdXRlUXVlcnkoXCJ1c2VyXCIpO1xyXG5cclxuICAgICAgICAvLyBsb29wIG92ZXIgYWxsIGRvY3VtZW50c1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZG9jdW1lbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIC8vIGRlbGV0ZSBlYWNoIGRvY3VtZW50XHJcbiAgICAgICAgICAgIC8vIGNvdWNoYmFzZSB3aWxsIGFzc2lnbiBhbiBpZCAoX2lkKSB0byBhIGRvY3VtZW50IHdoZW4gY3JlYXRlZFxyXG4gICAgICAgICAgICB0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZGVsZXRlRG9jdW1lbnQoZG9jdW1lbnRzW2ldLl9pZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRBbGxVc2Vycygpe1xyXG4gICAgICAgIGlmKHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5leGVjdXRlUXVlcnkoXCJ1c2VyXCIpLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5leGVjdXRlUXVlcnkoXCJ1c2VyXCIpO1xyXG4gICAgICAgIH0gICAgICAgICBcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbn0iXX0=
=======
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGF0YS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxzQ0FBMkM7QUFNM0MsdUNBQXNDO0FBR3RDLGlDQUErQjtBQUcvQixJQUFhLFdBQVc7SUFJcEIscUJBQW9CLFFBQWtCO1FBQWxCLGFBQVEsR0FBUixRQUFRLENBQVU7UUFFbEMscUNBQXFDO1FBQ3JDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDeEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN0QixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUFFRCw4QkFBUSxHQUFSO0lBQ0EsQ0FBQztJQUVELDZCQUFPLEdBQVAsVUFBUSxjQUFjO1FBQ2xCLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUMsY0FBYyxDQUFDO1lBQ3ZDLE1BQU0sRUFBRSxNQUFNO1lBQ2QsTUFBTSxFQUFFLGNBQWM7U0FDekIsQ0FBQyxDQUFDO1FBQ0gsOENBQThDO0lBQ2xELENBQUM7SUFDRCxpQ0FBVyxHQUFYO0lBRUEsQ0FBQztJQUNELGtDQUFZLEdBQVo7SUFFQSxDQUFDO0lBQ0QsNkJBQU8sR0FBUCxVQUFRLElBQUk7UUFDUjs7Ozs7Ozs7OztVQVVFO1FBQ0YsbUJBQW1CO0lBQ3ZCLENBQUM7SUFDRCw4QkFBUSxHQUFSO0lBRUEsQ0FBQztJQUVELDhCQUFRLEdBQVI7UUFDSSxJQUFJLElBQUksQ0FBQztRQUNULEVBQUUsQ0FBQSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsdUJBQXVCLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFFdkMsTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUM7UUFDaEMsQ0FBQztRQUNELE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVELCtCQUFTLEdBQVQ7UUFDSSxJQUFJLElBQUksQ0FBQztRQUNULEVBQUUsQ0FBQSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsdUJBQXVCLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFFdkMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7UUFDbkIsQ0FBQztRQUNELE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVELDZDQUF1QixHQUF2QjtRQUNJLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUUvQixFQUFFLENBQUEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ1AsSUFBSSxRQUFRLENBQUM7WUFDYixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNsQixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxJQUFJLE9BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxVQUFVLENBQUMsQ0FBQyxDQUFDO29CQUN0RCxRQUFRLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNwQixLQUFLLENBQUM7Z0JBQ1YsQ0FBQztZQUNMLENBQUM7WUFDRCxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztRQUN6QixDQUFDO1FBQ0QsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBRU0sZ0NBQVUsR0FBakIsVUFBa0IsSUFBSTtRQUNsQixJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMvRCxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsQ0FBQztRQUNwQywwQkFBMEI7UUFDMUIsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDeEMsdUJBQXVCO1lBQ3ZCLCtEQUErRDtZQUMvRCxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDakUsQ0FBQztJQUNMLENBQUM7SUFFTSxpQ0FBVyxHQUFsQjtRQUNJLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzdELE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM1RCxDQUFDO1FBQ0QsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBRU0sOEJBQVEsR0FBZixVQUFnQixJQUFJO1FBQ2hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLENBQUM7UUFDckMsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDM0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3pGLENBQUM7SUFDTCxDQUFDO0lBQ0wsa0JBQUM7QUFBRCxDQUFDLEFBeEdELElBd0dDO0FBeEdZLFdBQVc7SUFEdkIsaUJBQVUsRUFBRTtxQ0FLcUIsbUJBQVE7R0FKN0IsV0FBVyxDQXdHdkI7QUF4R1ksa0NBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgTWF0ZXJpYWxzIH0gZnJvbSBcIi4vbWF0ZXJpYWxzXCI7XHJcbmltcG9ydCB7IERhdGEgfSBmcm9tIFwiLi9kYXRhXCI7XHJcbmltcG9ydCB7IE5lZWRzIH0gZnJvbSBcIi4vbmVlZHNcIjtcclxuaW1wb3J0IHsgUGF0aWVudHMgfSBmcm9tIFwiLi9wYXRpZW50c1wiO1xyXG5pbXBvcnQgeyBDb3VjaGJhc2UgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWNvdWNoYmFzZVwiO1xyXG5pbXBvcnQgeyBEYXRhYmFzZSB9IGZyb20gXCIuL2RhdGFiYXNlXCI7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xyXG5pbXBvcnQgeyBVc2VyU2VydmljZSB9IGZyb20gJy4uL3VzZXIvdXNlci5zZXJ2aWNlJztcclxuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci9tYXAnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgRGF0YVNlcnZpY2Uge1xyXG5cclxuICAgIHB1YmxpYyBkYXRhOiBhbnk7XHJcbiBcclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZGF0YWJhc2U6IERhdGFiYXNlLCAvL3ByaXZhdGUgdXNlclNlcnZpY2U6IFVzZXJTZXJ2aWNlIGVycm8gYW8gaW5qZXRhclxyXG4gICAgICAgICkge1xyXG4gICAgICAgIC8vdGhpcy5kYXRhID0gZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKTtcclxuICAgICAgICB0aGlzLmRlbGV0ZURhdGEoJ3VzZXInKTtcclxuICAgICAgICB0aGlzLnNob3dEYXRhKCdkYXRhJyk7XHJcbiAgICAgICAgdGhpcy5zaG93RGF0YSgndXNlcicpO1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgfVxyXG5cclxuICAgIHNldFVzZXIocmVnaXN0ZXJlZFVzZXIpIHtcclxuICAgICAgICB0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuY3JlYXRlRG9jdW1lbnQoe1xyXG4gICAgICAgICAgICBcInR5cGVcIjogXCJ1c2VyXCIsXHJcbiAgICAgICAgICAgIFwidXNlclwiOiByZWdpc3RlcmVkVXNlclxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vdGhpcy51c2VyU2VydmljZS5jcmVhdGVVc2VyKHJlZ2lzdGVyZWRVc2VyKTtcclxuICAgIH1cclxuICAgIHNldFBhdGllbnRzKCkge1xyXG5cclxuICAgIH1cclxuICAgIHNldE1hdGVyaWFscygpIHtcclxuXHJcbiAgICB9XHJcbiAgICBzZXREYXRhKGRhdGEpIHtcclxuICAgICAgICAvKlxyXG4gICAgICAgIGNvbnNvbGUubG9nKCdvbGEnKTtcclxuICAgICAgICBsZXQgcm93cyA9IHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5leGVjdXRlUXVlcnkoXCJkYXRhXCIpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHJvd3MubGVuZ3RoKTtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgcm93cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLmRhdGEucHVzaChyb3dzW2ldKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2EgaW5zZXJpcicpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkodGhpcy5kYXRhLCBudWxsLCA0KSk7XHJcbiAgICAgICAgKi9cclxuICAgICAgICAvL3RoaXMuZGF0YSA9IGRhdGE7XHJcbiAgICB9XHJcbiAgICBzZXROZWVkcygpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0VG9rZW4oKTogc3RyaW5nIHtcclxuICAgICAgICB2YXIgdXNlcjtcclxuICAgICAgICBpZih1c2VyID0gdGhpcy5nZXRMYXRlc3RVc2VyVG9SZWdpc3RlcigpKSB7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdXNlci5jYXJlZ2l2ZXJfdG9rZW47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFVzZXJJRCgpOiBzdHJpbmcge1xyXG4gICAgICAgIHZhciB1c2VyO1xyXG4gICAgICAgIGlmKHVzZXIgPSB0aGlzLmdldExhdGVzdFVzZXJUb1JlZ2lzdGVyKCkpIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHJldHVybiB1c2VyLmlkO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBnZXRMYXRlc3RVc2VyVG9SZWdpc3RlcigpIHtcclxuICAgICAgICB2YXIgdXNlcnMgPSB0aGlzLmdldEFsbFVzZXJzKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYodXNlcnMpIHtcclxuICAgICAgICAgICAgdmFyIGxhc3RVc2VyO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpIGluIHVzZXJzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodXNlcnMuaGFzT3duUHJvcGVydHkoaSkgJiYgdHlwZW9mKGkpICE9PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGFzdFVzZXIgPSB1c2Vyc1tpXTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gbGFzdFVzZXIudXNlcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkZWxldGVEYXRhKHZpZXcpIHtcclxuICAgICAgICBsZXQgZG9jdW1lbnRzID0gdGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmV4ZWN1dGVRdWVyeSh2aWV3KTtcclxuICAgICAgICBjb25zb2xlLmxvZygnQSBhcGFnYXIgYmQ6ICcgKyB2aWV3KTtcclxuICAgICAgICAvLyBsb29wIG92ZXIgYWxsIGRvY3VtZW50c1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZG9jdW1lbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIC8vIGRlbGV0ZSBlYWNoIGRvY3VtZW50XHJcbiAgICAgICAgICAgIC8vIGNvdWNoYmFzZSB3aWxsIGFzc2lnbiBhbiBpZCAoX2lkKSB0byBhIGRvY3VtZW50IHdoZW4gY3JlYXRlZFxyXG4gICAgICAgICAgICB0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZGVsZXRlRG9jdW1lbnQoZG9jdW1lbnRzW2ldLl9pZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRBbGxVc2Vycygpe1xyXG4gICAgICAgIGlmKHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5leGVjdXRlUXVlcnkoXCJ1c2VyXCIpLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5leGVjdXRlUXVlcnkoXCJ1c2VyXCIpO1xyXG4gICAgICAgIH0gICAgICAgICBcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNob3dEYXRhKHZpZXcpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnQSBtb3N0cmFyIGJkOiAnICsgdmlldyk7XHJcbiAgICAgICAgaWYodGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmV4ZWN1dGVRdWVyeSh2aWV3KS5sZW5ndGggPiAwKSB7ICAgICBcclxuICAgICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkodGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmV4ZWN1dGVRdWVyeSh2aWV3KSwgbnVsbCwgNCkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==
>>>>>>> 49503d25fee8f5eee665ca5ac57ebb8177b46ef7
