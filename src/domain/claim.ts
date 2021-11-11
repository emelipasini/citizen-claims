export class Claim {
    title: string;
    description: string;
    municipality: string;
    image: string;

    constructor(title: string, description: string, municipality: string, image: string) {
        this.title = title;
        this.description = description;
        this.municipality = municipality;
        this.image = image;
    }
}
