export class TodoEntity {
  constructor(
    public id: number,
    public description: string,
    public completedAt?: Date | null, 
  ) {}

  get isCompleted() {
    return !!this.completedAt;
  }

  public static fromObject(object: { [key: string]: any }) {
    const { id, description, completedAt } = object;
    if(!id) throw 'Id is required';
    if(!description) throw 'Description is required';

    let newCompletedAt;

    if(completedAt) {
      newCompletedAt = new Date(completedAt);
      if(isNaN(newCompletedAt.getTime())) {
        throw 'CompletedAt must be a valid date';
      }
    }

    return new TodoEntity(id, description, completedAt);
  }
}