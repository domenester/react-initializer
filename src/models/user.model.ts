export class UserModel {
  constructor(
    private password: string,
    public email: string,
    public username: string,
    public roles: string []
  ) {}
}