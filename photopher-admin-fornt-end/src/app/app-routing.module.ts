import { CommonModule } from '@angular/common';
import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { LoginComponent} from "./components/login/login.component";
import { PhotographerComponent} from './components/photographer/photographer.component';
import { PhotosComponent} from './components/photos/photos.component';
import {AlbumsComponent} from './components/albums/albums.component';
import {AlbumphotoComponent} from './components/albumphoto/albumphoto.component';

const routes : Routes = [
  {path:'login', component: LoginComponent},
  {path:'photographer', component: PhotographerComponent},
  {path:'photos/:id', component: PhotosComponent},
  {path:'album/:id', component: AlbumsComponent},
  {path:'albumphoto/:id', component: AlbumphotoComponent}
]



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
