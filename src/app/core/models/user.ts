export class User {
  _id: string;
  email: string;
  password: string;
}

export interface LoginResp {
  success: boolean;
  token: string;
}
