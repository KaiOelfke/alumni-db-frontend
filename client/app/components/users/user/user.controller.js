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
    if (!(this.user.avatar.url.indexOf('http://') == 0 ||
        this.user.avatar.url.indexOf('https://') == 0)) {
      this.user.avatar.url = 'http://localhost:3000'+ this.user.avatar.url;
    }

  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  editProfile() {
    this.$state.go('userPanel.edit-profile');
  }

  showEdit(){
    return this.currentUser.id === this.user.id;
  }

}

export default UserController;
