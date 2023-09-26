interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  rft: string | null;
  access_token: string;
}

type RegisterUser = Omit<User, "access_token" | "rft"> & {
  password: string;
  confirm_password?: string;
};

type LoginUser = {
  username: string;
  password: string;
};

export { type RegisterUser, type LoginUser, type User };
