class ProfileController {
  constructor() {
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

  searchTextChange() {

  }

  selectedItemChange() {

  }

  querySearch() {

  }
}

export default ProfileController;
