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
    this.user.avatar.url  = this.changeStartOfAvatarUrl(this.user.avatar.url);
    this.user.cover.url  = this.changeStartOfAvatarUrl(this.user.cover.url);
  }


  changeStartOfAvatarUrl (url) {
    if (!(url.indexOf('http://') === 0 ||
         url.indexOf('https://') === 0)) {
      return 'http://localhost:3000' + url;
    }     
    return url; 
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
