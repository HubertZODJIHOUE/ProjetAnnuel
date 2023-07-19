export interface User{

  // nom: string,
  // prenom: string,
  // email: string,
  // username: string,
  // password: string,
  // date_creation?: Date
  // role: string
  date_creation: Date
  email : string

  id?: number

  nom : string

  password : string

  prenom : string

  username : string
  role: string




}
export  interface UserLogin{
  username: string,
  password: string
}

export  interface  UserCreate{
  token?: string ;
  user:User
  // nom: string,
  // prenom: string,
  // email: string,
  // username: string,
  // password: string,
  // date_creation?: Date,
  // role: string
}
