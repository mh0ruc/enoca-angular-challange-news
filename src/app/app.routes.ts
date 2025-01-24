import { Routes } from '@angular/router';
import { HomenewsComponent } from './components/homenews/homenews.component';
import { NewsdetailComponent } from './components/newsdetail/newsdetail.component';
import { AboutComponent } from './components/about/about.component';
import { CategorypageComponent } from './components/categorypage/categorypage.component';

export const routes: Routes = [
  { path: 'homenews', component: HomenewsComponent },
  { path: 'about', component: AboutComponent },
  { path: 'news/:id', component: NewsdetailComponent },
  { path: 'category/:name', component: CategorypageComponent }, // ✅ Kategori sayfası route'u eklendi
  { path: '', redirectTo: '/homenews', pathMatch: 'full' } // Varsayılan yönlendirme
];
