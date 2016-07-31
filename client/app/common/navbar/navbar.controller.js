class NavbarController {
  constructor($rootScope, $state, $transitions) {
    "ngInject";

    this.$state = $state;
    this.$transitions = $transitions;
    this.$rootScope = $rootScope;
  }

  $onInit(){

    this.name = 'navbar';
    this.currentNavItem = 'home';
    this.dynamicNavTextTheme = 'nav';
    this.dynamicTheme = 'home';
    this.isShow = true;


    this.$transitions.onEnter( {}, (AuditService, state, transition)  => {
      console.log(AuditService, state, transition)
      const toState = state;

      this.isShow = true;
      this.currentNavItem = toState.name;

      switch (toState.name) {
        case 'user':
        case 'home':
            this.dynamicNavTextTheme = 'nav';
            this.dynamicTheme = 'home';
            this.currentNavItem = 'home';            
            break;
        case 'events':
        case 'event':
            this.currentNavItem = 'events';
            this.dynamicNavTextTheme = 'navDark';
            this.dynamicTheme = 'events';
            break; 
        case 'profile':
        case 'edit-profile':
            this.dynamicNavTextTheme = 'navDark';
            this.dynamicTheme = 'profile';
            this.currentNavItem = 'profile';
            break;
        case 'premium': 
            this.dynamicNavTextTheme = 'nav';
            this.dynamicTheme = 'premium';
            break;
        case 'signin':
        case 'signup':
        case 'registration':
        case 'unauthorized':
        case 'notfound':
            this.isShow = false;
      }
      
    });

  }

  goto(state) {
    this.$state.go(state);
  }

}

export default NavbarController;
