class UsersController {
  constructor (Users, $mdToast, $state, $scope) {
    'ngInject';
    this.users = Users;
    this.$mdToast = $mdToast;
    this.$scope = $scope;
    this.$state = $state;
  }

  $onInit() {
    this.allUsers = null;
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
      
      this.getUsers();
    });

    this.getUsers();
  }


  setCurrentUser(event, user) {
    console.log('askdjkasjkdl', user);
    this.$state.go("adminPanel.UsersShowUser", {id: user.id})
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
    this.getUsers();
  }

  success(allUsers) {
    this.allUsers = allUsers;
  }

  getUsers() {
    this.promise = this.users.Resource.get(this.query).$promise
                        .then(this.success.bind(this), this.showError.bind(this));
  }

}

export default UsersController;
