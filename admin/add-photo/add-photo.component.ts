import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { PhotoService } from '../services/photos.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-add-photo',
  templateUrl: './add-photo.component.html',
  styleUrls: ['./add-photo.component.css']
})
export class AddPhotoComponent implements OnInit {
  url;
  photos;
  photoForm: FormGroup;
  submitting: boolean = false;
  loading: boolean = true
  fsubmit = false;
  files: File[] = [];
  constructor(
    public fb: FormBuilder,
    public router: Router,
    public snackbar: MatSnackBar,
    public photoService: PhotoService,
    ) {this.url = environment.Img_URL;  }

  ngOnInit() {
    this.loading = true;
    this.dataReload();
    this.photoForm = this.fb.group({
      description: ['', Validators.required]
    });
  }
  get description() {
    return this.photoForm.get('description');
  }
  onSelect(event) {
	  console.log(event);
   this.files.push(...event.addedFiles);
   if (this.files.length) {this.fsubmit = true; }else {this.fsubmit = false; }
	}

	onRemove(event) {
	//  console.log(event);
   this.files.splice(this.files.indexOf(event), 1);
   if (this.files.length) {this.fsubmit = true; } else {this.fsubmit = false; }
	 }
  submit() {

    this.submitting = true;
    this.photoService.upload(this.photoForm.value, this.files, 'POST')
      .subscribe(
        data => {
          this.snackbar.open('Photo added successfully', 'ok', {
            duration: 2000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
          // this.photos.image.push(this.files.);
          this.files = [];
          this.photoForm.setValue({description: ''});
          this.submitting = false;
          this.dataReload();
        },
        error => {
          this.submitting = false;
          console.log(error);
          this.snackbar.open(error, 'ok', {
            duration: 2000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        }
      );
  }
  openDelete(data, i) {
    let removeConfirm = confirm("Are you sure to delete?");
    if (removeConfirm && data) {
      console.log('remove from database');
      this.photoService.remove(data)
      .subscribe(
        dat => {
          this.snackbar.open('deleted', 'ok', {
            duration: 2000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          })
          console.log(data);
          this.photos.splice(i, 1);
        },
        error => {
          this.snackbar.open('cannot deleted', 'ok', {
            duration: 2000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          })
          console.log(data);
        }
      );
  } }
  dataReload() {
    this.photoService.get()
        .subscribe(
          data => {
            this.loading = false;
            console.log('all data of photos >>', data);
            this.photos = data;
          },
          error => {
            this.loading = true;

            this.snackbar.open("Not connected to Database", 'ok', {
              duration: 2000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
            });
          }
        );
  }

}
