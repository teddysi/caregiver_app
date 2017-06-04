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
        //this.deleteData('quiz');
        //this.deleteData('user');
        //this.deleteData('global');
        //this.showData('data'); //Esta a dar excepcao e a imprimir os users tb???!!!!! (por confirmar) pq n tem dados e estoira?? mas imprime o user pq?
        //this.showData('user');
        //this.showData('materials');
        //this.showData('quiz');
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
        this.database.getDatabase().updateDocument(this.globalData_id, {
            "dataRequest": "true"
        });
    };
    DataService.prototype.mediaPersistence = function (data) {
        /**
       * Abrir todo o conteúdo da pasta materials
       */
        var documents = fs.knownFolders.documents();
        var path = fs.path.join(documents.path, "app/materials");
        console.log(path);
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
                console.log('terminou for');
                if (!found_control) {
                    console.log('ENTROU');
                    //adiciona-o como quiz a acrescentar na BD
                    quizs_ids_to_add_to_BD.push(questionnaire_server_id);
                    quizs_final.push(caregiverQuestionaires[index_control]);
                }
            });
            console.log('A mostrar quizs a sobrepor');
            console.log(JSON.stringify(quizs_final, null, 4));
            this.database.getDatabase().updateDocument(this.quizs_id, {
                'quiz': quizs_final,
                'type': 'quiz'
            });
        }
        console.log('A mostrar BD-QUIZ!');
        this.showData('quiz');
    };
    DataService.prototype.checkQuestionnaire_reference = function (id) {
    };
    DataService.prototype.getAllQuizs = function () {
        console.log("A obter ID dos quizs");
        if (this.database.getDatabase().executeQuery('quiz').length > 0) {
            //console.log(JSON.stringify(this.database.getDatabase().executeQuery('quiz'), null, 4));
            return this.database.getDatabase().executeQuery('quiz');
        }
        return null;
    };
    DataService.prototype.getLatestQuizData = function () {
        var quizs = this.getAllQuizs();
        if (quizs) {
            var lastQuiz;
            lastQuiz = quizs[quizs.length - 1];
            console.log(lastQuiz);
            return lastQuiz._id;
        }
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
        console.log(this.quizs_id);
        return this.database.getDatabase().getDocument(this.quizs_id).quiz;
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
        if (this.database.getDatabase().executeQuery("data").length > 0) {
            // console.log(JSON.stringify(this.database.getDatabase().executeQuery("data"), null, 4));
            return this.database.getDatabase().executeQuery("data");
        }
        return false;
    };
    DataService.prototype.updateQuizStatus = function (questionnaire) {
        var quizs = this.getQuizs();
        quizs.forEach(function (element_quiz) {
            if (element_quiz.id == questionnaire.id) {
                //console.log('ENTROU');
                element_quiz.done = true;
            }
        });
        this.database.getDatabase().updateDocument(this.quizs_id, {
            'quiz': quizs,
            'type': 'quiz'
        });
        //this.showData('quiz');
        this.checkQuizStatus();
    };
    DataService.prototype.checkQuizStatus = function () {
        var _this = this;
        var quizs = this.getQuizs();
        var quiz_done = [];
        quiz_done.push(quizs.map(function (quizs) { return quizs.done; }));
        quiz_done[0].forEach(function (quiz_result) {
            if (quiz_result == 'false') {
                _this.database.getDatabase().updateDocument(_this.globalData_id, {
                    "evaluationsToDo": "true"
                });
            }
        });
    };
    DataService.prototype.hasEvaluationsToDo = function () {
        /*
        console.log('Evaluations to do:' + this.database.getDatabase().getDocument(this.globalData_id).evaluationsToDo)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGF0YS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxnQ0FBa0M7QUFDbEMsaUNBQStCO0FBSS9CLHNDQUEyQztBQU0zQyx1Q0FBc0M7QUFLdEMsSUFBYSxXQUFXO0lBaUJwQixxQkFBbUIsUUFBa0I7UUFBbEIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUM3QixPQUFPLENBQUMsR0FBRyxDQUFDLDJCQUEyQixDQUFDLENBQUM7UUFDekMscUNBQXFDO1FBQ3JDLDBCQUEwQjtRQUMxQiwwQkFBMEI7UUFDMUIsNEJBQTRCO1FBQzVCLGlKQUFpSjtRQUNqSix3QkFBd0I7UUFDeEIsNkJBQTZCO1FBQzdCLHdCQUF3QjtRQUN4QixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDWiwwQkFBMEI7UUFFMUIsRUFBRTtJQUVWLENBQUM7SUFFRCw4QkFBUSxHQUFSO1FBQ0ksT0FBTyxDQUFDLEdBQUcsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFDRCwwQkFBSSxHQUFKO1FBQ0ksT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFDO1FBQ2xELDBDQUEwQztRQUMxQyxLQUFLO1FBRUwsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNwQixPQUFPLENBQUMsR0FBRyxDQUFDLCtCQUErQixDQUFDLENBQUM7WUFDN0MsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7WUFDekMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRTtnQkFDM0QsYUFBYSxFQUFFLE9BQU87YUFDekIsQ0FBQyxDQUFDO1lBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUU3QixDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixPQUFPLENBQUMsR0FBRyxDQUFDLDBDQUEwQyxDQUFDLENBQUM7WUFDeEQsOEVBQThFO1lBQzlFLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxjQUFjLENBQUM7Z0JBQzVELE1BQU0sRUFBRSxRQUFRO2dCQUNoQixhQUFhLEVBQUUsT0FBTztnQkFDdEIsaUJBQWlCLEVBQUcsT0FBTzthQUM5QixDQUFDLENBQUM7UUFDUCxDQUFDO1FBRUQsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztRQUM5QyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1FBQ25ELElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDekMsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUU5Qyw4Q0FBOEM7UUFDOUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBRTNCLENBQUM7SUFDRCwwQkFBSSxHQUFKO1FBQ0k7Ozs7OztjQU1NO0lBQ1YsQ0FBQztJQUVELDZCQUFPLEdBQVAsVUFBUSxjQUFjO1FBQ2xCLE9BQU8sQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUMsQ0FBQztRQUNyQyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUMsY0FBYyxDQUFDO1lBQzFELE1BQU0sRUFBRSxNQUFNO1lBQ2QsTUFBTSxFQUFFLGNBQWM7U0FDekIsQ0FBQyxDQUFDO1FBQ0gseUdBQXlHO0lBQzdHLENBQUM7SUFDRCxpQ0FBVyxHQUFYO0lBRUEsQ0FBQztJQUNELGtDQUFZLEdBQVo7SUFFQSxDQUFDO0lBQ0QscUNBQWUsR0FBZjtRQUNJLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUNBQWlDLENBQUMsQ0FBQztRQUMvQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUM5RSxDQUFDO0lBQ0QscUNBQWUsR0FBZixVQUFnQixJQUFJO1FBQ2hCLE9BQU87UUFDUCwwQkFBMEI7UUFDMUIsK0JBQStCO1FBRS9CLHNDQUFzQztRQUN0QyxFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztZQUN0QixPQUFPLENBQUMsR0FBRyxDQUFDLHFEQUFxRCxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUMxRixJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFO2dCQUM3RCxNQUFNLEVBQUUsSUFBSTthQUNmLENBQUMsQ0FBQztRQUNQLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsd0JBQXdCLENBQUMsQ0FBQztZQUN0QyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUMsY0FBYyxDQUFDO2dCQUM5RCxNQUFNLEVBQUUsTUFBTTtnQkFDZCxNQUFNLEVBQUUsSUFBSTthQUNmLENBQUMsQ0FBQztRQUNQLENBQUM7UUFFRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFHNUIsNEJBQTRCO1FBQzVCLCtCQUErQjtRQUUvQixJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQzNELGFBQWEsRUFBRSxNQUFNO1NBQ3hCLENBQUMsQ0FBQztJQUNQLENBQUM7SUFDRCxzQ0FBZ0IsR0FBaEIsVUFBaUIsSUFBSTtRQUNmOztTQUVDO1FBQ0gsSUFBSSxTQUFTLEdBQUcsRUFBRSxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUM1QyxJQUFJLElBQUksR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLGVBQWUsQ0FBQyxDQUFDO1FBRXpELE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdEIsQ0FBQztJQUVELDhCQUFRLEdBQVI7SUFFQSxDQUFDO0lBQ0QsOEJBQVEsR0FBUjtRQUNJLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUNoQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUM7SUFDMUYsQ0FBQztJQUNELCtCQUFTLEdBQVQ7UUFDSSxPQUFPLENBQUMsR0FBRyxDQUFDLHlCQUF5QixDQUFDLENBQUM7UUFDdkMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO0lBQzdFLENBQUM7SUFDRCw2Q0FBdUIsR0FBdkI7UUFDSSxPQUFPLENBQUMsR0FBRyxDQUFDLHdDQUF3QyxDQUFDLENBQUE7UUFDckQsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBRS9CLEVBQUUsQ0FBQSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDUCxJQUFJLFFBQVEsQ0FBQztZQUNiLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ2xCLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLElBQUksT0FBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLFVBQVUsQ0FBQyxDQUFDLENBQUM7b0JBQ3RELFFBQVEsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3BCLEtBQUssQ0FBQztnQkFDVixDQUFDO1lBQ0wsQ0FBQztZQUNELE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO1FBQ3pCLENBQUM7UUFDRCxNQUFNLENBQUMsS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFDTSxnQ0FBVSxHQUFqQixVQUFrQixJQUFJO1FBQ2xCLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQy9ELE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxDQUFDO1FBQ3BDLDBCQUEwQjtRQUMxQixFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMzRCxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztnQkFDeEMsdUJBQXVCO2dCQUN2QiwrREFBK0Q7Z0JBQy9ELElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNqRSxDQUFDO1FBQ0wsQ0FBQztJQUNMLENBQUM7SUFDTSxpQ0FBVyxHQUFsQjtRQUNJLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzdELE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM1RCxDQUFDO1FBQ0QsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBQ00sOEJBQVEsR0FBZixVQUFnQixJQUFJO1FBQ2hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxHQUFHLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLEdBQUcsWUFBWSxDQUFDLENBQUM7UUFDdEgsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDM0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3pGLENBQUM7SUFDTCxDQUFDO0lBQ08sa0NBQVksR0FBbkI7UUFDRyx3QkFBd0I7UUFDeEIsSUFBSSxTQUFTLEdBQUcsRUFBRSxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUM1QyxJQUFJLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsSUFBSSxZQUFZLENBQUMsQ0FBQztRQUNuRSxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxVQUFVLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQztRQUd4RTs7Ozs7Ozs7Ozs7Ozs7VUFjRTtJQUNOLENBQUM7SUFDTSx5Q0FBbUIsR0FBMUI7UUFDSSxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFFL0IsRUFBRSxDQUFBLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNQLElBQUksUUFBUSxDQUFDO1lBQ2IsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDbEIsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsSUFBSSxPQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssVUFBVSxDQUFDLENBQUMsQ0FBQztvQkFDdEQsUUFBUSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDcEIsS0FBSyxDQUFDO2dCQUNWLENBQUM7WUFDTCxDQUFDO1lBQ0QsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUM7UUFDeEIsQ0FBQztRQUNELE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUNNLGdDQUFVLEdBQWpCO1FBQ0ksT0FBTyxDQUFDLEdBQUcsQ0FBQyx3Q0FBd0MsQ0FBQyxDQUFDO1FBQ3RELEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQ2xCLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDaEIsQ0FBQztRQUNELE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUNELGlDQUFpQztJQUMxQiwrQkFBUyxHQUFoQixVQUFpQixNQUFNO1FBQ25CLE9BQU8sQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUMsQ0FBQztRQUNuQyxxQ0FBcUM7UUFDckMsd0JBQXdCO1FBQ3hCLDJEQUEyRDtRQUMzRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs4Q0FtQnNDO1FBQ3RDLG1DQUFtQztRQUNuQyx5R0FBeUc7UUFDekcsSUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUN0RiwrQkFBK0I7UUFDL0I7Ozs7Ozs7OztVQVNFO1FBQ0YsR0FBRyxDQUFBLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxZQUFZLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDMUMsR0FBRyxDQUFBLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO2dCQUNuRCxHQUFHLENBQUEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO29CQUVoRSxFQUFFLENBQUEsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7d0JBQ2hFLDREQUE0RDt3QkFDNUQsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsTUFBTSxDQUFDO29CQUM5RCxDQUFDO2dCQUNMLENBQUM7WUFDTCxDQUFDO1FBQ0wsQ0FBQztRQUNELG1EQUFtRDtRQUNuRCxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFO1lBQzdELE1BQU0sRUFBRSxNQUFNO1lBQ2QsTUFBTSxFQUFFLFlBQVk7U0FDdkIsQ0FBQyxDQUFBO1FBRUYsd0JBQXdCO0lBQzVCLENBQUM7SUFDTSx1Q0FBaUIsR0FBeEIsVUFBeUIsV0FBVztJQUVwQyxDQUFDO0lBRU0sc0NBQWdCLEdBQXZCO1FBQ0ksT0FBTyxDQUFDLEdBQUcsQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO1FBQzdDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsU0FBUyxDQUFDO0lBQ2hGLENBQUM7SUFFTSwyQ0FBcUIsR0FBNUI7UUFDSSxPQUFPLENBQUMsR0FBRyxDQUFDLGtEQUFrRCxDQUFDLENBQUM7UUFDaEUsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLFdBQVcsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ3BGLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDakIsQ0FBQztRQUNBLE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDakIsQ0FBQztJQUNNLDhCQUFRLEdBQWYsVUFBZ0Isc0JBQXNCO1FBQ2xDLEVBQUUsQ0FBQSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNwQixPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3RCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxjQUFjLENBQUM7Z0JBQ3ZELE1BQU0sRUFBRSxNQUFNO2dCQUNkLE1BQU0sRUFBRSxzQkFBc0I7YUFDakMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFBO1lBQ2pDLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUM1Qiw4Q0FBOEM7WUFDOUMsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ2xDLElBQUksMEJBQTBCLEdBQUcsSUFBSSxLQUFLLEVBQUUsQ0FBQztZQUM3QyxJQUFJLFNBQVMsR0FBRyxJQUFJLEtBQUssRUFBRSxDQUFDO1lBQzVCLElBQUksc0JBQXNCLEdBQUcsSUFBSSxLQUFLLEVBQUUsQ0FBQztZQUN6QyxJQUFJLGFBQWEsR0FBRyxJQUFJLEtBQUssRUFBRSxDQUFDO1lBQ2hDLElBQUksYUFBYSxDQUFDO1lBQ2xCLElBQUksYUFBYSxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBRXZCLDBCQUEwQixDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxHQUFHLENBQUMsVUFBUyxhQUFhO2dCQUM3RSxJQUFJLEtBQUssR0FBRyxFQUFFLENBQUM7Z0JBQ2YsS0FBSyxDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUMsR0FBRyxhQUFhLENBQUMsU0FBUyxDQUFDO2dCQUNsRCxNQUFNLENBQUMsS0FBSyxDQUFDO1lBQ2pCLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDSixzQkFBc0I7WUFDdEIsbUVBQW1FO1lBQ25FLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxVQUFTLGFBQWEsSUFBRSxNQUFNLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQSxDQUFBLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDN0Usa0RBQWtEO1lBRWxELDBDQUEwQztZQUMxQywwQkFBMEIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQSx1QkFBdUI7Z0JBQ3hELG9FQUFvRTtnQkFDckUsYUFBYSxHQUFHLEtBQUssQ0FBQztnQkFDdEIsYUFBYSxFQUFFLENBQUM7Z0JBQ2hCLDhCQUE4QjtnQkFDOUIsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFBLG1CQUFtQjtvQkFDbkMsb0JBQW9CO29CQUNwQixFQUFFLENBQUEsQ0FBQyx1QkFBdUIsQ0FBQyxFQUFFLElBQUksbUJBQW1CLENBQUMsRUFBRSxJQUFJLHVCQUF1QixDQUFDLFNBQVMsSUFBSSxtQkFBbUIsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO3dCQUM1SCxXQUFXO3dCQUNYLGFBQWEsR0FBRyxJQUFJLENBQUM7d0JBQ3JCLGdCQUFnQjt3QkFDaEIsYUFBYSxDQUFDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO3dCQUM1QyxNQUFNLENBQUM7b0JBQ1gsQ0FBQztnQkFDTixDQUFDLENBQUMsQ0FBQztnQkFDSCxzQkFBc0I7Z0JBQ3JCLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUM7Z0JBQzdCLEVBQUUsQ0FBQSxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztvQkFDaEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztvQkFDdEIsMENBQTBDO29CQUMxQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsQ0FBQztvQkFDckQsV0FBVyxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO2dCQUM1RCxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7WUFDSCxPQUFPLENBQUMsR0FBRyxDQUFDLDRCQUE0QixDQUFDLENBQUE7WUFDeEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNsRCxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUN0RCxNQUFNLEVBQUcsV0FBVztnQkFDcEIsTUFBTSxFQUFHLE1BQU07YUFDbEIsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztRQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsQ0FBQTtRQUNqQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUFDTSxrREFBNEIsR0FBbkMsVUFBb0MsRUFBRTtJQUV0QyxDQUFDO0lBQ00saUNBQVcsR0FBbEI7UUFDSSxPQUFPLENBQUMsR0FBRyxDQUFDLHNCQUFzQixDQUFDLENBQUM7UUFDbkMsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDN0QseUZBQXlGO1lBQ3pGLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM1RCxDQUFDO1FBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNqQixDQUFDO0lBQ00sdUNBQWlCLEdBQXhCO1FBQ0ksSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBRS9CLEVBQUUsQ0FBQSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDUCxJQUFJLFFBQVEsQ0FBQztZQUViLFFBQVEsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNuQyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3RCLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDO1FBQ3hCLENBQUM7UUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFDTSwwQ0FBb0IsR0FBM0I7UUFDSSxJQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUU3QyxFQUFFLENBQUEsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1lBQ2QsSUFBSSxRQUFRLENBQUM7WUFFYixRQUFRLEdBQUcsWUFBWSxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDakQsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUM7UUFDeEIsQ0FBQztRQUNELE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUNNLDhCQUFRLEdBQWY7UUFDSSxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMzQixNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUN2RSxDQUFDO0lBQ00saUNBQVcsR0FBbEI7UUFDSSxFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMvRCxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2hCLENBQUM7UUFDRCxNQUFNLENBQUMsS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFDTSxrQ0FBWSxHQUFuQjtRQUNJLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQy9ELE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUV6RixNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQ3JFLENBQUM7UUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFDTSx3Q0FBa0IsR0FBekI7UUFDSSxFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUU5RCwwRkFBMEY7WUFDekYsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzVELENBQUM7UUFDRCxNQUFNLENBQUMsS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFDTSxzQ0FBZ0IsR0FBdkIsVUFBd0IsYUFBYTtRQUNqQyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFFNUIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFBLFlBQVk7WUFDdEIsRUFBRSxDQUFBLENBQUMsWUFBWSxDQUFDLEVBQUUsSUFBSSxhQUFhLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDckMsd0JBQXdCO2dCQUN4QixZQUFZLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztZQUM3QixDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ3RELE1BQU0sRUFBRyxLQUFLO1lBQ2QsTUFBTSxFQUFHLE1BQU07U0FDbEIsQ0FBQyxDQUFDO1FBQ0gsd0JBQXdCO1FBQ3hCLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBQ0QscUNBQWUsR0FBZjtRQUFBLGlCQVlDO1FBWEcsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQzVCLElBQUksU0FBUyxHQUFHLEVBQUUsQ0FBQztRQUVuQixTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsVUFBUyxLQUFLLElBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUEsQ0FBQSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzlELFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQSxXQUFXO1lBQzVCLEVBQUUsQ0FBQSxDQUFDLFdBQVcsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUN4QixLQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDLGNBQWMsQ0FBQyxLQUFJLENBQUMsYUFBYSxFQUFFO29CQUMzRCxpQkFBaUIsRUFBRyxNQUFNO2lCQUM3QixDQUFDLENBQUM7WUFDUCxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBQ0Qsd0NBQWtCLEdBQWxCO1FBQ0k7Ozs7OztVQU1FO1FBQ0YsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNoQixDQUFDO0lBQ0QsZ0NBQVUsR0FBVjtRQUNJLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN6QyxFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNmLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDaEIsQ0FBQztRQUNELE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUNELHlDQUFtQixHQUFuQixVQUFvQixhQUFhO1FBQzdCLDJGQUEyRjtJQUMvRixDQUFDO0lBQ0QsMENBQW9CLEdBQXBCLFVBQXFCLGFBQWE7UUFDOUIsRUFBRSxDQUFBLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxjQUFjLENBQUM7Z0JBQzVELE1BQU0sRUFBRyxhQUFhO2dCQUN0QixnQkFBZ0IsRUFBRyxhQUFhO2FBQ25DLENBQUMsQ0FBQztRQUNQLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLElBQUksY0FBYyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1lBQzlDLGNBQWMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7WUFFbkMsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDLGNBQWMsQ0FBQztnQkFDNUQsTUFBTSxFQUFHLGFBQWE7Z0JBQ3RCLGdCQUFnQixFQUFHLGNBQWM7YUFDcEMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztJQUNMLENBQUM7SUFDRCxvQ0FBYyxHQUFkO1FBQ0ksRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7WUFDcEIsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNoQixDQUFDO1FBQ0QsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBQ0QsdUNBQWlCLEdBQWpCO1FBQ0ksRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbkUsK0ZBQStGO1lBQy9GLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFDekUsQ0FBQztRQUNELE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUNELHVDQUFpQixHQUFqQjtRQUNJLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ25FLCtGQUErRjtZQUMvRixNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLENBQUMsY0FBYyxDQUFDO1FBQ2pGLENBQUM7UUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFDTCxrQkFBQztBQUFELENBQUMsQUFyZ0JELElBcWdCQztBQXJnQlksV0FBVztJQUR2QixpQkFBVSxFQUFFO3FDQWtCb0IsbUJBQVE7R0FqQjVCLFdBQVcsQ0FxZ0J2QjtBQXJnQlksa0NBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBmcyBmcm9tIFwiZmlsZS1zeXN0ZW1cIjtcclxuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci9tYXAnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcclxuaW1wb3J0IHsgQ29ubmVjdG9yU2VydmljZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9jb25uZWN0b3IvY29ubmVjdG9yLnNlcnZpY2UnO1xyXG5cclxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IE1hdGVyaWFscyB9IGZyb20gXCIuL21hdGVyaWFsc1wiO1xyXG5pbXBvcnQgeyBEYXRhIH0gZnJvbSBcIi4vZGF0YVwiO1xyXG5pbXBvcnQgeyBOZWVkcyB9IGZyb20gXCIuL25lZWRzXCI7XHJcbmltcG9ydCB7IFBhdGllbnQgfSBmcm9tIFwiLi4vLi4vcGF0aWVudC9wYXRpZW50XCI7XHJcbmltcG9ydCB7IENvdWNoYmFzZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtY291Y2hiYXNlXCI7XHJcbmltcG9ydCB7IERhdGFiYXNlIH0gZnJvbSBcIi4vZGF0YWJhc2VcIjtcclxuaW1wb3J0IHsgVXNlclNlcnZpY2UgfSBmcm9tICcuLi91c2VyL3VzZXIuc2VydmljZSc7XHJcblxyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgRGF0YVNlcnZpY2Uge1xyXG5cclxuICAgIHB1YmxpYyBwYXRpZW50c0RhdGFfaWQ6IGFueTtcclxuICAgIHB1YmxpYyB1c2VyRGF0YV9pZDogYW55O1xyXG4gICAgcHVibGljIG1hdGVyaWFsc19pZDogYW55O1xyXG4gICAgcHVibGljIHJhdGluZ3NfaWQ6IGFueTtcclxuICAgIHB1YmxpYyBnbG9iYWxEYXRhX2lkOiBhbnk7XHJcbiAgICBwdWJsaWMgcXVpenNfaWQ6IGFueTtcclxuICAgIHB1YmxpYyBxdWl6c19kb25lX2lkOiBhbnk7XHJcblxyXG4gICAgcHVibGljIFJlcXVlc3REYXRhX2NvbnRyb2w6IGFueTtcclxuXHJcbiAgICBwdWJsaWMgZmlsZTogZnMuRmlsZTtcclxuICAgIHB1YmxpYyBmb2xkZXI6IGZzLkZvbGRlcjtcclxuICAgIHB1YmxpYyBmb2xkZXJOYW1lOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgZmlsZU5hbWU6IHN0cmluZztcclxuIFxyXG4gICAgY29uc3RydWN0b3IocHVibGljIGRhdGFiYXNlOiBEYXRhYmFzZSl7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdJbnN0YW5jaW91IC0gRGF0YVNlcnZpY2UhJyk7XHJcbiAgICAgICAgICAgIC8vdGhpcy5kYXRhID0gZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKTtcclxuICAgICAgICAgICAgLy90aGlzLmRlbGV0ZURhdGEoJ3F1aXonKTtcclxuICAgICAgICAgICAgLy90aGlzLmRlbGV0ZURhdGEoJ3VzZXInKTtcclxuICAgICAgICAgICAgLy90aGlzLmRlbGV0ZURhdGEoJ2dsb2JhbCcpO1xyXG4gICAgICAgICAgICAvL3RoaXMuc2hvd0RhdGEoJ2RhdGEnKTsgLy9Fc3RhIGEgZGFyIGV4Y2VwY2FvIGUgYSBpbXByaW1pciBvcyB1c2VycyB0Yj8/PyEhISEhIChwb3IgY29uZmlybWFyKSBwcSBuIHRlbSBkYWRvcyBlIGVzdG9pcmE/PyBtYXMgaW1wcmltZSBvIHVzZXIgcHE/XHJcbiAgICAgICAgICAgIC8vdGhpcy5zaG93RGF0YSgndXNlcicpO1xyXG4gICAgICAgICAgICAvL3RoaXMuc2hvd0RhdGEoJ21hdGVyaWFscycpO1xyXG4gICAgICAgICAgICAvL3RoaXMuc2hvd0RhdGEoJ3F1aXonKTtcclxuICAgICAgICAgICAgdGhpcy5pbml0KCk7XHJcbiAgICAgICAgICAgIC8vdGhpcy5zaG93RGF0YSgnZ2xvYmFsJyk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvL1xyXG4gICAgICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkNvcnJldSBvIElOSVQgZG8gREFUQVNFUlZJQ0VcIik7IFxyXG4gICAgfVxyXG4gICAgaW5pdCgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnQSBpbmljaWFsaXphciBhcyB2YXJpw6F2ZWlzIGdsb2JhaXMnKTtcclxuICAgICAgICAvL0FkaWNpb25hciBudW1lcm8gZGUgYXZhbGlhw6fDtWVzIHBlbmRlbnRlc1xyXG4gICAgICAgIC8vLi4uXHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYodGhpcy5pc0dsb2JhbFNldCgpKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdBIGF0dWFsaXphciBnbG9iYWwgZGUgY29uZXhhbycpOyBcclxuICAgICAgICAgICAgdGhpcy5nbG9iYWxEYXRhX2lkID0gdGhpcy5nZXRHbG9iYWxzSUQoKTtcclxuICAgICAgICAgICAgdGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLnVwZGF0ZURvY3VtZW50KHRoaXMuZ2xvYmFsRGF0YV9pZCwge1xyXG4gICAgICAgICAgICAgICAgXCJkYXRhUmVxdWVzdFwiOiBcImZhbHNlXCJcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdBdHVhbGl6b3UnKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ0EgY3JpYXIgb2JqZXRvIHBhcmEgYXMgdmFyacOhdmVpcyBnbG9iYWlzJyk7XHJcbiAgICAgICAgICAgIC8vY3JpYXIgdmFyacOhdmVsIGdsb2JhbCBib29sZWFuIHBhcmEgZGl6ZXIgc2UgaMOhIHF1aXplcyBwYXJhIGZhemVyIHVwZGF0ZSBvdSBuXHJcbiAgICAgICAgICAgIHRoaXMuZ2xvYmFsRGF0YV9pZCA9IHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5jcmVhdGVEb2N1bWVudCh7XHJcbiAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJnbG9iYWxcIixcclxuICAgICAgICAgICAgICAgIFwiZGF0YVJlcXVlc3RcIjogXCJmYWxzZVwiLFxyXG4gICAgICAgICAgICAgICAgXCJldmFsdWF0aW9uc1RvRG9cIiA6IFwiZmFsc2VcIlxyXG4gICAgICAgICAgICB9KTsgICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnVzZXJEYXRhX2lkID0gdGhpcy5nZXRDdXJyZW50VXNlckRvY0lEKCk7XHJcbiAgICAgICAgdGhpcy5wYXRpZW50c0RhdGFfaWQgPSB0aGlzLmdldExhdGVzdFBhdGllbnREYXRhKCk7XHJcbiAgICAgICAgdGhpcy5xdWl6c19pZCA9IHRoaXMuZ2V0TGF0ZXN0UXVpekRhdGEoKTtcclxuICAgICAgICB0aGlzLnF1aXpzX2RvbmVfaWQgPSB0aGlzLmdldFF1aXpzT25Ib2xkX0lEKCk7XHJcblxyXG4gICAgICAgIC8vdmVyaWZpY2FyIHNlIGjDoSBxdWVzdGlvbsOhcmlvcyBwYXJhIHByZWVuY2hlclxyXG4gICAgICAgIHRoaXMuY2hlY2tRdWl6U3RhdHVzKCk7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbiAgICBzeW5jKCkge1xyXG4gICAgICAgIC8qXHJcbiAgICAgICAgdGhpcy5jb25uZWN0b3JTZXJ2aWNlLmdldFBhdGllbnRzKClcclxuICAgICAgICAgICAgLnN1YnNjcmliZShcclxuICAgICAgICAgICAgKHJlc3VsdCkgPT4gdGhpcy5vbkdldERhdGFTdWNjZXNzKHJlc3VsdCksXHJcbiAgICAgICAgICAgIChlcnJvcikgPT4gdGhpcy5vbkdldERhdGFFcnJvcihlcnJvcilcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgKi9cclxuICAgIH1cclxuIFxyXG4gICAgc2V0VXNlcihyZWdpc3RlcmVkVXNlcikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdBIGdyYXZhciBvIHV0aWxpemFkb3InKTtcclxuICAgICAgICB0aGlzLnVzZXJEYXRhX2lkID0gdGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmNyZWF0ZURvY3VtZW50KHtcclxuICAgICAgICAgICAgXCJ0eXBlXCI6IFwidXNlclwiLFxyXG4gICAgICAgICAgICBcInVzZXJcIjogcmVnaXN0ZXJlZFVzZXJcclxuICAgICAgICB9KTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKFwiQVFVSVwiK0pTT04uc3RyaW5naWZ5KHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5nZXREb2N1bWVudCh0aGlzLnVzZXJEYXRhX2lkLCBudWxsLCA0KSkpO1xyXG4gICAgfVxyXG4gICAgc2V0UGF0aWVudHMoKSB7XHJcblxyXG4gICAgfVxyXG4gICAgc2V0TWF0ZXJpYWxzKCkge1xyXG5cclxuICAgIH1cclxuICAgIGdldFBhdGllbnRzRGF0YSgpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdBIGRldm9sdmVyIHRvZG9zIG9zIGRhZG9zIGRhIEJEJyk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5nZXREb2N1bWVudCh0aGlzLnBhdGllbnRzRGF0YV9pZCkuZGF0YTtcclxuICAgIH1cclxuICAgIHNldFBhdGllbnRzRGF0YShkYXRhKSB7XHJcbiAgICAgICAgLy9kZWJ1Z1xyXG4gICAgICAgIC8vdGhpcy5kZWxldGVEYXRhKCdkYXRhJyk7XHJcbiAgICAgICAgLy90aGlzLmRlbGV0ZURhdGEoJ21hdGVyaWFscycpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vVG9kb3Mgb3MgZGFkb3MgZG8gcGFjaWVudGUgZSByZWYgX2lkXHJcbiAgICAgICAgaWYodGhpcy5wYXRpZW50c0RhdGFfaWQpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ0EgYXR1YWxpemFyIG9zIGRhZG9zIGRvcyBwYWNpZW50ZXMgbmEgYmQsIGNvbSBvIGlkICcgKyB0aGlzLnBhdGllbnRzRGF0YV9pZCk7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS51cGRhdGVEb2N1bWVudCh0aGlzLnBhdGllbnRzRGF0YV9pZCwge1xyXG4gICAgICAgICAgICAgICAgXCJkYXRhXCI6IGRhdGFcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ0dyYXZhciBkYWRvcyBQYWNpZW50ZXMnKTtcclxuICAgICAgICAgICAgdGhpcy5wYXRpZW50c0RhdGFfaWQgPSB0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuY3JlYXRlRG9jdW1lbnQoe1xyXG4gICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGF0YVwiLFxyXG4gICAgICAgICAgICAgICAgXCJkYXRhXCI6IGRhdGFcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLm1lZGlhUGVyc2lzdGVuY2UoZGF0YSk7XHJcbiAgICAgICAgXHJcblxyXG4gICAgICAgIC8vR3VhcmRhIGRhZG9zIGRvcyBQYWNpZW50ZXNcclxuICAgICAgICAvL0d1YXJkYSBkYWRvcyBkYXMgbmVjZXNzaWRhZGVzXHJcblxyXG4gICAgICAgIHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS51cGRhdGVEb2N1bWVudCh0aGlzLmdsb2JhbERhdGFfaWQsIHtcclxuICAgICAgICAgICAgXCJkYXRhUmVxdWVzdFwiOiBcInRydWVcIlxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgbWVkaWFQZXJzaXN0ZW5jZShkYXRhKSB7XHJcbiAgICAgICAgICAvKipcclxuICAgICAgICAgKiBBYnJpciB0b2RvIG8gY29udGXDumRvIGRhIHBhc3RhIG1hdGVyaWFsc1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHZhciBkb2N1bWVudHMgPSBmcy5rbm93bkZvbGRlcnMuZG9jdW1lbnRzKCk7XHJcbiAgICAgICAgdmFyIHBhdGggPSBmcy5wYXRoLmpvaW4oZG9jdW1lbnRzLnBhdGgsIFwiYXBwL21hdGVyaWFsc1wiKTtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2cocGF0aCk7XHJcbiAgICB9XHJcbiAgXHJcbiAgICBzZXROZWVkcygpIHtcclxuXHJcbiAgICB9XHJcbiAgICBnZXRUb2tlbigpOiBzdHJpbmcge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdBIGRldm9sdmVyIHRva2VuJyk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5nZXREb2N1bWVudCh0aGlzLnVzZXJEYXRhX2lkKS51c2VyLmNhcmVnaXZlcl90b2tlbjtcclxuICAgIH1cclxuICAgIGdldFVzZXJJRCgpOiBzdHJpbmcge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdBIGRldm9sdmVyIG8gSUQgZG8gdXNlcicpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZ2V0RG9jdW1lbnQodGhpcy51c2VyRGF0YV9pZCkudXNlci5pZDtcclxuICAgIH1cclxuICAgIGdldExhdGVzdFVzZXJUb1JlZ2lzdGVyKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiQSBkZXZvbHZlciB1bHRpbW8gdXRpbGl6YWRvciByZWdpc3RhZG9cIilcclxuICAgICAgICB2YXIgdXNlcnMgPSB0aGlzLmdldEFsbFVzZXJzKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYodXNlcnMpIHtcclxuICAgICAgICAgICAgdmFyIGxhc3RVc2VyO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpIGluIHVzZXJzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodXNlcnMuaGFzT3duUHJvcGVydHkoaSkgJiYgdHlwZW9mKGkpICE9PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGFzdFVzZXIgPSB1c2Vyc1tpXTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gbGFzdFVzZXIudXNlcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGRlbGV0ZURhdGEodmlldykge1xyXG4gICAgICAgIGxldCBkb2N1bWVudHMgPSB0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZXhlY3V0ZVF1ZXJ5KHZpZXcpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdBIGFwYWdhciBiZDogJyArIHZpZXcpO1xyXG4gICAgICAgIC8vIGxvb3Agb3ZlciBhbGwgZG9jdW1lbnRzXHJcbiAgICAgICAgaWYodGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmV4ZWN1dGVRdWVyeSh2aWV3KS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZG9jdW1lbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBkZWxldGUgZWFjaCBkb2N1bWVudFxyXG4gICAgICAgICAgICAgICAgLy8gY291Y2hiYXNlIHdpbGwgYXNzaWduIGFuIGlkIChfaWQpIHRvIGEgZG9jdW1lbnQgd2hlbiBjcmVhdGVkXHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZGVsZXRlRG9jdW1lbnQoZG9jdW1lbnRzW2ldLl9pZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0QWxsVXNlcnMoKXtcclxuICAgICAgICBpZih0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZXhlY3V0ZVF1ZXJ5KFwidXNlclwiKS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZXhlY3V0ZVF1ZXJ5KFwidXNlclwiKTtcclxuICAgICAgICB9ICAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHNob3dEYXRhKHZpZXcpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnQSBtb3N0cmFyIGJkOiAnICsgdmlldyArICcgY29tICcgKyB0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZXhlY3V0ZVF1ZXJ5KHZpZXcpLmxlbmd0aCArICcgZWxlbWVudG9zJyk7XHJcbiAgICAgICAgaWYodGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmV4ZWN1dGVRdWVyeSh2aWV3KS5sZW5ndGggPiAwKSB7ICAgICBcclxuICAgICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkodGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmV4ZWN1dGVRdWVyeSh2aWV3KSwgbnVsbCwgNCkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgICBwdWJsaWMgb25DcmVhdGVGaWxlKCkge1xyXG4gICAgICAgIC8vID4+IGZzLWNyZWF0ZS1hbGwtY29kZVxyXG4gICAgICAgIGxldCBkb2N1bWVudHMgPSBmcy5rbm93bkZvbGRlcnMuZG9jdW1lbnRzKCk7XHJcbiAgICAgICAgdGhpcy5mb2xkZXIgPSBkb2N1bWVudHMuZ2V0Rm9sZGVyKHRoaXMuZm9sZGVyTmFtZSB8fCBcInRlc3RGb2xkZXJcIik7XHJcbiAgICAgICAgdGhpcy5maWxlID0gdGhpcy5mb2xkZXIuZ2V0RmlsZSgodGhpcy5maWxlTmFtZSB8fCBcInRlc3RGaWxlXCIpICsgXCIudHh0XCIpO1xyXG5cclxuICAgICAgICBcclxuICAgICAgICAvKlxyXG4gICAgICAgIHRoaXMuZmlsZS53cml0ZVRleHQodGhpcy5maWxlVGV4dENvbnRlbnQgfHwgXCJzb21lIHJhbmRvbSBjb250ZW50XCIpXHJcbiAgICAgICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyBTdWNjZWVkZWQgd3JpdGluZyB0byB0aGUgZmlsZS5cclxuICAgICAgICAgICAgICAgIHRoaXMuZmlsZS5yZWFkVGV4dCgpXHJcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdWNjZXNzTWVzc2FnZSA9IFwiU3VjY2Vzc2Z1bGx5IHNhdmVkIGluIFwiICsgdGhpcy5maWxlLnBhdGg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMud3JpdHRlbkNvbnRlbnQgPSByZXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXNJdGVtVmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pLmNhdGNoKGVyciA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyBFcnJvclxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAvLyA8PCBmcy1jcmVhdGUtYWxsLWNvZGVcclxuICAgICAgICAqL1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldEN1cnJlbnRVc2VyRG9jSUQoKSB7XHJcbiAgICAgICAgdmFyIHVzZXJzID0gdGhpcy5nZXRBbGxVc2VycygpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKHVzZXJzKSB7XHJcbiAgICAgICAgICAgIHZhciBsYXN0VXNlcjtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSBpbiB1c2Vycykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHVzZXJzLmhhc093blByb3BlcnR5KGkpICYmIHR5cGVvZihpKSAhPT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxhc3RVc2VyID0gdXNlcnNbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGxhc3RVc2VyLl9pZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgaXNVc2VyQXV0aCgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnQSB2ZXJpZmljYXIgc2UgZXhpc3RlIHV0aWxpemFkb3IgbmEgQkQnKTtcclxuICAgICAgICBpZih0aGlzLnVzZXJEYXRhX2lkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7IFxyXG4gICAgfVxyXG4gICAgLy9HdWFyZGEgYXZhbGlhw6fDtWVzIGRvcyBtYXRlcmlhaXNcclxuICAgIHB1YmxpYyBzZXRSYXRpbmcocmF0aW5nKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ0EgcmVnaXN0YXIgbyByYXRpbmcnKTtcclxuICAgICAgICAvL1JlY2VibyBvIHJhdGluZywgY29tIGlkIGRvIG1hdGVyaWFsXHJcbiAgICAgICAgLy9Wb3Ugw6AgQkQgZG9zIG1hdGVyaWFpc1xyXG4gICAgICAgIC8vUGFyYSBjYWRhIG1hdGVyaWFsIGNvbSBhcXVlbGUgaWQsIGF0dWFsaXphciBvIHNldSByYXRpbmcuXHJcbiAgICAgICAgLypJc3RvIGFsdGVyYSBhIGJkIGRvcyBtYXRlcmlhaXMuXHJcbiAgICAgICAgbGV0IG1hdGVyaWFscyA9IHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5nZXREb2N1bWVudCh0aGlzLm1hdGVyaWFsc19pZCkubWF0ZXJpYWxzO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBtYXRlcmlhbHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgZm9yKGxldCBqID0gMDsgaiA8IG1hdGVyaWFsc1tpXS5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgaWYocmF0aW5nLmlkX21hdGVyaWFsID09PSBtYXRlcmlhbHNbaV1bal0uaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygncmVnaXN0b3UnKTtcclxuICAgICAgICAgICAgICAgICAgICBtYXRlcmlhbHNbaV1bal0ucmF0aW5ncy5wdXNoKHJhdGluZyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShtYXRlcmlhbHMsIG51bGwsIDQpKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkudXBkYXRlRG9jdW1lbnQodGhpcy5tYXRlcmlhbHNfaWQsIHtcclxuICAgICAgICAgICAgXCJ0eXBlXCI6IFwibWF0ZXJpYWxzXCIsXHJcbiAgICAgICAgICAgIFwibWF0ZXJpYWxzXCI6IG1hdGVyaWFscyxcclxuICAgICAgICB9KVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vdGhpcy5zaG93RGF0YSgnbWF0ZXJpYWxzJyk7XHJcbiAgICAgICAgRklNIGRhIGFsdGVyYcOnw6NvIG5hIEJEIGRvcyBtYXRlcmlhaXMqL1xyXG4gICAgICAgIC8qQXNzaW0gYWx0ZXJhIGEgQkQgZG9zIHBhY2llbnRlcyovXHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeSh0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZ2V0RG9jdW1lbnQodGhpcy5wYXRpZW50c0RhdGFfaWQpLmRhdGEsbnVsbCw0KSk7XHJcbiAgICAgICAgbGV0IHBhdGllbnRzRGF0YSA9IHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5nZXREb2N1bWVudCh0aGlzLnBhdGllbnRzRGF0YV9pZCkuZGF0YTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKFwiRW50cm91IG5vIGZvclwiKTtcclxuICAgICAgICAvKlxyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBwYXRpZW50c0RhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgZm9yKGxldCBqID0gMDsgaiA8IHBhdGllbnRzRGF0YVtpXS5uZWVkcy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgZm9yKGxldCBrID0gMDsgayA8IHBhdGllbnRzRGF0YVtpXS5uZWVkc1tqXS5tYXRlcmlhbHMubGVuZ3RoOyBrKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGF0aWVudHNEYXRhW2ldLm5lZWRzW2pdLm1hdGVyaWFsc1trXVsncmF0aW5ncyddID0gWycnXTtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAqL1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBwYXRpZW50c0RhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgZm9yKGxldCBqID0gMDsgaiA8IHBhdGllbnRzRGF0YVtpXS5uZWVkcy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgZm9yKGxldCBrID0gMDsgayA8IHBhdGllbnRzRGF0YVtpXS5uZWVkc1tqXS5tYXRlcmlhbHMubGVuZ3RoOyBrKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBpZihwYXRpZW50c0RhdGFbaV0ubmVlZHNbal0ubWF0ZXJpYWxzW2tdLmlkID09IHJhdGluZy5pZF9tYXRlcmlhbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHBhdGllbnRzRGF0YVtpXVtqXVtrXSxudWxsLDQpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGF0aWVudHNEYXRhW2ldLm5lZWRzW2pdLm1hdGVyaWFsc1trXVsncmF0aW5ncyddID0gcmF0aW5nOyAgICBcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShwYXRpZW50c0RhdGEsbnVsbCw0KSk7XHJcbiAgICAgICAgdGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLnVwZGF0ZURvY3VtZW50KHRoaXMucGF0aWVudHNEYXRhX2lkLCB7XHJcbiAgICAgICAgICAgIFwidHlwZVwiOiBcImRhdGFcIixcclxuICAgICAgICAgICAgXCJkYXRhXCI6IHBhdGllbnRzRGF0YSxcclxuICAgICAgICB9KVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vdGhpcy5zaG93RGF0YShcImRhdGFcIik7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0TWF0ZXJpYWxSYXRpbmcobWF0ZXJpYWxfaWQpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldE5lZWRNYXRlcmlhbHMoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ0EgZGV2b2x2ZXIgdG9kb3Mgb3MgbWF0ZXJpYWlzJyk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5nZXREb2N1bWVudCh0aGlzLm1hdGVyaWFsc19pZCkubWF0ZXJpYWxzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpc1BhdGllbnRzUmVxdWVzdERvbmUoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJBIHZlcmlmaWNhciBzZSBvIHBlZGlkbyBhbyBzZXJ2aWRvciBqw6EgZm9pIGZlaXRvXCIpO1xyXG4gICAgICAgIGlmKHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5nZXREb2N1bWVudCh0aGlzLmdsb2JhbERhdGFfaWQpLmRhdGFSZXF1ZXN0ID09IFwiZmFsc2VcIikge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXRRdWl6cyhjYXJlZ2l2ZXJRdWVzdGlvbmFpcmVzKSB7XHJcbiAgICAgICAgaWYoIXRoaXMuaXNRdWl6c1NldCgpKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdlbnRyb3UnKTtcclxuICAgICAgICAgICAgdGhpcy5xdWl6c19pZCA9IHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5jcmVhdGVEb2N1bWVudCh7XHJcbiAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJxdWl6XCIsXHJcbiAgICAgICAgICAgICAgICBcInF1aXpcIjogY2FyZWdpdmVyUXVlc3Rpb25haXJlc1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnQVFVSSEhISEhISEhISEhISEhJylcclxuICAgICAgICAgICAgdmFyIHF1aXpzID0gdGhpcy5nZXRRdWl6cygpO1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHF1aXpzLCBudWxsLCA0KSk7XHJcbiAgICAgICAgICAgIHZhciBxdWl6c19maW5hbCA9IHRoaXMuZ2V0UXVpenMoKTtcclxuICAgICAgICAgICAgdmFyIGNhcmVnaXZlclF1ZXN0aW9uYWlyZXNfaWRzID0gbmV3IEFycmF5KCk7XHJcbiAgICAgICAgICAgIHZhciBxdWl6c19pZHMgPSBuZXcgQXJyYXkoKTtcclxuICAgICAgICAgICAgdmFyIHF1aXpzX2lkc190b19hZGRfdG9fQkQgPSBuZXcgQXJyYXkoKTtcclxuICAgICAgICAgICAgdmFyIHF1aXpzX3NhbWVfaWQgPSBuZXcgQXJyYXkoKTtcclxuICAgICAgICAgICAgdmFyIGZvdW5kX2NvbnRyb2w7XHJcbiAgICAgICAgICAgIHZhciBpbmRleF9jb250cm9sID0gLTE7XHJcblxyXG4gICAgICAgICAgICBjYXJlZ2l2ZXJRdWVzdGlvbmFpcmVzX2lkcy5wdXNoKGNhcmVnaXZlclF1ZXN0aW9uYWlyZXMubWFwKGZ1bmN0aW9uKHF1ZXN0aW9ubmFpcmUpe1xyXG4gICAgICAgICAgICAgICAgdmFyIHF1ZXN0ID0ge307XHJcbiAgICAgICAgICAgICAgICBxdWVzdFtxdWVzdGlvbm5haXJlLmlkXSA9IHF1ZXN0aW9ubmFpcmUucmVmZXJlbmNlO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHF1ZXN0O1xyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ2FxdWknKTtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShjYXJlZ2l2ZXJRdWVzdGlvbmFpcmVzX2lkcywgbnVsbCwgNCkpO1xyXG4gICAgICAgICAgICBxdWl6c19pZHMucHVzaChxdWl6cy5tYXAoZnVuY3Rpb24ocXVlc3Rpb25uYWlyZSl7cmV0dXJuIHF1ZXN0aW9ubmFpcmUuaWR9KSk7XHJcbiAgICAgICAgICAgLy9jb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShxdWl6c19pZHMsIG51bGwsIDQpKTtcclxuICAgICAgICAgICBcclxuICAgICAgICAgICAvL3BhcmEgY2FkYSBxdWVzdMOjbyBkbyBxdWVzdGlvbsOhcmlvIHJlbW90b1xyXG4gICAgICAgICAgIGNhcmVnaXZlclF1ZXN0aW9uYWlyZXNfaWRzWzBdLmZvckVhY2gocXVlc3Rpb25uYWlyZV9zZXJ2ZXJfaWQgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy9Db250cm9sbyBzZSBlbmNvbnRyb3UgbWF0Y2ggYSBmYWxzZSBlIGRlIGluZGV4IGRvIHF1ZXN0aW9uw6FyaW8gYSAwXHJcbiAgICAgICAgICAgICAgIGZvdW5kX2NvbnRyb2wgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgaW5kZXhfY29udHJvbCsrO1xyXG4gICAgICAgICAgICAgICAvL1BhcmEgY2FkYSBxdWVzdGlvbsOhcmlvIGRhIEJEXHJcbiAgICAgICAgICAgICAgIHF1aXpzX2lkc1swXS5mb3JFYWNoKHF1ZXN0aW9ubmFpcmVfQkRfaWQgPT4geyAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgLy9zZSBlbmNvbnRyYXIgbWF0Y2hcclxuICAgICAgICAgICAgICAgICAgICBpZihxdWVzdGlvbm5haXJlX3NlcnZlcl9pZC5pZCA9PSBxdWVzdGlvbm5haXJlX0JEX2lkLmlkICYmIHF1ZXN0aW9ubmFpcmVfc2VydmVyX2lkLnJlZmVyZW5jZSA9PSBxdWVzdGlvbm5haXJlX0JEX2lkLnJlZmVyZW5jZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2VuY29udHJvdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3VuZF9jb250cm9sID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9tZXRlIG51bSBhcnJheVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBxdWl6c19zYW1lX2lkLnB1c2gocXVlc3Rpb25uYWlyZV9zZXJ2ZXJfaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgLy9zZSBuIGVuY29udHJvdSBtYXRjaFxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3Rlcm1pbm91IGZvcicpO1xyXG4gICAgICAgICAgICAgICBpZighZm91bmRfY29udHJvbCkge1xyXG4gICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0VOVFJPVScpO1xyXG4gICAgICAgICAgICAgICAgICAgLy9hZGljaW9uYS1vIGNvbW8gcXVpeiBhIGFjcmVzY2VudGFyIG5hIEJEXHJcbiAgICAgICAgICAgICAgICAgICBxdWl6c19pZHNfdG9fYWRkX3RvX0JELnB1c2gocXVlc3Rpb25uYWlyZV9zZXJ2ZXJfaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgcXVpenNfZmluYWwucHVzaChjYXJlZ2l2ZXJRdWVzdGlvbmFpcmVzW2luZGV4X2NvbnRyb2xdKTtcclxuICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgIGNvbnNvbGUubG9nKCdBIG1vc3RyYXIgcXVpenMgYSBzb2JyZXBvcicpXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHF1aXpzX2ZpbmFsLCBudWxsLCA0KSk7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS51cGRhdGVEb2N1bWVudCh0aGlzLnF1aXpzX2lkLCB7XHJcbiAgICAgICAgICAgICAgICAncXVpeicgOiBxdWl6c19maW5hbCxcclxuICAgICAgICAgICAgICAgICd0eXBlJyA6ICdxdWl6J1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2coJ0EgbW9zdHJhciBCRC1RVUlaIScpXHJcbiAgICAgICAgdGhpcy5zaG93RGF0YSgncXVpeicpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGNoZWNrUXVlc3Rpb25uYWlyZV9yZWZlcmVuY2UoaWQpIHtcclxuXHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0QWxsUXVpenMoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJBIG9idGVyIElEIGRvcyBxdWl6c1wiKTtcclxuICAgICAgICAgaWYodGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmV4ZWN1dGVRdWVyeSgncXVpeicpLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgIC8vY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkodGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmV4ZWN1dGVRdWVyeSgncXVpeicpLCBudWxsLCA0KSk7XHJcbiAgICAgICAgICAgICByZXR1cm4gdGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmV4ZWN1dGVRdWVyeSgncXVpeicpO1xyXG4gICAgICAgICB9XHJcbiAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldExhdGVzdFF1aXpEYXRhKCkge1xyXG4gICAgICAgIHZhciBxdWl6cyA9IHRoaXMuZ2V0QWxsUXVpenMoKTtcclxuXHJcbiAgICAgICAgaWYocXVpenMpIHtcclxuICAgICAgICAgICAgdmFyIGxhc3RRdWl6O1xyXG5cclxuICAgICAgICAgICAgbGFzdFF1aXogPSBxdWl6c1txdWl6cy5sZW5ndGggLSAxXTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2cobGFzdFF1aXopO1xyXG4gICAgICAgICAgICByZXR1cm4gbGFzdFF1aXouX2lkO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRMYXRlc3RQYXRpZW50RGF0YSgpIHtcclxuICAgICAgICB2YXIgcGF0aWVudHNEYXRhID0gdGhpcy5nZXRBbGxQYXRpZW50c0RhdGEoKTtcclxuXHJcbiAgICAgICAgaWYocGF0aWVudHNEYXRhKSB7XHJcbiAgICAgICAgICAgIHZhciBsYXN0RGF0YTtcclxuXHJcbiAgICAgICAgICAgIGxhc3REYXRhID0gcGF0aWVudHNEYXRhW3BhdGllbnRzRGF0YS5sZW5ndGggLSAxXTtcclxuICAgICAgICAgICAgcmV0dXJuIGxhc3REYXRhLl9pZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0UXVpenMoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5xdWl6c19pZCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5nZXREb2N1bWVudCh0aGlzLnF1aXpzX2lkKS5xdWl6O1xyXG4gICAgfVxyXG4gICAgcHVibGljIGlzR2xvYmFsU2V0KCkge1xyXG4gICAgICAgIGlmKHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5leGVjdXRlUXVlcnkoJ2dsb2JhbCcpLmxlbmd0aCA+IDApIHsgICAgICAgICAgICBcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRHbG9iYWxzSUQoKSB7XHJcbiAgICAgICAgaWYodGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmV4ZWN1dGVRdWVyeSgnZ2xvYmFsJykubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeSh0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZXhlY3V0ZVF1ZXJ5KFwiZ2xvYmFsXCIpLCBudWxsLCA0KSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmV4ZWN1dGVRdWVyeSgnZ2xvYmFsJylbMF0uX2lkO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRBbGxQYXRpZW50c0RhdGEoKSB7XHJcbiAgICAgICAgaWYodGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmV4ZWN1dGVRdWVyeShcImRhdGFcIikubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeSh0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZXhlY3V0ZVF1ZXJ5KFwiZGF0YVwiKSwgbnVsbCwgNCkpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmV4ZWN1dGVRdWVyeShcImRhdGFcIik7XHJcbiAgICAgICAgfSAgICAgICAgIFxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIHB1YmxpYyB1cGRhdGVRdWl6U3RhdHVzKHF1ZXN0aW9ubmFpcmUpIHsgICAgICAgIFxyXG4gICAgICAgIHZhciBxdWl6cyA9IHRoaXMuZ2V0UXVpenMoKTtcclxuICAgICAgIFxyXG4gICAgICAgIHF1aXpzLmZvckVhY2goZWxlbWVudF9xdWl6ID0+IHtcclxuICAgICAgICAgICAgaWYoZWxlbWVudF9xdWl6LmlkID09IHF1ZXN0aW9ubmFpcmUuaWQpIHtcclxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ0VOVFJPVScpO1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudF9xdWl6LmRvbmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICBcclxuICAgICAgICB0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkudXBkYXRlRG9jdW1lbnQodGhpcy5xdWl6c19pZCwge1xyXG4gICAgICAgICAgICAncXVpeicgOiBxdWl6cyxcclxuICAgICAgICAgICAgJ3R5cGUnIDogJ3F1aXonXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy90aGlzLnNob3dEYXRhKCdxdWl6Jyk7XHJcbiAgICAgICAgdGhpcy5jaGVja1F1aXpTdGF0dXMoKTtcclxuICAgIH1cclxuICAgIGNoZWNrUXVpelN0YXR1cygpIHtcclxuICAgICAgICB2YXIgcXVpenMgPSB0aGlzLmdldFF1aXpzKCk7XHJcbiAgICAgICAgdmFyIHF1aXpfZG9uZSA9IFtdO1xyXG5cclxuICAgICAgICBxdWl6X2RvbmUucHVzaChxdWl6cy5tYXAoZnVuY3Rpb24ocXVpenMpe3JldHVybiBxdWl6cy5kb25lfSkpO1xyXG4gICAgICAgIHF1aXpfZG9uZVswXS5mb3JFYWNoKHF1aXpfcmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgaWYocXVpel9yZXN1bHQgPT0gJ2ZhbHNlJykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLnVwZGF0ZURvY3VtZW50KHRoaXMuZ2xvYmFsRGF0YV9pZCwge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiZXZhbHVhdGlvbnNUb0RvXCIgOiBcInRydWVcIlxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGhhc0V2YWx1YXRpb25zVG9EbygpIHtcclxuICAgICAgICAvKlxyXG4gICAgICAgIGNvbnNvbGUubG9nKCdFdmFsdWF0aW9ucyB0byBkbzonICsgdGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmdldERvY3VtZW50KHRoaXMuZ2xvYmFsRGF0YV9pZCkuZXZhbHVhdGlvbnNUb0RvKVxyXG4gICAgICAgIGlmKHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5nZXREb2N1bWVudCh0aGlzLmdsb2JhbERhdGFfaWQpLmV2YWx1YXRpb25zVG9EbyA9PSBcInRydWVcIikge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICovXHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICBpc1F1aXpzU2V0KCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdRVUlaLUlEOiAnICsgdGhpcy5xdWl6c19pZCk7XHJcbiAgICAgICAgaWYodGhpcy5xdWl6c19pZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgZGVsZXRlUXVlc3Rpb25uYWlyZShxdWVzdGlvbm5haXJlKSB7XHJcbiAgICAgICAgLy9hcGFnYXIgbyBxdWVzdGlvbmFyaW8gcXVlIGZvaSBlbnZpYWRvIGRhIEJELiBOw6NvIMOpIHVyZ2VudGUgcHEgZGVwb2lzIGRlIGZlaXRvIGZpY2Egb2N1bHRvXHJcbiAgICB9XHJcbiAgICBhZGRRdWVzdGlvbm5haXJlVG9EQihxdWVzdGlvbm5haXJlKSB7XHJcbiAgICAgICAgaWYoIXRoaXMuaXNTZXRRdWl6c0RvbmUoKSkge1xyXG4gICAgICAgICAgICB0aGlzLnF1aXpzX2RvbmVfaWQgPSB0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuY3JlYXRlRG9jdW1lbnQoe1xyXG4gICAgICAgICAgICAgICAgJ3R5cGUnIDogJ3F1aXpzT25Ib2xkJyxcclxuICAgICAgICAgICAgICAgICdxdWVzdGlvbm5haXJlcycgOiBxdWVzdGlvbm5haXJlIFxyXG4gICAgICAgICAgICB9KTsgICAgICAgICAgICBcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB2YXIgcXVpenNPbkhvbGRfQkQgPSB0aGlzLmdldEFsbFF1aXpzT25Ib2xkKCk7XHJcbiAgICAgICAgICAgIHF1aXpzT25Ib2xkX0JELnB1c2gocXVlc3Rpb25uYWlyZSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnF1aXpzX2RvbmVfaWQgPSB0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkudXBkYXRlRG9jdW1lbnQoe1xyXG4gICAgICAgICAgICAgICAgJ3R5cGUnIDogJ3F1aXpzT25Ib2xkJyxcclxuICAgICAgICAgICAgICAgICdxdWVzdGlvbm5haXJlcycgOiBxdWl6c09uSG9sZF9CRCBcclxuICAgICAgICAgICAgfSk7IFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGlzU2V0UXVpenNEb25lKCkge1xyXG4gICAgICAgIGlmKHRoaXMucXVpenNfZG9uZV9pZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgZ2V0UXVpenNPbkhvbGRfSUQoKSB7XHJcbiAgICAgICAgaWYodGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmV4ZWN1dGVRdWVyeSgncXVpek9uSG9sZCcpLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeSh0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZXhlY3V0ZVF1ZXJ5KFwicXVpek9uSG9sZFwiKSwgbnVsbCwgNCkpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmV4ZWN1dGVRdWVyeSgncXVpek9uSG9sZCcpWzBdLl9pZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICBnZXRBbGxRdWl6c09uSG9sZCgpIHtcclxuICAgICAgICBpZih0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZXhlY3V0ZVF1ZXJ5KCdxdWl6T25Ib2xkJykubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5leGVjdXRlUXVlcnkoXCJxdWl6T25Ib2xkXCIpLCBudWxsLCA0KSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZXhlY3V0ZVF1ZXJ5KCdxdWl6T25Ib2xkJykucXVlc3Rpb25uYWlyZXM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG59Il19