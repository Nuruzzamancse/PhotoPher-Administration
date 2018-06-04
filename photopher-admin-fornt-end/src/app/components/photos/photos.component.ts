import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PhotoService} from '../../services/photo.service';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private photoService: PhotoService,
    private router: Router
  ) { }

  products : any = [];

  ngOnInit() {
    // let id = this.route.snapshot.params.id;
    let id = 1234567889;

    // console.log('1234567889');

    this.photoService.getPhoto(id).subscribe(res=>{
      console.log('response');
      console.log(res.data);
      this.products = res.data;
    })
  }

  deletePhoto(photo){
    this.photoService.deletePhoto(photo._id).subscribe(res=>{
      console.log(res);
    })
  }

}
