import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Skate } from './../shared/skate.model';
import { SkateService } from './../shared/skate.service';

@Component({
    selector: 'app-skate-list',
    templateUrl: './skate-list.component.html',
    styleUrls: ['./skate-list.component.css']
})
export class SkateListComponent implements OnInit {

    constructor(private route: ActivatedRoute, private router: Router, private skateService: SkateService) { }

    private skates: Array<Skate> = [];
    private _selectedSkate: Skate = new Skate();

    @Input()
    set selectedSkate(value: Skate) {
        this._selectedSkate = Object.assign({}, value);
    }

    get selectedSkate(): Skate {
        return this._selectedSkate;
    }

    ngOnInit() {
        for (let i = 0; i < 50; i++) {
            this.skates.push({
                id: i,
                code: `test${i}`,
                name: `${1990 + i}`,
                description: `test${i}`,
                amount: i * 5,
                price: i * 20
            });
        }

        /*this.skateService.getSkates().then(skateList => {
            console.log(skateList);
        });*/

    }

    newSkate() {
        this.router.navigate([`/skates/novo`])
    }

    viewDescript(skate: Skate) {
        this.selectedSkate = skate;
    }

    editSkate(skate: Skate) {
        this.router.navigate(['/skates/editar', skate.id]);
    }

    removeSkate(skate: Skate) {
        this.skateService;
    }

}
