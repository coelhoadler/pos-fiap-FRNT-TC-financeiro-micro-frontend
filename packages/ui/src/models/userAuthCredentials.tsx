export interface UserAuthCredentialsRequest {
  email: string;
  password: string;
}

// TODO verificar a possibilidade de apagar esse arquivo

export interface UserAuthCredentialsResponse {
  name: string;
  email: string;
  token: string;
}
