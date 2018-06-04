import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';


import { AppComponent } from './app.component';
import { AuthService} from "./services/atuh.service";
import { LoginComponent } from './components/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import {HttpModule} from '@angular/http';
import { PhotographerComponent } from './components/photographer/photographer.component';
import {PhotographerService} from './services/photographer.service';
import { PhotosComponent } from './components/photos/photos.component';
import {PhotoService} from './services/photo.service';
import { AlbumsComponent } from './components/albums/albums.component';
import {UserService} from './services/user.service';
import {AlbumService} from './services/album.service';
import { AlbumphotoComponent } from './components/albumphoto/albumphoto.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PhotographerComponent,
    PhotosComponent,
    AlbumsComponent,
    AlbumphotoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [
    AuthService,
    PhotographerService,
    PhotoService,
    UserService,
    AlbumService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
