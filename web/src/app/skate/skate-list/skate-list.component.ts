import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-skate-list',
  templateUrl: './skate-list.component.html',
  styleUrls: ['./skate-list.component.css']
})
export class SkateListComponent implements OnInit {

  constructor() { }

  private skates: Array<any> = [];
  private _selectedSkate:any;

   @Input()
    set selectedSkate(value: any) {
        this._selectedSkate = Object.assign({}, value);
    }

    get selectedSkate(): any {
        return this._selectedSkate;
    }

  ngOnInit() {

    for (let i = 0; i < 50; i++) {
      this.skates.push({
        vin:`test${i}`,
        year:`${1990+i}`,
        brand:`test${i}`,
        color:`test${i}`,
      });
    }
  }
  
}
