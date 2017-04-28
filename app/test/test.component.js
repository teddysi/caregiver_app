"use strict";
var core_1 = require("@angular/core");
var need_service_1 = require("../need/need.service");
//VideoPlayer
var element_registry_1 = require("nativescript-angular/element-registry");
element_registry_1.registerElement("VideoPlayer", function () { return require("nativescript-videoplayer").Video; });
//FileReader(para ficheiros de texto)
var fs = require("file-system");
//PDF
require("nativescript-pdf-view");
var TestComponent = (function () {
    /*
    local() {
        this.myImageRef.nativeElement.src = "~/materials/image/2.png";
        this.myVideoRef.nativeElement.src = "~/materials/video/Copy.mp4";
    }
    
    // custom func with params
    submit(source) {
        this.myImageRef.nativeElement.src = source;
    }
    */
    function TestComponent(needService) {
        this.needService = needService;
    }
    // similar to getViewById
    /*
    @ViewChild("myImage") myImageRef: ElementRef;
    @ViewChild("myVideo") myVideoRef: ElementRef;
    @ViewChild("myTextContent") myTextRef: ElementRef;
    @ViewChild("myPdf") myPdfRef: ElementRef;
    */
    // angular2 method triggers after view init
    TestComponent.prototype.ngAfterViewInit = function () {
        //this.myImageRef.nativeElement.src = "res://logo";
        //this.myPdfRef.nativeElement.src="~/materials/pdf/exemplo.pdf";
        /**
         * Escrever e/ou ler texto para a pasta default files (antes da app)
         */
        var documents = fs.knownFolders.documents();
        var path = fs.path.join(documents.path, "test.txt");
        var file = fs.File.fromPath(path);
        // Writing text to the file.
        file.writeText("Something")
            .then(function () {
            console.log("Escreveu");
        }, function (error) {
            console.log("Falhou");
        });
        file.readText()
            .then(function (content) {
            console.log(content);
        }, function (error) {
            console.log('erro');
        });
        /**
         * Escrever e/ou ler ficheiro binário para .... falta testar
         */
        var fileName = "res://logo";
        var error;
        var sourceFile = fs.File.fromPath(__dirname + "/" + fileName);
        var destinationFile = fs.knownFolders.documents().getFile(fileName);
        var source = sourceFile.readSync(function (e) { error = e; });
        destinationFile.writeSync(source, function (e) { error = e; });
        /**
         * Abrir todo o conteúdo da pasta materials
         */
        var documents = fs.knownFolders.documents();
        var path = fs.path.join(documents.path, "app/materials");
        var folder = fs.Folder.fromPath(path);
        folder.getEntities()
            .then(function (entities) {
            // entities is array with the document's files and folders.
            entities.forEach(function (entity) {
                console.log(JSON.stringify(entity, null, 4));
            });
            console.log(JSON.stringify(documents, null, 4));
        }, function (error) {
        });
    };
    TestComponent.prototype.ngOnInit = function () {
    };
    return TestComponent;
}());
TestComponent = __decorate([
    core_1.Component({
        selector: "ns-items",
        providers: [need_service_1.NeedService],
        moduleId: module.id,
        templateUrl: "./test.component.html",
    }),
    __metadata("design:paramtypes", [need_service_1.NeedService])
], TestComponent);
exports.TestComponent = TestComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0ZXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsc0NBQXFGO0FBTXJGLHFEQUFtRDtBQUVuRCxhQUFhO0FBQ2IsMEVBQXNFO0FBQ3RFLGtDQUFlLENBQUMsYUFBYSxFQUFFLGNBQU0sT0FBQSxPQUFPLENBQUMsMEJBQTBCLENBQUMsQ0FBQyxLQUFLLEVBQXpDLENBQXlDLENBQUMsQ0FBQztBQUVoRixxQ0FBcUM7QUFDckMsZ0NBQWtDO0FBRWxDLEtBQUs7QUFDTCxpQ0FBK0I7QUFTL0IsSUFBYSxhQUFhO0lBcUV0Qjs7Ozs7Ozs7OztNQVVFO0lBQ0YsdUJBQW9CLFdBQXdCO1FBQXhCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO0lBRTVDLENBQUM7SUE3RUQseUJBQXlCO0lBQ3pCOzs7OztNQUtFO0lBQ0YsMkNBQTJDO0lBQzNDLHVDQUFlLEdBQWY7UUFDSSxtREFBbUQ7UUFDbkQsZ0VBQWdFO1FBRWhFOztXQUVHO1FBQ0gsSUFBSSxTQUFTLEdBQUcsRUFBRSxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUM1QyxJQUFJLElBQUksR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQ3BELElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRWxDLDRCQUE0QjtRQUM1QixJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQzthQUN0QixJQUFJLENBQUM7WUFDRixPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzVCLENBQUMsRUFBRSxVQUFVLEtBQUs7WUFDZCxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzFCLENBQUMsQ0FBQyxDQUFDO1FBRVAsSUFBSSxDQUFDLFFBQVEsRUFBRTthQUNWLElBQUksQ0FBQyxVQUFVLE9BQU87WUFDbkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN6QixDQUFDLEVBQUUsVUFBVSxLQUFLO1lBQ2QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN4QixDQUFDLENBQUMsQ0FBQztRQUVQOztXQUVHO1FBQ0gsSUFBSSxRQUFRLEdBQUcsWUFBWSxDQUFDO1FBQzVCLElBQUksS0FBSyxDQUFDO1FBRVYsSUFBSSxVQUFVLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxHQUFHLEdBQUcsR0FBRyxRQUFRLENBQUMsQ0FBQztRQUM5RCxJQUFJLGVBQWUsR0FBRyxFQUFFLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUVwRSxJQUFJLE1BQU0sR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDLFVBQUEsQ0FBQyxJQUFLLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVyRCxlQUFlLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxVQUFBLENBQUMsSUFBSyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFdEQ7O1dBRUc7UUFDSCxJQUFJLFNBQVMsR0FBRyxFQUFFLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQzVDLElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsZUFBZSxDQUFDLENBQUM7UUFDekQsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFdEMsTUFBTSxDQUFDLFdBQVcsRUFBRTthQUNuQixJQUFJLENBQUMsVUFBVSxRQUFRO1lBQ3BCLDJEQUEyRDtZQUMzRCxRQUFRLENBQUMsT0FBTyxDQUFDLFVBQVUsTUFBTTtnQkFDN0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNqRCxDQUFDLENBQUMsQ0FBQztZQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDcEQsQ0FBQyxFQUFFLFVBQVUsS0FBSztRQUNsQixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFlRCxnQ0FBUSxHQUFSO0lBRUEsQ0FBQztJQUNMLG9CQUFDO0FBQUQsQ0FBQyxBQXRGRCxJQXNGQztBQXRGWSxhQUFhO0lBUHpCLGdCQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsVUFBVTtRQUNwQixTQUFTLEVBQUUsQ0FBQywwQkFBVyxDQUFDO1FBQ3hCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtRQUNuQixXQUFXLEVBQUUsdUJBQXVCO0tBQ3ZDLENBQUM7cUNBa0ZtQywwQkFBVztHQWhGbkMsYUFBYSxDQXNGekI7QUF0Rlksc0NBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIFZpZXdDaGlsZCwgRWxlbWVudFJlZiwgSW5qZWN0YWJsZSwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IGFwcCA9IHJlcXVpcmUoXCJhcHBsaWNhdGlvblwiKTtcclxuaW1wb3J0IHBsYXRmb3JtID0gcmVxdWlyZShcInBsYXRmb3JtXCIpO1xyXG5pbXBvcnQgSW1hZ2VNb2R1bGUgPSByZXF1aXJlKFwidWkvaW1hZ2VcIik7XHJcblxyXG5pbXBvcnQgeyBQYXRpZW50IH0gZnJvbSBcIi4uL3BhdGllbnQvcGF0aWVudFwiO1xyXG5pbXBvcnQgeyBOZWVkU2VydmljZSB9IGZyb20gXCIuLi9uZWVkL25lZWQuc2VydmljZVwiO1xyXG5cclxuLy9WaWRlb1BsYXllclxyXG5pbXBvcnQge3JlZ2lzdGVyRWxlbWVudH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2VsZW1lbnQtcmVnaXN0cnlcIjtcclxucmVnaXN0ZXJFbGVtZW50KFwiVmlkZW9QbGF5ZXJcIiwgKCkgPT4gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC12aWRlb3BsYXllclwiKS5WaWRlbyk7XHJcblxyXG4vL0ZpbGVSZWFkZXIocGFyYSBmaWNoZWlyb3MgZGUgdGV4dG8pXHJcbmltcG9ydCAqIGFzIGZzIGZyb20gXCJmaWxlLXN5c3RlbVwiO1xyXG5cclxuLy9QREZcclxuaW1wb3J0ICduYXRpdmVzY3JpcHQtcGRmLXZpZXcnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogXCJucy1pdGVtc1wiLFxyXG4gICAgcHJvdmlkZXJzOiBbTmVlZFNlcnZpY2VdLFxyXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHRlbXBsYXRlVXJsOiBcIi4vdGVzdC5jb21wb25lbnQuaHRtbFwiLFxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIFRlc3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gICAgcGF0aWVudDogUGF0aWVudDtcclxuICAgIHdyaXR0ZW46IGJvb2xlYW47XHJcbiAgICBwdWJsaWMgb25ld2F5OiBzdHJpbmc7XHJcbiAgICBcclxuICAgIC8vIHNpbWlsYXIgdG8gZ2V0Vmlld0J5SWRcclxuICAgIC8qXHJcbiAgICBAVmlld0NoaWxkKFwibXlJbWFnZVwiKSBteUltYWdlUmVmOiBFbGVtZW50UmVmO1xyXG4gICAgQFZpZXdDaGlsZChcIm15VmlkZW9cIikgbXlWaWRlb1JlZjogRWxlbWVudFJlZjtcclxuICAgIEBWaWV3Q2hpbGQoXCJteVRleHRDb250ZW50XCIpIG15VGV4dFJlZjogRWxlbWVudFJlZjtcclxuICAgIEBWaWV3Q2hpbGQoXCJteVBkZlwiKSBteVBkZlJlZjogRWxlbWVudFJlZjtcclxuICAgICovXHJcbiAgICAvLyBhbmd1bGFyMiBtZXRob2QgdHJpZ2dlcnMgYWZ0ZXIgdmlldyBpbml0XHJcbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XHJcbiAgICAgICAgLy90aGlzLm15SW1hZ2VSZWYubmF0aXZlRWxlbWVudC5zcmMgPSBcInJlczovL2xvZ29cIjtcclxuICAgICAgICAvL3RoaXMubXlQZGZSZWYubmF0aXZlRWxlbWVudC5zcmM9XCJ+L21hdGVyaWFscy9wZGYvZXhlbXBsby5wZGZcIjtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRXNjcmV2ZXIgZS9vdSBsZXIgdGV4dG8gcGFyYSBhIHBhc3RhIGRlZmF1bHQgZmlsZXMgKGFudGVzIGRhIGFwcClcclxuICAgICAgICAgKi9cclxuICAgICAgICB2YXIgZG9jdW1lbnRzID0gZnMua25vd25Gb2xkZXJzLmRvY3VtZW50cygpO1xyXG4gICAgICAgIHZhciBwYXRoID0gZnMucGF0aC5qb2luKGRvY3VtZW50cy5wYXRoLCBcInRlc3QudHh0XCIpO1xyXG4gICAgICAgIHZhciBmaWxlID0gZnMuRmlsZS5mcm9tUGF0aChwYXRoKTtcclxuXHJcbiAgICAgICAgLy8gV3JpdGluZyB0ZXh0IHRvIHRoZSBmaWxlLlxyXG4gICAgICAgIGZpbGUud3JpdGVUZXh0KFwiU29tZXRoaW5nXCIpXHJcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXNjcmV2ZXVcIik7XHJcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJGYWxob3VcIik7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICBmaWxlLnJlYWRUZXh0KClcclxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKGNvbnRlbnQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGNvbnRlbnQpO1xyXG4gICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdlcnJvJyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBFc2NyZXZlciBlL291IGxlciBmaWNoZWlybyBiaW7DoXJpbyBwYXJhIC4uLi4gZmFsdGEgdGVzdGFyXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdmFyIGZpbGVOYW1lID0gXCJyZXM6Ly9sb2dvXCI7XHJcbiAgICAgICAgdmFyIGVycm9yO1xyXG5cclxuICAgICAgICB2YXIgc291cmNlRmlsZSA9IGZzLkZpbGUuZnJvbVBhdGgoX19kaXJuYW1lICsgXCIvXCIgKyBmaWxlTmFtZSk7XHJcbiAgICAgICAgdmFyIGRlc3RpbmF0aW9uRmlsZSA9IGZzLmtub3duRm9sZGVycy5kb2N1bWVudHMoKS5nZXRGaWxlKGZpbGVOYW1lKTtcclxuXHJcbiAgICAgICAgdmFyIHNvdXJjZSA9IHNvdXJjZUZpbGUucmVhZFN5bmMoZT0+IHsgZXJyb3IgPSBlOyB9KTtcclxuXHJcbiAgICAgICAgZGVzdGluYXRpb25GaWxlLndyaXRlU3luYyhzb3VyY2UsIGU9PiB7IGVycm9yID0gZTsgfSk7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEFicmlyIHRvZG8gbyBjb250ZcO6ZG8gZGEgcGFzdGEgbWF0ZXJpYWxzXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdmFyIGRvY3VtZW50cyA9IGZzLmtub3duRm9sZGVycy5kb2N1bWVudHMoKTtcclxuICAgICAgICB2YXIgcGF0aCA9IGZzLnBhdGguam9pbihkb2N1bWVudHMucGF0aCwgXCJhcHAvbWF0ZXJpYWxzXCIpO1xyXG4gICAgICAgIHZhciBmb2xkZXIgPSBmcy5Gb2xkZXIuZnJvbVBhdGgocGF0aCk7XHJcblxyXG4gICAgICAgIGZvbGRlci5nZXRFbnRpdGllcygpXHJcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKGVudGl0aWVzKSB7XHJcbiAgICAgICAgICAgIC8vIGVudGl0aWVzIGlzIGFycmF5IHdpdGggdGhlIGRvY3VtZW50J3MgZmlsZXMgYW5kIGZvbGRlcnMuXHJcbiAgICAgICAgICAgIGVudGl0aWVzLmZvckVhY2goZnVuY3Rpb24gKGVudGl0eSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoZW50aXR5LCBudWxsLCA0KSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShkb2N1bWVudHMsIG51bGwsIDQpKTtcclxuICAgICAgICB9LCBmdW5jdGlvbiAoZXJyb3IpIHtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIC8qXHJcbiAgICBsb2NhbCgpIHtcclxuICAgICAgICB0aGlzLm15SW1hZ2VSZWYubmF0aXZlRWxlbWVudC5zcmMgPSBcIn4vbWF0ZXJpYWxzL2ltYWdlLzIucG5nXCI7XHJcbiAgICAgICAgdGhpcy5teVZpZGVvUmVmLm5hdGl2ZUVsZW1lbnQuc3JjID0gXCJ+L21hdGVyaWFscy92aWRlby9Db3B5Lm1wNFwiO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvLyBjdXN0b20gZnVuYyB3aXRoIHBhcmFtc1xyXG4gICAgc3VibWl0KHNvdXJjZSkge1xyXG4gICAgICAgIHRoaXMubXlJbWFnZVJlZi5uYXRpdmVFbGVtZW50LnNyYyA9IHNvdXJjZTtcclxuICAgIH1cclxuICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIG5lZWRTZXJ2aWNlOiBOZWVkU2VydmljZSkge1xyXG5cclxuICAgIH1cclxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG59Il19