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


}

export default eventController;
