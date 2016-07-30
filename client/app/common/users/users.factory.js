let UsersFactory = function ($http) {
  'ngInject';

  const urlBase = 'http://localhost:3000' + '/users';
  const usersFactory = {};

  usersFactory.getUsers = function() {
    return $http.get(urlBase);
  };

  usersFactory.insertUser = function(user) {
    return $http.post(urlBase, {
      user: user
    });
  };

  usersFactory.getUser = function(id) {
    return $http.get(urlBase + '/' + id);
  };

  return usersFactory;
};

export default UsersFactory;
