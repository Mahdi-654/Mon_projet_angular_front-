export interface Joueur {
    _id: string; // ID du joueur
    nom: string; // Nom
    prenom: string; // Prénom (sans accent)
    poste: string; // Poste
    numero: number; // Numéro (sans accent)
    equipe: string; // Équipe (sans accent)
    statistiques: {
        matchsJoués: number; // Peut garder l'accent si nécessaire
        buts: number; // Buts
        passes: number; // Passes
    };
}
