class AddFeeController {
  constructor (Fees, ProfileUtilities, $mdToast, $mdDialog, $state, $scope) {
    'ngInject';
    this.fees = Fees;
    this.$mdToast = $mdToast;
    this.$scope = $scope;
    this.$state = $state;
    this.$mdDialog = $mdDialog;
    this.ProfileUtilities = ProfileUtilities;
    console.log(this);
  }

  $onInit() {
    this.currentFee = {event_id: this.eventId};
    this.cancel = this.$mdDialog.cancel;
    this.dateCheckRegex = this.ProfileUtilities.dateCheckRegex;
  }

  success(fee) {
    return this.$mdDialog.hide(fee).then(() => {
      return this.$mdToast.show(
        this.$mdToast.simple()
          .textContent('Fee created!')
          .position("top right")
          .hideDelay(4000)
      );
    });
  }
    
  showError() {
    this.$mdToast.show(
            this.$mdToast.simple()
              .textContent('Oops error happend!')
              .position("top right")
              .hideDelay(4000)
          );
  }  

  create() {
    const newFee = this.fees.Resource.save({fee: this.currentFee || {}});

    newFee
      .$promise
      .then(this.success.bind(this), this.showError.bind(this));
  } 

}

export default AddFeeController;
