class ShowParticipationController {
  constructor ($state) {
    'ngInject';
    this.$state = $state;
  }

  $onInit() {

  }

  backToEvent() {
    this.$state.go('adminPanel.EventsShowEvent', {id: this.participation.event_id});
  }

}

export default ShowParticipationController;
