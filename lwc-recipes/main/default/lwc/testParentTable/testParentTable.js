import { LightningElement,track, wire } from 'lwc';
import { getListUi } from 'lightning/uiListApi';

import MY_OBJECT from '@salesforce/schema/UAC_signsAndSymptoms__c';
import NAME_FIELD from '@salesforce/schema/UAC_signsAndSymptoms__c.Name';

import saveAccountsLwc from '@salesforce/apex/dynamicRowsController.saveAccountsLwc';
import deleteAccounts from '@salesforce/apex/dynamicRowsController.deleteAccounts';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class TestParentTable extends LightningElement {
    @wire(getListUi, {
        objectApiName: MY_OBJECT,
        listViewApiName: 'All',
        sortBy: NAME_FIELD,
        pageSize: 10
    })
    listView;

    objectApiName = MY_OBJECT;
    @track isEditedP = false;
    @track toggleSaveLabel = 'Save';

    //fields = ['Name','AccountId', 'Title', 'Phone', 'Email'];
    fields = [ {label: 'Name',fieldName:'Name'}, {label: 'Symptom Date',fieldName: 'UAC_signSymptomOnsetDate__c'}, {label: 'Pain Location',fieldName: 'UAC_locationofPain__c'}
    ,{label: 'Specify Other',fieldName:'UAC_measurementInUnits__c'}, {label: 'Units',fieldName:'UAC_measurementInUnits__c'},{label: 'Measurement',fieldName: 'UAC_measuredTemperature__c'}];

    get contacts() {
        //alert(`list data: ${JSON.stringify(this.listView.data.records.records)}`);
        return this.listView.data.records.records;
    }
    handleCancel() {
        this.isEditedP = false;
        //this.template.querySelector('c-test-child-row').refresh();
        //alert(`list data: ${JSON.stringify(this.isEditedP)}`);
    }
    onDoubleClickEdit() {
        this.isEditedP = true;
        //alert(`list data: ${JSON.stringify(this.isEditedP)}`);
        //this.template.querySelector('table').refresh();
    }
    add() {
        let newList = this.listView;
        newList.push({Name : "",  key : Math.random().toString(36).substring(2, 15)});
        this.myList = newList;
    }

    remove(event) {
        let indexPosition = event.currentTarget.name;
        const recId = event.currentTarget.dataset.id;

        deleteAccounts({toDeleteId : recId})
        .then(() => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title : 'Success',
                    message : `Record deleted succesfully!`,
                    variant : 'success',
                }),
            )
            if(this.listView.length > 1)
            this.listView.splice(indexPosition, 1);
            this.error = undefined;
        })
        .catch(error => {
            this.error = error;
        })
    }

    handleSave() {
        this.toggleSaveLabel = 'Saving...'
        let toSaveList = this.listView;
        toSaveList.forEach((element, index) => {
            if(element.Name === ''){
                toSaveList.splice(index, 1);
            }
        });

        this.listView = toSaveList;
        saveAccountsLwc({records : toSaveList})
        .then(() => {
            this.toggleSaveLabel = 'Saved';

            this.dispatchEvent(
                new ShowToastEvent({
                    title : 'Success',
                    message : `Records saved succesfully!`,
                    variant : 'success',
                }),
            )
            this.getAccountRecords();
            this.isEdited = false;
            this.error = undefined;
        })
        .catch(error => {
            this.error = error;
            this.record = undefined;
            console.log("Error in Save call back:", this.error);
        })
        .finally(() => {
            setTimeout(() => {
                this.toggleSaveLabel = 'Save';
            }, 3000);
        });
    }

}