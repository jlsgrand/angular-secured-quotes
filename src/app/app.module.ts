import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {RouterModule} from "@angular/router";
import {QuoteListComponent} from './quote-list/quote-list.component';
import {UserListComponent} from './user-list/user-list.component';
import {QuoteDetailsComponent} from './quote-details/quote-details.component';
import {LoginComponent} from './login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthGuard} from "./auth.guard";
import {JwtInterceptor} from "./jwt.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    QuoteListComponent,
    UserListComponent,
    QuoteDetailsComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {
        path: '',
        component: QuoteListComponent,
        canActivate: [AuthGuard],
        data: {roles: ["ROLE_READER", "ROLE_CREATOR", "ROLE_ADMIN"]}
      },
      {
        path: 'quote/:id',
        component: QuoteDetailsComponent,
        canActivate: [AuthGuard],
        data: {roles: ["ROLE_CREATOR", "ROLE_ADMIN"]}
      },
      {path: 'admin', component: UserListComponent, canActivate: [AuthGuard], data: {roles: ["ROLE_ADMIN"]}},
      {path: 'login', component: LoginComponent},
      {
        path: '**',
        component: QuoteListComponent,
        canActivate: [AuthGuard],
        data: {roles: ["ROLE_READER", "ROLE_CREATOR", "ROLE_ADMIN"]}
      }
    ]),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
