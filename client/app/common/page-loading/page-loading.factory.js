let PageLoadingFactory = function () {
  'ngInject';

  let state = false;
  const toggleLoading = () => {
    if (state) {
        state = false;
    } else {
        state = true;
    }
    return state;
  }

  const isLoading = () => {
    return state;
  }

  return {isLoading, toggleLoading};
}

export default PageLoadingFactory;
