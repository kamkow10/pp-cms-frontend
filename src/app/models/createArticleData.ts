export class CreateArticleData {
  public title: string;
  public language: string;
  public tags: {name: string}[];
  public content: string;
  public image: string;
  public id: number;

  constructor(title: string, language: string, tags: { name: string }[], content: string, image: string, id?: number) {
    this.title = title;
    this.language = language;
    this.tags = tags;
    this.content = content;
    this.image = image;
    if (id) {
      this.id = id;
    }
  }
}
