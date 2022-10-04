import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CreatepostComponent } from './createpost/createpost.component';
import { AuthGuardService } from './services/auth-guard.service';
import { ListCatsComponent } from './list-cats/list-cats.component';
import { DetailsCatComponent } from './details-cat/details-cat.component';
import { EditCatComponent } from './edit-cat/edit-cat.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent },
  {path: 'register', component: RegisterComponent},
  {path: 'create', component: CreatepostComponent, canActivate: [AuthGuardService]},
  {path: 'cats', component: ListCatsComponent, canActivate: [AuthGuardService]},
  {path: 'cats/:id', component: DetailsCatComponent, canActivate: [AuthGuardService]},
  {path: 'cats/:id/edit', component: EditCatComponent, canActivate: [AuthGuardService]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
