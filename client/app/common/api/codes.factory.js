let CodesFactory = function ($http, APIHost, $resource) {
  'ngInject';

  const urlBase = APIHost + '/events';

  const getCodes = function(eventId) {
    return $http.get(urlBase + '/' + eventId + '/fee_codes');
  };

  const validateCode = function(eventId, code) {
    return $http.get(urlBase + '/' + eventId +'/validate_code?code='+code);
  };

 	// code :: user_id, fee_id
  const createCode = function(eventId, fee_code) {
    return $http.post(urlBase + '/' + eventId + '/fee_codes', {
      fee_code,
    });
  };

  const removeCode = function(eventId, id) {
    return $http.delete(urlBase + '/' + eventId + '/fee_codes/' + id);
  };

  return {getCodes,
  				validateCode,
  				createCode,
  				removeCode};
};

export default CodesFactory;




