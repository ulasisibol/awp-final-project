import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Skill } from './skill.model';

@Injectable({
    providedIn: 'root'
})
export class SkillService {
    private apiUrl = 'http://localhost:3000/api/skills';  // API URL'inizi buraya yazın

    constructor(private http: HttpClient) { }

    getSkills(): Observable<Skill[]> {
        return this.http.get<Skill[]>(this.apiUrl);
    }

    addSkill(skill: Skill): Observable<Skill> {
        return this.http.post<Skill>(this.apiUrl, skill);
    }

    updateSkill(skill: Skill): Observable<Skill> {
        return this.http.put<Skill>(`${this.apiUrl}/${skill._id}`, skill);
    }

    deleteSkill(id: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }
}