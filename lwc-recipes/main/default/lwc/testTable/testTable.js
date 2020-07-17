import { LightningElement,api,track } from 'lwc';
import { FlowAttributeChangeEvent, FlowNavigationNextEvent } from 'lightning/flowSupport';

import fetchDataHelper from './fetchDataHelper.js';

const columns = [
    { label: 'Salutation', fieldName: 'Salutation'},
    { label: 'First Name', fieldName: 'FirstName', editable: true },
    { label: 'Last Name', fieldName: 'LastName', editable: false },
    { label: 'Email', fieldName: 'Email', type: 'email', editable: true },
    { label: 'Phone', fieldName: 'Phone', type: 'phone', editable: true },
    { label: 'Birth Date', fieldName: 'Birthdate', type: 'date', editable: true },
    //{ label: 'Department', fieldName: 'Department', type: 'text', editable: true },
];  // AccountId, Email, FirstName, LastName, Birthdate, Department

export default class testTable extends LightningElement {

    columns = columns;
    rowOffset = 0;

    @api
     tableData = [];

     @api
     contacts = [];


    handleChange(event) {
        //this.tableData.push(this._text);
        // notify the flow of the new todo list
        //this.tableData = this.contacts;
        //alert(`test save: + ${JSON.stringify(event.detail.draftValues[0])}`);
        this.contacts = event.detail.draftValues;
        //const attributeChangeEvent = new FlowAttributeChangeEvent('tableData', this.contacts);
        //this.dispatchEvent(attributeChangeEvent);
    }
    getSelectedName(event){
        alert(`selected data: + ${JSON.stringify(event.detail)}`);
    }

    // eslint-disable-next-line @lwc/lwc/no-async-await
    //async connectedCallback() {
    //    this.tableData = await fetchDataHelper({ amountOfRecords: 100 });
    //}
}