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
        //this.deleteData('global');
        //this.deleteData('user');
        //this.deleteData('global');
        //this.showData('data'); //Esta a dar excepcao e a imprimir os users tb???!!!!! (por confirmar) pq n tem dados e estoira?? mas imprime o user pq?
        //this.showData('user');2
        //this.showData('materials');
        this.showData('global');
        this.init();
        //this.showData('global');
        //
    }
    DataService.prototype.ngOnInit = function () {
        console.log("Correu o INIT do DATASERVICE");
    };
    DataService.prototype.init = function () {
        console.log('A inicializar as variáveis globais');
        //Adicionar numero de avaliações pendentes
        //...
        if (this.isGlobalSet()) {
            console.log('A atualizar global de conexao');
            this.globalData_id = this.getGlobalsID();
            this.database.getDatabase().updateDocument(this.globalData_id, {
                "dataRequest": "false"
            });
            console.log('Atualizou');
        }
        else {
            console.log('A criar objeto para as variáveis globais');
            this.globalData_id = this.database.getDatabase().createDocument({
                "type": "global",
                "dataRequest": "false",
            });
        }
        this.userData_id = this.getCurrentUserDocID();
        this.patientsData_id = this.getLatestPatientData();
        //this.quizs_id = this.getQuizID();
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
        console.log('A gravar o utilizador');
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
        console.log('A devolver todos os dados da BD');
        console.log(this.patientsData_id);
        return this.database.getDatabase().getDocument(this.patientsData_id).data;
    };
    DataService.prototype.setPatientsData = function (data) {
        console.log('Gravar dados Pacientes');
        //debug
        //this.deleteData('data');
        //this.deleteData('materials');
        //Todos os dados do paciente e ref _id
        this.patientsData_id = this.database.getDatabase().createDocument({
            "type": "data",
            "data": data
        });
        //Guarda dados dos Pacientes
        //Guarda dados das necessidades
        /*Guarda dados dos materiais e adiciona ratings aos materiais
        let materials = [];
        for(let i = 0; i < data.length; i++) {
            for(let j = 0; j < data[i].needs.length; j++) {
                materials.push(data[i].needs[j].materials);
            }
        }
        console.log('A criar os ratings nos dados');
        for(let i = 0; i < materials.length; i++) {
            for(let j = 0; j < materials[i].length; j++) {
               materials[i][j]['ratings'] = [''];
            }
        }
        console.log("A guardar os materiais na BD");
        this.materials_id = this.database.getDatabase().createDocument({
                "type": "materials",
                "materials": materials,
        });
        */
        this.database.getDatabase().updateDocument(this.globalData_id, {
            "dataRequest": "true"
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
        console.log('A devolver token');
        return this.database.getDatabase().getDocument(this.userData_id).user.caregiver_token;
    };
    DataService.prototype.getUserID = function () {
        console.log('A devolver o ID do user');
        return this.database.getDatabase().getDocument(this.userData_id).user.id;
    };
    DataService.prototype.getLatestUserToRegister = function () {
        console.log("A devolver ultimo utilizador registado");
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
        console.log('A verificar se existe utilizador na BD');
        if (this.userData_id) {
            return true;
        }
        return false;
    };
    //Guarda avaliações dos materiais
    DataService.prototype.setRating = function (rating) {
        console.log('A registar o rating');
        //Recebo o rating, com id do material
        //Vou à BD dos materiais
        //Para cada material com aquele id, atualizar o seu rating.
        /*Isto altera a bd dos materiais.
        let materials = this.database.getDatabase().getDocument(this.materials_id).materials;
        
        for(let i = 0; i < materials.length; i++) {
            for(let j = 0; j < materials[i].length; j++) {
                if(rating.id_material === materials[i][j].id) {
                    console.log('registou');
                    materials[i][j].ratings.push(rating);
                }
            }
        }
        //console.log(JSON.stringify(materials, null, 4));
        
        this.database.getDatabase().updateDocument(this.materials_id, {
            "type": "materials",
            "materials": materials,
        })
        
        //this.showData('materials');
        FIM da alteração na BD dos materiais*/
        /*Assim altera a BD dos pacientes*/
        //console.log(JSON.stringify(this.database.getDatabase().getDocument(this.patientsData_id).data,null,4));
        var patientsData = this.database.getDatabase().getDocument(this.patientsData_id).data;
        //console.log("Entrou no for");
        /*
        for(let i = 0; i < patientsData.length; i++) {
            for(let j = 0; j < patientsData[i].needs.length; j++) {
                for(let k = 0; k < patientsData[i].needs[j].materials.length; k++) {
                        patientsData[i].needs[j].materials[k]['ratings'] = [''];
                    
                }
            }
        }
        */
        for (var i = 0; i < patientsData.length; i++) {
            for (var j = 0; j < patientsData[i].needs.length; j++) {
                for (var k = 0; k < patientsData[i].needs[j].materials.length; k++) {
                    if (patientsData[i].needs[j].materials[k].id == rating.id_material) {
                        console.log('registou');
                        //console.log(JSON.stringify(patientsData[i][j][k],null,4));
                        patientsData[i].needs[j].materials[k]['ratings'] = rating;
                    }
                }
            }
        }
        //console.log(JSON.stringify(patientsData,null,4));
        this.database.getDatabase().updateDocument(this.patientsData_id, {
            "type": "data",
            "data": patientsData,
        });
        //this.showData("data");
    };
    DataService.prototype.getMaterialRating = function (material_id) {
    };
    DataService.prototype.getNeedMaterials = function () {
        console.log('A devolver todos os materiais');
        return this.database.getDatabase().getDocument(this.materials_id).materials;
    };
    DataService.prototype.isPatientsRequestDone = function () {
        console.log("A verificar se o pedido ao servidor já foi feito");
        console.log(this.database.getDatabase().getDocument(this.globalData_id).dataRequest);
        if (this.database.getDatabase().getDocument(this.globalData_id).dataRequest == "false") {
            return false;
        }
        return true;
    };
    DataService.prototype.setQuizs = function (caregiverQuestionaires) {
        console.log("A guardar questionários na BD");
        this.quizs_id = this.database.getDatabase().createDocument({
            "type": "quiz",
            "quiz": caregiverQuestionaires
        });
    };
    DataService.prototype.getQuizID = function () {
        console.log("A obter ID dos quizs");
        if (this.database.getDatabase().executeQuery('quiz').length > 0) {
            //console.log(JSON.stringify(this.database.getDatabase().executeQuery('quiz'), null, 4));
            return this.database.getDatabase().executeQuery('quiz')._id;
        }
        return null;
    };
    DataService.prototype.getQuizs = function () {
        return this.database.getDatabase().getDocument(this.quizs_id).quiz;
    };
    DataService.prototype.getLatestPatientData = function () {
        console.log('Entrou 2');
        var patientsData = this.getAllPatientsData();
        if (patientsData) {
            console.log('ENTROU!');
            var lastData;
            lastData = patientsData[patientsData.length - 1];
            return lastData._id;
        }
        return null;
    };
    DataService.prototype.isGlobalSet = function () {
        if (this.database.getDatabase().executeQuery('global').length > 0) {
            return true;
        }
        return false;
    };
    DataService.prototype.getGlobalsID = function () {
        if (this.database.getDatabase().executeQuery('global').length > 0) {
            console.log(JSON.stringify(this.database.getDatabase().executeQuery("global"), null, 4));
            return this.database.getDatabase().executeQuery('global')[0]._id;
        }
        return null;
    };
    DataService.prototype.getAllPatientsData = function () {
        console.log('Entrou 1');
        if (this.database.getDatabase().executeQuery("data").length > 0) {
            // console.log(JSON.stringify(this.database.getDatabase().executeQuery("data"), null, 4));
            return this.database.getDatabase().executeQuery("data");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGF0YS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxnQ0FBa0M7QUFDbEMsaUNBQStCO0FBSS9CLHNDQUEyQztBQU0zQyx1Q0FBc0M7QUFLdEMsSUFBYSxXQUFXO0lBZ0JwQixxQkFBbUIsUUFBa0I7UUFBbEIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUM3QixPQUFPLENBQUMsR0FBRyxDQUFDLDJCQUEyQixDQUFDLENBQUM7UUFDekMscUNBQXFDO1FBQ3JDLDRCQUE0QjtRQUM1QiwwQkFBMEI7UUFDMUIsNEJBQTRCO1FBQzVCLGlKQUFpSjtRQUNqSix5QkFBeUI7UUFDekIsNkJBQTZCO1FBQzdCLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDeEIsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ1osMEJBQTBCO1FBRTFCLEVBQUU7SUFFVixDQUFDO0lBRUQsOEJBQVEsR0FBUjtRQUNJLE9BQU8sQ0FBQyxHQUFHLENBQUMsOEJBQThCLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBQ0QsMEJBQUksR0FBSjtRQUNJLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0NBQW9DLENBQUMsQ0FBQztRQUNsRCwwQ0FBMEM7UUFDMUMsS0FBSztRQUNMLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDcEIsT0FBTyxDQUFDLEdBQUcsQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO1lBQzdDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1lBQ3pDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUU7Z0JBQzNELGFBQWEsRUFBRSxPQUFPO2FBQ3pCLENBQUMsQ0FBQztZQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxD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RTtxQ0FpQm9CLG1CQUFRO0dBaEI1QixXQUFXLENBMlh2QjtBQTNYWSxrQ0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGZzIGZyb20gXCJmaWxlLXN5c3RlbVwiO1xyXG5pbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL21hcCc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xyXG5pbXBvcnQgeyBDb25uZWN0b3JTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2Nvbm5lY3Rvci9jb25uZWN0b3Iuc2VydmljZSc7XHJcblxyXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgTWF0ZXJpYWxzIH0gZnJvbSBcIi4vbWF0ZXJpYWxzXCI7XHJcbmltcG9ydCB7IERhdGEgfSBmcm9tIFwiLi9kYXRhXCI7XHJcbmltcG9ydCB7IE5lZWRzIH0gZnJvbSBcIi4vbmVlZHNcIjtcclxuaW1wb3J0IHsgUGF0aWVudCB9IGZyb20gXCIuLi8uLi9wYXRpZW50L3BhdGllbnRcIjtcclxuaW1wb3J0IHsgQ291Y2hiYXNlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1jb3VjaGJhc2VcIjtcclxuaW1wb3J0IHsgRGF0YWJhc2UgfSBmcm9tIFwiLi9kYXRhYmFzZVwiO1xyXG5pbXBvcnQgeyBVc2VyU2VydmljZSB9IGZyb20gJy4uL3VzZXIvdXNlci5zZXJ2aWNlJztcclxuXHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBEYXRhU2VydmljZSB7XHJcblxyXG4gICAgcHVibGljIHBhdGllbnRzRGF0YV9pZDogYW55O1xyXG4gICAgcHVibGljIHVzZXJEYXRhX2lkOiBhbnk7XHJcbiAgICBwdWJsaWMgbWF0ZXJpYWxzX2lkOiBhbnk7XHJcbiAgICBwdWJsaWMgcmF0aW5nc19pZDogYW55O1xyXG4gICAgcHVibGljIGdsb2JhbERhdGFfaWQ6IGFueTtcclxuICAgIHB1YmxpYyBxdWl6c19pZDogYW55O1xyXG5cclxuICAgIHB1YmxpYyBSZXF1ZXN0RGF0YV9jb250cm9sOiBhbnk7XHJcblxyXG4gICAgcHVibGljIGZpbGU6IGZzLkZpbGU7XHJcbiAgICBwdWJsaWMgZm9sZGVyOiBmcy5Gb2xkZXI7XHJcbiAgICBwdWJsaWMgZm9sZGVyTmFtZTogc3RyaW5nO1xyXG4gICAgcHVibGljIGZpbGVOYW1lOiBzdHJpbmc7XHJcbiBcclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBkYXRhYmFzZTogRGF0YWJhc2Upe1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnSW5zdGFuY2lvdSAtIERhdGFTZXJ2aWNlIScpO1xyXG4gICAgICAgICAgICAvL3RoaXMuZGF0YSA9IGRhdGFiYXNlLmdldERhdGFiYXNlKCk7XHJcbiAgICAgICAgICAgIC8vdGhpcy5kZWxldGVEYXRhKCdnbG9iYWwnKTtcclxuICAgICAgICAgICAgLy90aGlzLmRlbGV0ZURhdGEoJ3VzZXInKTtcclxuICAgICAgICAgICAgLy90aGlzLmRlbGV0ZURhdGEoJ2dsb2JhbCcpO1xyXG4gICAgICAgICAgICAvL3RoaXMuc2hvd0RhdGEoJ2RhdGEnKTsgLy9Fc3RhIGEgZGFyIGV4Y2VwY2FvIGUgYSBpbXByaW1pciBvcyB1c2VycyB0Yj8/PyEhISEhIChwb3IgY29uZmlybWFyKSBwcSBuIHRlbSBkYWRvcyBlIGVzdG9pcmE/PyBtYXMgaW1wcmltZSBvIHVzZXIgcHE/XHJcbiAgICAgICAgICAgIC8vdGhpcy5zaG93RGF0YSgndXNlcicpOzJcclxuICAgICAgICAgICAgLy90aGlzLnNob3dEYXRhKCdtYXRlcmlhbHMnKTtcclxuICAgICAgICAgICAgdGhpcy5zaG93RGF0YSgnZ2xvYmFsJyk7XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdCgpO1xyXG4gICAgICAgICAgICAvL3RoaXMuc2hvd0RhdGEoJ2dsb2JhbCcpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy9cclxuICAgICAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJDb3JyZXUgbyBJTklUIGRvIERBVEFTRVJWSUNFXCIpO1xyXG4gICAgfVxyXG4gICAgaW5pdCgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnQSBpbmljaWFsaXphciBhcyB2YXJpw6F2ZWlzIGdsb2JhaXMnKTtcclxuICAgICAgICAvL0FkaWNpb25hciBudW1lcm8gZGUgYXZhbGlhw6fDtWVzIHBlbmRlbnRlc1xyXG4gICAgICAgIC8vLi4uXHJcbiAgICAgICAgaWYodGhpcy5pc0dsb2JhbFNldCgpKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdBIGF0dWFsaXphciBnbG9iYWwgZGUgY29uZXhhbycpO1xyXG4gICAgICAgICAgICB0aGlzLmdsb2JhbERhdGFfaWQgPSB0aGlzLmdldEdsb2JhbHNJRCgpO1xyXG4gICAgICAgICAgICB0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkudXBkYXRlRG9jdW1lbnQodGhpcy5nbG9iYWxEYXRhX2lkLCB7XHJcbiAgICAgICAgICAgICAgICBcImRhdGFSZXF1ZXN0XCI6IFwiZmFsc2VcIlxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ0F0dWFsaXpvdScpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdBIGNyaWFyIG9iamV0byBwYXJhIGFzIHZhcmnDoXZlaXMgZ2xvYmFpcycpO1xyXG4gICAgICAgICAgICB0aGlzLmdsb2JhbERhdGFfaWQgPSB0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuY3JlYXRlRG9jdW1lbnQoe1xyXG4gICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZ2xvYmFsXCIsXHJcbiAgICAgICAgICAgICAgICBcImRhdGFSZXF1ZXN0XCI6IFwiZmFsc2VcIixcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMudXNlckRhdGFfaWQgPSB0aGlzLmdldEN1cnJlbnRVc2VyRG9jSUQoKTtcclxuICAgICAgICB0aGlzLnBhdGllbnRzRGF0YV9pZCA9IHRoaXMuZ2V0TGF0ZXN0UGF0aWVudERhdGEoKTtcclxuICAgICAgICAvL3RoaXMucXVpenNfaWQgPSB0aGlzLmdldFF1aXpJRCgpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIFxyXG4gICAgfVxyXG4gICAgc3luYygpIHtcclxuICAgICAgICAvKlxyXG4gICAgICAgIHRoaXMuY29ubmVjdG9yU2VydmljZS5nZXRQYXRpZW50cygpXHJcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgIChyZXN1bHQpID0+IHRoaXMub25HZXREYXRhU3VjY2VzcyhyZXN1bHQpLFxyXG4gICAgICAgICAgICAoZXJyb3IpID0+IHRoaXMub25HZXREYXRhRXJyb3IoZXJyb3IpXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICovXHJcbiAgICB9XHJcbiBcclxuICAgIHNldFVzZXIocmVnaXN0ZXJlZFVzZXIpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnQSBncmF2YXIgbyB1dGlsaXphZG9yJyk7XHJcbiAgICAgICAgdGhpcy51c2VyRGF0YV9pZCA9IHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5jcmVhdGVEb2N1bWVudCh7XHJcbiAgICAgICAgICAgIFwidHlwZVwiOiBcInVzZXJcIixcclxuICAgICAgICAgICAgXCJ1c2VyXCI6IHJlZ2lzdGVyZWRVc2VyXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIkFRVUlcIitKU09OLnN0cmluZ2lmeSh0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZ2V0RG9jdW1lbnQodGhpcy51c2VyRGF0YV9pZCwgbnVsbCwgNCkpKTtcclxuICAgIH1cclxuICAgIHNldFBhdGllbnRzKCkge1xyXG5cclxuICAgIH1cclxuICAgIHNldE1hdGVyaWFscygpIHtcclxuXHJcbiAgICB9XHJcbiAgICBnZXRQYXRpZW50c0RhdGEoKXtcclxuICAgICAgICBjb25zb2xlLmxvZygnQSBkZXZvbHZlciB0b2RvcyBvcyBkYWRvcyBkYSBCRCcpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMucGF0aWVudHNEYXRhX2lkKTsgICBcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmdldERvY3VtZW50KHRoaXMucGF0aWVudHNEYXRhX2lkKS5kYXRhO1xyXG4gICAgfVxyXG4gICAgc2V0UGF0aWVudHNEYXRhKGRhdGEpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnR3JhdmFyIGRhZG9zIFBhY2llbnRlcycpO1xyXG5cclxuICAgICAgICAvL2RlYnVnXHJcbiAgICAgICAgLy90aGlzLmRlbGV0ZURhdGEoJ2RhdGEnKTtcclxuICAgICAgICAvL3RoaXMuZGVsZXRlRGF0YSgnbWF0ZXJpYWxzJyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy9Ub2RvcyBvcyBkYWRvcyBkbyBwYWNpZW50ZSBlIHJlZiBfaWRcclxuICAgICAgICB0aGlzLnBhdGllbnRzRGF0YV9pZCA9IHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5jcmVhdGVEb2N1bWVudCh7XHJcbiAgICAgICAgICAgIFwidHlwZVwiOiBcImRhdGFcIixcclxuICAgICAgICAgICAgXCJkYXRhXCI6IGRhdGFcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy9HdWFyZGEgZGFkb3MgZG9zIFBhY2llbnRlc1xyXG4gICAgICAgIC8vR3VhcmRhIGRhZG9zIGRhcyBuZWNlc3NpZGFkZXNcclxuICAgICAgICBcclxuICAgICAgICAvKkd1YXJkYSBkYWRvcyBkb3MgbWF0ZXJpYWlzIGUgYWRpY2lvbmEgcmF0aW5ncyBhb3MgbWF0ZXJpYWlzXHJcbiAgICAgICAgbGV0IG1hdGVyaWFscyA9IFtdO1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaiA9IDA7IGogPCBkYXRhW2ldLm5lZWRzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBtYXRlcmlhbHMucHVzaChkYXRhW2ldLm5lZWRzW2pdLm1hdGVyaWFscyk7IFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnNvbGUubG9nKCdBIGNyaWFyIG9zIHJhdGluZ3Mgbm9zIGRhZG9zJyk7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IG1hdGVyaWFscy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBmb3IobGV0IGogPSAwOyBqIDwgbWF0ZXJpYWxzW2ldLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgIG1hdGVyaWFsc1tpXVtqXVsncmF0aW5ncyddID0gWycnXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zb2xlLmxvZyhcIkEgZ3VhcmRhciBvcyBtYXRlcmlhaXMgbmEgQkRcIik7XHJcbiAgICAgICAgdGhpcy5tYXRlcmlhbHNfaWQgPSB0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuY3JlYXRlRG9jdW1lbnQoe1xyXG4gICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwibWF0ZXJpYWxzXCIsXHJcbiAgICAgICAgICAgICAgICBcIm1hdGVyaWFsc1wiOiBtYXRlcmlhbHMsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkudXBkYXRlRG9jdW1lbnQodGhpcy5nbG9iYWxEYXRhX2lkLCB7XHJcbiAgICAgICAgICAgIFwiZGF0YVJlcXVlc3RcIjogXCJ0cnVlXCJcclxuICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgIC8vY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoZGF0YVswXS5uZWVkc1swXS5tYXRlcmlhbHMsbnVsbCw0KSk7XHJcblxyXG4gICAgICAgIC8qXHJcbiAgICAgICAgY29uc29sZS5sb2coJ2FudGVzIGRvIGZvcicpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGRhdGFbMF0ubmVlZHMubWF0ZXJpYWxzLG51bGwsNCkpO1xyXG4gICAgICAgIC8vSnVudGFyIHRvZG9zIG9zIG1hdGVyaWFpcyBwYXJhIGNvbG9jYXIgcmF0aW5nXHJcbiAgICAgICAgbGV0IG1hdGVyaWFscyA9IFtdO1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdubyBmb3InKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoZGF0YVswXS5uZWVkcy5tYXRlcmlhbHMsbnVsbCw0KSk7XHJcbiAgICAgICAgICAgIG1hdGVyaWFscy5wdXNoKGRhdGFbaV0ubmVlZHMubWF0ZXJpYWxzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2coJ01BVEVSSUFMUycpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KG1hdGVyaWFscyxudWxsLDQpKTtcclxuICAgICAgICB0aGlzLm1hdGVyaWFsc19pZCA9IHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5jcmVhdGVEb2N1bWVudCh7XHJcbiAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJtYXRlcmlhbHNcIixcclxuICAgICAgICAgICAgICAgIFwiZGF0YVwiOiBtYXRlcmlhbHMsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5zaG93RGF0YSgnbWF0ZXJpYWwnKTtcclxuICAgICAgICAqL1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coXCJBUVVJMTBcIitKU09OLnN0cmluZ2lmeSh0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZ2V0RG9jdW1lbnQodGhpcy5wYXRpZW50c0RhdGFfaWQpLmRhdGEsbnVsbCw0KSk7XHJcbiAgICB9XHJcbiAgICBzZXROZWVkcygpIHtcclxuXHJcbiAgICB9XHJcbiAgICBnZXRUb2tlbigpOiBzdHJpbmcge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdBIGRldm9sdmVyIHRva2VuJyk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5nZXREb2N1bWVudCh0aGlzLnVzZXJEYXRhX2lkKS51c2VyLmNhcmVnaXZlcl90b2tlbjtcclxuICAgIH1cclxuICAgIGdldFVzZXJJRCgpOiBzdHJpbmcge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdBIGRldm9sdmVyIG8gSUQgZG8gdXNlcicpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZ2V0RG9jdW1lbnQodGhpcy51c2VyRGF0YV9pZCkudXNlci5pZDtcclxuICAgIH1cclxuICAgIGdldExhdGVzdFVzZXJUb1JlZ2lzdGVyKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiQSBkZXZvbHZlciB1bHRpbW8gdXRpbGl6YWRvciByZWdpc3RhZG9cIilcclxuICAgICAgICB2YXIgdXNlcnMgPSB0aGlzLmdldEFsbFVzZXJzKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYodXNlcnMpIHtcclxuICAgICAgICAgICAgdmFyIGxhc3RVc2VyO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpIGluIHVzZXJzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodXNlcnMuaGFzT3duUHJvcGVydHkoaSkgJiYgdHlwZW9mKGkpICE9PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGFzdFVzZXIgPSB1c2Vyc1tpXTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gbGFzdFVzZXIudXNlcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGRlbGV0ZURhdGEodmlldykge1xyXG4gICAgICAgIGxldCBkb2N1bWVudHMgPSB0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZXhlY3V0ZVF1ZXJ5KHZpZXcpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdBIGFwYWdhciBiZDogJyArIHZpZXcpO1xyXG4gICAgICAgIC8vIGxvb3Agb3ZlciBhbGwgZG9jdW1lbnRzXHJcbiAgICAgICAgaWYodGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmV4ZWN1dGVRdWVyeSh2aWV3KS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZG9jdW1lbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBkZWxldGUgZWFjaCBkb2N1bWVudFxyXG4gICAgICAgICAgICAgICAgLy8gY291Y2hiYXNlIHdpbGwgYXNzaWduIGFuIGlkIChfaWQpIHRvIGEgZG9jdW1lbnQgd2hlbiBjcmVhdGVkXHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZGVsZXRlRG9jdW1lbnQoZG9jdW1lbnRzW2ldLl9pZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0QWxsVXNlcnMoKXtcclxuICAgICAgICBpZih0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZXhlY3V0ZVF1ZXJ5KFwidXNlclwiKS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZXhlY3V0ZVF1ZXJ5KFwidXNlclwiKTtcclxuICAgICAgICB9ICAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHNob3dEYXRhKHZpZXcpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnQSBtb3N0cmFyIGJkOiAnICsgdmlldyArICcgY29tICcgKyB0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZXhlY3V0ZVF1ZXJ5KHZpZXcpLmxlbmd0aCArICcgZWxlbWVudG9zJyk7XHJcbiAgICAgICAgaWYodGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmV4ZWN1dGVRdWVyeSh2aWV3KS5sZW5ndGggPiAwKSB7ICAgICBcclxuICAgICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkodGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmV4ZWN1dGVRdWVyeSh2aWV3KSwgbnVsbCwgNCkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgICBwdWJsaWMgb25DcmVhdGVGaWxlKCkge1xyXG4gICAgICAgIC8vID4+IGZzLWNyZWF0ZS1hbGwtY29kZVxyXG4gICAgICAgIGxldCBkb2N1bWVudHMgPSBmcy5rbm93bkZvbGRlcnMuZG9jdW1lbnRzKCk7XHJcbiAgICAgICAgdGhpcy5mb2xkZXIgPSBkb2N1bWVudHMuZ2V0Rm9sZGVyKHRoaXMuZm9sZGVyTmFtZSB8fCBcInRlc3RGb2xkZXJcIik7XHJcbiAgICAgICAgdGhpcy5maWxlID0gdGhpcy5mb2xkZXIuZ2V0RmlsZSgodGhpcy5maWxlTmFtZSB8fCBcInRlc3RGaWxlXCIpICsgXCIudHh0XCIpO1xyXG5cclxuICAgICAgICBcclxuICAgICAgICAvKlxyXG4gICAgICAgIHRoaXMuZmlsZS53cml0ZVRleHQodGhpcy5maWxlVGV4dENvbnRlbnQgfHwgXCJzb21lIHJhbmRvbSBjb250ZW50XCIpXHJcbiAgICAgICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyBTdWNjZWVkZWQgd3JpdGluZyB0byB0aGUgZmlsZS5cclxuICAgICAgICAgICAgICAgIHRoaXMuZmlsZS5yZWFkVGV4dCgpXHJcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdWNjZXNzTWVzc2FnZSA9IFwiU3VjY2Vzc2Z1bGx5IHNhdmVkIGluIFwiICsgdGhpcy5maWxlLnBhdGg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMud3JpdHRlbkNvbnRlbnQgPSByZXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXNJdGVtVmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pLmNhdGNoKGVyciA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyBFcnJvclxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAvLyA8PCBmcy1jcmVhdGUtYWxsLWNvZGVcclxuICAgICAgICAqL1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldEN1cnJlbnRVc2VyRG9jSUQoKSB7XHJcbiAgICAgICAgdmFyIHVzZXJzID0gdGhpcy5nZXRBbGxVc2VycygpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKHVzZXJzKSB7XHJcbiAgICAgICAgICAgIHZhciBsYXN0VXNlcjtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSBpbiB1c2Vycykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHVzZXJzLmhhc093blByb3BlcnR5KGkpICYmIHR5cGVvZihpKSAhPT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxhc3RVc2VyID0gdXNlcnNbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGxhc3RVc2VyLl9pZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgaXNVc2VyQXV0aCgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnQSB2ZXJpZmljYXIgc2UgZXhpc3RlIHV0aWxpemFkb3IgbmEgQkQnKTtcclxuICAgICAgICBpZih0aGlzLnVzZXJEYXRhX2lkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7IFxyXG4gICAgfVxyXG4gICAgLy9HdWFyZGEgYXZhbGlhw6fDtWVzIGRvcyBtYXRlcmlhaXNcclxuICAgIHB1YmxpYyBzZXRSYXRpbmcocmF0aW5nKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ0EgcmVnaXN0YXIgbyByYXRpbmcnKTtcclxuICAgICAgICAvL1JlY2VibyBvIHJhdGluZywgY29tIGlkIGRvIG1hdGVyaWFsXHJcbiAgICAgICAgLy9Wb3Ugw6AgQkQgZG9zIG1hdGVyaWFpc1xyXG4gICAgICAgIC8vUGFyYSBjYWRhIG1hdGVyaWFsIGNvbSBhcXVlbGUgaWQsIGF0dWFsaXphciBvIHNldSByYXRpbmcuXHJcbiAgICAgICAgLypJc3RvIGFsdGVyYSBhIGJkIGRvcyBtYXRlcmlhaXMuXHJcbiAgICAgICAgbGV0IG1hdGVyaWFscyA9IHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5nZXREb2N1bWVudCh0aGlzLm1hdGVyaWFsc19pZCkubWF0ZXJpYWxzO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBtYXRlcmlhbHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgZm9yKGxldCBqID0gMDsgaiA8IG1hdGVyaWFsc1tpXS5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgaWYocmF0aW5nLmlkX21hdGVyaWFsID09PSBtYXRlcmlhbHNbaV1bal0uaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygncmVnaXN0b3UnKTtcclxuICAgICAgICAgICAgICAgICAgICBtYXRlcmlhbHNbaV1bal0ucmF0aW5ncy5wdXNoKHJhdGluZyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShtYXRlcmlhbHMsIG51bGwsIDQpKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkudXBkYXRlRG9jdW1lbnQodGhpcy5tYXRlcmlhbHNfaWQsIHtcclxuICAgICAgICAgICAgXCJ0eXBlXCI6IFwibWF0ZXJpYWxzXCIsXHJcbiAgICAgICAgICAgIFwibWF0ZXJpYWxzXCI6IG1hdGVyaWFscyxcclxuICAgICAgICB9KVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vdGhpcy5zaG93RGF0YSgnbWF0ZXJpYWxzJyk7XHJcbiAgICAgICAgRklNIGRhIGFsdGVyYcOnw6NvIG5hIEJEIGRvcyBtYXRlcmlhaXMqL1xyXG4gICAgICAgIC8qQXNzaW0gYWx0ZXJhIGEgQkQgZG9zIHBhY2llbnRlcyovXHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeSh0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZ2V0RG9jdW1lbnQodGhpcy5wYXRpZW50c0RhdGFfaWQpLmRhdGEsbnVsbCw0KSk7XHJcbiAgICAgICAgbGV0IHBhdGllbnRzRGF0YSA9IHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5nZXREb2N1bWVudCh0aGlzLnBhdGllbnRzRGF0YV9pZCkuZGF0YTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKFwiRW50cm91IG5vIGZvclwiKTtcclxuICAgICAgICAvKlxyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBwYXRpZW50c0RhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgZm9yKGxldCBqID0gMDsgaiA8IHBhdGllbnRzRGF0YVtpXS5uZWVkcy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgZm9yKGxldCBrID0gMDsgayA8IHBhdGllbnRzRGF0YVtpXS5uZWVkc1tqXS5tYXRlcmlhbHMubGVuZ3RoOyBrKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGF0aWVudHNEYXRhW2ldLm5lZWRzW2pdLm1hdGVyaWFsc1trXVsncmF0aW5ncyddID0gWycnXTtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAqL1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBwYXRpZW50c0RhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgZm9yKGxldCBqID0gMDsgaiA8IHBhdGllbnRzRGF0YVtpXS5uZWVkcy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgZm9yKGxldCBrID0gMDsgayA8IHBhdGllbnRzRGF0YVtpXS5uZWVkc1tqXS5tYXRlcmlhbHMubGVuZ3RoOyBrKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBpZihwYXRpZW50c0RhdGFbaV0ubmVlZHNbal0ubWF0ZXJpYWxzW2tdLmlkID09IHJhdGluZy5pZF9tYXRlcmlhbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygncmVnaXN0b3UnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShwYXRpZW50c0RhdGFbaV1bal1ba10sbnVsbCw0KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhdGllbnRzRGF0YVtpXS5uZWVkc1tqXS5tYXRlcmlhbHNba11bJ3JhdGluZ3MnXSA9IHJhdGluZzsgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkocGF0aWVudHNEYXRhLG51bGwsNCkpO1xyXG4gICAgICAgIHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS51cGRhdGVEb2N1bWVudCh0aGlzLnBhdGllbnRzRGF0YV9pZCwge1xyXG4gICAgICAgICAgICBcInR5cGVcIjogXCJkYXRhXCIsXHJcbiAgICAgICAgICAgIFwiZGF0YVwiOiBwYXRpZW50c0RhdGEsXHJcbiAgICAgICAgfSlcclxuICAgICAgICBcclxuICAgICAgICAvL3RoaXMuc2hvd0RhdGEoXCJkYXRhXCIpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldE1hdGVyaWFsUmF0aW5nKG1hdGVyaWFsX2lkKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXROZWVkTWF0ZXJpYWxzKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdBIGRldm9sdmVyIHRvZG9zIG9zIG1hdGVyaWFpcycpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZ2V0RG9jdW1lbnQodGhpcy5tYXRlcmlhbHNfaWQpLm1hdGVyaWFscztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaXNQYXRpZW50c1JlcXVlc3REb25lKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiQSB2ZXJpZmljYXIgc2UgbyBwZWRpZG8gYW8gc2Vydmlkb3IgasOhIGZvaSBmZWl0b1wiKTtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZ2V0RG9jdW1lbnQodGhpcy5nbG9iYWxEYXRhX2lkKS5kYXRhUmVxdWVzdCk7XHJcbiAgICAgICAgaWYodGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmdldERvY3VtZW50KHRoaXMuZ2xvYmFsRGF0YV9pZCkuZGF0YVJlcXVlc3QgPT0gXCJmYWxzZVwiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHNldFF1aXpzKGNhcmVnaXZlclF1ZXN0aW9uYWlyZXMpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkEgZ3VhcmRhciBxdWVzdGlvbsOhcmlvcyBuYSBCRFwiKTtcclxuICAgICAgICB0aGlzLnF1aXpzX2lkID0gdGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmNyZWF0ZURvY3VtZW50KHtcclxuICAgICAgICAgICAgXCJ0eXBlXCI6IFwicXVpelwiLFxyXG4gICAgICAgICAgICBcInF1aXpcIjogY2FyZWdpdmVyUXVlc3Rpb25haXJlc1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldFF1aXpJRCgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkEgb2J0ZXIgSUQgZG9zIHF1aXpzXCIpXHJcbiAgICAgICAgIGlmKHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5leGVjdXRlUXVlcnkoJ3F1aXonKS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5leGVjdXRlUXVlcnkoJ3F1aXonKSwgbnVsbCwgNCkpO1xyXG4gICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5leGVjdXRlUXVlcnkoJ3F1aXonKS5faWQ7XHJcbiAgICAgICAgIH1cclxuICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0UXVpenMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5nZXREb2N1bWVudCh0aGlzLnF1aXpzX2lkKS5xdWl6O1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldExhdGVzdFBhdGllbnREYXRhKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdFbnRyb3UgMicpO1xyXG4gICAgICAgIHZhciBwYXRpZW50c0RhdGEgPSB0aGlzLmdldEFsbFBhdGllbnRzRGF0YSgpO1xyXG5cclxuICAgICAgICBpZihwYXRpZW50c0RhdGEpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ0VOVFJPVSEnKTtcclxuICAgICAgICAgICAgdmFyIGxhc3REYXRhO1xyXG5cclxuICAgICAgICAgICAgbGFzdERhdGEgPSBwYXRpZW50c0RhdGFbcGF0aWVudHNEYXRhLmxlbmd0aCAtIDFdO1xyXG4gICAgICAgICAgICByZXR1cm4gbGFzdERhdGEuX2lkO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBpc0dsb2JhbFNldCgpIHtcclxuICAgICAgICBpZih0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZXhlY3V0ZVF1ZXJ5KCdnbG9iYWwnKS5sZW5ndGggPiAwKSB7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0R2xvYmFsc0lEKCkge1xyXG4gICAgICAgIGlmKHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5leGVjdXRlUXVlcnkoJ2dsb2JhbCcpLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkodGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmV4ZWN1dGVRdWVyeShcImdsb2JhbFwiKSwgbnVsbCwgNCkpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5leGVjdXRlUXVlcnkoJ2dsb2JhbCcpWzBdLl9pZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0QWxsUGF0aWVudHNEYXRhKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdFbnRyb3UgMScpO1xyXG4gICAgICAgIGlmKHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5leGVjdXRlUXVlcnkoXCJkYXRhXCIpLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgLy8gY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkodGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmV4ZWN1dGVRdWVyeShcImRhdGFcIiksIG51bGwsIDQpKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5leGVjdXRlUXVlcnkoXCJkYXRhXCIpO1xyXG4gICAgICAgIH0gICAgICAgICBcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbn0iXX0=