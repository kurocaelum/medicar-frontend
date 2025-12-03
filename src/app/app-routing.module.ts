import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginGuard } from './shared/guards/login.guard';
import { UserAuthenticatedGuard } from './shared/guards/user-authenticated.guard';

const routes: Routes = [
  {
    path: "",
    component: LoginComponent,
    canActivate: [UserAuthenticatedGuard]
  },
  {
    path: "signup",
    component: SignupComponent,
    canActivate: [UserAuthenticatedGuard]
  },
  {
    path: "home",
    component: HomeComponent,
    canActivate: [LoginGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
