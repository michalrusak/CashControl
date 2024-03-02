export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface User {
  firstName: string;
  lastName: string;
  email: string;
}

export interface ResponseUser {
  user: User;
}

export interface ResponseMessage {
  message: string;
}
