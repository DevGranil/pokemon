import { KeyValuePipe } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-pills',
  standalone: true,
  imports: [KeyValuePipe],
  templateUrl: './pills.component.html',
  styleUrl: './pills.component.scss'
})
export class PillsComponent implements OnInit{
  readonly pills$ = signal<Params>({})
  Object = Object

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router
  ){}

  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe((data) => {
      this.pills$.set(data)
    })
  }

  removeFilter(key: string){
    this.router.navigate([], {
      relativeTo: this.activeRoute,
      queryParams: {[key]: null},
      queryParamsHandling: 'merge'
    })
  }
}
