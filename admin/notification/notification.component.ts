import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  notificationForm;
  notification;
  submitting: boolean = false;
  loading: boolean = true
  constructor(
    public fb: FormBuilder,
    public snackbar: MatSnackBar,
    public notificationService: NotificationService,
  ) { }

  ngOnInit() {
    this.loading = true;
    this.dataReload();
    this.notificationForm = this.fb.group({
      title:['',Validators.required],
      description: ['', Validators.required]
    });
  }
  dataReload() {
    this.notificationService.get()
        .subscribe(
          data => {
            this.loading = false;
            console.log('all data of pdfs >>', data);
            this.notification = data;
          },
          error => {
            this.loading = true;
            this.snackbar.open("Not connected to Database", 'ok', {
              duration: 2000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
            });
          }
        );}
    submit(){
      this.submitting = true;
      this.notificationService.add(this.notificationForm.value)
      .subscribe(
        data => {
          this.snackbar.open('file Uploded', 'ok', {
            duration: 2000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
          this.submitting = false;
          this.dataReload();
        },
        err => {
          this.snackbar.open('Pdf File Not Uploded','ok', {
            duration: 2000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        });
      this.submitting = false; }
    get description() {
        return this.notificationForm.get('description');
      }
    get title() {
        return this.notificationForm.get('title');
      }
      openDelete(data) {
        let removeConfirm = confirm("Are you sure to delete?");
        if (removeConfirm && data) {
          console.log('remove from database');
          this.notificationService.remove(data)
          .subscribe(
            dat => {
              this.snackbar.open('deleted', 'ok', {
                duration: 2000,
                horizontalPosition: 'center',
                verticalPosition: 'top',
              })
              console.log(data);
              this.dataReload();
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
}
