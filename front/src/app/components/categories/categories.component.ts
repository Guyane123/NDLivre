import { Component } from '@angular/core';
import {CategoryComponent} from "../category/category.component";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CategoryComponent, MatGridList, MatGridTile],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {


  categories = [
    {name: 'Science', nom: 'Science', icon: 'science', color: '#4CAF50'},
    {name: 'Technology', nom: 'Technologie', icon: 'memory', color: '#2196F3'},
    {name: 'Art', nom: 'Art', icon: 'color_lens', color: '#FF5722'},
    {name: 'Biography & Autobiography', nom: 'Biographie & Autobiographie', icon: 'person', color: '#795548'},
    {name: 'Business & Economics', nom: 'Affaires & économie', icon: 'business_center', color: '#FFC107'},
    {name: 'Comics & Graphic Novels', nom: 'Bandes dessinées & romans graphiques', icon: 'menu_book', color: '#673AB7'},
    {name: 'Computers', nom: 'Informatique', icon: 'computer', color: '#03A9F4'},
    {name: 'Cooking', nom: 'Cuisine', icon: 'restaurant', color: '#FF9800'},
    {name: 'Crafts & Hobbies', nom: 'Arts et passe-temps', icon: 'brush', color: '#E91E63'},
    {name: 'Drama', nom: 'Drame', icon: 'theater_comedy', color: '#9C27B0'},
    {name: 'Education', nom: 'Éducation', icon: 'school', color: '#FFC107'},
    {name: 'Fiction', nom: 'Fiction', icon: 'book', color: '#F44336'},
    {name: 'Foreign Language Study', nom: 'Étude des langues étrangères', icon: 'language', color: '#00BCD4'},
    {name: 'Games', nom: 'Jeux', icon: 'videogame_asset', color: '#009688'},
    {name: 'Gardening', nom: 'Jardinage', icon: 'local_florist', color: '#8BC34A'},
    {name: 'Health & Fitness', nom: 'Santé & forme physique', icon: 'fitness_center', color: '#4CAF50'},
    {name: 'History', nom: 'Histoire', icon: 'history', color: '#795548'},
    {name: 'House & Home', nom: 'Maison & foyer', icon: 'home', color: '#FF5722'},
    {name: 'Humor', nom: 'Humour', icon: 'sentiment_very_satisfied', color: '#FFC107'},
    {name: 'Juvenile Fiction', nom: 'Fiction pour jeunes', icon: 'child_friendly', color: '#FF9800'},
    {name: 'Juvenile Nonfiction', nom: 'Non-fiction pour jeunes', icon: 'emoji_people', color: '#9C27B0'},
    {name: 'Language Arts & Disciplines', nom: 'Arts linguistiques & disciplines', icon: 'school', color: '#FFC107'},
    {name: 'Law', nom: 'Droit', icon: 'gavel', color: '#607D8B'},
    {name: 'Literary Collections', nom: 'Collections littéraires', icon: 'collections_bookmark', color: '#3F51B5'},
    {name: 'Literary Criticism', nom: 'Critique littéraire', icon: 'rate_review', color: '#8BC34A'},
    {name: 'Mathematics', nom: 'Mathématiques', icon: 'calculate', color: '#FFEB3B'},
    {name: 'Medical', nom: 'Médical', icon: 'local_hospital', color: '#E91E63'},
    {name: 'Music', nom: 'Musique', icon: 'music_note', color: '#03A9F4'},
    {name: 'Nature', nom: 'Nature', icon: 'nature', color: '#4CAF50'},
    {name: 'Performing Arts', nom: 'Arts du spectacle', icon: 'mic', color: '#FF9800'},
    {name: 'Pets', nom: 'Animaux de compagnie', icon: 'pets', color: '#FFC107'},
    {name: 'Philosophy', nom: 'Philosophie', icon: 'self_improvement', color: '#9C27B0'},
    {name: 'Photography', nom: 'Photographie', icon: 'camera_alt', color: '#607D8B'},
    {name: 'Poetry', nom: 'Poésie', icon: 'format_quote', color: '#F44336'},
    {name: 'Political Science', nom: 'Science politique', icon: 'public', color: '#2196F3'},
    {name: 'Psychology', nom: 'Psychologie', icon: 'psychology', color: '#9C27B0'},
    {name: 'Reference', nom: 'Référence', icon: 'bookmarks', color: '#FF9800'},
    {name: 'Religion', nom: 'Religion', icon: 'place', color: '#FFC107'},
    {name: 'Science', nom: 'Science', icon: 'science', color: '#4CAF50'},
    {name: 'Self-Help', nom: 'Développement personnel', icon: 'self_improvement', color: '#E91E63'},
    {name: 'Social Science', nom: 'Sciences sociales', icon: 'groups', color: '#03A9F4'},
    {name: 'Sports & Recreation', nom: 'Sports & loisirs', icon: 'sports', color: '#FF5722'},
    {name: 'Study Aids', nom: 'Aides aux études', icon: 'menu_book', color: '#8BC34A'},
    {name: 'Technology & Engineering', nom: 'Technologie & ingénierie', icon: 'build', color: '#2196F3'},
    {name: 'Transportation', nom: 'Transport', icon: 'directions_car', color: '#607D8B'},
    {name: 'Travel', nom: 'Voyage', icon: 'flight', color: '#03A9F4'},
    {name: 'True Crime', nom: 'True Crime', icon: 'gavel', color: '#607D8B'},
    {name: 'Young Adult Fiction', nom: 'Fiction pour jeunes adultes', icon: 'emoji_people', color: '#FFC107'},
    {name: 'Young Adult Nonfiction', nom: 'Non-fiction pour jeunes adultes', icon: 'school', color: '#FFC107'}
  ];

}
