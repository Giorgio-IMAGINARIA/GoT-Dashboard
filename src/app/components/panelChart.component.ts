// ANGULAR COMPONENTS
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MdIconRegistry } from '@angular/material';
import { MdDialog } from '@angular/material';
//Services
import { DbDataService } from '../services/db.data.service';


@Component({
    selector: 'panelChart',
    templateUrl: '../templates/panelChart.component.html',
    styleUrls: ['../styles/panelChart.component.css']
})
export class PanelChartComponent implements OnInit {
    leftValue = 0;
    rightValue = 0;

    invertRightSlider = true;


    folders = [
        {
            name: 'S13740425614445',
            timeStamp: '2017-02-17T14:58:38.000Z',
            availableCapacity: 19,
            bridges: 4,
            channels: 20,
            destinations: 1,
            sipLines: 2,
            city: "New York",
            // updated: new Date('1/1/16'),
            iconName: 'settings_input_svideo'
        },
        {
            name: 'S13740425614445',
            timeStamp: '2017-02-18T14:58:38.000Z',
            availableCapacity: 46,
            bridges: 7,
            channels: 50,
            destinations: 4,
            sipLines: 8,
            city: "New York",
            // updated: new Date('1/17/16'),
            iconName: 'device_hub'
        },
        {
            name: 'S13740425614445',
            timeStamp: '2017-02-15T14:58:38.000Z',
            availableCapacity: 111,
            bridges: 19,
            channels: 120,
            destinations: 9,
            sipLines: 28,
            city: "London",
            // updated: new Date('1/28/16'),
            iconName: 'linear_scale'
        }
    ];


    private elasticDBServiceListener: any;
    private items: Array<any> = null;


    constructor(private DbDataService: DbDataService) { }
    testSlider(){
        console.log('abbra');
    }
    ngOnInit() {
        this.DbDataService.sendRequest();
        this.checkElasticDbService();
    }
    ngOnDestroy(): void {
        this.elasticDBServiceListener.unsubscribe();
    }
    private checkElasticDbService(): void {
        this.elasticDBServiceListener = this.DbDataService.activeElasticDbStateSubject.subscribe(
            response => {
                if (response) {
                    console.log('the response for the elastic objects is abrustag: ', response);
                    this.items = response;
                } else {
                    console.log('no response for the elastic objects');
                }
            },
            error => console.log('Error! Description: ' + error)
        );
    }
}