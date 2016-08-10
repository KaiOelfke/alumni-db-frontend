let DiscountsFactory = function ($resource) {
  'ngInject';

  const APIHost = 'http://localhost:3000';

  const resourceUrl = APIHost + '/subscriptions/discounts/:id';

  const Resource = $resource(resourceUrl, null,
    {
      'update': { method:'PUT' }    
    });

  return {Resource};
};

export default DiscountsFactory;




