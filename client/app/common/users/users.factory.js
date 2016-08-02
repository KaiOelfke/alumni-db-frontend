let UsersFactory = function ($http) {
  'ngInject';

  const APIUrl = 'http://localhost:3000';
  const urlBase = APIUrl + '/users';
  const usersFactory = {};
  const confirm_success_url = window.location.origin + '/profile/email-confirmation';
  const config_name = 'default';

  usersFactory.getUsers = () => {
    return $http.get(urlBase);
  };

  usersFactory.insertUser = (user) => {
    return $http.post(urlBase, {
      user: user
    });
  };

  usersFactory.getUser = (id) => {
    return $http.get(urlBase + '/' + id);
  };

  usersFactory.sendConfirmationEmail = () => {
    return $http.post(APIUrl + '/auth/confirmation',
                     {confirm_success_url,
                      config_name});
  }

  return usersFactory;
};

export default UsersFactory;
