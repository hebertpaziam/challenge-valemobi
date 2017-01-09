import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Skate } from './../shared/skate.model';

@Component({
  selector: 'app-skate-form',
  templateUrl: './skate-form.component.html',
  styleUrls: ['./skate-form.component.css']
})
export class SkateFormComponent implements OnInit {

  private hasId: boolean;
  private _skate: Skate = new Skate();
  private _initialSkate: Skate = new Skate();

  @Input()
  set skate(value: Skate) {
    this._skate = Object.assign({}, value);
    this._initialSkate = Object.assign({}, value);
  }

  get skate(): Skate {
    return this._skate;
  }

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      if (params['id']) this.hasId = true;
    }).unsubscribe();
  }

  goBack() {
    history.back();
  }

  resetForm() {
    this.skate = this._initialSkate;
  }

  redirectToList() {
    this.router.navigate(['skates']);
  }
}
