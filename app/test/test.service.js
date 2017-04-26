"use strict";
var http_1 = require("@angular/http");
var core_1 = require("@angular/core");
var connectivity = require("connectivity");
var TestService = (function () {
    function TestService(http) {
        this.http = http;
    }
    TestService.prototype.ngOnInit = function () {
        this.getConectivity();
        this.startConnMonitor();
        throw new Error('Method not implemented.');
    };
    TestService.prototype.getConectivity = function () {
        var connectionType = connectivity.getConnectionType();
        switch (connectionType) {
            case connectivity.connectionType.none:
                console.log("No connection");
                break;
            case connectivity.connectionType.wifi:
                console.log("WiFi connection");
                break;
            case connectivity.connectionType.mobile:
                console.log("Mobile connection");
                break;
        }
    };
    TestService.prototype.startConnMonitor = function () {
        connectivity.startMonitoring(function onConnectionTypeChanged(newConnectionType) {
            switch (newConnectionType) {
                case connectivity.connectionType.none:
                    console.log("Connection type changed to none.");
                    break;
                case connectivity.connectionType.wifi:
                    console.log("Connection type changed to WiFi.");
                    break;
                case connectivity.connectionType.mobile:
                    console.log("Connection type changed to mobile.");
                    break;
            }
        });
    };
    return TestService;
}());
TestService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], TestService);
exports.TestService = TestService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidGVzdC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSxzQ0FBd0Q7QUFFeEQsc0NBQTJDO0FBRTNDLDJDQUE4QztBQUc5QyxJQUFhLFdBQVc7SUFHcEIscUJBQW9CLElBQVU7UUFBVixTQUFJLEdBQUosSUFBSSxDQUFNO0lBQzlCLENBQUM7SUFFRCw4QkFBUSxHQUFSO1FBQ0ksSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQ3hCLE1BQU0sSUFBSSxLQUFLLENBQUMseUJBQXlCLENBQUMsQ0FBQztJQUUvQyxDQUFDO0lBRUQsb0NBQWMsR0FBZDtRQUNJLElBQUksY0FBYyxHQUFHLFlBQVksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBRXRELE1BQU0sQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7WUFDckIsS0FBSyxZQUFZLENBQUMsY0FBYyxDQUFDLElBQUk7Z0JBQ2pDLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7Z0JBQzdCLEtBQUssQ0FBQztZQUNWLEtBQUssWUFBWSxDQUFDLGNBQWMsQ0FBQyxJQUFJO2dCQUNqQyxPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLENBQUM7Z0JBQy9CLEtBQUssQ0FBQztZQUNWLEtBQUssWUFBWSxDQUFDLGNBQWMsQ0FBQyxNQUFNO2dCQUNuQyxPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUM7Z0JBQ2pDLEtBQUssQ0FBQztRQUNkLENBQUM7SUFDTCxDQUFDO0lBRUQsc0NBQWdCLEdBQWhCO1FBQ0ksWUFBWSxDQUFDLGVBQWUsQ0FBQyxpQ0FBaUMsaUJBQXlCO1lBQ25GLE1BQU0sQ0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQztnQkFDeEIsS0FBSyxZQUFZLENBQUMsY0FBYyxDQUFDLElBQUk7b0JBQ2pDLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0NBQWtDLENBQUMsQ0FBQztvQkFDaEQsS0FBSyxDQUFDO2dCQUNWLEtBQUssWUFBWSxDQUFDLGNBQWMsQ0FBQyxJQUFJO29CQUNqQyxPQUFPLENBQUMsR0FBRyxDQUFDLGtDQUFrQyxDQUFDLENBQUM7b0JBQ2hELEtBQUssQ0FBQztnQkFDVixLQUFLLFlBQVksQ0FBQyxjQUFjLENBQUMsTUFBTTtvQkFDbkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFDO29CQUNsRCxLQUFLLENBQUM7WUFDZCxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBQ0wsa0JBQUM7QUFBRCxDQUFDLEFBNUNELElBNENDO0FBNUNZLFdBQVc7SUFEdkIsaUJBQVUsRUFBRTtxQ0FJaUIsV0FBSTtHQUhyQixXQUFXLENBNEN2QjtBQTVDWSxrQ0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5lZWQgfSBmcm9tIFwiLi4vbmVlZC9uZWVkXCI7XHJcbmltcG9ydCB7IEh0dHAsIEhlYWRlcnMsIFJlc3BvbnNlIH0gZnJvbSBcIkBhbmd1bGFyL2h0dHBcIjtcclxuaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuXHJcbmltcG9ydCBjb25uZWN0aXZpdHkgPSByZXF1aXJlKFwiY29ubmVjdGl2aXR5XCIpO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgVGVzdFNlcnZpY2UgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gICAgcHVibGljIG5lZWRzOiBOZWVkW11cclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHApIHsgICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuZ2V0Q29uZWN0aXZpdHkoKTtcclxuICAgICAgICB0aGlzLnN0YXJ0Q29ubk1vbml0b3IoKTtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ01ldGhvZCBub3QgaW1wbGVtZW50ZWQuJyk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGdldENvbmVjdGl2aXR5KCkge1xyXG4gICAgICAgIHZhciBjb25uZWN0aW9uVHlwZSA9IGNvbm5lY3Rpdml0eS5nZXRDb25uZWN0aW9uVHlwZSgpO1xyXG5cclxuICAgICAgICBzd2l0Y2ggKGNvbm5lY3Rpb25UeXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgY29ubmVjdGl2aXR5LmNvbm5lY3Rpb25UeXBlLm5vbmU6XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIk5vIGNvbm5lY3Rpb25cIik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBjb25uZWN0aXZpdHkuY29ubmVjdGlvblR5cGUud2lmaTpcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiV2lGaSBjb25uZWN0aW9uXCIpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgY29ubmVjdGl2aXR5LmNvbm5lY3Rpb25UeXBlLm1vYmlsZTpcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTW9iaWxlIGNvbm5lY3Rpb25cIik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnRDb25uTW9uaXRvcigpIHtcclxuICAgICAgICBjb25uZWN0aXZpdHkuc3RhcnRNb25pdG9yaW5nKGZ1bmN0aW9uIG9uQ29ubmVjdGlvblR5cGVDaGFuZ2VkKG5ld0Nvbm5lY3Rpb25UeXBlOiBudW1iZXIpIHtcclxuICAgICAgICAgICAgc3dpdGNoIChuZXdDb25uZWN0aW9uVHlwZSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBjb25uZWN0aXZpdHkuY29ubmVjdGlvblR5cGUubm9uZTpcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNvbm5lY3Rpb24gdHlwZSBjaGFuZ2VkIHRvIG5vbmUuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBjb25uZWN0aXZpdHkuY29ubmVjdGlvblR5cGUud2lmaTpcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNvbm5lY3Rpb24gdHlwZSBjaGFuZ2VkIHRvIFdpRmkuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBjb25uZWN0aXZpdHkuY29ubmVjdGlvblR5cGUubW9iaWxlOlxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ29ubmVjdGlvbiB0eXBlIGNoYW5nZWQgdG8gbW9iaWxlLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59Il19