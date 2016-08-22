class NavbarController {
  constructor($rootScope, $state, PageLoading, $transitions, $mdToast, $auth, AclService) {
    "ngInject";

    this.AclService = AclService;
    this.$state = $state;
    this.$transitions = $transitions;
    this.$rootScope = $rootScope;
    this.$auth = $auth;
    this.$mdToast = $mdToast;
    this.pageLoading = PageLoading;
  }

  $onInit(){
    this.name = 'navbar';
    this.currentNavItem = 'userPanel.home';
    this.dynamicNavTextTheme = 'nav';
    this.dynamicTheme = 'home';
    this.isShow = true;

    this.refresh(this.$state.current);
    
    this.$transitions.onBefore( {}, (transition)  => {
      transition.promise.then(this.refresh.bind(this));
    });
  }


  refresh(state) {
    this.currentNavItem = state.name;
    this.isShow = true;
    console.log(state);
    switch (state.name) {
      case 'userPanel.user':
      case 'userPanel.home':
          this.dynamicNavTextTheme = 'nav';
          this.dynamicTheme = 'home';
          this.currentNavItem = 'userPanel.home';  
          break;
      case 'userPanel.Events':
      case 'userPanel.Event':
          this.currentNavItem = 'userPanel.events';
          this.dynamicNavTextTheme = 'navDark';
          this.dynamicTheme = 'events';
          break; 
      case 'userPanel.profile':
      case 'userPanel.edit-profile':
      case 'userPanel.change-password':
          this.dynamicNavTextTheme = 'navDark';
          this.dynamicTheme = 'profile';
          this.currentNavItem = 'userPanel.profile';
          break;
      case 'userPanel.premium': 
          this.dynamicNavTextTheme = 'nav';
          this.dynamicTheme = 'premium';
          break;
      case 'signin':
      case 'signup':
      case 'registration':
      case 'unauthorized':
      case 'notfound':
      case 'confirmation':
      case 'reset-password':
          this.isShow = false;
    }

    console.log(this.dynamicTheme, this.currentNavItem)
  }

  logout() {
    return this.$auth.signOut()
      .then(() => {
        this.$state.go('signin');
      })
      .catch(() => {
        this.$mdToast.show(
            this.$mdToast.simple()
              .textContent('Couldn\'t complete your request.'));
      });
  }

  goto(state) {
    this.$state.go(state);
  }

}

export default NavbarController;
