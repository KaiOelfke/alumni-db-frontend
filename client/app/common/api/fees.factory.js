let FeesFactory = function ($resource, APIHost) {
  'ngInject';


  const resourceUrl = APIHost + '/events/:eventId/fees/:id';

  const Resource = $resource(resourceUrl, null,
    {
      'update': { method:'PUT' }
    });

  return {Resource};
};

export default FeesFactory;
