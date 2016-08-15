class AddFeeController {
  constructor (Fees, ProfileUtilities, $mdToast, $mdDialog, $state, $scope) {
    'ngInject';
    this.fees = Fees;
    this.$mdToast = $mdToast;
    this.$scope = $scope;
    this.$state = $state;
    this.$mdDialog = $mdDialog;
    this.ProfileUtilities = ProfileUtilities;
    this.cFee = JSON.parse(this.currentFee);
  }

  $onInit() {
    this.cancel = this.$mdDialog.cancel;
    this.dateCheckRegex = this.ProfileUtilities.dateCheckRegex;    
  }

  success(fee) {
    return this.$mdDialog.hide(fee).then(() => {
      return this.$mdToast.show(
        this.$mdToast.simple()
          .textContent('Fee updated!')
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

  save() {
    const updatedFee = this.fees.Resource.update({id: this.cFee.id}, {fee: this.cFee || {}});

    updatedFee
      .$promise
      .then(this.success.bind(this), this.showError.bind(this));
  } 

}

export default AddFeeController;
