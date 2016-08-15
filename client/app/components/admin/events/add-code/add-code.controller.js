class AddFeeController {
  constructor (Codes, $mdToast, $mdDialog, $state, $scope) {
    'ngInject';
    this.codes = Codes;
    this.$mdToast = $mdToast;
    this.$scope = $scope;
    this.$state = $state;
    this.$mdDialog = $mdDialog;
  }

  $onInit() {
    this.code = {};
    this.cancel = this.$mdDialog.cancel;
  }

  success(code) {
    return this.$mdDialog.hide(code).then(() => {
      return this.$mdToast.show(
        this.$mdToast.simple()
          .textContent('Code created!')
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
    const newCode = this.codes.createCode({code: this.code || {}});

    newCode
      .then(this.success.bind(this), this.showError.bind(this));
  } 

}

export default AddFeeController;
