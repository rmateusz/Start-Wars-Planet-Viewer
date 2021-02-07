import history from '../../history';

const navigateToRoot = (params = undefined) => {
    history.push({
        pathname: "/",
        state: params
    });
};

const replaceToRoot = (params = undefined) => {
    history.replace({
        pathname: "/",
        state: params
    });
};

const navigateTo = (route, params = undefined) => {
    history.push({
        pathname: route,
        state: params
    });
};

const navigateBack = () => {
    history.goBack();
};

const navigateForward = () => {
    history.goForward();
};

const navigation =  {
    navigateToRoot,
    navigateTo,
    navigateBack,
    navigateForward,
    replaceToRoot
};

export default navigation;
