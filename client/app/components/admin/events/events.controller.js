class EventsController {
  constructor (Events, $mdToast, $state, $scope) {
    'ngInject';
    this.events = Events;
    this.$mdToast = $mdToast;
    this.$scope = $scope;
    this.$state = $state;
  }

  $onInit() {
    this.allEvents = null;
    this.getEvents();
  }

  setEditEvent($event, event) {
    this.$state.go("adminPanel.EventsShowEvent", {id: event.id})
  }

  removeFilter() {
    this.filter.show = false;
    this.query.filter = '';
    
    if(this.filter.form.$dirty) {
      this.filter.form.$setPristine();
    }
  }

  showError() {
    this.$mdToast.show(
      this.$mdToast.simple()
        .textContent('Oops something went wrong')
        .position("top right")
        .hideDelay(3000)
    );
  }

  refresh() {
    this.getEvents();
  }

  getEventTypeName(etype) {
    return this.events.eventTypes.reduce((mem, et)=> {
        if(et.id === etype) {
          return et.name;
        }
        return mem;
      }, '');    
  }

  success(allEvents) {
    this.allEvents = allEvents;
  }

  getEvents() {
    this.promise = this.events.Resource.get(this.query).$promise
                        .then(this.success.bind(this), this.showError.bind(this));
  }

  addEvent() {
    this.$state.go("adminPanel.EventsCreateEvent")
  }

}

export default EventsController;
