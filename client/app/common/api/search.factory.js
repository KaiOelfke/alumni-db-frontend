let SearchFactory = function ($http, APIHost) {
  'ngInject';

  const urlBase = APIHost + '/search';
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
