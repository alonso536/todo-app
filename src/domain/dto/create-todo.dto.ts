export class CreateTodoDTO {
  private constructor(
    public readonly description: string,
  ) {}

  static create(props: { [key: string]: any }): [string?, CreateTodoDTO?] {
    const { description } = props;
    
    if(!description) {
      return ['The field description is required', undefined];
    }

    return [undefined, new CreateTodoDTO(description)];
  }
}