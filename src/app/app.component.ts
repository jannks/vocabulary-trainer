import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material';
import {Router} from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

    @ViewChild('drawer', {static: false}) drawer: MatSidenav;

    constructor(private router: Router) {
    }

    ngOnInit(): void {
        this.router.events.subscribe(event => {
            // close sidenav on routing
            if (this.smallScreen) {
                this.drawer.close().catch(
                    error => {
                        console.log(error);
                    }
                );
            }
        });
    }

    public get smallScreen(): boolean {
        return window.innerWidth < 1630;
    }
}
