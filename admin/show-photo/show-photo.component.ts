import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { PhotoService } from '../services/photos.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-show-photo',
  templateUrl: './show-photo.component.html',
  styleUrls: ['./show-photo.component.css']
})
export class ShowPhotoComponent implements OnInit {
  imgUrl: string;
  photo;
  photoId;
  loading: boolean = false;
  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public photoService: PhotoService,
    public snackbar: MatSnackBar
    ) {
      this.imgUrl = environment.Img_URL;
    }

  ngOnInit() {
    this.loading=true;
    this.onReload();

  }
  onReload()
  {
    this.photoId = this.activeRoute.snapshot.params['id'];
    this.photoService.getById(this.photoId)
      .subscribe(
        (data: any) => {
          this.loading = false;
          console.log('data is here >>>', data);
          this.photo = data;
        },
        error => {
          this.loading = false;
          this.snackbar.open(error, 'ok', {
            duration: 2000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        }
      );
  }
  onDelete(id,i) {
    let removeConfirm = confirm("Are you sure to delete?");
    console.log(id,i)
    if (removeConfirm) {
    this.photoService.update(id, {index: i})
    .subscribe(
      data => {
        this.snackbar.open('Photo Deleted', 'ok', {
          duration: 2000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
        this.onReload();
      },
      error => {
        console.log(error);
        this.snackbar.open('Photo not Deleted', 'ok', {
          duration: 2000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      }
    ); }
  }
}
