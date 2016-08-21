let ParticipationsFactory = function ($resource, $http) {
  'ngInject';

  const APIHost = 'http://localhost:3000';

  const resourceUrl = APIHost + '/events/:eventId/participations/:id';

  const Resource = $resource(resourceUrl, null,
    {
      'update': { method:'PUT' }
    });

  const getByUser = (userId, eventId) => {
    return $http.get(APIHost + '/events/'+ eventId+'/user_participation?user_id='+userId);
  }

  return {Resource, getByUser};
};

export default ParticipationsFactory;
