import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../admin/project/project.service';
import { Project } from '../../admin/project/project.model';
import { CommonModule } from '@angular/common';
import { SmallProjectService } from '../../admin/project/small.project.service';
import { SmallProject } from '../../admin/project/small.project.model';

@Component({
  selector: 'app-works',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './works.component.html',
  styleUrl: './works.component.css'
})
export class WorksComponent implements OnInit {
  projects: Project[] = [];
  recentProjects: Project[] = [];
  smallProjects: SmallProject[] = [];

  ngOnInit(): void {
    this.loadProjects();
    this.loadSmallProjects();
  }


  constructor(private projectService: ProjectService, private smallProjectService: SmallProjectService) { }

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
      this.recentProjects = this.projects;
    }, error => {
      console.error('Error loading projects:', error);
    });
  }



  loadSmallProjects() {
    this.smallProjectService.getProjects().subscribe(
      projects => this.smallProjects = projects,
      error => console.error('Error loading small projects:', error)
    );
  }
}
