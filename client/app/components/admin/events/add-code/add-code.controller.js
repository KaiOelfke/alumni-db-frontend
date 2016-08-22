class AddFeeController {
  constructor (Codes, $mdToast, Fees, Search, $mdDialog, $state, $scope) {
    'ngInject';
    this.codes = Codes;
    this.$mdToast = $mdToast;
    this.$scope = $scope;
    this.$state = $state;
    this.$mdDialog = $mdDialog;
    this.search = Search;
    this.fees = Fees;
  }

  $onInit() {
    this.code = {event_id: this.eventId};
    this.cancel = this.$mdDialog.cancel;

    // autocomplete 
    this.selectedUser = null;
    this.searchText = "";

    this.allFees = [];
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

  querySearch() {
    return this.search
        .userSearch(this.searchText, 1)
        .then((resp) => resp.data.data);
  }

  loadFees() {
    this.fees.Resource
            .get({eventId: this.eventId})
            .$promise
            .then((resp) => {
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

  create() {
    if (this.selectedUser) {
      this.code.user_id = this.selectedUser.id;  
    }
    
    const newCode = this.codes.createCode(this.eventId, this.code);

    newCode
      .then(this.success.bind(this), this.showError.bind(this));
  } 

}

export default AddFeeController;
