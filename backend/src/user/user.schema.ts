import { object, string, minLength, optional, email } from 'valibot';

export const UpdateUserPayloadSchema = object({
  firstName: optional(string([minLength(1)])),
  lastName: optional(string([minLength(1)])),
  email: optional(string([email()])),
});

export const ChangePasswordPayloadSchema = object({
  currentPassword: string([minLength(8)]),
  newPassword: string([minLength(8)]),
});
