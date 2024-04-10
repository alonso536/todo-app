export class TodoEntity {
  constructor(
    public id: number,
    public description: string,
    public completedAt?: Date | null, 
  ) {}

  get isCompleted() {
    return !!this.completedAt;
  }
}