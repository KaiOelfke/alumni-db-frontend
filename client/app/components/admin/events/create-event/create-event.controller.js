class CreateEventController {
  constructor (Events, $state, $mdToast) {
    'ngInject';
    this.events = Events;
    this.$mdToast = $mdToast;
    this.$state = $state;
  }

  $onInit() {
    this.event = {publish: false,
                  etype: this.events.eventTypes[0].id};
    this.processing = false;
    this.eventTypes = this.events.eventTypes;
  }


  cancel() {
    this.$state.go('adminPanel.Events');
  }

  create() {
    this.processing = true;
    const newEvent =  this.events.Resource.save({event: this.event || {}});

    newEvent.$promise
        .then( (resp) => {
          this.processing = false;

          this.$mdToast.show(
                this.$mdToast.simple()
                    .textContent(`Success: ${this.event.name} has been created`));
          this.$state.go('adminPanel.Events');
        }, (resp) => {
          this.processing = false;

          this.$mdToast.show(
                this.$mdToast.simple()
                    .textContent(`Failed: Server Error`));
        });
  }

}

export default CreateEventController;
