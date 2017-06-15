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
        //console.log('A mostrar bd: ' + view + ' com ' + this.database.getDatabase().executeQuery(view).length + ' elementos');
        if (this.database.getDatabase().executeQuery(view).length > 0) {
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
        //this.showData("data");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGF0YS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxnQ0FBa0M7QUFDbEMsaUNBQStCO0FBSS9CLHNDQUEyQztBQU0zQyx1Q0FBc0M7QUFNdEMsSUFBYSxXQUFXO0lBaUJwQixxQkFBbUIsUUFBa0I7UUFBbEIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUM3QiwyQ0FBMkM7UUFDM0MscUNBQXFDO1FBQ3JDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDeEIsMEJBQTBCO1FBQzFCLDRCQUE0QjtRQUM1QiwwQkFBMEI7UUFFMUIsaUpBQWlKO1FBQ2pKLHdCQUF3QjtRQUN4Qiw2QkFBNkI7UUFDN0Isd0JBQXdCO1FBQ3hCLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNaLDBCQUEwQjtRQUUxQixFQUFFO0lBRVYsQ0FBQztJQUVELDBCQUFJLEdBQUo7UUFDSSwwQkFBMEI7UUFDMUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUMzQixvREFBb0Q7UUFDcEQsMENBQTBDO1FBQzFDLEtBQUs7UUFFTCxFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLCtDQUErQztZQUMvQyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUN6QyxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7WUFFekUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRTtnQkFDM0QsTUFBTSxFQUFFLFFBQVE7Z0JBQ2hCLGFBQWEsRUFBRSxPQUFPO2dCQUN0QixpQkFBaUIsRUFBRyxNQUFNLENB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QyxZQUFZLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNuRSxpR0FBaUc7WUFDakcsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxDQUFDLGNBQWMsQ0FBQztRQUNqRixDQUFDO1FBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNoQixDQUFDO0lBQ0wsa0JBQUM7QUFBRCxDQUFDLEFBN21CRCxJQTZtQkM7QUE3bUJZLFdBQVc7SUFEdkIsaUJBQVUsRUFBRTtxQ0FrQm9CLG1CQUFRO0dBakI1QixXQUFXLENBNm1CdkI7QUE3bUJZLGtDQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgZnMgZnJvbSBcImZpbGUtc3lzdGVtXCI7XHJcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvbWFwJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XHJcbmltcG9ydCB7IENvbm5lY3RvclNlcnZpY2UgfSBmcm9tICcuLi8uLi9zaGFyZWQvY29ubmVjdG9yL2Nvbm5lY3Rvci5zZXJ2aWNlJztcclxuXHJcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBNYXRlcmlhbHMgfSBmcm9tIFwiLi9tYXRlcmlhbHNcIjtcclxuaW1wb3J0IHsgRGF0YSB9IGZyb20gXCIuL2RhdGFcIjtcclxuaW1wb3J0IHsgTmVlZHMgfSBmcm9tIFwiLi9uZWVkc1wiO1xyXG5pbXBvcnQgeyBQYXRpZW50IH0gZnJvbSBcIi4uLy4uL3BhdGllbnQvcGF0aWVudFwiO1xyXG5pbXBvcnQgeyBDb3VjaGJhc2UgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWNvdWNoYmFzZVwiO1xyXG5pbXBvcnQgeyBEYXRhYmFzZSB9IGZyb20gXCIuL2RhdGFiYXNlXCI7XHJcbmltcG9ydCB7IFVzZXJTZXJ2aWNlIH0gZnJvbSAnLi4vdXNlci91c2VyLnNlcnZpY2UnO1xyXG5cclxuXHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBEYXRhU2VydmljZSB7XHJcblxyXG4gICAgcHVibGljIHBhdGllbnRzRGF0YV9pZDogYW55O1xyXG4gICAgcHVibGljIHVzZXJEYXRhX2lkOiBhbnk7XHJcbiAgICBwdWJsaWMgbWF0ZXJpYWxzX2lkOiBhbnk7XHJcbiAgICBwdWJsaWMgcmF0aW5nc19pZDogYW55O1xyXG4gICAgcHVibGljIGdsb2JhbERhdGFfaWQ6IGFueTtcclxuICAgIHB1YmxpYyBxdWl6c19pZDogYW55O1xyXG4gICAgcHVibGljIHF1aXpzX2RvbmVfaWQ6IGFueTtcclxuXHJcbiAgICBwdWJsaWMgUmVxdWVzdERhdGFfY29udHJvbDogYW55O1xyXG5cclxuICAgIHB1YmxpYyBmaWxlOiBmcy5GaWxlO1xyXG4gICAgcHVibGljIGZvbGRlcjogZnMuRm9sZGVyO1xyXG4gICAgcHVibGljIGZvbGRlck5hbWU6IHN0cmluZztcclxuICAgIHB1YmxpYyBmaWxlTmFtZTogc3RyaW5nO1xyXG4gXHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZGF0YWJhc2U6IERhdGFiYXNlKXtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnSW5zdGFuY2lvdSAtIERhdGFTZXJ2aWNlIScpO1xyXG4gICAgICAgICAgICAvL3RoaXMuZGF0YSA9IGRhdGFiYXNlLmdldERhdGFiYXNlKCk7XHJcbiAgICAgICAgICAgIHRoaXMuZGVsZXRlRGF0YSgncXVpeicpO1xyXG4gICAgICAgICAgICAvL3RoaXMuZGVsZXRlRGF0YSgndXNlcicpO1xyXG4gICAgICAgICAgICAvL3RoaXMuZGVsZXRlRGF0YSgnZ2xvYmFsJyk7XHJcbiAgICAgICAgICAgIC8vdGhpcy5kZWxldGVEYXRhKCdkYXRhJyk7XHJcblxyXG4gICAgICAgICAgICAvL3RoaXMuc2hvd0RhdGEoJ2RhdGEnKTsgLy9Fc3RhIGEgZGFyIGV4Y2VwY2FvIGUgYSBpbXByaW1pciBvcyB1c2VycyB0Yj8/PyEhISEhIChwb3IgY29uZmlybWFyKSBwcSBuIHRlbSBkYWRvcyBlIGVzdG9pcmE/PyBtYXMgaW1wcmltZSBvIHVzZXIgcHE/XHJcbiAgICAgICAgICAgIC8vdGhpcy5zaG93RGF0YSgndXNlcicpO1xyXG4gICAgICAgICAgICAvL3RoaXMuc2hvd0RhdGEoJ21hdGVyaWFscycpO1xyXG4gICAgICAgICAgICAvL3RoaXMuc2hvd0RhdGEoJ3F1aXonKTtcclxuICAgICAgICAgICAgdGhpcy5pbml0KCk7XHJcbiAgICAgICAgICAgIC8vdGhpcy5zaG93RGF0YSgnZ2xvYmFsJyk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvL1xyXG4gICAgICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBpbml0KCkge1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coXCJCRCBVU0FEQVwiKTtcclxuICAgICAgICB0aGlzLnNob3dEYXRhKFwiY2FyZWdpdmVyXCIpO1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coJ0EgaW5pY2lhbGl6YXIgYXMgdmFyacOhdmVpcyBnbG9iYWlzJyk7XHJcbiAgICAgICAgLy9BZGljaW9uYXIgbnVtZXJvIGRlIGF2YWxpYcOnw7VlcyBwZW5kZW50ZXNcclxuICAgICAgICAvLy4uLlxyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKHRoaXMuaXNHbG9iYWxTZXQoKSkge1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdBIGF0dWFsaXphciBnbG9iYWwgZGUgY29uZXhhbycpO1xyXG4gICAgICAgICAgICB0aGlzLmdsb2JhbERhdGFfaWQgPSB0aGlzLmdldEdsb2JhbHNJRCgpO1xyXG4gICAgICAgICAgICB2YXIgZ2xvYmFsID0gdGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmdldERvY3VtZW50KHRoaXMuZ2xvYmFsRGF0YV9pZCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkudXBkYXRlRG9jdW1lbnQodGhpcy5nbG9iYWxEYXRhX2lkLCB7XHJcbiAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJnbG9iYWxcIixcclxuICAgICAgICAgICAgICAgIFwiZGF0YVJlcXVlc3RcIjogXCJmYWxzZVwiLFxyXG4gICAgICAgICAgICAgICAgXCJldmFsdWF0aW9uc1RvRG9cIiA6IGdsb2JhbC5ldmFsdWF0aW9uc1RvRG9cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHRoaXMuZ2xvYmFsRGF0YV9pZCkpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdBIGNyaWFyIG9iamV0byBwYXJhIGFzIHZhcmnDoXZlaXMgZ2xvYmFpcycpO1xyXG4gICAgICAgICAgICAvL2NyaWFyIHZhcmnDoXZlbCBnbG9iYWwgYm9vbGVhbiBwYXJhIGRpemVyIHNlIGjDoSBxdWl6ZXMgcGFyYSBmYXplciB1cGRhdGUgb3UgblxyXG4gICAgICAgICAgICB0aGlzLmdsb2JhbERhdGFfaWQgPSB0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuY3JlYXRlRG9jdW1lbnQoe1xyXG4gICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZ2xvYmFsXCIsXHJcbiAgICAgICAgICAgICAgICBcImRhdGFSZXF1ZXN0XCI6IFwiZmFsc2VcIixcclxuICAgICAgICAgICAgICAgIFwiZXZhbHVhdGlvbnNUb0RvXCIgOiBcImZhbHNlXCJcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIC8vLy9jb25zb2xlLmxvZygnTk9WTyBHTE9CQUwgSUQ6ICcgKyB0aGlzLmdsb2JhbERhdGFfaWQpOyAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy51c2VyRGF0YV9pZCA9IHRoaXMuZ2V0Q3VycmVudFVzZXJEb2NJRCgpO1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coXCJRVUlaUyBVU0VSIERPQyBJRDogXCIgKyB0aGlzLnVzZXJEYXRhX2lkKTtcclxuICAgICAgICB0aGlzLnBhdGllbnRzRGF0YV9pZCA9IHRoaXMuZ2V0TGF0ZXN0UGF0aWVudERhdGEoKTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKFwiUEFUSUVOVFMgRE9DIElEOiBcIiArIHRoaXMucGF0aWVudHNEYXRhX2lkKTtcclxuICAgICAgICB0aGlzLnF1aXpzX2lkID0gdGhpcy5nZXRMYXRlc3RRdWl6RGF0YSgpO1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coXCJRVUlaUyBET0MgSUQ6IFwiICsgdGhpcy5xdWl6c19pZCk7XHJcbiAgICAgICAgLy90aGlzLnF1aXpzX2RvbmVfaWQgPSB0aGlzLmdldFF1aXpzT25Ib2xkX0lEKCk7XHJcblxyXG4gICAgICAgIC8vdmVyaWZpY2FyIHNlIGjDoSBxdWVzdGlvbsOhcmlvcyBwYXJhIHByZWVuY2hlclxyXG4gICAgICAgIC8vdGhpcy5jaGVja1F1aXpTdGF0dXMoKTtcclxuICAgICAgICBcclxuICAgIH1cclxuICAgIHN5bmMoKSB7XHJcbiAgICAgICAgLypcclxuICAgICAgICB0aGlzLmNvbm5lY3RvclNlcnZpY2UuZ2V0UGF0aWVudHMoKVxyXG4gICAgICAgICAgICAuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICAocmVzdWx0KSA9PiB0aGlzLm9uR2V0RGF0YVN1Y2Nlc3MocmVzdWx0KSxcclxuICAgICAgICAgICAgKGVycm9yKSA9PiB0aGlzLm9uR2V0RGF0YUVycm9yKGVycm9yKVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAqL1xyXG4gICAgfVxyXG4gXHJcbiAgICBzZXRVc2VyKHJlZ2lzdGVyZWRVc2VyKSB7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZygnQSBncmF2YXIgbyB1dGlsaXphZG9yJyk7XHJcbiAgICAgICAgdGhpcy51c2VyRGF0YV9pZCA9IHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5jcmVhdGVEb2N1bWVudCh7XHJcbiAgICAgICAgICAgIFwidHlwZVwiOiBcInVzZXJcIixcclxuICAgICAgICAgICAgXCJ1c2VyXCI6IHJlZ2lzdGVyZWRVc2VyXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy8vL2NvbnNvbGUubG9nKFwiQVFVSVwiK0pTT04uc3RyaW5naWZ5KHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5nZXREb2N1bWVudCh0aGlzLnVzZXJEYXRhX2lkLCBudWxsLCA0KSkpO1xyXG4gICAgfVxyXG4gICAgc2V0UGF0aWVudHMoKSB7XHJcblxyXG4gICAgfVxyXG4gICAgc2V0TWF0ZXJpYWxzKCkge1xyXG5cclxuICAgIH1cclxuICAgIGdldFBhdGllbnRzRGF0YSgpe1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coJ0EgZGV2b2x2ZXIgdG9kb3Mgb3MgZGFkb3MgZGEgQkQnKTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKHRoaXMucGF0aWVudHNEYXRhX2lkKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmdldERvY3VtZW50KHRoaXMucGF0aWVudHNEYXRhX2lkKS5kYXRhO1xyXG4gICAgfVxyXG4gICAgc2V0UGF0aWVudHNEYXRhKGRhdGEpIHtcclxuICAgICAgICAvL2RlYnVnXHJcbiAgICAgICAgLy90aGlzLmRlbGV0ZURhdGEoJ2RhdGEnKTtcclxuICAgICAgICAvL3RoaXMuZGVsZXRlRGF0YSgnbWF0ZXJpYWxzJyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy9Ub2RvcyBvcyBkYWRvcyBkbyBwYWNpZW50ZSBlIHJlZiBfaWRcclxuICAgICAgICBpZih0aGlzLnBhdGllbnRzRGF0YV9pZCkge1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdBIGF0dWFsaXphciBvcyBkYWRvcyBkb3MgcGFjaWVudGVzIG5hIGJkLCBjb20gbyBpZCAnICsgdGhpcy5wYXRpZW50c0RhdGFfaWQpO1xyXG4gICAgICAgICAgICB0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkudXBkYXRlRG9jdW1lbnQodGhpcy5wYXRpZW50c0RhdGFfaWQsIHtcclxuICAgICAgICAgICAgICAgIFwiZGF0YVwiOiBkYXRhLFxyXG4gICAgICAgICAgICAgICAgXCJ0eXBlXCIgOiBcImRhdGFcIlxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdHcmF2YXIgZGFkb3MgUGFjaWVudGVzJyk7XHJcbiAgICAgICAgICAgIHRoaXMucGF0aWVudHNEYXRhX2lkID0gdGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmNyZWF0ZURvY3VtZW50KHtcclxuICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImRhdGFcIixcclxuICAgICAgICAgICAgICAgIFwiZGF0YVwiOiBkYXRhXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy90aGlzLm1lZGlhUGVyc2lzdGVuY2UoZGF0YSk7XHJcbiAgICAgICAgXHJcblxyXG4gICAgICAgIC8vR3VhcmRhIGRhZG9zIGRvcyBQYWNpZW50ZXNcclxuICAgICAgICAvL0d1YXJkYSBkYWRvcyBkYXMgbmVjZXNzaWRhZGVzXHJcbiAgICAgICAgdmFyIGdsb2JhbCA9IHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5nZXREb2N1bWVudCh0aGlzLmdsb2JhbERhdGFfaWQpO1xyXG5cclxuICAgICAgICB0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkudXBkYXRlRG9jdW1lbnQodGhpcy5nbG9iYWxEYXRhX2lkLCB7XHJcbiAgICAgICAgICAgIFwidHlwZVwiIDogXCJnbG9iYWxcIixcclxuICAgICAgICAgICAgXCJkYXRhUmVxdWVzdFwiOiBcInRydWVcIixcclxuICAgICAgICAgICAgXCJldmFsdWF0aW9uc1RvRG9cIiA6IGdsb2JhbC5ldmFsdWF0aW9uc1RvRG9cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy92ZXIgbyBnZXQgZG9jdW1lbnQgdGIgZSBjb21wYXJhclxyXG4gICAgICAgIHRoaXMuc2hvd0RhdGEoJ2dsb2JhbCcpO1xyXG4gICAgfVxyXG4gICAgbWVkaWFQZXJzaXN0ZW5jZShkYXRhKSB7XHJcbiAgICAgICAgICAvKipcclxuICAgICAgICAgKiBBYnJpciB0b2RvIG8gY29udGXDumRvIGRhIHBhc3RhIG1hdGVyaWFsc1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHZhciBkb2N1bWVudHMgPSBmcy5rbm93bkZvbGRlcnMuZG9jdW1lbnRzKCk7XHJcbiAgICAgICAgdmFyIHBhdGggPSBmcy5wYXRoLmpvaW4oZG9jdW1lbnRzLnBhdGgsIFwiYXBwL21hdGVyaWFsc1wiKTtcclxuXHJcbiAgICAgICAgLy8vL2NvbnNvbGUubG9nKHBhdGgpO1xyXG4gICAgfVxyXG4gIFxyXG4gICAgc2V0TmVlZHMoKSB7XHJcblxyXG4gICAgfVxyXG4gICAgZ2V0VG9rZW4oKTogc3RyaW5nIHtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKCdBIGRldm9sdmVyIHRva2VuJyk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5nZXREb2N1bWVudCh0aGlzLnVzZXJEYXRhX2lkKS51c2VyLmNhcmVnaXZlcl90b2tlbjtcclxuICAgIH1cclxuICAgIGdldFVzZXJJRCgpOiBzdHJpbmcge1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coJ0EgbyBJRCBkbyB1c2VyJyk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5nZXREb2N1bWVudCh0aGlzLnVzZXJEYXRhX2lkKS51c2VyLmlkO1xyXG4gICAgfVxyXG4gICAgZ2V0TGF0ZXN0VXNlclRvUmVnaXN0ZXIoKSB7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIkEgZGV2b2x2ZXIgdWx0aW1vIHV0aWxpemFkb3IgcmVnaXN0YWRvXCIpXHJcbiAgICAgICAgdmFyIHVzZXJzID0gdGhpcy5nZXRBbGxVc2VycygpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKHVzZXJzKSB7XHJcbiAgICAgICAgICAgIHZhciBsYXN0VXNlcjtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSBpbiB1c2Vycykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHVzZXJzLmhhc093blByb3BlcnR5KGkpICYmIHR5cGVvZihpKSAhPT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxhc3RVc2VyID0gdXNlcnNbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGxhc3RVc2VyLnVzZXI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBkZWxldGVEYXRhKHZpZXcpIHtcclxuICAgICAgICBsZXQgZG9jdW1lbnRzID0gdGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmV4ZWN1dGVRdWVyeSh2aWV3KTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKCdBIGFwYWdhciBiZDogJyArIHZpZXcpO1xyXG4gICAgICAgIC8vIGxvb3Agb3ZlciBhbGwgZG9jdW1lbnRzXHJcbiAgICAgICAgaWYodGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmV4ZWN1dGVRdWVyeSh2aWV3KS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZG9jdW1lbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBkZWxldGUgZWFjaCBkb2N1bWVudFxyXG4gICAgICAgICAgICAgICAgLy8gY291Y2hiYXNlIHdpbGwgYXNzaWduIGFuIGlkIChfaWQpIHRvIGEgZG9jdW1lbnQgd2hlbiBjcmVhdGVkXHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZGVsZXRlRG9jdW1lbnQoZG9jdW1lbnRzW2ldLl9pZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0QWxsVXNlcnMoKXtcclxuICAgICAgICBpZih0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZXhlY3V0ZVF1ZXJ5KFwidXNlclwiKS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZXhlY3V0ZVF1ZXJ5KFwidXNlclwiKTtcclxuICAgICAgICB9ICAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHNob3dEYXRhKHZpZXcpIHtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKCdBIG1vc3RyYXIgYmQ6ICcgKyB2aWV3ICsgJyBjb20gJyArIHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5leGVjdXRlUXVlcnkodmlldykubGVuZ3RoICsgJyBlbGVtZW50b3MnKTtcclxuICAgICAgICBpZih0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZXhlY3V0ZVF1ZXJ5KHZpZXcpLmxlbmd0aCA+IDApIHsgICAgIFxyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5leGVjdXRlUXVlcnkodmlldyksIG51bGwsIDQpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAgcHVibGljIG9uQ3JlYXRlRmlsZSgpIHtcclxuICAgICAgICAvLyA+PiBmcy1jcmVhdGUtYWxsLWNvZGVcclxuICAgICAgICBsZXQgZG9jdW1lbnRzID0gZnMua25vd25Gb2xkZXJzLmRvY3VtZW50cygpO1xyXG4gICAgICAgIHRoaXMuZm9sZGVyID0gZG9jdW1lbnRzLmdldEZvbGRlcih0aGlzLmZvbGRlck5hbWUgfHwgXCJ0ZXN0Rm9sZGVyXCIpO1xyXG4gICAgICAgIHRoaXMuZmlsZSA9IHRoaXMuZm9sZGVyLmdldEZpbGUoKHRoaXMuZmlsZU5hbWUgfHwgXCJ0ZXN0RmlsZVwiKSArIFwiLnR4dFwiKTtcclxuXHJcbiAgICAgICAgXHJcbiAgICAgICAgLypcclxuICAgICAgICB0aGlzLmZpbGUud3JpdGVUZXh0KHRoaXMuZmlsZVRleHRDb250ZW50IHx8IFwic29tZSByYW5kb20gY29udGVudFwiKVxyXG4gICAgICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gU3VjY2VlZGVkIHdyaXRpbmcgdG8gdGhlIGZpbGUuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmZpbGUucmVhZFRleHQoKVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3VjY2Vzc01lc3NhZ2UgPSBcIlN1Y2Nlc3NmdWxseSBzYXZlZCBpbiBcIiArIHRoaXMuZmlsZS5wYXRoO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLndyaXR0ZW5Db250ZW50ID0gcmVzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmlzSXRlbVZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KS5jYXRjaChlcnIgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gRXJyb3JcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gPDwgZnMtY3JlYXRlLWFsbC1jb2RlXHJcbiAgICAgICAgKi9cclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRDdXJyZW50VXNlckRvY0lEKCkge1xyXG4gICAgICAgIHZhciB1c2VycyA9IHRoaXMuZ2V0QWxsVXNlcnMoKTtcclxuICAgICAgICBcclxuICAgICAgICBpZih1c2Vycykge1xyXG4gICAgICAgICAgICB2YXIgbGFzdFVzZXI7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgaW4gdXNlcnMpIHtcclxuICAgICAgICAgICAgICAgIGlmICh1c2Vycy5oYXNPd25Qcm9wZXJ0eShpKSAmJiB0eXBlb2YoaSkgIT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgICAgICAgICBsYXN0VXNlciA9IHVzZXJzW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBsYXN0VXNlci5faWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGlzVXNlckF1dGgoKSB7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZygnQSB2ZXJpZmljYXIgc2UgZXhpc3RlIHV0aWxpemFkb3IgbmEgQkQnKTtcclxuICAgICAgICBpZih0aGlzLnVzZXJEYXRhX2lkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7IFxyXG4gICAgfVxyXG4gICAgLy9HdWFyZGEgYXZhbGlhw6fDtWVzIGRvcyBtYXRlcmlhaXNcclxuICAgIHB1YmxpYyBzZXRSYXRpbmcocmF0aW5nKSB7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZygnQSByZWdpc3RhciBvIHJhdGluZycpO1xyXG4gICAgICAgIC8vUmVjZWJvIG8gcmF0aW5nLCBjb20gaWQgZG8gbWF0ZXJpYWxcclxuICAgICAgICAvL1ZvdSDDoCBCRCBkb3MgbWF0ZXJpYWlzXHJcbiAgICAgICAgLy9QYXJhIGNhZGEgbWF0ZXJpYWwgY29tIGFxdWVsZSBpZCwgYXR1YWxpemFyIG8gc2V1IHJhdGluZy5cclxuICAgICAgICAvKklzdG8gYWx0ZXJhIGEgYmQgZG9zIG1hdGVyaWFpcy5cclxuICAgICAgICBsZXQgbWF0ZXJpYWxzID0gdGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmdldERvY3VtZW50KHRoaXMubWF0ZXJpYWxzX2lkKS5tYXRlcmlhbHM7XHJcbiAgICAgICAgXHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IG1hdGVyaWFscy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBmb3IobGV0IGogPSAwOyBqIDwgbWF0ZXJpYWxzW2ldLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBpZihyYXRpbmcuaWRfbWF0ZXJpYWwgPT09IG1hdGVyaWFsc1tpXVtqXS5pZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ3JlZ2lzdG91Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgbWF0ZXJpYWxzW2ldW2pdLnJhdGluZ3MucHVzaChyYXRpbmcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vLy9jb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShtYXRlcmlhbHMsIG51bGwsIDQpKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkudXBkYXRlRG9jdW1lbnQodGhpcy5tYXRlcmlhbHNfaWQsIHtcclxuICAgICAgICAgICAgXCJ0eXBlXCI6IFwibWF0ZXJpYWxzXCIsXHJcbiAgICAgICAgICAgIFwibWF0ZXJpYWxzXCI6IG1hdGVyaWFscyxcclxuICAgICAgICB9KVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vdGhpcy5zaG93RGF0YSgnbWF0ZXJpYWxzJyk7XHJcbiAgICAgICAgRklNIGRhIGFsdGVyYcOnw6NvIG5hIEJEIGRvcyBtYXRlcmlhaXMqL1xyXG4gICAgICAgIC8qQXNzaW0gYWx0ZXJhIGEgQkQgZG9zIHBhY2llbnRlcyovXHJcbiAgICAgICAgLy8vL2NvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5nZXREb2N1bWVudCh0aGlzLnBhdGllbnRzRGF0YV9pZCkuZGF0YSxudWxsLDQpKTtcclxuICAgICAgICBsZXQgcGF0aWVudHNEYXRhID0gdGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmdldERvY3VtZW50KHRoaXMucGF0aWVudHNEYXRhX2lkKS5kYXRhO1xyXG4gICAgICAgIC8vLy9jb25zb2xlLmxvZyhcIkVudHJvdSBubyBmb3JcIik7XHJcbiAgICAgICAgLypcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgcGF0aWVudHNEYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaiA9IDA7IGogPCBwYXRpZW50c0RhdGFbaV0ubmVlZHMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgIGZvcihsZXQgayA9IDA7IGsgPCBwYXRpZW50c0RhdGFbaV0ubmVlZHNbal0ubWF0ZXJpYWxzLmxlbmd0aDsgaysrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhdGllbnRzRGF0YVtpXS5uZWVkc1tqXS5tYXRlcmlhbHNba11bJ3JhdGluZ3MnXSA9IFsnJ107XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgKi9cclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgcGF0aWVudHNEYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaiA9IDA7IGogPCBwYXRpZW50c0RhdGFbaV0ubmVlZHMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgIGZvcihsZXQgayA9IDA7IGsgPCBwYXRpZW50c0RhdGFbaV0ubmVlZHNbal0ubWF0ZXJpYWxzLmxlbmd0aDsgaysrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgaWYocGF0aWVudHNEYXRhW2ldLm5lZWRzW2pdLm1hdGVyaWFsc1trXS5pZCA9PSByYXRpbmcuaWRfbWF0ZXJpYWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8vL2NvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHBhdGllbnRzRGF0YVtpXVtqXVtrXSxudWxsLDQpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGF0aWVudHNEYXRhW2ldLm5lZWRzW2pdLm1hdGVyaWFsc1trXVsncmF0aW5ncyddID0gcmF0aW5nOyAgICBcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8vL2NvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHBhdGllbnRzRGF0YSxudWxsLDQpKTtcclxuICAgICAgICB0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkudXBkYXRlRG9jdW1lbnQodGhpcy5wYXRpZW50c0RhdGFfaWQsIHtcclxuICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGF0YVwiLFxyXG4gICAgICAgICAgICBcImRhdGFcIjogcGF0aWVudHNEYXRhLFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgXHJcbiAgICAgICAgLy90aGlzLnNob3dEYXRhKFwiZGF0YVwiKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRNYXRlcmlhbFJhdGluZyhtYXRlcmlhbF9pZCkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0TmVlZE1hdGVyaWFscygpIHtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKCdBIGRldm9sdmVyIHRvZG9zIG9zIG1hdGVyaWFpcycpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZ2V0RG9jdW1lbnQodGhpcy5tYXRlcmlhbHNfaWQpLm1hdGVyaWFscztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaXNQYXRpZW50c1JlcXVlc3REb25lKCkge1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coXCJBIHZlcmlmaWNhciBzZSBvIHBlZGlkbyBhbyBzZXJ2aWRvciBqw6EgZm9pIGZlaXRvXCIpO1xyXG4gICAgICAgIGlmKHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5nZXREb2N1bWVudCh0aGlzLmdsb2JhbERhdGFfaWQpLmRhdGFSZXF1ZXN0ID09IFwiZmFsc2VcIikge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXRRdWl6cyhjYXJlZ2l2ZXJRdWVzdGlvbmFpcmVzKSB7XHJcblxyXG4gICAgICAgIGlmKGNhcmVnaXZlclF1ZXN0aW9uYWlyZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiRU5UUk9VIEFRVUkgRSBTRVRPVSBPIEVWQUxVQVRJT05TIEEgVFJVRS4gQ29tcHJpbWVudG8gZG8gYXJyYXkgZGUgcXVpemVzOiBcIiArIGNhcmVnaXZlclF1ZXN0aW9uYWlyZXMubGVuZ3RoKTtcclxuICAgICAgICAgICAgdGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLnVwZGF0ZURvY3VtZW50KHRoaXMuZ2xvYmFsRGF0YV9pZCwge1xyXG4gICAgICAgICAgICAgICAgXCJldmFsdWF0aW9uc1RvRG9cIiA6IFwidHJ1ZVwiLFxyXG4gICAgICAgICAgICAgICAgXCJ0eXBlXCIgOiBcImdsb2JhbFwiLFxyXG4gICAgICAgICAgICAgICAgXCJkYXRhUmVxdWVzdFwiIDogXCJ0cnVlXCJcclxuICAgICAgICAgICAgfSk7ICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKCF0aGlzLmlzUXVpenNTZXQoKSkge1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdOb3ZvIGRvYyBkZSBRdWl6cycpO1xyXG4gICAgICAgICAgICB0aGlzLnF1aXpzX2lkID0gdGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmNyZWF0ZURvY3VtZW50KHtcclxuICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInF1aXpcIixcclxuICAgICAgICAgICAgICAgIFwicXVpelwiOiBjYXJlZ2l2ZXJRdWVzdGlvbmFpcmVzXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLnNob3dEYXRhKCdxdWl6Jyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdmFyIHF1aXpzX3RvX2FkZCA9IFtdO1xyXG4gICAgICAgICAgICB2YXIgZm91bmRfY29udHJvbCA9IGZhbHNlOyAvL3ZhcmlhdmVsIGRlIGNvbnRyb2xlIGRlIG5vdm9zIHF1aXpzIGEgYWRpY2lvbmFyXHJcbiAgICAgICAgICAgIHZhciBzYW1lX3F1aXpfZm91bmQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ0rDoSBleGlzdGVtIHF1aXpzIG5hIEJEJyk7XHJcbiAgICAgICAgICAgIHZhciBxdWl6cyA9IHRoaXMuZ2V0UXVpenMoKTtcclxuICAgICAgICAgICAgLy8vL2NvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHF1aXpzLCBudWxsLCA0KSk7XHJcbiAgICAgICAgICAgIGNhcmVnaXZlclF1ZXN0aW9uYWlyZXMuZm9yRWFjaChxdWVzdGlvbm5haXJlX3NlcnZlciA9PiB7XHJcbiAgICAgICAgICAgICAgICBzYW1lX3F1aXpfZm91bmQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHF1aXpzLmZvckVhY2gocXVlc3Rpb25uYWlyZV9CRCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYocXVlc3Rpb25uYWlyZV9CRC5pZCA9PSBxdWVzdGlvbm5haXJlX3NlcnZlci5pZCAmJiBxdWVzdGlvbm5haXJlX0JELnJlZmVyZW5jZSA9PSBxdWVzdGlvbm5haXJlX3NlcnZlci5yZWZlcmVuY2UgJiYgcXVlc3Rpb25uYWlyZV9CRC5yZWZlcmVuY2VfbmFtZSA9PSBxdWVzdGlvbm5haXJlX3NlcnZlci5yZWZlcmVuY2VfbmFtZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdFbmNvbnRyb3UgcXVpeiBpZ3VhbDogaWQtJyArIHF1ZXN0aW9ubmFpcmVfQkQuaWQgKyAnIHJlZmVyZW5jZS0nICsgcXVlc3Rpb25uYWlyZV9CRC5yZWZlcmVuY2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzYW1lX3F1aXpfZm91bmQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgaWYoIXNhbWVfcXVpel9mb3VuZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ0VuY29udHJlaSBxdWl6cyBub3ZvczsnKTtcclxuICAgICAgICAgICAgICAgICAgICBmb3VuZF9jb250cm9sID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBxdWl6c190b19hZGQucHVzaChxdWVzdGlvbm5haXJlX3NlcnZlcik7XHJcbiAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShxdWl6c190b19hZGQpKTtcclxuICAgICAgICAgICAgaWYoZm91bmRfY29udHJvbCkge1xyXG4gICAgICAgICAgICAgICAgcXVpenNfdG9fYWRkLmZvckVhY2gocXVpeiA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcXVpenMucHVzaChxdWl6KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkocXVpenMsIG51bGwsIDQpKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vaW5kZXggYXJyYXlcclxuICAgICAgICAgICAgbGV0IGluZGV4ID0gMDtcclxuICAgICAgICAgICAgcXVpenMuZm9yRWFjaChlbGVtZW50ID0+IHtcclxuICAgICAgICAgICAgZWxlbWVudC5yZWZfcXVlc3Rpb25uYWlyZSA9IGluZGV4ICsgXCJcIjtcclxuICAgICAgICAgICAgaW5kZXgrKztcclxuICAgICAgICAgICBcclxuICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLnVwZGF0ZURvY3VtZW50KHRoaXMucXVpenNfaWQsIHtcclxuICAgICAgICAgICAgICAgICdxdWl6JyA6IHF1aXpzLFxyXG4gICAgICAgICAgICAgICAgJ3R5cGUnIDogJ3F1aXonXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeSh0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZXhlY3V0ZVF1ZXJ5KCdxdWl6JylbMF0ucXVpeikpO1xyXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyh0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZXhlY3V0ZVF1ZXJ5KCdxdWl6JylbMF0ucXVpei5sZW5ndGggKyAnIGVsZW1lbnRvcycpOyAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0QWxsUXVpenMoKSB7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIkEgb2J0ZXIgSUQgZG9zIHF1aXpzXCIpO1xyXG4gICAgICAgIGlmKHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5leGVjdXRlUXVlcnkoJ3F1aXonKS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIC8vLy9jb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeSh0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZXhlY3V0ZVF1ZXJ5KCdxdWl6JyksIG51bGwsIDQpKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5leGVjdXRlUXVlcnkoJ3F1aXonKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZygncGFzc291IGFxdWknKTtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRMYXRlc3RRdWl6RGF0YSgpIHtcclxuICAgICAgICB2YXIgcXVpenMgPSB0aGlzLmdldEFsbFF1aXpzKCk7XHJcblxyXG4gICAgICAgIGlmKHF1aXpzKSB7XHJcbiAgICAgICAgICAgIHZhciBsYXN0UXVpejtcclxuXHJcbiAgICAgICAgICAgIGxhc3RRdWl6ID0gcXVpenNbcXVpenMubGVuZ3RoIC0gMV07XHJcbiAgICAgICAgICAgIHJldHVybiBsYXN0UXVpei5faWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vLy9jb25zb2xlLmxvZygncGFzc291IGFxdWktMScpO1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldExhdGVzdFBhdGllbnREYXRhKCkge1xyXG4gICAgICAgIHZhciBwYXRpZW50c0RhdGEgPSB0aGlzLmdldEFsbFBhdGllbnRzRGF0YSgpO1xyXG5cclxuICAgICAgICBpZihwYXRpZW50c0RhdGEpIHtcclxuICAgICAgICAgICAgdmFyIGxhc3REYXRhO1xyXG5cclxuICAgICAgICAgICAgbGFzdERhdGEgPSBwYXRpZW50c0RhdGFbcGF0aWVudHNEYXRhLmxlbmd0aCAtIDFdO1xyXG4gICAgICAgICAgICByZXR1cm4gbGFzdERhdGEuX2lkO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRRdWl6cygpIHtcclxuICAgICAgICAvLy8vY29uc29sZS5sb2codGhpcy5xdWl6c19pZCk7XHJcbiAgICAgICAgLy8vL2NvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5nZXREb2N1bWVudCh0aGlzLnF1aXpzX2lkKSkpO1xyXG4gICAgICAgIC8vLy9jb25zb2xlLmxvZyh0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZXhlY3V0ZVF1ZXJ5KCdxdWl6JykubGVuZ3RoKTtcclxuICAgICAgICBpZih0aGlzLnF1aXpzX2lkKSB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5leGVjdXRlUXVlcnkoJ3F1aXonKS5sZW5ndGggPiAwKSB7ICAgICAgICBcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZ2V0RG9jdW1lbnQodGhpcy5xdWl6c19pZCkucXVpejtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBpc0dsb2JhbFNldCgpIHtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKFwiR0xPQkFMU0laRTogXCIgKyB0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZXhlY3V0ZVF1ZXJ5KCdnbG9iYWwnKS5sZW5ndGgpO1xyXG4gICAgICAgIGlmKHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5leGVjdXRlUXVlcnkoJ2dsb2JhbCcpLmxlbmd0aCA+IDApIHsgICAgICAgICAgICBcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRHbG9iYWxzSUQoKSB7XHJcbiAgICAgICAgaWYodGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmV4ZWN1dGVRdWVyeSgnZ2xvYmFsJykubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAvLy8vY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkodGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmV4ZWN1dGVRdWVyeShcImdsb2JhbFwiKSwgbnVsbCwgNCkpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5leGVjdXRlUXVlcnkoJ2dsb2JhbCcpWzBdLl9pZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0QWxsUGF0aWVudHNEYXRhKCkge1xyXG4gICAgICAgIGlmKHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5leGVjdXRlUXVlcnkoXCJkYXRhXCIpLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgLy8gLy9jb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeSh0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZXhlY3V0ZVF1ZXJ5KFwiZGF0YVwiKSwgbnVsbCwgNCkpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmV4ZWN1dGVRdWVyeShcImRhdGFcIik7XHJcbiAgICAgICAgfSAgICAgICAgIFxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIHB1YmxpYyB1cGRhdGVRdWl6U3RhdHVzKHF1ZXN0aW9ubmFpcmUpIHsgICAgICAgIFxyXG4gICAgICAgIHZhciBxdWl6cyA9IHRoaXMuZ2V0UXVpenMoKTtcclxuICAgICAgICBpZihxdWl6cykge1xyXG4gICAgICAgICAgICBxdWl6cy5mb3JFYWNoKGVsZW1lbnRfcXVpeiA9PiB7XHJcbiAgICAgICAgICAgICAgIGlmKGVsZW1lbnRfcXVpei5yZWZfcXVlc3Rpb25uYWlyZSA9PSBxdWVzdGlvbm5haXJlLnJlZl9xdWVzdGlvbm5haXJlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudF9xdWl6LmRvbmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS51cGRhdGVEb2N1bWVudCh0aGlzLnF1aXpzX2lkLCB7XHJcbiAgICAgICAgICAgICAgICAncXVpeicgOiBxdWl6cyxcclxuICAgICAgICAgICAgICAgICd0eXBlJyA6ICdxdWl6J1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgLy90aGlzLnNob3dEYXRhKCdxdWl6Jyk7XHJcbiAgICAgICAgICAgIHRoaXMuY2hlY2tRdWl6U3RhdHVzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgY2hlY2tRdWl6U3RhdHVzKCkge1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coJ0EgVkVSSUZJQ0FSIFNFIEhBIFFVSVpTIFBPUiBGQVpFUicpO1xyXG4gICAgICAgIHZhciBxdWl6cyA9IHRoaXMuZ2V0UXVpenMoKTtcclxuICAgICAgICB2YXIgZ2xvYmFsID0gdGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmdldERvY3VtZW50KHRoaXMuZ2xvYmFsRGF0YV9pZCk7XHJcblxyXG4gICAgICAgIGlmKHF1aXpzKSB7XHJcbiAgICAgICAgICAgIC8vLy9jb25zb2xlLmxvZygncGFzc291IGFxdWktMicpO1xyXG4gICAgICAgICAgICB2YXIgcXVpel9kb25lID0gW107XHJcbiAgICAgICAgICAgIHZhciBmb3VuZF9xdWl6X3RvZG8gPSBmYWxzZTtcclxuICAgICAgICAgICAgcXVpel9kb25lLnB1c2gocXVpenMubWFwKGZ1bmN0aW9uKHF1aXpzKXtyZXR1cm4gcXVpenMuZG9uZX0pKTtcclxuICAgICAgICAgICAgcXVpel9kb25lWzBdLmZvckVhY2gocXVpel9yZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIkEgdmVyaWZpY2FyIGVzdGFkbyBkYXMgYXZhbGlhw6fDtWVzXCIpO1xyXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnMTogJyArIHF1aXpfcmVzdWx0KTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgaWYoIXF1aXpfcmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm91bmRfcXVpel90b2RvID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiQSBtdWRhciBlc3RhZG8gZGFzIGF2YWxpYcOnw7Vlc1wiKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkudXBkYXRlRG9jdW1lbnQodGhpcy5nbG9iYWxEYXRhX2lkLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZXZhbHVhdGlvbnNUb0RvXCIgOiBcInRydWVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCIgOiBcImdsb2JhbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImRhdGFSZXF1ZXN0XCIgOiBnbG9iYWwuZGF0YVJlcXVlc3RcclxuICAgICAgICAgICAgICAgICAgICB9KTsgICBcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBpZighZm91bmRfcXVpel90b2RvKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkudXBkYXRlRG9jdW1lbnQodGhpcy5nbG9iYWxEYXRhX2lkLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJldmFsdWF0aW9uc1RvRG9cIiA6IFwiZmFsc2VcIixcclxuICAgICAgICAgICAgICAgICAgICBcInR5cGVcIiA6IFwiZ2xvYmFsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJkYXRhUmVxdWVzdFwiIDogZ2xvYmFsLmRhdGFSZXF1ZXN0XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkudXBkYXRlRG9jdW1lbnQodGhpcy5nbG9iYWxEYXRhX2lkLCB7XHJcbiAgICAgICAgICAgICAgICBcImV2YWx1YXRpb25zVG9Eb1wiIDogXCJmYWxzZVwiLFxyXG4gICAgICAgICAgICAgICAgXCJ0eXBlXCIgOiBcImdsb2JhbFwiLFxyXG4gICAgICAgICAgICAgICAgXCJkYXRhUmVxdWVzdFwiIDogZ2xvYmFsLmRhdGFSZXF1ZXN0XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLy8vY29uc29sZS5sb2coJ3Bhc3NvdSBhcXVpIC0gMycpOyAgIFxyXG4gICAgfVxyXG4gICAgaGFzRXZhbHVhdGlvbnNUb0RvKCkge1xyXG4gICAgICAgIC8vdGhpcy5jaGVja1F1aXpTdGF0dXMoKTtcclxuICAgICAgICAvKlxyXG4gICAgICAgIC8vY29uc29sZS5sb2coJ0dMT0JBTCBJRDogJyArIHRoaXMuZ2xvYmFsRGF0YV9pZCk7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeSh0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZ2V0RG9jdW1lbnQodGhpcy5nbG9iYWxEYXRhX2lkKSwgbnVsbCwgNCkpO1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coJ0V2YWx1YXRpb25zIHRvIGRvOicgKyB0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZ2V0RG9jdW1lbnQodGhpcy5nbG9iYWxEYXRhX2lkKS5ldmFsdWF0aW9uc1RvRG8pXHJcbiAgICAgICAgKi9cclxuICAgICAgICBpZih0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZ2V0RG9jdW1lbnQodGhpcy5nbG9iYWxEYXRhX2lkKS5ldmFsdWF0aW9uc1RvRG8gPT0gXCJ0cnVlXCIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGlzUXVpenNTZXQoKSB7XHJcbiAgICAgICAgLy8vL2NvbnNvbGUubG9nKCdRVUlaLUlEOiAnICsgdGhpcy5xdWl6c19pZCk7XHJcbiAgICAgICAgaWYodGhpcy5xdWl6c19pZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgZGVsZXRlUXVlc3Rpb25uYWlyZShxdWVzdGlvbm5haXJlcykge1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coXCJBIGFwYWdhciBxdWl6cyFcIik7XHJcbiAgICAgICAgdmFyIHF1aXpzID0gdGhpcy5nZXRRdWl6cygpO1xyXG4gICAgICAgIHZhciBmb3VuZF9lcXVhbDtcclxuICAgICAgICB2YXIgcXVpenNfdGVtcCA9IFtdO1xyXG4gICAgICAgICAgICAvLy8vY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkocXVpenMsIG51bGwsIDQpKTtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIlF1aXpzIGRhIEJEOiBcIik7XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkocXVpenMsIG51bGwsIDQpKTtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIlF1aXpzIEVOVklBRE9TOiBcIik7XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkocXVlc3Rpb25uYWlyZXMsIG51bGwsIDQpKTtcclxuICAgICAgICAgICAgcXVpenMuZm9yRWFjaChxdWVzdGlvbm5haXJlX0JEID0+IHtcclxuICAgICAgICAgICAgICAgIGZvdW5kX2VxdWFsID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiUkVGRVJFTkNJQSBETyBRVUlaIEJEOiBcIiArIHF1ZXN0aW9ubmFpcmVfQkQucmVmX3F1ZXN0aW9ubmFpcmUpO1xyXG4gICAgICAgICAgICAgICAgcXVlc3Rpb25uYWlyZXMuZm9yRWFjaChxdWVzdGlvbm5haXJlX3NlbnQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJSRUZFUkVOQ0lBIERPIFFVSVogRU5WSUFETzogXCIgKyBxdWVzdGlvbm5haXJlX3NlbnQucmVmX3F1ZXN0aW9ubmFpcmUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHF1ZXN0aW9ubmFpcmVfc2VudC5yZWZfcXVlc3Rpb25uYWlyZSA9PSBxdWVzdGlvbm5haXJlX0JELnJlZl9xdWVzdGlvbm5haXJlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJSRUZFUkVOQ0lBIERPIFFVSVogQSBFTElNSU5BUjogXCIgKyBxdWVzdGlvbm5haXJlX3NlbnQucmVmX3F1ZXN0aW9ubmFpcmUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgIC8vIHF1aXpzLnNwbGljZShxdWVzdGlvbm5haXJlX0JELnJlZl9xdWVzdGlvbm5haXJlLCAxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICBmb3VuZF9lcXVhbCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgaWYoIWZvdW5kX2VxdWFsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcXVpenNfdGVtcC5wdXNoKHF1ZXN0aW9ubmFpcmVfQkQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIk51bWVybyBkZSBxdWl6ZXMgcG9yIGZhemVyOiBcIiArIHF1aXpzLmxlbmd0aCk7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShxdWl6cywgbnVsbCwgNCkpO1xyXG4gICAgICAgIHF1aXpzID0gcXVpenNfdGVtcDtcclxuXHJcbiAgICAgICAgaWYocXVpenMubGVuZ3RoICA9PSAwKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQSBhcGFnYXIgZG9jIGNvcnJlbnRlIGRlIHF1aXpzXCIpO1xyXG4gICAgICAgICAgICB0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZGVsZXRlRG9jdW1lbnQodGhpcy5xdWl6c19pZCk7XHJcbiAgICAgICAgICAgIHRoaXMucXVpenNfaWQgPSBudWxsO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCBpbmRleCA9IDA7XHJcbiAgICAgICAgICAgIHF1aXpzLmZvckVhY2goZWxlbWVudCA9PiB7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LnJlZl9xdWVzdGlvbm5haXJlID0gaW5kZXggKyBcIlwiO1xyXG4gICAgICAgICAgICAgICAgaW5kZXgrKztcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdBcMOzcyByZWluZGV4YcOnw6NvIScpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShxdWl6cywgbnVsbCwgNCkpO1xyXG4gICAgICAgICAgICB0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkudXBkYXRlRG9jdW1lbnQodGhpcy5xdWl6c19pZCwge1xyXG4gICAgICAgICAgICAgICAgJ3F1aXonIDogcXVpenMsXHJcbiAgICAgICAgICAgICAgICAndHlwZScgOiAncXVpeidcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiTk9WTyBBUlJBWSBERSBRVUlaUyBOQSBCRFwiKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeSh0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZ2V0RG9jdW1lbnQodGhpcy5xdWl6c19pZCksIG51bGwsIDQpKTtcclxuICAgIH1cclxuICAgIGFkZFF1ZXN0aW9ubmFpcmVUb0RCKHF1ZXN0aW9ubmFpcmUpIHtcclxuICAgICAgICBpZighdGhpcy5pc1NldFF1aXpzRG9uZSgpKSB7XHJcbiAgICAgICAgICAgIHRoaXMucXVpenNfZG9uZV9pZCA9IHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5jcmVhdGVEb2N1bWVudCh7XHJcbiAgICAgICAgICAgICAgICAndHlwZScgOiAncXVpenNPbkhvbGQnLFxyXG4gICAgICAgICAgICAgICAgJ3F1ZXN0aW9ubmFpcmVzJyA6IHF1ZXN0aW9ubmFpcmUgXHJcbiAgICAgICAgICAgIH0pOyAgICAgICAgICAgIFxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHZhciBxdWl6c09uSG9sZF9CRCA9IHRoaXMuZ2V0QWxsUXVpenNPbkhvbGQoKTtcclxuICAgICAgICAgICAgcXVpenNPbkhvbGRfQkQucHVzaChxdWVzdGlvbm5haXJlKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMucXVpenNfZG9uZV9pZCA9IHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS51cGRhdGVEb2N1bWVudCh7XHJcbiAgICAgICAgICAgICAgICAndHlwZScgOiAncXVpenNPbkhvbGQnLFxyXG4gICAgICAgICAgICAgICAgJ3F1ZXN0aW9ubmFpcmVzJyA6IHF1aXpzT25Ib2xkX0JEIFxyXG4gICAgICAgICAgICB9KTsgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaXNTZXRRdWl6c0RvbmUoKSB7XHJcbiAgICAgICAgaWYodGhpcy5xdWl6c19kb25lX2lkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBnZXRRdWl6c09uSG9sZF9JRCgpIHtcclxuICAgICAgICBpZih0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZXhlY3V0ZVF1ZXJ5KCdxdWl6T25Ib2xkJykubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAvLy8vY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkodGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmV4ZWN1dGVRdWVyeShcInF1aXpPbkhvbGRcIiksIG51bGwsIDQpKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5leGVjdXRlUXVlcnkoJ3F1aXpPbkhvbGQnKVswXS5faWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgZ2V0QWxsUXVpenNPbkhvbGQoKSB7XHJcbiAgICAgICAgaWYodGhpcy5kYXRhYmFzZS5nZXREYXRhYmFzZSgpLmV4ZWN1dGVRdWVyeSgncXVpek9uSG9sZCcpLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgLy8vL2NvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHRoaXMuZGF0YWJhc2UuZ2V0RGF0YWJhc2UoKS5leGVjdXRlUXVlcnkoXCJxdWl6T25Ib2xkXCIpLCBudWxsLCA0KSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRhdGFiYXNlLmdldERhdGFiYXNlKCkuZXhlY3V0ZVF1ZXJ5KCdxdWl6T25Ib2xkJykucXVlc3Rpb25uYWlyZXM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG59Il19