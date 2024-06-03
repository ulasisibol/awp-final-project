export class Project {
    _id?: string;
    imageLink: string;
    cardTitle: string;
    projectName: string;
    description: string;
    liveLink?: string;
    githubLink?: string;
    createdAt?: Date;
    updatedAt?: Date;

    constructor(
        imageLink: string = '',
        cardTitle: string = '',
        projectName: string = '',
        description: string = '',
        liveLink: string = '',
        githubLink: string = '',
        createdAt: Date = new Date(),
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