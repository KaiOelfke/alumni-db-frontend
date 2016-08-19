class eventController {
  constructor(Events) {
    'ngInject';

    this.name = 'event';
    this.events = Events;
    console.log(this);
  }

  $onInit() {
    if (this.eventFees.event) {
      this.event = this.eventFees.event;
      this.fees = this.eventFees.fees;

    } else {
      this.event = this.eventFees;
    }
    this.cards = ['event'];
    this.eventTypes = this.events.eventTypes;
    this.event.logo_photo.url  = this.changeStartOfAvatarUrl(this.event.logo_photo.url);
    this.event.cover_photo.url  = this.changeStartOfAvatarUrl(this.event.cover_photo.url);
  }

  changeStartOfAvatarUrl (url) {
    if (!(url.indexOf('http://') === 0 ||
         url.indexOf('https://') === 0)) {
      return 'http://localhost:3000' + url;
    }     
    return url; 
  }

  attend() {
    switch(this.event.etype) {
      case 'without_application_payment':
        // attend participation api

        break;

      case 'with_payment':
        // show payment and code
        // then checkout participation api
        this.cards = ['fees', 'discount']; 

        break;

      case 'with_application':
        // if applied show code
        // if not show application 
        // application or code
        this.cards = ['application']; 

        break;

      case 'with_payment_application':
        // if applied show code
        // if not show application       
        // application then fee and code
        // then checkout participation api

        this.cards = ['application']; 


        break; 

    }
  }

  showCard() {
  }


}

export default eventController;
