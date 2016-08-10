let UsersFactory = function ($http, Upload) {
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
      user
    });
  };

  usersFactory.getUser = (id) => {
    return $http.get(urlBase + '/' + id);
  };

  usersFactory.changeAvatar = (file) => {
    return Upload.upload({
      url: urlBase,
      method: 'PUT',
      data: {avatar: file}
    });
  }

  // not implemented in backend
  usersFactory.changeCover = (file) => {
    return Upload.upload({
      url: urlBase,
      method: 'PUT',
      data: {cover: file}
    });
  }

  usersFactory.sendConfirmationEmail = () => {
    return $http.post(APIUrl + '/auth/confirmation',
                     {confirm_success_url,
                      config_name});
  }

  return usersFactory;
};

export default UsersFactory;
