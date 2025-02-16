import { Component, inject, OnInit } from '@angular/core';
import { UserCardComponent } from "../user-card/user-card.component";

@Component({
  selector: 'app-feed',
  imports: [UserCardComponent],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css',
})
export class FeedComponent implements OnInit {
  

  ngOnInit(): void {
    
  }
}
