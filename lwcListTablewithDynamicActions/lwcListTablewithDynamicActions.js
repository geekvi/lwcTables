import { LightningElement,api,wire,track } from 'lwc';
import { getListUi } from 'lightning/uiListApi';
import { NavigationMixin } from 'lightning/navigation';


import MY_OBJECT from '@salesforce/schema/Contact';
//UAC_signsAndSymptoms__c';
import NAME_FIELD from '@salesforce/schema/Contact.NAME';

const actions = [
    { label: 'Show details', name: 'show_details' },
    { label: 'Delete', name: 'delete' }
];

const columns = [
    { label: 'First Name', fieldName: 'FirstName', editable: true },
    { label: 'Last Name', fieldName: 'LastName', editable: false },
    { label: 'Email', fieldName: 'Email', type: 'email', editable: true },
    { label: 'Phone', fieldName: 'Phone', type: 'phone', editable: true },
    { label: 'Last Modified Date', fieldName: 'LastModifiedDate', type: 'date', editable: true },
    //{ label: 'Department', fieldName: 'Department', type: 'text', editable: true },
];  // AccountId, Email, FirstName, LastName, Birthdate, Department

export default class LwcListTablewithDynamicActions extends NavigationMixin(LightningElement) {
    rendered = false;
    columns = columns;
    rowOffset = 0;
    //init = true;
    objectApiName = MY_OBJECT;
    @api
    tableData = [];

    _contacts = [];

    constructor() {
        super();
            columns.unshift(
                { type: 'action', typeAttributes: { rowActions: this.getRowActions } }
            )

    }
    fields = [ {label: 'Name',fieldName:'Name'}, {label: 'Symptom Date',fieldName: 'UAC_signSymptomOnsetDate__c'}, {label: 'Pain Location',fieldName: 'UAC_locationofPain__c'}
    ,{label: 'Specify Other',fieldName:'UAC_measurementInUnits__c'}, {label: 'Units',fieldName:'UAC_measurementInUnits__c'},{label: 'Measurement',fieldName: 'UAC_measuredTemperature__c'}];

    @wire(getListUi, {
        objectApiName: MY_OBJECT,
        listViewApiName: 'All',
        sortBy: NAME_FIELD,
        pageSize: 10
    })
    listView({ error, data }) {
        if (data) {
            let toSaveList=data.records.records;
            let newarray=[];
            toSaveList.forEach((element, index) => {
                const newEl={};
                for (var key of Object.keys(element.fields)) {
                    newEl[key]=element.fields[key].value;
                    console.log(key + " -> " + element.fields[key].value)
                }
                //console.log('view data element'+ [index]+ JSON.stringify(element.fields));
                newarray.push(newEl);
            });
            this._contacts = newarray;

            console.log('view data:'+JSON.stringify(this._contacts));
        } else if (error) {
            this.error = error;
        }
    }
    @api
    get contacts() {
        return this._contacts;
    }
    set contacts(newcontact){
        this._contacts = [
            ...this._contacts, newcontact
        ];
        console.log('new list rec data setter:'+JSON.stringify(this._contacts));
    }
    navigateToContact(event) {
        console.log('navigating:'+JSON.stringify(event.detail.row.Id));
        //console.log('navigating:'+JSON.stringify(event));
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: event.detail.row.Id,
                actionName: 'view'
            }
        });
    }

    getRowActions(row, doneCallback) {
        const actions = [];
            if (row['RecordType'] != null) {
                actions.push({
                    'label': 'View Record',
                    'iconName': 'utility:block_visitor',
                    'name': 'CreateSurveyInvitation'
                },
                );
            } else {
                actions.push({
                    'label': 'Edit Flow',
                    'iconName': 'utility:adduser',
                    'name': 'LaunchTheFlow'
                },
                );
            }
            // simulate a trip to the server
            setTimeout(() => {
                doneCallback(actions);
            }, 200);
    }
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