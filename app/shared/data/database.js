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
            this.createViews();
            this.isInstantiated = true;
        }
    }
    Database.prototype.createViews = function () {
        this.storage.createView("data", "1", function (document, emitter) {
            if (document.type == "data") {
                emitter.emit(document._id, document);
            }
        });
        this.storage.createView("user", "1", function (document, emitter) {
            if (document.type == "user") {
                emitter.emit(document._id, document);
            }
        });
        this.storage.createView("materials", "1", function (document, emitter) {
            if (document.type == "materials") {
                emitter.emit(document._id, document);
            }
        });
        this.storage.createView("needs", "1", function (document, emitter) {
            if (document.type == "needs") {
                emitter.emit(document._id, document);
            }
        });
        this.storage.createView("patients", "1", function (document, emitter) {
            if (document.type == "patients") {
                emitter.emit(document._id, document);
            }
        });
        this.storage.createView("ratings", "1", function (document, emitter) {
            if (document.type == "ratings") {
                emitter.emit(document._id, document);
            }
        });
        this.storage.createView("global", "1", function (document, emitter) {
            if (document.type == "global") {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWJhc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkYXRhYmFzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsc0NBQTJDO0FBQzNDLGlFQUFtRDtBQUduRCxpQkFBVSxFQUFFLENBQUE7QUFDWjtJQUdJOzs7TUFHRTtJQUNGO1FBRUksRUFBRSxDQUFBLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztZQUN0QixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksa0NBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUMxQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7WUFFbkIsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7UUFDL0IsQ0FBQztJQUNMLENBQUM7SUFDTyw4QkFBVyxHQUFuQjtRQUNJLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsVUFBQyxRQUFRLEVBQUUsT0FBTztZQUNuRCxFQUFFLENBQUEsQ0FBQyxRQUFRLENBQUMsSUFBSSxJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQ3pCLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxRQUFRLENBQUMsQ0FBQztZQUN6QyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLFVBQUMsUUFBUSxFQUFFLE9BQU87WUFDbkQsRUFBRSxDQUFBLENBQUMsUUFBUSxDQUFDLElBQUksSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUN6QixPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDekMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsV0FBVyxFQUFFLEdBQUcsRUFBRSxVQUFDLFFBQVEsRUFBRSxPQUFPO1lBQ3hELEVBQUUsQ0FBQSxDQUFDLFFBQVEsQ0FBQyxJQUFJLElBQUksV0FBVyxDQUFDLENBQUMsQ0FBQztnQkFDOUIsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQ3pDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUUsVUFBQyxRQUFRLEVBQUUsT0FBTztZQUNwRCxFQUFFLENBQUEsQ0FBQyxRQUFRLENBQUMsSUFBSSxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQzFCLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxRQUFRLENBQUMsQ0FBQztZQUN6QyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxVQUFVLEVBQUUsR0FBRyxFQUFFLFVBQUMsUUFBUSxFQUFFLE9BQU87WUFDdkQsRUFBRSxDQUFBLENBQUMsUUFBUSxDQUFDLElBQUksSUFBSSxVQUFVLENBQUMsQ0FBQyxDQUFDO2dCQUM3QixPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDekMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsU0FBUyxFQUFFLEdBQUcsRUFBRSxVQUFDLFFBQVEsRUFBRSxPQUFPO1lBQ3RELEVBQUUsQ0FBQSxDQUFDLFFBQVEsQ0FBQyxJQUFJLElBQUksU0FBUyxDQUFDLENBQUMsQ0FBQztnQkFDNUIsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQ3pDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUUsVUFBQyxRQUFRLEVBQUUsT0FBTztZQUNyRCxFQUFFLENBQUEsQ0FBQyxRQUFRLENBQUMsSUFBSSxJQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQzNCLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxRQUFRLENBQUMsQ0FBQztZQUN6QyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBQ00sOEJBQVcsR0FBbEI7UUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN4QixDQUFDO0lBa0JMLGVBQUM7QUFBRCxDQUFDLEFBekVELElBeUVDO0FBekVZLDRCQUFRIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IENvdWNoYmFzZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtY291Y2hiYXNlXCI7XHJcbmltcG9ydCB7IENvbm5lY3RvclNlcnZpY2UgfSBmcm9tIFwiLi4vY29ubmVjdG9yL2Nvbm5lY3Rvci5zZXJ2aWNlXCI7XHJcblxyXG5JbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIERhdGFiYXNlIHtcclxuICAgIHByaXZhdGUgc3RvcmFnZTogYW55O1xyXG4gICAgcHJpdmF0ZSBpc0luc3RhbnRpYXRlZDogYm9vbGVhbjtcclxuICAgIC8qXHJcbiAgICBwcml2YXRlIHB1bGw6IGFueTtcclxuICAgIHByaXZhdGUgcHVzaDogYW55O1xyXG4gICAgKi9cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcigvL3ByaXZhdGUgY29ubmVjdG9yU2VydmljZTogQ29ubmVjdG9yU2VydmljZVxyXG4gICAgKSB7XHJcbiAgICAgICAgaWYoIXRoaXMuaXNJbnN0YW50aWF0ZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5zdG9yYWdlID0gbmV3IENvdWNoYmFzZShcImNhcmVnaXZlclwiKTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVWaWV3cygpO1xyXG4gICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMuaXNJbnN0YW50aWF0ZWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHByaXZhdGUgY3JlYXRlVmlld3MoKSB7XHJcbiAgICAgICAgdGhpcy5zdG9yYWdlLmNyZWF0ZVZpZXcoXCJkYXRhXCIsIFwiMVwiLCAoZG9jdW1lbnQsIGVtaXR0ZXIpID0+IHtcclxuICAgICAgICAgICAgaWYoZG9jdW1lbnQudHlwZSA9PSBcImRhdGFcIikge1xyXG4gICAgICAgICAgICAgICAgZW1pdHRlci5lbWl0KGRvY3VtZW50Ll9pZCwgZG9jdW1lbnQpO1xyXG4gICAgICAgICAgICB9IFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuc3RvcmFnZS5jcmVhdGVWaWV3KFwidXNlclwiLCBcIjFcIiwgKGRvY3VtZW50LCBlbWl0dGVyKSA9PiB7XHJcbiAgICAgICAgICAgIGlmKGRvY3VtZW50LnR5cGUgPT0gXCJ1c2VyXCIpIHtcclxuICAgICAgICAgICAgICAgIGVtaXR0ZXIuZW1pdChkb2N1bWVudC5faWQsIGRvY3VtZW50KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuc3RvcmFnZS5jcmVhdGVWaWV3KFwibWF0ZXJpYWxzXCIsIFwiMVwiLCAoZG9jdW1lbnQsIGVtaXR0ZXIpID0+IHtcclxuICAgICAgICAgICAgaWYoZG9jdW1lbnQudHlwZSA9PSBcIm1hdGVyaWFsc1wiKSB7XHJcbiAgICAgICAgICAgICAgICBlbWl0dGVyLmVtaXQoZG9jdW1lbnQuX2lkLCBkb2N1bWVudCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnN0b3JhZ2UuY3JlYXRlVmlldyhcIm5lZWRzXCIsIFwiMVwiLCAoZG9jdW1lbnQsIGVtaXR0ZXIpID0+IHtcclxuICAgICAgICAgICAgaWYoZG9jdW1lbnQudHlwZSA9PSBcIm5lZWRzXCIpIHtcclxuICAgICAgICAgICAgICAgIGVtaXR0ZXIuZW1pdChkb2N1bWVudC5faWQsIGRvY3VtZW50KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuc3RvcmFnZS5jcmVhdGVWaWV3KFwicGF0aWVudHNcIiwgXCIxXCIsIChkb2N1bWVudCwgZW1pdHRlcikgPT4ge1xyXG4gICAgICAgICAgICBpZihkb2N1bWVudC50eXBlID09IFwicGF0aWVudHNcIikge1xyXG4gICAgICAgICAgICAgICAgZW1pdHRlci5lbWl0KGRvY3VtZW50Ll9pZCwgZG9jdW1lbnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5zdG9yYWdlLmNyZWF0ZVZpZXcoXCJyYXRpbmdzXCIsIFwiMVwiLCAoZG9jdW1lbnQsIGVtaXR0ZXIpID0+IHtcclxuICAgICAgICAgICAgaWYoZG9jdW1lbnQudHlwZSA9PSBcInJhdGluZ3NcIikge1xyXG4gICAgICAgICAgICAgICAgZW1pdHRlci5lbWl0KGRvY3VtZW50Ll9pZCwgZG9jdW1lbnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5zdG9yYWdlLmNyZWF0ZVZpZXcoXCJnbG9iYWxcIiwgXCIxXCIsIChkb2N1bWVudCwgZW1pdHRlcikgPT4ge1xyXG4gICAgICAgICAgICBpZihkb2N1bWVudC50eXBlID09IFwiZ2xvYmFsXCIpIHtcclxuICAgICAgICAgICAgICAgIGVtaXR0ZXIuZW1pdChkb2N1bWVudC5faWQsIGRvY3VtZW50KTtcclxuICAgICAgICAgICAgfSBcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXREYXRhYmFzZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zdG9yYWdlO1xyXG4gICAgfVxyXG4gICAgLypcclxuICAgICAgICBwdWJsaWMgc3RhcnRTeW5jKGNvbnRpbnVvdXM6IGJvb2xlYW4pIHtcclxuICAgICAgICB0aGlzLnB1c2ggPSB0aGlzLnN0b3JhZ2UuY3JlYXRlUHVzaFJlcGxpY2F0aW9uKFwiaHR0cDovLzE5Mi4xNjguNTcuMTo0OTg0L3Rlc3QtZGF0YWJhc2VcIik7XHJcbiAgICAgICAgdGhpcy5wdWxsID0gdGhpcy5zdG9yYWdlLmNyZWF0ZVB1bGxSZXBsaWNhdGlvbihcImh0dHA6Ly8xOTIuMTY4LjU3LjE6NDk4NC90ZXN0LWRhdGFiYXNlXCIpO1xyXG5cclxuICAgICAgICB0aGlzLnB1c2guc2V0Q29udGludW91cyhjb250aW51b3VzKTtcclxuICAgICAgICB0aGlzLnB1bGwuc2V0Q29udGludW91cyhjb250aW51b3VzKTtcclxuXHJcbiAgICAgICAgdGhpcy5wdXNoLnN0YXJ0KCk7XHJcbiAgICAgICAgdGhpcy5wdWxsLnN0YXJ0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0b3BTeW5jKCkge1xyXG4gICAgICAgIHRoaXMucHVzaC5zdG9wKCk7XHJcbiAgICAgICAgdGhpcy5wdWxsLnN0b3AoKTtcclxuICAgIH1cclxuICAgICovXHJcbn1cclxuIl19