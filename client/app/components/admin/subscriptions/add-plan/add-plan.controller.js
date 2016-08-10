class AddPlanController {
  constructor (Plans, $mdDialog, $mdToast) {
    'ngInject';

    this.plans = Plans;
    this.$mdDialog = $mdDialog;
    this.$mdToast = $mdToast;
    this.cancel = $mdDialog.cancel;
  }

  $onInit() {

  }

  success(plan) {
    return this.$mdDialog.hide(plan).then(() => {
      return this.$mdToast.show(
        this.$mdToast.simple()
          .textContent('Plan created!')
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

  save(plan) {
    let newPlan = this.plans.Resource.save({plan: plan || {}});
    newPlan.$promise.then(this.success.bind(this), this.showError.bind(this));
  }
}

export default AddPlanController;