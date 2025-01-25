import { Component, OnInit } from '@angular/core';
import { ApiFetchService } from '../../api-fetch.service';

@Component({
  selector: 'app-homepage',
  standalone: false,
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  searchText: string = ''; 
  data: any[] = []; // Original data
  constructor(private apiFetchService: ApiFetchService) {}

  ngOnInit(): void {
    this.fetchData();
  }

  redirectToGitHub(): void {
    window.open('https://github.com/imprakhartripathi', '_blank');
  }
  

  fetchData(): void {
    this.apiFetchService.fetchData().subscribe(
      (response: any) => {
        console.log(response);
        if (response) {
          this.data = response;
        }
        console.log(this.data)
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  get filteredData(): any[] {
    return this.data.filter((term) =>
      term.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
}
