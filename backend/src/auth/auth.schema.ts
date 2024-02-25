import { email, minLength, object, string } from 'valibot';

export const LoginPayloadSchema = object({
  email: string([email()]),
  password: string([minLength(8)]),
});
export const RegisterPayloadSchema = object({
  email: string([email()]),
  password: string([minLength(8)]),
  firstName: string([minLength(1)]),
  lastName: string([minLength(1)]),
});
