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
            this.storage.createView("data", "1", function (document, emitter) {
                emitter.emit(document._id, document);
            });
            this.storage.createView("user", "2", function (document, emitter) {
                if (document.type == "user") {
                    emitter.emit(document._id, document);
                }
            });
            this.isInstantiated = true;
        }
    }
    Database.prototype.getDatabase = function () {
        return this.storage;
    };
    return Database;
}());
exports.Database = Database;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWJhc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkYXRhYmFzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsc0NBQTJDO0FBQzNDLGlFQUFtRDtBQUVuRCxpQkFBVSxFQUFFLENBQUE7QUFDWjtJQUdJOzs7TUFHRTtJQUNGO1FBQ0ksRUFBRSxDQUFBLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztZQUV0QixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksa0NBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUMxQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLFVBQUMsUUFBUSxFQUFFLE9BQU87Z0JBQ25ELE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxRQUFRLENBQUMsQ0FBQztZQUN6QyxDQUFDLENBQUMsQ0FBQztZQUNILElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsVUFBQyxRQUFRLEVBQUUsT0FBTztnQkFDbkQsRUFBRSxDQUFBLENBQUMsUUFBUSxDQUFDLElBQUksSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDO29CQUN6QixPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsUUFBUSxDQUFDLENBQUM7Z0JBQ3pDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztZQUVILElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO1FBQy9CLENBQUM7SUFDTCxDQUFDO0lBQ00sOEJBQVcsR0FBbEI7UUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN4QixDQUFDO0lBa0JMLGVBQUM7QUFBRCxDQUFDLEFBM0NELElBMkNDO0FBM0NZLDRCQUFRIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IENvdWNoYmFzZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtY291Y2hiYXNlXCI7XHJcblxyXG5JbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIERhdGFiYXNlIHtcclxuICAgIHByaXZhdGUgc3RvcmFnZTogYW55O1xyXG4gICAgcHJpdmF0ZSBpc0luc3RhbnRpYXRlZDogYm9vbGVhbjtcclxuICAgIC8qXHJcbiAgICBwcml2YXRlIHB1bGw6IGFueTtcclxuICAgIHByaXZhdGUgcHVzaDogYW55O1xyXG4gICAgKi8gXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgaWYoIXRoaXMuaXNJbnN0YW50aWF0ZWQpIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMuc3RvcmFnZSA9IG5ldyBDb3VjaGJhc2UoXCJjYXJlZ2l2ZXJcIik7XHJcbiAgICAgICAgICAgIHRoaXMuc3RvcmFnZS5jcmVhdGVWaWV3KFwiZGF0YVwiLCBcIjFcIiwgKGRvY3VtZW50LCBlbWl0dGVyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBlbWl0dGVyLmVtaXQoZG9jdW1lbnQuX2lkLCBkb2N1bWVudCk7IFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5zdG9yYWdlLmNyZWF0ZVZpZXcoXCJ1c2VyXCIsIFwiMlwiLCAoZG9jdW1lbnQsIGVtaXR0ZXIpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmKGRvY3VtZW50LnR5cGUgPT0gXCJ1c2VyXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBlbWl0dGVyLmVtaXQoZG9jdW1lbnQuX2lkLCBkb2N1bWVudCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLmlzSW5zdGFudGlhdGVkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0RGF0YWJhc2UoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RvcmFnZTtcclxuICAgIH1cclxuICAgIC8qXHJcbiAgICAgICAgcHVibGljIHN0YXJ0U3luYyhjb250aW51b3VzOiBib29sZWFuKSB7XHJcbiAgICAgICAgdGhpcy5wdXNoID0gdGhpcy5zdG9yYWdlLmNyZWF0ZVB1c2hSZXBsaWNhdGlvbihcImh0dHA6Ly8xOTIuMTY4LjU3LjE6NDk4NC90ZXN0LWRhdGFiYXNlXCIpO1xyXG4gICAgICAgIHRoaXMucHVsbCA9IHRoaXMuc3RvcmFnZS5jcmVhdGVQdWxsUmVwbGljYXRpb24oXCJodHRwOi8vMTkyLjE2OC41Ny4xOjQ5ODQvdGVzdC1kYXRhYmFzZVwiKTtcclxuXHJcbiAgICAgICAgdGhpcy5wdXNoLnNldENvbnRpbnVvdXMoY29udGludW91cyk7XHJcbiAgICAgICAgdGhpcy5wdWxsLnNldENvbnRpbnVvdXMoY29udGludW91cyk7XHJcblxyXG4gICAgICAgIHRoaXMucHVzaC5zdGFydCgpO1xyXG4gICAgICAgIHRoaXMucHVsbC5zdGFydCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdG9wU3luYygpIHtcclxuICAgICAgICB0aGlzLnB1c2guc3RvcCgpO1xyXG4gICAgICAgIHRoaXMucHVsbC5zdG9wKCk7XHJcbiAgICB9XHJcbiAgICAqL1xyXG59XHJcbiJdfQ==