import {Component, OnInit} from '@angular/core';
import {QuoteService} from "../quote.service";

@Component({
  selector: 'app-quote-list',
  templateUrl: './quote-list.component.html',
  styleUrls: ['./quote-list.component.css']
})
export class QuoteListComponent implements OnInit {

  page = {
    size: 3,
    number: 0
  }

  pageCount = 0;
  pages: number[] = [];

  quotes = this.quoteService.getPaginatedQuotes(this.page.number, this.page.size);

  constructor(private quoteService: QuoteService) {
  }

  ngOnInit(): void {
    this.calculatePageCount();
  }

  onPageDetailsChange() {
    this.calculatePageCount();
    this.quotes = this.quoteService.getPaginatedQuotes(this.page.number, this.page.size);
  }

  private calculatePageCount() {
    this.quoteService.getTotalQuotesCount().subscribe(count => {
      this.pageCount = Math.ceil(count / this.page.size);
      this.pages = Array.from(Array(this.pageCount).keys());
    });
  }

}
