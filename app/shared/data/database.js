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
    };
    Database.prototype.getDatabase = function () {
        return this.storage;
    };
    return Database;
}());
exports.Database = Database;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWJhc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkYXRhYmFzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsc0NBQTJDO0FBQzNDLGlFQUFtRDtBQUduRCxpQkFBVSxFQUFFLENBQUE7QUFDWjtJQUdJOzs7TUFHRTtJQUNGO1FBRUksRUFBRSxDQUFBLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztZQUN0QixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksa0NBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUMxQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7WUFFbkIsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7UUFDL0IsQ0FBQztJQUNMLENBQUM7SUFDTyw4QkFBVyxHQUFuQjtRQUNJLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsVUFBQyxRQUFRLEVBQUUsT0FBTztZQUNuRCxFQUFFLENBQUEsQ0FBQyxRQUFRLENBQUMsSUFBSSxJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQ3pCLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxRQUFRLENBQUMsQ0FBQztZQUN6QyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLFVBQUMsUUFBUSxFQUFFLE9BQU87WUFDbkQsRUFBRSxDQUFBLENBQUMsUUFBUSxDQUFDLElBQUksSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUN6QixPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDekMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsV0FBVyxFQUFFLEdBQUcsRUFBRSxVQUFDLFFBQVEsRUFBRSxPQUFPO1lBQ3hELEVBQUUsQ0FBQSxDQUFDLFFBQVEsQ0FBQyxJQUFJLElBQUksV0FBVyxDQUFDLENBQUMsQ0FBQztnQkFDOUIsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQ3pDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUUsVUFBQyxRQUFRLEVBQUUsT0FBTztZQUNwRCxFQUFFLENBQUEsQ0FBQyxRQUFRLENBQUMsSUFBSSxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQzFCLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxRQUFRLENBQUMsQ0FBQztZQUN6QyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxVQUFVLEVBQUUsR0FBRyxFQUFFLFVBQUMsUUFBUSxFQUFFLE9BQU87WUFDdkQsRUFBRSxDQUFBLENBQUMsUUFBUSxDQUFDLElBQUksSUFBSSxVQUFVLENBQUMsQ0FBQyxDQUFDO2dCQUM3QixPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDekMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUNNLDhCQUFXLEdBQWxCO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDeEIsQ0FBQztJQWtCTCxlQUFDO0FBQUQsQ0FBQyxBQS9ERCxJQStEQztBQS9EWSw0QkFBUSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBDb3VjaGJhc2UgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWNvdWNoYmFzZVwiO1xyXG5pbXBvcnQgeyBDb25uZWN0b3JTZXJ2aWNlIH0gZnJvbSBcIi4uL2Nvbm5lY3Rvci9jb25uZWN0b3Iuc2VydmljZVwiO1xyXG5cclxuSW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBEYXRhYmFzZSB7XHJcbiAgICBwcml2YXRlIHN0b3JhZ2U6IGFueTtcclxuICAgIHByaXZhdGUgaXNJbnN0YW50aWF0ZWQ6IGJvb2xlYW47XHJcbiAgICAvKlxyXG4gICAgcHJpdmF0ZSBwdWxsOiBhbnk7XHJcbiAgICBwcml2YXRlIHB1c2g6IGFueTtcclxuICAgICovXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoLy9wcml2YXRlIGNvbm5lY3RvclNlcnZpY2U6IENvbm5lY3RvclNlcnZpY2VcclxuICAgICkge1xyXG4gICAgICAgIGlmKCF0aGlzLmlzSW5zdGFudGlhdGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RvcmFnZSA9IG5ldyBDb3VjaGJhc2UoXCJjYXJlZ2l2ZXJcIik7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlVmlld3MoKTtcclxuICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLmlzSW5zdGFudGlhdGVkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGNyZWF0ZVZpZXdzKCkge1xyXG4gICAgICAgIHRoaXMuc3RvcmFnZS5jcmVhdGVWaWV3KFwiZGF0YVwiLCBcIjFcIiwgKGRvY3VtZW50LCBlbWl0dGVyKSA9PiB7XHJcbiAgICAgICAgICAgIGlmKGRvY3VtZW50LnR5cGUgPT0gXCJkYXRhXCIpIHtcclxuICAgICAgICAgICAgICAgIGVtaXR0ZXIuZW1pdChkb2N1bWVudC5faWQsIGRvY3VtZW50KTtcclxuICAgICAgICAgICAgfSBcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnN0b3JhZ2UuY3JlYXRlVmlldyhcInVzZXJcIiwgXCIxXCIsIChkb2N1bWVudCwgZW1pdHRlcikgPT4ge1xyXG4gICAgICAgICAgICBpZihkb2N1bWVudC50eXBlID09IFwidXNlclwiKSB7XHJcbiAgICAgICAgICAgICAgICBlbWl0dGVyLmVtaXQoZG9jdW1lbnQuX2lkLCBkb2N1bWVudCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnN0b3JhZ2UuY3JlYXRlVmlldyhcIm1hdGVyaWFsc1wiLCBcIjFcIiwgKGRvY3VtZW50LCBlbWl0dGVyKSA9PiB7XHJcbiAgICAgICAgICAgIGlmKGRvY3VtZW50LnR5cGUgPT0gXCJtYXRlcmlhbHNcIikge1xyXG4gICAgICAgICAgICAgICAgZW1pdHRlci5lbWl0KGRvY3VtZW50Ll9pZCwgZG9jdW1lbnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5zdG9yYWdlLmNyZWF0ZVZpZXcoXCJuZWVkc1wiLCBcIjFcIiwgKGRvY3VtZW50LCBlbWl0dGVyKSA9PiB7XHJcbiAgICAgICAgICAgIGlmKGRvY3VtZW50LnR5cGUgPT0gXCJuZWVkc1wiKSB7XHJcbiAgICAgICAgICAgICAgICBlbWl0dGVyLmVtaXQoZG9jdW1lbnQuX2lkLCBkb2N1bWVudCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnN0b3JhZ2UuY3JlYXRlVmlldyhcInBhdGllbnRzXCIsIFwiMVwiLCAoZG9jdW1lbnQsIGVtaXR0ZXIpID0+IHtcclxuICAgICAgICAgICAgaWYoZG9jdW1lbnQudHlwZSA9PSBcInBhdGllbnRzXCIpIHtcclxuICAgICAgICAgICAgICAgIGVtaXR0ZXIuZW1pdChkb2N1bWVudC5faWQsIGRvY3VtZW50KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldERhdGFiYXNlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnN0b3JhZ2U7XHJcbiAgICB9XHJcbiAgICAvKlxyXG4gICAgICAgIHB1YmxpYyBzdGFydFN5bmMoY29udGludW91czogYm9vbGVhbikge1xyXG4gICAgICAgIHRoaXMucHVzaCA9IHRoaXMuc3RvcmFnZS5jcmVhdGVQdXNoUmVwbGljYXRpb24oXCJodHRwOi8vMTkyLjE2OC41Ny4xOjQ5ODQvdGVzdC1kYXRhYmFzZVwiKTtcclxuICAgICAgICB0aGlzLnB1bGwgPSB0aGlzLnN0b3JhZ2UuY3JlYXRlUHVsbFJlcGxpY2F0aW9uKFwiaHR0cDovLzE5Mi4xNjguNTcuMTo0OTg0L3Rlc3QtZGF0YWJhc2VcIik7XHJcblxyXG4gICAgICAgIHRoaXMucHVzaC5zZXRDb250aW51b3VzKGNvbnRpbnVvdXMpO1xyXG4gICAgICAgIHRoaXMucHVsbC5zZXRDb250aW51b3VzKGNvbnRpbnVvdXMpO1xyXG5cclxuICAgICAgICB0aGlzLnB1c2guc3RhcnQoKTtcclxuICAgICAgICB0aGlzLnB1bGwuc3RhcnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RvcFN5bmMoKSB7XHJcbiAgICAgICAgdGhpcy5wdXNoLnN0b3AoKTtcclxuICAgICAgICB0aGlzLnB1bGwuc3RvcCgpO1xyXG4gICAgfVxyXG4gICAgKi9cclxufVxyXG4iXX0=