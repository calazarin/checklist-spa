import { Category } from "./category";

export class ChecklistItem{

  public guid!: string;
  public isCompleted!: boolean;
  public description!: string;
  public deadline!: Date;
  public postedDate!: Date;
  public category!: Category;

}
