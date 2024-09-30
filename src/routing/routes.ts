import { appRoutes } from 'appConstants';
import { HomePage, SigninPage, SignupPage } from 'containers';

export const routes = [
  {
    path: appRoutes.default,
    component: HomePage, // or redirect to Login if the user is not authenticated
    isProtected: true,
  },
  {
    path: appRoutes.signin,
    component: SigninPage,
    isProtected: false,
  },
  {
    path: appRoutes.signup,
    component: SignupPage,
    isProtected: false,
  },
  {
    path: appRoutes.home,
    component: HomePage,
    isProtected: true,
  },
];
