import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HumanComponent } from './human/human.component';
import { HeaderComponent } from './header/header.component';
import { DroidComponent } from './droid/droid.component';
import { WookieComponent } from './wookie/wookie.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TableComponent } from './table/table.component';
import { FormComponent } from './form/form.component';
import { MoviesComponent } from './movies/movies.component';
import { MovieTitlePipe } from './movie-title.pipe';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HumanComponent,
    HeaderComponent,
    DroidComponent,
    WookieComponent,
    TableComponent,
    FormComponent,
    MoviesComponent,
    MovieTitlePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
