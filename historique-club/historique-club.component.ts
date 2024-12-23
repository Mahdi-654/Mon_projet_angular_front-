import { Component } from '@angular/core';

@Component({
  selector: 'app-historique-club',
  templateUrl: './historique-club.component.html',
  styleUrls: ['./historique-club.component.css']
})
export class HistoriqueClubComponent {
  p: number = 1; // Page actuelle
  selectedImage: string = ''; // Variable pour stocker l'image sélectionnée
  historique = [
    {
      titre: 'Fondation et Premiers Pas',
      description: 'Le Club Africain a été fondé le 04 octobre 1920, dans la ville de Tunis. Dès ses premiers pas, le club a rapidement fait preuve d\'une grande ambition.',
      images: [
        'assets/images/histoire.jpg',
        'assets/images/caa.jpg'
      ]
    },
    {
      titre: 'Les Grands Moments',
      description: 'Le Club Africain a vécu des moments inoubliables, comme la victoire en Coupe d\'Afrique des clubs champions en 1991.',
      images: [
        'assets/images/grands.jpg',
        'assets/images/krak3.jpg'
      ]
    },
    {
      titre: 'Le Palmarès',
      description: 'Le Club Africain a remporté plusieurs titres prestigieux, dont plusieurs championnats de Tunisie et des victoires en Coupe d\'Afrique.',
      images: [
        'assets/images/championleague.jpg',
        'assets/images/derbi.jpg',
       
      ]
    },
    {
      titre: 'L\'Impact Social et Culturel',
      description: 'Le Club Africain n\'est pas seulement un club sportif, mais aussi un acteur majeur dans la société tunisienne.',
      images: [
        'assets/images/krak.jpg',
        'assets/images/krak3.jpg',
        
      ]
    }
  ];

  // URL de la vidéo
  videoUrl: string = 'https://www.youtube.com/embed/dQw4w9WgXcQ'; // Remplacer par l'URL de votre vidéo

  // Fonction pour ouvrir la lightbox avec l'image sélectionnée
  openLightbox(image: string): void {
    this.selectedImage = image; // Assigner l'image à la variable selectedImage
  }

  // Fonction pour fermer la lightbox
  closeLightbox(): void {
    this.selectedImage = ''; // Réinitialiser l'image sélectionnée
  }

  // Calculer le nombre total de pages
  totalPages(): number {
    return Math.ceil(this.historique.length / 1); // 1 article par page
  }
}
