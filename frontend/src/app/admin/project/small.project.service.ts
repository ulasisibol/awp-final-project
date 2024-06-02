// small-project.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SmallProject } from './small.project.model';

@Injectable({
    providedIn: 'root'
})
export class SmallProjectService {
    private apiUrl = 'http://localhost:3000/api/smallProjects'; // Adjust as needed

    constructor(private http: HttpClient) { }

    getProjects(): Observable<SmallProject[]> {
        return this.http.get<SmallProject[]>(this.apiUrl);
    }

    getProjectById(id: string): Observable<SmallProject> {
        return this.http.get<SmallProject>(`${this.apiUrl}/${id}`);
    }

    addProject(project: SmallProject): Observable<SmallProject> {
        return this.http.post<SmallProject>(this.apiUrl, project);
    }

    // small-project.service.ts
    updateProject(project: SmallProject): Observable<SmallProject> {
        return this.http.patch<SmallProject>(`${this.apiUrl}/${project._id}`, project);
    }

    deleteProject(id: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }
}