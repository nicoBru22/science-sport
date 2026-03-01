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
  PATTERN: /^[\p{L}0-9][\p{L}0-9\s’'()-]{3,98}[\p{L}0-9]$/u,
  MAX_TITRE: 100,
  MIN_TITRE: 5,
}

export enum CategorieArticle {
  Physiologie = 'Physiologie',
  Biomecanique = 'Biomécanique',
  Nutrition = 'Nutrition',
  Psychologie = 'Psychologie du sport',
  Entrainement = 'Entraînement',
}