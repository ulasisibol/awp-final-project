export class SmallProject {
    _id?: string;
    cardTitle: string;
    projectName: string;
    description: string;
    githubLink: string;

    constructor(cardTitle: string = '', projectName: string = '', description: string = '', githubLink: string = '') {
        this.cardTitle = cardTitle;
        this.projectName = projectName;
        this.description = description;
        this.githubLink = githubLink;
    }
}