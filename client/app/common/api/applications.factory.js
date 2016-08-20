let ApplicationsFactory = function ($resource, $http) {
  'ngInject';

  const APIHost = 'http://localhost:3000';

  const resourceUrl = APIHost + '/events/:event_id/applications/:id';

  const Resource = $resource(APIHost + '/events/:eventId/applications/:id', null,
    {
      'update': { method:'PUT' }
    });

  const getByUser = (userId, eventId) => {
    return $http.get(APIHost + '/events/user_application?user_id='+userId+'&event_id='+eventId);
  }


  return {Resource, getByUser};
};

export default ApplicationsFactory;
