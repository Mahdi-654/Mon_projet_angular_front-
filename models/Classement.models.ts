export interface Classement {
    _id?: string;          // ID unique généré par MongoDB
    equipe: string;       // Nom de l'équipe
    points: number;       // Points accumulés
    matchesJoues: number; // Nombre de matchs joués
    wins: number;         // Nombre de victoires
    draws: number;        // Nombre de matchs nuls
    losses: number;       // Nombre de défaites
    createdAt?: Date;     // Date de création (géré par Mongoose)
    updatedAt?: Date; 
}
