let EventsFactory = function ($resource, APIHost, Upload) {
  'ngInject';

  const resourceUrl = APIHost + '/events/:id';

  const eventTypes = [{name: 'Without Application and Payment',
                       id: 'without_application_payment'},
                      {name: 'With only Payment',
                       id: 'with_payment'},
                      {name: 'With only Application',
                       id: 'with_application'},
                      {name: 'With Payment and Application',
                       id: 'with_payment_application'}];

  const create = (event) => {
    return Upload.upload({
      url: APIHost + '/events',
      method: 'POST',
      data: {event}
    });
  };

  const changeAvatar = (eventId, file) => {
    return Upload.upload({
      url: APIHost + '/events/' + eventId,
      method: 'PUT',
      data: {event: {logo_photo: file}}
    });
  }

  const changeCover = (eventId, file) => {
    return Upload.upload({
      url: APIHost + '/events/' + eventId,
      method: 'PUT',
      data: {event: {cover_photo: file}}
    });
  }

  const Resource = $resource(resourceUrl, null,
    {
      'update': { method:'PUT' }    
    });

  return {Resource, create, changeAvatar, changeCover, eventTypes};
};

export default EventsFactory;
