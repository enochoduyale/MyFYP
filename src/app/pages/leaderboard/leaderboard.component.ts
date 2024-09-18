import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {
  leaderboard = [
    { position: 1, name: 'Chukwuemeka Roseline', score: 100 },
    { position: 2, name: 'Fatima Orimisan', score: 90 },
    { position: 3, name: 'Tunde Akinola', score: 90 },
    { position: 4, name: 'Olalekan Alao', score: 80 },
    { position: 5, name: 'Bola Adeyemi', score: 80 },
    { position: 6, name: 'Bilikis Lawal', score: 70 },
    { position: 7, name: 'Adaeze Johnson', score: 70 },
    { position: 8, name: 'Joy Adegoke', score: 60 },
    { position: 9, name: 'Folake Ogunleye', score: 60 },
    { position: 10, name: 'Adebayo Aluko', score: 50 }
  ];

  constructor() { }

  ngOnInit(): void {
  }
}
