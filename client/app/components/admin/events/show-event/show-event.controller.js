class ShowEventController {
  constructor (Events, Fees, Codes, $mdDialog, $state, $mdToast) {
    'ngInject';
    this.events = Events;
    this.fees = Fees;
    this.codes = Codes;
    this.$mdToast = $mdToast;
    this.$mdDialog = $mdDialog;
    this.$state = $state;
    console.log(this);
  }

  $onInit() {
    console.log(this);
    this.event.logo_photo.url  = this.changeStartOfAvatarUrl(this.event.logo_photo.url);
    this.event.cover_photo.url  = this.changeStartOfAvatarUrl(this.event.cover_photo.url);  
    this.eventTypes = this.events.eventTypes;
    this.allFees = [];
    this.allCodes = [];
    this.getFees();
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
    $event.stopPropagation();
    this.$mdDialog.show({
      clickOutsideToClose: true,
      focusOnOpen: false,
      controller: function () {},
      targetEvent: $event,
      controllerAs: '$ctrl',
      bindToController: true,
      template: '<admin-panel-add-code current-event="{{$ctrl.event.id}}"></admin-panel-add-code>',
      locals: {}
    }).then(this.getCodes.bind(this));
  }

  removeCode($event, code) {
    $event.stopPropagation();

    let showSuccessToaster = () => {
      this.$mdToast.show(
        this.$mdToast.simple()
          .textContent('Code removed!')
          .position("top right")
          .hideDelay(4000)
      );

      return Promise.resolve();
    }

    let rmCode = () => {
        return this.codes.Resource
                 .remove({id: code.id})
                 .$promise
                 .then(showSuccessToaster, this.showError.bind(this))
    }

    let confirm = this.$mdDialog.confirm()
          .title('Would you like to delete the Code?')
          .targetEvent(code)
          .ok('Delete')
          .cancel('Cancel');

    this.$mdDialog.show(confirm.bind(this))
      .then(rmCode.bind(this))
      .then(this.getCodes.bind(this));    
  }

  // Fees

  getFees() {
    this.feesPromise = this.fees.Resource
        .get({event_id: this.event.id})
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
    console.log(this.event.id);
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
                 .remove({id: fee.id})
                 .$promise
                 .then(showSuccessToaster, this.showError.bind(this))
    }

    const confirm = this.$mdDialog.confirm()
          .title('Would you like to delete the Fee?')
          .targetEvent(fee)
          .ok('Delete')
          .cancel('Cancel');

    this.$mdDialog.show(confirm)
      .then(rmFee)
      .then(this.getFees.bind(this));
  }

}

export default ShowEventController;
