export interface Article {
  id?: string;
  titre: string;
  categorie: string;
  dateCreation: Date;

  introduction: {
    sousTitre: string;
    texte: string;
  };

  sections: {
    sousTitre: string;
    texte: string;
  }[];

  conclusion: {
    sousTitre: string;
    texte: string;
  };

  references: string[];
  lienArticle: string;
  imageBase64?: string | null;
}

export const ARTICLE_RULES = {
  PATTERN: /^[a-zA-Z0-9](.*[a-zA-Z0-9])?$/,
  MAX_TITRE: 20,
  MIN_TITRE: 5,
}

export enum CategorieArticle {
  Physiologie = 'Physiologie',
  Biomecanique = 'Biomécanique',
  Nutrition = 'Nutrition',
  Psychologie = 'Psychologie du sport',
  Entrainement = 'Entraînement',
}