export interface Article {
    id?: string,
    titre: string,
    categorie: string,

    stIntroArticle: string;
    texteIntroArticle: string;
    
    st1Article: string;
    texte1Article: string;
    
    st2Article: string;
    texte2Article: string;
    
    st3Article: string;
    texte3Article: string;
    
    stConclusionArticle: string;
    texteConclusionArticle: string;

    imageBase64?: string | null;

    dateCreation: Date;
}

export const ARTICLE_RULES = {
    PATTERN: /^[a-zA-Z0-9](.*[a-zA-Z0-9])?$/,
    MAX_TITRE: 20,
    MIN_TITRE: 5,
}