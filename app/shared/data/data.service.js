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
        this.deleteData('quiz');
        //this.deleteData('user');
        this.deleteData('global');
        //this.showData('data'); //Esta a dar excepcao e a imprimir os users tb???!!!!! (por confirmar) pq n tem dados e estoira?? mas imprime o user pq?
        //this.showData('user');
        //this.showData('materials');
        //this.showData('quiz');
        this.init();
        //this.showData('global');
        //
    }
    DataService.prototype.ngOnInit = function () {
    };
    DataService.prototype.init = function () {
        console.log('A inicializar as variáveis globais');
        //Adicionar numero de avaliações pendentes
        //...
        if (this.isGlobalSet()) {
            console.log('A atualizar global de conexao');
            this.globalData_id = this.getGlobalsID();
            this.database.getDatabase().updateDocument(this.globalData_id, {
                "type": "global",
                "dataRequest": "false",
                "evaluationsToDo": "false"
            });
            console.log(JSON.stringify(this.database.getDatabase().getDocument(this.globalData_id)));
        }
        else {
            console.log('A criar objeto para as variáveis globais');
            //criar variável global boolean para dizer se há quizes para fazer update ou n
            this.globalData_id = this.database.getDatabase().createDocument({
                "type": "global",
                "dataRequest": "false",
                "evaluationsToDo": "false"
            });
        }
        this.userData_id = this.getCurrentUserDocID();
        this.patientsData_id = this.getLatestPatientData();
        this.quizs_id = this.getLatestQuizData();
        console.log("QUIZS: " + this.quizs_id);
        this.quizs_done_id = this.getQuizsOnHold_ID();
        //verificar se há questionários para preencher
        this.checkQuizStatus();
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
        //debug
        //this.deleteData('data');
        //this.deleteData('materials');
        //Todos os dados do paciente e ref _id
        if (this.patientsData_id) {
            console.log('A atualizar os dados dos pacientes na bd, com o id ' + this.patientsData_id);
            this.database.getDatabase().updateDocument(this.patientsData_id, {
                "data": data
            });
        }
        else {
            console.log('Gravar dados Pacientes');
            this.patientsData_id = this.database.getDatabase().createDocument({
                "type": "data",
                "data": data
            });
        }
        this.mediaPersistence(data);
        //Guarda dados dos Pacientes
        //Guarda dados das necessidades
        var $global = this.database.getDatabase().getDocument(this.globalData_id);
        this.database.getDatabase().updateDocument(this.globalData_id, {
            "type": "global",
            "dataRequest": "true",
            "evaluationsToDo": global.evaluationsToDo
        });
        //ver o get document tb e comparar
        this.showData('global');
    };
    DataService.prototype.mediaPersistence = function (data) {
        /**
       * Abrir todo o conteúdo da pasta materials
       */
        var documents = fs.knownFolders.documents();
        var path = fs.path.join(documents.path, "app/materials");
        //console.log(path);
    };
    DataService.prototype.setNeeds = function () {
    };
    DataService.prototype.getToken = function () {
        console.log('A devolver token');
        return this.database.getDatabase().getDocument(this.userData_id).user.caregiver_token;
    };
    DataService.prototype.getUserID = function () {
        console.log('A o ID do user');
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
        if (this.database.getDatabase().getDocument(this.globalData_id).dataRequest == "false") {
            return false;
        }
        return true;
    };
    DataService.prototype.setQuizs = function (caregiverQuestionaires) {
        if (!this.isQuizsSet()) {
            console.log('entrou');
            this.quizs_id = this.database.getDatabase().createDocument({
                "type": "quiz",
                "quiz": caregiverQuestionaires
            });
        }
        else {
            console.log('AQUI!!!!!!!!!!!!!!');
            var quizs = this.getQuizs();
            //console.log(JSON.stringify(quizs, null, 4));
            var quizs_final = this.getQuizs();
            var caregiverQuestionaires_ids = new Array();
            var quizs_ids = new Array();
            var quizs_ids_to_add_to_BD = new Array();
            var quizs_same_id = new Array();
            var found_control;
            var index_control = -1;
            caregiverQuestionaires_ids.push(caregiverQuestionaires.map(function (questionnaire) {
                var quest = {};
                quest[questionnaire.id] = questionnaire.reference;
                return quest;
            }));
            //console.log('aqui');
            //console.log(JSON.stringify(caregiverQuestionaires_ids, null, 4));
            quizs_ids.push(quizs.map(function (questionnaire) { return questionnaire.id; }));
            //console.log(JSON.stringify(quizs_ids, null, 4));
            //para cada questão do questionário remoto
            caregiverQuestionaires_ids[0].forEach(function (questionnaire_server_id) {
                //Controlo se encontrou match a false e de index do questionário a 0
                found_control = false;
                index_control++;
                //Para cada questionário da BD
                quizs_ids[0].forEach(function (questionnaire_BD_id) {
                    //se encontrar match
                    if (questionnaire_server_id.id == questionnaire_BD_id.id && questionnaire_server_id.reference == questionnaire_BD_id.reference) {
                        //encontrou
                        found_control = true;
                        //mete num array
                        quizs_same_id.push(questionnaire_server_id);
                        return;
                    }
                });
                //se n encontrou match
                // console.log('terminou for');
                if (!found_control) {
                    //console.log('ENTROU');
                    //adiciona-o como quiz a acrescentar na BD
                    quizs_ids_to_add_to_BD.push(questionnaire_server_id);
                    quizs_final.push(caregiverQuestionaires[index_control]);
                }
            });
            //console.log('A mostrar quizs a sobrepor')
            //console.log(JSON.stringify(quizs_final, null, 4));
            this.database.getDatabase().updateDocument(this.quizs_id, {
                'quiz': quizs_final,
                'type': 'quiz'
            });
        }
        //console.log('A mostrar BD-QUIZ!')
        //this.showData('quiz');
    };
    DataService.prototype.checkQuestionnaire_reference = function (id) {
    };
    DataService.prototype.getAllQuizs = function () {
        console.log("A obter ID dos quizs");
        if (this.database.getDatabase().executeQuery('quiz').length > 0) {
            //console.log(JSON.stringify(this.database.getDatabase().executeQuery('quiz'), null, 4));
            return this.database.getDatabase().executeQuery('quiz');
        }
        console.log('passou aqui');
        return null;
    };
    DataService.prototype.getLatestQuizData = function () {
        var quizs = this.getAllQuizs();
        if (quizs) {
            var lastQuiz;
            lastQuiz = quizs[quizs.length - 1];
            return lastQuiz._id;
        }
        console.log('passou aqui-1');
        return null;
    };
    DataService.prototype.getLatestPatientData = function () {
        var patientsData = this.getAllPatientsData();
        if (patientsData) {
            var lastData;
            lastData = patientsData[patientsData.length - 1];
            return lastData._id;
        }
        return null;
    };
    DataService.prototype.getQuizs = function () {
        if (this.database.getDatabase().executeQuery('quiz').length > 0) {
            return this.database.getDatabase().getDocument(this.quizs_id).quiz;
        }
        return null;
    };
    DataService.prototype.isGlobalSet = function () {
        console.log("GLOBALSIZE: " + this.database.getDatabase().executeQuery('global').length);
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
        if (this.database.getDatabase().executeQuery("data").length > 0) {
            // console.log(JSON.stringify(this.database.getDatabase().executeQuery("data"), null, 4));
            return this.database.getDatabase().executeQuery("data");
        }
        return false;
    };
    DataService.prototype.updateQuizStatus = function (questionnaire) {
        var quizs = this.getQuizs();
        if (quizs) {
            quizs.forEach(function (element_quiz) {
                if (element_quiz.ref_questionnaire == questionnaire.ref_questionnaire) {
                    element_quiz.done = true;
                }
            });
            this.database.getDatabase().updateDocument(this.quizs_id, {
                'quiz': quizs,
                'type': 'quiz'
            });
            //this.showData('quiz');
            this.checkQuizStatus();
        }
        return null;
    };
    DataService.prototype.checkQuizStatus = function () {
        var _this = this;
        var quizs = this.getQuizs();
        if (quizs) {
            console.log('passou aqui-2');
            var quiz_done = [];
            quiz_done.push(quizs.map(function (quizs) { return quizs.done; }));
            quiz_done[0].forEach(function (quiz_result) {
                console.log("A verificar estado das avaliações");
                console.log('1: ' + quiz_result);
                if (quiz_result == 'false') {
                    console.log("A mudar estado das avaliações");
                    _this.database.getDatabase().updateDocument(_this.globalData_id, {
                        "evaluationsToDo": "true",
                        "type": "global",
                        "dataRequest": "true"
                    });
                }
            });
        }
        else {
            this.database.getDatabase().updateDocument(this.globalData_id, {
                "evaluationsToDo": "false",
                "type": "global",
                "dataRequest": "true"
            });
        }
        console.log('passou aqui - 3');
    };
    DataService.prototype.hasEvaluationsToDo = function () {
        //console.log('GLOBAL ID: ' + this.globalData_id);
        //console.log(JSON.stringify(this.database.getDatabase().getDocument(this.globalData_id), null, 4));
        //console.log('Evaluations to do:' + this.database.getDatabase().getDocument(this.globalData_id).evaluationsToDo)
        /*
        if(this.database.getDatabase().getDocument(this.globalData_id).evaluationsToDo == "true") {
            return true;
        }
        return false;
        */
        return true;
    };
    DataService.prototype.isQuizsSet = function () {
        console.log('QUIZ-ID: ' + this.quizs_id);
        if (this.quizs_id) {
            return true;
        }
        return false;
    };
    DataService.prototype.deleteQuestionnaire = function (questionnaire) {
        //apagar o questionario que foi enviado da BD. Não é urgente pq depois de feito fica oculto
    };
    DataService.prototype.addQuestionnaireToDB = function (questionnaire) {
        if (!this.isSetQuizsDone()) {
            this.quizs_done_id = this.database.getDatabase().createDocument({
                'type': 'quizsOnHold',
                'questionnaires': questionnaire
            });
        }
        else {
            var quizsOnHold_BD = this.getAllQuizsOnHold();
            quizsOnHold_BD.push(questionnaire);
            this.quizs_done_id = this.database.getDatabase().updateDocument({
                'type': 'quizsOnHold',
                'questionnaires': quizsOnHold_BD
            });
        }
    };
    DataService.prototype.isSetQuizsDone = function () {
        if (this.quizs_done_id) {
            return true;
        }
        return false;
    };
    DataService.prototype.getQuizsOnHold_ID = function () {
        if (this.database.getDatabase().executeQuery('quizOnHold').length > 0) {
            //console.log(JSON.stringify(this.database.getDatabase().executeQuery("quizOnHold"), null, 4));
            return this.database.getDatabase().executeQuery('quizOnHold')[0]._id;
        }
        return null;
    };
    DataService.prototype.getAllQuizsOnHold = function () {
        if (this.database.getDatabase().executeQuery('quizOnHold').length > 0) {
            //console.log(JSON.stringify(this.database.getDatabase().executeQuery("quizOnHold"), null, 4));
            return this.database.getDatabase().executeQuery('quizOnHold').questionnaires;
        }
        return null;
    };
    return DataService;
}());
DataService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [database_1.Database])
], DataService);
exports.DataService = DataService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGF0YS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxnQ0FBa0M7QUFDbEMsaUNBQStCO0FBSS9CLHNDQUEyQztBQU0zQyx1Q0FBc0M7QUFNdEMsSUFBYSxXQUFXO0lBaUJwQixxQkFBbUIsUUFBa0I7UUFBbEIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUM3QixPQUFPLENBQUMsR0FBRyxDQUFDLDJCQUEyQixDQUFDLENBQUM7UUFDekMscUNBQXFDO1FBQ3JDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDeEIsMEJBQTBCO1FBQzFCLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDMUIsaUpBQWlKO1FBQ2pKLHdCQUF3QjtRQUN4Qiw2QkFBNkI7UUFDN0Isd0JBQXdCO1FBQ3hCLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNaLDBCQUEwQjtRQUUxQixFQUFFO0lBRVYsQ0FBQztJQUVELDhCQUFRLEdBQVI7SUFDQSxDQUFDO0lBQ0QsMEJBQUksR0FBSjtRQUNJLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0NBQW9DLENBQUMsQ0FBQztRQUNsRCwwQ0FBMEM7UUFDMUMsS0FBSztRQUVMLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDcEIsT0FBTyxDQUFDLEdBQUcsQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO1lBQzdDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1lBQ3pDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUU7Z0JBQzNELE1BQU0sRUFBRSxRQUFRO2dCQUNoQixhQUFhLEVBQUUsT0FBTztnQkFDdEIsaUJBQWlCLEVBQUcsT0FBTzthQUM5QixDQUFDLENBQUM7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QUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDaEIsQ0FBQztRQUNELE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUNELHVDQUFpQixHQUFqQjtRQUNJLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ25FLCtGQUErRjtZQUMvRixNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQ3pFLENBQUM7UUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFDRCx1Q0FBaUIsR0FBakI7UUFDSSxFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNuRSwrRkFBK0Y7WUFDL0YsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxDQUFDLGNBQWMsQ0FBQztRQUNqRixDQUFDO1FBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNoQixDQUFDO0lBQ0wsa0JBQUM7QUFBRCxDQUFDLEFBdGlCRCxJQXNpQkM7QUF0aUJZLFdBQVc7SUFEdkIsaUJBQVUsRUFBRTtxQ0FrQm9CLG1CQUFRO0dBakI1QixXQUFXLENBc2lCdkI7QUF0aUJZLGtDQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgZnMgZnJvbSBcImZpbGUtc3lzdGVtXCI7XHJcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvbWFwJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XHJcbmltcG9ydCB7IENvbm5lY3RvclNlcnZpY2UgfSBmcm9tICcuLi8uLi9zaGFyZWQvY29ubmVjdG9yL2Nvbm5lY3Rvci5zZXJ2aWNlJztcclxuXHJcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBNYXRlcmlhbHMgfSBmcm9tIFwiLi9tYXRlcmlhbHNcIjtcclxuaW1wb3J0IHsgRGF0YSB9IGZyb20gXCIuL2RhdGFcIjtcclxuaW1wb3J0IHsgTmVlZHMgfSBmcm9tIFwiLi9uZWVkc1wiO1xyXG5pbXBvcnQgeyBQYXRpZW50IH0gZnJvbSBcIi4uLy4uL3BhdGllbnQvcGF0aWVudFwiO1xyXG5pbXBvcnQgeyBDb3VjaGJhc2UgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWNvdWNoYmFzZVwiO1xyXG5pbXBvcnQgeyBEYXRhYmFzZSB9IGZyb20gXCIuL2RhdGFiYXNlXCI7XHJcbmltcG9ydCB7IFVzZXJTZXJ2aWNlIH0gZnJvbSAnLi4vdXNlci91c2VyLnNlcnZpY2UnO1xyXG5cclxuXHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBEYXRhU2VydmljZSB7XHJcblxyXG4gICAgcHVibGljIHBhdGllbnRzRGF0YV9pZDogYW55O1xyXG4gICAgcHVibGljIHVzZXJEYXRhX2lkOiBhbnk7XHJcbiAgICBwdWJsaWMgbWF0ZXJpYWxzX2lkOiBhbnk7XHJcbiAgICBwdWJsaWMgcmF0aW5nc19pZDogYW55O1xyXG4gICAgcHVibGljIGdsb2JhbERhdGFfaWQ6IGFueTtcclxuICAgIHB1YmxpYyBxdWl6c19pZDogYW55O1xyXG4gICAgcHVibGljIHF1aXpzX2RvbmVfaWQ6IGFueTtcclxuXHJcbiAgICBwdWJsaWMgUmVxdWVzdERhdGFfY29udHJvbDogYW55O1xyXG5cclxuICAgIHB1YmxpYyBmaWxlOiBmcy5GaWxlO1xyXG4gICAgcHVibGljIGZvbGRlcjogZnMuRm9sZGVyO1xyXG4gICAgcHVibGljIGZvbGRlck5hbWU6IHN0cmluZztcclxuICAgIHB1YmxpYyBmaWxlTmFtZTogc3RyaW5nO1xyXG4gXHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZGF0YWJhc2U6IERhdGFiYXNlKXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ0luc3RhbmNpb3UgLSBEYXRhU2VydmljZSEnKTtcclxuICAgICAgICAgICAgLy90aGlzLmRhdGEgPSBkYXRhYmFzZS5nZXREYXRhYmFzZSgpO1xyXG4gICAgICAgICAgICB0aGlzLmRlbGV0ZURhdGEoJ3F1aXonKTtcclxuICAgICAgICAgICAgLy90aGlzLmRlbGV0ZURhdGEoJ3VzZXInKTtcclxuICAgICAgICAgICAgdGhpcy5kZWxldGVEYXRhKCdnbG9iYWwnKTtcclxuICAgICAgICAgICAgLy90aGlzLnNob3dEYXRhKCdkYXRhJyk7IC8vRXN0YSBhIGRhciBleGNlcGNhbyBlIGEgaW1wcmltaXIgb3MgdXNlcnMgdGI/Pz8hISEhISAocG9yIGNvbmZpcm1hcikgcHEgbiB0ZW0gZGFkb3MgZSBlc3RvaXJhPz8gbWFzIGltcHJpbWUgbyB1c2VyIHBxP1xyXG4gICAgICAgICAgICAvL3RoaXMuc2hvd0RhdGEoJ3VzZXInKTtcclxuICAgICAgICAgICAgLy90aGlzLnNob3dEYXRhKCdtYXRlcmlhbHMnKTtcclxuICAgICAgICAgICAgLy90aGlzLnNob3dEYXRhKCdxdWl6Jyk7XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdCgpO1xyXG4gICAgICAgICAgICAvL3RoaXMuc2hvd0RhdGEoJ2dsb2JhbCcpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy9cclxuICAgICAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7IFxyXG4gICAgfVxyXG4gICAgaW5pdCgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnQSBpbmljaWFsaXphciBhcyB2YXJpw6F2ZWlzIGdsb2JhaXMnKTtcclxuICAgICAgICAvL0FkaWNpb25hciBudW1lcm8gZGUgYXZhbGlhw6fDtWVzIHBlbmRlbnRlc1xyXG4gICAgICAgIC8vLi4uXHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYodGhpcy5pc0dsb2JhbFNldCgpKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdBIGF0dWFsaXphciBnbG9iYWwgZGUgY29uZXhhbycpOyBcclxuICAgICAgICAgICAgdGhpcy5nbG9iYWxEYXRhX2lkID0gdGhpcy5nZXRHbG9iYWxzSUQoKTtcclxuICAgICAgICAgICAgdGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLnVwZGF0ZURvY3VtZW50KHRoaXMuZ2xvYmFsRGF0YV9pZCwge1xyXG4gICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZ2xvYmFsXCIsXHJcbiAgICAgICAgICAgICAgICBcImRhdGFSZXF1ZXN0XCI6IFwiZmFsc2VcIixcclxuICAgICAgICAgICAgICAgIFwiZXZhbHVhdGlvbnNUb0RvXCIgOiBcImZhbHNlXCJcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeSh0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZ2V0RG9jdW1lbnQodGhpcy5nbG9iYWxEYXRhX2lkKSkpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnQSBjcmlhciBvYmpldG8gcGFyYSBhcyB2YXJpw6F2ZWlzIGdsb2JhaXMnKTtcclxuICAgICAgICAgICAgLy9jcmlhciB2YXJpw6F2ZWwgZ2xvYmFsIGJvb2xlYW4gcGFyYSBkaXplciBzZSBow6EgcXVpemVzIHBhcmEgZmF6ZXIgdXBkYXRlIG91IG5cclxuICAgICAgICAgICAgdGhpcy5nbG9iYWxEYXRhX2lkID0gdGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmNyZWF0ZURvY3VtZW50KHtcclxuICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImdsb2JhbFwiLFxyXG4gICAgICAgICAgICAgICAgXCJkYXRhUmVxdWVzdFwiOiBcImZhbHNlXCIsXHJcbiAgICAgICAgICAgICAgICBcImV2YWx1YXRpb25zVG9Eb1wiIDogXCJmYWxzZVwiXHJcbiAgICAgICAgICAgIH0pOyAgICAgICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMudXNlckRhdGFfaWQgPSB0aGlzLmdldEN1cnJlbnRVc2VyRG9jSUQoKTtcclxuICAgICAgICB0aGlzLnBhdGllbnRzRGF0YV9pZCA9IHRoaXMuZ2V0TGF0ZXN0UGF0aWVudERhdGEoKTtcclxuICAgICAgICB0aGlzLnF1aXpzX2lkID0gdGhpcy5nZXRMYXRlc3RRdWl6RGF0YSgpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiUVVJWlM6IFwiICsgdGhpcy5xdWl6c19pZCk7XHJcbiAgICAgICAgdGhpcy5xdWl6c19kb25lX2lkID0gdGhpcy5nZXRRdWl6c09uSG9sZF9JRCgpO1xyXG5cclxuICAgICAgICAvL3ZlcmlmaWNhciBzZSBow6EgcXVlc3Rpb27DoXJpb3MgcGFyYSBwcmVlbmNoZXJcclxuICAgICAgICB0aGlzLmNoZWNrUXVpelN0YXR1cygpO1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG4gICAgc3luYygpIHtcclxuICAgICAgICAvKlxyXG4gICAgICAgIHRoaXMuY29ubmVjdG9yU2VydmljZS5nZXRQYXRpZW50cygpXHJcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgIChyZXN1bHQpID0+IHRoaXMub25HZXREYXRhU3VjY2VzcyhyZXN1bHQpLFxyXG4gICAgICAgICAgICAoZXJyb3IpID0+IHRoaXMub25HZXREYXRhRXJyb3IoZXJyb3IpXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICovXHJcbiAgICB9XHJcbiBcclxuICAgIHNldFVzZXIocmVnaXN0ZXJlZFVzZXIpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnQSBncmF2YXIgbyB1dGlsaXphZG9yJyk7XHJcbiAgICAgICAgdGhpcy51c2VyRGF0YV9pZCA9IHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5jcmVhdGVEb2N1bWVudCh7XHJcbiAgICAgICAgICAgIFwidHlwZVwiOiBcInVzZXJcIixcclxuICAgICAgICAgICAgXCJ1c2VyXCI6IHJlZ2lzdGVyZWRVc2VyXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIkFRVUlcIitKU09OLnN0cmluZ2lmeSh0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZ2V0RG9jdW1lbnQodGhpcy51c2VyRGF0YV9pZCwgbnVsbCwgNCkpKTtcclxuICAgIH1cclxuICAgIHNldFBhdGllbnRzKCkge1xyXG5cclxuICAgIH1cclxuICAgIHNldE1hdGVyaWFscygpIHtcclxuXHJcbiAgICB9XHJcbiAgICBnZXRQYXRpZW50c0RhdGEoKXtcclxuICAgICAgICBjb25zb2xlLmxvZygnQSBkZXZvbHZlciB0b2RvcyBvcyBkYWRvcyBkYSBCRCcpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMucGF0aWVudHNEYXRhX2lkKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmdldERvY3VtZW50KHRoaXMucGF0aWVudHNEYXRhX2lkKS5kYXRhO1xyXG4gICAgfVxyXG4gICAgc2V0UGF0aWVudHNEYXRhKGRhdGEpIHtcclxuICAgICAgICAvL2RlYnVnXHJcbiAgICAgICAgLy90aGlzLmRlbGV0ZURhdGEoJ2RhdGEnKTtcclxuICAgICAgICAvL3RoaXMuZGVsZXRlRGF0YSgnbWF0ZXJpYWxzJyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy9Ub2RvcyBvcyBkYWRvcyBkbyBwYWNpZW50ZSBlIHJlZiBfaWRcclxuICAgICAgICBpZih0aGlzLnBhdGllbnRzRGF0YV9pZCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnQSBhdHVhbGl6YXIgb3MgZGFkb3MgZG9zIHBhY2llbnRlcyBuYSBiZCwgY29tIG8gaWQgJyArIHRoaXMucGF0aWVudHNEYXRhX2lkKTtcclxuICAgICAgICAgICAgdGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLnVwZGF0ZURvY3VtZW50KHRoaXMucGF0aWVudHNEYXRhX2lkLCB7XHJcbiAgICAgICAgICAgICAgICBcImRhdGFcIjogZGF0YVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnR3JhdmFyIGRhZG9zIFBhY2llbnRlcycpO1xyXG4gICAgICAgICAgICB0aGlzLnBhdGllbnRzRGF0YV9pZCA9IHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5jcmVhdGVEb2N1bWVudCh7XHJcbiAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJkYXRhXCIsXHJcbiAgICAgICAgICAgICAgICBcImRhdGFcIjogZGF0YVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMubWVkaWFQZXJzaXN0ZW5jZShkYXRhKTtcclxuICAgICAgICBcclxuXHJcbiAgICAgICAgLy9HdWFyZGEgZGFkb3MgZG9zIFBhY2llbnRlc1xyXG4gICAgICAgIC8vR3VhcmRhIGRhZG9zIGRhcyBuZWNlc3NpZGFkZXNcclxuICAgICAgICB2YXIgJGdsb2JhbCA9IHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5nZXREb2N1bWVudCh0aGlzLmdsb2JhbERhdGFfaWQpO1xyXG5cclxuICAgICAgICB0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkudXBkYXRlRG9jdW1lbnQodGhpcy5nbG9iYWxEYXRhX2lkLCB7XHJcbiAgICAgICAgICAgIFwidHlwZVwiIDogXCJnbG9iYWxcIixcclxuICAgICAgICAgICAgXCJkYXRhUmVxdWVzdFwiOiBcInRydWVcIixcclxuICAgICAgICAgICAgXCJldmFsdWF0aW9uc1RvRG9cIiA6IGdsb2JhbC5ldmFsdWF0aW9uc1RvRG9cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy92ZXIgbyBnZXQgZG9jdW1lbnQgdGIgZSBjb21wYXJhclxyXG4gICAgICAgIHRoaXMuc2hvd0RhdGEoJ2dsb2JhbCcpO1xyXG4gICAgfVxyXG4gICAgbWVkaWFQZXJzaXN0ZW5jZShkYXRhKSB7XHJcbiAgICAgICAgICAvKipcclxuICAgICAgICAgKiBBYnJpciB0b2RvIG8gY29udGXDumRvIGRhIHBhc3RhIG1hdGVyaWFsc1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHZhciBkb2N1bWVudHMgPSBmcy5rbm93bkZvbGRlcnMuZG9jdW1lbnRzKCk7XHJcbiAgICAgICAgdmFyIHBhdGggPSBmcy5wYXRoLmpvaW4oZG9jdW1lbnRzLnBhdGgsIFwiYXBwL21hdGVyaWFsc1wiKTtcclxuXHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhwYXRoKTtcclxuICAgIH1cclxuICBcclxuICAgIHNldE5lZWRzKCkge1xyXG5cclxuICAgIH1cclxuICAgIGdldFRva2VuKCk6IHN0cmluZyB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ0EgZGV2b2x2ZXIgdG9rZW4nKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmdldERvY3VtZW50KHRoaXMudXNlckRhdGFfaWQpLnVzZXIuY2FyZWdpdmVyX3Rva2VuO1xyXG4gICAgfVxyXG4gICAgZ2V0VXNlcklEKCk6IHN0cmluZyB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ0EgbyBJRCBkbyB1c2VyJyk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5nZXREb2N1bWVudCh0aGlzLnVzZXJEYXRhX2lkKS51c2VyLmlkO1xyXG4gICAgfVxyXG4gICAgZ2V0TGF0ZXN0VXNlclRvUmVnaXN0ZXIoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJBIGRldm9sdmVyIHVsdGltbyB1dGlsaXphZG9yIHJlZ2lzdGFkb1wiKVxyXG4gICAgICAgIHZhciB1c2VycyA9IHRoaXMuZ2V0QWxsVXNlcnMoKTtcclxuICAgICAgICBcclxuICAgICAgICBpZih1c2Vycykge1xyXG4gICAgICAgICAgICB2YXIgbGFzdFVzZXI7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgaW4gdXNlcnMpIHtcclxuICAgICAgICAgICAgICAgIGlmICh1c2Vycy5oYXNPd25Qcm9wZXJ0eShpKSAmJiB0eXBlb2YoaSkgIT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgICAgICAgICBsYXN0VXNlciA9IHVzZXJzW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBsYXN0VXNlci51c2VyO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZGVsZXRlRGF0YSh2aWV3KSB7XHJcbiAgICAgICAgbGV0IGRvY3VtZW50cyA9IHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5leGVjdXRlUXVlcnkodmlldyk7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ0EgYXBhZ2FyIGJkOiAnICsgdmlldyk7XHJcbiAgICAgICAgLy8gbG9vcCBvdmVyIGFsbCBkb2N1bWVudHNcclxuICAgICAgICBpZih0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZXhlY3V0ZVF1ZXJ5KHZpZXcpLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkb2N1bWVudHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIC8vIGRlbGV0ZSBlYWNoIGRvY3VtZW50XHJcbiAgICAgICAgICAgICAgICAvLyBjb3VjaGJhc2Ugd2lsbCBhc3NpZ24gYW4gaWQgKF9pZCkgdG8gYSBkb2N1bWVudCB3aGVuIGNyZWF0ZWRcclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5kZWxldGVEb2N1bWVudChkb2N1bWVudHNbaV0uX2lkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRBbGxVc2Vycygpe1xyXG4gICAgICAgIGlmKHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5leGVjdXRlUXVlcnkoXCJ1c2VyXCIpLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5leGVjdXRlUXVlcnkoXCJ1c2VyXCIpO1xyXG4gICAgICAgIH0gICAgICAgICBcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2hvd0RhdGEodmlldykge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdBIG1vc3RyYXIgYmQ6ICcgKyB2aWV3ICsgJyBjb20gJyArIHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5leGVjdXRlUXVlcnkodmlldykubGVuZ3RoICsgJyBlbGVtZW50b3MnKTtcclxuICAgICAgICBpZih0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZXhlY3V0ZVF1ZXJ5KHZpZXcpLmxlbmd0aCA+IDApIHsgICAgIFxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeSh0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZXhlY3V0ZVF1ZXJ5KHZpZXcpLCBudWxsLCA0KSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgIHB1YmxpYyBvbkNyZWF0ZUZpbGUoKSB7XHJcbiAgICAgICAgLy8gPj4gZnMtY3JlYXRlLWFsbC1jb2RlXHJcbiAgICAgICAgbGV0IGRvY3VtZW50cyA9IGZzLmtub3duRm9sZGVycy5kb2N1bWVudHMoKTtcclxuICAgICAgICB0aGlzLmZvbGRlciA9IGRvY3VtZW50cy5nZXRGb2xkZXIodGhpcy5mb2xkZXJOYW1lIHx8IFwidGVzdEZvbGRlclwiKTtcclxuICAgICAgICB0aGlzLmZpbGUgPSB0aGlzLmZvbGRlci5nZXRGaWxlKCh0aGlzLmZpbGVOYW1lIHx8IFwidGVzdEZpbGVcIikgKyBcIi50eHRcIik7XHJcblxyXG4gICAgICAgIFxyXG4gICAgICAgIC8qXHJcbiAgICAgICAgdGhpcy5maWxlLndyaXRlVGV4dCh0aGlzLmZpbGVUZXh0Q29udGVudCB8fCBcInNvbWUgcmFuZG9tIGNvbnRlbnRcIilcclxuICAgICAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgICAgIC8vIFN1Y2NlZWRlZCB3cml0aW5nIHRvIHRoZSBmaWxlLlxyXG4gICAgICAgICAgICAgICAgdGhpcy5maWxlLnJlYWRUZXh0KClcclxuICAgICAgICAgICAgICAgICAgICAudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN1Y2Nlc3NNZXNzYWdlID0gXCJTdWNjZXNzZnVsbHkgc2F2ZWQgaW4gXCIgKyB0aGlzLmZpbGUucGF0aDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy53cml0dGVuQ29udGVudCA9IHJlcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0l0ZW1WaXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSkuY2F0Y2goZXJyID0+IHtcclxuICAgICAgICAgICAgICAgIC8vIEVycm9yXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIC8vIDw8IGZzLWNyZWF0ZS1hbGwtY29kZVxyXG4gICAgICAgICovXHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0Q3VycmVudFVzZXJEb2NJRCgpIHtcclxuICAgICAgICB2YXIgdXNlcnMgPSB0aGlzLmdldEFsbFVzZXJzKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYodXNlcnMpIHtcclxuICAgICAgICAgICAgdmFyIGxhc3RVc2VyO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpIGluIHVzZXJzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodXNlcnMuaGFzT3duUHJvcGVydHkoaSkgJiYgdHlwZW9mKGkpICE9PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGFzdFVzZXIgPSB1c2Vyc1tpXTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gbGFzdFVzZXIuX2lkO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBpc1VzZXJBdXRoKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdBIHZlcmlmaWNhciBzZSBleGlzdGUgdXRpbGl6YWRvciBuYSBCRCcpO1xyXG4gICAgICAgIGlmKHRoaXMudXNlckRhdGFfaWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTsgXHJcbiAgICB9XHJcbiAgICAvL0d1YXJkYSBhdmFsaWHDp8O1ZXMgZG9zIG1hdGVyaWFpc1xyXG4gICAgcHVibGljIHNldFJhdGluZyhyYXRpbmcpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnQSByZWdpc3RhciBvIHJhdGluZycpO1xyXG4gICAgICAgIC8vUmVjZWJvIG8gcmF0aW5nLCBjb20gaWQgZG8gbWF0ZXJpYWxcclxuICAgICAgICAvL1ZvdSDDoCBCRCBkb3MgbWF0ZXJpYWlzXHJcbiAgICAgICAgLy9QYXJhIGNhZGEgbWF0ZXJpYWwgY29tIGFxdWVsZSBpZCwgYXR1YWxpemFyIG8gc2V1IHJhdGluZy5cclxuICAgICAgICAvKklzdG8gYWx0ZXJhIGEgYmQgZG9zIG1hdGVyaWFpcy5cclxuICAgICAgICBsZXQgbWF0ZXJpYWxzID0gdGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmdldERvY3VtZW50KHRoaXMubWF0ZXJpYWxzX2lkKS5tYXRlcmlhbHM7XHJcbiAgICAgICAgXHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IG1hdGVyaWFscy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBmb3IobGV0IGogPSAwOyBqIDwgbWF0ZXJpYWxzW2ldLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBpZihyYXRpbmcuaWRfbWF0ZXJpYWwgPT09IG1hdGVyaWFsc1tpXVtqXS5pZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdyZWdpc3RvdScpO1xyXG4gICAgICAgICAgICAgICAgICAgIG1hdGVyaWFsc1tpXVtqXS5yYXRpbmdzLnB1c2gocmF0aW5nKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvL2NvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KG1hdGVyaWFscywgbnVsbCwgNCkpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS51cGRhdGVEb2N1bWVudCh0aGlzLm1hdGVyaWFsc19pZCwge1xyXG4gICAgICAgICAgICBcInR5cGVcIjogXCJtYXRlcmlhbHNcIixcclxuICAgICAgICAgICAgXCJtYXRlcmlhbHNcIjogbWF0ZXJpYWxzLFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgXHJcbiAgICAgICAgLy90aGlzLnNob3dEYXRhKCdtYXRlcmlhbHMnKTtcclxuICAgICAgICBGSU0gZGEgYWx0ZXJhw6fDo28gbmEgQkQgZG9zIG1hdGVyaWFpcyovXHJcbiAgICAgICAgLypBc3NpbSBhbHRlcmEgYSBCRCBkb3MgcGFjaWVudGVzKi9cclxuICAgICAgICAvL2NvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5nZXREb2N1bWVudCh0aGlzLnBhdGllbnRzRGF0YV9pZCkuZGF0YSxudWxsLDQpKTtcclxuICAgICAgICBsZXQgcGF0aWVudHNEYXRhID0gdGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmdldERvY3VtZW50KHRoaXMucGF0aWVudHNEYXRhX2lkKS5kYXRhO1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coXCJFbnRyb3Ugbm8gZm9yXCIpO1xyXG4gICAgICAgIC8qXHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHBhdGllbnRzRGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBmb3IobGV0IGogPSAwOyBqIDwgcGF0aWVudHNEYXRhW2ldLm5lZWRzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IobGV0IGsgPSAwOyBrIDwgcGF0aWVudHNEYXRhW2ldLm5lZWRzW2pdLm1hdGVyaWFscy5sZW5ndGg7IGsrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXRpZW50c0RhdGFbaV0ubmVlZHNbal0ubWF0ZXJpYWxzW2tdWydyYXRpbmdzJ10gPSBbJyddO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgICovXHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHBhdGllbnRzRGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBmb3IobGV0IGogPSAwOyBqIDwgcGF0aWVudHNEYXRhW2ldLm5lZWRzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IobGV0IGsgPSAwOyBrIDwgcGF0aWVudHNEYXRhW2ldLm5lZWRzW2pdLm1hdGVyaWFscy5sZW5ndGg7IGsrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHBhdGllbnRzRGF0YVtpXS5uZWVkc1tqXS5tYXRlcmlhbHNba10uaWQgPT0gcmF0aW5nLmlkX21hdGVyaWFsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkocGF0aWVudHNEYXRhW2ldW2pdW2tdLG51bGwsNCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXRpZW50c0RhdGFbaV0ubmVlZHNbal0ubWF0ZXJpYWxzW2tdWydyYXRpbmdzJ10gPSByYXRpbmc7ICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvL2NvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHBhdGllbnRzRGF0YSxudWxsLDQpKTtcclxuICAgICAgICB0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkudXBkYXRlRG9jdW1lbnQodGhpcy5wYXRpZW50c0RhdGFfaWQsIHtcclxuICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGF0YVwiLFxyXG4gICAgICAgICAgICBcImRhdGFcIjogcGF0aWVudHNEYXRhLFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgXHJcbiAgICAgICAgLy90aGlzLnNob3dEYXRhKFwiZGF0YVwiKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRNYXRlcmlhbFJhdGluZyhtYXRlcmlhbF9pZCkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0TmVlZE1hdGVyaWFscygpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnQSBkZXZvbHZlciB0b2RvcyBvcyBtYXRlcmlhaXMnKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmdldERvY3VtZW50KHRoaXMubWF0ZXJpYWxzX2lkKS5tYXRlcmlhbHM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGlzUGF0aWVudHNSZXF1ZXN0RG9uZSgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkEgdmVyaWZpY2FyIHNlIG8gcGVkaWRvIGFvIHNlcnZpZG9yIGrDoSBmb2kgZmVpdG9cIik7XHJcbiAgICAgICAgaWYodGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmdldERvY3VtZW50KHRoaXMuZ2xvYmFsRGF0YV9pZCkuZGF0YVJlcXVlc3QgPT0gXCJmYWxzZVwiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHNldFF1aXpzKGNhcmVnaXZlclF1ZXN0aW9uYWlyZXMpIHtcclxuICAgICAgICBpZighdGhpcy5pc1F1aXpzU2V0KCkpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2VudHJvdScpO1xyXG4gICAgICAgICAgICB0aGlzLnF1aXpzX2lkID0gdGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmNyZWF0ZURvY3VtZW50KHtcclxuICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInF1aXpcIixcclxuICAgICAgICAgICAgICAgIFwicXVpelwiOiBjYXJlZ2l2ZXJRdWVzdGlvbmFpcmVzXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdBUVVJISEhISEhISEhISEhISEnKVxyXG4gICAgICAgICAgICB2YXIgcXVpenMgPSB0aGlzLmdldFF1aXpzKCk7XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkocXVpenMsIG51bGwsIDQpKTtcclxuICAgICAgICAgICAgdmFyIHF1aXpzX2ZpbmFsID0gdGhpcy5nZXRRdWl6cygpO1xyXG4gICAgICAgICAgICB2YXIgY2FyZWdpdmVyUXVlc3Rpb25haXJlc19pZHMgPSBuZXcgQXJyYXkoKTtcclxuICAgICAgICAgICAgdmFyIHF1aXpzX2lkcyA9IG5ldyBBcnJheSgpO1xyXG4gICAgICAgICAgICB2YXIgcXVpenNfaWRzX3RvX2FkZF90b19CRCA9IG5ldyBBcnJheSgpO1xyXG4gICAgICAgICAgICB2YXIgcXVpenNfc2FtZV9pZCA9IG5ldyBBcnJheSgpO1xyXG4gICAgICAgICAgICB2YXIgZm91bmRfY29udHJvbDtcclxuICAgICAgICAgICAgdmFyIGluZGV4X2NvbnRyb2wgPSAtMTtcclxuXHJcbiAgICAgICAgICAgIGNhcmVnaXZlclF1ZXN0aW9uYWlyZXNfaWRzLnB1c2goY2FyZWdpdmVyUXVlc3Rpb25haXJlcy5tYXAoZnVuY3Rpb24ocXVlc3Rpb25uYWlyZSl7XHJcbiAgICAgICAgICAgICAgICB2YXIgcXVlc3QgPSB7fTtcclxuICAgICAgICAgICAgICAgIHF1ZXN0W3F1ZXN0aW9ubmFpcmUuaWRdID0gcXVlc3Rpb25uYWlyZS5yZWZlcmVuY2U7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcXVlc3Q7XHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnYXF1aScpO1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGNhcmVnaXZlclF1ZXN0aW9uYWlyZXNfaWRzLCBudWxsLCA0KSk7XHJcbiAgICAgICAgICAgIHF1aXpzX2lkcy5wdXNoKHF1aXpzLm1hcChmdW5jdGlvbihxdWVzdGlvbm5haXJlKXtyZXR1cm4gcXVlc3Rpb25uYWlyZS5pZH0pKTtcclxuICAgICAgICAgICAvL2NvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHF1aXpzX2lkcywgbnVsbCwgNCkpO1xyXG4gICAgICAgICAgIFxyXG4gICAgICAgICAgIC8vcGFyYSBjYWRhIHF1ZXN0w6NvIGRvIHF1ZXN0aW9uw6FyaW8gcmVtb3RvXHJcbiAgICAgICAgICAgY2FyZWdpdmVyUXVlc3Rpb25haXJlc19pZHNbMF0uZm9yRWFjaChxdWVzdGlvbm5haXJlX3NlcnZlcl9pZCA9PiB7XHJcbiAgICAgICAgICAgICAgICAvL0NvbnRyb2xvIHNlIGVuY29udHJvdSBtYXRjaCBhIGZhbHNlIGUgZGUgaW5kZXggZG8gcXVlc3Rpb27DoXJpbyBhIDBcclxuICAgICAgICAgICAgICAgZm91bmRfY29udHJvbCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICBpbmRleF9jb250cm9sKys7XHJcbiAgICAgICAgICAgICAgIC8vUGFyYSBjYWRhIHF1ZXN0aW9uw6FyaW8gZGEgQkRcclxuICAgICAgICAgICAgICAgcXVpenNfaWRzWzBdLmZvckVhY2gocXVlc3Rpb25uYWlyZV9CRF9pZCA9PiB7ICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAvL3NlIGVuY29udHJhciBtYXRjaFxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHF1ZXN0aW9ubmFpcmVfc2VydmVyX2lkLmlkID09IHF1ZXN0aW9ubmFpcmVfQkRfaWQuaWQgJiYgcXVlc3Rpb25uYWlyZV9zZXJ2ZXJfaWQucmVmZXJlbmNlID09IHF1ZXN0aW9ubmFpcmVfQkRfaWQucmVmZXJlbmNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vZW5jb250cm91XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvdW5kX2NvbnRyb2wgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL21ldGUgbnVtIGFycmF5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1aXpzX3NhbWVfaWQucHVzaChxdWVzdGlvbm5haXJlX3NlcnZlcl9pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAvL3NlIG4gZW5jb250cm91IG1hdGNoXHJcbiAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCd0ZXJtaW5vdSBmb3InKTtcclxuICAgICAgICAgICAgICAgaWYoIWZvdW5kX2NvbnRyb2wpIHtcclxuICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ0VOVFJPVScpO1xyXG4gICAgICAgICAgICAgICAgICAgLy9hZGljaW9uYS1vIGNvbW8gcXVpeiBhIGFjcmVzY2VudGFyIG5hIEJEXHJcbiAgICAgICAgICAgICAgICAgICBxdWl6c19pZHNfdG9fYWRkX3RvX0JELnB1c2gocXVlc3Rpb25uYWlyZV9zZXJ2ZXJfaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgcXVpenNfZmluYWwucHVzaChjYXJlZ2l2ZXJRdWVzdGlvbmFpcmVzW2luZGV4X2NvbnRyb2xdKTtcclxuICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgIC8vY29uc29sZS5sb2coJ0EgbW9zdHJhciBxdWl6cyBhIHNvYnJlcG9yJylcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShxdWl6c19maW5hbCwgbnVsbCwgNCkpO1xyXG4gICAgICAgICAgICB0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkudXBkYXRlRG9jdW1lbnQodGhpcy5xdWl6c19pZCwge1xyXG4gICAgICAgICAgICAgICAgJ3F1aXonIDogcXVpenNfZmluYWwsXHJcbiAgICAgICAgICAgICAgICAndHlwZScgOiAncXVpeidcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vY29uc29sZS5sb2coJ0EgbW9zdHJhciBCRC1RVUlaIScpXHJcbiAgICAgICAgLy90aGlzLnNob3dEYXRhKCdxdWl6Jyk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgY2hlY2tRdWVzdGlvbm5haXJlX3JlZmVyZW5jZShpZCkge1xyXG5cclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRBbGxRdWl6cygpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkEgb2J0ZXIgSUQgZG9zIHF1aXpzXCIpO1xyXG4gICAgICAgIGlmKHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5leGVjdXRlUXVlcnkoJ3F1aXonKS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkodGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmV4ZWN1dGVRdWVyeSgncXVpeicpLCBudWxsLCA0KSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZXhlY3V0ZVF1ZXJ5KCdxdWl6Jyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnNvbGUubG9nKCdwYXNzb3UgYXF1aScpO1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldExhdGVzdFF1aXpEYXRhKCkge1xyXG4gICAgICAgIHZhciBxdWl6cyA9IHRoaXMuZ2V0QWxsUXVpenMoKTtcclxuXHJcbiAgICAgICAgaWYocXVpenMpIHtcclxuICAgICAgICAgICAgdmFyIGxhc3RRdWl6O1xyXG5cclxuICAgICAgICAgICAgbGFzdFF1aXogPSBxdWl6c1txdWl6cy5sZW5ndGggLSAxXTtcclxuICAgICAgICAgICAgcmV0dXJuIGxhc3RRdWl6Ll9pZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2coJ3Bhc3NvdSBhcXVpLTEnKTtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRMYXRlc3RQYXRpZW50RGF0YSgpIHtcclxuICAgICAgICB2YXIgcGF0aWVudHNEYXRhID0gdGhpcy5nZXRBbGxQYXRpZW50c0RhdGEoKTtcclxuXHJcbiAgICAgICAgaWYocGF0aWVudHNEYXRhKSB7XHJcbiAgICAgICAgICAgIHZhciBsYXN0RGF0YTtcclxuXHJcbiAgICAgICAgICAgIGxhc3REYXRhID0gcGF0aWVudHNEYXRhW3BhdGllbnRzRGF0YS5sZW5ndGggLSAxXTtcclxuICAgICAgICAgICAgcmV0dXJuIGxhc3REYXRhLl9pZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0UXVpenMoKSB7XHJcbiAgICAgICAgaWYodGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmV4ZWN1dGVRdWVyeSgncXVpeicpLmxlbmd0aCA+IDApIHsgICAgICAgIFxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmdldERvY3VtZW50KHRoaXMucXVpenNfaWQpLnF1aXo7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGlzR2xvYmFsU2V0KCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiR0xPQkFMU0laRTogXCIgKyB0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZXhlY3V0ZVF1ZXJ5KCdnbG9iYWwnKS5sZW5ndGgpO1xyXG4gICAgICAgIGlmKHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5leGVjdXRlUXVlcnkoJ2dsb2JhbCcpLmxlbmd0aCA+IDApIHsgICAgICAgICAgICBcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRHbG9iYWxzSUQoKSB7XHJcbiAgICAgICAgaWYodGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmV4ZWN1dGVRdWVyeSgnZ2xvYmFsJykubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeSh0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZXhlY3V0ZVF1ZXJ5KFwiZ2xvYmFsXCIpLCBudWxsLCA0KSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmV4ZWN1dGVRdWVyeSgnZ2xvYmFsJylbMF0uX2lkO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRBbGxQYXRpZW50c0RhdGEoKSB7XHJcbiAgICAgICAgaWYodGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmV4ZWN1dGVRdWVyeShcImRhdGFcIikubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeSh0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZXhlY3V0ZVF1ZXJ5KFwiZGF0YVwiKSwgbnVsbCwgNCkpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmV4ZWN1dGVRdWVyeShcImRhdGFcIik7XHJcbiAgICAgICAgfSAgICAgICAgIFxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIHB1YmxpYyB1cGRhdGVRdWl6U3RhdHVzKHF1ZXN0aW9ubmFpcmUpIHsgICAgICAgIFxyXG4gICAgICAgIHZhciBxdWl6cyA9IHRoaXMuZ2V0UXVpenMoKTtcclxuICAgICAgICBpZihxdWl6cykge1xyXG4gICAgICAgICAgICBxdWl6cy5mb3JFYWNoKGVsZW1lbnRfcXVpeiA9PiB7XHJcbiAgICAgICAgICAgICAgIGlmKGVsZW1lbnRfcXVpei5yZWZfcXVlc3Rpb25uYWlyZSA9PSBxdWVzdGlvbm5haXJlLnJlZl9xdWVzdGlvbm5haXJlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudF9xdWl6LmRvbmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS51cGRhdGVEb2N1bWVudCh0aGlzLnF1aXpzX2lkLCB7XHJcbiAgICAgICAgICAgICAgICAncXVpeicgOiBxdWl6cyxcclxuICAgICAgICAgICAgICAgICd0eXBlJyA6ICdxdWl6J1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgLy90aGlzLnNob3dEYXRhKCdxdWl6Jyk7XHJcbiAgICAgICAgICAgIHRoaXMuY2hlY2tRdWl6U3RhdHVzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgY2hlY2tRdWl6U3RhdHVzKCkge1xyXG4gICAgICAgIHZhciBxdWl6cyA9IHRoaXMuZ2V0UXVpenMoKTtcclxuICAgICAgICBpZihxdWl6cykge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygncGFzc291IGFxdWktMicpO1xyXG4gICAgICAgICAgICB2YXIgcXVpel9kb25lID0gW107XHJcblxyXG4gICAgICAgICAgICBxdWl6X2RvbmUucHVzaChxdWl6cy5tYXAoZnVuY3Rpb24ocXVpenMpe3JldHVybiBxdWl6cy5kb25lfSkpO1xyXG4gICAgICAgICAgICBxdWl6X2RvbmVbMF0uZm9yRWFjaChxdWl6X3Jlc3VsdCA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkEgdmVyaWZpY2FyIGVzdGFkbyBkYXMgYXZhbGlhw6fDtWVzXCIpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJzE6ICcgKyBxdWl6X3Jlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGlmKHF1aXpfcmVzdWx0ID09ICdmYWxzZScpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkEgbXVkYXIgZXN0YWRvIGRhcyBhdmFsaWHDp8O1ZXNcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLnVwZGF0ZURvY3VtZW50KHRoaXMuZ2xvYmFsRGF0YV9pZCwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImV2YWx1YXRpb25zVG9Eb1wiIDogXCJ0cnVlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiIDogXCJnbG9iYWxcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJkYXRhUmVxdWVzdFwiIDogXCJ0cnVlXCJcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLnVwZGF0ZURvY3VtZW50KHRoaXMuZ2xvYmFsRGF0YV9pZCwge1xyXG4gICAgICAgICAgICAgICAgXCJldmFsdWF0aW9uc1RvRG9cIiA6IFwiZmFsc2VcIixcclxuICAgICAgICAgICAgICAgIFwidHlwZVwiIDogXCJnbG9iYWxcIixcclxuICAgICAgICAgICAgICAgIFwiZGF0YVJlcXVlc3RcIiA6IFwidHJ1ZVwiXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zb2xlLmxvZygncGFzc291IGFxdWkgLSAzJyk7ICAgXHJcbiAgICB9XHJcbiAgICBoYXNFdmFsdWF0aW9uc1RvRG8oKSB7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZygnR0xPQkFMIElEOiAnICsgdGhpcy5nbG9iYWxEYXRhX2lkKTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5nZXREb2N1bWVudCh0aGlzLmdsb2JhbERhdGFfaWQpLCBudWxsLCA0KSk7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZygnRXZhbHVhdGlvbnMgdG8gZG86JyArIHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5nZXREb2N1bWVudCh0aGlzLmdsb2JhbERhdGFfaWQpLmV2YWx1YXRpb25zVG9EbylcclxuICAgICAgICAvKlxyXG4gICAgICAgIGlmKHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5nZXREb2N1bWVudCh0aGlzLmdsb2JhbERhdGFfaWQpLmV2YWx1YXRpb25zVG9EbyA9PSBcInRydWVcIikge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICovXHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICBpc1F1aXpzU2V0KCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdRVUlaLUlEOiAnICsgdGhpcy5xdWl6c19pZCk7XHJcbiAgICAgICAgaWYodGhpcy5xdWl6c19pZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgZGVsZXRlUXVlc3Rpb25uYWlyZShxdWVzdGlvbm5haXJlKSB7XHJcbiAgICAgICAgLy9hcGFnYXIgbyBxdWVzdGlvbmFyaW8gcXVlIGZvaSBlbnZpYWRvIGRhIEJELiBOw6NvIMOpIHVyZ2VudGUgcHEgZGVwb2lzIGRlIGZlaXRvIGZpY2Egb2N1bHRvXHJcbiAgICB9XHJcbiAgICBhZGRRdWVzdGlvbm5haXJlVG9EQihxdWVzdGlvbm5haXJlKSB7XHJcbiAgICAgICAgaWYoIXRoaXMuaXNTZXRRdWl6c0RvbmUoKSkge1xyXG4gICAgICAgICAgICB0aGlzLnF1aXpzX2RvbmVfaWQgPSB0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuY3JlYXRlRG9jdW1lbnQoe1xyXG4gICAgICAgICAgICAgICAgJ3R5cGUnIDogJ3F1aXpzT25Ib2xkJyxcclxuICAgICAgICAgICAgICAgICdxdWVzdGlvbm5haXJlcycgOiBxdWVzdGlvbm5haXJlIFxyXG4gICAgICAgICAgICB9KTsgICAgICAgICAgICBcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB2YXIgcXVpenNPbkhvbGRfQkQgPSB0aGlzLmdldEFsbFF1aXpzT25Ib2xkKCk7XHJcbiAgICAgICAgICAgIHF1aXpzT25Ib2xkX0JELnB1c2gocXVlc3Rpb25uYWlyZSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnF1aXpzX2RvbmVfaWQgPSB0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkudXBkYXRlRG9jdW1lbnQoe1xyXG4gICAgICAgICAgICAgICAgJ3R5cGUnIDogJ3F1aXpzT25Ib2xkJyxcclxuICAgICAgICAgICAgICAgICdxdWVzdGlvbm5haXJlcycgOiBxdWl6c09uSG9sZF9CRCBcclxuICAgICAgICAgICAgfSk7IFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGlzU2V0UXVpenNEb25lKCkge1xyXG4gICAgICAgIGlmKHRoaXMucXVpenNfZG9uZV9pZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgZ2V0UXVpenNPbkhvbGRfSUQoKSB7XHJcbiAgICAgICAgaWYodGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmV4ZWN1dGVRdWVyeSgncXVpek9uSG9sZCcpLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeSh0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZXhlY3V0ZVF1ZXJ5KFwicXVpek9uSG9sZFwiKSwgbnVsbCwgNCkpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmV4ZWN1dGVRdWVyeSgncXVpek9uSG9sZCcpWzBdLl9pZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICBnZXRBbGxRdWl6c09uSG9sZCgpIHtcclxuICAgICAgICBpZih0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZXhlY3V0ZVF1ZXJ5KCdxdWl6T25Ib2xkJykubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5leGVjdXRlUXVlcnkoXCJxdWl6T25Ib2xkXCIpLCBudWxsLCA0KSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZXhlY3V0ZVF1ZXJ5KCdxdWl6T25Ib2xkJykucXVlc3Rpb25uYWlyZXM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG59Il19