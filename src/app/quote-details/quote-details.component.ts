import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {QuoteService} from "../quote.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-quote-details',
  templateUrl: './quote-details.component.html',
  styleUrls: ['./quote-details.component.css']
})
export class QuoteDetailsComponent implements OnInit {

  private quoteId: number = 0;

  quoteForm = this.formBuilder.group({
    movie: ['', [Validators.required]],
    content: ['', [Validators.required]]
  });

  constructor(private formBuilder: FormBuilder, private quoteService: QuoteService, private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.quoteId = Number(this.route.snapshot.params.id);
    if (this.quoteId > 0) {
      this.quoteService.getQuoteById(this.quoteId).subscribe(quote => {
        this.quoteForm.patchValue({
          movie: quote.movie,
          content: quote.content
        });
      });
    }
  }

  onQuoteSave() {
    if (this.quoteId > 0) {
      const quote = {
        id: this.quoteId,
        movie: this.movie?.value,
        content: this.content?.value
      };
      this.quoteService.updateQuote(quote).subscribe(() => this.router.navigate(['']));
    } else {
      const quote = {
        movie: this.movie?.value,
        content: this.content?.value
      };
      this.quoteService.createQuote(quote).subscribe(() => this.router.navigate(['']));
    }


  }

  get movie() {
    return this.quoteForm.get('movie');
  }

  get content() {
    return this.quoteForm.get('content');
  }
}
