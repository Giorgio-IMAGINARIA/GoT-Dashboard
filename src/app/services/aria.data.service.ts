import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
// Libraries
import * as _ from "lodash";
@Injectable()
export class AriaDataService {
    public currentListOfLiving: Array<any> = [];
    public activeListOfLivingStateSubject: Subject<Array<any>> = new Subject<Array<any>>();
    public activeListOfLivingStateObservable: Observable<Array<any>> = this.activeListOfLivingStateSubject.asObservable();

    public currentListOfDead: Array<any> = [];
    public activeListOfDeadStateSubject: Subject<Array<any>> = new Subject<Array<any>>();
    public activeListOfDeadStateObservable: Observable<Array<any>> = this.activeListOfDeadStateSubject.asObservable();
    constructor() { }

    addToListOfLiving(victimToAdd: any): void {
        this.currentListOfLiving.push(victimToAdd);
        this.activeListOfLivingStateSubject.next(this.currentListOfLiving);
    }

    deleteToLivingList(id: number): void {

        this.currentListOfDead.push(_.find(this.currentListOfLiving, {id}));
        this.activeListOfDeadStateSubject.next(this.currentListOfDead);
        
        console.log('we are in service now: ', id);
        _.remove(this.currentListOfLiving, {id});
        this.activeListOfLivingStateSubject.next(this.currentListOfLiving);
    }

    addToLivingList(victimToAdd: any): void {
        console.log('here is the victim to add in service: ', victimToAdd);
        this.addToListOfLiving(victimToAdd);

    }

}