let DiscountsFactory = function ($resource, APIHost) {
  'ngInject';

  const resourceUrl = APIHost + '/subscriptions/discounts/:id';

  const Resource = $resource(resourceUrl, null,
    {
      'update': { method:'PUT' }    
    });

  return {Resource};
};

export default DiscountsFactory;




