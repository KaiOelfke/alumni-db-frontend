class ShowEventController {
  constructor (Events, Fees, Codes, $mdDialog, $state, $mdToast) {
    'ngInject';
    this.events = Events;
    this.fees = Fees;
    this.codes = Codes;
    this.$mdToast = $mdToast;
    this.$mdDialog = $mdDialog;
    this.$state = $state;
  }

  $onInit() {
    this.event.logo_photo.url  = this.changeStartOfAvatarUrl(this.event.logo_photo.url);
    this.event.cover_photo.url  = this.changeStartOfAvatarUrl(this.event.cover_photo.url);
    this.eventTypes = this.events.eventTypes;
    this.allFees = [];
    this.allCodes = [];
    if (!this.hideFees()) {
      this.getFees();  
    }
    if (!this.hideCodes()) {
      this.getCodes();
    }
    
  }

  changeStartOfAvatarUrl (url) {
    if (!(url.indexOf('http://') === 0 ||
         url.indexOf('https://') === 0)) {
      return 'http://localhost:3000' + url;
    }     
    return url; 
  }

  editEvent() {
    this.$state.go('adminPanel.EventsEditEvent', {id: this.event.id});
  }

  getDeletedBackgroundColor(instance) { 
    if (instance.delete_flag) {
      return {'background': '#d7d7d7'};
    }

    return {};
  }

  delete_flag
  // Codes

  getCodes() {
    this.codes.getCodes(this.event.id)
        .then((resp) => {
          this.allCodes = resp.data.data;
        })
        .catch(() => {
          this.$mdToast.show(
            this.$mdToast.simple()
              .textContent('Server error, couldn\'t reload!')
              .position("top right")
              .hideDelay(4000)
          ); 
        })

  }

  addCode($event) {
    this.$mdDialog.show({
      clickOutsideToClose: true,
      focusOnOpen: false,
      controller: function () {},
      targetEvent: $event,
      controllerAs: '$ctrl',
      bindToController: true,
      template: '<admin-panel-add-code event-id="{{$ctrl.eventId}}"></admin-panel-add-code>',
      locals: {eventId: this.event.id}
    }).then(this.getCodes.bind(this));
  }

  removeCode($event, code) {
    $event.stopPropagation();

    const showError = () => {
        this.$mdToast.show(
          this.$mdToast.simple()
            .textContent('Failed to remove the fee.')
            .position("top right")
            .hideDelay(4000)
        )    
    }

    const showSuccessToaster = () => {
      this.$mdToast.show(
        this.$mdToast.simple()
          .textContent('Code removed!')
          .position("top right")
          .hideDelay(4000)
      );

      return Promise.resolve();
    }

    const rmCode = () => {
        return this.codes.removeCode(this.event.id, code.id)
                 .then(showSuccessToaster, showError.bind(this))
    }

    const confirm = this.$mdDialog.confirm()
          .title('Would you like to delete the Code?')
          .targetEvent($event)
          .ok('Delete')
          .cancel('Cancel');

    this.$mdDialog.show(confirm)
      .then(rmCode.bind(this))
      .then(this.getCodes.bind(this));    
  }

  // Fees

  getFees() {
    this.feesPromise = this.fees.Resource
        .get({eventId: this.event.id})
        .$promise
        .then((resp) => {
          console.log(resp.data);
          this.allFees = resp.data;
        })
        .catch(() => {
          this.$mdToast.show(
            this.$mdToast.simple()
              .textContent('Server error, couldn\'t reload!')
              .position("top right")
              .hideDelay(4000)
          ); 
        })
  }

  addFee() {
    this.$mdDialog.show({
      clickOutsideToClose: true,
      focusOnOpen: false,
      controller: function () {},
      targetEvent: event,
      controllerAs: '$ctrl',
      bindToController: true,
      template: '<admin-panel-add-fee event-id="{{$ctrl.eventId}}"></admin-panel-add-fee>',
      locals: {eventId: this.event.id}
    }).then(this.getFees.bind(this));
  }

  editFee($event, fee) {
    $event.stopPropagation();
    if (fee.delete_flag ) { return };
    
    this.currentFee = fee;
    this.$mdDialog.show({
      clickOutsideToClose: true,
      focusOnOpen: false,
      controller: function () {},
      targetEvent: $event,
      controllerAs: '$ctrl',
      bindToController: true,
      template: '<admin-panel-edit-fee eventId="{{$ctrl.eventId}}" current-fee="{{$ctrl.currentFee}}"></admin-panel-edit-fee>',
      locals: {eventId: this.event.id, currentFee: fee}
    }).then(this.getFees.bind(this));
  }

  removeFee($event, fee) {
    $event.stopPropagation();


    const showError = () => {
        this.$mdToast.show(
          this.$mdToast.simple()
            .textContent('Failed to remove the fee.')
            .position("top right")
            .hideDelay(4000)
        )    
    }

    const showSuccessToaster = () => {
      this.$mdToast.show(
        this.$mdToast.simple()
          .textContent('Fee removed!')
          .position("top right")
          .hideDelay(4000)
      );

      return Promise.resolve();
    }

    const rmFee = () => {
        return this.fees.Resource
                 .remove({eventId: this.event.id, id: fee.id})
                 .$promise
                 .then(showSuccessToaster, showError.bind(this))
    }

    const confirm = this.$mdDialog.confirm()
          .title('Would you like to delete the Fee?')
          .targetEvent($event)
          .ok('Delete')
          .cancel('Cancel');

    this.$mdDialog.show(confirm)
      .then(rmFee.bind(this))
      .then(this.getFees.bind(this));
  }


  hideFees() {
    if (this.event.etype === 'without_application_payment' ||
        this.event.etype === 'with_application') {
      return true;
    }
    return false;
  }

  hideCodes() {
    if (this.event.etype === 'without_application_payment') {
      return true;
    }
    return false;
  }

}

export default ShowEventController;
