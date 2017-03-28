// ANGULAR COMPONENTS
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MdIconRegistry } from '@angular/material';
import { MdDialog } from '@angular/material';
//Services
import { DbDataService } from '../services/db.data.service';
//Libraries
import * as _ from "lodash";


@Component({
    selector: 'panelChart',
    templateUrl: '../templates/panelChart.component.html',
    styleUrls: ['../styles/panelChart.component.css']
})
export class PanelChartComponent implements OnInit {

    // 6 months in milliseconds
    leftSlideValue: number = 0;
    rightSlideValue: number = 0;

    lowerTimeLimitRadio: number = 15778476000;

    minimumTimeLimit: number = null;
    maximumTimeLimit: number = null;

    leftYearValue: string = null;
    leftMonthValue: string = null;
    leftDayValue: string = null;
    leftHourValue: string = null;
    leftMinuteValue: string = null;
    leftSecondValue: string = null;
    leftMillisecondValue: string = null;

    rightYearValue: string = null;
    rightMonthValue: string = null;
    rightDayValue: string = null;
    rightHourValue: string = null;
    rightMinuteValue: string = null;
    rightSecondValue: string = null;
    rightMillisecondValue: string = null;

    leftValue = 0;
    rightValue = 0;

    invertRightSlider = true;


    private elasticDBServiceListener: any;
    private items: Array<any> = null;
    private unfilteredItems: Array<any> = null;
    private filter: any = {
        timeFilter: {
            activated: false,
            startTime: null,
            endtime: null
        }
    };


    constructor(private DbDataService: DbDataService) { }
    saveInput(event: any): void {
        console.log('old field value left minutes: ', event.target.value);
    }
    onInputChange(event: any) {
        // console.log('keyup event: ', event.target.value);
        setTimeout(function (par: number): void {
            console.log('value to write after time: ', par);
        }, 2000, this.leftMinuteValue);
    }

    checkDate(percentage: number, slider: string): void {
        console.log('percentage: ', percentage);

        let minimumTimeMilliseconds: number;

        // if (!_.isEmpty(this.items)) {
        //     let dateArray = [];
        //     for (let i = 0; i < this.items.length; i++) {
        //         let tempDate = new Date(this.items[i]._source.timestamp);
        //         var tempDateMilliseconds = tempDate.getTime();
        //         dateArray.push(tempDateMilliseconds);
        //     }
        //     minimumTimeMilliseconds = Math.min(...dateArray);
        //     this.lastMinimumTimeMilliseconds = minimumTimeMilliseconds;
        // } else {
        //     minimumTimeMilliseconds = this.lastMinimumTimeMilliseconds;
        // }



        let currentTime = new Date();
        let currentDateMilliseconds = currentTime.getTime();
        // 2 months ago below
        minimumTimeMilliseconds = currentDateMilliseconds - this.lowerTimeLimitRadio;




        let differenceMilliseconds = currentDateMilliseconds - minimumTimeMilliseconds;
        let halfDifferenceTime = differenceMilliseconds / 2;
        let percentageTime = (halfDifferenceTime * percentage) / 100;
        switch (slider) {
            case 'left':
                {
                    // console.log('left percentageTime: ', percentageTime, '; Floor percentageTime: ', Math.floor(percentageTime));
                    let timeSelected = minimumTimeMilliseconds + Math.floor(percentageTime);
                    this.minimumTimeLimit = timeSelected;
                    // console.log('The time selected is: ', timeSelected);
                    let timeSelectedDate = new Date(timeSelected);
                    // console.log('The time selected date is: ', timeSelectedDate);

                    let timeselectedYear = timeSelectedDate.getFullYear();
                    this.leftYearValue = timeselectedYear.toString();
                    // console.log('the year is: ', timeselectedYear);

                    let timeselectedMonth = timeSelectedDate.getMonth() + 1;
                    this.leftMonthValue = ("0" + timeselectedMonth.toString()).slice(-2);
                    // console.log('the month is: ', timeselectedMonth);

                    let timeselectedDayInMonth = timeSelectedDate.getDate();
                    this.leftDayValue = ("0" + timeselectedDayInMonth.toString()).slice(-2);
                    // console.log('the day in Month is: ', timeselectedDayInMonth);

                    let timeselectedHour = timeSelectedDate.getHours();
                    this.leftHourValue = ("0" + timeselectedHour.toString()).slice(-2);
                    // console.log('the hour is: ', timeselectedHour);

                    let timeselectedMinute = timeSelectedDate.getMinutes();
                    this.leftMinuteValue = ("0" + timeselectedMinute.toString()).slice(-2);
                    // console.log('the minute is: ', timeselectedMinute);

                    let timeselectedSecond = timeSelectedDate.getSeconds();
                    this.leftSecondValue = ("0" + timeselectedSecond.toString()).slice(-2);
                    // console.log('the second is: ', timeselectedSecond);

                    let timeselectedMillisecond = timeSelectedDate.getMilliseconds();
                    this.leftMillisecondValue = ("00" + timeselectedMillisecond.toString()).slice(-3);
                    // console.log('the millisecond is: ', timeselectedMillisecond);
                }
                break;
            case 'right':
                {
                    // console.log('right percentageTime: ', percentageTime, '; Ceil percentageTime: ', Math.ceil(percentageTime));
                    let timeSelected = currentDateMilliseconds - Math.floor(percentageTime);
                    this.maximumTimeLimit = timeSelected;
                    // console.log('The time selected is: ', timeSelected);

                    let timeSelectedDate = new Date(timeSelected);
                    // console.log('The time selected date is: ', timeSelectedDate);
                    let timeselectedYear = timeSelectedDate.getFullYear();
                    this.rightYearValue = timeselectedYear.toString();
                    // console.log('the year is: ', timeselectedYear);

                    let timeselectedMonth = timeSelectedDate.getMonth() + 1;
                    this.rightMonthValue = ("0" + timeselectedMonth.toString()).slice(-2);
                    // console.log('the month is: ', timeselectedMonth);

                    let timeselectedDayInMonth = timeSelectedDate.getDate();
                    this.rightDayValue = ("0" + timeselectedDayInMonth.toString()).slice(-2);
                    // console.log('the day in Month is: ', timeselectedDayInMonth);

                    let timeselectedHour = timeSelectedDate.getHours();
                    this.rightHourValue = ("0" + timeselectedHour.toString()).slice(-2);
                    // console.log('the hour is: ', timeselectedHour);

                    let timeselectedMinute = timeSelectedDate.getMinutes();
                    this.rightMinuteValue = ("0" + timeselectedMinute.toString()).slice(-2);
                    // console.log('the minute is: ', timeselectedMinute);

                    let timeselectedSecond = timeSelectedDate.getSeconds();
                    this.rightSecondValue = ("0" + timeselectedSecond.toString()).slice(-2);
                    // console.log('the second is: ', timeselectedSecond);

                    let timeselectedMillisecond = timeSelectedDate.getMilliseconds();
                    this.rightMillisecondValue = ("00" + timeselectedMillisecond.toString()).slice(-3);
                    // console.log('the millisecond is: ', timeselectedMillisecond);
                }
                break;
            default:
                throw "error in slider case";
        }
        console.log('Minimumtimelimit: ', this.minimumTimeLimit, ';MaximumtimeLimit: ', this.maximumTimeLimit);


    }

    radioGroupOnChange(event: any): void {
        console.log('radioGroupChanged-event-value:', event.value);
        switch (event.value) {
            case '1':
                this.lowerTimeLimitRadio = 3600000;
                break;
            case '2':
                this.lowerTimeLimitRadio = 604800000;
                break;
            case '3':
                this.lowerTimeLimitRadio = 2629746000;
                break;
            case '4':
                this.lowerTimeLimitRadio = 15778476000;
                break;
            default:
                throw "radioGroupOnChange - wrong value to case"
        }
        this.modifyTimeWindow();
    }

    modifyTimeWindow(): void {
        if ((this.leftSlideValue === 0) && (this.rightSlideValue === 0)) {
            this.minimumTimeLimit = null;
            this.leftYearValue = null;
            this.leftMonthValue = null;
            this.leftDayValue = null;
            this.leftHourValue = null;
            this.leftMinuteValue = null;
            this.leftSecondValue = null;
            this.leftMillisecondValue = null;
            this.maximumTimeLimit = null;
            this.rightYearValue = null;
            this.rightMonthValue = null;
            this.rightDayValue = null;
            this.rightHourValue = null;
            this.rightMinuteValue = null;
            this.rightSecondValue = null;
            this.rightMillisecondValue = null;
        } else if ((this.leftSlideValue !== 0) && (this.rightSlideValue === 0)) {
            this.checkDate(this.leftSlideValue, 'left');
            this.maximumTimeLimit = null;
            this.rightYearValue = null;
            this.rightMonthValue = null;
            this.rightDayValue = null;
            this.rightHourValue = null;
            this.rightMinuteValue = null;
            this.rightSecondValue = null;
            this.rightMillisecondValue = null;
        } else if ((this.leftSlideValue === 0) && (this.rightSlideValue !== 0)) {
            this.checkDate(this.rightSlideValue, 'right');
            this.minimumTimeLimit = null;
            this.leftYearValue = null;
            this.leftMonthValue = null;
            this.leftDayValue = null;
            this.leftHourValue = null;
            this.leftMinuteValue = null;
            this.leftSecondValue = null;
            this.leftMillisecondValue = null;
        } else {
            // go on later
        }
        this.filterItems(this.unfilteredItems);
    }

    moveLeftSlider(event: any) {
        this.leftSlideValue = event.value;
        if (event.value !== 0) {
            this.checkDate(event.value, 'left');
            if (this.rightValue !== 0) {
                this.checkDate(this.rightValue, 'right');
            }
        } else {
            this.minimumTimeLimit = null;
            this.leftYearValue = null;
            this.leftMonthValue = null;
            this.leftDayValue = null;
            this.leftHourValue = null;
            this.leftMinuteValue = null;
            this.leftSecondValue = null;
            this.leftMillisecondValue = null;
        }
        this.filterItems(this.unfilteredItems);
    }

    moveRightSlider(event: any) {
        this.rightSlideValue = event.value;

        if (event.value !== 0) {
            this.checkDate(event.value, 'right');
            if (this.leftValue !== 0) {
                this.checkDate(this.leftValue, 'left');
            }
        } else {
            this.maximumTimeLimit = null;
            this.rightYearValue = null;
            this.rightMonthValue = null;
            this.rightDayValue = null;
            this.rightHourValue = null;
            this.rightMinuteValue = null;
            this.rightSecondValue = null;
            this.rightMillisecondValue = null;
        }
        this.filterItems(this.unfilteredItems);
    }


    ngOnInit() {
        this.DbDataService.sendRequest(this.filter);
        this.checkElasticDbService();
    }
    ngOnDestroy(): void {
        this.elasticDBServiceListener.unsubscribe();
    }
    private filterItems(unfilteredArray: Array<any>): void {
        if (!(this.minimumTimeLimit === null && this.maximumTimeLimit === null)) {
            this.filter.timeFilter.activated = true;
            let minimumTimeLimitString: string;
            if (this.minimumTimeLimit === null) {
                this.filter.timeFilter.startTime = null;
                this.filter.timeFilter.endTime = this.rightYearValue + '-' + this.rightMonthValue + '-' + this.rightDayValue + 'T' + this.rightHourValue + ':' + this.rightMinuteValue + ':' + this.rightSecondValue + '.' + this.rightMillisecondValue + 'Z';
            } else if (this.maximumTimeLimit === null) {
                this.filter.timeFilter.startTime = this.leftYearValue + '-' + this.leftMonthValue + '-' + this.leftDayValue + 'T' + this.leftHourValue + ':' + this.leftMinuteValue + ':' + this.leftSecondValue + '.' + this.leftMillisecondValue + 'Z';
                this.filter.timeFilter.endTime = null;
            } else {
                this.filter.timeFilter.startTime = this.leftYearValue + '-' + this.leftMonthValue + '-' + this.leftDayValue + 'T' + this.leftHourValue + ':' + this.leftMinuteValue + ':' + this.leftSecondValue + '.' + this.leftMillisecondValue + 'Z';
                this.filter.timeFilter.endTime = this.rightYearValue + '-' + this.rightMonthValue + '-' + this.rightDayValue + 'T' + this.rightHourValue + ':' + this.rightMinuteValue + ':' + this.rightSecondValue + '.' + this.rightMillisecondValue + 'Z';
            }
        } else {
            this.filter.timeFilter.activated = false;
            this.filter.timeFilter.startTime = null;
            this.filter.timeFilter.endTime = null;
            // this.items = unfilteredArray;
        }
        this.DbDataService.sendRequest(this.filter);
    }
    private updateUnfilteredItems(unfilteredArray: Array<any>): void {
        this.unfilteredItems = unfilteredArray;
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