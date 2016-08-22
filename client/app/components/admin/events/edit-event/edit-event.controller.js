class EditEventController {
  constructor (Events, $state, $mdToast) {
    'ngInject';
    this.events = Events;
    this.$mdToast = $mdToast;
    this.$state = $state;
  }

  $onInit() {
    this.processing = false;
    this.event.logo_photo.url  = this.changeStartOfAvatarUrl(this.event.logo_photo.url);
    this.event.cover_photo.url  = this.changeStartOfAvatarUrl(this.event.cover_photo.url);
    this.eventTypes = this.events.eventTypes;
  }

  changeStartOfAvatarUrl (url) {
    if (!(url.indexOf('http://') === 0 ||
         url.indexOf('https://') === 0)) {
      return 'http://localhost:3000' + url;
    }     
    return url; 
  }  

  changeAvatar($file) {
    this.processing = true;    
    this.events
        .changeAvatar(this.event.id, $file)
        .then( (resp) => {
            this.processing = false;
            this.event.logo_photo.url = 
              this.changeStartOfAvatarUrl(resp.data.data.logo_photo.url);
            console.log('Success ',resp);
        },  (resp) => {
            this.processing = false;          
            console.log('Error status: ' + resp);
        },  (evt)  =>{
            console.log('progress ' , evt);          
        });
  }

  changeCover($file) {
    this.processing = true;    
    this.events
        .changeCover(this.event.id, $file)
        .then( (resp) => {
            this.processing = false;
            this.event.cover_photo.url = 
              this.changeStartOfAvatarUrl(resp.data.data.cover_photo.url);
            console.log('Success ',resp);
        },  (resp) => {
            this.processing = false;          
            console.log('Error status: ' + resp);
        },  (evt)  =>{
            console.log('progress ' , evt);          
        });
  }

  cancel() {
    this.$state.go("adminPanel.EventsShowEvent", {id: this.event.id});
  }

  save() {
    this.processing = true;
    this.events
        .Resource
        .update({ id: this.event.id }, {event: this.event})
        .$promise
        .then( (resp) => {
          this.processing = false;
          this.$state.go("adminPanel.EventsShowEvent", {id: this.event.id});
          this.$mdToast.show(
                this.$mdToast.simple()
                    .textContent(`Success: ${this.event.name} has been updated`));
        }, (resp) => {
          this.processing = false;

          this.$mdToast.show(
                this.$mdToast.simple()
                    .textContent(`Failed: Server Error`));
        });
  }

}

export default EditEventController;
