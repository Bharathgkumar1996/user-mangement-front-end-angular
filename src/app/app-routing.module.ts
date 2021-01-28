import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateUserComponent } from './create-user/create-user.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { FindUserComponent } from './find-user/find-user.component';

const routes: Routes = [
  { path: '',redirectTo: "user-create"  ,pathMatch: 'full'},
  { path: 'user-create' , component : CreateUserComponent},
  { path: 'user-details', component : UserDetailsComponent},
  { path: 'find-user' , component: FindUserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
