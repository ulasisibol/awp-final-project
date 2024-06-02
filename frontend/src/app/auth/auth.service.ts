import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private http: HttpClient) { }

    login(username: string, password: string) {
        return this.http.post<{ token: string }>('http://localhost:3000/api/login', { username, password }).pipe(
            tap(response => {
                localStorage.setItem('token', response.token);  // Token'ı localStorage'a kaydetme
            })
        );
    }

    logout() {
        localStorage.removeItem('token');  // Token'ı kaldır
    }

    getToken(): string {
        return localStorage.getItem('token') || '';
    }
} 