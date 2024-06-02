// src/app/project.model.ts
export class Project {
    _id?: string;
    imageLink: string;
    cardTitle: string;
    projectName: string;
    description: string;
    liveLink?: string;
    githubLink?: string;
    createdAt?: Date;  // Modelinize createdAt ekleyin
    updatedAt?: Date;  // Modelinize updatedAt ekleyin

    constructor(
        imageLink: string = '',
        cardTitle: string = '',
        projectName: string = '',
        description: string = '',
        liveLink: string = '',
        githubLink: string = '',
        createdAt: Date = new Date(),  // Varsayılan değer olarak şimdiki zaman
        updatedAt: Date = new Date()
    ) {
        this.imageLink = imageLink;
        this.cardTitle = cardTitle;
        this.projectName = projectName;
        this.description = description;
        this.liveLink = liveLink;
        this.githubLink = githubLink;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}