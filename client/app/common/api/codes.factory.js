let CodesFactory = function ($http, $resource) {
  'ngInject';

  const APIHost = 'http://localhost:3000';
  const urlBase = APIHost + '/events';


  const getCodes = function(eventId) {
    return $http.get(urlBase+'/all_codes_for_event/?event_id=' + eventId);
  };

  const validateCode = function(eventId, code) {
    return $http.get(urlBase + '/valdiate_code/?event_id=' + eventId + 
    										'&code=' + code);
  };

 	// code :: user_id, fee_id
  const createCode = function(code) {
    return $http.post(urlBase + '/fee_codes', {
      code,
    });
  };

  const removeCode = function(id) {
    return $http.delete(urlBase + '/fee_codes/' + id);
  };

  return {getCodes,
  				validateCode,
  				createCode,
  				removeCode};
};

export default CodesFactory;




