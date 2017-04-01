// ANGULAR COMPONENTS
import { Component, OnInit, ViewChild, ElementRef, } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MdIconRegistry } from '@angular/material';
import { MdDialog } from '@angular/material';
//Services
import { DbDataService } from '../services/db.data.service';
// Libraries
import * as d3 from 'd3';
import * as _ from "lodash";


@Component({
    selector: 'panelLiving',
    templateUrl: '../templates/panelLiving.component.html',
    styleUrls: ['../styles/panelLiving.component.css']
})
export class PanelLivingComponent implements OnInit {

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

    private margin: any = { top: 20, bottom: 20, left: 20, right: 20 };
    private chart: any;
    private width: number;
    private height: number;
    private xScale: any;
    private yScale: any;
    private colors: any;
    private xAxis: any;
    private yAxis: any;

    private elasticDBServiceListener: any;
    // private items: Array<any> = null;
    private items: Array<any> = [];

    constructor(private DbDataService: DbDataService) { }

    ngOnInit() {
        // this.createChart();
        if (!_.isEmpty(this.items)) {
            console.log('this.items init: ', this.items);
            // this.updateChart();
        }
        this.checkElasticDbService();
    }

    ngOnDestroy(): void {
        this.elasticDBServiceListener.unsubscribe();
    }
  



    private createInternalArray(arrayToProcess: Array<any>): Array<any> {
        let arrayOfmilliseconds: Array<any> = [];
        let tempDate: any = null;
        for (let i = 0; i < arrayToProcess.length; i++) {
            tempDate = new Date(arrayToProcess[i]._source.timestamp);
            arrayOfmilliseconds.push(tempDate.getTime());
        }
        let arrayMaxValue: number = Math.max(...arrayOfmilliseconds);
        let arrayMinValue: number = Math.min(...arrayOfmilliseconds);
        console.log('arrayOfmilliseconds: ', arrayOfmilliseconds);
        console.log('arrayMaxValue: ', arrayMaxValue);
        console.log('arrayMinValue: ', arrayMinValue);





        let arrayToReturn: Array<any> = [];
        for (let i = 0; i < arrayToProcess.length; i++) {
            arrayToReturn.push([
                arrayToProcess[i]._source.timestamp,
                arrayToProcess[i]._source.capacity.siplines
            ]);
        }
        return arrayToReturn;
    }

    private checkElasticDbService(): void {
        this.elasticDBServiceListener = this.DbDataService.activeElasticDbStateSubject.subscribe(
            response => {
                if (response) {
                    console.log('the response for the elastic objects is: ', response);
                    this.items = this.createInternalArray(response);
                    // this.updateChart();
                } else {
                    console.log('no response for the elastic objects');
                }
            },
            error => console.log('Error! Description: ' + error)
        );
    }
}