
export class Notification {

    constructor(public id: string, public title: string, public message: string, public done: boolean) {
        //this.initAppMessages();
    }

    initAppMessages() {
        //this.notifications.push(new Notification('pending evaluations', 'Existem avaliações pendentes. Por favor aceda às avaliações no canto superior direito.', false));
    }
    /*
    getMessage(id) {
        
            this.notifications.filter(function( notification ) {
            if(notification.id === id)
            console.log("NOTiFICATION MESSAGE: " + notification.message);
            //return obj.b == 6;
        });
    }
    */
}