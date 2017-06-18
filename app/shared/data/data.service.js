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
        //this.showData('quiz');
        this.init();
        //this.showData('global');
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
        //console.log('A VERIFICAR SE HA QUIZS POR FAZER');
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
        ////console.log('passou aqui - 3');   
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGF0YS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxnQ0FBa0M7QUFDbEMsaUNBQStCO0FBSS9CLHNDQUEyQztBQU8zQyx1Q0FBc0M7QUFNdEMsSUFBYSxXQUFXO0lBaUJwQixxQkFBbUIsUUFBa0I7UUFDN0IsMkNBQTJDO1FBQzNDLHFDQUFxQztRQUNyQywwQkFBMEI7UUFDMUIsMEJBQTBCO1FBQzFCLDRCQUE0QjtRQUM1QiwwQkFBMEI7UUFOZixhQUFRLEdBQVIsUUFBUSxDQUFVO1FBUTdCLGlKQUFpSjtRQUNqSix3QkFBd0I7UUFDeEIsNkJBQTZCO1FBQzdCLHdCQUF3QjtRQUN4QixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDWiwwQkFBMEI7UUFFMUIsRUFBRTtJQUVWLENBQUM7SUFFRCwwQkFBSSxHQUFKO1FBQ0ksMEJBQTBCO1FBQzFCLHdCQUF3QjtRQUN4QixvREFBb0Q7UUFDcEQsMENBQTBDO1FBQzFDLEtBQUs7UUFDTCxFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLCtDQUErQztZQUMvQyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUN6QyxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7WUFFekUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRTtnQkFDM0QsTUFBTSxFQUFFLFFBQVE7Z0JBQ2hCLGFBQWEsRUFBRSxPQUFPO2dCQUN0QixpQkFBaUIsRUFBRyxNQUFNLENBQUMsZUFBZTthQUM3QyxDQUFDLENBQUM7UUFJUCxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFD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QyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQ3pFLENBQUM7UUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFDRCx1Q0FBaUIsR0FBakI7UUFDSSxFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNuRSxpR0FBaUc7WUFDakcsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxDQUFDLGNBQWMsQ0FBQztRQUNqRixDQUFDO1FBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNoQixDQUFDO0lBQ0wsa0JBQUM7QUFBRCxDQUFDLEFBbG5CRCxJQWtuQkM7QUFsbkJZLFdBQVc7SUFEdkIsaUJBQVUsRUFBRTtxQ0FrQm9CLG1CQUFRO0dBakI1QixXQUFXLENBa25CdkI7QUFsbkJZLGtDQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgZnMgZnJvbSBcImZpbGUtc3lzdGVtXCI7XHJcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvbWFwJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XHJcbmltcG9ydCB7IENvbm5lY3RvclNlcnZpY2UgfSBmcm9tICcuLi8uLi9zaGFyZWQvY29ubmVjdG9yL2Nvbm5lY3Rvci5zZXJ2aWNlJztcclxuXHJcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBNYXRlcmlhbHMgfSBmcm9tIFwiLi9tYXRlcmlhbHNcIjtcclxuaW1wb3J0IHsgTWF0ZXJpYWwgfSBmcm9tIFwiLi4vLi4vbWF0ZXJpYWwvbWF0ZXJpYWxcIjtcclxuaW1wb3J0IHsgRGF0YSB9IGZyb20gXCIuL2RhdGFcIjtcclxuaW1wb3J0IHsgTmVlZHMgfSBmcm9tIFwiLi9uZWVkc1wiO1xyXG5pbXBvcnQgeyBQYXRpZW50IH0gZnJvbSBcIi4uLy4uL3BhdGllbnQvcGF0aWVudFwiO1xyXG5pbXBvcnQgeyBDb3VjaGJhc2UgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWNvdWNoYmFzZVwiO1xyXG5pbXBvcnQgeyBEYXRhYmFzZSB9IGZyb20gXCIuL2RhdGFiYXNlXCI7XHJcbmltcG9ydCB7IFVzZXJTZXJ2aWNlIH0gZnJvbSAnLi4vdXNlci91c2VyLnNlcnZpY2UnO1xyXG5cclxuXHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBEYXRhU2VydmljZSB7XHJcblxyXG4gICAgcHVibGljIHBhdGllbnRzRGF0YV9pZDogYW55O1xyXG4gICAgcHVibGljIHVzZXJEYXRhX2lkOiBhbnk7XHJcbiAgICBwdWJsaWMgbWF0ZXJpYWxzX2lkOiBhbnk7XHJcbiAgICBwdWJsaWMgcmF0aW5nc19pZDogYW55O1xyXG4gICAgcHVibGljIGdsb2JhbERhdGFfaWQ6IGFueTtcclxuICAgIHB1YmxpYyBxdWl6c19pZDogYW55O1xyXG4gICAgcHVibGljIHF1aXpzX2RvbmVfaWQ6IGFueTtcclxuXHJcbiAgICBwdWJsaWMgUmVxdWVzdERhdGFfY29udHJvbDogYW55O1xyXG5cclxuICAgIHB1YmxpYyBmaWxlOiBmcy5GaWxlO1xyXG4gICAgcHVibGljIGZvbGRlcjogZnMuRm9sZGVyO1xyXG4gICAgcHVibGljIGZvbGRlck5hbWU6IHN0cmluZztcclxuICAgIHB1YmxpYyBmaWxlTmFtZTogc3RyaW5nO1xyXG4gXHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZGF0YWJhc2U6IERhdGFiYXNlKXtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnSW5zdGFuY2lvdSAtIERhdGFTZXJ2aWNlIScpO1xyXG4gICAgICAgICAgICAvL3RoaXMuZGF0YSA9IGRhdGFiYXNlLmdldERhdGFiYXNlKCk7XHJcbiAgICAgICAgICAgIC8vdGhpcy5kZWxldGVEYXRhKCdxdWl6Jyk7XHJcbiAgICAgICAgICAgIC8vdGhpcy5kZWxldGVEYXRhKCd1c2VyJyk7XHJcbiAgICAgICAgICAgIC8vdGhpcy5kZWxldGVEYXRhKCdnbG9iYWwnKTtcclxuICAgICAgICAgICAgLy90aGlzLmRlbGV0ZURhdGEoJ2RhdGEnKTtcclxuXHJcbiAgICAgICAgICAgIC8vdGhpcy5zaG93RGF0YSgnZGF0YScpOyAvL0VzdGEgYSBkYXIgZXhjZXBjYW8gZSBhIGltcHJpbWlyIG9zIHVzZXJzIHRiPz8/ISEhISEgKHBvciBjb25maXJtYXIpIHBxIG4gdGVtIGRhZG9zIGUgZXN0b2lyYT8/IG1hcyBpbXByaW1lIG8gdXNlciBwcT9cclxuICAgICAgICAgICAgLy90aGlzLnNob3dEYXRhKCd1c2VyJyk7XHJcbiAgICAgICAgICAgIC8vdGhpcy5zaG93RGF0YSgnbWF0ZXJpYWxzJyk7XHJcbiAgICAgICAgICAgIC8vdGhpcy5zaG93RGF0YSgncXVpeicpO1xyXG4gICAgICAgICAgICB0aGlzLmluaXQoKTtcclxuICAgICAgICAgICAgLy90aGlzLnNob3dEYXRhKCdnbG9iYWwnKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vXHJcbiAgICAgICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGluaXQoKSB7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIkJEIFVTQURBXCIpO1xyXG4gICAgICAgIC8vdGhpcy5zaG93RGF0YShcInF1aXpcIik7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZygnQSBpbmljaWFsaXphciBhcyB2YXJpw6F2ZWlzIGdsb2JhaXMnKTtcclxuICAgICAgICAvL0FkaWNpb25hciBudW1lcm8gZGUgYXZhbGlhw6fDtWVzIHBlbmRlbnRlc1xyXG4gICAgICAgIC8vLi4uXHJcbiAgICAgICAgaWYodGhpcy5pc0dsb2JhbFNldCgpKSB7XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ0EgYXR1YWxpemFyIGdsb2JhbCBkZSBjb25leGFvJyk7XHJcbiAgICAgICAgICAgIHRoaXMuZ2xvYmFsRGF0YV9pZCA9IHRoaXMuZ2V0R2xvYmFsc0lEKCk7XHJcbiAgICAgICAgICAgIHZhciBnbG9iYWwgPSB0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZ2V0RG9jdW1lbnQodGhpcy5nbG9iYWxEYXRhX2lkKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS51cGRhdGVEb2N1bWVudCh0aGlzLmdsb2JhbERhdGFfaWQsIHtcclxuICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImdsb2JhbFwiLFxyXG4gICAgICAgICAgICAgICAgXCJkYXRhUmVxdWVzdFwiOiBcImZhbHNlXCIsXHJcbiAgICAgICAgICAgICAgICBcImV2YWx1YXRpb25zVG9Eb1wiIDogZ2xvYmFsLmV2YWx1YXRpb25zVG9Eb1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkodGhpcy5nbG9iYWxEYXRhX2lkKSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ0EgY3JpYXIgb2JqZXRvIHBhcmEgYXMgdmFyacOhdmVpcyBnbG9iYWlzJyk7XHJcbiAgICAgICAgICAgIC8vY3JpYXIgdmFyacOhdmVsIGdsb2JhbCBib29sZWFuIHBhcmEgZGl6ZXIgc2UgaMOhIHF1aXplcyBwYXJhIGZhemVyIHVwZGF0ZSBvdSBuXHJcbiAgICAgICAgICAgIHRoaXMuZ2xvYmFsRGF0YV9pZCA9IHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5jcmVhdGVEb2N1bWVudCh7XHJcbiAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJnbG9iYWxcIixcclxuICAgICAgICAgICAgICAgIFwiZGF0YVJlcXVlc3RcIjogXCJmYWxzZVwiLFxyXG4gICAgICAgICAgICAgICAgXCJldmFsdWF0aW9uc1RvRG9cIiA6IFwiZmFsc2VcIlxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgLy8vL2NvbnNvbGUubG9nKCdOT1ZPIEdMT0JBTCBJRDogJyArIHRoaXMuZ2xvYmFsRGF0YV9pZCk7ICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnVzZXJEYXRhX2lkID0gdGhpcy5nZXRDdXJyZW50VXNlckRvY0lEKCk7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIlFVSVpTIFVTRVIgRE9DIElEOiBcIiArIHRoaXMudXNlckRhdGFfaWQpO1xyXG4gICAgICAgIHRoaXMucGF0aWVudHNEYXRhX2lkID0gdGhpcy5nZXRMYXRlc3RQYXRpZW50RGF0YSgpO1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coXCJQQVRJRU5UUyBET0MgSUQ6IFwiICsgdGhpcy5wYXRpZW50c0RhdGFfaWQpO1xyXG4gICAgICAgIHRoaXMucXVpenNfaWQgPSB0aGlzLmdldExhdGVzdFF1aXpEYXRhKCk7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIlFVSVpTIERPQyBJRDogXCIgKyB0aGlzLnF1aXpzX2lkKTtcclxuICAgICAgICAvL3RoaXMucXVpenNfZG9uZV9pZCA9IHRoaXMuZ2V0UXVpenNPbkhvbGRfSUQoKTtcclxuXHJcbiAgICAgICAgLy92ZXJpZmljYXIgc2UgaMOhIHF1ZXN0aW9uw6FyaW9zIHBhcmEgcHJlZW5jaGVyXHJcbiAgICAgICAgLy90aGlzLmNoZWNrUXVpelN0YXR1cygpO1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG4gICAgc3luYygpIHtcclxuICAgICAgICAvKlxyXG4gICAgICAgIHRoaXMuY29ubmVjdG9yU2VydmljZS5nZXRQYXRpZW50cygpXHJcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgIChyZXN1bHQpID0+IHRoaXMub25HZXREYXRhU3VjY2VzcyhyZXN1bHQpLFxyXG4gICAgICAgICAgICAoZXJyb3IpID0+IHRoaXMub25HZXREYXRhRXJyb3IoZXJyb3IpXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICovXHJcbiAgICB9XHJcbiBcclxuICAgIHNldFVzZXIocmVnaXN0ZXJlZFVzZXIpIHtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKCdBIGdyYXZhciBvIHV0aWxpemFkb3InKTtcclxuICAgICAgICB0aGlzLnVzZXJEYXRhX2lkID0gdGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmNyZWF0ZURvY3VtZW50KHtcclxuICAgICAgICAgICAgXCJ0eXBlXCI6IFwidXNlclwiLFxyXG4gICAgICAgICAgICBcInVzZXJcIjogcmVnaXN0ZXJlZFVzZXJcclxuICAgICAgICB9KTtcclxuICAgICAgICAvLy8vY29uc29sZS5sb2coXCJBUVVJXCIrSlNPTi5zdHJpbmdpZnkodGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmdldERvY3VtZW50KHRoaXMudXNlckRhdGFfaWQsIG51bGwsIDQpKSk7XHJcbiAgICB9XHJcbiAgICBzZXRQYXRpZW50cygpIHtcclxuXHJcbiAgICB9XHJcbiAgICBzZXRNYXRlcmlhbHMoKSB7XHJcblxyXG4gICAgfVxyXG4gICAgZ2V0UGF0aWVudHNEYXRhKCl7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZygnQSBkZXZvbHZlciB0b2RvcyBvcyBkYWRvcyBkYSBCRCcpO1xyXG4gICAgICAgIC8vY29uc29sZS5sb2codGhpcy5wYXRpZW50c0RhdGFfaWQpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZ2V0RG9jdW1lbnQodGhpcy5wYXRpZW50c0RhdGFfaWQpLmRhdGE7XHJcbiAgICB9XHJcbiAgICBzZXRQYXRpZW50c0RhdGEoZGF0YSkge1xyXG4gICAgICAgIC8vZGVidWdcclxuICAgICAgICAvL3RoaXMuZGVsZXRlRGF0YSgnZGF0YScpO1xyXG4gICAgICAgIC8vdGhpcy5kZWxldGVEYXRhKCdtYXRlcmlhbHMnKTtcclxuICAgICAgICBcclxuICAgICAgICAvL1RvZG9zIG9zIGRhZG9zIGRvIHBhY2llbnRlIGUgcmVmIF9pZFxyXG4gICAgICAgIGlmKHRoaXMucGF0aWVudHNEYXRhX2lkKSB7XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ0EgYXR1YWxpemFyIG9zIGRhZG9zIGRvcyBwYWNpZW50ZXMgbmEgYmQsIGNvbSBvIGlkICcgKyB0aGlzLnBhdGllbnRzRGF0YV9pZCk7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS51cGRhdGVEb2N1bWVudCh0aGlzLnBhdGllbnRzRGF0YV9pZCwge1xyXG4gICAgICAgICAgICAgICAgXCJkYXRhXCI6IGRhdGEsXHJcbiAgICAgICAgICAgICAgICBcInR5cGVcIiA6IFwiZGF0YVwiXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ0dyYXZhciBkYWRvcyBQYWNpZW50ZXMnKTtcclxuICAgICAgICAgICAgdGhpcy5wYXRpZW50c0RhdGFfaWQgPSB0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuY3JlYXRlRG9jdW1lbnQoe1xyXG4gICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGF0YVwiLFxyXG4gICAgICAgICAgICAgICAgXCJkYXRhXCI6IGRhdGFcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL3RoaXMubWVkaWFQZXJzaXN0ZW5jZShkYXRhKTtcclxuICAgICAgICBcclxuXHJcbiAgICAgICAgLy9HdWFyZGEgZGFkb3MgZG9zIFBhY2llbnRlc1xyXG4gICAgICAgIC8vR3VhcmRhIGRhZG9zIGRhcyBuZWNlc3NpZGFkZXNcclxuICAgICAgICB2YXIgZ2xvYmFsID0gdGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmdldERvY3VtZW50KHRoaXMuZ2xvYmFsRGF0YV9pZCk7XHJcblxyXG4gICAgICAgIHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS51cGRhdGVEb2N1bWVudCh0aGlzLmdsb2JhbERhdGFfaWQsIHtcclxuICAgICAgICAgICAgXCJ0eXBlXCIgOiBcImdsb2JhbFwiLFxyXG4gICAgICAgICAgICBcImRhdGFSZXF1ZXN0XCI6IFwidHJ1ZVwiLFxyXG4gICAgICAgICAgICBcImV2YWx1YXRpb25zVG9Eb1wiIDogZ2xvYmFsLmV2YWx1YXRpb25zVG9Eb1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9KTtcclxuICAgICAgICAvL3ZlciBvIGdldCBkb2N1bWVudCB0YiBlIGNvbXBhcmFyXHJcbiAgICAgICAgdGhpcy5zaG93RGF0YSgnZ2xvYmFsJyk7XHJcbiAgICB9XHJcbiAgICBtZWRpYVBlcnNpc3RlbmNlKGRhdGEpIHtcclxuICAgICAgICAgIC8qKlxyXG4gICAgICAgICAqIEFicmlyIHRvZG8gbyBjb250ZcO6ZG8gZGEgcGFzdGEgbWF0ZXJpYWxzXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdmFyIGRvY3VtZW50cyA9IGZzLmtub3duRm9sZGVycy5kb2N1bWVudHMoKTtcclxuICAgICAgICB2YXIgcGF0aCA9IGZzLnBhdGguam9pbihkb2N1bWVudHMucGF0aCwgXCJhcHAvbWF0ZXJpYWxzXCIpO1xyXG5cclxuICAgICAgICAvLy8vY29uc29sZS5sb2cocGF0aCk7XHJcbiAgICB9XHJcbiAgXHJcbiAgICBzZXROZWVkcygpIHtcclxuXHJcbiAgICB9XHJcbiAgICBnZXRUb2tlbigpOiBzdHJpbmcge1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coJ0EgZGV2b2x2ZXIgdG9rZW4nKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmdldERvY3VtZW50KHRoaXMudXNlckRhdGFfaWQpLnVzZXIuY2FyZWdpdmVyX3Rva2VuO1xyXG4gICAgfVxyXG4gICAgZ2V0VXNlcklEKCk6IHN0cmluZyB7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZygnQSBvIElEIGRvIHVzZXInKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmdldERvY3VtZW50KHRoaXMudXNlckRhdGFfaWQpLnVzZXIuaWQ7XHJcbiAgICB9XHJcbiAgICBnZXRMYXRlc3RVc2VyVG9SZWdpc3RlcigpIHtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKFwiQSBkZXZvbHZlciB1bHRpbW8gdXRpbGl6YWRvciByZWdpc3RhZG9cIilcclxuICAgICAgICB2YXIgdXNlcnMgPSB0aGlzLmdldEFsbFVzZXJzKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYodXNlcnMpIHtcclxuICAgICAgICAgICAgdmFyIGxhc3RVc2VyO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpIGluIHVzZXJzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodXNlcnMuaGFzT3duUHJvcGVydHkoaSkgJiYgdHlwZW9mKGkpICE9PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGFzdFVzZXIgPSB1c2Vyc1tpXTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gbGFzdFVzZXIudXNlcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGRlbGV0ZURhdGEodmlldykge1xyXG4gICAgICAgIGxldCBkb2N1bWVudHMgPSB0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZXhlY3V0ZVF1ZXJ5KHZpZXcpO1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coJ0EgYXBhZ2FyIGJkOiAnICsgdmlldyk7XHJcbiAgICAgICAgLy8gbG9vcCBvdmVyIGFsbCBkb2N1bWVudHNcclxuICAgICAgICBpZih0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZXhlY3V0ZVF1ZXJ5KHZpZXcpLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkb2N1bWVudHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIC8vIGRlbGV0ZSBlYWNoIGRvY3VtZW50XHJcbiAgICAgICAgICAgICAgICAvLyBjb3VjaGJhc2Ugd2lsbCBhc3NpZ24gYW4gaWQgKF9pZCkgdG8gYSBkb2N1bWVudCB3aGVuIGNyZWF0ZWRcclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5kZWxldGVEb2N1bWVudChkb2N1bWVudHNbaV0uX2lkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRBbGxVc2Vycygpe1xyXG4gICAgICAgIGlmKHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5leGVjdXRlUXVlcnkoXCJ1c2VyXCIpLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5leGVjdXRlUXVlcnkoXCJ1c2VyXCIpO1xyXG4gICAgICAgIH0gICAgICAgICBcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2hvd0RhdGEodmlldykge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdBIG1vc3RyYXIgYmQ6ICcgKyB2aWV3ICsgJyBjb20gJyArIHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5leGVjdXRlUXVlcnkodmlldykubGVuZ3RoICsgJyBlbGVtZW50b3MnKTtcclxuICAgICAgICBpZih0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZXhlY3V0ZVF1ZXJ5KHZpZXcpLmxlbmd0aCA+IDApIHsgICAgIFxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeSh0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZXhlY3V0ZVF1ZXJ5KHZpZXcpLCBudWxsLCA0KSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgIHB1YmxpYyBvbkNyZWF0ZUZpbGUoKSB7XHJcbiAgICAgICAgLy8gPj4gZnMtY3JlYXRlLWFsbC1jb2RlXHJcbiAgICAgICAgbGV0IGRvY3VtZW50cyA9IGZzLmtub3duRm9sZGVycy5kb2N1bWVudHMoKTtcclxuICAgICAgICB0aGlzLmZvbGRlciA9IGRvY3VtZW50cy5nZXRGb2xkZXIodGhpcy5mb2xkZXJOYW1lIHx8IFwidGVzdEZvbGRlclwiKTtcclxuICAgICAgICB0aGlzLmZpbGUgPSB0aGlzLmZvbGRlci5nZXRGaWxlKCh0aGlzLmZpbGVOYW1lIHx8IFwidGVzdEZpbGVcIikgKyBcIi50eHRcIik7XHJcblxyXG4gICAgICAgIFxyXG4gICAgICAgIC8qXHJcbiAgICAgICAgdGhpcy5maWxlLndyaXRlVGV4dCh0aGlzLmZpbGVUZXh0Q29udGVudCB8fCBcInNvbWUgcmFuZG9tIGNvbnRlbnRcIilcclxuICAgICAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgICAgIC8vIFN1Y2NlZWRlZCB3cml0aW5nIHRvIHRoZSBmaWxlLlxyXG4gICAgICAgICAgICAgICAgdGhpcy5maWxlLnJlYWRUZXh0KClcclxuICAgICAgICAgICAgICAgICAgICAudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN1Y2Nlc3NNZXNzYWdlID0gXCJTdWNjZXNzZnVsbHkgc2F2ZWQgaW4gXCIgKyB0aGlzLmZpbGUucGF0aDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy53cml0dGVuQ29udGVudCA9IHJlcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0l0ZW1WaXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSkuY2F0Y2goZXJyID0+IHtcclxuICAgICAgICAgICAgICAgIC8vIEVycm9yXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIC8vIDw8IGZzLWNyZWF0ZS1hbGwtY29kZVxyXG4gICAgICAgICovXHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0Q3VycmVudFVzZXJEb2NJRCgpIHtcclxuICAgICAgICB2YXIgdXNlcnMgPSB0aGlzLmdldEFsbFVzZXJzKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYodXNlcnMpIHtcclxuICAgICAgICAgICAgdmFyIGxhc3RVc2VyO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpIGluIHVzZXJzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodXNlcnMuaGFzT3duUHJvcGVydHkoaSkgJiYgdHlwZW9mKGkpICE9PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGFzdFVzZXIgPSB1c2Vyc1tpXTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gbGFzdFVzZXIuX2lkO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBpc1VzZXJBdXRoKCkge1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coJ0EgdmVyaWZpY2FyIHNlIGV4aXN0ZSB1dGlsaXphZG9yIG5hIEJEJyk7XHJcbiAgICAgICAgaWYodGhpcy51c2VyRGF0YV9pZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlOyBcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXRSYXRpbmcobWF0ZXJpYWw6IE1hdGVyaWFsLCBsZXZlbCkge1xyXG4gICAgICAgIGxldCBwYXRpZW50c0RhdGEgPSB0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZ2V0RG9jdW1lbnQodGhpcy5wYXRpZW50c0RhdGFfaWQpLmRhdGE7XHJcbiAgICAgICAgXHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHBhdGllbnRzRGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBmb3IobGV0IGogPSAwOyBqIDwgcGF0aWVudHNEYXRhW2ldLm5lZWRzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IobGV0IGsgPSAwOyBrIDwgcGF0aWVudHNEYXRhW2ldLm5lZWRzW2pdLm1hdGVyaWFscy5sZW5ndGg7IGsrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHBhdGllbnRzRGF0YVtpXS5uZWVkc1tqXS5tYXRlcmlhbHNba10uaWQgPT0gbWF0ZXJpYWwuaWQpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vLy9jb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShwYXRpZW50c0RhdGFbaV1bal1ba10sbnVsbCw0KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhdGllbnRzRGF0YVtpXS5uZWVkc1tqXS5tYXRlcmlhbHNba11bJ2V2YWx1YXRpb24nXSA9IGxldmVsOyAgICBcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLnVwZGF0ZURvY3VtZW50KHRoaXMucGF0aWVudHNEYXRhX2lkLCB7XHJcbiAgICAgICAgICAgIFwidHlwZVwiOiBcImRhdGFcIixcclxuICAgICAgICAgICAgXCJkYXRhXCI6IHBhdGllbnRzRGF0YSxcclxuICAgICAgICB9KVxyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuc2hvd0RhdGEoXCJkYXRhXCIpO1xyXG4gICAgfVxyXG4gICAgLypcclxuICAgIC8vR3VhcmRhIGF2YWxpYcOnw7VlcyBkb3MgbWF0ZXJpYWlzXHJcbiAgICBwdWJsaWMgc2V0UmF0aW5nKHJhdGluZykge1xyXG4gICAgICAgIC8qXHJcbiAgICAgICAgbGV0IHBhdGllbnRzRGF0YSA9IHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5nZXREb2N1bWVudCh0aGlzLnBhdGllbnRzRGF0YV9pZCkuZGF0YTtcclxuICAgICAgICAvLy8vY29uc29sZS5sb2coXCJFbnRyb3Ugbm8gZm9yXCIpO1xyXG4gICAgICAgIC8qXHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHBhdGllbnRzRGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBmb3IobGV0IGogPSAwOyBqIDwgcGF0aWVudHNEYXRhW2ldLm5lZWRzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IobGV0IGsgPSAwOyBrIDwgcGF0aWVudHNEYXRhW2ldLm5lZWRzW2pdLm1hdGVyaWFscy5sZW5ndGg7IGsrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXRpZW50c0RhdGFbaV0ubmVlZHNbal0ubWF0ZXJpYWxzW2tdWydyYXRpbmdzJ10gPSBbJyddO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgICovLypcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgcGF0aWVudHNEYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaiA9IDA7IGogPCBwYXRpZW50c0RhdGFbaV0ubmVlZHMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgIGZvcihsZXQgayA9IDA7IGsgPCBwYXRpZW50c0RhdGFbaV0ubmVlZHNbal0ubWF0ZXJpYWxzLmxlbmd0aDsgaysrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgaWYocGF0aWVudHNEYXRhW2ldLm5lZWRzW2pdLm1hdGVyaWFsc1trXS5pZCA9PSByYXRpbmcuaWRfbWF0ZXJpYWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8vL2NvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHBhdGllbnRzRGF0YVtpXVtqXVtrXSxudWxsLDQpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGF0aWVudHNEYXRhW2ldLm5lZWRzW2pdLm1hdGVyaWFsc1trXVsncmF0aW5ncyddID0gcmF0aW5nOyAgICBcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8vL2NvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHBhdGllbnRzRGF0YSxudWxsLDQpKTtcclxuICAgICAgICB0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkudXBkYXRlRG9jdW1lbnQodGhpcy5wYXRpZW50c0RhdGFfaWQsIHtcclxuICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGF0YVwiLFxyXG4gICAgICAgICAgICBcImRhdGFcIjogcGF0aWVudHNEYXRhLFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5zaG93RGF0YShcImRhdGFcIik7XHJcbiAgICB9XHJcbiAgICAqL1xyXG4gICAgcHVibGljIGdldE1hdGVyaWFsUmF0aW5nKG1hdGVyaWFsX2lkKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXROZWVkTWF0ZXJpYWxzKCkge1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coJ0EgZGV2b2x2ZXIgdG9kb3Mgb3MgbWF0ZXJpYWlzJyk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5nZXREb2N1bWVudCh0aGlzLm1hdGVyaWFsc19pZCkubWF0ZXJpYWxzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpc1BhdGllbnRzUmVxdWVzdERvbmUoKSB7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIkEgdmVyaWZpY2FyIHNlIG8gcGVkaWRvIGFvIHNlcnZpZG9yIGrDoSBmb2kgZmVpdG9cIik7XHJcbiAgICAgICAgaWYodGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmdldERvY3VtZW50KHRoaXMuZ2xvYmFsRGF0YV9pZCkuZGF0YVJlcXVlc3QgPT0gXCJmYWxzZVwiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHthbnl9IGNhcmVnaXZlclF1ZXN0aW9uYWlyZXMgXHJcbiAgICAgKiBcclxuICAgICAqIEBtZW1iZXJvZiBEYXRhU2VydmljZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0UXVpenMoY2FyZWdpdmVyUXVlc3Rpb25haXJlcykge1xyXG5cclxuICAgICAgICBpZihjYXJlZ2l2ZXJRdWVzdGlvbmFpcmVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIkVOVFJPVSBBUVVJIEUgU0VUT1UgTyBFVkFMVUFUSU9OUyBBIFRSVUUuIENvbXByaW1lbnRvIGRvIGFycmF5IGRlIHF1aXplczogXCIgKyBjYXJlZ2l2ZXJRdWVzdGlvbmFpcmVzLmxlbmd0aCk7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS51cGRhdGVEb2N1bWVudCh0aGlzLmdsb2JhbERhdGFfaWQsIHtcclxuICAgICAgICAgICAgICAgIFwiZXZhbHVhdGlvbnNUb0RvXCIgOiBcInRydWVcIixcclxuICAgICAgICAgICAgICAgIFwidHlwZVwiIDogXCJnbG9iYWxcIixcclxuICAgICAgICAgICAgICAgIFwiZGF0YVJlcXVlc3RcIiA6IFwidHJ1ZVwiXHJcbiAgICAgICAgICAgIH0pOyAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZighdGhpcy5pc1F1aXpzU2V0KCkpIHtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnTm92byBkb2MgZGUgUXVpenMnKTtcclxuICAgICAgICAgICAgdGhpcy5xdWl6c19pZCA9IHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5jcmVhdGVEb2N1bWVudCh7XHJcbiAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJxdWl6XCIsXHJcbiAgICAgICAgICAgICAgICBcInF1aXpcIjogY2FyZWdpdmVyUXVlc3Rpb25haXJlc1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5zaG93RGF0YSgncXVpeicpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHZhciBxdWl6c190b19hZGQgPSBbXTtcclxuICAgICAgICAgICAgdmFyIGZvdW5kX2NvbnRyb2wgPSBmYWxzZTsgLy92YXJpYXZlbCBkZSBjb250cm9sZSBkZSBub3ZvcyBxdWl6cyBhIGFkaWNpb25hclxyXG4gICAgICAgICAgICB2YXIgc2FtZV9xdWl6X2ZvdW5kID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdKw6EgZXhpc3RlbSBxdWl6cyBuYSBCRCcpO1xyXG4gICAgICAgICAgICB2YXIgcXVpenMgPSB0aGlzLmdldFF1aXpzKCk7XHJcbiAgICAgICAgICAgIC8vLy9jb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShxdWl6cywgbnVsbCwgNCkpO1xyXG4gICAgICAgICAgICBjYXJlZ2l2ZXJRdWVzdGlvbmFpcmVzLmZvckVhY2gocXVlc3Rpb25uYWlyZV9zZXJ2ZXIgPT4ge1xyXG4gICAgICAgICAgICAgICAgc2FtZV9xdWl6X2ZvdW5kID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBxdWl6cy5mb3JFYWNoKHF1ZXN0aW9ubmFpcmVfQkQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHF1ZXN0aW9ubmFpcmVfQkQuaWQgPT0gcXVlc3Rpb25uYWlyZV9zZXJ2ZXIuaWQgJiYgcXVlc3Rpb25uYWlyZV9CRC5yZWZlcmVuY2UgPT0gcXVlc3Rpb25uYWlyZV9zZXJ2ZXIucmVmZXJlbmNlICYmIHF1ZXN0aW9ubmFpcmVfQkQucmVmZXJlbmNlX25hbWUgPT0gcXVlc3Rpb25uYWlyZV9zZXJ2ZXIucmVmZXJlbmNlX25hbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnRW5jb250cm91IHF1aXogaWd1YWw6IGlkLScgKyBxdWVzdGlvbm5haXJlX0JELmlkICsgJyByZWZlcmVuY2UtJyArIHF1ZXN0aW9ubmFpcmVfQkQucmVmZXJlbmNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2FtZV9xdWl6X2ZvdW5kID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGlmKCFzYW1lX3F1aXpfZm91bmQpIHtcclxuICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdFbmNvbnRyZWkgcXVpenMgbm92b3M7Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgZm91bmRfY29udHJvbCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgcXVpenNfdG9fYWRkLnB1c2gocXVlc3Rpb25uYWlyZV9zZXJ2ZXIpO1xyXG4gICAgICAgICAgICAgICAgfSAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkocXVpenNfdG9fYWRkKSk7XHJcbiAgICAgICAgICAgIGlmKGZvdW5kX2NvbnRyb2wpIHtcclxuICAgICAgICAgICAgICAgIHF1aXpzX3RvX2FkZC5mb3JFYWNoKHF1aXogPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHF1aXpzLnB1c2gocXVpeik7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHF1aXpzLCBudWxsLCA0KSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvL2luZGV4IGFycmF5XHJcbiAgICAgICAgICAgIGxldCBpbmRleCA9IDA7XHJcbiAgICAgICAgICAgIHF1aXpzLmZvckVhY2goZWxlbWVudCA9PiB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQucmVmX3F1ZXN0aW9ubmFpcmUgPSBpbmRleCArIFwiXCI7XHJcbiAgICAgICAgICAgIGluZGV4Kys7XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS51cGRhdGVEb2N1bWVudCh0aGlzLnF1aXpzX2lkLCB7XHJcbiAgICAgICAgICAgICAgICAncXVpeicgOiBxdWl6cyxcclxuICAgICAgICAgICAgICAgICd0eXBlJyA6ICdxdWl6J1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkodGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmV4ZWN1dGVRdWVyeSgncXVpeicpWzBdLnF1aXopKTtcclxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2codGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmV4ZWN1dGVRdWVyeSgncXVpeicpWzBdLnF1aXoubGVuZ3RoICsgJyBlbGVtZW50b3MnKTsgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldEFsbFF1aXpzKCkge1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coXCJBIG9idGVyIElEIGRvcyBxdWl6c1wiKTtcclxuICAgICAgICBpZih0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZXhlY3V0ZVF1ZXJ5KCdxdWl6JykubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAvLy8vY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkodGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmV4ZWN1dGVRdWVyeSgncXVpeicpLCBudWxsLCA0KSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZXhlY3V0ZVF1ZXJ5KCdxdWl6Jyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vY29uc29sZS5sb2coJ3Bhc3NvdSBhcXVpJyk7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0TGF0ZXN0UXVpekRhdGEoKSB7XHJcbiAgICAgICAgdmFyIHF1aXpzID0gdGhpcy5nZXRBbGxRdWl6cygpO1xyXG5cclxuICAgICAgICBpZihxdWl6cykge1xyXG4gICAgICAgICAgICB2YXIgbGFzdFF1aXo7XHJcblxyXG4gICAgICAgICAgICBsYXN0UXVpeiA9IHF1aXpzW3F1aXpzLmxlbmd0aCAtIDFdO1xyXG4gICAgICAgICAgICByZXR1cm4gbGFzdFF1aXouX2lkO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLy8vY29uc29sZS5sb2coJ3Bhc3NvdSBhcXVpLTEnKTtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRMYXRlc3RQYXRpZW50RGF0YSgpIHtcclxuICAgICAgICB2YXIgcGF0aWVudHNEYXRhID0gdGhpcy5nZXRBbGxQYXRpZW50c0RhdGEoKTtcclxuXHJcbiAgICAgICAgaWYocGF0aWVudHNEYXRhKSB7XHJcbiAgICAgICAgICAgIHZhciBsYXN0RGF0YTtcclxuXHJcbiAgICAgICAgICAgIGxhc3REYXRhID0gcGF0aWVudHNEYXRhW3BhdGllbnRzRGF0YS5sZW5ndGggLSAxXTtcclxuICAgICAgICAgICAgcmV0dXJuIGxhc3REYXRhLl9pZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0UXVpenMoKSB7XHJcbiAgICAgICAgLy8vL2NvbnNvbGUubG9nKHRoaXMucXVpenNfaWQpO1xyXG4gICAgICAgIC8vLy9jb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeSh0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZ2V0RG9jdW1lbnQodGhpcy5xdWl6c19pZCkpKTtcclxuICAgICAgICAvLy8vY29uc29sZS5sb2codGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmV4ZWN1dGVRdWVyeSgncXVpeicpLmxlbmd0aCk7XHJcbiAgICAgICAgaWYodGhpcy5xdWl6c19pZCkge1xyXG4gICAgICAgICAgICBpZih0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZXhlY3V0ZVF1ZXJ5KCdxdWl6JykubGVuZ3RoID4gMCkgeyAgICAgICAgXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmdldERvY3VtZW50KHRoaXMucXVpenNfaWQpLnF1aXo7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgaXNHbG9iYWxTZXQoKSB7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIkdMT0JBTFNJWkU6IFwiICsgdGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmV4ZWN1dGVRdWVyeSgnZ2xvYmFsJykubGVuZ3RoKTtcclxuICAgICAgICBpZih0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZXhlY3V0ZVF1ZXJ5KCdnbG9iYWwnKS5sZW5ndGggPiAwKSB7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0R2xvYmFsc0lEKCkge1xyXG4gICAgICAgIGlmKHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5leGVjdXRlUXVlcnkoJ2dsb2JhbCcpLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgLy8vL2NvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5leGVjdXRlUXVlcnkoXCJnbG9iYWxcIiksIG51bGwsIDQpKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZXhlY3V0ZVF1ZXJ5KCdnbG9iYWwnKVswXS5faWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldEFsbFBhdGllbnRzRGF0YSgpIHtcclxuICAgICAgICBpZih0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZXhlY3V0ZVF1ZXJ5KFwiZGF0YVwiKS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgIC8vIC8vY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkodGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmV4ZWN1dGVRdWVyeShcImRhdGFcIiksIG51bGwsIDQpKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5leGVjdXRlUXVlcnkoXCJkYXRhXCIpO1xyXG4gICAgICAgIH0gICAgICAgICBcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgdXBkYXRlUXVpelN0YXR1cyhxdWVzdGlvbm5haXJlKSB7ICAgICAgICBcclxuICAgICAgICB2YXIgcXVpenMgPSB0aGlzLmdldFF1aXpzKCk7XHJcbiAgICAgICAgaWYocXVpenMpIHtcclxuICAgICAgICAgICAgcXVpenMuZm9yRWFjaChlbGVtZW50X3F1aXogPT4ge1xyXG4gICAgICAgICAgICAgICBpZihlbGVtZW50X3F1aXoucmVmX3F1ZXN0aW9ubmFpcmUgPT0gcXVlc3Rpb25uYWlyZS5yZWZfcXVlc3Rpb25uYWlyZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnRfcXVpei5kb25lID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkudXBkYXRlRG9jdW1lbnQodGhpcy5xdWl6c19pZCwge1xyXG4gICAgICAgICAgICAgICAgJ3F1aXonIDogcXVpenMsXHJcbiAgICAgICAgICAgICAgICAndHlwZScgOiAncXVpeidcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIC8vdGhpcy5zaG93RGF0YSgncXVpeicpO1xyXG4gICAgICAgICAgICB0aGlzLmNoZWNrUXVpelN0YXR1cygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIGNoZWNrUXVpelN0YXR1cygpIHtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKCdBIFZFUklGSUNBUiBTRSBIQSBRVUlaUyBQT1IgRkFaRVInKTtcclxuICAgICAgICB2YXIgcXVpenMgPSB0aGlzLmdldFF1aXpzKCk7XHJcbiAgICAgICAgdmFyIGdsb2JhbCA9IHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5nZXREb2N1bWVudCh0aGlzLmdsb2JhbERhdGFfaWQpO1xyXG5cclxuICAgICAgICBpZihxdWl6cykge1xyXG4gICAgICAgICAgICAvLy8vY29uc29sZS5sb2coJ3Bhc3NvdSBhcXVpLTInKTtcclxuICAgICAgICAgICAgdmFyIHF1aXpfZG9uZSA9IFtdO1xyXG4gICAgICAgICAgICB2YXIgZm91bmRfcXVpel90b2RvID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHF1aXpfZG9uZS5wdXNoKHF1aXpzLm1hcChmdW5jdGlvbihxdWl6cyl7cmV0dXJuIHF1aXpzLmRvbmV9KSk7XHJcbiAgICAgICAgICAgIHF1aXpfZG9uZVswXS5mb3JFYWNoKHF1aXpfcmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJBIHZlcmlmaWNhciBlc3RhZG8gZGFzIGF2YWxpYcOnw7Vlc1wiKTtcclxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJzE6ICcgKyBxdWl6X3Jlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGlmKCFxdWl6X3Jlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvdW5kX3F1aXpfdG9kbyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIkEgbXVkYXIgZXN0YWRvIGRhcyBhdmFsaWHDp8O1ZXNcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLnVwZGF0ZURvY3VtZW50KHRoaXMuZ2xvYmFsRGF0YV9pZCwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImV2YWx1YXRpb25zVG9Eb1wiIDogXCJ0cnVlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiIDogXCJnbG9iYWxcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJkYXRhUmVxdWVzdFwiIDogZ2xvYmFsLmRhdGFSZXF1ZXN0XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7ICAgXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgaWYoIWZvdW5kX3F1aXpfdG9kbykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLnVwZGF0ZURvY3VtZW50KHRoaXMuZ2xvYmFsRGF0YV9pZCwge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiZXZhbHVhdGlvbnNUb0RvXCIgOiBcImZhbHNlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCIgOiBcImdsb2JhbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZGF0YVJlcXVlc3RcIiA6IGdsb2JhbC5kYXRhUmVxdWVzdFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLnVwZGF0ZURvY3VtZW50KHRoaXMuZ2xvYmFsRGF0YV9pZCwge1xyXG4gICAgICAgICAgICAgICAgXCJldmFsdWF0aW9uc1RvRG9cIiA6IFwiZmFsc2VcIixcclxuICAgICAgICAgICAgICAgIFwidHlwZVwiIDogXCJnbG9iYWxcIixcclxuICAgICAgICAgICAgICAgIFwiZGF0YVJlcXVlc3RcIiA6IGdsb2JhbC5kYXRhUmVxdWVzdFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8vL2NvbnNvbGUubG9nKCdwYXNzb3UgYXF1aSAtIDMnKTsgICBcclxuICAgIH1cclxuICAgIGhhc0V2YWx1YXRpb25zVG9EbygpIHtcclxuICAgICAgICAvL3RoaXMuY2hlY2tRdWl6U3RhdHVzKCk7XHJcbiAgICAgICAgLypcclxuICAgICAgICAvL2NvbnNvbGUubG9nKCdHTE9CQUwgSUQ6ICcgKyB0aGlzLmdsb2JhbERhdGFfaWQpO1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkodGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmdldERvY3VtZW50KHRoaXMuZ2xvYmFsRGF0YV9pZCksIG51bGwsIDQpKTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKCdFdmFsdWF0aW9ucyB0byBkbzonICsgdGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmdldERvY3VtZW50KHRoaXMuZ2xvYmFsRGF0YV9pZCkuZXZhbHVhdGlvbnNUb0RvKVxyXG4gICAgICAgICovXHJcbiAgICAgICAgaWYodGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmdldERvY3VtZW50KHRoaXMuZ2xvYmFsRGF0YV9pZCkuZXZhbHVhdGlvbnNUb0RvID09IFwidHJ1ZVwiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBpc1F1aXpzU2V0KCkge1xyXG4gICAgICAgIC8vLy9jb25zb2xlLmxvZygnUVVJWi1JRDogJyArIHRoaXMucXVpenNfaWQpO1xyXG4gICAgICAgIGlmKHRoaXMucXVpenNfaWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGRlbGV0ZVF1ZXN0aW9ubmFpcmUocXVlc3Rpb25uYWlyZXMpIHtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKFwiQSBhcGFnYXIgcXVpenMhXCIpO1xyXG4gICAgICAgIHZhciBxdWl6cyA9IHRoaXMuZ2V0UXVpenMoKTtcclxuICAgICAgICB2YXIgZm91bmRfZXF1YWw7XHJcbiAgICAgICAgdmFyIHF1aXpzX3RlbXAgPSBbXTtcclxuICAgICAgICAgICAgLy8vL2NvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHF1aXpzLCBudWxsLCA0KSk7XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJRdWl6cyBkYSBCRDogXCIpO1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHF1aXpzLCBudWxsLCA0KSk7XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJRdWl6cyBFTlZJQURPUzogXCIpO1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHF1ZXN0aW9ubmFpcmVzLCBudWxsLCA0KSk7XHJcbiAgICAgICAgICAgIHF1aXpzLmZvckVhY2gocXVlc3Rpb25uYWlyZV9CRCA9PiB7XHJcbiAgICAgICAgICAgICAgICBmb3VuZF9lcXVhbCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIlJFRkVSRU5DSUEgRE8gUVVJWiBCRDogXCIgKyBxdWVzdGlvbm5haXJlX0JELnJlZl9xdWVzdGlvbm5haXJlKTtcclxuICAgICAgICAgICAgICAgIHF1ZXN0aW9ubmFpcmVzLmZvckVhY2gocXVlc3Rpb25uYWlyZV9zZW50ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiUkVGRVJFTkNJQSBETyBRVUlaIEVOVklBRE86IFwiICsgcXVlc3Rpb25uYWlyZV9zZW50LnJlZl9xdWVzdGlvbm5haXJlKTtcclxuICAgICAgICAgICAgICAgICAgICBpZihxdWVzdGlvbm5haXJlX3NlbnQucmVmX3F1ZXN0aW9ubmFpcmUgPT0gcXVlc3Rpb25uYWlyZV9CRC5yZWZfcXVlc3Rpb25uYWlyZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiUkVGRVJFTkNJQSBETyBRVUlaIEEgRUxJTUlOQVI6IFwiICsgcXVlc3Rpb25uYWlyZV9zZW50LnJlZl9xdWVzdGlvbm5haXJlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAvLyBxdWl6cy5zcGxpY2UocXVlc3Rpb25uYWlyZV9CRC5yZWZfcXVlc3Rpb25uYWlyZSwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgZm91bmRfZXF1YWwgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGlmKCFmb3VuZF9lcXVhbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHF1aXpzX3RlbXAucHVzaChxdWVzdGlvbm5haXJlX0JEKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coXCJOdW1lcm8gZGUgcXVpemVzIHBvciBmYXplcjogXCIgKyBxdWl6cy5sZW5ndGgpO1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkocXVpenMsIG51bGwsIDQpKTtcclxuICAgICAgICBxdWl6cyA9IHF1aXpzX3RlbXA7XHJcblxyXG4gICAgICAgIGlmKHF1aXpzLmxlbmd0aCAgPT0gMCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkEgYXBhZ2FyIGRvYyBjb3JyZW50ZSBkZSBxdWl6c1wiKTtcclxuICAgICAgICAgICAgdGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmRlbGV0ZURvY3VtZW50KHRoaXMucXVpenNfaWQpO1xyXG4gICAgICAgICAgICB0aGlzLnF1aXpzX2lkID0gbnVsbDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgaW5kZXggPSAwO1xyXG4gICAgICAgICAgICBxdWl6cy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudC5yZWZfcXVlc3Rpb25uYWlyZSA9IGluZGV4ICsgXCJcIjtcclxuICAgICAgICAgICAgICAgIGluZGV4Kys7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnQXDDs3MgcmVpbmRleGHDp8OjbyEnKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkocXVpenMsIG51bGwsIDQpKTtcclxuICAgICAgICAgICAgdGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLnVwZGF0ZURvY3VtZW50KHRoaXMucXVpenNfaWQsIHtcclxuICAgICAgICAgICAgICAgICdxdWl6JyA6IHF1aXpzLFxyXG4gICAgICAgICAgICAgICAgJ3R5cGUnIDogJ3F1aXonXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zb2xlLmxvZyhcIk5PVk8gQVJSQVkgREUgUVVJWlMgTkEgQkRcIik7XHJcbiAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkodGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmdldERvY3VtZW50KHRoaXMucXVpenNfaWQpLCBudWxsLCA0KSk7XHJcbiAgICB9XHJcbiAgICBhZGRRdWVzdGlvbm5haXJlVG9EQihxdWVzdGlvbm5haXJlKSB7XHJcbiAgICAgICAgaWYoIXRoaXMuaXNTZXRRdWl6c0RvbmUoKSkge1xyXG4gICAgICAgICAgICB0aGlzLnF1aXpzX2RvbmVfaWQgPSB0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuY3JlYXRlRG9jdW1lbnQoe1xyXG4gICAgICAgICAgICAgICAgJ3R5cGUnIDogJ3F1aXpzT25Ib2xkJyxcclxuICAgICAgICAgICAgICAgICdxdWVzdGlvbm5haXJlcycgOiBxdWVzdGlvbm5haXJlIFxyXG4gICAgICAgICAgICB9KTsgICAgICAgICAgICBcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB2YXIgcXVpenNPbkhvbGRfQkQgPSB0aGlzLmdldEFsbFF1aXpzT25Ib2xkKCk7XHJcbiAgICAgICAgICAgIHF1aXpzT25Ib2xkX0JELnB1c2gocXVlc3Rpb25uYWlyZSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnF1aXpzX2RvbmVfaWQgPSB0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkudXBkYXRlRG9jdW1lbnQoe1xyXG4gICAgICAgICAgICAgICAgJ3R5cGUnIDogJ3F1aXpzT25Ib2xkJyxcclxuICAgICAgICAgICAgICAgICdxdWVzdGlvbm5haXJlcycgOiBxdWl6c09uSG9sZF9CRCBcclxuICAgICAgICAgICAgfSk7IFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGlzU2V0UXVpenNEb25lKCkge1xyXG4gICAgICAgIGlmKHRoaXMucXVpenNfZG9uZV9pZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgZ2V0UXVpenNPbkhvbGRfSUQoKSB7XHJcbiAgICAgICAgaWYodGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmV4ZWN1dGVRdWVyeSgncXVpek9uSG9sZCcpLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgLy8vL2NvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5leGVjdXRlUXVlcnkoXCJxdWl6T25Ib2xkXCIpLCBudWxsLCA0KSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZXhlY3V0ZVF1ZXJ5KCdxdWl6T25Ib2xkJylbMF0uX2lkO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIGdldEFsbFF1aXpzT25Ib2xkKCkge1xyXG4gICAgICAgIGlmKHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5leGVjdXRlUXVlcnkoJ3F1aXpPbkhvbGQnKS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIC8vLy9jb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeSh0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZXhlY3V0ZVF1ZXJ5KFwicXVpek9uSG9sZFwiKSwgbnVsbCwgNCkpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmV4ZWN1dGVRdWVyeSgncXVpek9uSG9sZCcpLnF1ZXN0aW9ubmFpcmVzO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxufSJdfQ==