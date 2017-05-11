"use strict";
var core_1 = require("@angular/core");
var database_1 = require("./database");
require("rxjs/add/operator/map");
var DataService = (function () {
    function DataService(database) {
        this.database = database;
        //this.data = database.getDatabase();
        //this.deleteData('user');
        //this.deleteData('data');
        //this.showData('data'); //Esta a dar excepcao e a imprimir os users tb???!!!!! (por confirmar) pq n tem dados e estoira?? mas imprime o user pq?
        //this.showData('user');
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
        console.log('A mostrar bd: ' + view + ' com ' + this.database.getDatabase().executeQuery(view).length + ' elementos');
        if (this.database.getDatabase().executeQuery(view).length > 0) {
            console.log(JSON.stringify(this.database.getDatabase().executeQuery(view), null, 4));
        }
    };
    return DataService;
}());
DataService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [database_1.Database])
], DataService);
exports.DataService = DataService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGF0YS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxzQ0FBMkM7QUFNM0MsdUNBQXNDO0FBR3RDLGlDQUErQjtBQUcvQixJQUFhLFdBQVc7SUFJcEIscUJBQW9CLFFBQWtCO1FBQWxCLGFBQVEsR0FBUixRQUFRLENBQVU7UUFFbEMscUNBQXFDO1FBQ3JDLDBCQUEwQjtRQUMxQiwwQkFBMEI7UUFDMUIsaUpBQWlKO1FBQ2pKLHdCQUF3QjtJQUM1QixDQUFDO0lBRUQsOEJBQVEsR0FBUjtJQUNBLENBQUM7SUFFRCw2QkFBTyxHQUFQLFVBQVEsY0FBYztRQUNsQixJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDLGNBQWMsQ0FBQztZQUN2QyxNQUFNLEVBQUUsTUFBTTtZQUNkLE1BQU0sRUFBRSxjQUFjO1NBQ3pCLENBQUMsQ0FBQztRQUNILDhDQUE4QztJQUNsRCxDQUFDO0lBQ0QsaUNBQVcsR0FBWDtJQUVBLENBQUM7SUFDRCxrQ0FBWSxHQUFaO0lBRUEsQ0FBQztJQUNELDZCQUFPLEdBQVAsVUFBUSxJQUFJO1FBQ1I7Ozs7Ozs7Ozs7VUFVRTtRQUNGLG1CQUFtQjtJQUN2QixDQUFDO0lBQ0QsOEJBQVEsR0FBUjtJQUVBLENBQUM7SUFDRCw4QkFBUSxHQUFSO1FBQ0ksSUFBSSxJQUFJLENBQUM7UUFDVCxFQUFFLENBQUEsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLHVCQUF1QixFQUFFLENBQUMsQ0FBQyxDQUFDO1lBRXZDLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDO1FBQ2hDLENBQUM7UUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFDRCwrQkFBUyxHQUFUO1FBQ0ksSUFBSSxJQUFJLENBQUM7UUFDVCxFQUFFLENBQUEsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLHVCQUF1QixFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3ZDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO1FBQ25CLENBQUM7UUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFDRCw2Q0FBdUIsR0FBdkI7UUFDSSxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFFL0IsRUFBRSxDQUFBLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNQLElBQUksUUFBUSxDQUFDO1lBQ2IsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDbEIsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsSUFBSSxPQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssVUFBVSxDQUFDLENBQUMsQ0FBQztvQkFDdEQsUUFBUSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDcEIsS0FBSyxDQUFDO2dCQUNWLENBQUM7WUFDTCxDQUFDO1lBQ0QsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7UUFDekIsQ0FBQztRQUNELE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUNNLGdDQUFVLEdBQWpCLFVBQWtCLElBQUk7UUFDbEIsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDL0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLENBQUM7UUFDcEMsMEJBQTBCO1FBQzFCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQ3hDLHVCQUF1QjtZQUN2QiwrREFBK0Q7WUFDL0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2pFLENBQUM7SUFDTCxDQUFDO0lBQ00saUNBQVcsR0FBbEI7UUFDSSxFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM3RCxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDNUQsQ0FBQztRQUNELE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUNNLDhCQUFRLEdBQWYsVUFBZ0IsSUFBSTtRQUNoQixPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixHQUFHLElBQUksR0FBRyxPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxHQUFHLFlBQVksQ0FBQyxDQUFDO1FBQ3RILEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzNELE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN6RixDQUFDO0lBQ0wsQ0FBQztJQUNMLGtCQUFDO0FBQUQsQ0FBQyxBQWxHRCxJQWtHQztBQWxHWSxXQUFXO0lBRHZCLGlCQUFVLEVBQUU7cUNBS3FCLG1CQUFRO0dBSjdCLFdBQVcsQ0FrR3ZCO0FBbEdZLGtDQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IE1hdGVyaWFscyB9IGZyb20gXCIuL21hdGVyaWFsc1wiO1xyXG5pbXBvcnQgeyBEYXRhIH0gZnJvbSBcIi4vZGF0YVwiO1xyXG5pbXBvcnQgeyBOZWVkcyB9IGZyb20gXCIuL25lZWRzXCI7XHJcbmltcG9ydCB7IFBhdGllbnRzIH0gZnJvbSBcIi4vcGF0aWVudHNcIjtcclxuaW1wb3J0IHsgQ291Y2hiYXNlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1jb3VjaGJhc2VcIjtcclxuaW1wb3J0IHsgRGF0YWJhc2UgfSBmcm9tIFwiLi9kYXRhYmFzZVwiO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcclxuaW1wb3J0IHsgVXNlclNlcnZpY2UgfSBmcm9tICcuLi91c2VyL3VzZXIuc2VydmljZSc7XHJcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvbWFwJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIERhdGFTZXJ2aWNlIHtcclxuXHJcbiAgICBwdWJsaWMgZGF0YTogYW55O1xyXG4gXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRhdGFiYXNlOiBEYXRhYmFzZSwgLy9wcml2YXRlIHVzZXJTZXJ2aWNlOiBVc2VyU2VydmljZSBlcnJvIGFvIGluamV0YXJcclxuICAgICAgICApIHtcclxuICAgICAgICAvL3RoaXMuZGF0YSA9IGRhdGFiYXNlLmdldERhdGFiYXNlKCk7XHJcbiAgICAgICAgLy90aGlzLmRlbGV0ZURhdGEoJ3VzZXInKTtcclxuICAgICAgICAvL3RoaXMuZGVsZXRlRGF0YSgnZGF0YScpO1xyXG4gICAgICAgIC8vdGhpcy5zaG93RGF0YSgnZGF0YScpOyAvL0VzdGEgYSBkYXIgZXhjZXBjYW8gZSBhIGltcHJpbWlyIG9zIHVzZXJzIHRiPz8/ISEhISEgKHBvciBjb25maXJtYXIpIHBxIG4gdGVtIGRhZG9zIGUgZXN0b2lyYT8/IG1hcyBpbXByaW1lIG8gdXNlciBwcT9cclxuICAgICAgICAvL3RoaXMuc2hvd0RhdGEoJ3VzZXInKTtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgIH1cclxuIFxyXG4gICAgc2V0VXNlcihyZWdpc3RlcmVkVXNlcikge1xyXG4gICAgICAgIHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5jcmVhdGVEb2N1bWVudCh7XHJcbiAgICAgICAgICAgIFwidHlwZVwiOiBcInVzZXJcIixcclxuICAgICAgICAgICAgXCJ1c2VyXCI6IHJlZ2lzdGVyZWRVc2VyXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy90aGlzLnVzZXJTZXJ2aWNlLmNyZWF0ZVVzZXIocmVnaXN0ZXJlZFVzZXIpO1xyXG4gICAgfVxyXG4gICAgc2V0UGF0aWVudHMoKSB7XHJcblxyXG4gICAgfVxyXG4gICAgc2V0TWF0ZXJpYWxzKCkge1xyXG5cclxuICAgIH1cclxuICAgIHNldERhdGEoZGF0YSkge1xyXG4gICAgICAgIC8qXHJcbiAgICAgICAgY29uc29sZS5sb2coJ29sYScpO1xyXG4gICAgICAgIGxldCByb3dzID0gdGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmV4ZWN1dGVRdWVyeShcImRhdGFcIik7XHJcbiAgICAgICAgY29uc29sZS5sb2cocm93cy5sZW5ndGgpO1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCByb3dzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YS5wdXNoKHJvd3NbaV0pO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnYSBpbnNlcmlyJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeSh0aGlzLmRhdGEsIG51bGwsIDQpKTtcclxuICAgICAgICAqL1xyXG4gICAgICAgIC8vdGhpcy5kYXRhID0gZGF0YTtcclxuICAgIH1cclxuICAgIHNldE5lZWRzKCkge1xyXG5cclxuICAgIH1cclxuICAgIGdldFRva2VuKCk6IHN0cmluZyB7XHJcbiAgICAgICAgdmFyIHVzZXI7XHJcbiAgICAgICAgaWYodXNlciA9IHRoaXMuZ2V0TGF0ZXN0VXNlclRvUmVnaXN0ZXIoKSkge1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHVzZXIuY2FyZWdpdmVyX3Rva2VuO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIGdldFVzZXJJRCgpOiBzdHJpbmcge1xyXG4gICAgICAgIHZhciB1c2VyO1xyXG4gICAgICAgIGlmKHVzZXIgPSB0aGlzLmdldExhdGVzdFVzZXJUb1JlZ2lzdGVyKCkpIHsgICAgICAgICAgXHJcbiAgICAgICAgICAgIHJldHVybiB1c2VyLmlkO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIGdldExhdGVzdFVzZXJUb1JlZ2lzdGVyKCkge1xyXG4gICAgICAgIHZhciB1c2VycyA9IHRoaXMuZ2V0QWxsVXNlcnMoKTtcclxuICAgICAgICBcclxuICAgICAgICBpZih1c2Vycykge1xyXG4gICAgICAgICAgICB2YXIgbGFzdFVzZXI7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgaW4gdXNlcnMpIHtcclxuICAgICAgICAgICAgICAgIGlmICh1c2Vycy5oYXNPd25Qcm9wZXJ0eShpKSAmJiB0eXBlb2YoaSkgIT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgICAgICAgICBsYXN0VXNlciA9IHVzZXJzW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBsYXN0VXNlci51c2VyO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZGVsZXRlRGF0YSh2aWV3KSB7XHJcbiAgICAgICAgbGV0IGRvY3VtZW50cyA9IHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5leGVjdXRlUXVlcnkodmlldyk7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ0EgYXBhZ2FyIGJkOiAnICsgdmlldyk7XHJcbiAgICAgICAgLy8gbG9vcCBvdmVyIGFsbCBkb2N1bWVudHNcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRvY3VtZW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAvLyBkZWxldGUgZWFjaCBkb2N1bWVudFxyXG4gICAgICAgICAgICAvLyBjb3VjaGJhc2Ugd2lsbCBhc3NpZ24gYW4gaWQgKF9pZCkgdG8gYSBkb2N1bWVudCB3aGVuIGNyZWF0ZWRcclxuICAgICAgICAgICAgdGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmRlbGV0ZURvY3VtZW50KGRvY3VtZW50c1tpXS5faWQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRBbGxVc2Vycygpe1xyXG4gICAgICAgIGlmKHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5leGVjdXRlUXVlcnkoXCJ1c2VyXCIpLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5leGVjdXRlUXVlcnkoXCJ1c2VyXCIpO1xyXG4gICAgICAgIH0gICAgICAgICBcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2hvd0RhdGEodmlldykge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdBIG1vc3RyYXIgYmQ6ICcgKyB2aWV3ICsgJyBjb20gJyArIHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5leGVjdXRlUXVlcnkodmlldykubGVuZ3RoICsgJyBlbGVtZW50b3MnKTtcclxuICAgICAgICBpZih0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZXhlY3V0ZVF1ZXJ5KHZpZXcpLmxlbmd0aCA+IDApIHsgICAgIFxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeSh0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZXhlY3V0ZVF1ZXJ5KHZpZXcpLCBudWxsLCA0KSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il19