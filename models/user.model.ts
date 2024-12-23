// user.model.ts
import { UserRole } from './roles.enum'; // Chemin correct vers votre fichier enum

export interface User {
    id?: string;
    username: string;
    email: string;
    password: string;
    role?: UserRole; // Utilisation de l'enum pour le rôle
}
