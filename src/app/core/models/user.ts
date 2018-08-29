export class User {
  _id?: string;
  email: string;
  password: string;
  name?: string;
}

export interface LoginResp {
  success: boolean;
  token: string;
}

export interface SignupResp {
  success: boolean;
  message: string;
}

export interface LogoutRsp {
  success: true;
}
