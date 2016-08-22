class ProfileController {
  constructor($state, Users, $mdToast) {
    'ngInject';

    this.$state = $state;

    this.Users = Users;
    this.$mdToast = $mdToast;
    console.log(this.user.cover.url);
  }

  $onInit() {
    this.searchText = null;
    this.selectedItem = null;    
    this.confirmationButton = false;
    this.user.fullname = `${this.capitalizeFirstLetter(this.user.first_name)} 
                          ${this.capitalizeFirstLetter(this.user.last_name)}`;
    this.user.avatar.url = this.changeStartOfAvatarUrl(this.user.avatar.url);
    this.user.cover.url = this.changeStartOfAvatarUrl(this.user.cover.url);
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

  resendConfirmationEmail() {
    this.confirmationButton = true;

    this.Users.sendConfirmationEmail()
         .then(() => {
          this.confirmationButton = false;
          this.$mdToast.show(
                this.$mdToast.simple()
                    .textContent('Email sent!'));

        })
        .catch(() => {
          this.confirmationButton = false; 
          this.$mdToast.show(
                this.$mdToast.simple()
                    .highlightClass('md-warn')
                    .textContent('Couldn\'t send the email!'));
        })

  }
}

export default ProfileController;
