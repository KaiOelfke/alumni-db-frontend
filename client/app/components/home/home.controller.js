class HomeController {
  constructor(Search, $state, $q) {
    'ngInject';
    this.$state = $state;
    this.search = Search;
    this.$q = $q;
    this.name = 'home';
    this.searchText = null;
    this.selectedItem = null;
    this.query = {
      back: true,
      next: true,
      page: 1
    };
    this.users = [];
  }

  searchTextChange() {
    this.search
        .userSearch(this.searchText, this.query.page)
        .then((resp)=> {
          this.users = resp.data.data;
          this.query.back = true;
          this.query.next = true;
        })
  }

  prevPage() {
    this.query.page = this.query.page - 1;
    this.searchTextChange();
  }

  nextPage() {
    this.query.page = this.query.page + 1;
    this.searchTextChange();
  }

  selectedItemChange() {

  }

  querySearch(searchText) {
    return this.$q.resolve({data: []}); 
  }
}

export default HomeController;
