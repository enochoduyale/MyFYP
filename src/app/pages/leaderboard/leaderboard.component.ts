import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {
  leaderboard = [
    { position: 1, name: 'Chukwuemeka Nnaji', score: 100 },
    { position: 2, name: 'Fatima Abdullahi', score: 95 },
    { position: 3, name: 'Tunde Akinola', score: 90 },
    { position: 4, name: 'Ngozi Okonkwo', score: 85 },
    { position: 5, name: 'Bola Adeyemi', score: 80 },
    { position: 6, name: 'Musa Lawal', score: 75 },
    { position: 7, name: 'Amaka Eze', score: 70 },
    { position: 8, name: 'Ibrahim Suleiman', score: 65 },
    { position: 9, name: 'Folake Ogunleye', score: 60 },
    { position: 10, name: 'Adebayo Aluko', score: 55 }
  ];

  constructor() { }

  ngOnInit(): void {
  }
}
