import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';


@Injectable()
export class CalendarService {
    url: string;
    constructor(public http: HttpClient) {
        this.url = 'calendar';

    }

    add(data: any) {
        return this.http.post(this.url, data, this.getOptions());
    }
    get() {
        return this.http.get(this.url, this.getOptions());

    }
    getById(id: string) {
        // return this.http.get(this.url + '/' + id, this.getOptions());
        return this.http.get(`${this.url}/${id}`, this.getOptions());
    }
    update(id: string, data: any) {
        return this.http.put(`${this.url}/${id}`, data, this.getOptions());

    }

    remove(id) {
        return this.http.delete(`${this.url}/${id}`, this.getOptions());

    }

    getOptions() {if (localStorage.getItem('token')) {
      let headers = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('token')
        })
    };
      return headers;
    } else {
      let headers = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };
      return headers;

    }
    }
}
