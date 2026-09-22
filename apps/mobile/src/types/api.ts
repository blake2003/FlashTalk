export type UserStatus =
  | 'PENDING_VERIFICATION'
  | 'ACTIVE'
  | 'SUSPENDED'
  | 'BANNED'
  | 'DELETED';

export type Interest = {
  id: string;
  code: string;
  name: string;
};
