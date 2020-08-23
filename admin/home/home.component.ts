import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  transfer = 'home';
  constructor(private adms: AdminService,
              public router: Router,
              public activeRoute: ActivatedRoute
) {
}
  ngOnInit() {

  }


}
