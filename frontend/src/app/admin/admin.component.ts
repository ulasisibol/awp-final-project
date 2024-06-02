import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Project } from './project/project.model';
import { ProjectService } from './project/project.service';
import { SmallProject } from './project/small.project.model';
import { SmallProjectService } from './project/small.project.service';
import { SkillService } from './project/skill.service';
import { Skill } from './project/skill.model';
import { FunFactService } from './project/fun.facts.service';
import { FunFact } from './project/fun.facts.model';
import { AuthService } from '../auth/auth.service';
import { AuthGuard } from '../auth/auth.guard';


@Component({
  selector: 'app-admin',
  standalone: true,
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  imports: [FormsModule, CommonModule, HttpClientModule],
  providers: [SkillService, FunFactService, ProjectService, SmallProjectService],
})
export class AdminComponent implements OnInit {
  newTitle: string = '';
  newWork: string = "";
  oldWork: string = "";
  projects: Project[] = [];
  selectedProject: Project = new Project();
  smallProjects: SmallProject[] = [];
  selectedSmallProject: SmallProject = new SmallProject();
  skills: Skill[] = [];
  selectedSkill: Skill = new Skill();

  funFacts: FunFact[] = [];
  selectedFact: FunFact = new FunFact();

  constructor(
    private http: HttpClient,
    private projectService: ProjectService,
    private smallProjectService: SmallProjectService,
    private skillService: SkillService,
    private funFactService: FunFactService) { }

  ngOnInit() {
    this.getTitle();
    this.getWork();
    this.loadProjects();
    this.loadSmallProjects();
    this.loadSkills();
    this.loadFunFacts();
  }

  // title

  onSubmitTitle() {
    console.log('Submitting update:', this.newTitle); // Log the title being submitted
    this.http.post<any>('http://localhost:3000/api/updateTitle1', { title: this.newTitle }).subscribe(
      (res) => {
        this.getTitle(); // Refresh the title after update
      },
      (error) => {
        console.error('Update error:', error); // Log any error
      }
    );
  }

  getTitle() {
    this.http.get<{ title: string }>('http://localhost:3000/api/title').subscribe((res) => {
      this.newTitle = res.title;
    });
  }

  // currentlyWork

  onSubmitNewWork() {
    console.log('Submitting update:', this.newWork); // Log the title being submitted
    this.http.post<any>('http://localhost:3000/api/updateNewWork', { title: this.newWork }).subscribe(
      (res) => {
        this.getWork(); // Refresh the title after update
      },
      (error) => {
        console.error('Update error:', error); // Log any error
      }
    );
  }

  getWork() {
    this.http.get<{ title: string }>('http://localhost:3000/api/newWork').subscribe((res) => {
      this.newWork = res.title;
      this.oldWork = res.title;
    });
  }

  // complate-app

  loadProjects() {
    this.projectService.getProjects().subscribe(projects => {
      this.projects = projects;
    });
  }

  resetForm() {
    this.selectedProject = new Project(); // Formu temizle ve yeni proje modeli ata
  }

  selectProject(project: Project) {
    this.selectedProject = { ...project };
  }

  addProject() {
    this.projectService.addProject(this.selectedProject).subscribe(() => {
      this.loadProjects();
      this.selectedProject = new Project(); // Formu temizle
    });
  }

  updateProject() {
    if (this.selectedProject._id) {
      this.projectService.updateProject(this.selectedProject._id, this.selectedProject).subscribe(() => {
        this.loadProjects();
      });
    }
  }

  deleteProject() {
    if (this.selectedProject._id) {
      this.projectService.deleteProject(this.selectedProject._id).subscribe(() => {
        this.loadProjects();
        this.selectedProject = new Project(); // Formu temizle
      });
    }
  }


  // Small Project
  loadSmallProjects() {
    this.smallProjectService.getProjects().subscribe(projects => this.smallProjects = projects);
  }

  selectSmallProject(project: SmallProject) {
    this.selectedSmallProject = { ...project };
  }

  resetSmallProjectForm() {
    this.selectedSmallProject = new SmallProject();
  }

  addSmallProject() {
    this.smallProjectService.addProject(this.selectedSmallProject).subscribe(() => {
      this.loadSmallProjects();
      this.resetSmallProjectForm();
    });
  }

  updateSmallProject() {
    if (this.selectedSmallProject._id) {
      this.smallProjectService.updateProject(this.selectedSmallProject).subscribe({
        next: (response) => {
          console.log('Update successful:', response);
          this.loadSmallProjects();
        },
        error: (error) => {
          console.error('Failed to update project:', error);
        }
      });
    } else {
      console.log('No ID found for the project');
    }
  }

  deleteSmallProject() {
    if (this.selectedSmallProject._id) {
      this.smallProjectService.deleteProject(this.selectedSmallProject._id).subscribe(() => {
        this.loadSmallProjects();
        this.resetSmallProjectForm();
      });
    }
  }


  // SKILLS
  loadSkills() {
    this.skillService.getSkills().subscribe(skills => this.skills = skills);
  }

  selectSkill(skill: Skill) {
    this.selectedSkill = { ...skill };
  }

  resetSkillForm() {
    this.selectedSkill = new Skill();
  }

  submitSkillForm() {
    if (this.selectedSkill._id) {
      this.updateSkill();
    } else {
      this.addSkill();
    }
  }

  addSkill() {
    this.skillService.addSkill(this.selectedSkill).subscribe(() => {
      this.loadSkills();
      this.resetSkillForm();
    });
  }

  updateSkill() {
    if (this.selectedSkill._id) {
      this.skillService.updateSkill(this.selectedSkill).subscribe(() => {
        this.loadSkills();
      });
    }
  }

  deleteSkill() {
    if (this.selectedSkill._id) {
      this.skillService.deleteSkill(this.selectedSkill._id).subscribe(() => {
        this.loadSkills();
        this.resetSkillForm();
      });
    }
  }


  // FUNFACTS

  loadFunFacts() {
    this.funFactService.getFunFacts().subscribe(facts => this.funFacts = facts);
  }

  selectFact(fact: FunFact) {
    this.selectedFact = { ...fact };
  }

  resetForm2() {
    this.selectedFact = new FunFact();
  }

  addFact() {
    this.funFactService.addFunFact(this.selectedFact).subscribe({
      next: (fact) => {
        console.log('Fun Fact added:', fact);
        this.loadFunFacts();
        this.resetForm2();
      },
      error: (error) => console.error('Failed to add Fun Fact:', error)
    });
  }

  updateFact() {
    if (this.selectedFact._id) {
      this.funFactService.updateFunFact(this.selectedFact).subscribe({
        next: (updatedFact) => {
          console.log('Fun Fact updated:', updatedFact);
          this.loadFunFacts();
        },
        error: (error) => console.error('Failed to update Fun Fact:', error)
      });
    }
  }

  deleteFact() {
    if (this.selectedFact._id) {
      this.funFactService.deleteFunFact(this.selectedFact._id).subscribe({
        next: () => {
          console.log('Fun Fact deleted');
          this.loadFunFacts();
          this.resetForm2();
        },
        error: (error) => console.error('Failed to delete Fun Fact:', error)
      });
    }
  }



}



