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
        //this.deleteData('global');
        //this.deleteData('data');
        //this.showData('data'); //Esta a dar excepcao e a imprimir os users tb???!!!!! (por confirmar) pq n tem dados e estoira?? mas imprime o user pq?
        //this.showData('user');
        //this.showData('materials');
        //this.showData('quiz');
        this.init();
        //this.showData('global');
        //
    }
    DataService.prototype.init = function () {
        console.log("BD USADA");
        this.showData("caregiver");
        console.log('A inicializar as variáveis globais');
        //Adicionar numero de avaliações pendentes
        //...
        if (this.isGlobalSet()) {
            console.log('A atualizar global de conexao');
            this.globalData_id = this.getGlobalsID();
            var global = this.database.getDatabase().getDocument(this.globalData_id);
            this.database.getDatabase().updateDocument(this.globalData_id, {
                "type": "global",
                "dataRequest": "false",
                "evaluationsToDo": global.evaluationsToDo
            });
            console.log(JSON.stringify(this.globalData_id));
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
        console.log("QUIZS USER DOC ID: " + this.userData_id);
        this.patientsData_id = this.getLatestPatientData();
        console.log("PATIENTS DOC ID: " + this.patientsData_id);
        this.quizs_id = this.getLatestQuizData();
        console.log("QUIZS DOC ID: " + this.quizs_id);
        //this.quizs_done_id = this.getQuizsOnHold_ID();
        //verificar se há questionários para preencher
        //this.checkQuizStatus();
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
                "data": data,
                "type": "data"
            });
        }
        else {
            console.log('Gravar dados Pacientes');
            this.patientsData_id = this.database.getDatabase().createDocument({
                "type": "data",
                "data": data
            });
        }
        //this.mediaPersistence(data);
        //Guarda dados dos Pacientes
        //Guarda dados das necessidades
        var global = this.database.getDatabase().getDocument(this.globalData_id);
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
        if (caregiverQuestionaires.length > 0) {
            console.log("ENTROU AQUI E SETOU O EVALUATIONS A TRUE. Comprimento do array de quizes: " + caregiverQuestionaires.length);
            this.database.getDatabase().updateDocument(this.globalData_id, {
                "evaluationsToDo": "true",
                "type": "global",
                "dataRequest": "true"
            });
        }
        if (!this.isQuizsSet()) {
            console.log('Novo doc de Quizs');
            this.quizs_id = this.database.getDatabase().createDocument({
                "type": "quiz",
                "quiz": caregiverQuestionaires
            });
            this.showData('quiz');
        }
        else {
            var quizs_to_add = [];
            var found_control = false; //variavel de controle de novos quizs a adicionar
            var same_quiz_found = false;
            console.log('Já existem quizs na BD');
            var quizs = this.getQuizs();
            //console.log(JSON.stringify(quizs, null, 4));
            caregiverQuestionaires.forEach(function (questionnaire_server) {
                same_quiz_found = false;
                quizs.forEach(function (questionnaire_BD) {
                    if (questionnaire_BD.id == questionnaire_server.id && questionnaire_BD.reference == questionnaire_server.reference && questionnaire_BD.reference_name == questionnaire_server.reference_name) {
                        console.log('Encontrou quiz igual: id-' + questionnaire_BD.id + ' reference-' + questionnaire_BD.reference);
                        same_quiz_found = true;
                    }
                });
                if (!same_quiz_found) {
                    console.log('Encontrei quizs novos;');
                    found_control = true;
                    quizs_to_add.push(questionnaire_server);
                }
            });
            console.log(JSON.stringify(quizs_to_add));
            if (found_control) {
                quizs_to_add.forEach(function (quiz) {
                    quizs.push(quiz);
                });
            }
            console.log(JSON.stringify(quizs, null, 4));
            //index array
            var index_1 = 0;
            quizs.forEach(function (element) {
                element.ref_questionnaire = index_1 + "";
                index_1++;
            });
            this.database.getDatabase().updateDocument(this.quizs_id, {
                'quiz': quizs,
                'type': 'quiz'
            });
            console.log(JSON.stringify(this.database.getDatabase().executeQuery('quiz')[0].quiz));
            console.log(this.database.getDatabase().executeQuery('quiz')[0].quiz.length + ' elementos');
        }
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
        //console.log('passou aqui-1');
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
        //console.log(this.quizs_id);
        //console.log(JSON.stringify(this.database.getDatabase().getDocument(this.quizs_id)));
        //console.log(this.database.getDatabase().executeQuery('quiz').length);
        if (this.quizs_id) {
            if (this.database.getDatabase().executeQuery('quiz').length > 0) {
                return this.database.getDatabase().getDocument(this.quizs_id).quiz;
            }
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
            //console.log(JSON.stringify(this.database.getDatabase().executeQuery("global"), null, 4));
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
        console.log('A VERIFICAR SE HA QUIZS POR FAZER');
        var quizs = this.getQuizs();
        var global = this.database.getDatabase().getDocument(this.globalData_id);
        if (quizs) {
            //console.log('passou aqui-2');
            var quiz_done = [];
            var found_quiz_todo = false;
            quiz_done.push(quizs.map(function (quizs) { return quizs.done; }));
            quiz_done[0].forEach(function (quiz_result) {
                console.log("A verificar estado das avaliações");
                console.log('1: ' + quiz_result);
                if (!quiz_result) {
                    found_quiz_todo = true;
                    console.log("A mudar estado das avaliações");
                    _this.database.getDatabase().updateDocument(_this.globalData_id, {
                        "evaluationsToDo": "true",
                        "type": "global",
                        "dataRequest": global.dataRequest
                    });
                }
            });
            if (!found_quiz_todo) {
                this.database.getDatabase().updateDocument(this.globalData_id, {
                    "evaluationsToDo": "false",
                    "type": "global",
                    "dataRequest": global.dataRequest
                });
            }
        }
        else {
            this.database.getDatabase().updateDocument(this.globalData_id, {
                "evaluationsToDo": "false",
                "type": "global",
                "dataRequest": global.dataRequest
            });
        }
        //console.log('passou aqui - 3');   
    };
    DataService.prototype.hasEvaluationsToDo = function () {
        //this.checkQuizStatus();
        /*
        console.log('GLOBAL ID: ' + this.globalData_id);
        console.log(JSON.stringify(this.database.getDatabase().getDocument(this.globalData_id), null, 4));
        console.log('Evaluations to do:' + this.database.getDatabase().getDocument(this.globalData_id).evaluationsToDo)
        */
        if (this.database.getDatabase().getDocument(this.globalData_id).evaluationsToDo == "true") {
            return true;
        }
        return false;
    };
    DataService.prototype.isQuizsSet = function () {
        //console.log('QUIZ-ID: ' + this.quizs_id);
        if (this.quizs_id) {
            return true;
        }
        return false;
    };
    DataService.prototype.deleteQuestionnaire = function (questionnaires) {
        console.log("A apagar quizs!");
        var quizs = this.getQuizs();
        //console.log(JSON.stringify(quizs, null, 4));
        console.log("Quizs da BD: ");
        console.log(JSON.stringify(quizs, null, 4));
        console.log("Quizs ENVIADOS: ");
        console.log(JSON.stringify(questionnaires, null, 4));
        quizs.forEach(function (questionnaire_BD) {
            console.log("REFERENCIA DO QUIZ BD: " + questionnaire_BD.ref_questionnaire);
            questionnaires.forEach(function (questionnaire_sent) {
                console.log("REFERENCIA DO QUIZ ENVIADO: " + questionnaire_sent.ref_questionnaire);
                if (questionnaire_sent.ref_questionnaire == questionnaire_BD.ref_questionnaire) {
                    console.log("REFERENCIA DO QUIZ A ELIMINAR: " + questionnaire_sent.ref_questionnaire);
                    delete quizs[questionnaire_BD.ref_questionnaire];
                }
            });
        });
        console.log("Numero de quizes por fazer: " + quizs.length);
        console.log(JSON.stringify(quizs, null, 4));
        if (quizs.length - 1 == 0) {
            console.log("A apagar doc corrente de quizs");
            this.database.getDatabase().deleteDocument(this.quizs_id);
            this.quizs_id = null;
        }
        else {
            var index_2 = 0;
            quizs.forEach(function (element) {
                element.ref_questionnaire = index_2 + "";
                index_2++;
            });
            this.database.getDatabase().updateDocument(this.quizs_id, {
                'quiz': quizs,
                'type': 'quiz'
            });
        }
        console.log("NOVO ARRAY DE QUIZS NA BD");
        console.log(JSON.stringify(this.database.getDatabase().getDocument(this.quizs_id), null, 4));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGF0YS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxnQ0FBa0M7QUFDbEMsaUNBQStCO0FBSS9CLHNDQUEyQztBQU0zQyx1Q0FBc0M7QUFNdEMsSUFBYSxXQUFXO0lBaUJwQixxQkFBbUIsUUFBa0I7UUFBbEIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUM3QixPQUFPLENBQUMsR0FBRyxDQUFDLDJCQUEyQixDQUFDLENBQUM7UUFDekMscUNBQXFDO1FBQ3JDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDeEIsMEJBQTBCO1FBQzFCLDRCQUE0QjtRQUM1QiwwQkFBMEI7UUFFMUIsaUpBQWlKO1FBQ2pKLHdCQUF3QjtRQUN4Qiw2QkFBNkI7UUFDN0Isd0JBQXdCO1FBQ3hCLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNaLDBCQUEwQjtRQUUxQixFQUFFO0lBRVYsQ0FBQztJQUVELDBCQUFJLEdBQUo7UUFDSSxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDM0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFDO1FBQ2xELDBDQUEwQztRQUMxQyxLQUFLO1FBRUwsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNwQixPQUFPLENBQUMsR0FBRyxDQUFDLCtCQUErQixDQUFDLENBQUM7WUFDN0MsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7WUFDekMsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBRXpFLElBQUksQ0FBQyxRQUFRLENB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Q0FBQztJQUNqQixDQUFDO0lBQ0QsdUNBQWlCLEdBQWpCO1FBQ0ksRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbkUsK0ZBQStGO1lBQy9GLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFDekUsQ0FBQztRQUNELE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUNELHVDQUFpQixHQUFqQjtRQUNJLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ25FLCtGQUErRjtZQUMvRixNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLENBQUMsY0FBYyxDQUFDO1FBQ2pGLENBQUM7UUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFDTCxrQkFBQztBQUFELENBQUMsQUFubUJELElBbW1CQztBQW5tQlksV0FBVztJQUR2QixpQkFBVSxFQUFFO3FDQWtCb0IsbUJBQVE7R0FqQjVCLFdBQVcsQ0FtbUJ2QjtBQW5tQlksa0NBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBmcyBmcm9tIFwiZmlsZS1zeXN0ZW1cIjtcclxuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci9tYXAnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcclxuaW1wb3J0IHsgQ29ubmVjdG9yU2VydmljZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9jb25uZWN0b3IvY29ubmVjdG9yLnNlcnZpY2UnO1xyXG5cclxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IE1hdGVyaWFscyB9IGZyb20gXCIuL21hdGVyaWFsc1wiO1xyXG5pbXBvcnQgeyBEYXRhIH0gZnJvbSBcIi4vZGF0YVwiO1xyXG5pbXBvcnQgeyBOZWVkcyB9IGZyb20gXCIuL25lZWRzXCI7XHJcbmltcG9ydCB7IFBhdGllbnQgfSBmcm9tIFwiLi4vLi4vcGF0aWVudC9wYXRpZW50XCI7XHJcbmltcG9ydCB7IENvdWNoYmFzZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtY291Y2hiYXNlXCI7XHJcbmltcG9ydCB7IERhdGFiYXNlIH0gZnJvbSBcIi4vZGF0YWJhc2VcIjtcclxuaW1wb3J0IHsgVXNlclNlcnZpY2UgfSBmcm9tICcuLi91c2VyL3VzZXIuc2VydmljZSc7XHJcblxyXG5cclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIERhdGFTZXJ2aWNlIHtcclxuXHJcbiAgICBwdWJsaWMgcGF0aWVudHNEYXRhX2lkOiBhbnk7XHJcbiAgICBwdWJsaWMgdXNlckRhdGFfaWQ6IGFueTtcclxuICAgIHB1YmxpYyBtYXRlcmlhbHNfaWQ6IGFueTtcclxuICAgIHB1YmxpYyByYXRpbmdzX2lkOiBhbnk7XHJcbiAgICBwdWJsaWMgZ2xvYmFsRGF0YV9pZDogYW55O1xyXG4gICAgcHVibGljIHF1aXpzX2lkOiBhbnk7XHJcbiAgICBwdWJsaWMgcXVpenNfZG9uZV9pZDogYW55O1xyXG5cclxuICAgIHB1YmxpYyBSZXF1ZXN0RGF0YV9jb250cm9sOiBhbnk7XHJcblxyXG4gICAgcHVibGljIGZpbGU6IGZzLkZpbGU7XHJcbiAgICBwdWJsaWMgZm9sZGVyOiBmcy5Gb2xkZXI7XHJcbiAgICBwdWJsaWMgZm9sZGVyTmFtZTogc3RyaW5nO1xyXG4gICAgcHVibGljIGZpbGVOYW1lOiBzdHJpbmc7XHJcbiBcclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBkYXRhYmFzZTogRGF0YWJhc2Upe1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnSW5zdGFuY2lvdSAtIERhdGFTZXJ2aWNlIScpO1xyXG4gICAgICAgICAgICAvL3RoaXMuZGF0YSA9IGRhdGFiYXNlLmdldERhdGFiYXNlKCk7XHJcbiAgICAgICAgICAgIHRoaXMuZGVsZXRlRGF0YSgncXVpeicpO1xyXG4gICAgICAgICAgICAvL3RoaXMuZGVsZXRlRGF0YSgndXNlcicpO1xyXG4gICAgICAgICAgICAvL3RoaXMuZGVsZXRlRGF0YSgnZ2xvYmFsJyk7XHJcbiAgICAgICAgICAgIC8vdGhpcy5kZWxldGVEYXRhKCdkYXRhJyk7XHJcblxyXG4gICAgICAgICAgICAvL3RoaXMuc2hvd0RhdGEoJ2RhdGEnKTsgLy9Fc3RhIGEgZGFyIGV4Y2VwY2FvIGUgYSBpbXByaW1pciBvcyB1c2VycyB0Yj8/PyEhISEhIChwb3IgY29uZmlybWFyKSBwcSBuIHRlbSBkYWRvcyBlIGVzdG9pcmE/PyBtYXMgaW1wcmltZSBvIHVzZXIgcHE/XHJcbiAgICAgICAgICAgIC8vdGhpcy5zaG93RGF0YSgndXNlcicpO1xyXG4gICAgICAgICAgICAvL3RoaXMuc2hvd0RhdGEoJ21hdGVyaWFscycpO1xyXG4gICAgICAgICAgICAvL3RoaXMuc2hvd0RhdGEoJ3F1aXonKTtcclxuICAgICAgICAgICAgdGhpcy5pbml0KCk7XHJcbiAgICAgICAgICAgIC8vdGhpcy5zaG93RGF0YSgnZ2xvYmFsJyk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvL1xyXG4gICAgICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBpbml0KCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiQkQgVVNBREFcIik7XHJcbiAgICAgICAgdGhpcy5zaG93RGF0YShcImNhcmVnaXZlclwiKTtcclxuICAgICAgICBjb25zb2xlLmxvZygnQSBpbmljaWFsaXphciBhcyB2YXJpw6F2ZWlzIGdsb2JhaXMnKTtcclxuICAgICAgICAvL0FkaWNpb25hciBudW1lcm8gZGUgYXZhbGlhw6fDtWVzIHBlbmRlbnRlc1xyXG4gICAgICAgIC8vLi4uXHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYodGhpcy5pc0dsb2JhbFNldCgpKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdBIGF0dWFsaXphciBnbG9iYWwgZGUgY29uZXhhbycpO1xyXG4gICAgICAgICAgICB0aGlzLmdsb2JhbERhdGFfaWQgPSB0aGlzLmdldEdsb2JhbHNJRCgpO1xyXG4gICAgICAgICAgICB2YXIgZ2xvYmFsID0gdGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmdldERvY3VtZW50KHRoaXMuZ2xvYmFsRGF0YV9pZCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkudXBkYXRlRG9jdW1lbnQodGhpcy5nbG9iYWxEYXRhX2lkLCB7XHJcbiAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJnbG9iYWxcIixcclxuICAgICAgICAgICAgICAgIFwiZGF0YVJlcXVlc3RcIjogXCJmYWxzZVwiLFxyXG4gICAgICAgICAgICAgICAgXCJldmFsdWF0aW9uc1RvRG9cIiA6IGdsb2JhbC5ldmFsdWF0aW9uc1RvRG9cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeSh0aGlzLmdsb2JhbERhdGFfaWQpKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ0EgY3JpYXIgb2JqZXRvIHBhcmEgYXMgdmFyacOhdmVpcyBnbG9iYWlzJyk7XHJcbiAgICAgICAgICAgIC8vY3JpYXIgdmFyacOhdmVsIGdsb2JhbCBib29sZWFuIHBhcmEgZGl6ZXIgc2UgaMOhIHF1aXplcyBwYXJhIGZhemVyIHVwZGF0ZSBvdSBuXHJcbiAgICAgICAgICAgIHRoaXMuZ2xvYmFsRGF0YV9pZCA9IHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5jcmVhdGVEb2N1bWVudCh7XHJcbiAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJnbG9iYWxcIixcclxuICAgICAgICAgICAgICAgIFwiZGF0YVJlcXVlc3RcIjogXCJmYWxzZVwiLFxyXG4gICAgICAgICAgICAgICAgXCJldmFsdWF0aW9uc1RvRG9cIiA6IFwiZmFsc2VcIlxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnTk9WTyBHTE9CQUwgSUQ6ICcgKyB0aGlzLmdsb2JhbERhdGFfaWQpOyAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy51c2VyRGF0YV9pZCA9IHRoaXMuZ2V0Q3VycmVudFVzZXJEb2NJRCgpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiUVVJWlMgVVNFUiBET0MgSUQ6IFwiICsgdGhpcy51c2VyRGF0YV9pZCk7XHJcbiAgICAgICAgdGhpcy5wYXRpZW50c0RhdGFfaWQgPSB0aGlzLmdldExhdGVzdFBhdGllbnREYXRhKCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJQQVRJRU5UUyBET0MgSUQ6IFwiICsgdGhpcy5wYXRpZW50c0RhdGFfaWQpO1xyXG4gICAgICAgIHRoaXMucXVpenNfaWQgPSB0aGlzLmdldExhdGVzdFF1aXpEYXRhKCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJRVUlaUyBET0MgSUQ6IFwiICsgdGhpcy5xdWl6c19pZCk7XHJcbiAgICAgICAgLy90aGlzLnF1aXpzX2RvbmVfaWQgPSB0aGlzLmdldFF1aXpzT25Ib2xkX0lEKCk7XHJcblxyXG4gICAgICAgIC8vdmVyaWZpY2FyIHNlIGjDoSBxdWVzdGlvbsOhcmlvcyBwYXJhIHByZWVuY2hlclxyXG4gICAgICAgIC8vdGhpcy5jaGVja1F1aXpTdGF0dXMoKTtcclxuICAgICAgICBcclxuICAgIH1cclxuICAgIHN5bmMoKSB7XHJcbiAgICAgICAgLypcclxuICAgICAgICB0aGlzLmNvbm5lY3RvclNlcnZpY2UuZ2V0UGF0aWVudHMoKVxyXG4gICAgICAgICAgICAuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICAocmVzdWx0KSA9PiB0aGlzLm9uR2V0RGF0YVN1Y2Nlc3MocmVzdWx0KSxcclxuICAgICAgICAgICAgKGVycm9yKSA9PiB0aGlzLm9uR2V0RGF0YUVycm9yKGVycm9yKVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAqL1xyXG4gICAgfVxyXG4gXHJcbiAgICBzZXRVc2VyKHJlZ2lzdGVyZWRVc2VyKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ0EgZ3JhdmFyIG8gdXRpbGl6YWRvcicpO1xyXG4gICAgICAgIHRoaXMudXNlckRhdGFfaWQgPSB0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuY3JlYXRlRG9jdW1lbnQoe1xyXG4gICAgICAgICAgICBcInR5cGVcIjogXCJ1c2VyXCIsXHJcbiAgICAgICAgICAgIFwidXNlclwiOiByZWdpc3RlcmVkVXNlclxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coXCJBUVVJXCIrSlNPTi5zdHJpbmdpZnkodGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmdldERvY3VtZW50KHRoaXMudXNlckRhdGFfaWQsIG51bGwsIDQpKSk7XHJcbiAgICB9XHJcbiAgICBzZXRQYXRpZW50cygpIHtcclxuXHJcbiAgICB9XHJcbiAgICBzZXRNYXRlcmlhbHMoKSB7XHJcblxyXG4gICAgfVxyXG4gICAgZ2V0UGF0aWVudHNEYXRhKCl7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ0EgZGV2b2x2ZXIgdG9kb3Mgb3MgZGFkb3MgZGEgQkQnKTtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnBhdGllbnRzRGF0YV9pZCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5nZXREb2N1bWVudCh0aGlzLnBhdGllbnRzRGF0YV9pZCkuZGF0YTtcclxuICAgIH1cclxuICAgIHNldFBhdGllbnRzRGF0YShkYXRhKSB7XHJcbiAgICAgICAgLy9kZWJ1Z1xyXG4gICAgICAgIC8vdGhpcy5kZWxldGVEYXRhKCdkYXRhJyk7XHJcbiAgICAgICAgLy90aGlzLmRlbGV0ZURhdGEoJ21hdGVyaWFscycpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vVG9kb3Mgb3MgZGFkb3MgZG8gcGFjaWVudGUgZSByZWYgX2lkXHJcbiAgICAgICAgaWYodGhpcy5wYXRpZW50c0RhdGFfaWQpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ0EgYXR1YWxpemFyIG9zIGRhZG9zIGRvcyBwYWNpZW50ZXMgbmEgYmQsIGNvbSBvIGlkICcgKyB0aGlzLnBhdGllbnRzRGF0YV9pZCk7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS51cGRhdGVEb2N1bWVudCh0aGlzLnBhdGllbnRzRGF0YV9pZCwge1xyXG4gICAgICAgICAgICAgICAgXCJkYXRhXCI6IGRhdGEsXHJcbiAgICAgICAgICAgICAgICBcInR5cGVcIiA6IFwiZGF0YVwiXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdHcmF2YXIgZGFkb3MgUGFjaWVudGVzJyk7XHJcbiAgICAgICAgICAgIHRoaXMucGF0aWVudHNEYXRhX2lkID0gdGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmNyZWF0ZURvY3VtZW50KHtcclxuICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImRhdGFcIixcclxuICAgICAgICAgICAgICAgIFwiZGF0YVwiOiBkYXRhXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy90aGlzLm1lZGlhUGVyc2lzdGVuY2UoZGF0YSk7XHJcbiAgICAgICAgXHJcblxyXG4gICAgICAgIC8vR3VhcmRhIGRhZG9zIGRvcyBQYWNpZW50ZXNcclxuICAgICAgICAvL0d1YXJkYSBkYWRvcyBkYXMgbmVjZXNzaWRhZGVzXHJcbiAgICAgICAgdmFyIGdsb2JhbCA9IHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5nZXREb2N1bWVudCh0aGlzLmdsb2JhbERhdGFfaWQpO1xyXG5cclxuICAgICAgICB0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkudXBkYXRlRG9jdW1lbnQodGhpcy5nbG9iYWxEYXRhX2lkLCB7XHJcbiAgICAgICAgICAgIFwidHlwZVwiIDogXCJnbG9iYWxcIixcclxuICAgICAgICAgICAgXCJkYXRhUmVxdWVzdFwiOiBcInRydWVcIixcclxuICAgICAgICAgICAgXCJldmFsdWF0aW9uc1RvRG9cIiA6IGdsb2JhbC5ldmFsdWF0aW9uc1RvRG9cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy92ZXIgbyBnZXQgZG9jdW1lbnQgdGIgZSBjb21wYXJhclxyXG4gICAgICAgIHRoaXMuc2hvd0RhdGEoJ2dsb2JhbCcpO1xyXG4gICAgfVxyXG4gICAgbWVkaWFQZXJzaXN0ZW5jZShkYXRhKSB7XHJcbiAgICAgICAgICAvKipcclxuICAgICAgICAgKiBBYnJpciB0b2RvIG8gY29udGXDumRvIGRhIHBhc3RhIG1hdGVyaWFsc1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHZhciBkb2N1bWVudHMgPSBmcy5rbm93bkZvbGRlcnMuZG9jdW1lbnRzKCk7XHJcbiAgICAgICAgdmFyIHBhdGggPSBmcy5wYXRoLmpvaW4oZG9jdW1lbnRzLnBhdGgsIFwiYXBwL21hdGVyaWFsc1wiKTtcclxuXHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhwYXRoKTtcclxuICAgIH1cclxuICBcclxuICAgIHNldE5lZWRzKCkge1xyXG5cclxuICAgIH1cclxuICAgIGdldFRva2VuKCk6IHN0cmluZyB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ0EgZGV2b2x2ZXIgdG9rZW4nKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmdldERvY3VtZW50KHRoaXMudXNlckRhdGFfaWQpLnVzZXIuY2FyZWdpdmVyX3Rva2VuO1xyXG4gICAgfVxyXG4gICAgZ2V0VXNlcklEKCk6IHN0cmluZyB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ0EgbyBJRCBkbyB1c2VyJyk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5nZXREb2N1bWVudCh0aGlzLnVzZXJEYXRhX2lkKS51c2VyLmlkO1xyXG4gICAgfVxyXG4gICAgZ2V0TGF0ZXN0VXNlclRvUmVnaXN0ZXIoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJBIGRldm9sdmVyIHVsdGltbyB1dGlsaXphZG9yIHJlZ2lzdGFkb1wiKVxyXG4gICAgICAgIHZhciB1c2VycyA9IHRoaXMuZ2V0QWxsVXNlcnMoKTtcclxuICAgICAgICBcclxuICAgICAgICBpZih1c2Vycykge1xyXG4gICAgICAgICAgICB2YXIgbGFzdFVzZXI7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgaW4gdXNlcnMpIHtcclxuICAgICAgICAgICAgICAgIGlmICh1c2Vycy5oYXNPd25Qcm9wZXJ0eShpKSAmJiB0eXBlb2YoaSkgIT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgICAgICAgICBsYXN0VXNlciA9IHVzZXJzW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBsYXN0VXNlci51c2VyO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZGVsZXRlRGF0YSh2aWV3KSB7XHJcbiAgICAgICAgbGV0IGRvY3VtZW50cyA9IHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5leGVjdXRlUXVlcnkodmlldyk7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ0EgYXBhZ2FyIGJkOiAnICsgdmlldyk7XHJcbiAgICAgICAgLy8gbG9vcCBvdmVyIGFsbCBkb2N1bWVudHNcclxuICAgICAgICBpZih0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZXhlY3V0ZVF1ZXJ5KHZpZXcpLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkb2N1bWVudHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIC8vIGRlbGV0ZSBlYWNoIGRvY3VtZW50XHJcbiAgICAgICAgICAgICAgICAvLyBjb3VjaGJhc2Ugd2lsbCBhc3NpZ24gYW4gaWQgKF9pZCkgdG8gYSBkb2N1bWVudCB3aGVuIGNyZWF0ZWRcclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5kZWxldGVEb2N1bWVudChkb2N1bWVudHNbaV0uX2lkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRBbGxVc2Vycygpe1xyXG4gICAgICAgIGlmKHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5leGVjdXRlUXVlcnkoXCJ1c2VyXCIpLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5leGVjdXRlUXVlcnkoXCJ1c2VyXCIpO1xyXG4gICAgICAgIH0gICAgICAgICBcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2hvd0RhdGEodmlldykge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdBIG1vc3RyYXIgYmQ6ICcgKyB2aWV3ICsgJyBjb20gJyArIHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5leGVjdXRlUXVlcnkodmlldykubGVuZ3RoICsgJyBlbGVtZW50b3MnKTtcclxuICAgICAgICBpZih0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZXhlY3V0ZVF1ZXJ5KHZpZXcpLmxlbmd0aCA+IDApIHsgICAgIFxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeSh0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZXhlY3V0ZVF1ZXJ5KHZpZXcpLCBudWxsLCA0KSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgIHB1YmxpYyBvbkNyZWF0ZUZpbGUoKSB7XHJcbiAgICAgICAgLy8gPj4gZnMtY3JlYXRlLWFsbC1jb2RlXHJcbiAgICAgICAgbGV0IGRvY3VtZW50cyA9IGZzLmtub3duRm9sZGVycy5kb2N1bWVudHMoKTtcclxuICAgICAgICB0aGlzLmZvbGRlciA9IGRvY3VtZW50cy5nZXRGb2xkZXIodGhpcy5mb2xkZXJOYW1lIHx8IFwidGVzdEZvbGRlclwiKTtcclxuICAgICAgICB0aGlzLmZpbGUgPSB0aGlzLmZvbGRlci5nZXRGaWxlKCh0aGlzLmZpbGVOYW1lIHx8IFwidGVzdEZpbGVcIikgKyBcIi50eHRcIik7XHJcblxyXG4gICAgICAgIFxyXG4gICAgICAgIC8qXHJcbiAgICAgICAgdGhpcy5maWxlLndyaXRlVGV4dCh0aGlzLmZpbGVUZXh0Q29udGVudCB8fCBcInNvbWUgcmFuZG9tIGNvbnRlbnRcIilcclxuICAgICAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgICAgIC8vIFN1Y2NlZWRlZCB3cml0aW5nIHRvIHRoZSBmaWxlLlxyXG4gICAgICAgICAgICAgICAgdGhpcy5maWxlLnJlYWRUZXh0KClcclxuICAgICAgICAgICAgICAgICAgICAudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN1Y2Nlc3NNZXNzYWdlID0gXCJTdWNjZXNzZnVsbHkgc2F2ZWQgaW4gXCIgKyB0aGlzLmZpbGUucGF0aDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy53cml0dGVuQ29udGVudCA9IHJlcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0l0ZW1WaXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSkuY2F0Y2goZXJyID0+IHtcclxuICAgICAgICAgICAgICAgIC8vIEVycm9yXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIC8vIDw8IGZzLWNyZWF0ZS1hbGwtY29kZVxyXG4gICAgICAgICovXHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0Q3VycmVudFVzZXJEb2NJRCgpIHtcclxuICAgICAgICB2YXIgdXNlcnMgPSB0aGlzLmdldEFsbFVzZXJzKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYodXNlcnMpIHtcclxuICAgICAgICAgICAgdmFyIGxhc3RVc2VyO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpIGluIHVzZXJzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodXNlcnMuaGFzT3duUHJvcGVydHkoaSkgJiYgdHlwZW9mKGkpICE9PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGFzdFVzZXIgPSB1c2Vyc1tpXTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gbGFzdFVzZXIuX2lkO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBpc1VzZXJBdXRoKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdBIHZlcmlmaWNhciBzZSBleGlzdGUgdXRpbGl6YWRvciBuYSBCRCcpO1xyXG4gICAgICAgIGlmKHRoaXMudXNlckRhdGFfaWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTsgXHJcbiAgICB9XHJcbiAgICAvL0d1YXJkYSBhdmFsaWHDp8O1ZXMgZG9zIG1hdGVyaWFpc1xyXG4gICAgcHVibGljIHNldFJhdGluZyhyYXRpbmcpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnQSByZWdpc3RhciBvIHJhdGluZycpO1xyXG4gICAgICAgIC8vUmVjZWJvIG8gcmF0aW5nLCBjb20gaWQgZG8gbWF0ZXJpYWxcclxuICAgICAgICAvL1ZvdSDDoCBCRCBkb3MgbWF0ZXJpYWlzXHJcbiAgICAgICAgLy9QYXJhIGNhZGEgbWF0ZXJpYWwgY29tIGFxdWVsZSBpZCwgYXR1YWxpemFyIG8gc2V1IHJhdGluZy5cclxuICAgICAgICAvKklzdG8gYWx0ZXJhIGEgYmQgZG9zIG1hdGVyaWFpcy5cclxuICAgICAgICBsZXQgbWF0ZXJpYWxzID0gdGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmdldERvY3VtZW50KHRoaXMubWF0ZXJpYWxzX2lkKS5tYXRlcmlhbHM7XHJcbiAgICAgICAgXHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IG1hdGVyaWFscy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBmb3IobGV0IGogPSAwOyBqIDwgbWF0ZXJpYWxzW2ldLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBpZihyYXRpbmcuaWRfbWF0ZXJpYWwgPT09IG1hdGVyaWFsc1tpXVtqXS5pZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdyZWdpc3RvdScpO1xyXG4gICAgICAgICAgICAgICAgICAgIG1hdGVyaWFsc1tpXVtqXS5yYXRpbmdzLnB1c2gocmF0aW5nKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvL2NvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KG1hdGVyaWFscywgbnVsbCwgNCkpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS51cGRhdGVEb2N1bWVudCh0aGlzLm1hdGVyaWFsc19pZCwge1xyXG4gICAgICAgICAgICBcInR5cGVcIjogXCJtYXRlcmlhbHNcIixcclxuICAgICAgICAgICAgXCJtYXRlcmlhbHNcIjogbWF0ZXJpYWxzLFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgXHJcbiAgICAgICAgLy90aGlzLnNob3dEYXRhKCdtYXRlcmlhbHMnKTtcclxuICAgICAgICBGSU0gZGEgYWx0ZXJhw6fDo28gbmEgQkQgZG9zIG1hdGVyaWFpcyovXHJcbiAgICAgICAgLypBc3NpbSBhbHRlcmEgYSBCRCBkb3MgcGFjaWVudGVzKi9cclxuICAgICAgICAvL2NvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5nZXREb2N1bWVudCh0aGlzLnBhdGllbnRzRGF0YV9pZCkuZGF0YSxudWxsLDQpKTtcclxuICAgICAgICBsZXQgcGF0aWVudHNEYXRhID0gdGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmdldERvY3VtZW50KHRoaXMucGF0aWVudHNEYXRhX2lkKS5kYXRhO1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coXCJFbnRyb3Ugbm8gZm9yXCIpO1xyXG4gICAgICAgIC8qXHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHBhdGllbnRzRGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBmb3IobGV0IGogPSAwOyBqIDwgcGF0aWVudHNEYXRhW2ldLm5lZWRzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IobGV0IGsgPSAwOyBrIDwgcGF0aWVudHNEYXRhW2ldLm5lZWRzW2pdLm1hdGVyaWFscy5sZW5ndGg7IGsrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXRpZW50c0RhdGFbaV0ubmVlZHNbal0ubWF0ZXJpYWxzW2tdWydyYXRpbmdzJ10gPSBbJyddO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgICovXHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHBhdGllbnRzRGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBmb3IobGV0IGogPSAwOyBqIDwgcGF0aWVudHNEYXRhW2ldLm5lZWRzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IobGV0IGsgPSAwOyBrIDwgcGF0aWVudHNEYXRhW2ldLm5lZWRzW2pdLm1hdGVyaWFscy5sZW5ndGg7IGsrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHBhdGllbnRzRGF0YVtpXS5uZWVkc1tqXS5tYXRlcmlhbHNba10uaWQgPT0gcmF0aW5nLmlkX21hdGVyaWFsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkocGF0aWVudHNEYXRhW2ldW2pdW2tdLG51bGwsNCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXRpZW50c0RhdGFbaV0ubmVlZHNbal0ubWF0ZXJpYWxzW2tdWydyYXRpbmdzJ10gPSByYXRpbmc7ICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvL2NvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHBhdGllbnRzRGF0YSxudWxsLDQpKTtcclxuICAgICAgICB0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkudXBkYXRlRG9jdW1lbnQodGhpcy5wYXRpZW50c0RhdGFfaWQsIHtcclxuICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGF0YVwiLFxyXG4gICAgICAgICAgICBcImRhdGFcIjogcGF0aWVudHNEYXRhLFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgXHJcbiAgICAgICAgLy90aGlzLnNob3dEYXRhKFwiZGF0YVwiKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRNYXRlcmlhbFJhdGluZyhtYXRlcmlhbF9pZCkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0TmVlZE1hdGVyaWFscygpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnQSBkZXZvbHZlciB0b2RvcyBvcyBtYXRlcmlhaXMnKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmdldERvY3VtZW50KHRoaXMubWF0ZXJpYWxzX2lkKS5tYXRlcmlhbHM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGlzUGF0aWVudHNSZXF1ZXN0RG9uZSgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkEgdmVyaWZpY2FyIHNlIG8gcGVkaWRvIGFvIHNlcnZpZG9yIGrDoSBmb2kgZmVpdG9cIik7XHJcbiAgICAgICAgaWYodGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmdldERvY3VtZW50KHRoaXMuZ2xvYmFsRGF0YV9pZCkuZGF0YVJlcXVlc3QgPT0gXCJmYWxzZVwiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHNldFF1aXpzKGNhcmVnaXZlclF1ZXN0aW9uYWlyZXMpIHtcclxuXHJcbiAgICAgICAgaWYoY2FyZWdpdmVyUXVlc3Rpb25haXJlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRU5UUk9VIEFRVUkgRSBTRVRPVSBPIEVWQUxVQVRJT05TIEEgVFJVRS4gQ29tcHJpbWVudG8gZG8gYXJyYXkgZGUgcXVpemVzOiBcIiArIGNhcmVnaXZlclF1ZXN0aW9uYWlyZXMubGVuZ3RoKTtcclxuICAgICAgICAgICAgdGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLnVwZGF0ZURvY3VtZW50KHRoaXMuZ2xvYmFsRGF0YV9pZCwge1xyXG4gICAgICAgICAgICAgICAgXCJldmFsdWF0aW9uc1RvRG9cIiA6IFwidHJ1ZVwiLFxyXG4gICAgICAgICAgICAgICAgXCJ0eXBlXCIgOiBcImdsb2JhbFwiLFxyXG4gICAgICAgICAgICAgICAgXCJkYXRhUmVxdWVzdFwiIDogXCJ0cnVlXCJcclxuICAgICAgICAgICAgfSk7ICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKCF0aGlzLmlzUXVpenNTZXQoKSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnTm92byBkb2MgZGUgUXVpenMnKTtcclxuICAgICAgICAgICAgdGhpcy5xdWl6c19pZCA9IHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5jcmVhdGVEb2N1bWVudCh7XHJcbiAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJxdWl6XCIsXHJcbiAgICAgICAgICAgICAgICBcInF1aXpcIjogY2FyZWdpdmVyUXVlc3Rpb25haXJlc1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5zaG93RGF0YSgncXVpeicpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHZhciBxdWl6c190b19hZGQgPSBbXTtcclxuICAgICAgICAgICAgdmFyIGZvdW5kX2NvbnRyb2wgPSBmYWxzZTsgLy92YXJpYXZlbCBkZSBjb250cm9sZSBkZSBub3ZvcyBxdWl6cyBhIGFkaWNpb25hclxyXG4gICAgICAgICAgICB2YXIgc2FtZV9xdWl6X2ZvdW5kID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnSsOhIGV4aXN0ZW0gcXVpenMgbmEgQkQnKTtcclxuICAgICAgICAgICAgdmFyIHF1aXpzID0gdGhpcy5nZXRRdWl6cygpO1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHF1aXpzLCBudWxsLCA0KSk7XHJcbiAgICAgICAgICAgIGNhcmVnaXZlclF1ZXN0aW9uYWlyZXMuZm9yRWFjaChxdWVzdGlvbm5haXJlX3NlcnZlciA9PiB7XHJcbiAgICAgICAgICAgICAgICBzYW1lX3F1aXpfZm91bmQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHF1aXpzLmZvckVhY2gocXVlc3Rpb25uYWlyZV9CRCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYocXVlc3Rpb25uYWlyZV9CRC5pZCA9PSBxdWVzdGlvbm5haXJlX3NlcnZlci5pZCAmJiBxdWVzdGlvbm5haXJlX0JELnJlZmVyZW5jZSA9PSBxdWVzdGlvbm5haXJlX3NlcnZlci5yZWZlcmVuY2UgJiYgcXVlc3Rpb25uYWlyZV9CRC5yZWZlcmVuY2VfbmFtZSA9PSBxdWVzdGlvbm5haXJlX3NlcnZlci5yZWZlcmVuY2VfbmFtZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnRW5jb250cm91IHF1aXogaWd1YWw6IGlkLScgKyBxdWVzdGlvbm5haXJlX0JELmlkICsgJyByZWZlcmVuY2UtJyArIHF1ZXN0aW9ubmFpcmVfQkQucmVmZXJlbmNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2FtZV9xdWl6X2ZvdW5kID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGlmKCFzYW1lX3F1aXpfZm91bmQpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnRW5jb250cmVpIHF1aXpzIG5vdm9zOycpO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvdW5kX2NvbnRyb2wgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHF1aXpzX3RvX2FkZC5wdXNoKHF1ZXN0aW9ubmFpcmVfc2VydmVyKTtcclxuICAgICAgICAgICAgICAgIH0gICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShxdWl6c190b19hZGQpKTtcclxuICAgICAgICAgICAgaWYoZm91bmRfY29udHJvbCkge1xyXG4gICAgICAgICAgICAgICAgcXVpenNfdG9fYWRkLmZvckVhY2gocXVpeiA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcXVpenMucHVzaChxdWl6KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHF1aXpzLCBudWxsLCA0KSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvL2luZGV4IGFycmF5XHJcbiAgICAgICAgICAgIGxldCBpbmRleCA9IDA7XHJcbiAgICAgICAgICAgIHF1aXpzLmZvckVhY2goZWxlbWVudCA9PiB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQucmVmX3F1ZXN0aW9ubmFpcmUgPSBpbmRleCArIFwiXCI7XHJcbiAgICAgICAgICAgIGluZGV4Kys7XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS51cGRhdGVEb2N1bWVudCh0aGlzLnF1aXpzX2lkLCB7XHJcbiAgICAgICAgICAgICAgICAncXVpeicgOiBxdWl6cyxcclxuICAgICAgICAgICAgICAgICd0eXBlJyA6ICdxdWl6J1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5leGVjdXRlUXVlcnkoJ3F1aXonKVswXS5xdWl6KSk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZXhlY3V0ZVF1ZXJ5KCdxdWl6JylbMF0ucXVpei5sZW5ndGggKyAnIGVsZW1lbnRvcycpOyAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0QWxsUXVpenMoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJBIG9idGVyIElEIGRvcyBxdWl6c1wiKTtcclxuICAgICAgICBpZih0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZXhlY3V0ZVF1ZXJ5KCdxdWl6JykubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5leGVjdXRlUXVlcnkoJ3F1aXonKSwgbnVsbCwgNCkpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmV4ZWN1dGVRdWVyeSgncXVpeicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zb2xlLmxvZygncGFzc291IGFxdWknKTtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRMYXRlc3RRdWl6RGF0YSgpIHtcclxuICAgICAgICB2YXIgcXVpenMgPSB0aGlzLmdldEFsbFF1aXpzKCk7XHJcblxyXG4gICAgICAgIGlmKHF1aXpzKSB7XHJcbiAgICAgICAgICAgIHZhciBsYXN0UXVpejtcclxuXHJcbiAgICAgICAgICAgIGxhc3RRdWl6ID0gcXVpenNbcXVpenMubGVuZ3RoIC0gMV07XHJcbiAgICAgICAgICAgIHJldHVybiBsYXN0UXVpei5faWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vY29uc29sZS5sb2coJ3Bhc3NvdSBhcXVpLTEnKTtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRMYXRlc3RQYXRpZW50RGF0YSgpIHtcclxuICAgICAgICB2YXIgcGF0aWVudHNEYXRhID0gdGhpcy5nZXRBbGxQYXRpZW50c0RhdGEoKTtcclxuXHJcbiAgICAgICAgaWYocGF0aWVudHNEYXRhKSB7XHJcbiAgICAgICAgICAgIHZhciBsYXN0RGF0YTtcclxuXHJcbiAgICAgICAgICAgIGxhc3REYXRhID0gcGF0aWVudHNEYXRhW3BhdGllbnRzRGF0YS5sZW5ndGggLSAxXTtcclxuICAgICAgICAgICAgcmV0dXJuIGxhc3REYXRhLl9pZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0UXVpenMoKSB7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyh0aGlzLnF1aXpzX2lkKTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5nZXREb2N1bWVudCh0aGlzLnF1aXpzX2lkKSkpO1xyXG4gICAgICAgIC8vY29uc29sZS5sb2codGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmV4ZWN1dGVRdWVyeSgncXVpeicpLmxlbmd0aCk7XHJcbiAgICAgICAgaWYodGhpcy5xdWl6c19pZCkge1xyXG4gICAgICAgICAgICBpZih0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZXhlY3V0ZVF1ZXJ5KCdxdWl6JykubGVuZ3RoID4gMCkgeyAgICAgICAgXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmdldERvY3VtZW50KHRoaXMucXVpenNfaWQpLnF1aXo7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgaXNHbG9iYWxTZXQoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJHTE9CQUxTSVpFOiBcIiArIHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5leGVjdXRlUXVlcnkoJ2dsb2JhbCcpLmxlbmd0aCk7XHJcbiAgICAgICAgaWYodGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmV4ZWN1dGVRdWVyeSgnZ2xvYmFsJykubGVuZ3RoID4gMCkgeyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldEdsb2JhbHNJRCgpIHtcclxuICAgICAgICBpZih0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZXhlY3V0ZVF1ZXJ5KCdnbG9iYWwnKS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkodGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmV4ZWN1dGVRdWVyeShcImdsb2JhbFwiKSwgbnVsbCwgNCkpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5leGVjdXRlUXVlcnkoJ2dsb2JhbCcpWzBdLl9pZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0QWxsUGF0aWVudHNEYXRhKCkge1xyXG4gICAgICAgIGlmKHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5leGVjdXRlUXVlcnkoXCJkYXRhXCIpLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgLy8gY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkodGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmV4ZWN1dGVRdWVyeShcImRhdGFcIiksIG51bGwsIDQpKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5leGVjdXRlUXVlcnkoXCJkYXRhXCIpO1xyXG4gICAgICAgIH0gICAgICAgICBcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgdXBkYXRlUXVpelN0YXR1cyhxdWVzdGlvbm5haXJlKSB7ICAgICAgICBcclxuICAgICAgICB2YXIgcXVpenMgPSB0aGlzLmdldFF1aXpzKCk7XHJcbiAgICAgICAgaWYocXVpenMpIHtcclxuICAgICAgICAgICAgcXVpenMuZm9yRWFjaChlbGVtZW50X3F1aXogPT4ge1xyXG4gICAgICAgICAgICAgICBpZihlbGVtZW50X3F1aXoucmVmX3F1ZXN0aW9ubmFpcmUgPT0gcXVlc3Rpb25uYWlyZS5yZWZfcXVlc3Rpb25uYWlyZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnRfcXVpei5kb25lID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkudXBkYXRlRG9jdW1lbnQodGhpcy5xdWl6c19pZCwge1xyXG4gICAgICAgICAgICAgICAgJ3F1aXonIDogcXVpenMsXHJcbiAgICAgICAgICAgICAgICAndHlwZScgOiAncXVpeidcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIC8vdGhpcy5zaG93RGF0YSgncXVpeicpO1xyXG4gICAgICAgICAgICB0aGlzLmNoZWNrUXVpelN0YXR1cygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIGNoZWNrUXVpelN0YXR1cygpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnQSBWRVJJRklDQVIgU0UgSEEgUVVJWlMgUE9SIEZBWkVSJyk7XHJcbiAgICAgICAgdmFyIHF1aXpzID0gdGhpcy5nZXRRdWl6cygpO1xyXG4gICAgICAgIHZhciBnbG9iYWwgPSB0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZ2V0RG9jdW1lbnQodGhpcy5nbG9iYWxEYXRhX2lkKTtcclxuXHJcbiAgICAgICAgaWYocXVpenMpIHtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZygncGFzc291IGFxdWktMicpO1xyXG4gICAgICAgICAgICB2YXIgcXVpel9kb25lID0gW107XHJcbiAgICAgICAgICAgIHZhciBmb3VuZF9xdWl6X3RvZG8gPSBmYWxzZTtcclxuICAgICAgICAgICAgcXVpel9kb25lLnB1c2gocXVpenMubWFwKGZ1bmN0aW9uKHF1aXpzKXtyZXR1cm4gcXVpenMuZG9uZX0pKTtcclxuICAgICAgICAgICAgcXVpel9kb25lWzBdLmZvckVhY2gocXVpel9yZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJBIHZlcmlmaWNhciBlc3RhZG8gZGFzIGF2YWxpYcOnw7Vlc1wiKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCcxOiAnICsgcXVpel9yZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBpZighcXVpel9yZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3VuZF9xdWl6X3RvZG8gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQSBtdWRhciBlc3RhZG8gZGFzIGF2YWxpYcOnw7Vlc1wiKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkudXBkYXRlRG9jdW1lbnQodGhpcy5nbG9iYWxEYXRhX2lkLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZXZhbHVhdGlvbnNUb0RvXCIgOiBcInRydWVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCIgOiBcImdsb2JhbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImRhdGFSZXF1ZXN0XCIgOiBnbG9iYWwuZGF0YVJlcXVlc3RcclxuICAgICAgICAgICAgICAgICAgICB9KTsgICBcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBpZighZm91bmRfcXVpel90b2RvKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkudXBkYXRlRG9jdW1lbnQodGhpcy5nbG9iYWxEYXRhX2lkLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJldmFsdWF0aW9uc1RvRG9cIiA6IFwiZmFsc2VcIixcclxuICAgICAgICAgICAgICAgICAgICBcInR5cGVcIiA6IFwiZ2xvYmFsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJkYXRhUmVxdWVzdFwiIDogZ2xvYmFsLmRhdGFSZXF1ZXN0XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkudXBkYXRlRG9jdW1lbnQodGhpcy5nbG9iYWxEYXRhX2lkLCB7XHJcbiAgICAgICAgICAgICAgICBcImV2YWx1YXRpb25zVG9Eb1wiIDogXCJmYWxzZVwiLFxyXG4gICAgICAgICAgICAgICAgXCJ0eXBlXCIgOiBcImdsb2JhbFwiLFxyXG4gICAgICAgICAgICAgICAgXCJkYXRhUmVxdWVzdFwiIDogZ2xvYmFsLmRhdGFSZXF1ZXN0XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL2NvbnNvbGUubG9nKCdwYXNzb3UgYXF1aSAtIDMnKTsgICBcclxuICAgIH1cclxuICAgIGhhc0V2YWx1YXRpb25zVG9EbygpIHtcclxuICAgICAgICAvL3RoaXMuY2hlY2tRdWl6U3RhdHVzKCk7XHJcbiAgICAgICAgLypcclxuICAgICAgICBjb25zb2xlLmxvZygnR0xPQkFMIElEOiAnICsgdGhpcy5nbG9iYWxEYXRhX2lkKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeSh0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZ2V0RG9jdW1lbnQodGhpcy5nbG9iYWxEYXRhX2lkKSwgbnVsbCwgNCkpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdFdmFsdWF0aW9ucyB0byBkbzonICsgdGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmdldERvY3VtZW50KHRoaXMuZ2xvYmFsRGF0YV9pZCkuZXZhbHVhdGlvbnNUb0RvKVxyXG4gICAgICAgICovXHJcbiAgICAgICAgaWYodGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmdldERvY3VtZW50KHRoaXMuZ2xvYmFsRGF0YV9pZCkuZXZhbHVhdGlvbnNUb0RvID09IFwidHJ1ZVwiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBpc1F1aXpzU2V0KCkge1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coJ1FVSVotSUQ6ICcgKyB0aGlzLnF1aXpzX2lkKTtcclxuICAgICAgICBpZih0aGlzLnF1aXpzX2lkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBkZWxldGVRdWVzdGlvbm5haXJlKHF1ZXN0aW9ubmFpcmVzKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJBIGFwYWdhciBxdWl6cyFcIik7XHJcbiAgICAgICAgdmFyIHF1aXpzID0gdGhpcy5nZXRRdWl6cygpO1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHF1aXpzLCBudWxsLCA0KSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUXVpenMgZGEgQkQ6IFwiKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkocXVpenMsIG51bGwsIDQpKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJRdWl6cyBFTlZJQURPUzogXCIpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShxdWVzdGlvbm5haXJlcywgbnVsbCwgNCkpO1xyXG4gICAgICAgICAgICBxdWl6cy5mb3JFYWNoKHF1ZXN0aW9ubmFpcmVfQkQgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJSRUZFUkVOQ0lBIERPIFFVSVogQkQ6IFwiICsgcXVlc3Rpb25uYWlyZV9CRC5yZWZfcXVlc3Rpb25uYWlyZSk7XHJcbiAgICAgICAgICAgICAgICBxdWVzdGlvbm5haXJlcy5mb3JFYWNoKHF1ZXN0aW9ubmFpcmVfc2VudCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJSRUZFUkVOQ0lBIERPIFFVSVogRU5WSUFETzogXCIgKyBxdWVzdGlvbm5haXJlX3NlbnQucmVmX3F1ZXN0aW9ubmFpcmUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHF1ZXN0aW9ubmFpcmVfc2VudC5yZWZfcXVlc3Rpb25uYWlyZSA9PSBxdWVzdGlvbm5haXJlX0JELnJlZl9xdWVzdGlvbm5haXJlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUkVGRVJFTkNJQSBETyBRVUlaIEEgRUxJTUlOQVI6IFwiICsgcXVlc3Rpb25uYWlyZV9zZW50LnJlZl9xdWVzdGlvbm5haXJlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHF1aXpzW3F1ZXN0aW9ubmFpcmVfQkQucmVmX3F1ZXN0aW9ubmFpcmVdO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pOyAgICAgICAgIFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIk51bWVybyBkZSBxdWl6ZXMgcG9yIGZhemVyOiBcIiArIHF1aXpzLmxlbmd0aCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkocXVpenMsIG51bGwsIDQpKTtcclxuXHJcbiAgICAgICAgaWYocXVpenMubGVuZ3RoIC0gMSA9PSAwKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQSBhcGFnYXIgZG9jIGNvcnJlbnRlIGRlIHF1aXpzXCIpO1xyXG4gICAgICAgICAgICB0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZGVsZXRlRG9jdW1lbnQodGhpcy5xdWl6c19pZCk7XHJcbiAgICAgICAgICAgIHRoaXMucXVpenNfaWQgPSBudWxsO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCBpbmRleCA9IDA7XHJcbiAgICAgICAgICAgIHF1aXpzLmZvckVhY2goZWxlbWVudCA9PiB7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LnJlZl9xdWVzdGlvbm5haXJlID0gaW5kZXggKyBcIlwiO1xyXG4gICAgICAgICAgICAgICAgaW5kZXgrKztcclxuICAgICAgICAgICAgfSk7XHJcbiAgICBcclxuICAgICAgICAgICAgdGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLnVwZGF0ZURvY3VtZW50KHRoaXMucXVpenNfaWQsIHtcclxuICAgICAgICAgICAgICAgICdxdWl6JyA6IHF1aXpzLFxyXG4gICAgICAgICAgICAgICAgJ3R5cGUnIDogJ3F1aXonXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBjb25zb2xlLmxvZyhcIk5PVk8gQVJSQVkgREUgUVVJWlMgTkEgQkRcIik7XHJcbiAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkodGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmdldERvY3VtZW50KHRoaXMucXVpenNfaWQpLCBudWxsLCA0KSk7XHJcbiAgICB9XHJcbiAgICBhZGRRdWVzdGlvbm5haXJlVG9EQihxdWVzdGlvbm5haXJlKSB7XHJcbiAgICAgICAgaWYoIXRoaXMuaXNTZXRRdWl6c0RvbmUoKSkge1xyXG4gICAgICAgICAgICB0aGlzLnF1aXpzX2RvbmVfaWQgPSB0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuY3JlYXRlRG9jdW1lbnQoe1xyXG4gICAgICAgICAgICAgICAgJ3R5cGUnIDogJ3F1aXpzT25Ib2xkJyxcclxuICAgICAgICAgICAgICAgICdxdWVzdGlvbm5haXJlcycgOiBxdWVzdGlvbm5haXJlIFxyXG4gICAgICAgICAgICB9KTsgICAgICAgICAgICBcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB2YXIgcXVpenNPbkhvbGRfQkQgPSB0aGlzLmdldEFsbFF1aXpzT25Ib2xkKCk7XHJcbiAgICAgICAgICAgIHF1aXpzT25Ib2xkX0JELnB1c2gocXVlc3Rpb25uYWlyZSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnF1aXpzX2RvbmVfaWQgPSB0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkudXBkYXRlRG9jdW1lbnQoe1xyXG4gICAgICAgICAgICAgICAgJ3R5cGUnIDogJ3F1aXpzT25Ib2xkJyxcclxuICAgICAgICAgICAgICAgICdxdWVzdGlvbm5haXJlcycgOiBxdWl6c09uSG9sZF9CRCBcclxuICAgICAgICAgICAgfSk7IFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGlzU2V0UXVpenNEb25lKCkge1xyXG4gICAgICAgIGlmKHRoaXMucXVpenNfZG9uZV9pZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgZ2V0UXVpenNPbkhvbGRfSUQoKSB7XHJcbiAgICAgICAgaWYodGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmV4ZWN1dGVRdWVyeSgncXVpek9uSG9sZCcpLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeSh0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZXhlY3V0ZVF1ZXJ5KFwicXVpek9uSG9sZFwiKSwgbnVsbCwgNCkpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmV4ZWN1dGVRdWVyeSgncXVpek9uSG9sZCcpWzBdLl9pZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICBnZXRBbGxRdWl6c09uSG9sZCgpIHtcclxuICAgICAgICBpZih0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZXhlY3V0ZVF1ZXJ5KCdxdWl6T25Ib2xkJykubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5leGVjdXRlUXVlcnkoXCJxdWl6T25Ib2xkXCIpLCBudWxsLCA0KSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZXhlY3V0ZVF1ZXJ5KCdxdWl6T25Ib2xkJykucXVlc3Rpb25uYWlyZXM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG59Il19