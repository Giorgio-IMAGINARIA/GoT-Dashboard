// ANGULAR COMPONENTS
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MdIconRegistry } from '@angular/material';
//Services
import { AriaDataService } from '../services/aria.data.service';


@Component({
    selector: 'panelDead',
    templateUrl: '../templates/panelDead.component.html',
    styleUrls: ['../styles/panelDead.component.css']
})
export class PanelDeadComponent implements OnInit {
       private listOfDeadVictims: Array<any> = [];

    private AriaDataServiceListener: any;

    constructor(private AriaDataService: AriaDataService) { }

    ngOnInit() {
        this.checkAriaDataService();
    }

    ngOnDestroy(): void {
        this.AriaDataServiceListener.unsubscribe();
    }

    private checkAriaDataService(): void {
          this.AriaDataServiceListener = this.AriaDataService.activeListOfDeadStateSubject.subscribe(
            response => {
                if (response) {
                    console.log('the dead response from the service is: ', response);
                    this.listOfDeadVictims = response;
                } else {
                    console.log('no response for the dead from the service');
                }
            },
            error => console.log('Error! Description: ' + error)
        );
    }
}