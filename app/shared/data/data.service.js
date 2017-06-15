"use strict";
var fs = require("file-system");
require("rxjs/add/operator/map");
var core_1 = require("@angular/core");
var database_1 = require("./database");
var DataService = (function () {
    function DataService(database) {
        this.database = database;
        //console.log('Instanciou - DataService!');
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
        //console.log("BD USADA");
        this.showData("caregiver");
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
    //Guarda avaliações dos materiais
    DataService.prototype.setRating = function (rating) {
        //console.log('A registar o rating');
        //Recebo o rating, com id do material
        //Vou à BD dos materiais
        //Para cada material com aquele id, atualizar o seu rating.
        /*Isto altera a bd dos materiais.
        let materials = this.database.getDatabase().getDocument(this.materials_id).materials;
        
        for(let i = 0; i < materials.length; i++) {
            for(let j = 0; j < materials[i].length; j++) {
                if(rating.id_material === materials[i][j].id) {
                    //console.log('registou');
                    materials[i][j].ratings.push(rating);
                }
            }
        }
        ////console.log(JSON.stringify(materials, null, 4));
        
        this.database.getDatabase().updateDocument(this.materials_id, {
            "type": "materials",
            "materials": materials,
        })
        
        //this.showData('materials');
        FIM da alteração na BD dos materiais*/
        /*Assim altera a BD dos pacientes*/
        ////console.log(JSON.stringify(this.database.getDatabase().getDocument(this.patientsData_id).data,null,4));
        var patientsData = this.database.getDatabase().getDocument(this.patientsData_id).data;
        ////console.log("Entrou no for");
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
        });
        this.showData("data");
    };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGF0YS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxnQ0FBa0M7QUFDbEMsaUNBQStCO0FBSS9CLHNDQUEyQztBQU0zQyx1Q0FBc0M7QUFNdEMsSUFBYSxXQUFXO0lBaUJwQixxQkFBbUIsUUFBa0I7UUFBbEIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUM3QiwyQ0FBMkM7UUFDM0MscUNBQXFDO1FBQ3JDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDeEIsMEJBQTBCO1FBQzFCLDRCQUE0QjtRQUM1QiwwQkFBMEI7UUFFMUIsaUpBQWlKO1FBQ2pKLHdCQUF3QjtRQUN4Qiw2QkFBNkI7UUFDN0Isd0JBQXdCO1FBQ3hCLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNaLDBCQUEwQjtRQUUxQixFQUFFO0lBRVYsQ0FBQztJQUVELDBCQUFJLEdBQUo7UUFDSSwwQkFBMEI7UUFDMUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUMzQixvREFBb0Q7UUFDcEQsMENBQTBDO1FBQzFDLEtBQUs7UUFDTCxFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLCtDQUErQztZQUMvQyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUN6QyxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7WUFFekUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRTtnQkFDM0QsTUFBTSxFQUFFLFFBQVE7Z0JBQ2hCLGFBQWEsRUFBRSxPQUFPO2dCQUN0QixpQkFBaUIsRUFBRyxNQUFNLENB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VyxFQUFFLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ25FLGlHQUFpRztZQUNqRyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQ3pFLENBQUM7UUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFDRCx1Q0FBaUIsR0FBakI7UUFDSSxFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNuRSxpR0FBaUc7WUFDakcsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxDQUFDLGNBQWMsQ0FBQztRQUNqRixDQUFDO1FBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNoQixDQUFDO0lBQ0wsa0JBQUM7QUFBRCxDQUFDLEFBbm5CRCxJQW1uQkM7QUFubkJZLFdBQVc7SUFEdkIsaUJBQVUsRUFBRTtxQ0FrQm9CLG1CQUFRO0dBakI1QixXQUFXLENBbW5CdkI7QUFubkJZLGtDQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgZnMgZnJvbSBcImZpbGUtc3lzdGVtXCI7XHJcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvbWFwJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XHJcbmltcG9ydCB7IENvbm5lY3RvclNlcnZpY2UgfSBmcm9tICcuLi8uLi9zaGFyZWQvY29ubmVjdG9yL2Nvbm5lY3Rvci5zZXJ2aWNlJztcclxuXHJcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBNYXRlcmlhbHMgfSBmcm9tIFwiLi9tYXRlcmlhbHNcIjtcclxuaW1wb3J0IHsgRGF0YSB9IGZyb20gXCIuL2RhdGFcIjtcclxuaW1wb3J0IHsgTmVlZHMgfSBmcm9tIFwiLi9uZWVkc1wiO1xyXG5pbXBvcnQgeyBQYXRpZW50IH0gZnJvbSBcIi4uLy4uL3BhdGllbnQvcGF0aWVudFwiO1xyXG5pbXBvcnQgeyBDb3VjaGJhc2UgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWNvdWNoYmFzZVwiO1xyXG5pbXBvcnQgeyBEYXRhYmFzZSB9IGZyb20gXCIuL2RhdGFiYXNlXCI7XHJcbmltcG9ydCB7IFVzZXJTZXJ2aWNlIH0gZnJvbSAnLi4vdXNlci91c2VyLnNlcnZpY2UnO1xyXG5cclxuXHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBEYXRhU2VydmljZSB7XHJcblxyXG4gICAgcHVibGljIHBhdGllbnRzRGF0YV9pZDogYW55O1xyXG4gICAgcHVibGljIHVzZXJEYXRhX2lkOiBhbnk7XHJcbiAgICBwdWJsaWMgbWF0ZXJpYWxzX2lkOiBhbnk7XHJcbiAgICBwdWJsaWMgcmF0aW5nc19pZDogYW55O1xyXG4gICAgcHVibGljIGdsb2JhbERhdGFfaWQ6IGFueTtcclxuICAgIHB1YmxpYyBxdWl6c19pZDogYW55O1xyXG4gICAgcHVibGljIHF1aXpzX2RvbmVfaWQ6IGFueTtcclxuXHJcbiAgICBwdWJsaWMgUmVxdWVzdERhdGFfY29udHJvbDogYW55O1xyXG5cclxuICAgIHB1YmxpYyBmaWxlOiBmcy5GaWxlO1xyXG4gICAgcHVibGljIGZvbGRlcjogZnMuRm9sZGVyO1xyXG4gICAgcHVibGljIGZvbGRlck5hbWU6IHN0cmluZztcclxuICAgIHB1YmxpYyBmaWxlTmFtZTogc3RyaW5nO1xyXG4gXHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZGF0YWJhc2U6IERhdGFiYXNlKXtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnSW5zdGFuY2lvdSAtIERhdGFTZXJ2aWNlIScpO1xyXG4gICAgICAgICAgICAvL3RoaXMuZGF0YSA9IGRhdGFiYXNlLmdldERhdGFiYXNlKCk7XHJcbiAgICAgICAgICAgIHRoaXMuZGVsZXRlRGF0YSgncXVpeicpO1xyXG4gICAgICAgICAgICAvL3RoaXMuZGVsZXRlRGF0YSgndXNlcicpO1xyXG4gICAgICAgICAgICAvL3RoaXMuZGVsZXRlRGF0YSgnZ2xvYmFsJyk7XHJcbiAgICAgICAgICAgIC8vdGhpcy5kZWxldGVEYXRhKCdkYXRhJyk7XHJcblxyXG4gICAgICAgICAgICAvL3RoaXMuc2hvd0RhdGEoJ2RhdGEnKTsgLy9Fc3RhIGEgZGFyIGV4Y2VwY2FvIGUgYSBpbXByaW1pciBvcyB1c2VycyB0Yj8/PyEhISEhIChwb3IgY29uZmlybWFyKSBwcSBuIHRlbSBkYWRvcyBlIGVzdG9pcmE/PyBtYXMgaW1wcmltZSBvIHVzZXIgcHE/XHJcbiAgICAgICAgICAgIC8vdGhpcy5zaG93RGF0YSgndXNlcicpO1xyXG4gICAgICAgICAgICAvL3RoaXMuc2hvd0RhdGEoJ21hdGVyaWFscycpO1xyXG4gICAgICAgICAgICAvL3RoaXMuc2hvd0RhdGEoJ3F1aXonKTtcclxuICAgICAgICAgICAgdGhpcy5pbml0KCk7XHJcbiAgICAgICAgICAgIC8vdGhpcy5zaG93RGF0YSgnZ2xvYmFsJyk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvL1xyXG4gICAgICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBpbml0KCkge1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coXCJCRCBVU0FEQVwiKTtcclxuICAgICAgICB0aGlzLnNob3dEYXRhKFwiY2FyZWdpdmVyXCIpO1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coJ0EgaW5pY2lhbGl6YXIgYXMgdmFyacOhdmVpcyBnbG9iYWlzJyk7XHJcbiAgICAgICAgLy9BZGljaW9uYXIgbnVtZXJvIGRlIGF2YWxpYcOnw7VlcyBwZW5kZW50ZXNcclxuICAgICAgICAvLy4uLlxyXG4gICAgICAgIGlmKHRoaXMuaXNHbG9iYWxTZXQoKSkge1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdBIGF0dWFsaXphciBnbG9iYWwgZGUgY29uZXhhbycpO1xyXG4gICAgICAgICAgICB0aGlzLmdsb2JhbERhdGFfaWQgPSB0aGlzLmdldEdsb2JhbHNJRCgpO1xyXG4gICAgICAgICAgICB2YXIgZ2xvYmFsID0gdGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmdldERvY3VtZW50KHRoaXMuZ2xvYmFsRGF0YV9pZCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkudXBkYXRlRG9jdW1lbnQodGhpcy5nbG9iYWxEYXRhX2lkLCB7XHJcbiAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJnbG9iYWxcIixcclxuICAgICAgICAgICAgICAgIFwiZGF0YVJlcXVlc3RcIjogXCJmYWxzZVwiLFxyXG4gICAgICAgICAgICAgICAgXCJldmFsdWF0aW9uc1RvRG9cIiA6IGdsb2JhbC5ldmFsdWF0aW9uc1RvRG9cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHRoaXMuZ2xvYmFsRGF0YV9pZCkpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdBIGNyaWFyIG9iamV0byBwYXJhIGFzIHZhcmnDoXZlaXMgZ2xvYmFpcycpO1xyXG4gICAgICAgICAgICAvL2NyaWFyIHZhcmnDoXZlbCBnbG9iYWwgYm9vbGVhbiBwYXJhIGRpemVyIHNlIGjDoSBxdWl6ZXMgcGFyYSBmYXplciB1cGRhdGUgb3UgblxyXG4gICAgICAgICAgICB0aGlzLmdsb2JhbERhdGFfaWQgPSB0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuY3JlYXRlRG9jdW1lbnQoe1xyXG4gICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZ2xvYmFsXCIsXHJcbiAgICAgICAgICAgICAgICBcImRhdGFSZXF1ZXN0XCI6IFwiZmFsc2VcIixcclxuICAgICAgICAgICAgICAgIFwiZXZhbHVhdGlvbnNUb0RvXCIgOiBcImZhbHNlXCJcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIC8vLy9jb25zb2xlLmxvZygnTk9WTyBHTE9CQUwgSUQ6ICcgKyB0aGlzLmdsb2JhbERhdGFfaWQpOyAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy51c2VyRGF0YV9pZCA9IHRoaXMuZ2V0Q3VycmVudFVzZXJEb2NJRCgpO1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coXCJRVUlaUyBVU0VSIERPQyBJRDogXCIgKyB0aGlzLnVzZXJEYXRhX2lkKTtcclxuICAgICAgICB0aGlzLnBhdGllbnRzRGF0YV9pZCA9IHRoaXMuZ2V0TGF0ZXN0UGF0aWVudERhdGEoKTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKFwiUEFUSUVOVFMgRE9DIElEOiBcIiArIHRoaXMucGF0aWVudHNEYXRhX2lkKTtcclxuICAgICAgICB0aGlzLnF1aXpzX2lkID0gdGhpcy5nZXRMYXRlc3RRdWl6RGF0YSgpO1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coXCJRVUlaUyBET0MgSUQ6IFwiICsgdGhpcy5xdWl6c19pZCk7XHJcbiAgICAgICAgLy90aGlzLnF1aXpzX2RvbmVfaWQgPSB0aGlzLmdldFF1aXpzT25Ib2xkX0lEKCk7XHJcblxyXG4gICAgICAgIC8vdmVyaWZpY2FyIHNlIGjDoSBxdWVzdGlvbsOhcmlvcyBwYXJhIHByZWVuY2hlclxyXG4gICAgICAgIC8vdGhpcy5jaGVja1F1aXpTdGF0dXMoKTtcclxuICAgICAgICBcclxuICAgIH1cclxuICAgIHN5bmMoKSB7XHJcbiAgICAgICAgLypcclxuICAgICAgICB0aGlzLmNvbm5lY3RvclNlcnZpY2UuZ2V0UGF0aWVudHMoKVxyXG4gICAgICAgICAgICAuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICAocmVzdWx0KSA9PiB0aGlzLm9uR2V0RGF0YVN1Y2Nlc3MocmVzdWx0KSxcclxuICAgICAgICAgICAgKGVycm9yKSA9PiB0aGlzLm9uR2V0RGF0YUVycm9yKGVycm9yKVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAqL1xyXG4gICAgfVxyXG4gXHJcbiAgICBzZXRVc2VyKHJlZ2lzdGVyZWRVc2VyKSB7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZygnQSBncmF2YXIgbyB1dGlsaXphZG9yJyk7XHJcbiAgICAgICAgdGhpcy51c2VyRGF0YV9pZCA9IHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5jcmVhdGVEb2N1bWVudCh7XHJcbiAgICAgICAgICAgIFwidHlwZVwiOiBcInVzZXJcIixcclxuICAgICAgICAgICAgXCJ1c2VyXCI6IHJlZ2lzdGVyZWRVc2VyXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy8vL2NvbnNvbGUubG9nKFwiQVFVSVwiK0pTT04uc3RyaW5naWZ5KHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5nZXREb2N1bWVudCh0aGlzLnVzZXJEYXRhX2lkLCBudWxsLCA0KSkpO1xyXG4gICAgfVxyXG4gICAgc2V0UGF0aWVudHMoKSB7XHJcblxyXG4gICAgfVxyXG4gICAgc2V0TWF0ZXJpYWxzKCkge1xyXG5cclxuICAgIH1cclxuICAgIGdldFBhdGllbnRzRGF0YSgpe1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coJ0EgZGV2b2x2ZXIgdG9kb3Mgb3MgZGFkb3MgZGEgQkQnKTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKHRoaXMucGF0aWVudHNEYXRhX2lkKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmdldERvY3VtZW50KHRoaXMucGF0aWVudHNEYXRhX2lkKS5kYXRhO1xyXG4gICAgfVxyXG4gICAgc2V0UGF0aWVudHNEYXRhKGRhdGEpIHtcclxuICAgICAgICAvL2RlYnVnXHJcbiAgICAgICAgLy90aGlzLmRlbGV0ZURhdGEoJ2RhdGEnKTtcclxuICAgICAgICAvL3RoaXMuZGVsZXRlRGF0YSgnbWF0ZXJpYWxzJyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy9Ub2RvcyBvcyBkYWRvcyBkbyBwYWNpZW50ZSBlIHJlZiBfaWRcclxuICAgICAgICBpZih0aGlzLnBhdGllbnRzRGF0YV9pZCkge1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdBIGF0dWFsaXphciBvcyBkYWRvcyBkb3MgcGFjaWVudGVzIG5hIGJkLCBjb20gbyBpZCAnICsgdGhpcy5wYXRpZW50c0RhdGFfaWQpO1xyXG4gICAgICAgICAgICB0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkudXBkYXRlRG9jdW1lbnQodGhpcy5wYXRpZW50c0RhdGFfaWQsIHtcclxuICAgICAgICAgICAgICAgIFwiZGF0YVwiOiBkYXRhLFxyXG4gICAgICAgICAgICAgICAgXCJ0eXBlXCIgOiBcImRhdGFcIlxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdHcmF2YXIgZGFkb3MgUGFjaWVudGVzJyk7XHJcbiAgICAgICAgICAgIHRoaXMucGF0aWVudHNEYXRhX2lkID0gdGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmNyZWF0ZURvY3VtZW50KHtcclxuICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImRhdGFcIixcclxuICAgICAgICAgICAgICAgIFwiZGF0YVwiOiBkYXRhXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy90aGlzLm1lZGlhUGVyc2lzdGVuY2UoZGF0YSk7XHJcbiAgICAgICAgXHJcblxyXG4gICAgICAgIC8vR3VhcmRhIGRhZG9zIGRvcyBQYWNpZW50ZXNcclxuICAgICAgICAvL0d1YXJkYSBkYWRvcyBkYXMgbmVjZXNzaWRhZGVzXHJcbiAgICAgICAgdmFyIGdsb2JhbCA9IHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5nZXREb2N1bWVudCh0aGlzLmdsb2JhbERhdGFfaWQpO1xyXG5cclxuICAgICAgICB0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkudXBkYXRlRG9jdW1lbnQodGhpcy5nbG9iYWxEYXRhX2lkLCB7XHJcbiAgICAgICAgICAgIFwidHlwZVwiIDogXCJnbG9iYWxcIixcclxuICAgICAgICAgICAgXCJkYXRhUmVxdWVzdFwiOiBcInRydWVcIixcclxuICAgICAgICAgICAgXCJldmFsdWF0aW9uc1RvRG9cIiA6IGdsb2JhbC5ldmFsdWF0aW9uc1RvRG9cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy92ZXIgbyBnZXQgZG9jdW1lbnQgdGIgZSBjb21wYXJhclxyXG4gICAgICAgIHRoaXMuc2hvd0RhdGEoJ2dsb2JhbCcpO1xyXG4gICAgfVxyXG4gICAgbWVkaWFQZXJzaXN0ZW5jZShkYXRhKSB7XHJcbiAgICAgICAgICAvKipcclxuICAgICAgICAgKiBBYnJpciB0b2RvIG8gY29udGXDumRvIGRhIHBhc3RhIG1hdGVyaWFsc1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHZhciBkb2N1bWVudHMgPSBmcy5rbm93bkZvbGRlcnMuZG9jdW1lbnRzKCk7XHJcbiAgICAgICAgdmFyIHBhdGggPSBmcy5wYXRoLmpvaW4oZG9jdW1lbnRzLnBhdGgsIFwiYXBwL21hdGVyaWFsc1wiKTtcclxuXHJcbiAgICAgICAgLy8vL2NvbnNvbGUubG9nKHBhdGgpO1xyXG4gICAgfVxyXG4gIFxyXG4gICAgc2V0TmVlZHMoKSB7XHJcblxyXG4gICAgfVxyXG4gICAgZ2V0VG9rZW4oKTogc3RyaW5nIHtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKCdBIGRldm9sdmVyIHRva2VuJyk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5nZXREb2N1bWVudCh0aGlzLnVzZXJEYXRhX2lkKS51c2VyLmNhcmVnaXZlcl90b2tlbjtcclxuICAgIH1cclxuICAgIGdldFVzZXJJRCgpOiBzdHJpbmcge1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coJ0EgbyBJRCBkbyB1c2VyJyk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5nZXREb2N1bWVudCh0aGlzLnVzZXJEYXRhX2lkKS51c2VyLmlkO1xyXG4gICAgfVxyXG4gICAgZ2V0TGF0ZXN0VXNlclRvUmVnaXN0ZXIoKSB7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIkEgZGV2b2x2ZXIgdWx0aW1vIHV0aWxpemFkb3IgcmVnaXN0YWRvXCIpXHJcbiAgICAgICAgdmFyIHVzZXJzID0gdGhpcy5nZXRBbGxVc2VycygpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKHVzZXJzKSB7XHJcbiAgICAgICAgICAgIHZhciBsYXN0VXNlcjtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSBpbiB1c2Vycykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHVzZXJzLmhhc093blByb3BlcnR5KGkpICYmIHR5cGVvZihpKSAhPT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxhc3RVc2VyID0gdXNlcnNbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGxhc3RVc2VyLnVzZXI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBkZWxldGVEYXRhKHZpZXcpIHtcclxuICAgICAgICBsZXQgZG9jdW1lbnRzID0gdGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmV4ZWN1dGVRdWVyeSh2aWV3KTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKCdBIGFwYWdhciBiZDogJyArIHZpZXcpO1xyXG4gICAgICAgIC8vIGxvb3Agb3ZlciBhbGwgZG9jdW1lbnRzXHJcbiAgICAgICAgaWYodGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmV4ZWN1dGVRdWVyeSh2aWV3KS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZG9jdW1lbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBkZWxldGUgZWFjaCBkb2N1bWVudFxyXG4gICAgICAgICAgICAgICAgLy8gY291Y2hiYXNlIHdpbGwgYXNzaWduIGFuIGlkIChfaWQpIHRvIGEgZG9jdW1lbnQgd2hlbiBjcmVhdGVkXHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZGVsZXRlRG9jdW1lbnQoZG9jdW1lbnRzW2ldLl9pZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0QWxsVXNlcnMoKXtcclxuICAgICAgICBpZih0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZXhlY3V0ZVF1ZXJ5KFwidXNlclwiKS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZXhlY3V0ZVF1ZXJ5KFwidXNlclwiKTtcclxuICAgICAgICB9ICAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHNob3dEYXRhKHZpZXcpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnQSBtb3N0cmFyIGJkOiAnICsgdmlldyArICcgY29tICcgKyB0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZXhlY3V0ZVF1ZXJ5KHZpZXcpLmxlbmd0aCArICcgZWxlbWVudG9zJyk7XHJcbiAgICAgICAgaWYodGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmV4ZWN1dGVRdWVyeSh2aWV3KS5sZW5ndGggPiAwKSB7ICAgICBcclxuICAgICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkodGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmV4ZWN1dGVRdWVyeSh2aWV3KSwgbnVsbCwgNCkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgICBwdWJsaWMgb25DcmVhdGVGaWxlKCkge1xyXG4gICAgICAgIC8vID4+IGZzLWNyZWF0ZS1hbGwtY29kZVxyXG4gICAgICAgIGxldCBkb2N1bWVudHMgPSBmcy5rbm93bkZvbGRlcnMuZG9jdW1lbnRzKCk7XHJcbiAgICAgICAgdGhpcy5mb2xkZXIgPSBkb2N1bWVudHMuZ2V0Rm9sZGVyKHRoaXMuZm9sZGVyTmFtZSB8fCBcInRlc3RGb2xkZXJcIik7XHJcbiAgICAgICAgdGhpcy5maWxlID0gdGhpcy5mb2xkZXIuZ2V0RmlsZSgodGhpcy5maWxlTmFtZSB8fCBcInRlc3RGaWxlXCIpICsgXCIudHh0XCIpO1xyXG5cclxuICAgICAgICBcclxuICAgICAgICAvKlxyXG4gICAgICAgIHRoaXMuZmlsZS53cml0ZVRleHQodGhpcy5maWxlVGV4dENvbnRlbnQgfHwgXCJzb21lIHJhbmRvbSBjb250ZW50XCIpXHJcbiAgICAgICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyBTdWNjZWVkZWQgd3JpdGluZyB0byB0aGUgZmlsZS5cclxuICAgICAgICAgICAgICAgIHRoaXMuZmlsZS5yZWFkVGV4dCgpXHJcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdWNjZXNzTWVzc2FnZSA9IFwiU3VjY2Vzc2Z1bGx5IHNhdmVkIGluIFwiICsgdGhpcy5maWxlLnBhdGg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMud3JpdHRlbkNvbnRlbnQgPSByZXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXNJdGVtVmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pLmNhdGNoKGVyciA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyBFcnJvclxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAvLyA8PCBmcy1jcmVhdGUtYWxsLWNvZGVcclxuICAgICAgICAqL1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldEN1cnJlbnRVc2VyRG9jSUQoKSB7XHJcbiAgICAgICAgdmFyIHVzZXJzID0gdGhpcy5nZXRBbGxVc2VycygpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKHVzZXJzKSB7XHJcbiAgICAgICAgICAgIHZhciBsYXN0VXNlcjtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSBpbiB1c2Vycykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHVzZXJzLmhhc093blByb3BlcnR5KGkpICYmIHR5cGVvZihpKSAhPT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxhc3RVc2VyID0gdXNlcnNbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGxhc3RVc2VyLl9pZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgaXNVc2VyQXV0aCgpIHtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKCdBIHZlcmlmaWNhciBzZSBleGlzdGUgdXRpbGl6YWRvciBuYSBCRCcpO1xyXG4gICAgICAgIGlmKHRoaXMudXNlckRhdGFfaWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTsgXHJcbiAgICB9XHJcbiAgICAvL0d1YXJkYSBhdmFsaWHDp8O1ZXMgZG9zIG1hdGVyaWFpc1xyXG4gICAgcHVibGljIHNldFJhdGluZyhyYXRpbmcpIHtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKCdBIHJlZ2lzdGFyIG8gcmF0aW5nJyk7XHJcbiAgICAgICAgLy9SZWNlYm8gbyByYXRpbmcsIGNvbSBpZCBkbyBtYXRlcmlhbFxyXG4gICAgICAgIC8vVm91IMOgIEJEIGRvcyBtYXRlcmlhaXNcclxuICAgICAgICAvL1BhcmEgY2FkYSBtYXRlcmlhbCBjb20gYXF1ZWxlIGlkLCBhdHVhbGl6YXIgbyBzZXUgcmF0aW5nLlxyXG4gICAgICAgIC8qSXN0byBhbHRlcmEgYSBiZCBkb3MgbWF0ZXJpYWlzLlxyXG4gICAgICAgIGxldCBtYXRlcmlhbHMgPSB0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZ2V0RG9jdW1lbnQodGhpcy5tYXRlcmlhbHNfaWQpLm1hdGVyaWFscztcclxuICAgICAgICBcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgbWF0ZXJpYWxzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaiA9IDA7IGogPCBtYXRlcmlhbHNbaV0ubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgIGlmKHJhdGluZy5pZF9tYXRlcmlhbCA9PT0gbWF0ZXJpYWxzW2ldW2pdLmlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZygncmVnaXN0b3UnKTtcclxuICAgICAgICAgICAgICAgICAgICBtYXRlcmlhbHNbaV1bal0ucmF0aW5ncy5wdXNoKHJhdGluZyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8vL2NvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KG1hdGVyaWFscywgbnVsbCwgNCkpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS51cGRhdGVEb2N1bWVudCh0aGlzLm1hdGVyaWFsc19pZCwge1xyXG4gICAgICAgICAgICBcInR5cGVcIjogXCJtYXRlcmlhbHNcIixcclxuICAgICAgICAgICAgXCJtYXRlcmlhbHNcIjogbWF0ZXJpYWxzLFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgXHJcbiAgICAgICAgLy90aGlzLnNob3dEYXRhKCdtYXRlcmlhbHMnKTtcclxuICAgICAgICBGSU0gZGEgYWx0ZXJhw6fDo28gbmEgQkQgZG9zIG1hdGVyaWFpcyovXHJcbiAgICAgICAgLypBc3NpbSBhbHRlcmEgYSBCRCBkb3MgcGFjaWVudGVzKi9cclxuICAgICAgICAvLy8vY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkodGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmdldERvY3VtZW50KHRoaXMucGF0aWVudHNEYXRhX2lkKS5kYXRhLG51bGwsNCkpO1xyXG4gICAgICAgIGxldCBwYXRpZW50c0RhdGEgPSB0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZ2V0RG9jdW1lbnQodGhpcy5wYXRpZW50c0RhdGFfaWQpLmRhdGE7XHJcbiAgICAgICAgLy8vL2NvbnNvbGUubG9nKFwiRW50cm91IG5vIGZvclwiKTtcclxuICAgICAgICAvKlxyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBwYXRpZW50c0RhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgZm9yKGxldCBqID0gMDsgaiA8IHBhdGllbnRzRGF0YVtpXS5uZWVkcy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgZm9yKGxldCBrID0gMDsgayA8IHBhdGllbnRzRGF0YVtpXS5uZWVkc1tqXS5tYXRlcmlhbHMubGVuZ3RoOyBrKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGF0aWVudHNEYXRhW2ldLm5lZWRzW2pdLm1hdGVyaWFsc1trXVsncmF0aW5ncyddID0gWycnXTtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAqL1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBwYXRpZW50c0RhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgZm9yKGxldCBqID0gMDsgaiA8IHBhdGllbnRzRGF0YVtpXS5uZWVkcy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgZm9yKGxldCBrID0gMDsgayA8IHBhdGllbnRzRGF0YVtpXS5uZWVkc1tqXS5tYXRlcmlhbHMubGVuZ3RoOyBrKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBpZihwYXRpZW50c0RhdGFbaV0ubmVlZHNbal0ubWF0ZXJpYWxzW2tdLmlkID09IHJhdGluZy5pZF9tYXRlcmlhbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLy8vY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkocGF0aWVudHNEYXRhW2ldW2pdW2tdLG51bGwsNCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXRpZW50c0RhdGFbaV0ubmVlZHNbal0ubWF0ZXJpYWxzW2tdWydyYXRpbmdzJ10gPSByYXRpbmc7ICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLy8vY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkocGF0aWVudHNEYXRhLG51bGwsNCkpO1xyXG4gICAgICAgIHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS51cGRhdGVEb2N1bWVudCh0aGlzLnBhdGllbnRzRGF0YV9pZCwge1xyXG4gICAgICAgICAgICBcInR5cGVcIjogXCJkYXRhXCIsXHJcbiAgICAgICAgICAgIFwiZGF0YVwiOiBwYXRpZW50c0RhdGEsXHJcbiAgICAgICAgfSlcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLnNob3dEYXRhKFwiZGF0YVwiKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRNYXRlcmlhbFJhdGluZyhtYXRlcmlhbF9pZCkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0TmVlZE1hdGVyaWFscygpIHtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKCdBIGRldm9sdmVyIHRvZG9zIG9zIG1hdGVyaWFpcycpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZ2V0RG9jdW1lbnQodGhpcy5tYXRlcmlhbHNfaWQpLm1hdGVyaWFscztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaXNQYXRpZW50c1JlcXVlc3REb25lKCkge1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coXCJBIHZlcmlmaWNhciBzZSBvIHBlZGlkbyBhbyBzZXJ2aWRvciBqw6EgZm9pIGZlaXRvXCIpO1xyXG4gICAgICAgIGlmKHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5nZXREb2N1bWVudCh0aGlzLmdsb2JhbERhdGFfaWQpLmRhdGFSZXF1ZXN0ID09IFwiZmFsc2VcIikge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7YW55fSBjYXJlZ2l2ZXJRdWVzdGlvbmFpcmVzIFxyXG4gICAgICogXHJcbiAgICAgKiBAbWVtYmVyb2YgRGF0YVNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldFF1aXpzKGNhcmVnaXZlclF1ZXN0aW9uYWlyZXMpIHtcclxuXHJcbiAgICAgICAgaWYoY2FyZWdpdmVyUXVlc3Rpb25haXJlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJFTlRST1UgQVFVSSBFIFNFVE9VIE8gRVZBTFVBVElPTlMgQSBUUlVFLiBDb21wcmltZW50byBkbyBhcnJheSBkZSBxdWl6ZXM6IFwiICsgY2FyZWdpdmVyUXVlc3Rpb25haXJlcy5sZW5ndGgpO1xyXG4gICAgICAgICAgICB0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkudXBkYXRlRG9jdW1lbnQodGhpcy5nbG9iYWxEYXRhX2lkLCB7XHJcbiAgICAgICAgICAgICAgICBcImV2YWx1YXRpb25zVG9Eb1wiIDogXCJ0cnVlXCIsXHJcbiAgICAgICAgICAgICAgICBcInR5cGVcIiA6IFwiZ2xvYmFsXCIsXHJcbiAgICAgICAgICAgICAgICBcImRhdGFSZXF1ZXN0XCIgOiBcInRydWVcIlxyXG4gICAgICAgICAgICB9KTsgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYoIXRoaXMuaXNRdWl6c1NldCgpKSB7XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ05vdm8gZG9jIGRlIFF1aXpzJyk7XHJcbiAgICAgICAgICAgIHRoaXMucXVpenNfaWQgPSB0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuY3JlYXRlRG9jdW1lbnQoe1xyXG4gICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwicXVpelwiLFxyXG4gICAgICAgICAgICAgICAgXCJxdWl6XCI6IGNhcmVnaXZlclF1ZXN0aW9uYWlyZXNcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd0RhdGEoJ3F1aXonKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB2YXIgcXVpenNfdG9fYWRkID0gW107XHJcbiAgICAgICAgICAgIHZhciBmb3VuZF9jb250cm9sID0gZmFsc2U7IC8vdmFyaWF2ZWwgZGUgY29udHJvbGUgZGUgbm92b3MgcXVpenMgYSBhZGljaW9uYXJcclxuICAgICAgICAgICAgdmFyIHNhbWVfcXVpel9mb3VuZCA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnSsOhIGV4aXN0ZW0gcXVpenMgbmEgQkQnKTtcclxuICAgICAgICAgICAgdmFyIHF1aXpzID0gdGhpcy5nZXRRdWl6cygpO1xyXG4gICAgICAgICAgICAvLy8vY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkocXVpenMsIG51bGwsIDQpKTtcclxuICAgICAgICAgICAgY2FyZWdpdmVyUXVlc3Rpb25haXJlcy5mb3JFYWNoKHF1ZXN0aW9ubmFpcmVfc2VydmVyID0+IHtcclxuICAgICAgICAgICAgICAgIHNhbWVfcXVpel9mb3VuZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgcXVpenMuZm9yRWFjaChxdWVzdGlvbm5haXJlX0JEID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZihxdWVzdGlvbm5haXJlX0JELmlkID09IHF1ZXN0aW9ubmFpcmVfc2VydmVyLmlkICYmIHF1ZXN0aW9ubmFpcmVfQkQucmVmZXJlbmNlID09IHF1ZXN0aW9ubmFpcmVfc2VydmVyLnJlZmVyZW5jZSAmJiBxdWVzdGlvbm5haXJlX0JELnJlZmVyZW5jZV9uYW1lID09IHF1ZXN0aW9ubmFpcmVfc2VydmVyLnJlZmVyZW5jZV9uYW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ0VuY29udHJvdSBxdWl6IGlndWFsOiBpZC0nICsgcXVlc3Rpb25uYWlyZV9CRC5pZCArICcgcmVmZXJlbmNlLScgKyBxdWVzdGlvbm5haXJlX0JELnJlZmVyZW5jZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNhbWVfcXVpel9mb3VuZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBpZighc2FtZV9xdWl6X2ZvdW5kKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnRW5jb250cmVpIHF1aXpzIG5vdm9zOycpO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvdW5kX2NvbnRyb2wgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHF1aXpzX3RvX2FkZC5wdXNoKHF1ZXN0aW9ubmFpcmVfc2VydmVyKTtcclxuICAgICAgICAgICAgICAgIH0gICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHF1aXpzX3RvX2FkZCkpO1xyXG4gICAgICAgICAgICBpZihmb3VuZF9jb250cm9sKSB7XHJcbiAgICAgICAgICAgICAgICBxdWl6c190b19hZGQuZm9yRWFjaChxdWl6ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBxdWl6cy5wdXNoKHF1aXopO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShxdWl6cywgbnVsbCwgNCkpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy9pbmRleCBhcnJheVxyXG4gICAgICAgICAgICBsZXQgaW5kZXggPSAwO1xyXG4gICAgICAgICAgICBxdWl6cy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xyXG4gICAgICAgICAgICBlbGVtZW50LnJlZl9xdWVzdGlvbm5haXJlID0gaW5kZXggKyBcIlwiO1xyXG4gICAgICAgICAgICBpbmRleCsrO1xyXG4gICAgICAgICAgIFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkudXBkYXRlRG9jdW1lbnQodGhpcy5xdWl6c19pZCwge1xyXG4gICAgICAgICAgICAgICAgJ3F1aXonIDogcXVpenMsXHJcbiAgICAgICAgICAgICAgICAndHlwZScgOiAncXVpeidcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5leGVjdXRlUXVlcnkoJ3F1aXonKVswXS5xdWl6KSk7XHJcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5leGVjdXRlUXVlcnkoJ3F1aXonKVswXS5xdWl6Lmxlbmd0aCArICcgZWxlbWVudG9zJyk7ICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRBbGxRdWl6cygpIHtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKFwiQSBvYnRlciBJRCBkb3MgcXVpenNcIik7XHJcbiAgICAgICAgaWYodGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmV4ZWN1dGVRdWVyeSgncXVpeicpLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgLy8vL2NvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5leGVjdXRlUXVlcnkoJ3F1aXonKSwgbnVsbCwgNCkpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmV4ZWN1dGVRdWVyeSgncXVpeicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL2NvbnNvbGUubG9nKCdwYXNzb3UgYXF1aScpO1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldExhdGVzdFF1aXpEYXRhKCkge1xyXG4gICAgICAgIHZhciBxdWl6cyA9IHRoaXMuZ2V0QWxsUXVpenMoKTtcclxuXHJcbiAgICAgICAgaWYocXVpenMpIHtcclxuICAgICAgICAgICAgdmFyIGxhc3RRdWl6O1xyXG5cclxuICAgICAgICAgICAgbGFzdFF1aXogPSBxdWl6c1txdWl6cy5sZW5ndGggLSAxXTtcclxuICAgICAgICAgICAgcmV0dXJuIGxhc3RRdWl6Ll9pZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8vL2NvbnNvbGUubG9nKCdwYXNzb3UgYXF1aS0xJyk7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0TGF0ZXN0UGF0aWVudERhdGEoKSB7XHJcbiAgICAgICAgdmFyIHBhdGllbnRzRGF0YSA9IHRoaXMuZ2V0QWxsUGF0aWVudHNEYXRhKCk7XHJcblxyXG4gICAgICAgIGlmKHBhdGllbnRzRGF0YSkge1xyXG4gICAgICAgICAgICB2YXIgbGFzdERhdGE7XHJcblxyXG4gICAgICAgICAgICBsYXN0RGF0YSA9IHBhdGllbnRzRGF0YVtwYXRpZW50c0RhdGEubGVuZ3RoIC0gMV07XHJcbiAgICAgICAgICAgIHJldHVybiBsYXN0RGF0YS5faWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldFF1aXpzKCkge1xyXG4gICAgICAgIC8vLy9jb25zb2xlLmxvZyh0aGlzLnF1aXpzX2lkKTtcclxuICAgICAgICAvLy8vY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkodGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmdldERvY3VtZW50KHRoaXMucXVpenNfaWQpKSk7XHJcbiAgICAgICAgLy8vL2NvbnNvbGUubG9nKHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5leGVjdXRlUXVlcnkoJ3F1aXonKS5sZW5ndGgpO1xyXG4gICAgICAgIGlmKHRoaXMucXVpenNfaWQpIHtcclxuICAgICAgICAgICAgaWYodGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmV4ZWN1dGVRdWVyeSgncXVpeicpLmxlbmd0aCA+IDApIHsgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5nZXREb2N1bWVudCh0aGlzLnF1aXpzX2lkKS5xdWl6O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGlzR2xvYmFsU2V0KCkge1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coXCJHTE9CQUxTSVpFOiBcIiArIHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5leGVjdXRlUXVlcnkoJ2dsb2JhbCcpLmxlbmd0aCk7XHJcbiAgICAgICAgaWYodGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmV4ZWN1dGVRdWVyeSgnZ2xvYmFsJykubGVuZ3RoID4gMCkgeyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldEdsb2JhbHNJRCgpIHtcclxuICAgICAgICBpZih0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZXhlY3V0ZVF1ZXJ5KCdnbG9iYWwnKS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIC8vLy9jb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeSh0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZXhlY3V0ZVF1ZXJ5KFwiZ2xvYmFsXCIpLCBudWxsLCA0KSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmV4ZWN1dGVRdWVyeSgnZ2xvYmFsJylbMF0uX2lkO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRBbGxQYXRpZW50c0RhdGEoKSB7XHJcbiAgICAgICAgaWYodGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmV4ZWN1dGVRdWVyeShcImRhdGFcIikubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAvLyAvL2NvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5leGVjdXRlUXVlcnkoXCJkYXRhXCIpLCBudWxsLCA0KSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZXhlY3V0ZVF1ZXJ5KFwiZGF0YVwiKTtcclxuICAgICAgICB9ICAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHVwZGF0ZVF1aXpTdGF0dXMocXVlc3Rpb25uYWlyZSkgeyAgICAgICAgXHJcbiAgICAgICAgdmFyIHF1aXpzID0gdGhpcy5nZXRRdWl6cygpO1xyXG4gICAgICAgIGlmKHF1aXpzKSB7XHJcbiAgICAgICAgICAgIHF1aXpzLmZvckVhY2goZWxlbWVudF9xdWl6ID0+IHtcclxuICAgICAgICAgICAgICAgaWYoZWxlbWVudF9xdWl6LnJlZl9xdWVzdGlvbm5haXJlID09IHF1ZXN0aW9ubmFpcmUucmVmX3F1ZXN0aW9ubmFpcmUpIHtcclxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50X3F1aXouZG9uZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLnVwZGF0ZURvY3VtZW50KHRoaXMucXVpenNfaWQsIHtcclxuICAgICAgICAgICAgICAgICdxdWl6JyA6IHF1aXpzLFxyXG4gICAgICAgICAgICAgICAgJ3R5cGUnIDogJ3F1aXonXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAvL3RoaXMuc2hvd0RhdGEoJ3F1aXonKTtcclxuICAgICAgICAgICAgdGhpcy5jaGVja1F1aXpTdGF0dXMoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICBjaGVja1F1aXpTdGF0dXMoKSB7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZygnQSBWRVJJRklDQVIgU0UgSEEgUVVJWlMgUE9SIEZBWkVSJyk7XHJcbiAgICAgICAgdmFyIHF1aXpzID0gdGhpcy5nZXRRdWl6cygpO1xyXG4gICAgICAgIHZhciBnbG9iYWwgPSB0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZ2V0RG9jdW1lbnQodGhpcy5nbG9iYWxEYXRhX2lkKTtcclxuXHJcbiAgICAgICAgaWYocXVpenMpIHtcclxuICAgICAgICAgICAgLy8vL2NvbnNvbGUubG9nKCdwYXNzb3UgYXF1aS0yJyk7XHJcbiAgICAgICAgICAgIHZhciBxdWl6X2RvbmUgPSBbXTtcclxuICAgICAgICAgICAgdmFyIGZvdW5kX3F1aXpfdG9kbyA9IGZhbHNlO1xyXG4gICAgICAgICAgICBxdWl6X2RvbmUucHVzaChxdWl6cy5tYXAoZnVuY3Rpb24ocXVpenMpe3JldHVybiBxdWl6cy5kb25lfSkpO1xyXG4gICAgICAgICAgICBxdWl6X2RvbmVbMF0uZm9yRWFjaChxdWl6X3Jlc3VsdCA9PiB7XHJcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiQSB2ZXJpZmljYXIgZXN0YWRvIGRhcyBhdmFsaWHDp8O1ZXNcIik7XHJcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCcxOiAnICsgcXVpel9yZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBpZighcXVpel9yZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3VuZF9xdWl6X3RvZG8gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJBIG11ZGFyIGVzdGFkbyBkYXMgYXZhbGlhw6fDtWVzXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS51cGRhdGVEb2N1bWVudCh0aGlzLmdsb2JhbERhdGFfaWQsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJldmFsdWF0aW9uc1RvRG9cIiA6IFwidHJ1ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIiA6IFwiZ2xvYmFsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZGF0YVJlcXVlc3RcIiA6IGdsb2JhbC5kYXRhUmVxdWVzdFxyXG4gICAgICAgICAgICAgICAgICAgIH0pOyAgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGlmKCFmb3VuZF9xdWl6X3RvZG8pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS51cGRhdGVEb2N1bWVudCh0aGlzLmdsb2JhbERhdGFfaWQsIHtcclxuICAgICAgICAgICAgICAgICAgICBcImV2YWx1YXRpb25zVG9Eb1wiIDogXCJmYWxzZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwidHlwZVwiIDogXCJnbG9iYWxcIixcclxuICAgICAgICAgICAgICAgICAgICBcImRhdGFSZXF1ZXN0XCIgOiBnbG9iYWwuZGF0YVJlcXVlc3RcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS51cGRhdGVEb2N1bWVudCh0aGlzLmdsb2JhbERhdGFfaWQsIHtcclxuICAgICAgICAgICAgICAgIFwiZXZhbHVhdGlvbnNUb0RvXCIgOiBcImZhbHNlXCIsXHJcbiAgICAgICAgICAgICAgICBcInR5cGVcIiA6IFwiZ2xvYmFsXCIsXHJcbiAgICAgICAgICAgICAgICBcImRhdGFSZXF1ZXN0XCIgOiBnbG9iYWwuZGF0YVJlcXVlc3RcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vLy9jb25zb2xlLmxvZygncGFzc291IGFxdWkgLSAzJyk7ICAgXHJcbiAgICB9XHJcbiAgICBoYXNFdmFsdWF0aW9uc1RvRG8oKSB7XHJcbiAgICAgICAgLy90aGlzLmNoZWNrUXVpelN0YXR1cygpO1xyXG4gICAgICAgIC8qXHJcbiAgICAgICAgLy9jb25zb2xlLmxvZygnR0xPQkFMIElEOiAnICsgdGhpcy5nbG9iYWxEYXRhX2lkKTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5nZXREb2N1bWVudCh0aGlzLmdsb2JhbERhdGFfaWQpLCBudWxsLCA0KSk7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZygnRXZhbHVhdGlvbnMgdG8gZG86JyArIHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5nZXREb2N1bWVudCh0aGlzLmdsb2JhbERhdGFfaWQpLmV2YWx1YXRpb25zVG9EbylcclxuICAgICAgICAqL1xyXG4gICAgICAgIGlmKHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5nZXREb2N1bWVudCh0aGlzLmdsb2JhbERhdGFfaWQpLmV2YWx1YXRpb25zVG9EbyA9PSBcInRydWVcIikge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgaXNRdWl6c1NldCgpIHtcclxuICAgICAgICAvLy8vY29uc29sZS5sb2coJ1FVSVotSUQ6ICcgKyB0aGlzLnF1aXpzX2lkKTtcclxuICAgICAgICBpZih0aGlzLnF1aXpzX2lkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBkZWxldGVRdWVzdGlvbm5haXJlKHF1ZXN0aW9ubmFpcmVzKSB7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIkEgYXBhZ2FyIHF1aXpzIVwiKTtcclxuICAgICAgICB2YXIgcXVpenMgPSB0aGlzLmdldFF1aXpzKCk7XHJcbiAgICAgICAgdmFyIGZvdW5kX2VxdWFsO1xyXG4gICAgICAgIHZhciBxdWl6c190ZW1wID0gW107XHJcbiAgICAgICAgICAgIC8vLy9jb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShxdWl6cywgbnVsbCwgNCkpO1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiUXVpenMgZGEgQkQ6IFwiKTtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShxdWl6cywgbnVsbCwgNCkpO1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiUXVpenMgRU5WSUFET1M6IFwiKTtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShxdWVzdGlvbm5haXJlcywgbnVsbCwgNCkpO1xyXG4gICAgICAgICAgICBxdWl6cy5mb3JFYWNoKHF1ZXN0aW9ubmFpcmVfQkQgPT4ge1xyXG4gICAgICAgICAgICAgICAgZm91bmRfZXF1YWwgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJSRUZFUkVOQ0lBIERPIFFVSVogQkQ6IFwiICsgcXVlc3Rpb25uYWlyZV9CRC5yZWZfcXVlc3Rpb25uYWlyZSk7XHJcbiAgICAgICAgICAgICAgICBxdWVzdGlvbm5haXJlcy5mb3JFYWNoKHF1ZXN0aW9ubmFpcmVfc2VudCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIlJFRkVSRU5DSUEgRE8gUVVJWiBFTlZJQURPOiBcIiArIHF1ZXN0aW9ubmFpcmVfc2VudC5yZWZfcXVlc3Rpb25uYWlyZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYocXVlc3Rpb25uYWlyZV9zZW50LnJlZl9xdWVzdGlvbm5haXJlID09IHF1ZXN0aW9ubmFpcmVfQkQucmVmX3F1ZXN0aW9ubmFpcmUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIlJFRkVSRU5DSUEgRE8gUVVJWiBBIEVMSU1JTkFSOiBcIiArIHF1ZXN0aW9ubmFpcmVfc2VudC5yZWZfcXVlc3Rpb25uYWlyZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgLy8gcXVpenMuc3BsaWNlKHF1ZXN0aW9ubmFpcmVfQkQucmVmX3F1ZXN0aW9ubmFpcmUsIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgIGZvdW5kX2VxdWFsID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBpZighZm91bmRfZXF1YWwpIHtcclxuICAgICAgICAgICAgICAgICAgICBxdWl6c190ZW1wLnB1c2gocXVlc3Rpb25uYWlyZV9CRCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKFwiTnVtZXJvIGRlIHF1aXplcyBwb3IgZmF6ZXI6IFwiICsgcXVpenMubGVuZ3RoKTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHF1aXpzLCBudWxsLCA0KSk7XHJcbiAgICAgICAgcXVpenMgPSBxdWl6c190ZW1wO1xyXG5cclxuICAgICAgICBpZihxdWl6cy5sZW5ndGggID09IDApIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJBIGFwYWdhciBkb2MgY29ycmVudGUgZGUgcXVpenNcIik7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5kZWxldGVEb2N1bWVudCh0aGlzLnF1aXpzX2lkKTtcclxuICAgICAgICAgICAgdGhpcy5xdWl6c19pZCA9IG51bGw7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbGV0IGluZGV4ID0gMDtcclxuICAgICAgICAgICAgcXVpenMuZm9yRWFjaChlbGVtZW50ID0+IHtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQucmVmX3F1ZXN0aW9ubmFpcmUgPSBpbmRleCArIFwiXCI7XHJcbiAgICAgICAgICAgICAgICBpbmRleCsrO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ0Fww7NzIHJlaW5kZXhhw6fDo28hJyk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHF1aXpzLCBudWxsLCA0KSk7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS51cGRhdGVEb2N1bWVudCh0aGlzLnF1aXpzX2lkLCB7XHJcbiAgICAgICAgICAgICAgICAncXVpeicgOiBxdWl6cyxcclxuICAgICAgICAgICAgICAgICd0eXBlJyA6ICdxdWl6J1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJOT1ZPIEFSUkFZIERFIFFVSVpTIE5BIEJEXCIpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5nZXREb2N1bWVudCh0aGlzLnF1aXpzX2lkKSwgbnVsbCwgNCkpO1xyXG4gICAgfVxyXG4gICAgYWRkUXVlc3Rpb25uYWlyZVRvREIocXVlc3Rpb25uYWlyZSkge1xyXG4gICAgICAgIGlmKCF0aGlzLmlzU2V0UXVpenNEb25lKCkpIHtcclxuICAgICAgICAgICAgdGhpcy5xdWl6c19kb25lX2lkID0gdGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmNyZWF0ZURvY3VtZW50KHtcclxuICAgICAgICAgICAgICAgICd0eXBlJyA6ICdxdWl6c09uSG9sZCcsXHJcbiAgICAgICAgICAgICAgICAncXVlc3Rpb25uYWlyZXMnIDogcXVlc3Rpb25uYWlyZSBcclxuICAgICAgICAgICAgfSk7ICAgICAgICAgICAgXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdmFyIHF1aXpzT25Ib2xkX0JEID0gdGhpcy5nZXRBbGxRdWl6c09uSG9sZCgpO1xyXG4gICAgICAgICAgICBxdWl6c09uSG9sZF9CRC5wdXNoKHF1ZXN0aW9ubmFpcmUpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5xdWl6c19kb25lX2lkID0gdGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLnVwZGF0ZURvY3VtZW50KHtcclxuICAgICAgICAgICAgICAgICd0eXBlJyA6ICdxdWl6c09uSG9sZCcsXHJcbiAgICAgICAgICAgICAgICAncXVlc3Rpb25uYWlyZXMnIDogcXVpenNPbkhvbGRfQkQgXHJcbiAgICAgICAgICAgIH0pOyBcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBpc1NldFF1aXpzRG9uZSgpIHtcclxuICAgICAgICBpZih0aGlzLnF1aXpzX2RvbmVfaWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGdldFF1aXpzT25Ib2xkX0lEKCkge1xyXG4gICAgICAgIGlmKHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5leGVjdXRlUXVlcnkoJ3F1aXpPbkhvbGQnKS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIC8vLy9jb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeSh0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZXhlY3V0ZVF1ZXJ5KFwicXVpek9uSG9sZFwiKSwgbnVsbCwgNCkpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmV4ZWN1dGVRdWVyeSgncXVpek9uSG9sZCcpWzBdLl9pZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICBnZXRBbGxRdWl6c09uSG9sZCgpIHtcclxuICAgICAgICBpZih0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZXhlY3V0ZVF1ZXJ5KCdxdWl6T25Ib2xkJykubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAvLy8vY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkodGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmV4ZWN1dGVRdWVyeShcInF1aXpPbkhvbGRcIiksIG51bGwsIDQpKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5leGVjdXRlUXVlcnkoJ3F1aXpPbkhvbGQnKS5xdWVzdGlvbm5haXJlcztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbn0iXX0=