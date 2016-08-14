let FeesFactory = function ($resource) {
  'ngInject';

  const APIHost = 'http://localhost:3000';

  const resourceUrl = APIHost + '/events/:event_id/fees/:id';

  const Resource = $resource(resourceUrl, {event_id: 'eventId', id: 'id'},
    {
      'update': { method:'PUT' }
    });

  return {Resource};
};

export default FeesFactory;
