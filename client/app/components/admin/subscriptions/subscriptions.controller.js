class SubscriptionsController {
  constructor (Plans, $mdToast, $mdDialog) {
    'ngInject';

    this.$mdDialog = $mdDialog;
    this.plansFactory = Plans;
    this.$mdToast = $mdToast;
  }


  $onInit() {
    this.plans = {};
    this.selected = [];
    this.query = {
      order: 'name',
      limit: 5,
      page: 1
    };

    this.getPlans();
  }

  showError() {
    this.$mdToast.show(
      this.$mdToast.simple()
        .textContent('Oops something went wrong')
        .position("top right")
        .hideDelay(4000)
    );
  }

  refresh() {
    this.getPlans();
  }

  getPlans() {
    this.promise = this.plansFactory
                      .Resource
                      .get()
                      .$promise
                      .then((plans) => (this.plans = plans),
                           this.showError.bind(this));
  }

  add() {

    this.$mdDialog.show({
      clickOutsideToClose: true,
      focusOnOpen: false,
      targetEvent: event,
      template: '<admin-panel-subscriptions-add-plan></admin-panel-subscriptions-add-plan>'
    }).then(this.getPlans.bind(this));

  }


  edit(event, plan) {

    event.stopPropagation();
    this.$mdDialog.show({
      clickOutsideToClose: true,
      focusOnOpen: false,
      controller: function () {},
      targetEvent: event,
      controllerAs: '$ctrl',
      bindToController: true,
      template: '<admin-panel-subscriptions-edit-plan plan="{{$ctrl.plan}}"></admin-panel-subscriptions-edit-plan>',
      locals: { plan: plan}
    }).then(this.getPlans.bind(this));

  }

  getDeletedBackgroundColor(instance) { 
    if (instance.delete_flag) {
      return {'background': '#d7d7d7'};
    }
    return {};
  }


  remove(event, plan) {
    event.stopPropagation();

    const showError = () => {
        this.$mdToast.show(
          this.$mdToast.simple()
            .textContent('Failed to remove the Plan.')
            .position("top right")
            .hideDelay(4000)
        )    
    }

    const showSuccessToaster = () => {
      this.$mdToast.show(
        this.$mdToast.simple()
          .textContent('Plan removed!')
          .position("top right")
          .hideDelay(4000)
      );

      return Promise.resolve();
    }



    const rmPlan = () => {
        return this.plansFactory.Resource
                 .remove({id: plan.id})
                 .$promise
                 .then(showSuccessToaster, showError)
    }

    const confirm = this.$mdDialog.confirm()
          .title('Would you like to delete the Plan?')
          .targetEvent(event)
          .ok('Delete')
          .cancel('Cancel');

    this.$mdDialog.show(confirm)
      .then(rmPlan.bind(this))
      .then(this.getPlans.bind(this));
  }
}


export default SubscriptionsController;