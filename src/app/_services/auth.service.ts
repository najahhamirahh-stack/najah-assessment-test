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
                if (token) {
                    const cleanToken = token.toString().replace(/"/g, "");
                    localStorage.setItem('currentUserToken', cleanToken);
                }
                return token;
            }));
    }

    logout() {
        localStorage.removeItem('currentUserToken'); 
    }

    get token(): string {
        const rawToken = localStorage.getItem('currentUserToken');
        if (!rawToken) return null;
        
        return rawToken.replace(/"/g, ''); 
    }
}