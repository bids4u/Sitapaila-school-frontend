import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin.routing';
import { LoginComponent } from './login/login.component';
import { AdminService } from './services/admin.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { AuthGuardService } from './services/auth-guard.service';
import { HomeComponent } from './home/home.component';
import { MaterialModule } from 'src/app/material/material.module';
import { AddPhotoComponent } from './add-photo/add-photo.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { PhotoService } from './services/photos.service';
import { ShowPhotoComponent } from './show-photo/show-photo.component';
import { AddPdfComponent } from './add-pdf/add-pdf.component';
import { PdfService } from '././services/pdf.service';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { NotificationComponent } from './notification/notification.component';
import { NotificationService } from './services/notification.service';
import { AddCalendarComponent } from './add-calendar/add-calendar.component';
import { CalendarService } from './services/calendar.service';

@NgModule({
  // tslint:disable-next-line: max-line-length
  declarations: [LoginComponent, HomeComponent, AddPhotoComponent, ShowPhotoComponent, AddPdfComponent, NotificationComponent, AddCalendarComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule,
    NgxDropzoneModule,
    PdfViewerModule
  ],
  providers: [AdminService, AuthGuardService, PhotoService, PdfService, NotificationService ,CalendarService]
})
export class AdminModule { }
