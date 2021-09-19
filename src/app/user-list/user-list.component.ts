import {Component, OnInit} from '@angular/core';
import {UserService} from "../user.service";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  page = {
    size: 3,
    number: 0
  }

  pageCount = 0;
  pages: number[] = [];

  users = this.userService.getPaginatedUsers(this.page.number, this.page.size);

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.calculatePageCount();
  }

  onPageDetailsChange() {
    this.calculatePageCount();
    this.users = this.userService.getPaginatedUsers(this.page.number, this.page.size);
  }

  private calculatePageCount() {
    this.userService.getTotalUsersCount().subscribe(count => {
      this.pageCount = Math.ceil(count / this.page.size);
      this.pages = Array.from(Array(this.pageCount).keys());
    });
  }

}
