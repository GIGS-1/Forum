import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {FormsModule} from '@angular/forms';
import { MainComponent } from './main/main.component';
import {HttpClientModule} from '@angular/common/http';
import { AdminComponent } from './admin/admin.component';
import { CategoryComponent } from './category/category.component';
import { ToCategoryPipe } from './to-category.pipe';
import { ToThreadPipe } from './to-thread.pipe';
import { ThreadComponent } from './thread/thread.component';
import { ToCommentPipe } from './to-comment.pipe';
import {DatePipe} from '@angular/common';
import { CreateThreadComponent } from './create-thread/create-thread.component';
import { ToUserPipe } from './to-user.pipe';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    MainComponent,
    AdminComponent,
    CategoryComponent,
    ToCategoryPipe,
    ToThreadPipe,
    ThreadComponent,
    ToCommentPipe,
    CreateThreadComponent,
    ToUserPipe,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
