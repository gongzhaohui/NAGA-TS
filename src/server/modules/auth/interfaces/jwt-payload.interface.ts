export interface IJwtPayload {
  readonly sub: string;
  readonly roles: string;
  readonly iat: number;
  readonly exp: number;
}
