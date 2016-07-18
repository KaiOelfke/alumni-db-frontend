class NavbarController {
  constructor($rootScope, $state) {
    "ngInject";

    this.$state = $state;
    this.name = 'navbar';
    this.currentNavItem = 'home';
    this.dynamicNavTextTheme = 'nav';
    this.dynamicTheme = 'home';




    $rootScope.$on('$stateChangeSuccess', 
        (event, toState) => {

          this.currentNavItem = toState.name;

          switch (toState.name) {
            case 'home':
                this.dynamicNavTextTheme = 'nav';
                this.dynamicTheme = 'home';
                break;
            case 'events':
            case 'event':
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
          }
        }
    );  
  }

  goto(state) {
    this.$state.go(state);
  }

}

export default NavbarController;
