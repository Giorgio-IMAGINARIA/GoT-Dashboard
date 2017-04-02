// ANGULAR COMPONENTS
import { Component, OnInit, } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MdIconRegistry } from '@angular/material';
//Services
import { AriaDataService } from '../services/aria.data.service';
import * as _ from "lodash";



@Component({
    selector: 'panelLiving',
    templateUrl: '../templates/panelLiving.component.html',
    styleUrls: ['../styles/panelLiving.component.css']
})
export class PanelLivingComponent implements OnInit {
    private jaqenCalls: number = 3;
    private listOfAliveVictims: Array<any> = [];

    private AriaDataServiceListener: any;

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
    private killVictimSlowly(id: number): void {
        this.jaqenCalls = this.jaqenCalls - 1;
        for (let i = 0; i < this.listOfAliveVictims.length; i++) {
            if (this.listOfAliveVictims[i].id === id) {
                this.listOfAliveVictims[i].killButtonDisabled = true;
                this.listOfAliveVictims[i].killSlowlyButtonDisabled = true;
            }
        }
        let timeGiven: number = Math.floor(Math.random() * 20) + 1;

        let timer = setInterval(function () {
            for (let i = 0; i < this.listOfAliveVictims.length; i++) {
                if (this.listOfAliveVictims[i].id === id) {
                    this.listOfAliveVictims[i].timer = timeGiven;
                }
            }
            console.log('timeGiven: ', timeGiven);
            timeGiven = timeGiven - 1;
            if (timeGiven < 0) {
                clearInterval(timer);
                this.AriaDataService.deleteToLivingList(id);
            }
        }.bind(this), 1000);
        console.log("slow id: ", id);
        if (this.jaqenCalls === 0) {
            for (let i = 0; i < this.listOfAliveVictims.length; i++) {
                this.listOfAliveVictims[i].killSlowlyButtonDisabled=true;
            }
        }
    }

    private checkAriaDataService(): void {
        this.AriaDataServiceListener = this.AriaDataService.activeListOfLivingStateSubject.subscribe(
            response => {
                if (response) {
                    console.log('the living response from the service is: ', response);
                    let tempArray: Array<any> = [];
                    let found: boolean;
                    if (!_.isEmpty(this.listOfAliveVictims)) {
                        for (let i = 0; i < response.length; i++) {
                            found = false;
                            tempArray[i] = {
                                id: '',
                                victimName: '',
                                victimSin: '',
                                killButtonDisabled: false,
                                killSlowlyButtonDisabled: false,
                                timer: '-'
                            }
                            for (let k = 0; k < this.listOfAliveVictims.length; k++) {
                                if (this.listOfAliveVictims[k].id === response[i].id) {
                                    tempArray[i].id = this.listOfAliveVictims[k].id;
                                    tempArray[i].victimName = this.listOfAliveVictims[k].victimName;
                                    tempArray[i].victimSin = this.listOfAliveVictims[k].victimSin;
                                    tempArray[i].killButtonDisabled = this.listOfAliveVictims[k].killButtonDisabled;
                                    tempArray[i].killSlowlyButtonDisabled = this.listOfAliveVictims[k].killSlowlyButtonDisabled;
                                    tempArray[i].timer = this.listOfAliveVictims[k].timer;
                                    found = true;
                                    break;
                                }
                            }
                            if (!found) {
                                tempArray[i].id = response[i].id;
                                tempArray[i].victimName = response[i].victimName;
                                tempArray[i].victimSin = response[i].victimSin;
                            }
                        }
                        this.listOfAliveVictims = tempArray;
                    } else {
                        for (let i = 0; i < response.length; i++) {
                            this.listOfAliveVictims[i] = {
                                id: '',
                                victimName: '',
                                victimSin: '',
                                killButtonDisabled: false,
                                killSlowlyButtonDisabled: false,
                                timer: '-'
                            }
                            this.listOfAliveVictims[i].id = response[i].id;
                            this.listOfAliveVictims[i].victimName = response[i].victimName;
                            this.listOfAliveVictims[i].victimSin = response[i].victimSin;
                        }
                    }

                } else {
                    console.log('no response for the living from the service');
                }
            },
            error => console.log('Error! Description: ' + error)
        );
    }
}