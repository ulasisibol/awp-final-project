// src/app/project.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from './project.model';

@Injectable({
    providedIn: 'root'
})
export class ProjectService {
    private apiUrl = 'http://localhost:3000/api/projects';  // API URL'inizi doğru adresle değiştirin

    constructor(private http: HttpClient) { }

    getProjects(): Observable<Project[]> {
        return this.http.get<Project[]>(this.apiUrl);
    }

    getProjectById(id: string): Observable<Project> {
        return this.http.get<Project>(`${this.apiUrl}/${id}`);
    }

    addProject(project: Project): Observable<Project> {
        return this.http.post<Project>(this.apiUrl, project);
    }

    updateProject(id: string, project: Project): Observable<Project> {
        return this.http.patch<Project>(`${this.apiUrl}/${id}`, project);
    }

    deleteProject(id: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }
}