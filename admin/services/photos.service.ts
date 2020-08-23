import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';


@Injectable()
export class PhotoService {
    url: string;
    constructor(public http: HttpClient) {
        this.url = 'photos';

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

    upload(data: any, files: Array<any>, method) {
        // console.log('data ins ervice ,', data);
        // console.log('files ins ervice ,', files);
        return Observable.create((observer) => {
            const xhr = new XMLHttpRequest();
            const formData = new FormData();

            if (files.length) {
              for (var i=0; i<files.length; i++) {
                formData.append('img', files[i], files[i].name);}
            }
            for (let key in data) {
                formData.append(key, data[key]);
            }

            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        observer.next(xhr.response);
                    } else {
                        observer.error(xhr.response);
                    }
                }
            };
            let url = `${this.url}?token=${localStorage.getItem('token')}`
            if (method == 'PUT') {
                url = `${this.url}/${data._id}?token=${localStorage.getItem('token')}`
            }
            xhr.open(method, url, true);
            xhr.send(formData);
        });

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
