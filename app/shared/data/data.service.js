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
        //console.log('Terminou checkQuizstatus');   
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
        //console.log("A apagar quizs!");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGF0YS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxnQ0FBa0M7QUFDbEMsaUNBQStCO0FBSS9CLHNDQUEyQztBQU8zQyx1Q0FBc0M7QUFNdEMsSUFBYSxXQUFXO0lBaUJwQixxQkFBbUIsUUFBa0I7UUFDN0IsMkNBQTJDO1FBQzNDLHFDQUFxQztRQUNyQywwQkFBMEI7UUFDMUIsMEJBQTBCO1FBQzFCLDRCQUE0QjtRQUM1QiwwQkFBMEI7UUFOZixhQUFRLEdBQVIsUUFBUSxDQUFVO1FBUTdCLGlKQUFpSjtRQUNqSix3QkFBd0I7UUFDeEIsNkJBQTZCO1FBRTdCLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNaLDBCQUEwQjtRQUMxQixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRXRCLEVBQUU7SUFFVixDQUFDO0lBRUQsMEJBQUksR0FBSjtRQUNJLDBCQUEwQjtRQUMxQix3QkFBd0I7UUFDeEIsb0RBQW9EO1FBQ3BELDBDQUEwQztRQUMxQyxLQUFLO1FBQ0wsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNwQiwrQ0FBK0M7WUFDL0MsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7WUFDekMsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBRXpFLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUU7Z0JBQzNELE1BQU0sRUFBRSxRQUFRO2dCQUNoQixhQUFhLEVBQUUsT0FBTztnQkFDdEIsaUJBQWlCLEVBQUcsTUFBTSxDQUFDLGVBQWU7YUFDN0MsQ0FBQyxDQUFDO1FBSVAsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osMERBQTBEO1lBQzFELDhFQUE4RTtZQUM5RSxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUMsY0FBYyxDQUFDO2dCQUM1RCxNQUFNLEVBQUUsUUFBUTtnQkFDaEIsYUFBYSxFQUFFLE9BQU87Z0JBQ3RCLGlCQUFpQixFQUFHLE9BQU87YUFDOUIsQ0FBQyxDQUFDO1FBRVAsQ0FBQztRQUVELElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7UUFDOUMsd0RBQXdEO1FBQ3hELElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7UUFDbkQsMERBQTBEO1FBQzFELElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDekMsZ0RBQWdEO1FBQ2hELGdEQUFnRDtRQUVoRCw4Q0FBOEM7UUFDOUMseUJBQXlCO0lBRTdCLENBQUM7SUFDRCwwQkFBSSxHQUFKO1FBQ0k7Ozs7OztjQU1NO0lBQ1YsQ0FBQztJQUVELDZCQUFPLEdBQVAsVUFBUSxjQUFjO1FBQ2xCLHVDQUF1QztRQUN2QyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUMsY0FBYyxDQUFDO1lBQzFELE1BQU0sRUFBRSxNQUFNO1lBQ2QsTUFBTSxFQUFFLGNBQWM7U0FDekIsQ0FBQyxDQUFDO1FBQ0gsMkdBQTJHO0lBQy9HLENBQUM7SUFDRCxpQ0FBVyxHQUFYO0lBRUEsQ0FBQztJQUNELGtDQUFZLEdBQVo7SUFFQSxDQUFDO0lBQ0QscUNBQWUsR0FBZjtRQUNJLGlEQUFpRDtRQUNqRCxvQ0FBb0M7UUFDcEMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDOUUsQ0FBQztJQUNELHFDQUFlLEdBQWYsVUFBZ0IsSUFBSTtRQUNoQixPQUFPO1FBQ1AsMEJBQTBCO1FBQzFCLCtCQUErQjtRQUUvQixzQ0FBc0M7UUFDdEMsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7WUFDdEIsNEZBQTRGO1lBQzVGLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUU7Z0JBQzdELE1BQU0sRUFBRSxJQUFJO2dCQUNaLE1BQU0sRUFBRyxNQUFNO2FBQ2xCLENBQUMsQ0FBQztRQUNQLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLHdDQUF3QztZQUN4QyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUMsY0FBYyxDQUFDO2dCQUM5RCxNQUFNLEVBQUUsTUFBTTtnQkFDZCxNQUFNLEVBQUUsSUFBSTthQUNmLENBQUMsQ0FBQztRQUNQLENBQUM7UUFFRCw4QkFBOEI7UUFHOUIsNEJBQTRCO1FBQzVCLCtCQUErQjtRQUMvQixJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7UUFFekUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUMzRCxNQUFNLEVBQUcsUUFBUTtZQUNqQixhQUFhLEVBQUUsTUFBTTtZQUNyQixpQkFBaUIsRUFBRyxNQUFNLENBQUMsZUFBZTtTQUU3QyxDQUFDLENBQUM7UUFDSCxrQ0FBa0M7UUFDbEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBQ0Qsc0NBQWdCLEdBQWhCLFVBQWlCLElBQUk7UUFDZjs7U0FFQztRQUNILElBQUksU0FBUyxHQUFHLEVBQUUsQ0FBQyxZQUFZLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDNUMsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxlQUFlLENBQUMsQ0FBQztRQUV6RCxzQkFBc0I7SUFDMUIsQ0FBQztJQUVELDhCQUFRLEdBQVI7SUFFQSxDQUFDO0lBQ0QsOEJBQVEsR0FBUjtRQUNJLGtDQUFrQztRQUNsQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUM7SUFDMUYsQ0FBQztJQUNELCtCQUFTLEdBQVQ7UUFDSSxnQ0FBZ0M7UUFDaEMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO0lBQzdFLENBQUM7SUFDRCw2Q0FBdUIsR0FBdkI7UUFDSSx1REFBdUQ7UUFDdkQsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBRS9CLEVBQUUsQ0FBQSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDUCxJQUFJLFFBQVEsQ0FBQztZQUNiLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ2xCLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLElBQUksT0FBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLFVBQVUsQ0FBQyxDQUFDLENBQUM7b0JBQ3RELFFBQVEsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3BCLEtBQUssQ0FBQztnQkFDVixDQUFDO1lBQ0wsQ0FBQztZQUNELE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO1FBQ3pCLENBQUM7UUFDRCxNQUFNLENBQUMsS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFDTSxnQ0FBVSxHQUFqQixVQUFrQixJQUFJO1FBQ2xCLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQy9ELHNDQUFzQztRQUN0QywwQkFBMEI7UUFDMUIsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDM0QsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7Z0JBQ3hDLHVCQUF1QjtnQkFDdkIsK0RBQStEO2dCQUMvRCxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDakUsQ0FBQztRQUNMLENBQUM7SUFDTCxDQUFDO0lBQ00saUNBQVcsR0FBbEI7UUFDSSxFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM3RCxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDNUQsQ0FBQztRQUNELE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUNNLDhCQUFRLEdBQWYsVUFBZ0IsSUFBSTtRQUNoQixPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixHQUFHLElBQUksR0FBRyxPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxHQUFHLFlBQVksQ0FBQyxDQUFDO1FBQ3RILEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzNELE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN6RixDQUFDO0lBQ0wsQ0FBQztJQUNPLGtDQUFZLEdBQW5CO1FBQ0csd0JBQXdCO1FBQ3hCLElBQUksU0FBUyxHQUFHLEVBQUUsQ0FBQyxZQUFZLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDNUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLElBQUksWUFBWSxDQUFDLENBQUM7UUFDbkUsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksVUFBVSxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUM7UUFHeEU7Ozs7Ozs7Ozs7Ozs7O1VBY0U7SUFDTixDQUFDO0lBQ00seUNBQW1CLEdBQTFCO1FBQ0ksSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBRS9CLEVBQUUsQ0FBQSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDUCxJQUFJLFFBQVEsQ0FBQztZQUNiLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ2xCLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLElBQUksT0FBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLFVBQVUsQ0FBQyxDQUFDLENBQUM7b0JBQ3RELFFBQVEsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3BCLEtBQUssQ0FBQztnQkFDVixDQUFDO1lBQ0wsQ0FBQztZQUNELE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDO1FBQ3hCLENBQUM7UUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFDTSxnQ0FBVSxHQUFqQjtRQUNJLHdEQUF3RDtRQUN4RCxFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztZQUNsQixNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2hCLENBQUM7UUFDRCxNQUFNLENBQUMsS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFDTSwrQkFBUyxHQUFoQixVQUFpQixRQUFrQixFQUFFLEtBQUs7UUFDdEMsSUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUV0RixHQUFHLENBQUEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFlBQVksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUMxQyxHQUFHLENBQUEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7Z0JBQ25ELEdBQUcsQ0FBQSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7b0JBRWhFLEVBQUUsQ0FBQSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQzt3QkFFekQsOERBQThEO3dCQUM5RCxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsR0FBRyxLQUFLLENBQUM7b0JBQ2hFLENBQUM7Z0JBQ0wsQ0FBQztZQUNMLENBQUM7UUFDTCxDQUFDO1FBQ0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRTtZQUM3RCxNQUFNLEVBQUUsTUFBTTtZQUNkLE1BQU0sRUFBRSxZQUFZO1NBQ3ZCLENBQUMsQ0FBQTtRQUVGLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDMUIsQ0FBQztJQUNEOzs7Ozs7Ozs7Ozs7Ozs7VUFlTSxDQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQW9CSjtJQUNLLHVDQUFpQixHQUF4QixVQUF5QixXQUFXO0lBRXBDLENBQUM7SUFFTSxzQ0FBZ0IsR0FBdkI7UUFDSSwrQ0FBK0M7UUFDL0MsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxTQUFTLENBQUM7SUFDaEYsQ0FBQztJQUVNLDJDQUFxQixHQUE1QjtRQUNJLGtFQUFrRTtRQUNsRSxFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsV0FBVyxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDcEYsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUNqQixDQUFDO1FBQ0EsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNqQixDQUFDO0lBQ0Q7Ozs7OztPQU1HO0lBQ0ksOEJBQVEsR0FBZixVQUFnQixzQkFBc0I7UUFFbEMsRUFBRSxDQUFBLENBQUMsc0JBQXNCLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbkMsNEhBQTRIO1lBQzVILElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUU7Z0JBQzNELGlCQUFpQixFQUFHLE1BQU07Z0JBQzFCLE1BQU0sRUFBRyxRQUFRO2dCQUNqQixhQUFhLEVBQUcsTUFBTTthQUN6QixDQUFDLENBQUM7UUFDUCxDQUFDO1FBRUQsRUFBRSxDQUFBLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLG1DQUFtQztZQUNuQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUMsY0FBYyxDQUFDO2dCQUN2RCxNQUFNLEVBQUUsTUFBTTtnQkFDZCxNQUFNLEVBQUUsc0JBQXNCO2FBQ2pDLENBQUMsQ0FBQztZQUNILElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDMUIsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osSUFBSSxZQUFZLEdBQUcsRUFBRSxDQUFDO1lBQ3RCLElBQUksYUFBYSxHQUFHLEtBQUssQ0FBQyxDQUFDLGlEQUFpRDtZQUM1RSxJQUFJLGVBQWUsR0FBRyxLQUFLLENBQUM7WUFFNUIsd0NBQXdDO1lBQ3hDLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUM1QixnREFBZ0Q7WUFDaEQsc0JBQXNCLENBQUMsT0FBTyxDQUFDLFVBQUEsb0JBQW9CO2dCQUMvQyxlQUFlLEdBQUcsS0FBSyxDQUFDO2dCQUN4QixLQUFLLENBQUMsT0FBTyxDQUFDLFVBQUEsZ0JBQWdCO29CQUMxQixFQUFFLENBQUEsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLElBQUksb0JBQW9CLENBQUMsRUFBRSxJQUFJLGdCQUFnQixDQUFDLFNBQVMsSUFBSSxvQkFBb0IsQ0FBQyxTQUFTLElBQUksZ0JBQWdCLENBQUMsY0FBYyxJQUFJLG9CQUFvQixDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7d0JBQzFMLDhHQUE4Rzt3QkFDOUcsZUFBZSxHQUFHLElBQUksQ0FBQztvQkFDM0IsQ0FBQztnQkFDTCxDQUFDLENBQUMsQ0FBQztnQkFDSCxFQUFFLENBQUEsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7b0JBQ2xCLHdDQUF3QztvQkFDeEMsYUFBYSxHQUFHLElBQUksQ0FBQztvQkFDckIsWUFBWSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO2dCQUM1QyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7WUFDSCw0Q0FBNEM7WUFDNUMsRUFBRSxDQUFBLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztnQkFDZixZQUFZLENBQUMsT0FBTyxDQUFDLFVBQUEsSUFBSTtvQkFDckIsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDckIsQ0FBQyxDQUFDLENBQUM7WUFDUCxDQUFDO1lBQ0QsOENBQThDO1lBRTlDLGFBQWE7WUFDYixJQUFJLE9BQUssR0FBRyxDQUFDLENBQUM7WUFDZCxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQUEsT0FBTztnQkFDckIsT0FBTyxDQUFDLGlCQUFpQixHQUFHLE9BQUssR0FBRyxFQUFFLENBQUM7Z0JBQ3ZDLE9BQUssRUFBRSxDQUFDO1lBRVosQ0FBQyxDQUFDLENBQUM7WUFDQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUN0RCxNQUFNLEVBQUcsS0FBSztnQkFDZCxNQUFNLEVBQUcsTUFBTTthQUNsQixDQUFDLENBQUM7UUFHSCxDQUFDO1FBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBQ25DLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDbkQsQ0FBQztJQUVNLGlDQUFXLEdBQWxCO1FBQ0ksc0NBQXNDO1FBQ3RDLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzdELDJGQUEyRjtZQUMzRixNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDNUQsQ0FBQztRQUNELDZCQUE2QjtRQUM3QixNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFDTSx1Q0FBaUIsR0FBeEI7UUFDSSxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFFL0IsRUFBRSxDQUFBLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNQLElBQUksUUFBUSxDQUFDO1lBRWIsUUFBUSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ25DLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDO1FBQ3hCLENBQUM7UUFDRCxpQ0FBaUM7UUFDakMsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNoQixDQUFDO0lBQ00sMENBQW9CLEdBQTNCO1FBQ0ksSUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7UUFFN0MsRUFBRSxDQUFBLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztZQUNkLElBQUksUUFBUSxDQUFDO1lBRWIsUUFBUSxHQUFHLFlBQVksQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ2pELE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDO1FBQ3hCLENBQUM7UUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFDTSw4QkFBUSxHQUFmO1FBQ0ksK0JBQStCO1FBQy9CLHdGQUF3RjtRQUN4Rix5RUFBeUU7UUFDekUsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDZixFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDN0QsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDdkUsQ0FBQztRQUNMLENBQUM7UUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFDTSxpQ0FBVyxHQUFsQjtRQUNJLDBGQUEwRjtRQUMxRixFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMvRCxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2hCLENBQUM7UUFDRCxNQUFNLENBQUMsS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFDTSxrQ0FBWSxHQUFuQjtRQUNJLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQy9ELDZGQUE2RjtZQUU3RixNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQ3JFLENBQUM7UUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFDTSx3Q0FBa0IsR0FBekI7UUFDSSxFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUU5RCw0RkFBNEY7WUFDM0YsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzVELENBQUM7UUFDRCxNQUFNLENBQUMsS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFDTSxzQ0FBZ0IsR0FBdkIsVUFBd0IsYUFBYTtRQUNqQyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDNUIsRUFBRSxDQUFBLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNQLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBQSxZQUFZO2dCQUN2QixFQUFFLENBQUEsQ0FBQyxZQUFZLENBQUMsaUJBQWlCLElBQUksYUFBYSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQztvQkFDbEUsWUFBWSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ3pCLEdBQUcsQ0FBQSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsWUFBWSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQzt3QkFDcEQsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEdBQUcsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUM7b0JBQzdFLENBQUM7Z0JBQ04sQ0FBQztZQUNKLENBQUMsQ0FBQyxDQUFDO1lBRUgsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtnQkFDdEQsTUFBTSxFQUFHLEtBQUs7Z0JBQ2QsTUFBTSxFQUFHLE1BQU07YUFDbEIsQ0FBQyxDQUFDO1lBQ0gsd0JBQXdCO1lBQ3hCLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUMzQixDQUFDO1FBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNoQixDQUFDO0lBQ0QscUNBQWUsR0FBZjtRQUFBLGlCQXlDQztRQXhDRyxPQUFPLENBQUMsR0FBRyxDQUFDLG1DQUFtQyxDQUFDLENBQUM7UUFDakQsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQzVCLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUV6RSxFQUFFLENBQUEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ1AsaUNBQWlDO1lBQ2pDLElBQUksU0FBUyxHQUFHLEVBQUUsQ0FBQztZQUNuQixJQUFJLGVBQWUsR0FBRyxLQUFLLENBQUM7WUFDNUIsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFVBQVMsS0FBSyxJQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFBLENBQUEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM5RCxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUEsV0FBVztnQkFDNUIsbURBQW1EO2dCQUNuRCxtQ0FBbUM7Z0JBRW5DLEVBQUUsQ0FBQSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztvQkFDZCxlQUFlLEdBQUcsSUFBSSxDQUFDO29CQUN2QiwrQ0FBK0M7b0JBQy9DLEtBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUMsY0FBYyxDQUFDLEtBQUksQ0FBQyxhQUFhLEVBQUU7d0JBQzNELGlCQUFpQixFQUFHLE1BQU07d0JBQzFCLE1BQU0sRUFBRyxRQUFRO3dCQUNqQixhQUFhLEVBQUcsTUFBTSxDQUFDLFdBQVc7cUJBQ3JDLENBQUMsQ0FBQztnQkFDUCxDQUFDO1lBRUwsQ0FBQyxDQUFDLENBQUM7WUFDSCxFQUFFLENBQUEsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xCLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUU7b0JBQzNELGlCQUFpQixFQUFHLE9BQU87b0JBQzNCLE1BQU0sRUFBRyxRQUFRO29CQUNqQixhQUFhLEVBQUcsTUFBTSxDQUFDLFdBQVc7aUJBQ3JDLENBQUMsQ0FBQztZQUNQLENBQUM7UUFFTCxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFO2dCQUMzRCxpQkFBaUIsRUFBRyxPQUFPO2dCQUMzQixNQUFNLEVBQUcsUUFBUTtnQkFDakIsYUFBYSxFQUFHLE1BQU0sQ0FBQyxXQUFXO2FBQ3JDLENBQUMsQ0FBQztRQUNQLENBQUM7UUFDRCw2Q0FBNkM7SUFDakQsQ0FBQztJQUNELHdDQUFrQixHQUFsQjtRQUNJLHlCQUF5QjtRQUN6Qjs7OztVQUlFO1FBQ0YsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLGVBQWUsSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ3ZGLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDaEIsQ0FBQztRQUNELE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUNELGdDQUFVLEdBQVY7UUFDSSw2Q0FBNkM7UUFDN0MsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDZixNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2hCLENBQUM7UUFDRCxNQUFNLENBQUMsS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFDRCx5Q0FBbUIsR0FBbkIsVUFBb0IsY0FBYztRQUM5QixpQ0FBaUM7UUFDakMsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQzVCLElBQUksV0FBVyxDQUFDO1FBQ2hCLElBQUksVUFBVSxHQUFHLEVBQUUsQ0FBQztRQUNoQixnREFBZ0Q7UUFDaEQsK0JBQStCO1FBQy9CLDhDQUE4QztRQUM5QyxrQ0FBa0M7UUFDbEMsdURBQXVEO1FBQ3ZELEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBQSxnQkFBZ0I7WUFDMUIsV0FBVyxHQUFHLEtBQUssQ0FBQztZQUNwQiw4RUFBOEU7WUFDOUUsY0FBYyxDQUFDLE9BQU8sQ0FBQyxVQUFBLGtCQUFrQjtnQkFDckMscUZBQXFGO2dCQUNyRixFQUFFLENBQUEsQ0FBQyxrQkFBa0IsQ0FBQyxpQkFBaUIsSUFBSSxnQkFBZ0IsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7b0JBQzVFLHdGQUF3RjtvQkFDekYsdURBQXVEO29CQUN2RCxXQUFXLEdBQUcsSUFBSSxDQUFDO2dCQUN0QixDQUFDO1lBRUwsQ0FBQyxDQUFDLENBQUM7WUFDSCxFQUFFLENBQUEsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7Z0JBQ2QsVUFBVSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQ3RDLENBQUM7UUFFTCxDQUFDLENBQUMsQ0FBQztRQUNQLDZEQUE2RDtRQUM3RCw4Q0FBOEM7UUFDOUMsS0FBSyxHQUFHLFVBQVUsQ0FBQztRQUVuQixFQUFFLENBQUEsQ0FBQyxLQUFLLENBQUMsTUFBTSxJQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDcEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDO1lBQzlDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUMxRCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUN6QixDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixJQUFJLE9BQUssR0FBRyxDQUFDLENBQUM7WUFDZCxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQUEsT0FBTztnQkFDakIsT0FBTyxDQUFDLGlCQUFpQixHQUFHLE9BQUssR0FBRyxFQUFFLENBQUM7Z0JBQ3ZDLE9BQUssRUFBRSxDQUFDO1lBQ1osQ0FBQyxDQUFDLENBQUM7WUFDSCxPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUM7WUFDakMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM1QyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUN0RCxNQUFNLEVBQUcsS0FBSztnQkFDZCxNQUFNLEVBQUcsTUFBTTthQUNsQixDQUFDLENBQUM7WUFDSCxPQUFPLENBQUMsR0FBRyxDQUFDLDJCQUEyQixDQUFDLENBQUM7WUFDekMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNqRyxDQUFDO0lBQ0wsQ0FBQztJQUNELDBDQUFvQixHQUFwQixVQUFxQixhQUFhO1FBQzlCLEVBQUUsQ0FBQSxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN4QixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUMsY0FBYyxDQUFDO2dCQUM1RCxNQUFNLEVBQUcsYUFBYTtnQkFDdEIsZ0JBQWdCLEVBQUcsYUFBYTthQUNuQyxDQUFDLENBQUM7UUFDUCxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixJQUFJLGNBQWMsR0FBRyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztZQUM5QyxjQUFjLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBRW5DLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxjQUFjLENBQUM7Z0JBQzVELE1BQU0sRUFBRyxhQUFhO2dCQUN0QixnQkFBZ0IsRUFBRyxjQUFjO2FBQ3BDLENBQUMsQ0FBQztRQUNQLENBQUM7SUFDTCxDQUFDO0lBQ0Qsb0NBQWMsR0FBZDtRQUNJLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDaEIsQ0FBQztRQUNELE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUNELHVDQUFpQixHQUFqQjtRQUNJLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ25FLGlHQUFpRztZQUNqRyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQ3pFLENBQUM7UUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFDRCx1Q0FBaUIsR0FBakI7UUFDSSxFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNuRSxpR0FBaUc7WUFDakcsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxDQUFDLGNBQWMsQ0FBQztRQUNqRixDQUFDO1FBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNoQixDQUFDO0lBQ0wsa0JBQUM7QUFBRCxDQUFDLEFBeG5CRCxJQXduQkM7QUF4bkJZLFdBQVc7SUFEdkIsaUJBQVUsRUFBRTtxQ0FrQm9CLG1CQUFRO0dBakI1QixXQUFXLENBd25CdkI7QUF4bkJZLGtDQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgZnMgZnJvbSBcImZpbGUtc3lzdGVtXCI7XHJcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvbWFwJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XHJcbmltcG9ydCB7IENvbm5lY3RvclNlcnZpY2UgfSBmcm9tICcuLi8uLi9zaGFyZWQvY29ubmVjdG9yL2Nvbm5lY3Rvci5zZXJ2aWNlJztcclxuXHJcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBNYXRlcmlhbHMgfSBmcm9tIFwiLi9tYXRlcmlhbHNcIjtcclxuaW1wb3J0IHsgTWF0ZXJpYWwgfSBmcm9tIFwiLi4vLi4vbWF0ZXJpYWwvbWF0ZXJpYWxcIjtcclxuaW1wb3J0IHsgRGF0YSB9IGZyb20gXCIuL2RhdGFcIjtcclxuaW1wb3J0IHsgTmVlZHMgfSBmcm9tIFwiLi9uZWVkc1wiO1xyXG5pbXBvcnQgeyBQYXRpZW50IH0gZnJvbSBcIi4uLy4uL3BhdGllbnQvcGF0aWVudFwiO1xyXG5pbXBvcnQgeyBDb3VjaGJhc2UgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWNvdWNoYmFzZVwiO1xyXG5pbXBvcnQgeyBEYXRhYmFzZSB9IGZyb20gXCIuL2RhdGFiYXNlXCI7XHJcbmltcG9ydCB7IFVzZXJTZXJ2aWNlIH0gZnJvbSAnLi4vdXNlci91c2VyLnNlcnZpY2UnO1xyXG5cclxuXHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBEYXRhU2VydmljZSB7XHJcblxyXG4gICAgcHVibGljIHBhdGllbnRzRGF0YV9pZDogYW55O1xyXG4gICAgcHVibGljIHVzZXJEYXRhX2lkOiBhbnk7XHJcbiAgICBwdWJsaWMgbWF0ZXJpYWxzX2lkOiBhbnk7XHJcbiAgICBwdWJsaWMgcmF0aW5nc19pZDogYW55O1xyXG4gICAgcHVibGljIGdsb2JhbERhdGFfaWQ6IGFueTtcclxuICAgIHB1YmxpYyBxdWl6c19pZDogYW55O1xyXG4gICAgcHVibGljIHF1aXpzX2RvbmVfaWQ6IGFueTtcclxuXHJcbiAgICBwdWJsaWMgUmVxdWVzdERhdGFfY29udHJvbDogYW55O1xyXG5cclxuICAgIHB1YmxpYyBmaWxlOiBmcy5GaWxlO1xyXG4gICAgcHVibGljIGZvbGRlcjogZnMuRm9sZGVyO1xyXG4gICAgcHVibGljIGZvbGRlck5hbWU6IHN0cmluZztcclxuICAgIHB1YmxpYyBmaWxlTmFtZTogc3RyaW5nO1xyXG4gXHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZGF0YWJhc2U6IERhdGFiYXNlKXtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnSW5zdGFuY2lvdSAtIERhdGFTZXJ2aWNlIScpO1xyXG4gICAgICAgICAgICAvL3RoaXMuZGF0YSA9IGRhdGFiYXNlLmdldERhdGFiYXNlKCk7XHJcbiAgICAgICAgICAgIC8vdGhpcy5kZWxldGVEYXRhKCdxdWl6Jyk7XHJcbiAgICAgICAgICAgIC8vdGhpcy5kZWxldGVEYXRhKCd1c2VyJyk7XHJcbiAgICAgICAgICAgIC8vdGhpcy5kZWxldGVEYXRhKCdnbG9iYWwnKTtcclxuICAgICAgICAgICAgLy90aGlzLmRlbGV0ZURhdGEoJ2RhdGEnKTtcclxuXHJcbiAgICAgICAgICAgIC8vdGhpcy5zaG93RGF0YSgnZGF0YScpOyAvL0VzdGEgYSBkYXIgZXhjZXBjYW8gZSBhIGltcHJpbWlyIG9zIHVzZXJzIHRiPz8/ISEhISEgKHBvciBjb25maXJtYXIpIHBxIG4gdGVtIGRhZG9zIGUgZXN0b2lyYT8/IG1hcyBpbXByaW1lIG8gdXNlciBwcT9cclxuICAgICAgICAgICAgLy90aGlzLnNob3dEYXRhKCd1c2VyJyk7XHJcbiAgICAgICAgICAgIC8vdGhpcy5zaG93RGF0YSgnbWF0ZXJpYWxzJyk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLmluaXQoKTtcclxuICAgICAgICAgICAgLy90aGlzLnNob3dEYXRhKCdnbG9iYWwnKTtcclxuICAgICAgICAgICAgdGhpcy5zaG93RGF0YSgncXVpeicpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy9cclxuICAgICAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgaW5pdCgpIHtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKFwiQkQgVVNBREFcIik7XHJcbiAgICAgICAgLy90aGlzLnNob3dEYXRhKFwicXVpelwiKTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKCdBIGluaWNpYWxpemFyIGFzIHZhcmnDoXZlaXMgZ2xvYmFpcycpO1xyXG4gICAgICAgIC8vQWRpY2lvbmFyIG51bWVybyBkZSBhdmFsaWHDp8O1ZXMgcGVuZGVudGVzXHJcbiAgICAgICAgLy8uLi5cclxuICAgICAgICBpZih0aGlzLmlzR2xvYmFsU2V0KCkpIHtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnQSBhdHVhbGl6YXIgZ2xvYmFsIGRlIGNvbmV4YW8nKTtcclxuICAgICAgICAgICAgdGhpcy5nbG9iYWxEYXRhX2lkID0gdGhpcy5nZXRHbG9iYWxzSUQoKTtcclxuICAgICAgICAgICAgdmFyIGdsb2JhbCA9IHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5nZXREb2N1bWVudCh0aGlzLmdsb2JhbERhdGFfaWQpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLnVwZGF0ZURvY3VtZW50KHRoaXMuZ2xvYmFsRGF0YV9pZCwge1xyXG4gICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZ2xvYmFsXCIsXHJcbiAgICAgICAgICAgICAgICBcImRhdGFSZXF1ZXN0XCI6IFwiZmFsc2VcIixcclxuICAgICAgICAgICAgICAgIFwiZXZhbHVhdGlvbnNUb0RvXCIgOiBnbG9iYWwuZXZhbHVhdGlvbnNUb0RvXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeSh0aGlzLmdsb2JhbERhdGFfaWQpKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnQSBjcmlhciBvYmpldG8gcGFyYSBhcyB2YXJpw6F2ZWlzIGdsb2JhaXMnKTtcclxuICAgICAgICAgICAgLy9jcmlhciB2YXJpw6F2ZWwgZ2xvYmFsIGJvb2xlYW4gcGFyYSBkaXplciBzZSBow6EgcXVpemVzIHBhcmEgZmF6ZXIgdXBkYXRlIG91IG5cclxuICAgICAgICAgICAgdGhpcy5nbG9iYWxEYXRhX2lkID0gdGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmNyZWF0ZURvY3VtZW50KHtcclxuICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImdsb2JhbFwiLFxyXG4gICAgICAgICAgICAgICAgXCJkYXRhUmVxdWVzdFwiOiBcImZhbHNlXCIsXHJcbiAgICAgICAgICAgICAgICBcImV2YWx1YXRpb25zVG9Eb1wiIDogXCJmYWxzZVwiXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAvLy8vY29uc29sZS5sb2coJ05PVk8gR0xPQkFMIElEOiAnICsgdGhpcy5nbG9iYWxEYXRhX2lkKTsgICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMudXNlckRhdGFfaWQgPSB0aGlzLmdldEN1cnJlbnRVc2VyRG9jSUQoKTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKFwiUVVJWlMgVVNFUiBET0MgSUQ6IFwiICsgdGhpcy51c2VyRGF0YV9pZCk7XHJcbiAgICAgICAgdGhpcy5wYXRpZW50c0RhdGFfaWQgPSB0aGlzLmdldExhdGVzdFBhdGllbnREYXRhKCk7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIlBBVElFTlRTIERPQyBJRDogXCIgKyB0aGlzLnBhdGllbnRzRGF0YV9pZCk7XHJcbiAgICAgICAgdGhpcy5xdWl6c19pZCA9IHRoaXMuZ2V0TGF0ZXN0UXVpekRhdGEoKTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKFwiUVVJWlMgRE9DIElEOiBcIiArIHRoaXMucXVpenNfaWQpO1xyXG4gICAgICAgIC8vdGhpcy5xdWl6c19kb25lX2lkID0gdGhpcy5nZXRRdWl6c09uSG9sZF9JRCgpO1xyXG5cclxuICAgICAgICAvL3ZlcmlmaWNhciBzZSBow6EgcXVlc3Rpb27DoXJpb3MgcGFyYSBwcmVlbmNoZXJcclxuICAgICAgICAvL3RoaXMuY2hlY2tRdWl6U3RhdHVzKCk7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbiAgICBzeW5jKCkge1xyXG4gICAgICAgIC8qXHJcbiAgICAgICAgdGhpcy5jb25uZWN0b3JTZXJ2aWNlLmdldFBhdGllbnRzKClcclxuICAgICAgICAgICAgLnN1YnNjcmliZShcclxuICAgICAgICAgICAgKHJlc3VsdCkgPT4gdGhpcy5vbkdldERhdGFTdWNjZXNzKHJlc3VsdCksXHJcbiAgICAgICAgICAgIChlcnJvcikgPT4gdGhpcy5vbkdldERhdGFFcnJvcihlcnJvcilcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgKi9cclxuICAgIH1cclxuIFxyXG4gICAgc2V0VXNlcihyZWdpc3RlcmVkVXNlcikge1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coJ0EgZ3JhdmFyIG8gdXRpbGl6YWRvcicpO1xyXG4gICAgICAgIHRoaXMudXNlckRhdGFfaWQgPSB0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuY3JlYXRlRG9jdW1lbnQoe1xyXG4gICAgICAgICAgICBcInR5cGVcIjogXCJ1c2VyXCIsXHJcbiAgICAgICAgICAgIFwidXNlclwiOiByZWdpc3RlcmVkVXNlclxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vLy9jb25zb2xlLmxvZyhcIkFRVUlcIitKU09OLnN0cmluZ2lmeSh0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZ2V0RG9jdW1lbnQodGhpcy51c2VyRGF0YV9pZCwgbnVsbCwgNCkpKTtcclxuICAgIH1cclxuICAgIHNldFBhdGllbnRzKCkge1xyXG5cclxuICAgIH1cclxuICAgIHNldE1hdGVyaWFscygpIHtcclxuXHJcbiAgICB9XHJcbiAgICBnZXRQYXRpZW50c0RhdGEoKXtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKCdBIGRldm9sdmVyIHRvZG9zIG9zIGRhZG9zIGRhIEJEJyk7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyh0aGlzLnBhdGllbnRzRGF0YV9pZCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5nZXREb2N1bWVudCh0aGlzLnBhdGllbnRzRGF0YV9pZCkuZGF0YTtcclxuICAgIH1cclxuICAgIHNldFBhdGllbnRzRGF0YShkYXRhKSB7XHJcbiAgICAgICAgLy9kZWJ1Z1xyXG4gICAgICAgIC8vdGhpcy5kZWxldGVEYXRhKCdkYXRhJyk7XHJcbiAgICAgICAgLy90aGlzLmRlbGV0ZURhdGEoJ21hdGVyaWFscycpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vVG9kb3Mgb3MgZGFkb3MgZG8gcGFjaWVudGUgZSByZWYgX2lkXHJcbiAgICAgICAgaWYodGhpcy5wYXRpZW50c0RhdGFfaWQpIHtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnQSBhdHVhbGl6YXIgb3MgZGFkb3MgZG9zIHBhY2llbnRlcyBuYSBiZCwgY29tIG8gaWQgJyArIHRoaXMucGF0aWVudHNEYXRhX2lkKTtcclxuICAgICAgICAgICAgdGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLnVwZGF0ZURvY3VtZW50KHRoaXMucGF0aWVudHNEYXRhX2lkLCB7XHJcbiAgICAgICAgICAgICAgICBcImRhdGFcIjogZGF0YSxcclxuICAgICAgICAgICAgICAgIFwidHlwZVwiIDogXCJkYXRhXCJcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnR3JhdmFyIGRhZG9zIFBhY2llbnRlcycpO1xyXG4gICAgICAgICAgICB0aGlzLnBhdGllbnRzRGF0YV9pZCA9IHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5jcmVhdGVEb2N1bWVudCh7XHJcbiAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJkYXRhXCIsXHJcbiAgICAgICAgICAgICAgICBcImRhdGFcIjogZGF0YVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vdGhpcy5tZWRpYVBlcnNpc3RlbmNlKGRhdGEpO1xyXG4gICAgICAgIFxyXG5cclxuICAgICAgICAvL0d1YXJkYSBkYWRvcyBkb3MgUGFjaWVudGVzXHJcbiAgICAgICAgLy9HdWFyZGEgZGFkb3MgZGFzIG5lY2Vzc2lkYWRlc1xyXG4gICAgICAgIHZhciBnbG9iYWwgPSB0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZ2V0RG9jdW1lbnQodGhpcy5nbG9iYWxEYXRhX2lkKTtcclxuXHJcbiAgICAgICAgdGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLnVwZGF0ZURvY3VtZW50KHRoaXMuZ2xvYmFsRGF0YV9pZCwge1xyXG4gICAgICAgICAgICBcInR5cGVcIiA6IFwiZ2xvYmFsXCIsXHJcbiAgICAgICAgICAgIFwiZGF0YVJlcXVlc3RcIjogXCJ0cnVlXCIsXHJcbiAgICAgICAgICAgIFwiZXZhbHVhdGlvbnNUb0RvXCIgOiBnbG9iYWwuZXZhbHVhdGlvbnNUb0RvXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vdmVyIG8gZ2V0IGRvY3VtZW50IHRiIGUgY29tcGFyYXJcclxuICAgICAgICB0aGlzLnNob3dEYXRhKCdnbG9iYWwnKTtcclxuICAgIH1cclxuICAgIG1lZGlhUGVyc2lzdGVuY2UoZGF0YSkge1xyXG4gICAgICAgICAgLyoqXHJcbiAgICAgICAgICogQWJyaXIgdG9kbyBvIGNvbnRlw7pkbyBkYSBwYXN0YSBtYXRlcmlhbHNcclxuICAgICAgICAgKi9cclxuICAgICAgICB2YXIgZG9jdW1lbnRzID0gZnMua25vd25Gb2xkZXJzLmRvY3VtZW50cygpO1xyXG4gICAgICAgIHZhciBwYXRoID0gZnMucGF0aC5qb2luKGRvY3VtZW50cy5wYXRoLCBcImFwcC9tYXRlcmlhbHNcIik7XHJcblxyXG4gICAgICAgIC8vLy9jb25zb2xlLmxvZyhwYXRoKTtcclxuICAgIH1cclxuICBcclxuICAgIHNldE5lZWRzKCkge1xyXG5cclxuICAgIH1cclxuICAgIGdldFRva2VuKCk6IHN0cmluZyB7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZygnQSBkZXZvbHZlciB0b2tlbicpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZ2V0RG9jdW1lbnQodGhpcy51c2VyRGF0YV9pZCkudXNlci5jYXJlZ2l2ZXJfdG9rZW47XHJcbiAgICB9XHJcbiAgICBnZXRVc2VySUQoKTogc3RyaW5nIHtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKCdBIG8gSUQgZG8gdXNlcicpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZ2V0RG9jdW1lbnQodGhpcy51c2VyRGF0YV9pZCkudXNlci5pZDtcclxuICAgIH1cclxuICAgIGdldExhdGVzdFVzZXJUb1JlZ2lzdGVyKCkge1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coXCJBIGRldm9sdmVyIHVsdGltbyB1dGlsaXphZG9yIHJlZ2lzdGFkb1wiKVxyXG4gICAgICAgIHZhciB1c2VycyA9IHRoaXMuZ2V0QWxsVXNlcnMoKTtcclxuICAgICAgICBcclxuICAgICAgICBpZih1c2Vycykge1xyXG4gICAgICAgICAgICB2YXIgbGFzdFVzZXI7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgaW4gdXNlcnMpIHtcclxuICAgICAgICAgICAgICAgIGlmICh1c2Vycy5oYXNPd25Qcm9wZXJ0eShpKSAmJiB0eXBlb2YoaSkgIT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgICAgICAgICBsYXN0VXNlciA9IHVzZXJzW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBsYXN0VXNlci51c2VyO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZGVsZXRlRGF0YSh2aWV3KSB7XHJcbiAgICAgICAgbGV0IGRvY3VtZW50cyA9IHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5leGVjdXRlUXVlcnkodmlldyk7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZygnQSBhcGFnYXIgYmQ6ICcgKyB2aWV3KTtcclxuICAgICAgICAvLyBsb29wIG92ZXIgYWxsIGRvY3VtZW50c1xyXG4gICAgICAgIGlmKHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5leGVjdXRlUXVlcnkodmlldykubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRvY3VtZW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgLy8gZGVsZXRlIGVhY2ggZG9jdW1lbnRcclxuICAgICAgICAgICAgICAgIC8vIGNvdWNoYmFzZSB3aWxsIGFzc2lnbiBhbiBpZCAoX2lkKSB0byBhIGRvY3VtZW50IHdoZW4gY3JlYXRlZFxyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmRlbGV0ZURvY3VtZW50KGRvY3VtZW50c1tpXS5faWQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHVibGljIGdldEFsbFVzZXJzKCl7XHJcbiAgICAgICAgaWYodGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmV4ZWN1dGVRdWVyeShcInVzZXJcIikubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmV4ZWN1dGVRdWVyeShcInVzZXJcIik7XHJcbiAgICAgICAgfSAgICAgICAgIFxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzaG93RGF0YSh2aWV3KSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ0EgbW9zdHJhciBiZDogJyArIHZpZXcgKyAnIGNvbSAnICsgdGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmV4ZWN1dGVRdWVyeSh2aWV3KS5sZW5ndGggKyAnIGVsZW1lbnRvcycpO1xyXG4gICAgICAgIGlmKHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5leGVjdXRlUXVlcnkodmlldykubGVuZ3RoID4gMCkgeyAgICAgXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5leGVjdXRlUXVlcnkodmlldyksIG51bGwsIDQpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAgcHVibGljIG9uQ3JlYXRlRmlsZSgpIHtcclxuICAgICAgICAvLyA+PiBmcy1jcmVhdGUtYWxsLWNvZGVcclxuICAgICAgICBsZXQgZG9jdW1lbnRzID0gZnMua25vd25Gb2xkZXJzLmRvY3VtZW50cygpO1xyXG4gICAgICAgIHRoaXMuZm9sZGVyID0gZG9jdW1lbnRzLmdldEZvbGRlcih0aGlzLmZvbGRlck5hbWUgfHwgXCJ0ZXN0Rm9sZGVyXCIpO1xyXG4gICAgICAgIHRoaXMuZmlsZSA9IHRoaXMuZm9sZGVyLmdldEZpbGUoKHRoaXMuZmlsZU5hbWUgfHwgXCJ0ZXN0RmlsZVwiKSArIFwiLnR4dFwiKTtcclxuXHJcbiAgICAgICAgXHJcbiAgICAgICAgLypcclxuICAgICAgICB0aGlzLmZpbGUud3JpdGVUZXh0KHRoaXMuZmlsZVRleHRDb250ZW50IHx8IFwic29tZSByYW5kb20gY29udGVudFwiKVxyXG4gICAgICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gU3VjY2VlZGVkIHdyaXRpbmcgdG8gdGhlIGZpbGUuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmZpbGUucmVhZFRleHQoKVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3VjY2Vzc01lc3NhZ2UgPSBcIlN1Y2Nlc3NmdWxseSBzYXZlZCBpbiBcIiArIHRoaXMuZmlsZS5wYXRoO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLndyaXR0ZW5Db250ZW50ID0gcmVzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmlzSXRlbVZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KS5jYXRjaChlcnIgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gRXJyb3JcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gPDwgZnMtY3JlYXRlLWFsbC1jb2RlXHJcbiAgICAgICAgKi9cclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRDdXJyZW50VXNlckRvY0lEKCkge1xyXG4gICAgICAgIHZhciB1c2VycyA9IHRoaXMuZ2V0QWxsVXNlcnMoKTtcclxuICAgICAgICBcclxuICAgICAgICBpZih1c2Vycykge1xyXG4gICAgICAgICAgICB2YXIgbGFzdFVzZXI7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgaW4gdXNlcnMpIHtcclxuICAgICAgICAgICAgICAgIGlmICh1c2Vycy5oYXNPd25Qcm9wZXJ0eShpKSAmJiB0eXBlb2YoaSkgIT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgICAgICAgICBsYXN0VXNlciA9IHVzZXJzW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBsYXN0VXNlci5faWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGlzVXNlckF1dGgoKSB7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZygnQSB2ZXJpZmljYXIgc2UgZXhpc3RlIHV0aWxpemFkb3IgbmEgQkQnKTtcclxuICAgICAgICBpZih0aGlzLnVzZXJEYXRhX2lkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7IFxyXG4gICAgfVxyXG4gICAgcHVibGljIHNldFJhdGluZyhtYXRlcmlhbDogTWF0ZXJpYWwsIGxldmVsKSB7XHJcbiAgICAgICAgbGV0IHBhdGllbnRzRGF0YSA9IHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5nZXREb2N1bWVudCh0aGlzLnBhdGllbnRzRGF0YV9pZCkuZGF0YTtcclxuICAgICAgICBcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgcGF0aWVudHNEYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaiA9IDA7IGogPCBwYXRpZW50c0RhdGFbaV0ubmVlZHMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgIGZvcihsZXQgayA9IDA7IGsgPCBwYXRpZW50c0RhdGFbaV0ubmVlZHNbal0ubWF0ZXJpYWxzLmxlbmd0aDsgaysrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgaWYocGF0aWVudHNEYXRhW2ldLm5lZWRzW2pdLm1hdGVyaWFsc1trXS5pZCA9PSBtYXRlcmlhbC5pZCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8vL2NvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHBhdGllbnRzRGF0YVtpXVtqXVtrXSxudWxsLDQpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGF0aWVudHNEYXRhW2ldLm5lZWRzW2pdLm1hdGVyaWFsc1trXVsnZXZhbHVhdGlvbiddID0gbGV2ZWw7ICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkudXBkYXRlRG9jdW1lbnQodGhpcy5wYXRpZW50c0RhdGFfaWQsIHtcclxuICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGF0YVwiLFxyXG4gICAgICAgICAgICBcImRhdGFcIjogcGF0aWVudHNEYXRhLFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5zaG93RGF0YShcImRhdGFcIik7XHJcbiAgICB9XHJcbiAgICAvKlxyXG4gICAgLy9HdWFyZGEgYXZhbGlhw6fDtWVzIGRvcyBtYXRlcmlhaXNcclxuICAgIHB1YmxpYyBzZXRSYXRpbmcocmF0aW5nKSB7XHJcbiAgICAgICAgLypcclxuICAgICAgICBsZXQgcGF0aWVudHNEYXRhID0gdGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmdldERvY3VtZW50KHRoaXMucGF0aWVudHNEYXRhX2lkKS5kYXRhO1xyXG4gICAgICAgIC8vLy9jb25zb2xlLmxvZyhcIkVudHJvdSBubyBmb3JcIik7XHJcbiAgICAgICAgLypcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgcGF0aWVudHNEYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaiA9IDA7IGogPCBwYXRpZW50c0RhdGFbaV0ubmVlZHMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgIGZvcihsZXQgayA9IDA7IGsgPCBwYXRpZW50c0RhdGFbaV0ubmVlZHNbal0ubWF0ZXJpYWxzLmxlbmd0aDsgaysrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhdGllbnRzRGF0YVtpXS5uZWVkc1tqXS5tYXRlcmlhbHNba11bJ3JhdGluZ3MnXSA9IFsnJ107XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgKi8vKlxyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBwYXRpZW50c0RhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgZm9yKGxldCBqID0gMDsgaiA8IHBhdGllbnRzRGF0YVtpXS5uZWVkcy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgZm9yKGxldCBrID0gMDsgayA8IHBhdGllbnRzRGF0YVtpXS5uZWVkc1tqXS5tYXRlcmlhbHMubGVuZ3RoOyBrKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBpZihwYXRpZW50c0RhdGFbaV0ubmVlZHNbal0ubWF0ZXJpYWxzW2tdLmlkID09IHJhdGluZy5pZF9tYXRlcmlhbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLy8vY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkocGF0aWVudHNEYXRhW2ldW2pdW2tdLG51bGwsNCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXRpZW50c0RhdGFbaV0ubmVlZHNbal0ubWF0ZXJpYWxzW2tdWydyYXRpbmdzJ10gPSByYXRpbmc7ICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLy8vY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkocGF0aWVudHNEYXRhLG51bGwsNCkpO1xyXG4gICAgICAgIHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS51cGRhdGVEb2N1bWVudCh0aGlzLnBhdGllbnRzRGF0YV9pZCwge1xyXG4gICAgICAgICAgICBcInR5cGVcIjogXCJkYXRhXCIsXHJcbiAgICAgICAgICAgIFwiZGF0YVwiOiBwYXRpZW50c0RhdGEsXHJcbiAgICAgICAgfSlcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLnNob3dEYXRhKFwiZGF0YVwiKTtcclxuICAgIH1cclxuICAgICovXHJcbiAgICBwdWJsaWMgZ2V0TWF0ZXJpYWxSYXRpbmcobWF0ZXJpYWxfaWQpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldE5lZWRNYXRlcmlhbHMoKSB7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZygnQSBkZXZvbHZlciB0b2RvcyBvcyBtYXRlcmlhaXMnKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmdldERvY3VtZW50KHRoaXMubWF0ZXJpYWxzX2lkKS5tYXRlcmlhbHM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGlzUGF0aWVudHNSZXF1ZXN0RG9uZSgpIHtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKFwiQSB2ZXJpZmljYXIgc2UgbyBwZWRpZG8gYW8gc2Vydmlkb3IgasOhIGZvaSBmZWl0b1wiKTtcclxuICAgICAgICBpZih0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZ2V0RG9jdW1lbnQodGhpcy5nbG9iYWxEYXRhX2lkKS5kYXRhUmVxdWVzdCA9PSBcImZhbHNlXCIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge2FueX0gY2FyZWdpdmVyUXVlc3Rpb25haXJlcyBcclxuICAgICAqIFxyXG4gICAgICogQG1lbWJlcm9mIERhdGFTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXRRdWl6cyhjYXJlZ2l2ZXJRdWVzdGlvbmFpcmVzKSB7XHJcblxyXG4gICAgICAgIGlmKGNhcmVnaXZlclF1ZXN0aW9uYWlyZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiRU5UUk9VIEFRVUkgRSBTRVRPVSBPIEVWQUxVQVRJT05TIEEgVFJVRS4gQ29tcHJpbWVudG8gZG8gYXJyYXkgZGUgcXVpemVzOiBcIiArIGNhcmVnaXZlclF1ZXN0aW9uYWlyZXMubGVuZ3RoKTtcclxuICAgICAgICAgICAgdGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLnVwZGF0ZURvY3VtZW50KHRoaXMuZ2xvYmFsRGF0YV9pZCwge1xyXG4gICAgICAgICAgICAgICAgXCJldmFsdWF0aW9uc1RvRG9cIiA6IFwidHJ1ZVwiLFxyXG4gICAgICAgICAgICAgICAgXCJ0eXBlXCIgOiBcImdsb2JhbFwiLFxyXG4gICAgICAgICAgICAgICAgXCJkYXRhUmVxdWVzdFwiIDogXCJ0cnVlXCJcclxuICAgICAgICAgICAgfSk7ICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKCF0aGlzLmlzUXVpenNTZXQoKSkge1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdOb3ZvIGRvYyBkZSBRdWl6cycpO1xyXG4gICAgICAgICAgICB0aGlzLnF1aXpzX2lkID0gdGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmNyZWF0ZURvY3VtZW50KHtcclxuICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInF1aXpcIixcclxuICAgICAgICAgICAgICAgIFwicXVpelwiOiBjYXJlZ2l2ZXJRdWVzdGlvbmFpcmVzXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLnNob3dEYXRhKCdxdWl6Jyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdmFyIHF1aXpzX3RvX2FkZCA9IFtdO1xyXG4gICAgICAgICAgICB2YXIgZm91bmRfY29udHJvbCA9IGZhbHNlOyAvL3ZhcmlhdmVsIGRlIGNvbnRyb2xlIGRlIG5vdm9zIHF1aXpzIGEgYWRpY2lvbmFyXHJcbiAgICAgICAgICAgIHZhciBzYW1lX3F1aXpfZm91bmQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ0rDoSBleGlzdGVtIHF1aXpzIG5hIEJEJyk7XHJcbiAgICAgICAgICAgIHZhciBxdWl6cyA9IHRoaXMuZ2V0UXVpenMoKTtcclxuICAgICAgICAgICAgLy8vL2NvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHF1aXpzLCBudWxsLCA0KSk7XHJcbiAgICAgICAgICAgIGNhcmVnaXZlclF1ZXN0aW9uYWlyZXMuZm9yRWFjaChxdWVzdGlvbm5haXJlX3NlcnZlciA9PiB7XHJcbiAgICAgICAgICAgICAgICBzYW1lX3F1aXpfZm91bmQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHF1aXpzLmZvckVhY2gocXVlc3Rpb25uYWlyZV9CRCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYocXVlc3Rpb25uYWlyZV9CRC5pZCA9PSBxdWVzdGlvbm5haXJlX3NlcnZlci5pZCAmJiBxdWVzdGlvbm5haXJlX0JELnJlZmVyZW5jZSA9PSBxdWVzdGlvbm5haXJlX3NlcnZlci5yZWZlcmVuY2UgJiYgcXVlc3Rpb25uYWlyZV9CRC5yZWZlcmVuY2VfbmFtZSA9PSBxdWVzdGlvbm5haXJlX3NlcnZlci5yZWZlcmVuY2VfbmFtZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdFbmNvbnRyb3UgcXVpeiBpZ3VhbDogaWQtJyArIHF1ZXN0aW9ubmFpcmVfQkQuaWQgKyAnIHJlZmVyZW5jZS0nICsgcXVlc3Rpb25uYWlyZV9CRC5yZWZlcmVuY2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzYW1lX3F1aXpfZm91bmQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgaWYoIXNhbWVfcXVpel9mb3VuZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ0VuY29udHJlaSBxdWl6cyBub3ZvczsnKTtcclxuICAgICAgICAgICAgICAgICAgICBmb3VuZF9jb250cm9sID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBxdWl6c190b19hZGQucHVzaChxdWVzdGlvbm5haXJlX3NlcnZlcik7XHJcbiAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShxdWl6c190b19hZGQpKTtcclxuICAgICAgICAgICAgaWYoZm91bmRfY29udHJvbCkge1xyXG4gICAgICAgICAgICAgICAgcXVpenNfdG9fYWRkLmZvckVhY2gocXVpeiA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcXVpenMucHVzaChxdWl6KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkocXVpenMsIG51bGwsIDQpKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vaW5kZXggYXJyYXlcclxuICAgICAgICAgICAgbGV0IGluZGV4ID0gMDtcclxuICAgICAgICAgICAgcXVpenMuZm9yRWFjaChlbGVtZW50ID0+IHtcclxuICAgICAgICAgICAgZWxlbWVudC5yZWZfcXVlc3Rpb25uYWlyZSA9IGluZGV4ICsgXCJcIjtcclxuICAgICAgICAgICAgaW5kZXgrKztcclxuICAgICAgICAgICBcclxuICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLnVwZGF0ZURvY3VtZW50KHRoaXMucXVpenNfaWQsIHtcclxuICAgICAgICAgICAgICAgICdxdWl6JyA6IHF1aXpzLFxyXG4gICAgICAgICAgICAgICAgJ3R5cGUnIDogJ3F1aXonXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeSh0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZXhlY3V0ZVF1ZXJ5KCdxdWl6JylbMF0ucXVpeikpO1xyXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyh0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZXhlY3V0ZVF1ZXJ5KCdxdWl6JylbMF0ucXVpei5sZW5ndGggKyAnIGVsZW1lbnRvcycpOyAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJEZXBvaXMgZG8gU2V0UXVpenMhXCIpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShxdWl6cywgbnVsbCwgNCkpXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldEFsbFF1aXpzKCkge1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coXCJBIG9idGVyIElEIGRvcyBxdWl6c1wiKTtcclxuICAgICAgICBpZih0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZXhlY3V0ZVF1ZXJ5KCdxdWl6JykubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAvLy8vY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkodGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmV4ZWN1dGVRdWVyeSgncXVpeicpLCBudWxsLCA0KSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZXhlY3V0ZVF1ZXJ5KCdxdWl6Jyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vY29uc29sZS5sb2coJ3Bhc3NvdSBhcXVpJyk7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0TGF0ZXN0UXVpekRhdGEoKSB7XHJcbiAgICAgICAgdmFyIHF1aXpzID0gdGhpcy5nZXRBbGxRdWl6cygpO1xyXG5cclxuICAgICAgICBpZihxdWl6cykge1xyXG4gICAgICAgICAgICB2YXIgbGFzdFF1aXo7XHJcblxyXG4gICAgICAgICAgICBsYXN0UXVpeiA9IHF1aXpzW3F1aXpzLmxlbmd0aCAtIDFdO1xyXG4gICAgICAgICAgICByZXR1cm4gbGFzdFF1aXouX2lkO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLy8vY29uc29sZS5sb2coJ3Bhc3NvdSBhcXVpLTEnKTtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRMYXRlc3RQYXRpZW50RGF0YSgpIHtcclxuICAgICAgICB2YXIgcGF0aWVudHNEYXRhID0gdGhpcy5nZXRBbGxQYXRpZW50c0RhdGEoKTtcclxuXHJcbiAgICAgICAgaWYocGF0aWVudHNEYXRhKSB7XHJcbiAgICAgICAgICAgIHZhciBsYXN0RGF0YTtcclxuXHJcbiAgICAgICAgICAgIGxhc3REYXRhID0gcGF0aWVudHNEYXRhW3BhdGllbnRzRGF0YS5sZW5ndGggLSAxXTtcclxuICAgICAgICAgICAgcmV0dXJuIGxhc3REYXRhLl9pZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0UXVpenMoKSB7XHJcbiAgICAgICAgLy8vL2NvbnNvbGUubG9nKHRoaXMucXVpenNfaWQpO1xyXG4gICAgICAgIC8vLy9jb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeSh0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZ2V0RG9jdW1lbnQodGhpcy5xdWl6c19pZCkpKTtcclxuICAgICAgICAvLy8vY29uc29sZS5sb2codGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmV4ZWN1dGVRdWVyeSgncXVpeicpLmxlbmd0aCk7XHJcbiAgICAgICAgaWYodGhpcy5xdWl6c19pZCkge1xyXG4gICAgICAgICAgICBpZih0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZXhlY3V0ZVF1ZXJ5KCdxdWl6JykubGVuZ3RoID4gMCkgeyAgICAgICAgXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmdldERvY3VtZW50KHRoaXMucXVpenNfaWQpLnF1aXo7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgaXNHbG9iYWxTZXQoKSB7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIkdMT0JBTFNJWkU6IFwiICsgdGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmV4ZWN1dGVRdWVyeSgnZ2xvYmFsJykubGVuZ3RoKTtcclxuICAgICAgICBpZih0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZXhlY3V0ZVF1ZXJ5KCdnbG9iYWwnKS5sZW5ndGggPiAwKSB7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0R2xvYmFsc0lEKCkge1xyXG4gICAgICAgIGlmKHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5leGVjdXRlUXVlcnkoJ2dsb2JhbCcpLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgLy8vL2NvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5leGVjdXRlUXVlcnkoXCJnbG9iYWxcIiksIG51bGwsIDQpKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZXhlY3V0ZVF1ZXJ5KCdnbG9iYWwnKVswXS5faWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldEFsbFBhdGllbnRzRGF0YSgpIHtcclxuICAgICAgICBpZih0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZXhlY3V0ZVF1ZXJ5KFwiZGF0YVwiKS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgIC8vIC8vY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkodGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmV4ZWN1dGVRdWVyeShcImRhdGFcIiksIG51bGwsIDQpKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5leGVjdXRlUXVlcnkoXCJkYXRhXCIpO1xyXG4gICAgICAgIH0gICAgICAgICBcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgdXBkYXRlUXVpelN0YXR1cyhxdWVzdGlvbm5haXJlKSB7ICAgICAgICBcclxuICAgICAgICB2YXIgcXVpenMgPSB0aGlzLmdldFF1aXpzKCk7XHJcbiAgICAgICAgaWYocXVpenMpIHtcclxuICAgICAgICAgICAgcXVpenMuZm9yRWFjaChlbGVtZW50X3F1aXogPT4ge1xyXG4gICAgICAgICAgICAgICBpZihlbGVtZW50X3F1aXoucmVmX3F1ZXN0aW9ubmFpcmUgPT0gcXVlc3Rpb25uYWlyZS5yZWZfcXVlc3Rpb25uYWlyZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnRfcXVpei5kb25lID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgZWxlbWVudF9xdWl6LnF1ZXN0aW9ucy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50X3F1aXoucXVlc3Rpb25zW2ldLnJlc3BvbnNlID0gcXVlc3Rpb25uYWlyZS5xdWVzdGlvbnNbaV0ucmVzcG9uc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS51cGRhdGVEb2N1bWVudCh0aGlzLnF1aXpzX2lkLCB7XHJcbiAgICAgICAgICAgICAgICAncXVpeicgOiBxdWl6cyxcclxuICAgICAgICAgICAgICAgICd0eXBlJyA6ICdxdWl6J1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgLy90aGlzLnNob3dEYXRhKCdxdWl6Jyk7XHJcbiAgICAgICAgICAgIHRoaXMuY2hlY2tRdWl6U3RhdHVzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgY2hlY2tRdWl6U3RhdHVzKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdBIFZFUklGSUNBUiBTRSBIQSBRVUlaUyBQT1IgRkFaRVInKTtcclxuICAgICAgICB2YXIgcXVpenMgPSB0aGlzLmdldFF1aXpzKCk7XHJcbiAgICAgICAgdmFyIGdsb2JhbCA9IHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5nZXREb2N1bWVudCh0aGlzLmdsb2JhbERhdGFfaWQpO1xyXG5cclxuICAgICAgICBpZihxdWl6cykge1xyXG4gICAgICAgICAgICAvLy8vY29uc29sZS5sb2coJ3Bhc3NvdSBhcXVpLTInKTtcclxuICAgICAgICAgICAgdmFyIHF1aXpfZG9uZSA9IFtdO1xyXG4gICAgICAgICAgICB2YXIgZm91bmRfcXVpel90b2RvID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHF1aXpfZG9uZS5wdXNoKHF1aXpzLm1hcChmdW5jdGlvbihxdWl6cyl7cmV0dXJuIHF1aXpzLmRvbmV9KSk7XHJcbiAgICAgICAgICAgIHF1aXpfZG9uZVswXS5mb3JFYWNoKHF1aXpfcmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJBIHZlcmlmaWNhciBlc3RhZG8gZGFzIGF2YWxpYcOnw7Vlc1wiKTtcclxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJzE6ICcgKyBxdWl6X3Jlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGlmKCFxdWl6X3Jlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvdW5kX3F1aXpfdG9kbyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIkEgbXVkYXIgZXN0YWRvIGRhcyBhdmFsaWHDp8O1ZXNcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLnVwZGF0ZURvY3VtZW50KHRoaXMuZ2xvYmFsRGF0YV9pZCwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImV2YWx1YXRpb25zVG9Eb1wiIDogXCJ0cnVlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiIDogXCJnbG9iYWxcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJkYXRhUmVxdWVzdFwiIDogZ2xvYmFsLmRhdGFSZXF1ZXN0XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7ICAgXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgaWYoIWZvdW5kX3F1aXpfdG9kbykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLnVwZGF0ZURvY3VtZW50KHRoaXMuZ2xvYmFsRGF0YV9pZCwge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiZXZhbHVhdGlvbnNUb0RvXCIgOiBcImZhbHNlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCIgOiBcImdsb2JhbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZGF0YVJlcXVlc3RcIiA6IGdsb2JhbC5kYXRhUmVxdWVzdFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLnVwZGF0ZURvY3VtZW50KHRoaXMuZ2xvYmFsRGF0YV9pZCwge1xyXG4gICAgICAgICAgICAgICAgXCJldmFsdWF0aW9uc1RvRG9cIiA6IFwiZmFsc2VcIixcclxuICAgICAgICAgICAgICAgIFwidHlwZVwiIDogXCJnbG9iYWxcIixcclxuICAgICAgICAgICAgICAgIFwiZGF0YVJlcXVlc3RcIiA6IGdsb2JhbC5kYXRhUmVxdWVzdFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZygnVGVybWlub3UgY2hlY2tRdWl6c3RhdHVzJyk7ICAgXHJcbiAgICB9XHJcbiAgICBoYXNFdmFsdWF0aW9uc1RvRG8oKSB7XHJcbiAgICAgICAgLy90aGlzLmNoZWNrUXVpelN0YXR1cygpO1xyXG4gICAgICAgIC8qXHJcbiAgICAgICAgLy9jb25zb2xlLmxvZygnR0xPQkFMIElEOiAnICsgdGhpcy5nbG9iYWxEYXRhX2lkKTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5nZXREb2N1bWVudCh0aGlzLmdsb2JhbERhdGFfaWQpLCBudWxsLCA0KSk7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZygnRXZhbHVhdGlvbnMgdG8gZG86JyArIHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5nZXREb2N1bWVudCh0aGlzLmdsb2JhbERhdGFfaWQpLmV2YWx1YXRpb25zVG9EbylcclxuICAgICAgICAqL1xyXG4gICAgICAgIGlmKHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5nZXREb2N1bWVudCh0aGlzLmdsb2JhbERhdGFfaWQpLmV2YWx1YXRpb25zVG9EbyA9PSBcInRydWVcIikge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgaXNRdWl6c1NldCgpIHtcclxuICAgICAgICAvLy8vY29uc29sZS5sb2coJ1FVSVotSUQ6ICcgKyB0aGlzLnF1aXpzX2lkKTtcclxuICAgICAgICBpZih0aGlzLnF1aXpzX2lkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBkZWxldGVRdWVzdGlvbm5haXJlKHF1ZXN0aW9ubmFpcmVzKSB7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIkEgYXBhZ2FyIHF1aXpzIVwiKTtcclxuICAgICAgICB2YXIgcXVpenMgPSB0aGlzLmdldFF1aXpzKCk7XHJcbiAgICAgICAgdmFyIGZvdW5kX2VxdWFsO1xyXG4gICAgICAgIHZhciBxdWl6c190ZW1wID0gW107XHJcbiAgICAgICAgICAgIC8vLy9jb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShxdWl6cywgbnVsbCwgNCkpO1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiUXVpenMgZGEgQkQ6IFwiKTtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShxdWl6cywgbnVsbCwgNCkpO1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiUXVpenMgRU5WSUFET1M6IFwiKTtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShxdWVzdGlvbm5haXJlcywgbnVsbCwgNCkpO1xyXG4gICAgICAgICAgICBxdWl6cy5mb3JFYWNoKHF1ZXN0aW9ubmFpcmVfQkQgPT4ge1xyXG4gICAgICAgICAgICAgICAgZm91bmRfZXF1YWwgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJSRUZFUkVOQ0lBIERPIFFVSVogQkQ6IFwiICsgcXVlc3Rpb25uYWlyZV9CRC5yZWZfcXVlc3Rpb25uYWlyZSk7XHJcbiAgICAgICAgICAgICAgICBxdWVzdGlvbm5haXJlcy5mb3JFYWNoKHF1ZXN0aW9ubmFpcmVfc2VudCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIlJFRkVSRU5DSUEgRE8gUVVJWiBFTlZJQURPOiBcIiArIHF1ZXN0aW9ubmFpcmVfc2VudC5yZWZfcXVlc3Rpb25uYWlyZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYocXVlc3Rpb25uYWlyZV9zZW50LnJlZl9xdWVzdGlvbm5haXJlID09IHF1ZXN0aW9ubmFpcmVfQkQucmVmX3F1ZXN0aW9ubmFpcmUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIlJFRkVSRU5DSUEgRE8gUVVJWiBBIEVMSU1JTkFSOiBcIiArIHF1ZXN0aW9ubmFpcmVfc2VudC5yZWZfcXVlc3Rpb25uYWlyZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgLy8gcXVpenMuc3BsaWNlKHF1ZXN0aW9ubmFpcmVfQkQucmVmX3F1ZXN0aW9ubmFpcmUsIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgIGZvdW5kX2VxdWFsID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBpZighZm91bmRfZXF1YWwpIHtcclxuICAgICAgICAgICAgICAgICAgICBxdWl6c190ZW1wLnB1c2gocXVlc3Rpb25uYWlyZV9CRCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKFwiTnVtZXJvIGRlIHF1aXplcyBwb3IgZmF6ZXI6IFwiICsgcXVpenMubGVuZ3RoKTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHF1aXpzLCBudWxsLCA0KSk7XHJcbiAgICAgICAgcXVpenMgPSBxdWl6c190ZW1wO1xyXG5cclxuICAgICAgICBpZihxdWl6cy5sZW5ndGggID09IDApIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJBIGFwYWdhciBkb2MgY29ycmVudGUgZGUgcXVpenNcIik7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5kZWxldGVEb2N1bWVudCh0aGlzLnF1aXpzX2lkKTtcclxuICAgICAgICAgICAgdGhpcy5xdWl6c19pZCA9IG51bGw7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbGV0IGluZGV4ID0gMDtcclxuICAgICAgICAgICAgcXVpenMuZm9yRWFjaChlbGVtZW50ID0+IHtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQucmVmX3F1ZXN0aW9ubmFpcmUgPSBpbmRleCArIFwiXCI7XHJcbiAgICAgICAgICAgICAgICBpbmRleCsrO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ0Fww7NzIHJlaW5kZXhhw6fDo28hJyk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHF1aXpzLCBudWxsLCA0KSk7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS51cGRhdGVEb2N1bWVudCh0aGlzLnF1aXpzX2lkLCB7XHJcbiAgICAgICAgICAgICAgICAncXVpeicgOiBxdWl6cyxcclxuICAgICAgICAgICAgICAgICd0eXBlJyA6ICdxdWl6J1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJOT1ZPIEFSUkFZIERFIFFVSVpTIE5BIEJEXCIpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeSh0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZ2V0RG9jdW1lbnQodGhpcy5xdWl6c19pZCksIG51bGwsIDQpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBhZGRRdWVzdGlvbm5haXJlVG9EQihxdWVzdGlvbm5haXJlKSB7XHJcbiAgICAgICAgaWYoIXRoaXMuaXNTZXRRdWl6c0RvbmUoKSkge1xyXG4gICAgICAgICAgICB0aGlzLnF1aXpzX2RvbmVfaWQgPSB0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuY3JlYXRlRG9jdW1lbnQoe1xyXG4gICAgICAgICAgICAgICAgJ3R5cGUnIDogJ3F1aXpzT25Ib2xkJyxcclxuICAgICAgICAgICAgICAgICdxdWVzdGlvbm5haXJlcycgOiBxdWVzdGlvbm5haXJlIFxyXG4gICAgICAgICAgICB9KTsgICAgICAgICAgICBcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB2YXIgcXVpenNPbkhvbGRfQkQgPSB0aGlzLmdldEFsbFF1aXpzT25Ib2xkKCk7XHJcbiAgICAgICAgICAgIHF1aXpzT25Ib2xkX0JELnB1c2gocXVlc3Rpb25uYWlyZSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnF1aXpzX2RvbmVfaWQgPSB0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkudXBkYXRlRG9jdW1lbnQoe1xyXG4gICAgICAgICAgICAgICAgJ3R5cGUnIDogJ3F1aXpzT25Ib2xkJyxcclxuICAgICAgICAgICAgICAgICdxdWVzdGlvbm5haXJlcycgOiBxdWl6c09uSG9sZF9CRCBcclxuICAgICAgICAgICAgfSk7IFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGlzU2V0UXVpenNEb25lKCkge1xyXG4gICAgICAgIGlmKHRoaXMucXVpenNfZG9uZV9pZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgZ2V0UXVpenNPbkhvbGRfSUQoKSB7XHJcbiAgICAgICAgaWYodGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmV4ZWN1dGVRdWVyeSgncXVpek9uSG9sZCcpLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgLy8vL2NvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5leGVjdXRlUXVlcnkoXCJxdWl6T25Ib2xkXCIpLCBudWxsLCA0KSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZXhlY3V0ZVF1ZXJ5KCdxdWl6T25Ib2xkJylbMF0uX2lkO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIGdldEFsbFF1aXpzT25Ib2xkKCkge1xyXG4gICAgICAgIGlmKHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5leGVjdXRlUXVlcnkoJ3F1aXpPbkhvbGQnKS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIC8vLy9jb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeSh0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZXhlY3V0ZVF1ZXJ5KFwicXVpek9uSG9sZFwiKSwgbnVsbCwgNCkpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmV4ZWN1dGVRdWVyeSgncXVpek9uSG9sZCcpLnF1ZXN0aW9ubmFpcmVzO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxufSJdfQ==