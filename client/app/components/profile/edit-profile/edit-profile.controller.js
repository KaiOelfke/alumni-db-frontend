class EditProfileController {
  constructor($state, $auth, Users, ProfileUtilities, $mdToast, Upload) {
    'ngInject';

    this.ProfileUtilities = ProfileUtilities;
    this.$auth = $auth;
    this.$state = $state;
    this.$mdToast = $mdToast;
    this.Users = Users;
  }

  $onInit() {
    this.isUploading = false;
    this.user.fullname = `${this.capitalizeFirstLetter(this.user.first_name)} 
                          ${this.capitalizeFirstLetter(this.user.last_name)}`;

    this.user.avatar.url  = this.changeStartOfAvatarUrl(this.user.avatar.url);
    this.name = 'profile';
    this.searchText = null;
    this.selectedItem = null;
    this.years = this.ProfileUtilities.years;
    this.dateCheckRegex = this.ProfileUtilities.dateCheckRegex;
    this.countries = this.ProfileUtilities.countries;
    this.permittedCountries = this.ProfileUtilities.permittedCountries;
  }

  changeStartOfAvatarUrl (url) {
    if (!(url.indexOf('http://') === 0 ||
         url.indexOf('https://') === 0)) {
      return 'http://localhost:3000' + url;
    }     
    return url; 
  }

  changeCoverImage($file) {


  }

  changeAvatar($file) {
    this.isUploading = true;    
    this.Users
        .changeAvatar($file)
        .then( (resp) => {
            this.isUploading = false;
            this.user.avatar.url = 
              this.changeStartOfAvatarUrl(resp.data.data.avatar.url);
            console.log('Success ',resp);
            //console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
        },  (resp) => {
            this.isUploading = false;          
            console.log('Error status: ' + resp);
        },  (evt)  =>{
            console.log('progress ' , evt);          
            //var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            //console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        });
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
