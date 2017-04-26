"use strict";
var core_1 = require("@angular/core");
var fs = require("file-system");
var need_service_1 = require("../need/need.service");
//VideoPlayer
var element_registry_1 = require("nativescript-angular/element-registry");
element_registry_1.registerElement("VideoPlayer", function () { return require("nativescript-videoplayer").Video; });
//FileReader(para ficheiros de texto)
var documents = fs.knownFolders.documents();
var myFile = documents.getFile("~/materials/text/Latin-Lipsum.txt");
var textViewModule = require("ui/text-view");
//PDF
require("nativescript-pdf-view");
var TestComponent = (function () {
    function TestComponent(needService) {
        this.needService = needService;
        this.textView = new textViewModule.TextView();
    }
    // angular2 method triggers after view init
    TestComponent.prototype.ngAfterViewInit = function () {
        this.myImageRef.nativeElement.src = "res://logo";
        //this.readText();
        //this.myPdfRef.nativeElement.src="~/materials/pdf/exemplo.pdf";
    };
    TestComponent.prototype.local = function () {
        this.myImageRef.nativeElement.src = "~/materials/image/2.png";
        this.myVideoRef.nativeElement.src = "~/materials/video/Copy.mp4";
    };
    TestComponent.prototype.readText = function () {
        myFile.readText()
            .then(function (content) {
            this.myTextRef.nativeElement.text = "ole";
        }, function (error) {
            // Failed to read from the file.
        });
    };
    // custom func with params
    TestComponent.prototype.submit = function (source) {
        this.myImageRef.nativeElement.src = source;
    };
    TestComponent.prototype.ngOnInit = function () {
    };
    return TestComponent;
}());
__decorate([
    core_1.ViewChild("myImage"),
    __metadata("design:type", core_1.ElementRef)
], TestComponent.prototype, "myImageRef", void 0);
__decorate([
    core_1.ViewChild("myVideo"),
    __metadata("design:type", core_1.ElementRef)
], TestComponent.prototype, "myVideoRef", void 0);
__decorate([
    core_1.ViewChild("myTextContent"),
    __metadata("design:type", core_1.ElementRef)
], TestComponent.prototype, "myTextRef", void 0);
__decorate([
    core_1.ViewChild("myPdf"),
    __metadata("design:type", core_1.ElementRef)
], TestComponent.prototype, "myPdfRef", void 0);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0ZXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsc0NBQXFGO0FBS3JGLGdDQUFrQztBQUVsQyxxREFBbUQ7QUFFbkQsYUFBYTtBQUNiLDBFQUFzRTtBQUN0RSxrQ0FBZSxDQUFDLGFBQWEsRUFBRSxjQUFNLE9BQUEsT0FBTyxDQUFDLDBCQUEwQixDQUFDLENBQUMsS0FBSyxFQUF6QyxDQUF5QyxDQUFDLENBQUM7QUFFaEYscUNBQXFDO0FBQ3JDLElBQUksU0FBUyxHQUFHLEVBQUUsQ0FBQyxZQUFZLENBQUMsU0FBUyxFQUFFLENBQUM7QUFDNUMsSUFBSSxNQUFNLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDO0FBQ3BFLDZDQUFnRDtBQUVoRCxLQUFLO0FBQ0wsaUNBQStCO0FBUy9CLElBQWEsYUFBYTtJQXNDdEIsdUJBQW9CLFdBQXdCO1FBQXhCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBbkM1QyxhQUFRLEdBQUcsSUFBSSxjQUFjLENBQUMsUUFBUSxFQUFFLENBQUM7SUFxQ3pDLENBQUM7SUE1QkQsMkNBQTJDO0lBQzNDLHVDQUFlLEdBQWY7UUFDSSxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxHQUFHLEdBQUcsWUFBWSxDQUFDO1FBQ2pELGtCQUFrQjtRQUNsQixnRUFBZ0U7SUFDcEUsQ0FBQztJQUVELDZCQUFLLEdBQUw7UUFDSSxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxHQUFHLEdBQUcseUJBQXlCLENBQUM7UUFDOUQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsR0FBRyxHQUFHLDRCQUE0QixDQUFDO0lBQ3JFLENBQUM7SUFFRCxnQ0FBUSxHQUFSO1FBQ0ksTUFBTSxDQUFDLFFBQVEsRUFBRTthQUNaLElBQUksQ0FBQyxVQUFVLE9BQU87WUFDbkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztRQUM5QyxDQUFDLEVBQUUsVUFBVSxLQUFLO1lBQ2QsZ0NBQWdDO1FBQ3BDLENBQUMsQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQUVELDBCQUEwQjtJQUMxQiw4QkFBTSxHQUFOLFVBQU8sTUFBTTtRQUNULElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUM7SUFDL0MsQ0FBQztJQUtELGdDQUFRLEdBQVI7SUFFQSxDQUFDO0lBQ0wsb0JBQUM7QUFBRCxDQUFDLEFBNUNELElBNENDO0FBckN5QjtJQUFyQixnQkFBUyxDQUFDLFNBQVMsQ0FBQzs4QkFBYSxpQkFBVTtpREFBQztBQUN2QjtJQUFyQixnQkFBUyxDQUFDLFNBQVMsQ0FBQzs4QkFBYSxpQkFBVTtpREFBQztBQUNqQjtJQUEzQixnQkFBUyxDQUFDLGVBQWUsQ0FBQzs4QkFBWSxpQkFBVTtnREFBQztBQUM5QjtJQUFuQixnQkFBUyxDQUFDLE9BQU8sQ0FBQzs4QkFBVyxpQkFBVTsrQ0FBQztBQVZoQyxhQUFhO0lBUHpCLGdCQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsVUFBVTtRQUNwQixTQUFTLEVBQUUsQ0FBQywwQkFBVyxDQUFDO1FBQ3hCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtRQUNuQixXQUFXLEVBQUUsdUJBQXVCO0tBQ3ZDLENBQUM7cUNBd0NtQywwQkFBVztHQXRDbkMsYUFBYSxDQTRDekI7QUE1Q1ksc0NBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIFZpZXdDaGlsZCwgRWxlbWVudFJlZiwgSW5qZWN0YWJsZSwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IGFwcCA9IHJlcXVpcmUoXCJhcHBsaWNhdGlvblwiKTtcclxuaW1wb3J0IHBsYXRmb3JtID0gcmVxdWlyZShcInBsYXRmb3JtXCIpO1xyXG5pbXBvcnQgSW1hZ2VNb2R1bGUgPSByZXF1aXJlKFwidWkvaW1hZ2VcIik7XHJcblxyXG5pbXBvcnQgKiBhcyBmcyBmcm9tIFwiZmlsZS1zeXN0ZW1cIjtcclxuaW1wb3J0IHsgUGF0aWVudCB9IGZyb20gXCIuLi9wYXRpZW50L3BhdGllbnRcIjtcclxuaW1wb3J0IHsgTmVlZFNlcnZpY2UgfSBmcm9tIFwiLi4vbmVlZC9uZWVkLnNlcnZpY2VcIjtcclxuXHJcbi8vVmlkZW9QbGF5ZXJcclxuaW1wb3J0IHtyZWdpc3RlckVsZW1lbnR9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9lbGVtZW50LXJlZ2lzdHJ5XCI7XHJcbnJlZ2lzdGVyRWxlbWVudChcIlZpZGVvUGxheWVyXCIsICgpID0+IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtdmlkZW9wbGF5ZXJcIikuVmlkZW8pO1xyXG5cclxuLy9GaWxlUmVhZGVyKHBhcmEgZmljaGVpcm9zIGRlIHRleHRvKVxyXG52YXIgZG9jdW1lbnRzID0gZnMua25vd25Gb2xkZXJzLmRvY3VtZW50cygpO1xyXG52YXIgbXlGaWxlID0gZG9jdW1lbnRzLmdldEZpbGUoXCJ+L21hdGVyaWFscy90ZXh0L0xhdGluLUxpcHN1bS50eHRcIik7XHJcbmltcG9ydCB0ZXh0Vmlld01vZHVsZSA9IHJlcXVpcmUoXCJ1aS90ZXh0LXZpZXdcIik7XHJcblxyXG4vL1BERlxyXG5pbXBvcnQgJ25hdGl2ZXNjcmlwdC1wZGYtdmlldyc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiBcIm5zLWl0ZW1zXCIsXHJcbiAgICBwcm92aWRlcnM6IFtOZWVkU2VydmljZV0sXHJcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwiLi90ZXN0LmNvbXBvbmVudC5odG1sXCIsXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgVGVzdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgICBwYXRpZW50OiBQYXRpZW50O1xyXG4gICAgd3JpdHRlbjogYm9vbGVhbjtcclxuICAgIHRleHRWaWV3ID0gbmV3IHRleHRWaWV3TW9kdWxlLlRleHRWaWV3KCk7XHJcbiAgIFxyXG4gICAgXHJcbiAgICAvLyBzaW1pbGFyIHRvIGdldFZpZXdCeUlkXHJcbiAgICBAVmlld0NoaWxkKFwibXlJbWFnZVwiKSBteUltYWdlUmVmOiBFbGVtZW50UmVmO1xyXG4gICAgQFZpZXdDaGlsZChcIm15VmlkZW9cIikgbXlWaWRlb1JlZjogRWxlbWVudFJlZjtcclxuICAgIEBWaWV3Q2hpbGQoXCJteVRleHRDb250ZW50XCIpIG15VGV4dFJlZjogRWxlbWVudFJlZjtcclxuICAgIEBWaWV3Q2hpbGQoXCJteVBkZlwiKSBteVBkZlJlZjogRWxlbWVudFJlZjtcclxuXHJcbiAgICAvLyBhbmd1bGFyMiBtZXRob2QgdHJpZ2dlcnMgYWZ0ZXIgdmlldyBpbml0XHJcbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XHJcbiAgICAgICAgdGhpcy5teUltYWdlUmVmLm5hdGl2ZUVsZW1lbnQuc3JjID0gXCJyZXM6Ly9sb2dvXCI7XHJcbiAgICAgICAgLy90aGlzLnJlYWRUZXh0KCk7XHJcbiAgICAgICAgLy90aGlzLm15UGRmUmVmLm5hdGl2ZUVsZW1lbnQuc3JjPVwifi9tYXRlcmlhbHMvcGRmL2V4ZW1wbG8ucGRmXCI7XHJcbiAgICB9XHJcblxyXG4gICAgbG9jYWwoKSB7XHJcbiAgICAgICAgdGhpcy5teUltYWdlUmVmLm5hdGl2ZUVsZW1lbnQuc3JjID0gXCJ+L21hdGVyaWFscy9pbWFnZS8yLnBuZ1wiO1xyXG4gICAgICAgIHRoaXMubXlWaWRlb1JlZi5uYXRpdmVFbGVtZW50LnNyYyA9IFwifi9tYXRlcmlhbHMvdmlkZW8vQ29weS5tcDRcIjtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcmVhZFRleHQoKSB7XHJcbiAgICAgICAgbXlGaWxlLnJlYWRUZXh0KClcclxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKGNvbnRlbnQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubXlUZXh0UmVmLm5hdGl2ZUVsZW1lbnQudGV4dCA9IFwib2xlXCI7XHJcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgLy8gRmFpbGVkIHRvIHJlYWQgZnJvbSB0aGUgZmlsZS5cclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gY3VzdG9tIGZ1bmMgd2l0aCBwYXJhbXNcclxuICAgIHN1Ym1pdChzb3VyY2UpIHtcclxuICAgICAgICB0aGlzLm15SW1hZ2VSZWYubmF0aXZlRWxlbWVudC5zcmMgPSBzb3VyY2U7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgbmVlZFNlcnZpY2U6IE5lZWRTZXJ2aWNlKSB7IFxyXG4gICAgICAgIFxyXG4gICAgfVxyXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbn0iXX0=