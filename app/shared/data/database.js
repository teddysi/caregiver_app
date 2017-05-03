"use strict";
var core_1 = require("@angular/core");
var nativescript_couchbase_1 = require("nativescript-couchbase");
core_1.Injectable();
var Database = (function () {
    /*
    private pull: any;
    private push: any;
    */
    function Database() {
        if (!this.isInstantiated) {
            this.storage = new nativescript_couchbase_1.Couchbase("caregiver");
            this.createDBViews();
            this.isInstantiated = true;
        }
    }
    Database.prototype.createDBViews = function () {
        //para ver para ver na bd os dados dos materiais retirados do servidor
        this.storage.createView("data", "1", function (document, emitter) {
            if (document.type == "data") {
                emitter.emit(document._id, document);
            }
        });
        //para ver para ver na bd caregiver os dados de todos os utilizadores da app
        this.storage.createView("user", "2", function (document, emitter) {
            if (document.type == "user") {
                emitter.emit(document._id, document);
            }
        });
        //para ver na bd caregiver os dados de acesso ao servidor. Ainda n utilizado
        this.storage.createView("config", "3", function (document, emitter) {
            if (document.type == "config") {
                emitter.emit(document._id, document);
            }
        });
    };
    Database.prototype.getDatabase = function () {
        return this.storage;
    };
    return Database;
}());
exports.Database = Database;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWJhc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkYXRhYmFzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsc0NBQTJDO0FBQzNDLGlFQUFtRDtBQUVuRCxpQkFBVSxFQUFFLENBQUE7QUFDWjtJQUdJOzs7TUFHRTtJQUNGO1FBQ0ksRUFBRSxDQUFBLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztZQUV0QixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksa0NBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUMxQyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7WUFDckIsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7UUFDL0IsQ0FBQztJQUNMLENBQUM7SUFFTSxnQ0FBYSxHQUFwQjtRQUNJLHNFQUFzRTtRQUN0RSxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLFVBQUMsUUFBUSxFQUFFLE9BQU87WUFDbkQsRUFBRSxDQUFBLENBQUMsUUFBUSxDQUFDLElBQUksSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUN6QixPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDekMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ0gsNEVBQTRFO1FBQzVFLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsVUFBQyxRQUFRLEVBQUUsT0FBTztZQUNuRCxFQUFFLENBQUEsQ0FBQyxRQUFRLENBQUMsSUFBSSxJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQ3pCLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxRQUFRLENBQUMsQ0FBQztZQUN6QyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDSCw0RUFBNEU7UUFDNUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxVQUFDLFFBQVEsRUFBRSxPQUFPO1lBQ3JELEVBQUUsQ0FBQSxDQUFDLFFBQVEsQ0FBQyxJQUFJLElBQUksUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDM0IsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQ3pDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFDTSw4QkFBVyxHQUFsQjtRQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3hCLENBQUM7SUFrQkwsZUFBQztBQUFELENBQUMsQUF4REQsSUF3REM7QUF4RFksNEJBQVEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgQ291Y2hiYXNlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1jb3VjaGJhc2VcIjtcclxuXHJcbkluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgRGF0YWJhc2Uge1xyXG4gICAgcHJpdmF0ZSBzdG9yYWdlOiBhbnk7XHJcbiAgICBwcml2YXRlIGlzSW5zdGFudGlhdGVkOiBib29sZWFuO1xyXG4gICAgLypcclxuICAgIHByaXZhdGUgcHVsbDogYW55O1xyXG4gICAgcHJpdmF0ZSBwdXNoOiBhbnk7XHJcbiAgICAqLyBcclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBpZighdGhpcy5pc0luc3RhbnRpYXRlZCkge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5zdG9yYWdlID0gbmV3IENvdWNoYmFzZShcImNhcmVnaXZlclwiKTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVEQlZpZXdzKCk7ICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLmlzSW5zdGFudGlhdGVkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNyZWF0ZURCVmlld3MoKSB7XHJcbiAgICAgICAgLy9wYXJhIHZlciBwYXJhIHZlciBuYSBiZCBvcyBkYWRvcyBkb3MgbWF0ZXJpYWlzIHJldGlyYWRvcyBkbyBzZXJ2aWRvclxyXG4gICAgICAgIHRoaXMuc3RvcmFnZS5jcmVhdGVWaWV3KFwiZGF0YVwiLCBcIjFcIiwgKGRvY3VtZW50LCBlbWl0dGVyKSA9PiB7XHJcbiAgICAgICAgICAgIGlmKGRvY3VtZW50LnR5cGUgPT0gXCJkYXRhXCIpIHtcclxuICAgICAgICAgICAgICAgIGVtaXR0ZXIuZW1pdChkb2N1bWVudC5faWQsIGRvY3VtZW50KTtcclxuICAgICAgICAgICAgfSBcclxuICAgICAgICB9KTtcclxuICAgICAgICAvL3BhcmEgdmVyIHBhcmEgdmVyIG5hIGJkIGNhcmVnaXZlciBvcyBkYWRvcyBkZSB0b2RvcyBvcyB1dGlsaXphZG9yZXMgZGEgYXBwXHJcbiAgICAgICAgdGhpcy5zdG9yYWdlLmNyZWF0ZVZpZXcoXCJ1c2VyXCIsIFwiMlwiLCAoZG9jdW1lbnQsIGVtaXR0ZXIpID0+IHtcclxuICAgICAgICAgICAgaWYoZG9jdW1lbnQudHlwZSA9PSBcInVzZXJcIikge1xyXG4gICAgICAgICAgICAgICAgZW1pdHRlci5lbWl0KGRvY3VtZW50Ll9pZCwgZG9jdW1lbnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy9wYXJhIHZlciBuYSBiZCBjYXJlZ2l2ZXIgb3MgZGFkb3MgZGUgYWNlc3NvIGFvIHNlcnZpZG9yLiBBaW5kYSBuIHV0aWxpemFkb1xyXG4gICAgICAgIHRoaXMuc3RvcmFnZS5jcmVhdGVWaWV3KFwiY29uZmlnXCIsIFwiM1wiLCAoZG9jdW1lbnQsIGVtaXR0ZXIpID0+IHtcclxuICAgICAgICAgICAgaWYoZG9jdW1lbnQudHlwZSA9PSBcImNvbmZpZ1wiKSB7XHJcbiAgICAgICAgICAgICAgICBlbWl0dGVyLmVtaXQoZG9jdW1lbnQuX2lkLCBkb2N1bWVudCk7XHJcbiAgICAgICAgICAgIH0gXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0RGF0YWJhc2UoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RvcmFnZTtcclxuICAgIH1cclxuICAgIC8qXHJcbiAgICAgICAgcHVibGljIHN0YXJ0U3luYyhjb250aW51b3VzOiBib29sZWFuKSB7XHJcbiAgICAgICAgdGhpcy5wdXNoID0gdGhpcy5zdG9yYWdlLmNyZWF0ZVB1c2hSZXBsaWNhdGlvbihcImh0dHA6Ly8xOTIuMTY4LjU3LjE6NDk4NC90ZXN0LWRhdGFiYXNlXCIpO1xyXG4gICAgICAgIHRoaXMucHVsbCA9IHRoaXMuc3RvcmFnZS5jcmVhdGVQdWxsUmVwbGljYXRpb24oXCJodHRwOi8vMTkyLjE2OC41Ny4xOjQ5ODQvdGVzdC1kYXRhYmFzZVwiKTtcclxuXHJcbiAgICAgICAgdGhpcy5wdXNoLnNldENvbnRpbnVvdXMoY29udGludW91cyk7XHJcbiAgICAgICAgdGhpcy5wdWxsLnNldENvbnRpbnVvdXMoY29udGludW91cyk7XHJcblxyXG4gICAgICAgIHRoaXMucHVzaC5zdGFydCgpO1xyXG4gICAgICAgIHRoaXMucHVsbC5zdGFydCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdG9wU3luYygpIHtcclxuICAgICAgICB0aGlzLnB1c2guc3RvcCgpO1xyXG4gICAgICAgIHRoaXMucHVsbC5zdG9wKCk7XHJcbiAgICB9XHJcbiAgICAqL1xyXG59XHJcbiJdfQ==