// ANGULAR COMPONENTS
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MdIconRegistry } from '@angular/material';
import { MdDialog } from '@angular/material';
//Services
import { AriaDataService } from '../services/aria.data.service';


@Component({
    selector: 'panelDead',
    templateUrl: '../templates/panelDead.component.html',
    styleUrls: ['../styles/panelDead.component.css']
})
export class PanelDeadComponent implements OnInit {
       private listOfAliveVictims: Array<any> = [
        {
            victimName: 'Ser Gregor',
            victimSin: 'His men captured Arya and other smallfolk'
        },
        {
            victimName: 'Polliver',
            victimSin: 'Stole Needle from Arya'
        },
        {
            victimName: 'Chiswyck',
            victimSin: 'Boasted of his participation in the gang rape of Layna'
        },
        {
            victimName: 'The Hound',
            victimSin: 'Killed Mycah'
        }
    ]

    private elasticDBServiceListener: any;
    private items: Array<any> = null;

    constructor(private AriaDataService: AriaDataService) { }

    ngOnInit() {
        this.checkElasticDbService();
    }

    ngOnDestroy(): void {
        this.elasticDBServiceListener.unsubscribe();
    }

    private checkElasticDbService(): void {
        // this.elasticDBServiceListener = this.AriaDataService.activeElasticDbStateSubject.subscribe(
        //     response => {
        //         if (response) {
        //             console.log('the response for the elastic objects is: ', response);
        //             this.items = response;
        //         } else {
        //             console.log('no response for the elastic objects');
        //         }
        //     },
        //     error => console.log('Error! Description: ' + error)
        // );
    }
}