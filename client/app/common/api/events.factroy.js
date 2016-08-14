let EventsFactory = function ($resource) {
  'ngInject';

  const APIHost = 'http://localhost:3000';

  const resourceUrl = APIHost + '/events/:id';

  const Resource = $resource(resourceUrl, null,
    {
      'update': { method:'PUT' }    
    });

  return {Resource};
};

export default EventsFactory;
