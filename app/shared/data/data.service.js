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
                materials[i][j]['Ratings'] = '';
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
                    materials[i][j].ratings.push(rating);
                }
            }
        }
        this.database.getDatabase().updateDocument(this.materials_id, {
            "type": "materials",
            "materials": materials,
        });
        this.showData('materials');
    };
    DataService.prototype.getMaterialRating = function (material_id) {
    };
    return DataService;
}());
DataService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [database_1.Database])
], DataService);
exports.DataService = DataService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGF0YS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxnQ0FBa0M7QUFDbEMsaUNBQStCO0FBSS9CLHNDQUEyQztBQU0zQyx1Q0FBc0M7QUFLdEMsSUFBYSxXQUFXO0lBWXBCLHFCQUFtQixRQUFrQjtRQUFsQixhQUFRLEdBQVIsUUFBUSxDQUFVO1FBRTdCLE9BQU8sQ0FBQyxHQUFHLENBQUMsMkJBQTJCLENBQUMsQ0FBQztRQUN6QyxxQ0FBcUM7UUFDckMsMEJBQTBCO1FBQzFCLDBCQUEwQjtRQUMxQiwrQkFBK0I7UUFDL0IsaUpBQWlKO1FBQ2pKLHdCQUF3QjtRQUN4QixJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzNCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7SUFFdEQsQ0FBQztJQUVELDhCQUFRLEdBQVI7SUFDQSxDQUFDO0lBQ0QsMEJBQUksR0FBSjtRQUNJOzs7Ozs7Y0FNTTtJQUNWLENBQUM7SUFFRCw2QkFBTyxHQUFQLFVBQVEsY0FBYztRQUNsQixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUMsY0FBYyxDQUFDO1lBQzFELE1BQU0sRUFBRSxNQUFNO1lBQ2QsTUFBTSxFQUFFLGNBQWM7U0FDekIsQ0FBQyxDQUFDO1FBQ0gseUdBQXlHO0lBQzdHLENBQUM7SUFDRCxpQ0FBVyxHQUFYO0lBRUEsQ0FBQztJQUNELGtDQUFZLEdBQVo7SUFFQSxDQUFDO0lBQ0QscUNBQWUsR0FBZjtRQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQzlFLENBQUM7SUFDRCxxQ0FBZSxHQUFmLFVBQWdCLElBQUk7UUFDaEIsT0FB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QUFDO29CQUMzQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDekMsQ0FBQztZQUNMLENBQUM7UUFDTCxDQUFDO1FBRUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRTtZQUMxRCxNQUFNLEVBQUUsV0FBVztZQUNuQixXQUFXLEVBQUUsU0FBUztTQUN6QixDQUFDLENBQUE7UUFHRixJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBRS9CLENBQUM7SUFDTSx1Q0FBaUIsR0FBeEIsVUFBeUIsV0FBVztJQUVwQyxDQUFDO0lBQ0wsa0JBQUM7QUFBRCxDQUFDLEFBeE9ELElBd09DO0FBeE9ZLFdBQVc7SUFEdkIsaUJBQVUsRUFBRTtxQ0Fhb0IsbUJBQVE7R0FaNUIsV0FBVyxDQXdPdkI7QUF4T1ksa0NBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBmcyBmcm9tIFwiZmlsZS1zeXN0ZW1cIjtcclxuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci9tYXAnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcclxuaW1wb3J0IHsgQ29ubmVjdG9yU2VydmljZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9jb25uZWN0b3IvY29ubmVjdG9yLnNlcnZpY2UnO1xyXG5cclxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IE1hdGVyaWFscyB9IGZyb20gXCIuL21hdGVyaWFsc1wiO1xyXG5pbXBvcnQgeyBEYXRhIH0gZnJvbSBcIi4vZGF0YVwiO1xyXG5pbXBvcnQgeyBOZWVkcyB9IGZyb20gXCIuL25lZWRzXCI7XHJcbmltcG9ydCB7IFBhdGllbnQgfSBmcm9tIFwiLi4vLi4vcGF0aWVudC9wYXRpZW50XCI7XHJcbmltcG9ydCB7IENvdWNoYmFzZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtY291Y2hiYXNlXCI7XHJcbmltcG9ydCB7IERhdGFiYXNlIH0gZnJvbSBcIi4vZGF0YWJhc2VcIjtcclxuaW1wb3J0IHsgVXNlclNlcnZpY2UgfSBmcm9tICcuLi91c2VyL3VzZXIuc2VydmljZSc7XHJcblxyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgRGF0YVNlcnZpY2Uge1xyXG5cclxuICAgIHB1YmxpYyBwYXRpZW50c0RhdGFfaWQ6IGFueTtcclxuICAgIHB1YmxpYyB1c2VyRGF0YV9pZDogYW55O1xyXG4gICAgcHVibGljIG1hdGVyaWFsc19pZDogYW55O1xyXG4gICAgcHVibGljIHJhdGluZ3NfaWQ6IGFueTtcclxuXHJcbiAgICBwdWJsaWMgZmlsZTogZnMuRmlsZTtcclxuICAgIHB1YmxpYyBmb2xkZXI6IGZzLkZvbGRlcjtcclxuICAgIHB1YmxpYyBmb2xkZXJOYW1lOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgZmlsZU5hbWU6IHN0cmluZztcclxuIFxyXG4gICAgY29uc3RydWN0b3IocHVibGljIGRhdGFiYXNlOiBEYXRhYmFzZSwgLy9wdWJsaWMgY29ubmVjdG9yU2VydmljZTogQ29ubmVjdG9yU2VydmljZSlcclxuICAgICl7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdJbnN0YW5jaW91IC0gRGF0YVNlcnZpY2UhJyk7XHJcbiAgICAgICAgICAgIC8vdGhpcy5kYXRhID0gZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKTtcclxuICAgICAgICAgICAgLy90aGlzLmRlbGV0ZURhdGEoJ2RhdGEnKTtcclxuICAgICAgICAgICAgLy90aGlzLmRlbGV0ZURhdGEoJ3VzZXInKTtcclxuICAgICAgICAgICAgLy90aGlzLmRlbGV0ZURhdGEoJ21hdGVyaWFscycpO1xyXG4gICAgICAgICAgICAvL3RoaXMuc2hvd0RhdGEoJ2RhdGEnKTsgLy9Fc3RhIGEgZGFyIGV4Y2VwY2FvIGUgYSBpbXByaW1pciBvcyB1c2VycyB0Yj8/PyEhISEhIChwb3IgY29uZmlybWFyKSBwcSBuIHRlbSBkYWRvcyBlIGVzdG9pcmE/PyBtYXMgaW1wcmltZSBvIHVzZXIgcHE/XHJcbiAgICAgICAgICAgIC8vdGhpcy5zaG93RGF0YSgndXNlcicpO1xyXG4gICAgICAgICAgICB0aGlzLnNob3dEYXRhKCdtYXRlcmlhbHMnKTtcclxuICAgICAgICAgICAgdGhpcy51c2VyRGF0YV9pZCA9IHRoaXMuZ2V0Q3VycmVudFVzZXJEb2NJRCgpO1xyXG4gICAgICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgIH1cclxuICAgIHN5bmMoKSB7XHJcbiAgICAgICAgLypcclxuICAgICAgICB0aGlzLmNvbm5lY3RvclNlcnZpY2UuZ2V0UGF0aWVudHMoKVxyXG4gICAgICAgICAgICAuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICAocmVzdWx0KSA9PiB0aGlzLm9uR2V0RGF0YVN1Y2Nlc3MocmVzdWx0KSxcclxuICAgICAgICAgICAgKGVycm9yKSA9PiB0aGlzLm9uR2V0RGF0YUVycm9yKGVycm9yKVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAqL1xyXG4gICAgfVxyXG4gXHJcbiAgICBzZXRVc2VyKHJlZ2lzdGVyZWRVc2VyKSB7XHJcbiAgICAgICAgdGhpcy51c2VyRGF0YV9pZCA9IHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5jcmVhdGVEb2N1bWVudCh7XHJcbiAgICAgICAgICAgIFwidHlwZVwiOiBcInVzZXJcIixcclxuICAgICAgICAgICAgXCJ1c2VyXCI6IHJlZ2lzdGVyZWRVc2VyXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIkFRVUlcIitKU09OLnN0cmluZ2lmeSh0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZ2V0RG9jdW1lbnQodGhpcy51c2VyRGF0YV9pZCwgbnVsbCwgNCkpKTtcclxuICAgIH1cclxuICAgIHNldFBhdGllbnRzKCkge1xyXG5cclxuICAgIH1cclxuICAgIHNldE1hdGVyaWFscygpIHtcclxuXHJcbiAgICB9XHJcbiAgICBnZXRQYXRpZW50c0RhdGEoKXsgICBcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmdldERvY3VtZW50KHRoaXMucGF0aWVudHNEYXRhX2lkKS5kYXRhO1xyXG4gICAgfVxyXG4gICAgc2V0UGF0aWVudHNEYXRhKGRhdGEpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnR3JhdmFyIGRhZG9zIFBhY2llbnRlcycpO1xyXG4gICAgICAgIC8vZGVidWdcclxuICAgICAgICB0aGlzLmRlbGV0ZURhdGEoJ2RhdGEnKTtcclxuICAgICAgICB0aGlzLmRlbGV0ZURhdGEoJ21hdGVyaWFscycpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vVG9kb3Mgb3MgZGFkb3MgZG8gcGFjaWVudGUgZSByZWYgX2lkXHJcbiAgICAgICAgdGhpcy5wYXRpZW50c0RhdGFfaWQgPSB0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuY3JlYXRlRG9jdW1lbnQoe1xyXG4gICAgICAgICAgICBcInR5cGVcIjogXCJkYXRhXCIsXHJcbiAgICAgICAgICAgIFwiZGF0YVwiOiBkYXRhXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vR3VhcmRhIGRhZG9zIGRvcyBQYWNpZW50ZXNcclxuICAgICAgICAvL0d1YXJkYSBkYWRvcyBkYXMgbmVjZXNzaWRhZGVzXHJcbiAgICAgICAgXHJcbiAgICAgICAgLy9HdWFyZGEgZGFkb3MgZG9zIG1hdGVyaWFpcyBlIGFkaWNpb25hIHJhdGluZ3MgYW9zIG1hdGVyaWFpc1xyXG4gICAgICAgIGxldCBtYXRlcmlhbHMgPSBbXTtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBmb3IobGV0IGogPSAwOyBqIDwgZGF0YVtpXS5uZWVkcy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgbWF0ZXJpYWxzLnB1c2goZGF0YVtpXS5uZWVkc1tqXS5tYXRlcmlhbHMpOyBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBtYXRlcmlhbHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgZm9yKGxldCBqID0gMDsgaiA8IG1hdGVyaWFsc1tpXS5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICBtYXRlcmlhbHNbaV1bal1bJ1JhdGluZ3MnXSA9ICcnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLm1hdGVyaWFsc19pZCA9IHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5jcmVhdGVEb2N1bWVudCh7XHJcbiAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJtYXRlcmlhbHNcIixcclxuICAgICAgICAgICAgICAgIFwibWF0ZXJpYWxzXCI6IG1hdGVyaWFscyxcclxuICAgICAgICB9KTtcclxuICAgICAgICBcclxuXHJcblxyXG4gICAgICAgIC8vY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoZGF0YVswXS5uZWVkc1swXS5tYXRlcmlhbHMsbnVsbCw0KSk7XHJcblxyXG4gICAgICAgIC8qXHJcbiAgICAgICAgY29uc29sZS5sb2coJ2FudGVzIGRvIGZvcicpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGRhdGFbMF0ubmVlZHMubWF0ZXJpYWxzLG51bGwsNCkpO1xyXG4gICAgICAgIC8vSnVudGFyIHRvZG9zIG9zIG1hdGVyaWFpcyBwYXJhIGNvbG9jYXIgcmF0aW5nXHJcbiAgICAgICAgbGV0IG1hdGVyaWFscyA9IFtdO1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdubyBmb3InKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoZGF0YVswXS5uZWVkcy5tYXRlcmlhbHMsbnVsbCw0KSk7XHJcbiAgICAgICAgICAgIG1hdGVyaWFscy5wdXNoKGRhdGFbaV0ubmVlZHMubWF0ZXJpYWxzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2coJ01BVEVSSUFMUycpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KG1hdGVyaWFscyxudWxsLDQpKTtcclxuICAgICAgICB0aGlzLm1hdGVyaWFsc19pZCA9IHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5jcmVhdGVEb2N1bWVudCh7XHJcbiAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJtYXRlcmlhbHNcIixcclxuICAgICAgICAgICAgICAgIFwiZGF0YVwiOiBtYXRlcmlhbHMsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5zaG93RGF0YSgnbWF0ZXJpYWwnKTtcclxuICAgICAgICAqL1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coXCJBUVVJMTBcIitKU09OLnN0cmluZ2lmeSh0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZ2V0RG9jdW1lbnQodGhpcy5wYXRpZW50c0RhdGFfaWQpLmRhdGEsbnVsbCw0KSk7XHJcbiAgICB9XHJcbiAgICBzZXROZWVkcygpIHtcclxuXHJcbiAgICB9XHJcbiAgICBnZXRUb2tlbigpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZ2V0RG9jdW1lbnQodGhpcy51c2VyRGF0YV9pZCkudXNlci5jYXJlZ2l2ZXJfdG9rZW47XHJcbiAgICB9XHJcbiAgICBnZXRVc2VySUQoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmdldERvY3VtZW50KHRoaXMudXNlckRhdGFfaWQpLnVzZXIuaWQ7XHJcbiAgICB9XHJcbiAgICBnZXRMYXRlc3RVc2VyVG9SZWdpc3RlcigpIHtcclxuICAgICAgICB2YXIgdXNlcnMgPSB0aGlzLmdldEFsbFVzZXJzKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYodXNlcnMpIHtcclxuICAgICAgICAgICAgdmFyIGxhc3RVc2VyO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpIGluIHVzZXJzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodXNlcnMuaGFzT3duUHJvcGVydHkoaSkgJiYgdHlwZW9mKGkpICE9PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGFzdFVzZXIgPSB1c2Vyc1tpXTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gbGFzdFVzZXIudXNlcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGRlbGV0ZURhdGEodmlldykge1xyXG4gICAgICAgIGxldCBkb2N1bWVudHMgPSB0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZXhlY3V0ZVF1ZXJ5KHZpZXcpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdBIGFwYWdhciBiZDogJyArIHZpZXcpO1xyXG4gICAgICAgIC8vIGxvb3Agb3ZlciBhbGwgZG9jdW1lbnRzXHJcbiAgICAgICAgaWYodGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmV4ZWN1dGVRdWVyeSh2aWV3KS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZG9jdW1lbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBkZWxldGUgZWFjaCBkb2N1bWVudFxyXG4gICAgICAgICAgICAgICAgLy8gY291Y2hiYXNlIHdpbGwgYXNzaWduIGFuIGlkIChfaWQpIHRvIGEgZG9jdW1lbnQgd2hlbiBjcmVhdGVkXHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZGVsZXRlRG9jdW1lbnQoZG9jdW1lbnRzW2ldLl9pZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0QWxsVXNlcnMoKXtcclxuICAgICAgICBpZih0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZXhlY3V0ZVF1ZXJ5KFwidXNlclwiKS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZXhlY3V0ZVF1ZXJ5KFwidXNlclwiKTtcclxuICAgICAgICB9ICAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHNob3dEYXRhKHZpZXcpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnQSBtb3N0cmFyIGJkOiAnICsgdmlldyArICcgY29tICcgKyB0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZXhlY3V0ZVF1ZXJ5KHZpZXcpLmxlbmd0aCArICcgZWxlbWVudG9zJyk7XHJcbiAgICAgICAgaWYodGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmV4ZWN1dGVRdWVyeSh2aWV3KS5sZW5ndGggPiAwKSB7ICAgICBcclxuICAgICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkodGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmV4ZWN1dGVRdWVyeSh2aWV3KSwgbnVsbCwgNCkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgICBwdWJsaWMgb25DcmVhdGVGaWxlKCkge1xyXG4gICAgICAgIC8vID4+IGZzLWNyZWF0ZS1hbGwtY29kZVxyXG4gICAgICAgIGxldCBkb2N1bWVudHMgPSBmcy5rbm93bkZvbGRlcnMuZG9jdW1lbnRzKCk7XHJcbiAgICAgICAgdGhpcy5mb2xkZXIgPSBkb2N1bWVudHMuZ2V0Rm9sZGVyKHRoaXMuZm9sZGVyTmFtZSB8fCBcInRlc3RGb2xkZXJcIik7XHJcbiAgICAgICAgdGhpcy5maWxlID0gdGhpcy5mb2xkZXIuZ2V0RmlsZSgodGhpcy5maWxlTmFtZSB8fCBcInRlc3RGaWxlXCIpICsgXCIudHh0XCIpO1xyXG5cclxuICAgICAgICBcclxuICAgICAgICAvKlxyXG4gICAgICAgIHRoaXMuZmlsZS53cml0ZVRleHQodGhpcy5maWxlVGV4dENvbnRlbnQgfHwgXCJzb21lIHJhbmRvbSBjb250ZW50XCIpXHJcbiAgICAgICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyBTdWNjZWVkZWQgd3JpdGluZyB0byB0aGUgZmlsZS5cclxuICAgICAgICAgICAgICAgIHRoaXMuZmlsZS5yZWFkVGV4dCgpXHJcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdWNjZXNzTWVzc2FnZSA9IFwiU3VjY2Vzc2Z1bGx5IHNhdmVkIGluIFwiICsgdGhpcy5maWxlLnBhdGg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMud3JpdHRlbkNvbnRlbnQgPSByZXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXNJdGVtVmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pLmNhdGNoKGVyciA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyBFcnJvclxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAvLyA8PCBmcy1jcmVhdGUtYWxsLWNvZGVcclxuICAgICAgICAqL1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldEN1cnJlbnRVc2VyRG9jSUQoKSB7XHJcbiAgICAgICAgdmFyIHVzZXJzID0gdGhpcy5nZXRBbGxVc2VycygpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKHVzZXJzKSB7XHJcbiAgICAgICAgICAgIHZhciBsYXN0VXNlcjtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSBpbiB1c2Vycykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHVzZXJzLmhhc093blByb3BlcnR5KGkpICYmIHR5cGVvZihpKSAhPT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxhc3RVc2VyID0gdXNlcnNbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGxhc3RVc2VyLl9pZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgaXNVc2VyQXV0aCgpIHtcclxuICAgICAgICBpZih0aGlzLnVzZXJEYXRhX2lkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7IFxyXG4gICAgfVxyXG4gICAgLy9HdWFyZGEgYXZhbGlhw6fDtWVzIGRvcyBtYXRlcmlhaXNcclxuICAgIHB1YmxpYyBzZXRSYXRpbmcocmF0aW5nKSB7XHJcbiAgICAgICAgLy9SZWNlYm8gbyByYXRpbmcsIGNvbSBpZCBkbyBtYXRlcmlhbFxyXG4gICAgICAgIC8vVm91IMOgIEJEIGRvcyBtYXRlcmlhaXNcclxuICAgICAgICAvL1BhcmEgY2FkYSBtYXRlcmlhbCBjb20gYXF1ZWxlIGlkLCBhdHVhbGl6YXIgbyBzZXUgcmF0aW5nLlxyXG4gICAgICAgIGxldCBtYXRlcmlhbHMgPSB0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZ2V0RG9jdW1lbnQodGhpcy5tYXRlcmlhbHNfaWQpLm1hdGVyaWFscztcclxuICAgICAgICAvL2NvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KG1hdGVyaWFscywgbnVsbCwgNCkpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBtYXRlcmlhbHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgZm9yKGxldCBqID0gMDsgaiA8IG1hdGVyaWFsc1tpXS5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgaWYocmF0aW5nLmlkX21hdGVyaWFsID09PSBtYXRlcmlhbHNbaV1bal0uaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBtYXRlcmlhbHNbaV1bal0ucmF0aW5ncy5wdXNoKHJhdGluZyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS51cGRhdGVEb2N1bWVudCh0aGlzLm1hdGVyaWFsc19pZCwge1xyXG4gICAgICAgICAgICBcInR5cGVcIjogXCJtYXRlcmlhbHNcIixcclxuICAgICAgICAgICAgXCJtYXRlcmlhbHNcIjogbWF0ZXJpYWxzLFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgdGhpcy5zaG93RGF0YSgnbWF0ZXJpYWxzJyk7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0TWF0ZXJpYWxSYXRpbmcobWF0ZXJpYWxfaWQpIHtcclxuXHJcbiAgICB9XHJcbn0iXX0=