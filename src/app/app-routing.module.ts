import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import {
  canActivate,
  redirectUnauthorizedTo,
  redirectLoggedInTo,
} from "@angular/fire/auth-guard";

// Send unauthorized users to login
const redirectUnauthorizedToLogin = () =>
  redirectUnauthorizedTo(["./login/login.module"]);

// Automatically log in users
function redirectLoggedInToHome() {
  return redirectLoggedInTo(["./tabs/tabs.module"]);
}

const routes: Routes = [
  {
    path: "",
    //...canActivate(redirectUnauthorizedToLogin),
    redirectTo: "register",
    pathMatch: "full",
  },
  {
    path: "login",
    loadChildren: () =>
      import("./login/login.module").then((m) => m.LoginPageModule),
    //...canActivate(redirectLoggedInToHome),
  },
  {
    path: "register",
    loadChildren: () =>
      import("./register/register.module").then((m) => m.RegisterPageModule),
  },
  {
    path: "home",
    loadChildren: () =>
      import("./tabs/tabs.module").then((m) => m.TabsPageModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

/* // Send unauthorized users to login
const redirectUnauthorizedToLogin = () =>
  redirectUnauthorizedTo(['./login/login.module']);
 
// Automatically log in users
function redirectLoggedInToHome() {
  return redirectLoggedInTo(['./tabs/tabs.module']);
}

const routes: Routes = [
  {
    path: '',
    //...canActivate(redirectUnauthorizedToLogin),
    redirectTo: 'register', pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule),
    //...canActivate(redirectLoggedInToHome),
  }, */
