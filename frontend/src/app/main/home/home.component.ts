import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { Project } from '../../admin/project/project.model';
import { ProjectService } from '../../admin/project/project.service';
import { CommonModule } from '@angular/common';
import { Skill } from '../../admin/project/skill.model';
import { SkillService } from '../../admin/project/skill.service';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [ProjectService, SkillService]
})
export class HomeComponent implements OnInit {
  homeParagraph: string = "";
  newWork: string = "";
  projects: Project[] = [];
  recentProjects: Project[] = [];
  skills: Skill[] = [];


  constructor(private http: HttpClient, private projectService: ProjectService, private skillService: SkillService, @Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit() {
    this.getTitle();
    this.getCurrentlyWork();
    this.loadProjects();
    this.loadSkills();
    this.updateRecentProjects();
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
      this.projects = projects.sort((a, b) => {
        const dateA = new Date(a.createdAt || new Date());
        const dateB = new Date(b.createdAt || new Date());
        return dateB.getTime() - dateA.getTime();
      });
      this.updateRecentProjects();
    }, error => {
      console.error('Error loading projects:', error);
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.updateRecentProjects();
  }

  updateRecentProjects() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    } const screenWidth = window.innerWidth;
    let recentCount = 3;

    if (screenWidth < 500) {
      recentCount = 1;
    } else if (screenWidth < 990) {
      recentCount = 2;
    } else {
      recentCount = 3;
    }

    this.recentProjects = this.projects.slice(0, recentCount);
  }

  loadSkills() {
    this.skillService.getSkills().subscribe(skills => this.skills = skills); // Servis aracılığıyla skills verilerini çek
  }
}