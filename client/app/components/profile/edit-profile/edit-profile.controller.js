class EditProfileController {
  constructor($state, $auth, ProfileUtilities, $mdToast) {
    'ngInject';

    this.ProfileUtilities = ProfileUtilities;
    this.$auth = $auth;
    this.$state = $state;
    this.$mdToast = $mdToast;
  }

  $onInit() {
    this.user.fullname = `${this.capitalizeFirstLetter(this.user.first_name)} 
                          ${this.capitalizeFirstLetter(this.user.last_name)}`;
    this.name = 'profile';
    this.searchText = null;
    this.selectedItem = null;
    this.years = this.ProfileUtilities.years;
    this.dateCheckRegex = this.ProfileUtilities.dateCheckRegex;
    this.countries = this.ProfileUtilities.countries;
    this.permittedCountries = this.ProfileUtilities.permittedCountries;
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }


  cancelEdit() {
    this.$state.go('profile');


  }

  saveEdit() {
    this.$auth
        .updateAccount(this.user)
        .then(() => {
      this.$state.go('profile');
    })
    .catch(() => {
        this.$mdToast.show(
              this.$mdToast.simple()
                  .highlightClass('md-warn')
                  .textContent('Your Profile isn\'t updated !'));
    });
  }



}

export default EditProfileController;
