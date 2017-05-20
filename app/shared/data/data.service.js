"use strict";
var fs = require("file-system");
require("rxjs/add/operator/map");
var connector_service_1 = require("../../shared/connector/connector.service");
var core_1 = require("@angular/core");
var database_1 = require("./database");
var DataService = (function () {
    function DataService(database, connectorService) {
        this.database = database;
        this.connectorService = connectorService;
        console.log('Instanciou - DataService!');
        //this.data = database.getDatabase();
        //this.deleteData('data');
        //this.deleteData('user');
        //this.showData('data'); //Esta a dar excepcao e a imprimir os users tb???!!!!! (por confirmar) pq n tem dados e estoira?? mas imprime o user pq?
        //this.showData('user');
        //this.userData_id = this.getCurrentUserDocID();
    }
    DataService.prototype.ngOnInit = function () {
    };
    DataService.prototype.sync = function () {
        /*
        this.connectorService.getPatients()
            .subscribe(
            (result) => this.onGetDataSuccess(result),
            (error) => this.onGetDataError(error)
            );
            */
    };
    DataService.prototype.setUser = function (registeredUser) {
        this.userData_id = this.database.getDatabase().createDocument({
            "type": "user",
            "user": registeredUser
        });
        //console.log("AQUI"+JSON.stringify(this.database.getDatabase().getDocument(this.userData_id, null, 4)));
    };
    DataService.prototype.setPatients = function () {
    };
    DataService.prototype.setMaterials = function () {
    };
    DataService.prototype.getPatientsData = function () {
        return this.database.getDatabase().getDocument(this.patientsData_id).data;
    };
    DataService.prototype.setPatientsData = function (data) {
        //console.log("AQUI"+JSON.stringify(data));
        this.patientsData_id = this.database.getDatabase().createDocument({
            "type": "data",
            "data": data
        });
        //console.log("AQUI10"+JSON.stringify(this.database.getDatabase().getDocument(this.patientsData_id).data,null,4));
    };
    DataService.prototype.setNeeds = function () {
    };
    DataService.prototype.getToken = function () {
        return this.database.getDatabase().getDocument(this.userData_id).user.caregiver_token;
    };
    DataService.prototype.getUserID = function () {
        return this.database.getDatabase().getDocument(this.userData_id).user.id;
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
        if (this.database.getDatabase().executeQuery(view).length > 0) {
            for (var i = 0; i < documents.length; i++) {
                // delete each document
                // couchbase will assign an id (_id) to a document when created
                this.database.getDatabase().deleteDocument(documents[i]._id);
            }
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
    DataService.prototype.onCreateFile = function () {
        // >> fs-create-all-code
        var documents = fs.knownFolders.documents();
        this.folder = documents.getFolder(this.folderName || "testFolder");
        this.file = this.folder.getFile((this.fileName || "testFile") + ".txt");
        /*
        this.file.writeText(this.fileTextContent || "some random content")
            .then(result => {
                // Succeeded writing to the file.
                this.file.readText()
                    .then(res => {
                        this.successMessage = "Successfully saved in " + this.file.path;
                        this.writtenContent = res;
                        this.isItemVisible = true;
                    });
            }).catch(err => {
                // Error
            });
        // << fs-create-all-code
        */
    };
    DataService.prototype.getCurrentUserDocID = function () {
        var users = this.getAllUsers();
        if (users) {
            var lastUser;
            for (var i in users) {
                if (users.hasOwnProperty(i) && typeof (i) !== 'function') {
                    lastUser = users[i];
                    break;
                }
            }
            return lastUser._id;
        }
        return null;
    };
    DataService.prototype.isUserAuth = function () {
        if (this.userData_id) {
            return true;
        }
        return false;
    };
    return DataService;
}());
DataService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [database_1.Database, connector_service_1.ConnectorService])
], DataService);
exports.DataService = DataService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGF0YS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxnQ0FBa0M7QUFDbEMsaUNBQStCO0FBQy9CLDhFQUE0RTtBQUU1RSxzQ0FBMkM7QUFNM0MsdUNBQXNDO0FBS3RDLElBQWEsV0FBVztJQVNwQixxQkFBb0IsUUFBa0IsRUFBVSxnQkFBa0M7UUFBOUQsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUFVLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDMUUsT0FBTyxDQUFDLEdBQUcsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO1FBQ3pDLHFDQUFxQztRQUNyQywwQkFBMEI7UUFDMUIsMEJBQTBCO1FBQzFCLGlKQUFpSjtRQUNqSix3QkFBd0I7UUFDeEIsZ0RBQWdEO0lBQ3hELENBQUM7SUFFRCw4QkFBUSxHQUFSO0lBQ0EsQ0FBQztJQUNELDBCQUFJLEdBQUo7UUFDSTs7Ozs7O2NBTU07SUFDVixDQUFDO0lBRUQsNkJBQU8sR0FBUCxVQUFRLGNBQWM7UUFDbEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDLGNBQWMsQ0FBQztZQUMxRCxNQUFNLEVBQUUsTUFBTTtZQUNkLE1BQU0sRUFBRSxjQUFjO1NBQ3pCLENBQUMsQ0FBQztRQUNILHlHQUF5RztJQUM3RyxDQUFDO0lBQ0QsaUNBQVcsR0FBWDtJQUVBLENBQUM7SUFDRCxrQ0FBWSxHQUFaO0lBRUEsQ0FBQztJQUNELHFDQUFlLEdBQWY7UUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUM5RSxDQUFDO0lBQ0QscUNBQWUsR0FBZixVQUFnQixJQUFJO1FBQ2hCLDJDQUEyQztRQUMzQyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FB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QztvQkFDcEIsS0FBSyxDQUFDO2dCQUNWLENBQUM7WUFDTCxDQUFDO1lBQ0QsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUM7UUFDeEIsQ0FBQztRQUNELE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUNNLGdDQUFVLEdBQWpCO1FBQ0ksRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDbEIsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNoQixDQUFDO1FBQ0QsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBQ0wsa0JBQUM7QUFBRCxDQUFDLEFBbkpELElBbUpDO0FBbkpZLFdBQVc7SUFEdkIsaUJBQVUsRUFBRTtxQ0FVcUIsbUJBQVEsRUFBNEIsb0NBQWdCO0dBVHpFLFdBQVcsQ0FtSnZCO0FBbkpZLGtDQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgZnMgZnJvbSBcImZpbGUtc3lzdGVtXCI7XHJcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvbWFwJztcclxuaW1wb3J0IHsgQ29ubmVjdG9yU2VydmljZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9jb25uZWN0b3IvY29ubmVjdG9yLnNlcnZpY2UnO1xyXG5cclxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IE1hdGVyaWFscyB9IGZyb20gXCIuL21hdGVyaWFsc1wiO1xyXG5pbXBvcnQgeyBEYXRhIH0gZnJvbSBcIi4vZGF0YVwiO1xyXG5pbXBvcnQgeyBOZWVkcyB9IGZyb20gXCIuL25lZWRzXCI7XHJcbmltcG9ydCB7IFBhdGllbnQgfSBmcm9tIFwiLi4vLi4vcGF0aWVudC9wYXRpZW50XCI7XHJcbmltcG9ydCB7IENvdWNoYmFzZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtY291Y2hiYXNlXCI7XHJcbmltcG9ydCB7IERhdGFiYXNlIH0gZnJvbSBcIi4vZGF0YWJhc2VcIjtcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XHJcbmltcG9ydCB7IFVzZXJTZXJ2aWNlIH0gZnJvbSAnLi4vdXNlci91c2VyLnNlcnZpY2UnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgRGF0YVNlcnZpY2Uge1xyXG5cclxuICAgIHB1YmxpYyBwYXRpZW50c0RhdGFfaWQ6IGFueTtcclxuICAgIHB1YmxpYyB1c2VyRGF0YV9pZDogYW55O1xyXG4gICAgcHVibGljIGZpbGU6IGZzLkZpbGU7XHJcbiAgICBwdWJsaWMgZm9sZGVyOiBmcy5Gb2xkZXI7XHJcbiAgICBwdWJsaWMgZm9sZGVyTmFtZTogc3RyaW5nO1xyXG4gICAgcHVibGljIGZpbGVOYW1lOiBzdHJpbmc7XHJcbiBcclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZGF0YWJhc2U6IERhdGFiYXNlLCBwcml2YXRlIGNvbm5lY3RvclNlcnZpY2U6IENvbm5lY3RvclNlcnZpY2UpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ0luc3RhbmNpb3UgLSBEYXRhU2VydmljZSEnKTtcclxuICAgICAgICAgICAgLy90aGlzLmRhdGEgPSBkYXRhYmFzZS5nZXREYXRhYmFzZSgpO1xyXG4gICAgICAgICAgICAvL3RoaXMuZGVsZXRlRGF0YSgnZGF0YScpO1xyXG4gICAgICAgICAgICAvL3RoaXMuZGVsZXRlRGF0YSgndXNlcicpO1xyXG4gICAgICAgICAgICAvL3RoaXMuc2hvd0RhdGEoJ2RhdGEnKTsgLy9Fc3RhIGEgZGFyIGV4Y2VwY2FvIGUgYSBpbXByaW1pciBvcyB1c2VycyB0Yj8/PyEhISEhIChwb3IgY29uZmlybWFyKSBwcSBuIHRlbSBkYWRvcyBlIGVzdG9pcmE/PyBtYXMgaW1wcmltZSBvIHVzZXIgcHE/XHJcbiAgICAgICAgICAgIC8vdGhpcy5zaG93RGF0YSgndXNlcicpO1xyXG4gICAgICAgICAgICAvL3RoaXMudXNlckRhdGFfaWQgPSB0aGlzLmdldEN1cnJlbnRVc2VyRG9jSUQoKTtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgIH1cclxuICAgIHN5bmMoKSB7XHJcbiAgICAgICAgLypcclxuICAgICAgICB0aGlzLmNvbm5lY3RvclNlcnZpY2UuZ2V0UGF0aWVudHMoKVxyXG4gICAgICAgICAgICAuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICAocmVzdWx0KSA9PiB0aGlzLm9uR2V0RGF0YVN1Y2Nlc3MocmVzdWx0KSxcclxuICAgICAgICAgICAgKGVycm9yKSA9PiB0aGlzLm9uR2V0RGF0YUVycm9yKGVycm9yKVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAqL1xyXG4gICAgfVxyXG4gXHJcbiAgICBzZXRVc2VyKHJlZ2lzdGVyZWRVc2VyKSB7XHJcbiAgICAgICAgdGhpcy51c2VyRGF0YV9pZCA9IHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5jcmVhdGVEb2N1bWVudCh7XHJcbiAgICAgICAgICAgIFwidHlwZVwiOiBcInVzZXJcIixcclxuICAgICAgICAgICAgXCJ1c2VyXCI6IHJlZ2lzdGVyZWRVc2VyXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIkFRVUlcIitKU09OLnN0cmluZ2lmeSh0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZ2V0RG9jdW1lbnQodGhpcy51c2VyRGF0YV9pZCwgbnVsbCwgNCkpKTtcclxuICAgIH1cclxuICAgIHNldFBhdGllbnRzKCkge1xyXG5cclxuICAgIH1cclxuICAgIHNldE1hdGVyaWFscygpIHtcclxuXHJcbiAgICB9XHJcbiAgICBnZXRQYXRpZW50c0RhdGEoKXsgICBcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmdldERvY3VtZW50KHRoaXMucGF0aWVudHNEYXRhX2lkKS5kYXRhO1xyXG4gICAgfVxyXG4gICAgc2V0UGF0aWVudHNEYXRhKGRhdGEpIHtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKFwiQVFVSVwiK0pTT04uc3RyaW5naWZ5KGRhdGEpKTtcclxuICAgICAgICB0aGlzLnBhdGllbnRzRGF0YV9pZCA9IHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5jcmVhdGVEb2N1bWVudCh7XHJcbiAgICAgICAgICAgIFwidHlwZVwiOiBcImRhdGFcIixcclxuICAgICAgICAgICAgXCJkYXRhXCI6IGRhdGFcclxuICAgICAgICB9KTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKFwiQVFVSTEwXCIrSlNPTi5zdHJpbmdpZnkodGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmdldERvY3VtZW50KHRoaXMucGF0aWVudHNEYXRhX2lkKS5kYXRhLG51bGwsNCkpO1xyXG4gICAgfVxyXG4gICAgc2V0TmVlZHMoKSB7XHJcblxyXG4gICAgfVxyXG4gICAgZ2V0VG9rZW4oKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmdldERvY3VtZW50KHRoaXMudXNlckRhdGFfaWQpLnVzZXIuY2FyZWdpdmVyX3Rva2VuO1xyXG4gICAgfVxyXG4gICAgZ2V0VXNlcklEKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5nZXREb2N1bWVudCh0aGlzLnVzZXJEYXRhX2lkKS51c2VyLmlkO1xyXG4gICAgfVxyXG4gICAgZ2V0TGF0ZXN0VXNlclRvUmVnaXN0ZXIoKSB7XHJcbiAgICAgICAgdmFyIHVzZXJzID0gdGhpcy5nZXRBbGxVc2VycygpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKHVzZXJzKSB7XHJcbiAgICAgICAgICAgIHZhciBsYXN0VXNlcjtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSBpbiB1c2Vycykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHVzZXJzLmhhc093blByb3BlcnR5KGkpICYmIHR5cGVvZihpKSAhPT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxhc3RVc2VyID0gdXNlcnNbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGxhc3RVc2VyLnVzZXI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBkZWxldGVEYXRhKHZpZXcpIHtcclxuICAgICAgICBsZXQgZG9jdW1lbnRzID0gdGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmV4ZWN1dGVRdWVyeSh2aWV3KTtcclxuICAgICAgICBjb25zb2xlLmxvZygnQSBhcGFnYXIgYmQ6ICcgKyB2aWV3KTtcclxuICAgICAgICAvLyBsb29wIG92ZXIgYWxsIGRvY3VtZW50c1xyXG4gICAgICAgIGlmKHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5leGVjdXRlUXVlcnkodmlldykubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRvY3VtZW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgLy8gZGVsZXRlIGVhY2ggZG9jdW1lbnRcclxuICAgICAgICAgICAgICAgIC8vIGNvdWNoYmFzZSB3aWxsIGFzc2lnbiBhbiBpZCAoX2lkKSB0byBhIGRvY3VtZW50IHdoZW4gY3JlYXRlZFxyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmRlbGV0ZURvY3VtZW50KGRvY3VtZW50c1tpXS5faWQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHVibGljIGdldEFsbFVzZXJzKCl7XHJcbiAgICAgICAgaWYodGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmV4ZWN1dGVRdWVyeShcInVzZXJcIikubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmV4ZWN1dGVRdWVyeShcInVzZXJcIik7XHJcbiAgICAgICAgfSAgICAgICAgIFxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzaG93RGF0YSh2aWV3KSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ0EgbW9zdHJhciBiZDogJyArIHZpZXcgKyAnIGNvbSAnICsgdGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmV4ZWN1dGVRdWVyeSh2aWV3KS5sZW5ndGggKyAnIGVsZW1lbnRvcycpO1xyXG4gICAgICAgIGlmKHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5leGVjdXRlUXVlcnkodmlldykubGVuZ3RoID4gMCkgeyAgICAgXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5leGVjdXRlUXVlcnkodmlldyksIG51bGwsIDQpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAgcHVibGljIG9uQ3JlYXRlRmlsZSgpIHtcclxuICAgICAgICAvLyA+PiBmcy1jcmVhdGUtYWxsLWNvZGVcclxuICAgICAgICBsZXQgZG9jdW1lbnRzID0gZnMua25vd25Gb2xkZXJzLmRvY3VtZW50cygpO1xyXG4gICAgICAgIHRoaXMuZm9sZGVyID0gZG9jdW1lbnRzLmdldEZvbGRlcih0aGlzLmZvbGRlck5hbWUgfHwgXCJ0ZXN0Rm9sZGVyXCIpO1xyXG4gICAgICAgIHRoaXMuZmlsZSA9IHRoaXMuZm9sZGVyLmdldEZpbGUoKHRoaXMuZmlsZU5hbWUgfHwgXCJ0ZXN0RmlsZVwiKSArIFwiLnR4dFwiKTtcclxuXHJcbiAgICAgICAgXHJcbiAgICAgICAgLypcclxuICAgICAgICB0aGlzLmZpbGUud3JpdGVUZXh0KHRoaXMuZmlsZVRleHRDb250ZW50IHx8IFwic29tZSByYW5kb20gY29udGVudFwiKVxyXG4gICAgICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gU3VjY2VlZGVkIHdyaXRpbmcgdG8gdGhlIGZpbGUuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmZpbGUucmVhZFRleHQoKVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3VjY2Vzc01lc3NhZ2UgPSBcIlN1Y2Nlc3NmdWxseSBzYXZlZCBpbiBcIiArIHRoaXMuZmlsZS5wYXRoO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLndyaXR0ZW5Db250ZW50ID0gcmVzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmlzSXRlbVZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KS5jYXRjaChlcnIgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gRXJyb3JcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gPDwgZnMtY3JlYXRlLWFsbC1jb2RlXHJcbiAgICAgICAgKi9cclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRDdXJyZW50VXNlckRvY0lEKCkge1xyXG4gICAgICAgIHZhciB1c2VycyA9IHRoaXMuZ2V0QWxsVXNlcnMoKTtcclxuICAgICAgICBcclxuICAgICAgICBpZih1c2Vycykge1xyXG4gICAgICAgICAgICB2YXIgbGFzdFVzZXI7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgaW4gdXNlcnMpIHtcclxuICAgICAgICAgICAgICAgIGlmICh1c2Vycy5oYXNPd25Qcm9wZXJ0eShpKSAmJiB0eXBlb2YoaSkgIT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgICAgICAgICBsYXN0VXNlciA9IHVzZXJzW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBsYXN0VXNlci5faWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGlzVXNlckF1dGgoKSB7XHJcbiAgICAgICAgaWYodGhpcy51c2VyRGF0YV9pZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlOyBcclxuICAgIH1cclxufSJdfQ==