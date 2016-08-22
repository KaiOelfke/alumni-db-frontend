class EventsController {
  constructor() {
    this.name = 'events';
    this.searchText = null;
    this.selectedItem = null;

    this.todos = [];
    for (var i = 0; i < 10; i++) {
      this.todos.push({
        what: "Brunch this weekend?",
        who: "Min Li Chan",
        notes: "I'll be in your neighborhood doing errands."
      });
    }

  }

  $onInit() {
    this.events.forEach((event) => {
      event.logo_photo.url  = this.changeStartOfAvatarUrl(event.logo_photo.url);
      event.cover_photo.url  = this.changeStartOfAvatarUrl(event.cover_photo.url);
    })
  }

  changeStartOfAvatarUrl (url) {
    if (!(url.indexOf('http://') === 0 ||
         url.indexOf('https://') === 0)) {
      return 'http://localhost:3000' + url;
    }     
    return url; 
  }  

}

export default EventsController;
