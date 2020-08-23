import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { CalendarService } from '../services/calendar.service';

@Component({
  selector: 'app-add-calendar',
  templateUrl: './add-calendar.component.html',
  styleUrls: ['./add-calendar.component.css']
})
export class AddCalendarComponent implements OnInit {

  minDate: Date;
  maxDate: Date;
  calendar;
  calendarForm;
  submitting: boolean = false;
  loading: boolean = true
  constructor(
    public fb: FormBuilder,
    public snackbar: MatSnackBar,
    public notificationService: CalendarService,
  ) {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date();
    this.maxDate = new Date(currentYear + 1, 11, 31);
  }

  ngOnInit() {
    this.loading = true;
    this.dataReload();
    this.calendarForm = this.fb.group({
      title:['',Validators.required],
      eventd: ['', Validators.required],
      eventType: ['',Validators.required]
    });
  }
  dataReload() {
    this.notificationService.get()
        .subscribe(
          data => {
            this.loading = false;
            console.log('all data of pdfs >>', data);
            this.calendar = this.sortData(data);
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
  get eventd() {
          return this.calendarForm.get('eventd');
        }
  get title() {
          return this.calendarForm.get('title');
        }
  get eventType() {
          return this.calendarForm.get('eventType')
  }
  submit(){
          this.submitting = true;
          this.notificationService.add(this.calendarForm.value)
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
   }
}

 sortData(data) {
            return data.sort((a, b) => {
              return <any>new Date(a.eventd) - <any>new Date(b.eventd);
            });
          }
}
