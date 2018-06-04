import { Component, OnInit } from '@angular/core';
import { PhotographerService} from '../../services/photographer.service';
import { AlbumService} from '../../services/album.service';
import {PhotoService} from '../../services/photo.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit {

  constructor(
    private photographerService: PhotographerService,
    private albumService: AlbumService,
    private photoService: PhotoService,
    private router: Router
  ) { }

  products : any = [];

  ngOnInit() {
    // this.photographerService.publicAndPublicAlbumInfo('1234567889').subscribe(res=>{
    //   //console.log(res);
    // })

    this.albumService.publicAndPublicAlbumInfo('1234567889').subscribe(res=>{
      console.log(res);
      this.products = res.data;
    })
  }

  showPhotos(album){
    // this.photoService.getAlbumsPhoto(album._id).subscribe(res=>{
    //   console.log(res);
    // })

    this.router.navigate([`albumphoto/${album._id}`])
  }

}
