import { Component, OnInit } from '@angular/core';
import { Launch } from './store/models/launch';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Status } from './store/models/status';
import { GlobalStoreService, GlobalSlideTypes } from './store/global-store.state';
import { Filters } from './store/models/filters';
import { LoadLaunches, SetFilters } from './store/global-store.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

@Injectable()
export class AppComponent implements OnInit {
  private launchesUrl = 'assets/data/launches.json';
  public filteredLaunches: Launch[];
  title = 'speed';

  constructor(private http: HttpClient, private global: GlobalStoreService) { }

  public onSearch(event) {
    this.global.dispatch(new SetFilters(new Filters(event.estado, event.agencia, event.tipo)));
  }

  ngOnInit(): void {
    // Cachea todos los lanzamientos
    this.http.get<Response>(this.launchesUrl).subscribe((res: Response) => {
      this.global.dispatch(new LoadLaunches(res['launches']));
    });

    this.global.select$(GlobalSlideTypes.filteredLaunches).subscribe(filtered => {
      this.filteredLaunches = filtered;
    });
  }
}