import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { LightningElement, api, track, wire } from 'lwc';
import { getListUi } from 'lightning/uiListApi';

import SIGNSYMP_OBJECT from '@salesforce/schema/UAC_signsAndSymptoms__c';
import NAME_FIELD from '@salesforce/schema/UAC_signsAndSymptoms__c.Name';
import TYPE_FIELD from '@salesforce/schema/UAC_signsAndSymptoms__c.UAC_signSymptom__c'

export default class ListViewDynamicForm extends LightningElement {
    @track isEdited = false;
    @track toggleSaveLabel = 'Save';
    @track myList = [];
    objectApiName = SIGNSYMP_OBJECT;
    fields = ['UAC_associatedUAC__c', 'UAC_signSymptom__c', 'UAC_signSymptomOnsetDate__c', 'UAC_locationofPain__c', 'UAC_measurementInUnits__c','UAC_measuredTemperature__c'];

    error;

    @wire(getListUi, {
        objectApiName: SIGNSYMP_OBJECT,
        listViewApiName: 'All',
        sortBy: NAME_FIELD,
        pageSize: 10
    })
    listView
    ({ error, data }) {
        if (data) {
            this.records = data.records.records;
            this.error = undefined;
            this.nextPageToken = data.records.nextPageToken;
            this.previousPageToken = data.records.previousPageToken;
        } else if (error) {
            this.error = error;
            this.records = undefined;
            alert(`error: ${JSON.stringify(this.error)}`)
        }
    }

    get listrecords() {
        alert(`view: ${JSON.stringify(this.listView)}`)
        return this.listView.data.records.records;
    }
}