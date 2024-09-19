import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {

  leaderboard = [
    { position: 1, name: 'Chukwuemeka Roseline', score: 100 },
    { position: 2, name: 'Fatima Orimisan', score: 95 },
    { position: 3, name: 'Tunde Akinola', score: 90 },
    { position: 4, name: 'Olalekan Alao', score: 85 },
    { position: 5, name: 'Bola Adeyemi', score: 80 },
    { position: 6, name: 'Bilikis Lawal', score: 75 },
    { position: 7, name: 'Adaeze Johnson', score: 70 },
    { position: 8, name: 'Joy Adegoke', score: 65 },
    { position: 9, name: 'Folake Ogunleye', score: 60 },
    { position: 10, name: 'Adebayo Aluko', score: 50 }
  ];

  ngOnInit(): void {
    // Check if leaderboard already exists in localStorage
    const storedLeaderboard = localStorage.getItem('leaderboard');
    
    if (!storedLeaderboard) {
      // If no leaderboard exists, store the default one in localStorage
      localStorage.setItem('leaderboard', JSON.stringify(this.leaderboard));
    } else {
      // If it exists, load it from localStorage
      this.leaderboard = JSON.parse(storedLeaderboard);
    }
  }

  // Method to update the leaderboard in localStorage
  updateLeaderboard(newLeaderboard: any[]): void {
    this.leaderboard = newLeaderboard;
    localStorage.setItem('leaderboard', JSON.stringify(this.leaderboard));
  }

}
