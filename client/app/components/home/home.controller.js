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
    this.query.next = false;
    if (this.query.page > 1) {
      this.query.back = true;
    } else {
      this.query.back = false;
    }

    this.search
        .userSearch(this.searchText, this.query.page)
        .then((resp)=> {
          this.users = resp.data.data.users.map((user) => {
            user.avatar.url = this.changeStartOfAvatarUrl(user.avatar.url);
            return user;
          });

          if (resp.data.data.total_count > this.query.page * 10 ) {
            this.query.next = false;
          } else {
            this.query.next = true;
          }

        }, () => {
          this.query.next = true;
        });
  }

  changeStartOfAvatarUrl (url) {
    if (!(url.indexOf('http://') === 0 ||
         url.indexOf('https://') === 0)) {
      return 'http://localhost:3000' + url;
    }     
    return url; 
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
