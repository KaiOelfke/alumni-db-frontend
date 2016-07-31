class UserController {
  constructor($state) {
    'ngInject';

    this.$state = $state;
    this.name = 'user';
    this.searchText = null;
    this.selectedItem = null;
    console.log(this);

  }

  $onInit() {
    this.user.fullname = `${this.capitalizeFirstLetter(this.user.first_name)} 
                          ${this.capitalizeFirstLetter(this.user.last_name)}`;
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  editProfile() {
    this.$state.go('edit-user');
  }

}

export default UserController;
