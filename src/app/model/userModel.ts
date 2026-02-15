export interface User {
  username: string;
  password: string;
}

export const USER_RULES = {
  USERNAME_PATTERN: /^[a-zA-Z0-9]+$/,
  MIN_USERNAME: 8,
  MIN_PASSWORD: 8,
  PASSWORD_PATTERN: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/,
};
