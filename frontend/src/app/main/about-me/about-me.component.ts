import { Component, OnInit } from '@angular/core';
import { SkillService } from '../../admin/project/skill.service';
import { Skill } from '../../admin/project/skill.model';
import { CommonModule } from '@angular/common';
import { FunFactService } from '../../admin/project/fun.facts.service';
import { FunFact } from '../../admin/project/fun.facts.model';

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.css',
  providers: [SkillService, FunFactService]
})
export class AboutMeComponent implements OnInit {
  skills: Skill[] = [];
  funfact: FunFact[] = [];

  constructor(private skillService: SkillService, private funfactService: FunFactService) { }


  ngOnInit(): void {
    this.loadSkills();
    this.loadFunFacts();
  }

  loadSkills() {
    this.skillService.getSkills().subscribe(skills => this.skills = skills); // Servis aracılığıyla skills verilerini çek
  }
  loadFunFacts() {
    this.funfactService.getFunFacts().subscribe(funfact => this.funfact = funfact); // Servis aracılığıyla skills verilerini çek
  }
}
