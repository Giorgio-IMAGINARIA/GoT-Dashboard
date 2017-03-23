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

    leftYearValue: number = null;
    leftMonthValue: number = null;
    leftDayValue: number = null;
    leftHourValue: number = null;
    leftMinuteValue: number = null;
    leftSecondValue: number = null;
    leftMillisecondValue: number = null;

    rightYearValue: number = null;
    rightMonthValue: number = null;
    rightDayValue: number = null;
    rightHourValue: number = null;
    rightMinuteValue: number = null;
    rightSecondValue: number = null;
    rightMillisecondValue: number = null;

    leftValue = 0;
    rightValue = 0;

    invertRightSlider = true;


    // folders = [
    //     {
    //         name: 'S13740425614445',
    //         timeStamp: '2017-02-17T14:58:38.000Z',
    //         availableCapacity: 19,
    //         bridges: 4,
    //         channels: 20,
    //         destinations: 1,
    //         sipLines: 2,
    //         city: "New York",
    //         // updated: new Date('1/1/16'),
    //         iconName: 'settings_input_svideo'
    //     },
    //     {
    //         name: 'S13740425614445',
    //         timeStamp: '2017-02-18T14:58:38.000Z',
    //         availableCapacity: 46,
    //         bridges: 7,
    //         channels: 50,
    //         destinations: 4,
    //         sipLines: 8,
    //         city: "New York",
    //         // updated: new Date('1/17/16'),
    //         iconName: 'device_hub'
    //     },
    //     {
    //         name: 'S13740425614445',
    //         timeStamp: '2017-02-15T14:58:38.000Z',
    //         availableCapacity: 111,
    //         bridges: 19,
    //         channels: 120,
    //         destinations: 9,
    //         sipLines: 28,
    //         city: "London",
    //         // updated: new Date('1/28/16'),
    //         iconName: 'linear_scale'
    //     }
    // ];


    private elasticDBServiceListener: any;
    private items: Array<any> = null;


    constructor(private DbDataService: DbDataService) { }

    checkDate(percentage: number, slider: string): void {
        // console.log('Slider Value: ', percentage);
        // console.log('the items are: ', this.items);
        let dateArray = [];
        for (let i = 0; i < this.items.length; i++) {
            let tempDate = new Date(this.items[i]._source.timestamp);
            var tempDateMilliseconds = tempDate.getTime();
            dateArray[i] = tempDateMilliseconds;
        }
        let minimumTimeMilliseconds = Math.min(...dateArray);
        let currentTime = new Date();
        let currentDateMilliseconds = currentTime.getTime();
        let differenceMilliseconds = currentDateMilliseconds - minimumTimeMilliseconds;
        let halfDifferenceTime = differenceMilliseconds / 2;
        let percentageTime = (halfDifferenceTime * percentage) / 100;
        // console.log('the array of dates is: ', dateArray);
        // console.log('The minimum value is: ', minimumTimeMilliseconds);
        // console.log('The maximum value is now and it is: ', currentDateMilliseconds);
        switch (slider) {
            case 'left':
                {
                    // console.log('left percentageTime: ', percentageTime, '; Floor percentageTime: ', Math.floor(percentageTime));
                    let timeSelected = minimumTimeMilliseconds + Math.floor(percentageTime);
                    // console.log('The time selected is: ', timeSelected);
                    let timeSelectedDate = new Date(timeSelected);
                    // console.log('The time selected date is: ', timeSelectedDate);

                    let timeselectedYear = timeSelectedDate.getFullYear();
                    this.leftYearValue = timeselectedYear;
                    // console.log('the year is: ', timeselectedYear);

                    let timeselectedMonth = timeSelectedDate.getMonth() + 1;
                    this.leftMonthValue = timeselectedMonth;
                    // console.log('the month is: ', timeselectedMonth);

                    let timeselectedDayInMonth = timeSelectedDate.getDate();
                    this.leftDayValue = timeselectedDayInMonth;
                    // console.log('the day in Month is: ', timeselectedDayInMonth);

                    let timeselectedHour = timeSelectedDate.getHours();
                    this.leftHourValue = timeselectedHour;
                    // console.log('the hour is: ', timeselectedHour);

                    let timeselectedMinute = timeSelectedDate.getMinutes();
                    this.leftMinuteValue = timeselectedMinute;
                    // console.log('the minute is: ', timeselectedMinute);

                    let timeselectedSecond = timeSelectedDate.getSeconds();
                    this.leftSecondValue = timeselectedSecond;
                    // console.log('the second is: ', timeselectedSecond);

                    let timeselectedMillisecond = timeSelectedDate.getMilliseconds();
                    this.leftMillisecondValue = timeselectedMillisecond;
                    // console.log('the millisecond is: ', timeselectedMillisecond);
                }
                break;
            case 'right':
                {
                    // console.log('right percentageTime: ', percentageTime, '; Ceil percentageTime: ', Math.ceil(percentageTime));
                    
                    let timeSelected = currentDateMilliseconds - Math.floor(percentageTime);
                    // console.log('The time selected is: ', timeSelected);
                    let timeSelectedDate = new Date(timeSelected);
                    // console.log('The time selected date is: ', timeSelectedDate);
                    let timeselectedYear = timeSelectedDate.getFullYear();
                    this.rightYearValue = timeselectedYear;
                    // console.log('the year is: ', timeselectedYear);

                    let timeselectedMonth = timeSelectedDate.getMonth() + 1;
                    this.rightMonthValue = timeselectedMonth;
                    // console.log('the month is: ', timeselectedMonth);

                    let timeselectedDayInMonth = timeSelectedDate.getDate();
                    this.rightDayValue = timeselectedDayInMonth;
                    // console.log('the day in Month is: ', timeselectedDayInMonth);

                    let timeselectedHour = timeSelectedDate.getHours();
                    this.rightHourValue = timeselectedHour;
                    // console.log('the hour is: ', timeselectedHour);

                    let timeselectedMinute = timeSelectedDate.getMinutes();
                    this.rightMinuteValue = timeselectedMinute;
                    // console.log('the minute is: ', timeselectedMinute);

                    let timeselectedSecond = timeSelectedDate.getSeconds();
                    this.rightSecondValue = timeselectedSecond;
                    // console.log('the second is: ', timeselectedSecond);

                    let timeselectedMillisecond = timeSelectedDate.getMilliseconds();
                    this.rightMillisecondValue = timeselectedMillisecond;
                    // console.log('the millisecond is: ', timeselectedMillisecond);
                }
                break;
            default:
                throw "error in slider case";
        }
    }

    testLeftSlider(event: any) {
        if (event.value !== 0) {
            this.checkDate(event.value, 'left');
            if (this.rightValue !== 0) {
                this.checkDate(this.rightValue, 'right');
            }
        } else {
            this.leftYearValue = null;
            this.leftMonthValue = null;
            this.leftDayValue = null;
            this.leftHourValue = null;
            this.leftMinuteValue = null;
            this.leftSecondValue = null;
            this.leftMillisecondValue = null;
        }
    }

    testRightSlider(event: any) {
        if (event.value !== 0) {
            this.checkDate(event.value, 'right');
             if (this.leftValue !== 0) {
                this.checkDate(this.leftValue, 'left');
            }
        } else {
            this.rightYearValue = null;
            this.rightMonthValue = null;
            this.rightDayValue = null;
            this.rightHourValue = null;
            this.rightMinuteValue = null;
            this.rightSecondValue = null;
            this.rightMillisecondValue = null;
        }
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