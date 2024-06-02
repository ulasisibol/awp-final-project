import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FunFact } from './fun.facts.model';

@Injectable({
    providedIn: 'root'
})
export class FunFactService {
    private apiUrl = 'http://localhost:3000/api/funfacts'; // Adjust the API URL

    constructor(private http: HttpClient) { }

    getFunFacts(): Observable<FunFact[]> {
        return this.http.get<FunFact[]>(this.apiUrl);
    }

    addFunFact(fact: FunFact): Observable<FunFact> {
        return this.http.post<FunFact>(this.apiUrl, fact);
    }

    // FunFact güncelleme
    updateFunFact(fact: FunFact): Observable<FunFact> {
        return this.http.put<FunFact>(`${this.apiUrl}/${fact._id}`, fact);
    }

    // FunFact silme
    deleteFunFact(id: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }
}