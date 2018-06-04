import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PhotoService} from '../../services/photo.service';

@Component({
  selector: 'app-albumphoto',
  templateUrl: './albumphoto.component.html',
  styleUrls: ['./albumphoto.component.css']
})
export class AlbumphotoComponent implements OnInit {


  constructor(
    private route: ActivatedRoute,
    private photoService: PhotoService,

  ) { }

  products : any = [];

  ngOnInit() {
    let id = this.route.snapshot.params.id;

    this.photoService.getAlbumsPhoto(id).subscribe(res=>{
      console.log(res);
      this.products = res.data;
    })
  }

  deletePhoto(photo){
    this.photoService.deletePhoto(photo._id).subscribe(res=>{
      if(res.success){
        this.products = this.products.filter((product)=>{
          return product._id!=photo._id;
        })
      }
    })
  }

}
