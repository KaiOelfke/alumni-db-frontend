let ParticipationsFactory = function ($resource, APIHost, $http) {
  'ngInject';

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
