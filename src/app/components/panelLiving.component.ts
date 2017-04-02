// ANGULAR COMPONENTS
import { Component, OnInit, } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MdIconRegistry } from '@angular/material';
//Services
import { AriaDataService } from '../services/aria.data.service';
// Libraries
import * as _ from "lodash";


@Component({
    selector: 'panelLiving',
    templateUrl: '../templates/panelLiving.component.html',
    styleUrls: ['../styles/panelLiving.component.css']
})
export class PanelLivingComponent implements OnInit {
    private listOfAliveVictims: Array<any> = [];

    private AriaDataServiceListener: any;
    private items: Array<any> = [];

    constructor(private AriaDataService: AriaDataService) { }

    ngOnInit() {
        this.checkAriaDataService();
    }

    ngOnDestroy(): void {
        this.AriaDataServiceListener.unsubscribe();
    }
    private killVictim(id: number): void {
        console.log("id: ", id);
        this.AriaDataService.deleteToLivingList(id);
    }

    private checkAriaDataService(): void {
        this.AriaDataServiceListener = this.AriaDataService.activeListOfLivingStateSubject.subscribe(
            response => {
                if (response) {
                    console.log('the living response from the service is: ', response);
                    this.listOfAliveVictims = response;
                } else {
                    console.log('no response for the living from the service');
                }
            },
            error => console.log('Error! Description: ' + error)
        );
    }
}