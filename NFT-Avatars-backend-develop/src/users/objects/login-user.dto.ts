import { Expose, Type } from "class-transformer";

export class LoggedInToken {
  @Expose()
  readonly expiresIn: number;

  @Expose()
  readonly token: string;

  @Expose()
  readonly type: string;
}