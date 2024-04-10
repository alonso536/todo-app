export class UpdateTodoDTO {
  private constructor(
    public readonly id: number,
    public readonly description?: string,
    public readonly completedAt: Date = new Date(),
  ) {}

  get values() {
    const obj: { [key: string]: any } = {};
    
    if(this.description) obj.description = this.description;
    if(this.completedAt) obj.completedAt = this.completedAt;

    return obj;
  }

  static create(props: { [key: string]: any }): [string?, UpdateTodoDTO?] {
    const { id, description, completedAt } = props;
    let newCompletedAt = completedAt;
    
    if(!id || isNaN(id)) {
      return ['id must be a valid number', undefined];
    }

    if(completedAt) {
      newCompletedAt = new Date(completedAt);
      if(newCompletedAt.toString() === 'Invalid Date') {
        return ['CompletedAt must be a valid Date', undefined];
      }
    }

    return [undefined, new UpdateTodoDTO(id, description, newCompletedAt)];
  }
}