import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Project } from '../../admin/project/project.model';
import { ProjectService } from '../../admin/project/project.service';
import { CommonModule } from '@angular/common';
import { Skill } from '../../admin/project/skill.model';
import { SkillService } from '../../admin/project/skill.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  homeParagraph: string = "";
  newWork: string = "";
  projects: Project[] = [];
  recentProjects: Project[] = [];
  skills: Skill[] = [];

  constructor(private http: HttpClient, private projectService: ProjectService, private skillService: SkillService) { }

  ngOnInit() {
    this.getTitle();
    this.getCurrentlyWork();
    this.loadProjects();
    this.loadSkills();
  }

  getTitle() {
    this.http.get<{ title: string }>('http://localhost:3000/api/title').subscribe((res) => {
      this.homeParagraph = res.title;
    });
  }

  getCurrentlyWork() {
    this.http.get<{ title: string }>('http://localhost:3000/api/newWork').subscribe((res) => {
      this.newWork = res.title;
    });
  }

  loadProjects() {
    this.projectService.getProjects().subscribe(projects => {
      // Sıralama işlemi, en yeni projeden en eskiye doğru
      this.projects = projects.sort((a, b) => {
        // createdAt değerlerini kontrol ederek Date objesi oluşturma
        const dateA = new Date(a.createdAt || new Date()); // Eğer undefined ise şimdiki zamanı kullan
        const dateB = new Date(b.createdAt || new Date()); // Eğer undefined ise şimdiki zamanı kullan
        return dateB.getTime() - dateA.getTime();
      });
      // En son eklenen üç projeyi al
      this.recentProjects = this.projects.slice(0, 3);
    }, error => {
      console.error('Error loading projects:', error);
    });
  }


  loadSkills() {
    this.skillService.getSkills().subscribe(skills => this.skills = skills); // Servis aracılığıyla skills verilerini çek
  }
}