let ApplicationsFactory = function ($resource, Upload, $http) {
  'ngInject';

  const APIHost = 'http://localhost:3000';

  const resourceUrl = APIHost + '/events/:event_id/applications/:id';

  const Resource = $resource(APIHost + '/events/:eventId/applications/:id', null,
    {
      'update': { method:'PUT' }
    });

  const getByUser = (userId, eventId) => {
    return $http.get(APIHost + '/events/'+ eventId+'/user_application?user_id='+userId);
  }

  const createApplication = (eventId, application) => {
    return Upload.upload({
      url: APIHost + '/events/'+eventId+'/applications',
      method: 'POST',
      data: {application}
    });
  }


  return {Resource, getByUser, createApplication};
};

export default ApplicationsFactory;
