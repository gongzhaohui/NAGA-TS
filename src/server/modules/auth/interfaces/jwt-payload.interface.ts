export interface IJwtPayload {
  readonly sub: string;
  readonly password: string;
  readonly roles: string[];

}
