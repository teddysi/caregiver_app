"use strict";
var fs = require("file-system");
require("rxjs/add/operator/map");
var core_1 = require("@angular/core");
var database_1 = require("./database");
var DataService = (function () {
    function DataService(database) {
        this.database = database;
        console.log('Instanciou - DataService!');
        //this.data = database.getDatabase();
        //this.deleteData('data');
        //this.deleteData('user');
        //this.deleteData('materials');
        //this.showData('data'); //Esta a dar excepcao e a imprimir os users tb???!!!!! (por confirmar) pq n tem dados e estoira?? mas imprime o user pq?
        //this.showData('user');
        this.showData('materials');
        this.userData_id = this.getCurrentUserDocID();
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
        console.log('Gravar dados Pacientes');
        //debug
        this.deleteData('data');
        this.deleteData('materials');
        //Todos os dados do paciente e ref _id
        this.patientsData_id = this.database.getDatabase().createDocument({
            "type": "data",
            "data": data
        });
        //Guarda dados dos Pacientes
        //Guarda dados das necessidades
        //Guarda dados dos materiais e adiciona ratings aos materiais
        var materials = [];
        for (var i = 0; i < data.length; i++) {
            for (var j = 0; j < data[i].needs.length; j++) {
                materials.push(data[i].needs[j].materials);
            }
        }
        for (var i = 0; i < materials.length; i++) {
            for (var j = 0; j < materials[i].length; j++) {
                materials[i][j]['ratings'] = [''];
            }
        }
        this.materials_id = this.database.getDatabase().createDocument({
            "type": "materials",
            "materials": materials,
        });
        //console.log(JSON.stringify(data[0].needs[0].materials,null,4));
        /*
        console.log('antes do for');
        console.log(JSON.stringify(data[0].needs.materials,null,4));
        //Juntar todos os materiais para colocar rating
        let materials = [];
        for(let i = 0; i < data.length; i++) {
            console.log('no for');
            console.log(JSON.stringify(data[0].needs.materials,null,4));
            materials.push(data[i].needs.materials);
        }
        console.log('MATERIALS');
        console.log(JSON.stringify(materials,null,4));
        this.materials_id = this.database.getDatabase().createDocument({
                "type": "materials",
                "data": materials,
        });
        this.showData('material');
        */
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
    //Guarda avaliações dos materiais
    DataService.prototype.setRating = function (rating) {
        //Recebo o rating, com id do material
        //Vou à BD dos materiais
        //Para cada material com aquele id, atualizar o seu rating.
        var materials = this.database.getDatabase().getDocument(this.materials_id).materials;
        //console.log(JSON.stringify(materials, null, 4));
        for (var i = 0; i < materials.length; i++) {
            for (var j = 0; j < materials[i].length; j++) {
                if (rating.id_material === materials[i][j].id) {
                    console.log('registou');
                    materials[i][j].ratings.push(rating);
                }
            }
        }
        //console.log(JSON.stringify(materials, null, 4));
        this.database.getDatabase().updateDocument(this.materials_id, {
            "type": "materials",
            "materials": materials,
        });
        //this.showData('materials');
    };
    DataService.prototype.getMaterialRating = function (material_id) {
    };
    DataService.prototype.getNeedMaterials = function () {
        return this.database.getDatabase().getDocument(this.materials_id).materials;
    };
    return DataService;
}());
DataService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [database_1.Database])
], DataService);
exports.DataService = DataService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGF0YS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxnQ0FBa0M7QUFDbEMsaUNBQStCO0FBSS9CLHNDQUEyQztBQU0zQyx1Q0FBc0M7QUFLdEMsSUFBYSxXQUFXO0lBWXBCLHFCQUFtQixRQUFrQjtRQUFsQixhQUFRLEdBQVIsUUFBUSxDQUFVO1FBRTdCLE9BQU8sQ0FBQyxHQUFHLENBQUMsMkJBQTJCLENBQUMsQ0FBQztRQUN6QyxxQ0FBcUM7UUFDckMsMEJBQTBCO1FBQzFCLDBCQUEwQjtRQUMxQiwrQkFBK0I7UUFDL0IsaUpBQWlKO1FBQ2pKLHdCQUF3QjtRQUN4QixJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzNCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7SUFFdEQsQ0FBQztJQUVELDhCQUFRLEdBQVI7SUFDQSxDQUFDO0lBQ0QsMEJBQUksR0FBSjtRQUNJOzs7Ozs7Y0FNTTtJQUNWLENBQUM7SUFFRCw2QkFBTyxHQUFQLFVBQVEsY0FBYztRQUNsQixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUMsY0FBYyxDQUFDO1lBQzFELE1BQU0sRUFBRSxNQUFNO1lBQ2QsTUFBTSxFQUFFLGNBQWM7U0FDekIsQ0FBQyxDQUFDO1FBQ0gseUdBQXlHO0lBQzdHLENBQUM7SUFDRCxpQ0FBVyxHQUFYO0lBRUEsQ0FBQztJQUNELGtDQUFZLEdBQVo7SUFFQSxDQUFDO0lBQ0QscUNBQWUsR0FBZjtRQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQzlFLENBQUM7SUFDRCxxQ0FBZSxHQUFmLFVBQWdCLElBQUk7UUFDaEIsT0FB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QUFDLENBQUMsQ0FBQztvQkFDM0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFDeEIsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3pDLENBQUM7WUFDTCxDQUFDO1FBQ0wsQ0FBQztRQUNELGtEQUFrRDtRQUVsRCxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQzFELE1BQU0sRUFBRSxXQUFXO1lBQ25CLFdBQVcsRUFBRSxTQUFTO1NBQ3pCLENBQUMsQ0FBQTtRQUVGLDZCQUE2QjtJQUVqQyxDQUFDO0lBQ00sdUNBQWlCLEdBQXhCLFVBQXlCLFdBQVc7SUFFcEMsQ0FBQztJQUVNLHNDQUFnQixHQUF2QjtRQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsU0FBUyxDQUFDO0lBQ2hGLENBQUM7SUFDTCxrQkFBQztBQUFELENBQUMsQUE3T0QsSUE2T0M7QUE3T1ksV0FBVztJQUR2QixpQkFBVSxFQUFFO3FDQWFvQixtQkFBUTtHQVo1QixXQUFXLENBNk92QjtBQTdPWSxrQ0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGZzIGZyb20gXCJmaWxlLXN5c3RlbVwiO1xyXG5pbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL21hcCc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xyXG5pbXBvcnQgeyBDb25uZWN0b3JTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2Nvbm5lY3Rvci9jb25uZWN0b3Iuc2VydmljZSc7XHJcblxyXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgTWF0ZXJpYWxzIH0gZnJvbSBcIi4vbWF0ZXJpYWxzXCI7XHJcbmltcG9ydCB7IERhdGEgfSBmcm9tIFwiLi9kYXRhXCI7XHJcbmltcG9ydCB7IE5lZWRzIH0gZnJvbSBcIi4vbmVlZHNcIjtcclxuaW1wb3J0IHsgUGF0aWVudCB9IGZyb20gXCIuLi8uLi9wYXRpZW50L3BhdGllbnRcIjtcclxuaW1wb3J0IHsgQ291Y2hiYXNlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1jb3VjaGJhc2VcIjtcclxuaW1wb3J0IHsgRGF0YWJhc2UgfSBmcm9tIFwiLi9kYXRhYmFzZVwiO1xyXG5pbXBvcnQgeyBVc2VyU2VydmljZSB9IGZyb20gJy4uL3VzZXIvdXNlci5zZXJ2aWNlJztcclxuXHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBEYXRhU2VydmljZSB7XHJcblxyXG4gICAgcHVibGljIHBhdGllbnRzRGF0YV9pZDogYW55O1xyXG4gICAgcHVibGljIHVzZXJEYXRhX2lkOiBhbnk7XHJcbiAgICBwdWJsaWMgbWF0ZXJpYWxzX2lkOiBhbnk7XHJcbiAgICBwdWJsaWMgcmF0aW5nc19pZDogYW55O1xyXG5cclxuICAgIHB1YmxpYyBmaWxlOiBmcy5GaWxlO1xyXG4gICAgcHVibGljIGZvbGRlcjogZnMuRm9sZGVyO1xyXG4gICAgcHVibGljIGZvbGRlck5hbWU6IHN0cmluZztcclxuICAgIHB1YmxpYyBmaWxlTmFtZTogc3RyaW5nO1xyXG4gXHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZGF0YWJhc2U6IERhdGFiYXNlLCAvL3B1YmxpYyBjb25uZWN0b3JTZXJ2aWNlOiBDb25uZWN0b3JTZXJ2aWNlKVxyXG4gICAgKXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ0luc3RhbmNpb3UgLSBEYXRhU2VydmljZSEnKTtcclxuICAgICAgICAgICAgLy90aGlzLmRhdGEgPSBkYXRhYmFzZS5nZXREYXRhYmFzZSgpO1xyXG4gICAgICAgICAgICAvL3RoaXMuZGVsZXRlRGF0YSgnZGF0YScpO1xyXG4gICAgICAgICAgICAvL3RoaXMuZGVsZXRlRGF0YSgndXNlcicpO1xyXG4gICAgICAgICAgICAvL3RoaXMuZGVsZXRlRGF0YSgnbWF0ZXJpYWxzJyk7XHJcbiAgICAgICAgICAgIC8vdGhpcy5zaG93RGF0YSgnZGF0YScpOyAvL0VzdGEgYSBkYXIgZXhjZXBjYW8gZSBhIGltcHJpbWlyIG9zIHVzZXJzIHRiPz8/ISEhISEgKHBvciBjb25maXJtYXIpIHBxIG4gdGVtIGRhZG9zIGUgZXN0b2lyYT8/IG1hcyBpbXByaW1lIG8gdXNlciBwcT9cclxuICAgICAgICAgICAgLy90aGlzLnNob3dEYXRhKCd1c2VyJyk7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd0RhdGEoJ21hdGVyaWFscycpO1xyXG4gICAgICAgICAgICB0aGlzLnVzZXJEYXRhX2lkID0gdGhpcy5nZXRDdXJyZW50VXNlckRvY0lEKCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgfVxyXG4gICAgc3luYygpIHtcclxuICAgICAgICAvKlxyXG4gICAgICAgIHRoaXMuY29ubmVjdG9yU2VydmljZS5nZXRQYXRpZW50cygpXHJcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgIChyZXN1bHQpID0+IHRoaXMub25HZXREYXRhU3VjY2VzcyhyZXN1bHQpLFxyXG4gICAgICAgICAgICAoZXJyb3IpID0+IHRoaXMub25HZXREYXRhRXJyb3IoZXJyb3IpXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICovXHJcbiAgICB9XHJcbiBcclxuICAgIHNldFVzZXIocmVnaXN0ZXJlZFVzZXIpIHtcclxuICAgICAgICB0aGlzLnVzZXJEYXRhX2lkID0gdGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmNyZWF0ZURvY3VtZW50KHtcclxuICAgICAgICAgICAgXCJ0eXBlXCI6IFwidXNlclwiLFxyXG4gICAgICAgICAgICBcInVzZXJcIjogcmVnaXN0ZXJlZFVzZXJcclxuICAgICAgICB9KTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKFwiQVFVSVwiK0pTT04uc3RyaW5naWZ5KHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5nZXREb2N1bWVudCh0aGlzLnVzZXJEYXRhX2lkLCBudWxsLCA0KSkpO1xyXG4gICAgfVxyXG4gICAgc2V0UGF0aWVudHMoKSB7XHJcblxyXG4gICAgfVxyXG4gICAgc2V0TWF0ZXJpYWxzKCkge1xyXG5cclxuICAgIH1cclxuICAgIGdldFBhdGllbnRzRGF0YSgpeyAgIFxyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZ2V0RG9jdW1lbnQodGhpcy5wYXRpZW50c0RhdGFfaWQpLmRhdGE7XHJcbiAgICB9XHJcbiAgICBzZXRQYXRpZW50c0RhdGEoZGF0YSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdHcmF2YXIgZGFkb3MgUGFjaWVudGVzJyk7XHJcbiAgICAgICAgLy9kZWJ1Z1xyXG4gICAgICAgIHRoaXMuZGVsZXRlRGF0YSgnZGF0YScpO1xyXG4gICAgICAgIHRoaXMuZGVsZXRlRGF0YSgnbWF0ZXJpYWxzJyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy9Ub2RvcyBvcyBkYWRvcyBkbyBwYWNpZW50ZSBlIHJlZiBfaWRcclxuICAgICAgICB0aGlzLnBhdGllbnRzRGF0YV9pZCA9IHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5jcmVhdGVEb2N1bWVudCh7XHJcbiAgICAgICAgICAgIFwidHlwZVwiOiBcImRhdGFcIixcclxuICAgICAgICAgICAgXCJkYXRhXCI6IGRhdGFcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy9HdWFyZGEgZGFkb3MgZG9zIFBhY2llbnRlc1xyXG4gICAgICAgIC8vR3VhcmRhIGRhZG9zIGRhcyBuZWNlc3NpZGFkZXNcclxuICAgICAgICBcclxuICAgICAgICAvL0d1YXJkYSBkYWRvcyBkb3MgbWF0ZXJpYWlzIGUgYWRpY2lvbmEgcmF0aW5ncyBhb3MgbWF0ZXJpYWlzXHJcbiAgICAgICAgbGV0IG1hdGVyaWFscyA9IFtdO1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaiA9IDA7IGogPCBkYXRhW2ldLm5lZWRzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBtYXRlcmlhbHMucHVzaChkYXRhW2ldLm5lZWRzW2pdLm1hdGVyaWFscyk7IFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IG1hdGVyaWFscy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBmb3IobGV0IGogPSAwOyBqIDwgbWF0ZXJpYWxzW2ldLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgIG1hdGVyaWFsc1tpXVtqXVsncmF0aW5ncyddID0gWycnXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5tYXRlcmlhbHNfaWQgPSB0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuY3JlYXRlRG9jdW1lbnQoe1xyXG4gICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwibWF0ZXJpYWxzXCIsXHJcbiAgICAgICAgICAgICAgICBcIm1hdGVyaWFsc1wiOiBtYXRlcmlhbHMsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgXHJcblxyXG5cclxuICAgICAgICAvL2NvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGRhdGFbMF0ubmVlZHNbMF0ubWF0ZXJpYWxzLG51bGwsNCkpO1xyXG5cclxuICAgICAgICAvKlxyXG4gICAgICAgIGNvbnNvbGUubG9nKCdhbnRlcyBkbyBmb3InKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShkYXRhWzBdLm5lZWRzLm1hdGVyaWFscyxudWxsLDQpKTtcclxuICAgICAgICAvL0p1bnRhciB0b2RvcyBvcyBtYXRlcmlhaXMgcGFyYSBjb2xvY2FyIHJhdGluZ1xyXG4gICAgICAgIGxldCBtYXRlcmlhbHMgPSBbXTtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnbm8gZm9yJyk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGRhdGFbMF0ubmVlZHMubWF0ZXJpYWxzLG51bGwsNCkpO1xyXG4gICAgICAgICAgICBtYXRlcmlhbHMucHVzaChkYXRhW2ldLm5lZWRzLm1hdGVyaWFscyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnNvbGUubG9nKCdNQVRFUklBTFMnKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShtYXRlcmlhbHMsbnVsbCw0KSk7XHJcbiAgICAgICAgdGhpcy5tYXRlcmlhbHNfaWQgPSB0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuY3JlYXRlRG9jdW1lbnQoe1xyXG4gICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwibWF0ZXJpYWxzXCIsXHJcbiAgICAgICAgICAgICAgICBcImRhdGFcIjogbWF0ZXJpYWxzLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuc2hvd0RhdGEoJ21hdGVyaWFsJyk7XHJcbiAgICAgICAgKi9cclxuICAgICAgICAvL2NvbnNvbGUubG9nKFwiQVFVSTEwXCIrSlNPTi5zdHJpbmdpZnkodGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmdldERvY3VtZW50KHRoaXMucGF0aWVudHNEYXRhX2lkKS5kYXRhLG51bGwsNCkpO1xyXG4gICAgfVxyXG4gICAgc2V0TmVlZHMoKSB7XHJcblxyXG4gICAgfVxyXG4gICAgZ2V0VG9rZW4oKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmdldERvY3VtZW50KHRoaXMudXNlckRhdGFfaWQpLnVzZXIuY2FyZWdpdmVyX3Rva2VuO1xyXG4gICAgfVxyXG4gICAgZ2V0VXNlcklEKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5nZXREb2N1bWVudCh0aGlzLnVzZXJEYXRhX2lkKS51c2VyLmlkO1xyXG4gICAgfVxyXG4gICAgZ2V0TGF0ZXN0VXNlclRvUmVnaXN0ZXIoKSB7XHJcbiAgICAgICAgdmFyIHVzZXJzID0gdGhpcy5nZXRBbGxVc2VycygpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKHVzZXJzKSB7XHJcbiAgICAgICAgICAgIHZhciBsYXN0VXNlcjtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSBpbiB1c2Vycykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHVzZXJzLmhhc093blByb3BlcnR5KGkpICYmIHR5cGVvZihpKSAhPT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxhc3RVc2VyID0gdXNlcnNbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGxhc3RVc2VyLnVzZXI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBkZWxldGVEYXRhKHZpZXcpIHtcclxuICAgICAgICBsZXQgZG9jdW1lbnRzID0gdGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmV4ZWN1dGVRdWVyeSh2aWV3KTtcclxuICAgICAgICBjb25zb2xlLmxvZygnQSBhcGFnYXIgYmQ6ICcgKyB2aWV3KTtcclxuICAgICAgICAvLyBsb29wIG92ZXIgYWxsIGRvY3VtZW50c1xyXG4gICAgICAgIGlmKHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5leGVjdXRlUXVlcnkodmlldykubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRvY3VtZW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgLy8gZGVsZXRlIGVhY2ggZG9jdW1lbnRcclxuICAgICAgICAgICAgICAgIC8vIGNvdWNoYmFzZSB3aWxsIGFzc2lnbiBhbiBpZCAoX2lkKSB0byBhIGRvY3VtZW50IHdoZW4gY3JlYXRlZFxyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmRlbGV0ZURvY3VtZW50KGRvY3VtZW50c1tpXS5faWQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHVibGljIGdldEFsbFVzZXJzKCl7XHJcbiAgICAgICAgaWYodGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmV4ZWN1dGVRdWVyeShcInVzZXJcIikubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmV4ZWN1dGVRdWVyeShcInVzZXJcIik7XHJcbiAgICAgICAgfSAgICAgICAgIFxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzaG93RGF0YSh2aWV3KSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ0EgbW9zdHJhciBiZDogJyArIHZpZXcgKyAnIGNvbSAnICsgdGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmV4ZWN1dGVRdWVyeSh2aWV3KS5sZW5ndGggKyAnIGVsZW1lbnRvcycpO1xyXG4gICAgICAgIGlmKHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5leGVjdXRlUXVlcnkodmlldykubGVuZ3RoID4gMCkgeyAgICAgXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5leGVjdXRlUXVlcnkodmlldyksIG51bGwsIDQpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAgcHVibGljIG9uQ3JlYXRlRmlsZSgpIHtcclxuICAgICAgICAvLyA+PiBmcy1jcmVhdGUtYWxsLWNvZGVcclxuICAgICAgICBsZXQgZG9jdW1lbnRzID0gZnMua25vd25Gb2xkZXJzLmRvY3VtZW50cygpO1xyXG4gICAgICAgIHRoaXMuZm9sZGVyID0gZG9jdW1lbnRzLmdldEZvbGRlcih0aGlzLmZvbGRlck5hbWUgfHwgXCJ0ZXN0Rm9sZGVyXCIpO1xyXG4gICAgICAgIHRoaXMuZmlsZSA9IHRoaXMuZm9sZGVyLmdldEZpbGUoKHRoaXMuZmlsZU5hbWUgfHwgXCJ0ZXN0RmlsZVwiKSArIFwiLnR4dFwiKTtcclxuXHJcbiAgICAgICAgXHJcbiAgICAgICAgLypcclxuICAgICAgICB0aGlzLmZpbGUud3JpdGVUZXh0KHRoaXMuZmlsZVRleHRDb250ZW50IHx8IFwic29tZSByYW5kb20gY29udGVudFwiKVxyXG4gICAgICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gU3VjY2VlZGVkIHdyaXRpbmcgdG8gdGhlIGZpbGUuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmZpbGUucmVhZFRleHQoKVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3VjY2Vzc01lc3NhZ2UgPSBcIlN1Y2Nlc3NmdWxseSBzYXZlZCBpbiBcIiArIHRoaXMuZmlsZS5wYXRoO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLndyaXR0ZW5Db250ZW50ID0gcmVzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmlzSXRlbVZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KS5jYXRjaChlcnIgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gRXJyb3JcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gPDwgZnMtY3JlYXRlLWFsbC1jb2RlXHJcbiAgICAgICAgKi9cclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRDdXJyZW50VXNlckRvY0lEKCkge1xyXG4gICAgICAgIHZhciB1c2VycyA9IHRoaXMuZ2V0QWxsVXNlcnMoKTtcclxuICAgICAgICBcclxuICAgICAgICBpZih1c2Vycykge1xyXG4gICAgICAgICAgICB2YXIgbGFzdFVzZXI7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgaW4gdXNlcnMpIHtcclxuICAgICAgICAgICAgICAgIGlmICh1c2Vycy5oYXNPd25Qcm9wZXJ0eShpKSAmJiB0eXBlb2YoaSkgIT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgICAgICAgICBsYXN0VXNlciA9IHVzZXJzW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBsYXN0VXNlci5faWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGlzVXNlckF1dGgoKSB7XHJcbiAgICAgICAgaWYodGhpcy51c2VyRGF0YV9pZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlOyBcclxuICAgIH1cclxuICAgIC8vR3VhcmRhIGF2YWxpYcOnw7VlcyBkb3MgbWF0ZXJpYWlzXHJcbiAgICBwdWJsaWMgc2V0UmF0aW5nKHJhdGluZykge1xyXG4gICAgICAgIC8vUmVjZWJvIG8gcmF0aW5nLCBjb20gaWQgZG8gbWF0ZXJpYWxcclxuICAgICAgICAvL1ZvdSDDoCBCRCBkb3MgbWF0ZXJpYWlzXHJcbiAgICAgICAgLy9QYXJhIGNhZGEgbWF0ZXJpYWwgY29tIGFxdWVsZSBpZCwgYXR1YWxpemFyIG8gc2V1IHJhdGluZy5cclxuICAgICAgICBsZXQgbWF0ZXJpYWxzID0gdGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmdldERvY3VtZW50KHRoaXMubWF0ZXJpYWxzX2lkKS5tYXRlcmlhbHM7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShtYXRlcmlhbHMsIG51bGwsIDQpKTtcclxuICAgICAgICBcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgbWF0ZXJpYWxzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaiA9IDA7IGogPCBtYXRlcmlhbHNbaV0ubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgIGlmKHJhdGluZy5pZF9tYXRlcmlhbCA9PT0gbWF0ZXJpYWxzW2ldW2pdLmlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3JlZ2lzdG91Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgbWF0ZXJpYWxzW2ldW2pdLnJhdGluZ3MucHVzaChyYXRpbmcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkobWF0ZXJpYWxzLCBudWxsLCA0KSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLnVwZGF0ZURvY3VtZW50KHRoaXMubWF0ZXJpYWxzX2lkLCB7XHJcbiAgICAgICAgICAgIFwidHlwZVwiOiBcIm1hdGVyaWFsc1wiLFxyXG4gICAgICAgICAgICBcIm1hdGVyaWFsc1wiOiBtYXRlcmlhbHMsXHJcbiAgICAgICAgfSlcclxuICAgICAgICBcclxuICAgICAgICAvL3RoaXMuc2hvd0RhdGEoJ21hdGVyaWFscycpO1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG4gICAgcHVibGljIGdldE1hdGVyaWFsUmF0aW5nKG1hdGVyaWFsX2lkKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXROZWVkTWF0ZXJpYWxzKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZ2V0RG9jdW1lbnQodGhpcy5tYXRlcmlhbHNfaWQpLm1hdGVyaWFscztcclxuICAgIH1cclxufSJdfQ==