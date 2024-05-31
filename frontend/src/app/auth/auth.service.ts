import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(private http: HttpClient) { }


    login(username: string, password: string) {
        return this.http.post<{ token: string }>('http://localhost:3000/api/login', { username, password }).pipe(
            tap(response => {
                localStorage.setItem('token', response.token);
            }),
            catchError(error => {
                console.error('Login error:', error);
                return throwError(() => new Error('Login failed, please try again later.'));
            })
        );
    }
}