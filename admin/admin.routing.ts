import { NgModule, Component} from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddPhotoComponent } from './add-photo/add-photo.component';
import { ShowPhotoComponent } from './show-photo/show-photo.component';
import { AddPdfComponent } from './add-pdf/add-pdf.component';
import { NotificationComponent } from './notification/notification.component';
import { AddCalendarComponent } from './add-calendar/add-calendar.component';

const adminRoute: Routes = [
  {
    path: 'home',
    component: HomeComponent},
  {
    path: 'add',
    component: AddPhotoComponent
  },
  {
    path: 'show/:id',
    component: ShowPhotoComponent
  },
  {
    path: 'pdf',
    component: AddPdfComponent
  },
  {
    path: 'notification',
    component: NotificationComponent
  },
  {
    path: 'calendar',
    component: AddCalendarComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(adminRoute)],
  exports: [RouterModule]
})
export class AdminRoutingModule {

}
