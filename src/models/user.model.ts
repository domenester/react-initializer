export class UserModel {
  constructor(
    public name: string,
    public email: string,
    public username: string,
    public roles?: string [],
    public password?: string | undefined,
    public id?: number | undefined
  ) {}
}