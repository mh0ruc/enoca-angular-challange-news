import { Component } from '@angular/core';
import { NewssliderComponent } from "../newsslider/newsslider.component";
import { NewslistComponent } from "../newslist/newslist.component";
import { ListdetailComponent } from "../listdetail/listdetail.component";

@Component({
  selector: 'app-homenews',
  imports: [NewssliderComponent, NewslistComponent],
  templateUrl: './homenews.component.html',
  styleUrl: './homenews.component.css'
})
export class HomenewsComponent {

}
