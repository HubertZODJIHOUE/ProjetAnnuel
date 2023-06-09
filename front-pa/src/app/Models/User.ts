export interface User{

  nom: string,
  prenom: string,
  email: string,
  username: string,
  password: string,
  date_creation?: Date
  role: string


}
export  interface UserLogin{
  username: string,
  password: string
}

export  interface  UserCreate{
  token?: string ;
  nom: string,
  prenom: string,
  email: string,
  username: string,
  password: string,
  date_creation?: Date,
  role: string
}
