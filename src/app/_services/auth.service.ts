import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private apiUrl = 'http://test-demo.aemenersol.com/api'; 

    constructor(private http: HttpClient) { }

    login(username: string, password: string) {
        return this.http.post(`${this.apiUrl}/account/login`, { username, password }, { responseType: 'text' }) 
            .pipe(map(token => {
                // Save token in localStorage if successful login
                if (token) {
                    localStorage.setItem('currentUserToken', token); 
                }
                return token;
            }));
    }

    logout() {
        localStorage.removeItem('currentUserToken'); 
    }

    public get token(): string | null {
        return localStorage.getItem('currentUserToken'); 
    }
}