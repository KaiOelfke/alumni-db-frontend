class ProfileController {
  constructor($state) {
    'ngInject';

    this.$state = $state;
    this.name = 'profile';
    this.searchText = null;
    this.selectedItem = null;

    this.todos = [];
    for (var i = 0; i < 10; i++) {
      this.todos.push({
        what: "Brunch this weekend?",
        who: "Min Li Chan",
        notes: "I'll be in your neighborhood doing errands."
      });
    }

  }

  $onInit() {
    this.user.fullname = `${this.capitalizeFirstLetter(this.user.first_name)} 
                          ${this.capitalizeFirstLetter(this.user.last_name)}`;
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  editProfile() {
    this.$state.go('edit-profile');
  }

}

export default ProfileController;
