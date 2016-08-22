class ShowApplicationController {
  constructor ($state) {
    'ngInject';
    this.$state = $state;

  }

  $onInit() {

  }

  backToEvent() {
    this.$state.go('adminPanel.EventsShowEvent', {id: this.application.event_id});
  }

  getCVUrl() {
    if (this.application.cv_file.url) {
      const url = this.application.cv_file.url;

      if (!(url.indexOf('http://') === 0 ||
         url.indexOf('https://') === 0)) {
        return 'http://localhost:3000' + url;
      }     
      return url;
    }

    return null;     
  }
}

export default ShowApplicationController;
