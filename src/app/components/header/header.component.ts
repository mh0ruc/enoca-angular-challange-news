import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports:[RouterModule,CommonModule]
})
export class HeaderComponent {
  categories: string[] = [
    "Business", "Entertainment", "General", "Health", "Science", "Sports", "Technology"
  ];
}
