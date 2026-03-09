import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import PouchDB from 'pouchdb';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private apiUrl = 'http://test-demo.aemenersol.com/api';
    private db = new PouchDB('local_user_db'); 

    constructor(private http: HttpClient) { }

    login(username: string, password: string) {
        return this.http.post(`${this.apiUrl}/account/login`, { username, password }, { responseType: 'text' })
            .pipe(map(token => {
                if (token) {
                    const cleanToken = token.toString().replace(/"/g, "");
                    localStorage.setItem('currentUserToken', cleanToken);
                    
                    this.saveUserToLocal(username);
                }
                return token;
            }));
    }

    private async saveUserToLocal(email: string) {
        try {
            const doc = { _id: 'last_logged_in_user', email: email, timestamp: new Date().toISOString() };
            await this.db.get('last_logged_in_user').then(oldDoc => {
                return this.db.put({ ...oldDoc, ...doc, _rev: oldDoc._rev });
            }).catch(() => {
                return this.db.put(doc);
            });
        } catch (err) {
            console.error('PouchDB Save Error:', err);
        }
    }

    async validateLocalUser(email: string): Promise<boolean> {
        try {
            const user: any = await this.db.get('last_logged_in_user');
            return user.email === email;
        } catch (err) {
            return false;
        }
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