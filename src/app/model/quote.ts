import {User} from "./user";

export interface Quote {
  id?: number;
  movie: string;
  content: string;
  author?: User;
}
