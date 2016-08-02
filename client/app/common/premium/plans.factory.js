let PlansFactory = function ($http) {
  'ngInject';

  const APIHost = 'http://localhost:3000';
  const urlBase = APIHost + '/subscriptions/plans';
  const plansFactory = {};

  const insertPlan = function(plan) {
    return $http.post(urlBase, {
      plan
    });
  };

  const destroyPlan = function(id) {
    return $http.delete(urlBase + '/' + id);
  };

  const editPlan = function(id, plan) {
    return $http.put(urlBase + '/' + id, {
      plan,
    });
  };

  const getPlan = function(id) {
    return $http.get(urlBase + '/' + id);
  };

  const getAllPlans = function() {
    return $http.get(urlBase);
  };

  return {insertPlan, destroyPlan,
          editPlan, getPlan,
          getAllPlans};
};

export default PlansFactory;




