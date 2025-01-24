import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [CommonModule, RouterModule]  // CommonModule burada ekli olmalı
})
export class HeaderComponent {
  categories: string[] = [
    "Business", "Entertainment", "General", "Health", "Science", "Sports", "Technology"
  ];
  
  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
