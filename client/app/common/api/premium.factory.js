let PremiumFactory = function ($http, APIHost, $q) {
  'ngInject';

  const clientTokenUrl = APIHost + '/subscriptions/client_token';
  const subscriptionUrl = APIHost + '/subscriptions';

  const getClientToken = () => {
    return $http.get(clientTokenUrl)
         .then((clientTokenResponse) => {
            if (clientTokenResponse.status !== 200) {
              return $q.reject(new Error('cann\'t get clienttoken'));
            }
            return $q.resolve(clientTokenResponse.data.clientToken);
          });
  };

  // subscription: {payment_method_nonce, user_id}

  const subscribe = (subscription) => {
    return $http.post(subscriptionUrl, {
      subscription
    });
  };

  const destroySubscription = (id) => {
    return $http.delete(subscriptionUrl + '/' + id);
  };

  const editSubscription = (id, subscription) => {
    return $http.put(subscriptionUrl + '/' + id, {
      subscription
    });
  };

  const getSubscription = (userId) => {
    return $http.get(subscriptionUrl + '/' + userId);
  };

  return {getClientToken, subscribe,
          destroySubscription, editSubscription,
          getSubscription};
};

export default PremiumFactory;
