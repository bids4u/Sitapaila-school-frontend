import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { PhotoService } from 'src/admin/services/photos.service';
import { environment } from 'src/environments/environment';
import { PdfService } from 'src/admin/services/pdf.service';
import { CalendarService } from 'src/admin/services/calendar.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  pdf;
  url;
  calendar;
  photos;
  loading: boolean ;
  constructor(
    public snackbar: MatSnackBar,
    public photoService: PhotoService,
    public pdfService: PdfService,
    public calService: CalendarService
  ) { this.url = environment.Img_URL;}

  ngOnInit() {

    this.dataReload();

    this.dataPdf();
    this.calReload();
  }
  dataReload() {
    this.loading = true;
    this.photoService.get()
        .subscribe(
          data => {
            this.loading = false;
            // console.log('all data of photos >>', data);
            this.photos = data;
          },
          error => {
            this.loading = false;

            this.snackbar.open("Not connected to Database", 'ok', {
              duration: 2000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
            });
          }
        );
  }
  dataPdf() {
    this.loading = true;
    this.pdfService.get()
        .subscribe(
          data => {
            this.loading = false;
            // console.log('all data of pdfs >>', data);
            this.pdf = data;
          },
          error => {
            this.loading = false;
            this.snackbar.open("Not connected to Database", 'ok', {
              duration: 2000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
            });
          }
        );}

  calReload() {
          this.loading = true;
          this.calService.get()
              .subscribe(
                data => {
                  this.loading = false;
                  // console.log('all data of pdfs >>', data);
                  this.calendar = this.sortData(data);
                },
                error => {
                  this.loading = false;
                  this.snackbar.open("Not connected to Database", 'ok', {
                    duration: 2000,
                    horizontalPosition: 'center',
                    verticalPosition: 'top',
                  });
                }
      );}

  sortData(data) {
      return data.sort((a, b) => {
      return <any>new Date(a.eventd) - <any>new Date(b.eventd);
            });
            }
}
