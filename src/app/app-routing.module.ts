import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from './main/main.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {CategoryComponent} from './category/category.component';
import {ThreadComponent} from './thread/thread.component';
import {CreateThreadComponent} from './create-thread/create-thread.component';
import {ProfileComponent} from './profile/profile.component';

const routes: Routes = [
  {path: '', component: MainComponent, pathMatch: 'full'},
  {path: 'login', component: LoginComponent, pathMatch: 'full'},
  {path: 'register', component: RegisterComponent, pathMatch: 'full'},
  {path: 'category/:id', component: CategoryComponent, pathMatch: 'full'},
  {path: 'thread/:id', component: ThreadComponent, pathMatch: 'full'},
  {path: 'createThread/:id', component: CreateThreadComponent, pathMatch: 'full'},
  {path: 'profile/:id', component: ProfileComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
