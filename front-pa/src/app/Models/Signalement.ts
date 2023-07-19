export interface Signalement{
  id?: number;
  utilisateur_id: number,
  date_signalement: Date;
  type_dechet_id: number;
  localisation: string;
  description: string;
  status_id: number;
  image: ArrayBuffer;
}
