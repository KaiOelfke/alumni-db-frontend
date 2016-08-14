let ApplicationsFactory = function ($resource) {
  'ngInject';

  const APIHost = 'http://localhost:3000';

  const resourceUrl = APIHost + '/events/:event_id/applications/:id';

  const Resource = $resource(resourceUrl, {event_id: 'eventId', id: 'id'},
    {
      'update': { method:'PUT' }
    });

  return {Resource};
};

export default ApplicationsFactory;
