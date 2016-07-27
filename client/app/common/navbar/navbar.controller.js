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

    this.$transitions.onSuccess( { to: '*' }, (transition)  => {
      const toState = transition.to();

      
      this.currentNavItem = toState.name;

      switch (toState.name) {
        case 'home':
            this.dynamicNavTextTheme = 'nav';
            this.dynamicTheme = 'home';
            break;
        case 'events':
        case 'event':
            this.currentNavItem = 'events';
            this.dynamicNavTextTheme = 'navDark';
            this.dynamicTheme = 'events';
            break; 
        case 'profile': 
            this.dynamicNavTextTheme = 'navDark';
            this.dynamicTheme = 'profile';
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
