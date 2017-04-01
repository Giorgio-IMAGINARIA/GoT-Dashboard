// ANGULAR COMPONENTS
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MdIconRegistry } from '@angular/material';
//Services
import { DbDataService } from '../services/db.data.service';


@Component({
    selector: 'panelControls',
    templateUrl: '../templates/panelControls.component.html',
    styleUrls: ['../styles/panelControls.component.css']
})

export class PanelControlsComponent {

    private victimName: string = '';
    private victimSin: string = '';

    private addButtonDisabled: boolean = true;

    constructor(private DbDataService: DbDataService) { }

    private addVictim(): void {
        console.log('add the victim');
    }

    onInputChange(event: any) {
        if (this.victimName && this.victimSin) {
            console.log('enable');
            this.addButtonDisabled = false;
        } else {
            console.log('disable');
            this.addButtonDisabled = true;
        }
    }
}