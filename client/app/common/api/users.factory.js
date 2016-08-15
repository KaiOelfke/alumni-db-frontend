let UsersFactory = function ($http, $resource, Upload) {
  'ngInject';

  const APIHost = 'http://localhost:3000';
  const urlBase = APIHost + '/users';
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

  usersFactory.changeCover = (file) => {
    return Upload.upload({
      url: urlBase,
      method: 'PUT',
      data: {cover: file}
    });
  }

  usersFactory.sendConfirmationEmail = () => {
    return $http.post(APIHost + '/auth/confirmation',
                     {confirm_success_url,
                      config_name});
  }

  const resourceUrl = APIHost + '/users/:id';

  usersFactory.Resource = $resource(resourceUrl, null,
    {
      'update': { method:'PUT' }
    });  

  return usersFactory;
};

export default UsersFactory;
