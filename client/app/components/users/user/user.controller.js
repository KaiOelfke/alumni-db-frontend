class UserController {
  constructor($state) {
    'ngInject';
    this.$state = $state;
  }

  $onInit() {
    this.name = 'user';
    this.searchText = null;
    this.selectedItem = null;    
    this.user.fullname = `${this.capitalizeFirstLetter(this.user.first_name)} 
                          ${this.capitalizeFirstLetter(this.user.last_name)}`;
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  editProfile() {
    this.$state.go('edit-user');
  }

  showEdit(){
    return this.currentUser.id === this.user.id;
  }

}

export default UserController;
