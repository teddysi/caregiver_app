"use strict";
var fs = require("file-system");
require("rxjs/add/operator/map");
var core_1 = require("@angular/core");
var database_1 = require("./database");
var DataService = (function () {
    function DataService(database) {
        //console.log('Instanciou - DataService!');
        //this.data = database.getDatabase();
        //this.deleteData('quiz');
        //this.deleteData('user');
        //this.deleteData('global');
        //this.deleteData('data');
        this.database = database;
        //this.showData('data'); //Esta a dar excepcao e a imprimir os users tb???!!!!! (por confirmar) pq n tem dados e estoira?? mas imprime o user pq?
        //this.showData('user');
        //this.showData('materials');
        this.init();
        //this.showData('global');
        this.showData('quiz');
        //
    }
    DataService.prototype.init = function () {
        //console.log("BD USADA");
        //this.showData("quiz");
        //console.log('A inicializar as variáveis globais');
        //Adicionar numero de avaliações pendentes
        //...
        if (this.isGlobalSet()) {
            //console.log('A atualizar global de conexao');
            this.globalData_id = this.getGlobalsID();
            var global = this.database.getDatabase().getDocument(this.globalData_id);
            this.database.getDatabase().updateDocument(this.globalData_id, {
                "type": "global",
                "dataRequest": "false",
                "evaluationsToDo": global.evaluationsToDo
            });
        }
        else {
            //console.log('A criar objeto para as variáveis globais');
            //criar variável global boolean para dizer se há quizes para fazer update ou n
            this.globalData_id = this.database.getDatabase().createDocument({
                "type": "global",
                "dataRequest": "false",
                "evaluationsToDo": "false"
            });
        }
        this.userData_id = this.getCurrentUserDocID();
        //console.log("QUIZS USER DOC ID: " + this.userData_id);
        this.patientsData_id = this.getLatestPatientData();
        //console.log("PATIENTS DOC ID: " + this.patientsData_id);
        this.quizs_id = this.getLatestQuizData();
        //console.log("QUIZS DOC ID: " + this.quizs_id);
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
        //console.log('A gravar o utilizador');
        this.userData_id = this.database.getDatabase().createDocument({
            "type": "user",
            "user": registeredUser
        });
        ////console.log("AQUI"+JSON.stringify(this.database.getDatabase().getDocument(this.userData_id, null, 4)));
    };
    DataService.prototype.setPatients = function () {
    };
    DataService.prototype.setMaterials = function () {
    };
    DataService.prototype.getPatientsData = function () {
        //console.log('A devolver todos os dados da BD');
        //console.log(this.patientsData_id);
        return this.database.getDatabase().getDocument(this.patientsData_id).data;
    };
    DataService.prototype.setPatientsData = function (data) {
        //debug
        //this.deleteData('data');
        //this.deleteData('materials');
        //Todos os dados do paciente e ref _id
        if (this.patientsData_id) {
            //console.log('A atualizar os dados dos pacientes na bd, com o id ' + this.patientsData_id);
            this.database.getDatabase().updateDocument(this.patientsData_id, {
                "data": data,
                "type": "data"
            });
        }
        else {
            //console.log('Gravar dados Pacientes');
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
        ////console.log(path);
    };
    DataService.prototype.setNeeds = function () {
    };
    DataService.prototype.getToken = function () {
        //console.log('A devolver token');
        return this.database.getDatabase().getDocument(this.userData_id).user.caregiver_token;
    };
    DataService.prototype.getUserID = function () {
        //console.log('A o ID do user');
        return this.database.getDatabase().getDocument(this.userData_id).user.id;
    };
    DataService.prototype.getLatestUserToRegister = function () {
        //console.log("A devolver ultimo utilizador registado")
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
        //console.log('A apagar bd: ' + view);
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
        //console.log('A verificar se existe utilizador na BD');
        if (this.userData_id) {
            return true;
        }
        return false;
    };
    DataService.prototype.setRating = function (material, level) {
        var patientsData = this.database.getDatabase().getDocument(this.patientsData_id).data;
        for (var i = 0; i < patientsData.length; i++) {
            for (var j = 0; j < patientsData[i].needs.length; j++) {
                for (var k = 0; k < patientsData[i].needs[j].materials.length; k++) {
                    if (patientsData[i].needs[j].materials[k].id == material.id) {
                        ////console.log(JSON.stringify(patientsData[i][j][k],null,4));
                        patientsData[i].needs[j].materials[k]['evaluation'] = level;
                    }
                }
            }
        }
        this.database.getDatabase().updateDocument(this.patientsData_id, {
            "type": "data",
            "data": patientsData,
        });
        this.showData("data");
    };
    /*
    //Guarda avaliações dos materiais
    public setRating(rating) {
        /*
        let patientsData = this.database.getDatabase().getDocument(this.patientsData_id).data;
        ////console.log("Entrou no for");
        /*
        for(let i = 0; i < patientsData.length; i++) {
            for(let j = 0; j < patientsData[i].needs.length; j++) {
                for(let k = 0; k < patientsData[i].needs[j].materials.length; k++) {
                        patientsData[i].needs[j].materials[k]['ratings'] = [''];
                    
                }
            }
        }
        */ /*
    for(let i = 0; i < patientsData.length; i++) {
        for(let j = 0; j < patientsData[i].needs.length; j++) {
            for(let k = 0; k < patientsData[i].needs[j].materials.length; k++) {
                
                if(patientsData[i].needs[j].materials[k].id == rating.id_material) {
                    ////console.log(JSON.stringify(patientsData[i][j][k],null,4));
                    patientsData[i].needs[j].materials[k]['ratings'] = rating;
                }
            }
        }
    }
    ////console.log(JSON.stringify(patientsData,null,4));
    this.database.getDatabase().updateDocument(this.patientsData_id, {
        "type": "data",
        "data": patientsData,
    })
    
    this.showData("data");
}
*/
    DataService.prototype.getMaterialRating = function (material_id) {
    };
    DataService.prototype.getNeedMaterials = function () {
        //console.log('A devolver todos os materiais');
        return this.database.getDatabase().getDocument(this.materials_id).materials;
    };
    DataService.prototype.isPatientsRequestDone = function () {
        //console.log("A verificar se o pedido ao servidor já foi feito");
        if (this.database.getDatabase().getDocument(this.globalData_id).dataRequest == "false") {
            return false;
        }
        return true;
    };
    /**
     *
     *
     * @param {any} caregiverQuestionaires
     *
     * @memberof DataService
     */
    DataService.prototype.setQuizs = function (caregiverQuestionaires) {
        if (caregiverQuestionaires.length > 0) {
            //console.log("ENTROU AQUI E SETOU O EVALUATIONS A TRUE. Comprimento do array de quizes: " + caregiverQuestionaires.length);
            this.database.getDatabase().updateDocument(this.globalData_id, {
                "evaluationsToDo": "true",
                "type": "global",
                "dataRequest": "true"
            });
        }
        if (!this.isQuizsSet()) {
            //console.log('Novo doc de Quizs');
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
            //console.log('Já existem quizs na BD');
            var quizs = this.getQuizs();
            ////console.log(JSON.stringify(quizs, null, 4));
            caregiverQuestionaires.forEach(function (questionnaire_server) {
                same_quiz_found = false;
                quizs.forEach(function (questionnaire_BD) {
                    if (questionnaire_BD.id == questionnaire_server.id && questionnaire_BD.reference == questionnaire_server.reference && questionnaire_BD.reference_name == questionnaire_server.reference_name) {
                        //console.log('Encontrou quiz igual: id-' + questionnaire_BD.id + ' reference-' + questionnaire_BD.reference);
                        same_quiz_found = true;
                    }
                });
                if (!same_quiz_found) {
                    //console.log('Encontrei quizs novos;');
                    found_control = true;
                    quizs_to_add.push(questionnaire_server);
                }
            });
            //console.log(JSON.stringify(quizs_to_add));
            if (found_control) {
                quizs_to_add.forEach(function (quiz) {
                    quizs.push(quiz);
                });
            }
            //console.log(JSON.stringify(quizs, null, 4));
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
        }
        console.log("Depois do SetQuizs!");
        console.log(JSON.stringify(quizs, null, 4));
    };
    DataService.prototype.getAllQuizs = function () {
        //console.log("A obter ID dos quizs");
        if (this.database.getDatabase().executeQuery('quiz').length > 0) {
            ////console.log(JSON.stringify(this.database.getDatabase().executeQuery('quiz'), null, 4));
            return this.database.getDatabase().executeQuery('quiz');
        }
        //console.log('passou aqui');
        return null;
    };
    DataService.prototype.getLatestQuizData = function () {
        var quizs = this.getAllQuizs();
        if (quizs) {
            var lastQuiz;
            lastQuiz = quizs[quizs.length - 1];
            return lastQuiz._id;
        }
        ////console.log('passou aqui-1');
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
        ////console.log(this.quizs_id);
        ////console.log(JSON.stringify(this.database.getDatabase().getDocument(this.quizs_id)));
        ////console.log(this.database.getDatabase().executeQuery('quiz').length);
        if (this.quizs_id) {
            if (this.database.getDatabase().executeQuery('quiz').length > 0) {
                return this.database.getDatabase().getDocument(this.quizs_id).quiz;
            }
        }
        return null;
    };
    DataService.prototype.isGlobalSet = function () {
        //console.log("GLOBALSIZE: " + this.database.getDatabase().executeQuery('global').length);
        if (this.database.getDatabase().executeQuery('global').length > 0) {
            return true;
        }
        return false;
    };
    DataService.prototype.getGlobalsID = function () {
        if (this.database.getDatabase().executeQuery('global').length > 0) {
            ////console.log(JSON.stringify(this.database.getDatabase().executeQuery("global"), null, 4));
            return this.database.getDatabase().executeQuery('global')[0]._id;
        }
        return null;
    };
    DataService.prototype.getAllPatientsData = function () {
        if (this.database.getDatabase().executeQuery("data").length > 0) {
            // //console.log(JSON.stringify(this.database.getDatabase().executeQuery("data"), null, 4));
            return this.database.getDatabase().executeQuery("data");
        }
        return false;
    };
    DataService.prototype.updateQuizStatus = function (questionnaire) {
        console.log("A mudar estado de quiz na BD");
        var quizs = this.getQuizs();
        if (quizs) {
            quizs.forEach(function (element_quiz) {
                if (element_quiz.ref_questionnaire == questionnaire.ref_questionnaire) {
                    element_quiz.done = true;
                    for (var i = 0; i < element_quiz.questions.length; i++) {
                        element_quiz.questions[i].response = questionnaire.questions[i].response;
                    }
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
            ////console.log('passou aqui-2');
            var quiz_done = [];
            var found_quiz_todo = false;
            quiz_done.push(quizs.map(function (quizs) { return quizs.done; }));
            quiz_done[0].forEach(function (quiz_result) {
                //console.log("A verificar estado das avaliações");
                //console.log('1: ' + quiz_result);
                if (!quiz_result) {
                    found_quiz_todo = true;
                    //console.log("A mudar estado das avaliações");
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
        console.log('Terminou checkQuizstatus');
    };
    DataService.prototype.hasEvaluationsToDo = function () {
        //this.checkQuizStatus();
        /*
        //console.log('GLOBAL ID: ' + this.globalData_id);
        //console.log(JSON.stringify(this.database.getDatabase().getDocument(this.globalData_id), null, 4));
        //console.log('Evaluations to do:' + this.database.getDatabase().getDocument(this.globalData_id).evaluationsToDo)
        */
        if (this.database.getDatabase().getDocument(this.globalData_id).evaluationsToDo == "true") {
            return true;
        }
        return false;
    };
    DataService.prototype.isQuizsSet = function () {
        ////console.log('QUIZ-ID: ' + this.quizs_id);
        if (this.quizs_id) {
            return true;
        }
        return false;
    };
    DataService.prototype.deleteQuestionnaire = function (questionnaires) {
        console.log("A apagar quizs!");
        var quizs = this.getQuizs();
        var found_equal;
        var quizs_temp = [];
        ////console.log(JSON.stringify(quizs, null, 4));
        //console.log("Quizs da BD: ");
        //console.log(JSON.stringify(quizs, null, 4));
        //console.log("Quizs ENVIADOS: ");
        //console.log(JSON.stringify(questionnaires, null, 4));
        quizs.forEach(function (questionnaire_BD) {
            found_equal = false;
            //console.log("REFERENCIA DO QUIZ BD: " + questionnaire_BD.ref_questionnaire);
            questionnaires.forEach(function (questionnaire_sent) {
                //console.log("REFERENCIA DO QUIZ ENVIADO: " + questionnaire_sent.ref_questionnaire);
                if (questionnaire_sent.ref_questionnaire == questionnaire_BD.ref_questionnaire) {
                    //console.log("REFERENCIA DO QUIZ A ELIMINAR: " + questionnaire_sent.ref_questionnaire);
                    // quizs.splice(questionnaire_BD.ref_questionnaire, 1);
                    found_equal = true;
                }
            });
            if (!found_equal) {
                quizs_temp.push(questionnaire_BD);
            }
        });
        //console.log("Numero de quizes por fazer: " + quizs.length);
        //console.log(JSON.stringify(quizs, null, 4));
        quizs = quizs_temp;
        if (quizs.length == 0) {
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
            console.log('Após reindexação!');
            console.log(JSON.stringify(quizs, null, 4));
            this.database.getDatabase().updateDocument(this.quizs_id, {
                'quiz': quizs,
                'type': 'quiz'
            });
            console.log("NOVO ARRAY DE QUIZS NA BD");
            console.log(JSON.stringify(this.database.getDatabase().getDocument(this.quizs_id), null, 4));
        }
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
            ////console.log(JSON.stringify(this.database.getDatabase().executeQuery("quizOnHold"), null, 4));
            return this.database.getDatabase().executeQuery('quizOnHold')[0]._id;
        }
        return null;
    };
    DataService.prototype.getAllQuizsOnHold = function () {
        if (this.database.getDatabase().executeQuery('quizOnHold').length > 0) {
            ////console.log(JSON.stringify(this.database.getDatabase().executeQuery("quizOnHold"), null, 4));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGF0YS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxnQ0FBa0M7QUFDbEMsaUNBQStCO0FBSS9CLHNDQUEyQztBQU8zQyx1Q0FBc0M7QUFNdEMsSUFBYSxXQUFXO0lBaUJwQixxQkFBbUIsUUFBa0I7UUFDN0IsMkNBQTJDO1FBQzNDLHFDQUFxQztRQUNyQywwQkFBMEI7UUFDMUIsMEJBQTBCO1FBQzFCLDRCQUE0QjtRQUM1QiwwQkFBMEI7UUFOZixhQUFRLEdBQVIsUUFBUSxDQUFVO1FBUTdCLGlKQUFpSjtRQUNqSix3QkFBd0I7UUFDeEIsNkJBQTZCO1FBRTdCLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNaLDBCQUEwQjtRQUMxQixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRXRCLEVBQUU7SUFFVixDQUFDO0lBRUQsMEJBQUksR0FBSjtRQUNJLDBCQUEwQjtRQUMxQix3QkFBd0I7UUFDeEIsb0RBQW9EO1FBQ3BELDBDQUEwQztRQUMxQyxLQUFLO1FBQ0wsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNwQiwrQ0FBK0M7WUFDL0MsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7WUFDekMsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBRXpFLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUU7Z0JBQzNELE1BQU0sRUFBRSxRQUFRO2dCQUNoQixhQUFhLEVBQUUsT0FBTztnQkFDdEIsaUJBQWlCLEVBQUcsTUFBTSxDQUFDLGVBQWU7YUFDN0MsQ0FBQyxDQUFDO1FBSVAs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LGlCQUFVLEVBQUU7cUNBa0JvQixtQkFBUTtHQWpCNUIsV0FBVyxDQXluQnZCO0FBem5CWSxrQ0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGZzIGZyb20gXCJmaWxlLXN5c3RlbVwiO1xyXG5pbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL21hcCc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xyXG5pbXBvcnQgeyBDb25uZWN0b3JTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2Nvbm5lY3Rvci9jb25uZWN0b3Iuc2VydmljZSc7XHJcblxyXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgTWF0ZXJpYWxzIH0gZnJvbSBcIi4vbWF0ZXJpYWxzXCI7XHJcbmltcG9ydCB7IE1hdGVyaWFsIH0gZnJvbSBcIi4uLy4uL21hdGVyaWFsL21hdGVyaWFsXCI7XHJcbmltcG9ydCB7IERhdGEgfSBmcm9tIFwiLi9kYXRhXCI7XHJcbmltcG9ydCB7IE5lZWRzIH0gZnJvbSBcIi4vbmVlZHNcIjtcclxuaW1wb3J0IHsgUGF0aWVudCB9IGZyb20gXCIuLi8uLi9wYXRpZW50L3BhdGllbnRcIjtcclxuaW1wb3J0IHsgQ291Y2hiYXNlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1jb3VjaGJhc2VcIjtcclxuaW1wb3J0IHsgRGF0YWJhc2UgfSBmcm9tIFwiLi9kYXRhYmFzZVwiO1xyXG5pbXBvcnQgeyBVc2VyU2VydmljZSB9IGZyb20gJy4uL3VzZXIvdXNlci5zZXJ2aWNlJztcclxuXHJcblxyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgRGF0YVNlcnZpY2Uge1xyXG5cclxuICAgIHB1YmxpYyBwYXRpZW50c0RhdGFfaWQ6IGFueTtcclxuICAgIHB1YmxpYyB1c2VyRGF0YV9pZDogYW55O1xyXG4gICAgcHVibGljIG1hdGVyaWFsc19pZDogYW55O1xyXG4gICAgcHVibGljIHJhdGluZ3NfaWQ6IGFueTtcclxuICAgIHB1YmxpYyBnbG9iYWxEYXRhX2lkOiBhbnk7XHJcbiAgICBwdWJsaWMgcXVpenNfaWQ6IGFueTtcclxuICAgIHB1YmxpYyBxdWl6c19kb25lX2lkOiBhbnk7XHJcblxyXG4gICAgcHVibGljIFJlcXVlc3REYXRhX2NvbnRyb2w6IGFueTtcclxuXHJcbiAgICBwdWJsaWMgZmlsZTogZnMuRmlsZTtcclxuICAgIHB1YmxpYyBmb2xkZXI6IGZzLkZvbGRlcjtcclxuICAgIHB1YmxpYyBmb2xkZXJOYW1lOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgZmlsZU5hbWU6IHN0cmluZztcclxuIFxyXG4gICAgY29uc3RydWN0b3IocHVibGljIGRhdGFiYXNlOiBEYXRhYmFzZSl7XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ0luc3RhbmNpb3UgLSBEYXRhU2VydmljZSEnKTtcclxuICAgICAgICAgICAgLy90aGlzLmRhdGEgPSBkYXRhYmFzZS5nZXREYXRhYmFzZSgpO1xyXG4gICAgICAgICAgICAvL3RoaXMuZGVsZXRlRGF0YSgncXVpeicpO1xyXG4gICAgICAgICAgICAvL3RoaXMuZGVsZXRlRGF0YSgndXNlcicpO1xyXG4gICAgICAgICAgICAvL3RoaXMuZGVsZXRlRGF0YSgnZ2xvYmFsJyk7XHJcbiAgICAgICAgICAgIC8vdGhpcy5kZWxldGVEYXRhKCdkYXRhJyk7XHJcblxyXG4gICAgICAgICAgICAvL3RoaXMuc2hvd0RhdGEoJ2RhdGEnKTsgLy9Fc3RhIGEgZGFyIGV4Y2VwY2FvIGUgYSBpbXByaW1pciBvcyB1c2VycyB0Yj8/PyEhISEhIChwb3IgY29uZmlybWFyKSBwcSBuIHRlbSBkYWRvcyBlIGVzdG9pcmE/PyBtYXMgaW1wcmltZSBvIHVzZXIgcHE/XHJcbiAgICAgICAgICAgIC8vdGhpcy5zaG93RGF0YSgndXNlcicpO1xyXG4gICAgICAgICAgICAvL3RoaXMuc2hvd0RhdGEoJ21hdGVyaWFscycpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5pbml0KCk7XHJcbiAgICAgICAgICAgIC8vdGhpcy5zaG93RGF0YSgnZ2xvYmFsJyk7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd0RhdGEoJ3F1aXonKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vXHJcbiAgICAgICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGluaXQoKSB7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIkJEIFVTQURBXCIpO1xyXG4gICAgICAgIC8vdGhpcy5zaG93RGF0YShcInF1aXpcIik7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZygnQSBpbmljaWFsaXphciBhcyB2YXJpw6F2ZWlzIGdsb2JhaXMnKTtcclxuICAgICAgICAvL0FkaWNpb25hciBudW1lcm8gZGUgYXZhbGlhw6fDtWVzIHBlbmRlbnRlc1xyXG4gICAgICAgIC8vLi4uXHJcbiAgICAgICAgaWYodGhpcy5pc0dsb2JhbFNldCgpKSB7XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ0EgYXR1YWxpemFyIGdsb2JhbCBkZSBjb25leGFvJyk7XHJcbiAgICAgICAgICAgIHRoaXMuZ2xvYmFsRGF0YV9pZCA9IHRoaXMuZ2V0R2xvYmFsc0lEKCk7XHJcbiAgICAgICAgICAgIHZhciBnbG9iYWwgPSB0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZ2V0RG9jdW1lbnQodGhpcy5nbG9iYWxEYXRhX2lkKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS51cGRhdGVEb2N1bWVudCh0aGlzLmdsb2JhbERhdGFfaWQsIHtcclxuICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImdsb2JhbFwiLFxyXG4gICAgICAgICAgICAgICAgXCJkYXRhUmVxdWVzdFwiOiBcImZhbHNlXCIsXHJcbiAgICAgICAgICAgICAgICBcImV2YWx1YXRpb25zVG9Eb1wiIDogZ2xvYmFsLmV2YWx1YXRpb25zVG9Eb1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkodGhpcy5nbG9iYWxEYXRhX2lkKSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ0EgY3JpYXIgb2JqZXRvIHBhcmEgYXMgdmFyacOhdmVpcyBnbG9iYWlzJyk7XHJcbiAgICAgICAgICAgIC8vY3JpYXIgdmFyacOhdmVsIGdsb2JhbCBib29sZWFuIHBhcmEgZGl6ZXIgc2UgaMOhIHF1aXplcyBwYXJhIGZhemVyIHVwZGF0ZSBvdSBuXHJcbiAgICAgICAgICAgIHRoaXMuZ2xvYmFsRGF0YV9pZCA9IHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5jcmVhdGVEb2N1bWVudCh7XHJcbiAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJnbG9iYWxcIixcclxuICAgICAgICAgICAgICAgIFwiZGF0YVJlcXVlc3RcIjogXCJmYWxzZVwiLFxyXG4gICAgICAgICAgICAgICAgXCJldmFsdWF0aW9uc1RvRG9cIiA6IFwiZmFsc2VcIlxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgLy8vL2NvbnNvbGUubG9nKCdOT1ZPIEdMT0JBTCBJRDogJyArIHRoaXMuZ2xvYmFsRGF0YV9pZCk7ICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnVzZXJEYXRhX2lkID0gdGhpcy5nZXRDdXJyZW50VXNlckRvY0lEKCk7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIlFVSVpTIFVTRVIgRE9DIElEOiBcIiArIHRoaXMudXNlckRhdGFfaWQpO1xyXG4gICAgICAgIHRoaXMucGF0aWVudHNEYXRhX2lkID0gdGhpcy5nZXRMYXRlc3RQYXRpZW50RGF0YSgpO1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coXCJQQVRJRU5UUyBET0MgSUQ6IFwiICsgdGhpcy5wYXRpZW50c0RhdGFfaWQpO1xyXG4gICAgICAgIHRoaXMucXVpenNfaWQgPSB0aGlzLmdldExhdGVzdFF1aXpEYXRhKCk7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIlFVSVpTIERPQyBJRDogXCIgKyB0aGlzLnF1aXpzX2lkKTtcclxuICAgICAgICAvL3RoaXMucXVpenNfZG9uZV9pZCA9IHRoaXMuZ2V0UXVpenNPbkhvbGRfSUQoKTtcclxuXHJcbiAgICAgICAgLy92ZXJpZmljYXIgc2UgaMOhIHF1ZXN0aW9uw6FyaW9zIHBhcmEgcHJlZW5jaGVyXHJcbiAgICAgICAgLy90aGlzLmNoZWNrUXVpelN0YXR1cygpO1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG4gICAgc3luYygpIHtcclxuICAgICAgICAvKlxyXG4gICAgICAgIHRoaXMuY29ubmVjdG9yU2VydmljZS5nZXRQYXRpZW50cygpXHJcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgIChyZXN1bHQpID0+IHRoaXMub25HZXREYXRhU3VjY2VzcyhyZXN1bHQpLFxyXG4gICAgICAgICAgICAoZXJyb3IpID0+IHRoaXMub25HZXREYXRhRXJyb3IoZXJyb3IpXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICovXHJcbiAgICB9XHJcbiBcclxuICAgIHNldFVzZXIocmVnaXN0ZXJlZFVzZXIpIHtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKCdBIGdyYXZhciBvIHV0aWxpemFkb3InKTtcclxuICAgICAgICB0aGlzLnVzZXJEYXRhX2lkID0gdGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmNyZWF0ZURvY3VtZW50KHtcclxuICAgICAgICAgICAgXCJ0eXBlXCI6IFwidXNlclwiLFxyXG4gICAgICAgICAgICBcInVzZXJcIjogcmVnaXN0ZXJlZFVzZXJcclxuICAgICAgICB9KTtcclxuICAgICAgICAvLy8vY29uc29sZS5sb2coXCJBUVVJXCIrSlNPTi5zdHJpbmdpZnkodGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmdldERvY3VtZW50KHRoaXMudXNlckRhdGFfaWQsIG51bGwsIDQpKSk7XHJcbiAgICB9XHJcbiAgICBzZXRQYXRpZW50cygpIHtcclxuXHJcbiAgICB9XHJcbiAgICBzZXRNYXRlcmlhbHMoKSB7XHJcblxyXG4gICAgfVxyXG4gICAgZ2V0UGF0aWVudHNEYXRhKCl7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZygnQSBkZXZvbHZlciB0b2RvcyBvcyBkYWRvcyBkYSBCRCcpO1xyXG4gICAgICAgIC8vY29uc29sZS5sb2codGhpcy5wYXRpZW50c0RhdGFfaWQpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZ2V0RG9jdW1lbnQodGhpcy5wYXRpZW50c0RhdGFfaWQpLmRhdGE7XHJcbiAgICB9XHJcbiAgICBzZXRQYXRpZW50c0RhdGEoZGF0YSkge1xyXG4gICAgICAgIC8vZGVidWdcclxuICAgICAgICAvL3RoaXMuZGVsZXRlRGF0YSgnZGF0YScpO1xyXG4gICAgICAgIC8vdGhpcy5kZWxldGVEYXRhKCdtYXRlcmlhbHMnKTtcclxuICAgICAgICBcclxuICAgICAgICAvL1RvZG9zIG9zIGRhZG9zIGRvIHBhY2llbnRlIGUgcmVmIF9pZFxyXG4gICAgICAgIGlmKHRoaXMucGF0aWVudHNEYXRhX2lkKSB7XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ0EgYXR1YWxpemFyIG9zIGRhZG9zIGRvcyBwYWNpZW50ZXMgbmEgYmQsIGNvbSBvIGlkICcgKyB0aGlzLnBhdGllbnRzRGF0YV9pZCk7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS51cGRhdGVEb2N1bWVudCh0aGlzLnBhdGllbnRzRGF0YV9pZCwge1xyXG4gICAgICAgICAgICAgICAgXCJkYXRhXCI6IGRhdGEsXHJcbiAgICAgICAgICAgICAgICBcInR5cGVcIiA6IFwiZGF0YVwiXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ0dyYXZhciBkYWRvcyBQYWNpZW50ZXMnKTtcclxuICAgICAgICAgICAgdGhpcy5wYXRpZW50c0RhdGFfaWQgPSB0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuY3JlYXRlRG9jdW1lbnQoe1xyXG4gICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGF0YVwiLFxyXG4gICAgICAgICAgICAgICAgXCJkYXRhXCI6IGRhdGFcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL3RoaXMubWVkaWFQZXJzaXN0ZW5jZShkYXRhKTtcclxuICAgICAgICBcclxuXHJcbiAgICAgICAgLy9HdWFyZGEgZGFkb3MgZG9zIFBhY2llbnRlc1xyXG4gICAgICAgIC8vR3VhcmRhIGRhZG9zIGRhcyBuZWNlc3NpZGFkZXNcclxuICAgICAgICB2YXIgZ2xvYmFsID0gdGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmdldERvY3VtZW50KHRoaXMuZ2xvYmFsRGF0YV9pZCk7XHJcblxyXG4gICAgICAgIHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS51cGRhdGVEb2N1bWVudCh0aGlzLmdsb2JhbERhdGFfaWQsIHtcclxuICAgICAgICAgICAgXCJ0eXBlXCIgOiBcImdsb2JhbFwiLFxyXG4gICAgICAgICAgICBcImRhdGFSZXF1ZXN0XCI6IFwidHJ1ZVwiLFxyXG4gICAgICAgICAgICBcImV2YWx1YXRpb25zVG9Eb1wiIDogZ2xvYmFsLmV2YWx1YXRpb25zVG9Eb1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9KTtcclxuICAgICAgICAvL3ZlciBvIGdldCBkb2N1bWVudCB0YiBlIGNvbXBhcmFyXHJcbiAgICAgICAgdGhpcy5zaG93RGF0YSgnZ2xvYmFsJyk7XHJcbiAgICB9XHJcbiAgICBtZWRpYVBlcnNpc3RlbmNlKGRhdGEpIHtcclxuICAgICAgICAgIC8qKlxyXG4gICAgICAgICAqIEFicmlyIHRvZG8gbyBjb250ZcO6ZG8gZGEgcGFzdGEgbWF0ZXJpYWxzXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdmFyIGRvY3VtZW50cyA9IGZzLmtub3duRm9sZGVycy5kb2N1bWVudHMoKTtcclxuICAgICAgICB2YXIgcGF0aCA9IGZzLnBhdGguam9pbihkb2N1bWVudHMucGF0aCwgXCJhcHAvbWF0ZXJpYWxzXCIpO1xyXG5cclxuICAgICAgICAvLy8vY29uc29sZS5sb2cocGF0aCk7XHJcbiAgICB9XHJcbiAgXHJcbiAgICBzZXROZWVkcygpIHtcclxuXHJcbiAgICB9XHJcbiAgICBnZXRUb2tlbigpOiBzdHJpbmcge1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coJ0EgZGV2b2x2ZXIgdG9rZW4nKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmdldERvY3VtZW50KHRoaXMudXNlckRhdGFfaWQpLnVzZXIuY2FyZWdpdmVyX3Rva2VuO1xyXG4gICAgfVxyXG4gICAgZ2V0VXNlcklEKCk6IHN0cmluZyB7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZygnQSBvIElEIGRvIHVzZXInKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmdldERvY3VtZW50KHRoaXMudXNlckRhdGFfaWQpLnVzZXIuaWQ7XHJcbiAgICB9XHJcbiAgICBnZXRMYXRlc3RVc2VyVG9SZWdpc3RlcigpIHtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKFwiQSBkZXZvbHZlciB1bHRpbW8gdXRpbGl6YWRvciByZWdpc3RhZG9cIilcclxuICAgICAgICB2YXIgdXNlcnMgPSB0aGlzLmdldEFsbFVzZXJzKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYodXNlcnMpIHtcclxuICAgICAgICAgICAgdmFyIGxhc3RVc2VyO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpIGluIHVzZXJzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodXNlcnMuaGFzT3duUHJvcGVydHkoaSkgJiYgdHlwZW9mKGkpICE9PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGFzdFVzZXIgPSB1c2Vyc1tpXTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gbGFzdFVzZXIudXNlcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGRlbGV0ZURhdGEodmlldykge1xyXG4gICAgICAgIGxldCBkb2N1bWVudHMgPSB0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZXhlY3V0ZVF1ZXJ5KHZpZXcpO1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coJ0EgYXBhZ2FyIGJkOiAnICsgdmlldyk7XHJcbiAgICAgICAgLy8gbG9vcCBvdmVyIGFsbCBkb2N1bWVudHNcclxuICAgICAgICBpZih0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZXhlY3V0ZVF1ZXJ5KHZpZXcpLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkb2N1bWVudHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIC8vIGRlbGV0ZSBlYWNoIGRvY3VtZW50XHJcbiAgICAgICAgICAgICAgICAvLyBjb3VjaGJhc2Ugd2lsbCBhc3NpZ24gYW4gaWQgKF9pZCkgdG8gYSBkb2N1bWVudCB3aGVuIGNyZWF0ZWRcclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5kZWxldGVEb2N1bWVudChkb2N1bWVudHNbaV0uX2lkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRBbGxVc2Vycygpe1xyXG4gICAgICAgIGlmKHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5leGVjdXRlUXVlcnkoXCJ1c2VyXCIpLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5leGVjdXRlUXVlcnkoXCJ1c2VyXCIpO1xyXG4gICAgICAgIH0gICAgICAgICBcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2hvd0RhdGEodmlldykge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdBIG1vc3RyYXIgYmQ6ICcgKyB2aWV3ICsgJyBjb20gJyArIHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5leGVjdXRlUXVlcnkodmlldykubGVuZ3RoICsgJyBlbGVtZW50b3MnKTtcclxuICAgICAgICBpZih0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZXhlY3V0ZVF1ZXJ5KHZpZXcpLmxlbmd0aCA+IDApIHsgICAgIFxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeSh0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZXhlY3V0ZVF1ZXJ5KHZpZXcpLCBudWxsLCA0KSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgIHB1YmxpYyBvbkNyZWF0ZUZpbGUoKSB7XHJcbiAgICAgICAgLy8gPj4gZnMtY3JlYXRlLWFsbC1jb2RlXHJcbiAgICAgICAgbGV0IGRvY3VtZW50cyA9IGZzLmtub3duRm9sZGVycy5kb2N1bWVudHMoKTtcclxuICAgICAgICB0aGlzLmZvbGRlciA9IGRvY3VtZW50cy5nZXRGb2xkZXIodGhpcy5mb2xkZXJOYW1lIHx8IFwidGVzdEZvbGRlclwiKTtcclxuICAgICAgICB0aGlzLmZpbGUgPSB0aGlzLmZvbGRlci5nZXRGaWxlKCh0aGlzLmZpbGVOYW1lIHx8IFwidGVzdEZpbGVcIikgKyBcIi50eHRcIik7XHJcblxyXG4gICAgICAgIFxyXG4gICAgICAgIC8qXHJcbiAgICAgICAgdGhpcy5maWxlLndyaXRlVGV4dCh0aGlzLmZpbGVUZXh0Q29udGVudCB8fCBcInNvbWUgcmFuZG9tIGNvbnRlbnRcIilcclxuICAgICAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgICAgIC8vIFN1Y2NlZWRlZCB3cml0aW5nIHRvIHRoZSBmaWxlLlxyXG4gICAgICAgICAgICAgICAgdGhpcy5maWxlLnJlYWRUZXh0KClcclxuICAgICAgICAgICAgICAgICAgICAudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN1Y2Nlc3NNZXNzYWdlID0gXCJTdWNjZXNzZnVsbHkgc2F2ZWQgaW4gXCIgKyB0aGlzLmZpbGUucGF0aDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy53cml0dGVuQ29udGVudCA9IHJlcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0l0ZW1WaXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSkuY2F0Y2goZXJyID0+IHtcclxuICAgICAgICAgICAgICAgIC8vIEVycm9yXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIC8vIDw8IGZzLWNyZWF0ZS1hbGwtY29kZVxyXG4gICAgICAgICovXHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0Q3VycmVudFVzZXJEb2NJRCgpIHtcclxuICAgICAgICB2YXIgdXNlcnMgPSB0aGlzLmdldEFsbFVzZXJzKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYodXNlcnMpIHtcclxuICAgICAgICAgICAgdmFyIGxhc3RVc2VyO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpIGluIHVzZXJzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodXNlcnMuaGFzT3duUHJvcGVydHkoaSkgJiYgdHlwZW9mKGkpICE9PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGFzdFVzZXIgPSB1c2Vyc1tpXTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gbGFzdFVzZXIuX2lkO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBpc1VzZXJBdXRoKCkge1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coJ0EgdmVyaWZpY2FyIHNlIGV4aXN0ZSB1dGlsaXphZG9yIG5hIEJEJyk7XHJcbiAgICAgICAgaWYodGhpcy51c2VyRGF0YV9pZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlOyBcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXRSYXRpbmcobWF0ZXJpYWw6IE1hdGVyaWFsLCBsZXZlbCkge1xyXG4gICAgICAgIGxldCBwYXRpZW50c0RhdGEgPSB0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZ2V0RG9jdW1lbnQodGhpcy5wYXRpZW50c0RhdGFfaWQpLmRhdGE7XHJcbiAgICAgICAgXHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHBhdGllbnRzRGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBmb3IobGV0IGogPSAwOyBqIDwgcGF0aWVudHNEYXRhW2ldLm5lZWRzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IobGV0IGsgPSAwOyBrIDwgcGF0aWVudHNEYXRhW2ldLm5lZWRzW2pdLm1hdGVyaWFscy5sZW5ndGg7IGsrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHBhdGllbnRzRGF0YVtpXS5uZWVkc1tqXS5tYXRlcmlhbHNba10uaWQgPT0gbWF0ZXJpYWwuaWQpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vLy9jb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShwYXRpZW50c0RhdGFbaV1bal1ba10sbnVsbCw0KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhdGllbnRzRGF0YVtpXS5uZWVkc1tqXS5tYXRlcmlhbHNba11bJ2V2YWx1YXRpb24nXSA9IGxldmVsOyAgICBcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLnVwZGF0ZURvY3VtZW50KHRoaXMucGF0aWVudHNEYXRhX2lkLCB7XHJcbiAgICAgICAgICAgIFwidHlwZVwiOiBcImRhdGFcIixcclxuICAgICAgICAgICAgXCJkYXRhXCI6IHBhdGllbnRzRGF0YSxcclxuICAgICAgICB9KVxyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuc2hvd0RhdGEoXCJkYXRhXCIpO1xyXG4gICAgfVxyXG4gICAgLypcclxuICAgIC8vR3VhcmRhIGF2YWxpYcOnw7VlcyBkb3MgbWF0ZXJpYWlzXHJcbiAgICBwdWJsaWMgc2V0UmF0aW5nKHJhdGluZykge1xyXG4gICAgICAgIC8qXHJcbiAgICAgICAgbGV0IHBhdGllbnRzRGF0YSA9IHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5nZXREb2N1bWVudCh0aGlzLnBhdGllbnRzRGF0YV9pZCkuZGF0YTtcclxuICAgICAgICAvLy8vY29uc29sZS5sb2coXCJFbnRyb3Ugbm8gZm9yXCIpO1xyXG4gICAgICAgIC8qXHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHBhdGllbnRzRGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBmb3IobGV0IGogPSAwOyBqIDwgcGF0aWVudHNEYXRhW2ldLm5lZWRzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IobGV0IGsgPSAwOyBrIDwgcGF0aWVudHNEYXRhW2ldLm5lZWRzW2pdLm1hdGVyaWFscy5sZW5ndGg7IGsrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXRpZW50c0RhdGFbaV0ubmVlZHNbal0ubWF0ZXJpYWxzW2tdWydyYXRpbmdzJ10gPSBbJyddO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgICovLypcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgcGF0aWVudHNEYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaiA9IDA7IGogPCBwYXRpZW50c0RhdGFbaV0ubmVlZHMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgIGZvcihsZXQgayA9IDA7IGsgPCBwYXRpZW50c0RhdGFbaV0ubmVlZHNbal0ubWF0ZXJpYWxzLmxlbmd0aDsgaysrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgaWYocGF0aWVudHNEYXRhW2ldLm5lZWRzW2pdLm1hdGVyaWFsc1trXS5pZCA9PSByYXRpbmcuaWRfbWF0ZXJpYWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8vL2NvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHBhdGllbnRzRGF0YVtpXVtqXVtrXSxudWxsLDQpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGF0aWVudHNEYXRhW2ldLm5lZWRzW2pdLm1hdGVyaWFsc1trXVsncmF0aW5ncyddID0gcmF0aW5nOyAgICBcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8vL2NvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHBhdGllbnRzRGF0YSxudWxsLDQpKTtcclxuICAgICAgICB0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkudXBkYXRlRG9jdW1lbnQodGhpcy5wYXRpZW50c0RhdGFfaWQsIHtcclxuICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGF0YVwiLFxyXG4gICAgICAgICAgICBcImRhdGFcIjogcGF0aWVudHNEYXRhLFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5zaG93RGF0YShcImRhdGFcIik7XHJcbiAgICB9XHJcbiAgICAqL1xyXG4gICAgcHVibGljIGdldE1hdGVyaWFsUmF0aW5nKG1hdGVyaWFsX2lkKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXROZWVkTWF0ZXJpYWxzKCkge1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coJ0EgZGV2b2x2ZXIgdG9kb3Mgb3MgbWF0ZXJpYWlzJyk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5nZXREb2N1bWVudCh0aGlzLm1hdGVyaWFsc19pZCkubWF0ZXJpYWxzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpc1BhdGllbnRzUmVxdWVzdERvbmUoKSB7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIkEgdmVyaWZpY2FyIHNlIG8gcGVkaWRvIGFvIHNlcnZpZG9yIGrDoSBmb2kgZmVpdG9cIik7XHJcbiAgICAgICAgaWYodGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmdldERvY3VtZW50KHRoaXMuZ2xvYmFsRGF0YV9pZCkuZGF0YVJlcXVlc3QgPT0gXCJmYWxzZVwiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHthbnl9IGNhcmVnaXZlclF1ZXN0aW9uYWlyZXMgXHJcbiAgICAgKiBcclxuICAgICAqIEBtZW1iZXJvZiBEYXRhU2VydmljZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0UXVpenMoY2FyZWdpdmVyUXVlc3Rpb25haXJlcykge1xyXG5cclxuICAgICAgICBpZihjYXJlZ2l2ZXJRdWVzdGlvbmFpcmVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIkVOVFJPVSBBUVVJIEUgU0VUT1UgTyBFVkFMVUFUSU9OUyBBIFRSVUUuIENvbXByaW1lbnRvIGRvIGFycmF5IGRlIHF1aXplczogXCIgKyBjYXJlZ2l2ZXJRdWVzdGlvbmFpcmVzLmxlbmd0aCk7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS51cGRhdGVEb2N1bWVudCh0aGlzLmdsb2JhbERhdGFfaWQsIHtcclxuICAgICAgICAgICAgICAgIFwiZXZhbHVhdGlvbnNUb0RvXCIgOiBcInRydWVcIixcclxuICAgICAgICAgICAgICAgIFwidHlwZVwiIDogXCJnbG9iYWxcIixcclxuICAgICAgICAgICAgICAgIFwiZGF0YVJlcXVlc3RcIiA6IFwidHJ1ZVwiXHJcbiAgICAgICAgICAgIH0pOyAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZighdGhpcy5pc1F1aXpzU2V0KCkpIHtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnTm92byBkb2MgZGUgUXVpenMnKTtcclxuICAgICAgICAgICAgdGhpcy5xdWl6c19pZCA9IHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5jcmVhdGVEb2N1bWVudCh7XHJcbiAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJxdWl6XCIsXHJcbiAgICAgICAgICAgICAgICBcInF1aXpcIjogY2FyZWdpdmVyUXVlc3Rpb25haXJlc1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5zaG93RGF0YSgncXVpeicpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHZhciBxdWl6c190b19hZGQgPSBbXTtcclxuICAgICAgICAgICAgdmFyIGZvdW5kX2NvbnRyb2wgPSBmYWxzZTsgLy92YXJpYXZlbCBkZSBjb250cm9sZSBkZSBub3ZvcyBxdWl6cyBhIGFkaWNpb25hclxyXG4gICAgICAgICAgICB2YXIgc2FtZV9xdWl6X2ZvdW5kID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdKw6EgZXhpc3RlbSBxdWl6cyBuYSBCRCcpO1xyXG4gICAgICAgICAgICB2YXIgcXVpenMgPSB0aGlzLmdldFF1aXpzKCk7XHJcbiAgICAgICAgICAgIC8vLy9jb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShxdWl6cywgbnVsbCwgNCkpO1xyXG4gICAgICAgICAgICBjYXJlZ2l2ZXJRdWVzdGlvbmFpcmVzLmZvckVhY2gocXVlc3Rpb25uYWlyZV9zZXJ2ZXIgPT4ge1xyXG4gICAgICAgICAgICAgICAgc2FtZV9xdWl6X2ZvdW5kID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBxdWl6cy5mb3JFYWNoKHF1ZXN0aW9ubmFpcmVfQkQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHF1ZXN0aW9ubmFpcmVfQkQuaWQgPT0gcXVlc3Rpb25uYWlyZV9zZXJ2ZXIuaWQgJiYgcXVlc3Rpb25uYWlyZV9CRC5yZWZlcmVuY2UgPT0gcXVlc3Rpb25uYWlyZV9zZXJ2ZXIucmVmZXJlbmNlICYmIHF1ZXN0aW9ubmFpcmVfQkQucmVmZXJlbmNlX25hbWUgPT0gcXVlc3Rpb25uYWlyZV9zZXJ2ZXIucmVmZXJlbmNlX25hbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnRW5jb250cm91IHF1aXogaWd1YWw6IGlkLScgKyBxdWVzdGlvbm5haXJlX0JELmlkICsgJyByZWZlcmVuY2UtJyArIHF1ZXN0aW9ubmFpcmVfQkQucmVmZXJlbmNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2FtZV9xdWl6X2ZvdW5kID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGlmKCFzYW1lX3F1aXpfZm91bmQpIHtcclxuICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdFbmNvbnRyZWkgcXVpenMgbm92b3M7Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgZm91bmRfY29udHJvbCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgcXVpenNfdG9fYWRkLnB1c2gocXVlc3Rpb25uYWlyZV9zZXJ2ZXIpO1xyXG4gICAgICAgICAgICAgICAgfSAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkocXVpenNfdG9fYWRkKSk7XHJcbiAgICAgICAgICAgIGlmKGZvdW5kX2NvbnRyb2wpIHtcclxuICAgICAgICAgICAgICAgIHF1aXpzX3RvX2FkZC5mb3JFYWNoKHF1aXogPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHF1aXpzLnB1c2gocXVpeik7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHF1aXpzLCBudWxsLCA0KSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvL2luZGV4IGFycmF5XHJcbiAgICAgICAgICAgIGxldCBpbmRleCA9IDA7XHJcbiAgICAgICAgICAgIHF1aXpzLmZvckVhY2goZWxlbWVudCA9PiB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQucmVmX3F1ZXN0aW9ubmFpcmUgPSBpbmRleCArIFwiXCI7XHJcbiAgICAgICAgICAgIGluZGV4Kys7XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS51cGRhdGVEb2N1bWVudCh0aGlzLnF1aXpzX2lkLCB7XHJcbiAgICAgICAgICAgICAgICAncXVpeicgOiBxdWl6cyxcclxuICAgICAgICAgICAgICAgICd0eXBlJyA6ICdxdWl6J1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkodGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmV4ZWN1dGVRdWVyeSgncXVpeicpWzBdLnF1aXopKTtcclxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2codGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmV4ZWN1dGVRdWVyeSgncXVpeicpWzBdLnF1aXoubGVuZ3RoICsgJyBlbGVtZW50b3MnKTsgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRGVwb2lzIGRvIFNldFF1aXpzIVwiKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkocXVpenMsIG51bGwsIDQpKVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRBbGxRdWl6cygpIHtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKFwiQSBvYnRlciBJRCBkb3MgcXVpenNcIik7XHJcbiAgICAgICAgaWYodGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmV4ZWN1dGVRdWVyeSgncXVpeicpLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgLy8vL2NvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5leGVjdXRlUXVlcnkoJ3F1aXonKSwgbnVsbCwgNCkpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmV4ZWN1dGVRdWVyeSgncXVpeicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL2NvbnNvbGUubG9nKCdwYXNzb3UgYXF1aScpO1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldExhdGVzdFF1aXpEYXRhKCkge1xyXG4gICAgICAgIHZhciBxdWl6cyA9IHRoaXMuZ2V0QWxsUXVpenMoKTtcclxuXHJcbiAgICAgICAgaWYocXVpenMpIHtcclxuICAgICAgICAgICAgdmFyIGxhc3RRdWl6O1xyXG5cclxuICAgICAgICAgICAgbGFzdFF1aXogPSBxdWl6c1txdWl6cy5sZW5ndGggLSAxXTtcclxuICAgICAgICAgICAgcmV0dXJuIGxhc3RRdWl6Ll9pZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8vL2NvbnNvbGUubG9nKCdwYXNzb3UgYXF1aS0xJyk7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0TGF0ZXN0UGF0aWVudERhdGEoKSB7XHJcbiAgICAgICAgdmFyIHBhdGllbnRzRGF0YSA9IHRoaXMuZ2V0QWxsUGF0aWVudHNEYXRhKCk7XHJcblxyXG4gICAgICAgIGlmKHBhdGllbnRzRGF0YSkge1xyXG4gICAgICAgICAgICB2YXIgbGFzdERhdGE7XHJcblxyXG4gICAgICAgICAgICBsYXN0RGF0YSA9IHBhdGllbnRzRGF0YVtwYXRpZW50c0RhdGEubGVuZ3RoIC0gMV07XHJcbiAgICAgICAgICAgIHJldHVybiBsYXN0RGF0YS5faWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldFF1aXpzKCkge1xyXG4gICAgICAgIC8vLy9jb25zb2xlLmxvZyh0aGlzLnF1aXpzX2lkKTtcclxuICAgICAgICAvLy8vY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkodGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmdldERvY3VtZW50KHRoaXMucXVpenNfaWQpKSk7XHJcbiAgICAgICAgLy8vL2NvbnNvbGUubG9nKHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5leGVjdXRlUXVlcnkoJ3F1aXonKS5sZW5ndGgpO1xyXG4gICAgICAgIGlmKHRoaXMucXVpenNfaWQpIHtcclxuICAgICAgICAgICAgaWYodGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmV4ZWN1dGVRdWVyeSgncXVpeicpLmxlbmd0aCA+IDApIHsgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5nZXREb2N1bWVudCh0aGlzLnF1aXpzX2lkKS5xdWl6O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGlzR2xvYmFsU2V0KCkge1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coXCJHTE9CQUxTSVpFOiBcIiArIHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5leGVjdXRlUXVlcnkoJ2dsb2JhbCcpLmxlbmd0aCk7XHJcbiAgICAgICAgaWYodGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmV4ZWN1dGVRdWVyeSgnZ2xvYmFsJykubGVuZ3RoID4gMCkgeyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldEdsb2JhbHNJRCgpIHtcclxuICAgICAgICBpZih0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZXhlY3V0ZVF1ZXJ5KCdnbG9iYWwnKS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIC8vLy9jb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeSh0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZXhlY3V0ZVF1ZXJ5KFwiZ2xvYmFsXCIpLCBudWxsLCA0KSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmV4ZWN1dGVRdWVyeSgnZ2xvYmFsJylbMF0uX2lkO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRBbGxQYXRpZW50c0RhdGEoKSB7XHJcbiAgICAgICAgaWYodGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmV4ZWN1dGVRdWVyeShcImRhdGFcIikubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAvLyAvL2NvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5leGVjdXRlUXVlcnkoXCJkYXRhXCIpLCBudWxsLCA0KSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZXhlY3V0ZVF1ZXJ5KFwiZGF0YVwiKTtcclxuICAgICAgICB9ICAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHVwZGF0ZVF1aXpTdGF0dXMocXVlc3Rpb25uYWlyZSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiQSBtdWRhciBlc3RhZG8gZGUgcXVpeiBuYSBCRFwiKTsgICAgICAgXHJcbiAgICAgICAgdmFyIHF1aXpzID0gdGhpcy5nZXRRdWl6cygpO1xyXG4gICAgICAgIGlmKHF1aXpzKSB7XHJcbiAgICAgICAgICAgIHF1aXpzLmZvckVhY2goZWxlbWVudF9xdWl6ID0+IHtcclxuICAgICAgICAgICAgICAgaWYoZWxlbWVudF9xdWl6LnJlZl9xdWVzdGlvbm5haXJlID09IHF1ZXN0aW9ubmFpcmUucmVmX3F1ZXN0aW9ubmFpcmUpIHtcclxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50X3F1aXouZG9uZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGVsZW1lbnRfcXVpei5xdWVzdGlvbnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudF9xdWl6LnF1ZXN0aW9uc1tpXS5yZXNwb25zZSA9IHF1ZXN0aW9ubmFpcmUucXVlc3Rpb25zW2ldLnJlc3BvbnNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkudXBkYXRlRG9jdW1lbnQodGhpcy5xdWl6c19pZCwge1xyXG4gICAgICAgICAgICAgICAgJ3F1aXonIDogcXVpenMsXHJcbiAgICAgICAgICAgICAgICAndHlwZScgOiAncXVpeidcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIC8vdGhpcy5zaG93RGF0YSgncXVpeicpO1xyXG4gICAgICAgICAgICB0aGlzLmNoZWNrUXVpelN0YXR1cygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIGNoZWNrUXVpelN0YXR1cygpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnQSBWRVJJRklDQVIgU0UgSEEgUVVJWlMgUE9SIEZBWkVSJyk7XHJcbiAgICAgICAgdmFyIHF1aXpzID0gdGhpcy5nZXRRdWl6cygpO1xyXG4gICAgICAgIHZhciBnbG9iYWwgPSB0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZ2V0RG9jdW1lbnQodGhpcy5nbG9iYWxEYXRhX2lkKTtcclxuXHJcbiAgICAgICAgaWYocXVpenMpIHtcclxuICAgICAgICAgICAgLy8vL2NvbnNvbGUubG9nKCdwYXNzb3UgYXF1aS0yJyk7XHJcbiAgICAgICAgICAgIHZhciBxdWl6X2RvbmUgPSBbXTtcclxuICAgICAgICAgICAgdmFyIGZvdW5kX3F1aXpfdG9kbyA9IGZhbHNlO1xyXG4gICAgICAgICAgICBxdWl6X2RvbmUucHVzaChxdWl6cy5tYXAoZnVuY3Rpb24ocXVpenMpe3JldHVybiBxdWl6cy5kb25lfSkpO1xyXG4gICAgICAgICAgICBxdWl6X2RvbmVbMF0uZm9yRWFjaChxdWl6X3Jlc3VsdCA9PiB7XHJcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiQSB2ZXJpZmljYXIgZXN0YWRvIGRhcyBhdmFsaWHDp8O1ZXNcIik7XHJcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCcxOiAnICsgcXVpel9yZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBpZighcXVpel9yZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3VuZF9xdWl6X3RvZG8gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJBIG11ZGFyIGVzdGFkbyBkYXMgYXZhbGlhw6fDtWVzXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS51cGRhdGVEb2N1bWVudCh0aGlzLmdsb2JhbERhdGFfaWQsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJldmFsdWF0aW9uc1RvRG9cIiA6IFwidHJ1ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIiA6IFwiZ2xvYmFsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZGF0YVJlcXVlc3RcIiA6IGdsb2JhbC5kYXRhUmVxdWVzdFxyXG4gICAgICAgICAgICAgICAgICAgIH0pOyAgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGlmKCFmb3VuZF9xdWl6X3RvZG8pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS51cGRhdGVEb2N1bWVudCh0aGlzLmdsb2JhbERhdGFfaWQsIHtcclxuICAgICAgICAgICAgICAgICAgICBcImV2YWx1YXRpb25zVG9Eb1wiIDogXCJmYWxzZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwidHlwZVwiIDogXCJnbG9iYWxcIixcclxuICAgICAgICAgICAgICAgICAgICBcImRhdGFSZXF1ZXN0XCIgOiBnbG9iYWwuZGF0YVJlcXVlc3RcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS51cGRhdGVEb2N1bWVudCh0aGlzLmdsb2JhbERhdGFfaWQsIHtcclxuICAgICAgICAgICAgICAgIFwiZXZhbHVhdGlvbnNUb0RvXCIgOiBcImZhbHNlXCIsXHJcbiAgICAgICAgICAgICAgICBcInR5cGVcIiA6IFwiZ2xvYmFsXCIsXHJcbiAgICAgICAgICAgICAgICBcImRhdGFSZXF1ZXN0XCIgOiBnbG9iYWwuZGF0YVJlcXVlc3RcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnNvbGUubG9nKCdUZXJtaW5vdSBjaGVja1F1aXpzdGF0dXMnKTsgICBcclxuICAgIH1cclxuICAgIGhhc0V2YWx1YXRpb25zVG9EbygpIHtcclxuICAgICAgICAvL3RoaXMuY2hlY2tRdWl6U3RhdHVzKCk7XHJcbiAgICAgICAgLypcclxuICAgICAgICAvL2NvbnNvbGUubG9nKCdHTE9CQUwgSUQ6ICcgKyB0aGlzLmdsb2JhbERhdGFfaWQpO1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkodGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmdldERvY3VtZW50KHRoaXMuZ2xvYmFsRGF0YV9pZCksIG51bGwsIDQpKTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKCdFdmFsdWF0aW9ucyB0byBkbzonICsgdGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmdldERvY3VtZW50KHRoaXMuZ2xvYmFsRGF0YV9pZCkuZXZhbHVhdGlvbnNUb0RvKVxyXG4gICAgICAgICovXHJcbiAgICAgICAgaWYodGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmdldERvY3VtZW50KHRoaXMuZ2xvYmFsRGF0YV9pZCkuZXZhbHVhdGlvbnNUb0RvID09IFwidHJ1ZVwiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBpc1F1aXpzU2V0KCkge1xyXG4gICAgICAgIC8vLy9jb25zb2xlLmxvZygnUVVJWi1JRDogJyArIHRoaXMucXVpenNfaWQpO1xyXG4gICAgICAgIGlmKHRoaXMucXVpenNfaWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGRlbGV0ZVF1ZXN0aW9ubmFpcmUocXVlc3Rpb25uYWlyZXMpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkEgYXBhZ2FyIHF1aXpzIVwiKTtcclxuICAgICAgICB2YXIgcXVpenMgPSB0aGlzLmdldFF1aXpzKCk7XHJcbiAgICAgICAgdmFyIGZvdW5kX2VxdWFsO1xyXG4gICAgICAgIHZhciBxdWl6c190ZW1wID0gW107XHJcbiAgICAgICAgICAgIC8vLy9jb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShxdWl6cywgbnVsbCwgNCkpO1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiUXVpenMgZGEgQkQ6IFwiKTtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShxdWl6cywgbnVsbCwgNCkpO1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiUXVpenMgRU5WSUFET1M6IFwiKTtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShxdWVzdGlvbm5haXJlcywgbnVsbCwgNCkpO1xyXG4gICAgICAgICAgICBxdWl6cy5mb3JFYWNoKHF1ZXN0aW9ubmFpcmVfQkQgPT4ge1xyXG4gICAgICAgICAgICAgICAgZm91bmRfZXF1YWwgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJSRUZFUkVOQ0lBIERPIFFVSVogQkQ6IFwiICsgcXVlc3Rpb25uYWlyZV9CRC5yZWZfcXVlc3Rpb25uYWlyZSk7XHJcbiAgICAgICAgICAgICAgICBxdWVzdGlvbm5haXJlcy5mb3JFYWNoKHF1ZXN0aW9ubmFpcmVfc2VudCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIlJFRkVSRU5DSUEgRE8gUVVJWiBFTlZJQURPOiBcIiArIHF1ZXN0aW9ubmFpcmVfc2VudC5yZWZfcXVlc3Rpb25uYWlyZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYocXVlc3Rpb25uYWlyZV9zZW50LnJlZl9xdWVzdGlvbm5haXJlID09IHF1ZXN0aW9ubmFpcmVfQkQucmVmX3F1ZXN0aW9ubmFpcmUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIlJFRkVSRU5DSUEgRE8gUVVJWiBBIEVMSU1JTkFSOiBcIiArIHF1ZXN0aW9ubmFpcmVfc2VudC5yZWZfcXVlc3Rpb25uYWlyZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgLy8gcXVpenMuc3BsaWNlKHF1ZXN0aW9ubmFpcmVfQkQucmVmX3F1ZXN0aW9ubmFpcmUsIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgIGZvdW5kX2VxdWFsID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBpZighZm91bmRfZXF1YWwpIHtcclxuICAgICAgICAgICAgICAgICAgICBxdWl6c190ZW1wLnB1c2gocXVlc3Rpb25uYWlyZV9CRCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKFwiTnVtZXJvIGRlIHF1aXplcyBwb3IgZmF6ZXI6IFwiICsgcXVpenMubGVuZ3RoKTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHF1aXpzLCBudWxsLCA0KSk7XHJcbiAgICAgICAgcXVpenMgPSBxdWl6c190ZW1wO1xyXG5cclxuICAgICAgICBpZihxdWl6cy5sZW5ndGggID09IDApIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJBIGFwYWdhciBkb2MgY29ycmVudGUgZGUgcXVpenNcIik7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5kZWxldGVEb2N1bWVudCh0aGlzLnF1aXpzX2lkKTtcclxuICAgICAgICAgICAgdGhpcy5xdWl6c19pZCA9IG51bGw7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbGV0IGluZGV4ID0gMDtcclxuICAgICAgICAgICAgcXVpenMuZm9yRWFjaChlbGVtZW50ID0+IHtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQucmVmX3F1ZXN0aW9ubmFpcmUgPSBpbmRleCArIFwiXCI7XHJcbiAgICAgICAgICAgICAgICBpbmRleCsrO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ0Fww7NzIHJlaW5kZXhhw6fDo28hJyk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHF1aXpzLCBudWxsLCA0KSk7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS51cGRhdGVEb2N1bWVudCh0aGlzLnF1aXpzX2lkLCB7XHJcbiAgICAgICAgICAgICAgICAncXVpeicgOiBxdWl6cyxcclxuICAgICAgICAgICAgICAgICd0eXBlJyA6ICdxdWl6J1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJOT1ZPIEFSUkFZIERFIFFVSVpTIE5BIEJEXCIpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeSh0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZ2V0RG9jdW1lbnQodGhpcy5xdWl6c19pZCksIG51bGwsIDQpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBhZGRRdWVzdGlvbm5haXJlVG9EQihxdWVzdGlvbm5haXJlKSB7XHJcbiAgICAgICAgaWYoIXRoaXMuaXNTZXRRdWl6c0RvbmUoKSkge1xyXG4gICAgICAgICAgICB0aGlzLnF1aXpzX2RvbmVfaWQgPSB0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuY3JlYXRlRG9jdW1lbnQoe1xyXG4gICAgICAgICAgICAgICAgJ3R5cGUnIDogJ3F1aXpzT25Ib2xkJyxcclxuICAgICAgICAgICAgICAgICdxdWVzdGlvbm5haXJlcycgOiBxdWVzdGlvbm5haXJlIFxyXG4gICAgICAgICAgICB9KTsgICAgICAgICAgICBcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB2YXIgcXVpenNPbkhvbGRfQkQgPSB0aGlzLmdldEFsbFF1aXpzT25Ib2xkKCk7XHJcbiAgICAgICAgICAgIHF1aXpzT25Ib2xkX0JELnB1c2gocXVlc3Rpb25uYWlyZSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnF1aXpzX2RvbmVfaWQgPSB0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkudXBkYXRlRG9jdW1lbnQoe1xyXG4gICAgICAgICAgICAgICAgJ3R5cGUnIDogJ3F1aXpzT25Ib2xkJyxcclxuICAgICAgICAgICAgICAgICdxdWVzdGlvbm5haXJlcycgOiBxdWl6c09uSG9sZF9CRCBcclxuICAgICAgICAgICAgfSk7IFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGlzU2V0UXVpenNEb25lKCkge1xyXG4gICAgICAgIGlmKHRoaXMucXVpenNfZG9uZV9pZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgZ2V0UXVpenNPbkhvbGRfSUQoKSB7XHJcbiAgICAgICAgaWYodGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmV4ZWN1dGVRdWVyeSgncXVpek9uSG9sZCcpLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgLy8vL2NvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5leGVjdXRlUXVlcnkoXCJxdWl6T25Ib2xkXCIpLCBudWxsLCA0KSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZXhlY3V0ZVF1ZXJ5KCdxdWl6T25Ib2xkJylbMF0uX2lkO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIGdldEFsbFF1aXpzT25Ib2xkKCkge1xyXG4gICAgICAgIGlmKHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5leGVjdXRlUXVlcnkoJ3F1aXpPbkhvbGQnKS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIC8vLy9jb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeSh0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZXhlY3V0ZVF1ZXJ5KFwicXVpek9uSG9sZFwiKSwgbnVsbCwgNCkpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmV4ZWN1dGVRdWVyeSgncXVpek9uSG9sZCcpLnF1ZXN0aW9ubmFpcmVzO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxufSJdfQ==