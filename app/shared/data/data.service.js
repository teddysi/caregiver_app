"use strict";
var core_1 = require("@angular/core");
var database_1 = require("./database");
require("rxjs/add/operator/map");
var DataService = (function () {
    function DataService(database) {
        this.database = database;
        this.data = database.getDatabase();
        //this.deleteData();
    }
    DataService.prototype.ngOnInit = function () {
    };
    DataService.prototype.setUser = function (registeredUser) {
        this.database.getDatabase().createDocument({
            "type": "user",
            "user": registeredUser
        });
    };
    DataService.prototype.setPatients = function () {
    };
    DataService.prototype.setMaterials = function () {
    };
    DataService.prototype.setData = function (data) {
        /*
        console.log('ola');
        let rows = this.database.getDatabase().executeQuery("data");
        console.log(rows.length);
        for(let i = 0; i < rows.length; i++) {
            this.data.push(rows[i]);
            console.log('a inserir');
        }

        console.log(JSON.stringify(this.data, null, 4));
        */
        //this.data = data;
    };
    DataService.prototype.setNeeds = function () {
    };
    DataService.prototype.getToken = function () {
        var user;
        if (user = this.getLatestUserToRegister()) {
            return user.caregiver_token;
        }
        return false;
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
    DataService.prototype.deleteData = function () {
        var documents = this.database.getDatabase().executeQuery("user");
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
    return DataService;
}());
DataService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [database_1.Database])
], DataService);
exports.DataService = DataService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGF0YS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxzQ0FBMkM7QUFNM0MsdUNBQXNDO0FBRXRDLGlDQUErQjtBQUcvQixJQUFhLFdBQVc7SUFJcEIscUJBQW9CLFFBQWtCO1FBQWxCLGFBQVEsR0FBUixRQUFRLENBQVU7UUFDbEMsSUFBSSxDQUFDLElBQUksR0FBRyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbkMsb0JBQW9CO0lBQ3hCLENBQUM7SUFFRCw4QkFBUSxHQUFSO0lBQ0EsQ0FBQztJQUVELDZCQUFPLEdBQVAsVUFBUSxjQUFjO1FBQ2xCLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUMsY0FBYyxDQUFDO1lBQ3ZDLE1BQU0sRUFBRSxNQUFNO1lBQ2QsTUFBTSxFQUFFLGNBQWM7U0FDekIsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUNELGlDQUFXLEdBQVg7SUFFQSxDQUFDO0lBQ0Qsa0NBQVksR0FBWjtJQUVBLENBQUM7SUFDRCw2QkFBTyxHQUFQLFVBQVEsSUFBSTtRQUNSOzs7Ozs7Ozs7O1VBVUU7UUFDRixtQkFBbUI7SUFDdkIsQ0FBQztJQUNELDhCQUFRLEdBQVI7SUFFQSxDQUFDO0lBRUQsOEJBQVEsR0FBUjtRQUNJLElBQUksSUFBSSxDQUFDO1FBQ1QsRUFBRSxDQUFBLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN2QyxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQztRQUNoQyxDQUFDO1FBQ0QsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBRUQsNkNBQXVCLEdBQXZCO1FBQ0ksSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBRS9CLEVBQUUsQ0FBQSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDUCxJQUFJLFFBQVEsQ0FBQztZQUNiLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ2xCLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLElBQUksT0FBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLFVBQVUsQ0FBQyxDQUFDLENBQUM7b0JBQ3RELFFBQVEsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3BCLEtBQUssQ0FBQztnQkFDVixDQUFDO1lBQ0wsQ0FBQztZQUNELE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO1FBQ3pCLENBQUM7UUFDRCxNQUFNLENBQUMsS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFFTSxnQ0FBVSxHQUFqQjtRQUNJLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRWpFLDBCQUEwQjtRQUMxQixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUN4Qyx1QkFBdUI7WUFDdkIsK0RBQStEO1lBQy9ELElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNqRSxDQUFDO0lBQ0wsQ0FBQztJQUVNLGlDQUFXLEdBQWxCO1FBQ0ksRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDN0QsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzVELENBQUM7UUFDRCxNQUFNLENBQUMsS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFDTCxrQkFBQztBQUFELENBQUMsQUFuRkQsSUFtRkM7QUFuRlksV0FBVztJQUR2QixpQkFBVSxFQUFFO3FDQUtxQixtQkFBUTtHQUo3QixXQUFXLENBbUZ2QjtBQW5GWSxrQ0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBNYXRlcmlhbHMgfSBmcm9tIFwiLi9tYXRlcmlhbHNcIjtcclxuaW1wb3J0IHsgRGF0YSB9IGZyb20gXCIuL2RhdGFcIjtcclxuaW1wb3J0IHsgTmVlZHMgfSBmcm9tIFwiLi9uZWVkc1wiO1xyXG5pbXBvcnQgeyBQYXRpZW50cyB9IGZyb20gXCIuL3BhdGllbnRzXCI7XHJcbmltcG9ydCB7IENvdWNoYmFzZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtY291Y2hiYXNlXCI7XHJcbmltcG9ydCB7IERhdGFiYXNlIH0gZnJvbSBcIi4vZGF0YWJhc2VcIjtcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XHJcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvbWFwJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIERhdGFTZXJ2aWNlIHtcclxuXHJcbiAgICBwdWJsaWMgZGF0YTogYW55O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZGF0YWJhc2U6IERhdGFiYXNlKSB7XHJcbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKTtcclxuICAgICAgICAvL3RoaXMuZGVsZXRlRGF0YSgpO1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgfVxyXG5cclxuICAgIHNldFVzZXIocmVnaXN0ZXJlZFVzZXIpIHtcclxuICAgICAgICB0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuY3JlYXRlRG9jdW1lbnQoe1xyXG4gICAgICAgICAgICBcInR5cGVcIjogXCJ1c2VyXCIsXHJcbiAgICAgICAgICAgIFwidXNlclwiOiByZWdpc3RlcmVkVXNlclxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbiAgICBzZXRQYXRpZW50cygpIHtcclxuXHJcbiAgICB9XHJcbiAgICBzZXRNYXRlcmlhbHMoKSB7XHJcblxyXG4gICAgfVxyXG4gICAgc2V0RGF0YShkYXRhKSB7XHJcbiAgICAgICAgLypcclxuICAgICAgICBjb25zb2xlLmxvZygnb2xhJyk7XHJcbiAgICAgICAgbGV0IHJvd3MgPSB0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZXhlY3V0ZVF1ZXJ5KFwiZGF0YVwiKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhyb3dzLmxlbmd0aCk7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHJvd3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5kYXRhLnB1c2gocm93c1tpXSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdhIGluc2VyaXInKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHRoaXMuZGF0YSwgbnVsbCwgNCkpO1xyXG4gICAgICAgICovXHJcbiAgICAgICAgLy90aGlzLmRhdGEgPSBkYXRhO1xyXG4gICAgfVxyXG4gICAgc2V0TmVlZHMoKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGdldFRva2VuKCkge1xyXG4gICAgICAgIHZhciB1c2VyO1xyXG4gICAgICAgIGlmKHVzZXIgPSB0aGlzLmdldExhdGVzdFVzZXJUb1JlZ2lzdGVyKCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHVzZXIuY2FyZWdpdmVyX3Rva2VuO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0TGF0ZXN0VXNlclRvUmVnaXN0ZXIoKSB7XHJcbiAgICAgICAgdmFyIHVzZXJzID0gdGhpcy5nZXRBbGxVc2VycygpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKHVzZXJzKSB7XHJcbiAgICAgICAgICAgIHZhciBsYXN0VXNlcjtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSBpbiB1c2Vycykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHVzZXJzLmhhc093blByb3BlcnR5KGkpICYmIHR5cGVvZihpKSAhPT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxhc3RVc2VyID0gdXNlcnNbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGxhc3RVc2VyLnVzZXI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZGVsZXRlRGF0YSgpIHtcclxuICAgICAgICBsZXQgZG9jdW1lbnRzID0gdGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmV4ZWN1dGVRdWVyeShcInVzZXJcIik7XHJcblxyXG4gICAgICAgIC8vIGxvb3Agb3ZlciBhbGwgZG9jdW1lbnRzXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkb2N1bWVudHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgLy8gZGVsZXRlIGVhY2ggZG9jdW1lbnRcclxuICAgICAgICAgICAgLy8gY291Y2hiYXNlIHdpbGwgYXNzaWduIGFuIGlkIChfaWQpIHRvIGEgZG9jdW1lbnQgd2hlbiBjcmVhdGVkXHJcbiAgICAgICAgICAgIHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5kZWxldGVEb2N1bWVudChkb2N1bWVudHNbaV0uX2lkKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldEFsbFVzZXJzKCl7XHJcbiAgICAgICAgaWYodGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmV4ZWN1dGVRdWVyeShcInVzZXJcIikubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmV4ZWN1dGVRdWVyeShcInVzZXJcIik7XHJcbiAgICAgICAgfSAgICAgICAgIFxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxufSJdfQ==