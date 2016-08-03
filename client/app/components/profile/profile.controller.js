class ProfileController {
  constructor($state, Users, $mdToast) {
    'ngInject';

    this.$state = $state;

    this.Users = Users;
    this.$mdToast = $mdToast;

  }

  $onInit() {
    this.searchText = null;
    this.selectedItem = null;    
    this.confirmationButton = false;
    this.user.fullname = `${this.capitalizeFirstLetter(this.user.first_name)} 
                          ${this.capitalizeFirstLetter(this.user.last_name)}`;
    console.log(this.user);
    if (!(this.user.avatar.url.indexOf('http://') == 0 ||
        this.user.avatar.url.indexOf('https://') == 0)) {
      this.user.avatar.url = 'http://localhost:3000'+ this.user.avatar.url;
    }                          
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  editProfile() {
    this.$state.go('edit-profile');
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
