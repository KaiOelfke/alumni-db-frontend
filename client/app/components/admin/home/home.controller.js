class HomeController {
  constructor(AclService, $rootScope, $auth, $location) {
    'ngInject';

    this.AclService = AclService;
    this.$rootScope = $rootScope;
    this.$auth = $auth;
    this.$location = $location;

  }

  $onInit() {
  }



}

export default HomeController;
