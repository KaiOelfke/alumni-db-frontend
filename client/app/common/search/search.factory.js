let SearchFactory = function ($http) {
  'ngInject';

  const urlBase = 'http://localhost:3000' + '/search';
  const searchService = {};

  searchService.userSearch = (searchText, page) => {
    return $http.get(urlBase, {
      params: {
        text: searchText,
        page: page
      }
    });
  };

  return searchService;
};

export default SearchFactory;
