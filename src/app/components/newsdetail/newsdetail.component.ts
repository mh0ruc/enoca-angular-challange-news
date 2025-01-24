// NewsdetailComponent
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-newsdetail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './newsdetail.component.html',
  styleUrls: ['./newsdetail.component.css']
})
export class NewsdetailComponent implements OnInit {
  private route = inject(ActivatedRoute); // ActivatedRoute ile parametreleri alıyoruz
  article: any = null;

  ngOnInit() {
    // Router state üzerinden veriyi alıyoruz
    this.article = history.state.article;

    if (!this.article) {
      console.error("Haber bulunamadı!");
    } else {
      console.log("Detay Sayfasındaki Haber:", this.article);
    }
  }
}
