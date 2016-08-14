class EditFeeController {
  constructor (Events, $mdToast, $state, $scope) {
    'ngInject';
    this.events = Events;
    this.$mdToast = $mdToast;
    this.$scope = $scope;
    this.$state = $state;
  }

  $onInit() {
    this.allEvents = null;
    this.query = {
      limit: 15,
      page: 1
    };
    this.filter = {
      options: {
        debounce: 500
      }
    };

    let bookmark;

    this.$scope.$watch(() => this.query.filter,  (newValue, oldValue) => {
      if(!oldValue) {
        bookmark = this.query.page;
      }
      
      if(newValue !== oldValue) {
        this.query.page = 1;
      }
      
      if(!newValue) {
        this.query.page = bookmark;
      }
      
      this.getEvents();
    });

    this.getEvents();
  }

  setCurrentEvent($event, event) {
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

  success(allEvents) {
    this.allEvents = allEvents;
  }

  getEvents() {
    this.promise = this.events.Resource.get(this.query).$promise
                        .then(this.success.bind(this), this.showError.bind(this));
  }

}

export default EditFeeController;
