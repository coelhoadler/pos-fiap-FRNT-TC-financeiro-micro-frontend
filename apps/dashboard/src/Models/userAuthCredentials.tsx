export interface UserAuthCredentialsRequest {
  email: string;
  password: string;
}

export interface UserAuthCredentialsResponse {
  name: string;
  email: string;
  token: string;
}
