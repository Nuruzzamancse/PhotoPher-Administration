import { Component, OnInit } from '@angular/core';
import { PhotographerService} from '../../services/photographer.service';
import { User} from '../../model/user';
import {Router} from '@angular/router';
import { PhotoService} from '../../services/photo.service';

@Component({
  selector: 'app-photographer',
  templateUrl: './photographer.component.html',
  styleUrls: ['./photographer.component.css']
})
export class PhotographerComponent implements OnInit {

  constructor(
    private photographerService: PhotographerService,
    private router: Router
  ) { }

  photographers: Array<User> = new Array<User>();

  ngOnInit() {

    this.photographerService.photographerLogin().subscribe(res=>{
      console.log(res.data);
      this.photographers = res.data;

    })
  }

  showPhotos(photographer){
    this.router.navigate([`/photos/${photographer._id}`]);
  }

  showAlbums(photographer){
    this.router.navigate([`/album/${photographer._id}`])
  }

}
