import { LightningElement,api,track } from 'lwc';
import { FlowAttributeChangeEvent, FlowNavigationNextEvent } from 'lightning/flowSupport';

const actions = [
    { label: 'Show details', name: 'show_details' },
    { label: 'Delete', name: 'delete' }
];

const columns = [
    { label: 'Symptom', fieldName: 'Department'},
    { label: 'First Name', fieldName: 'FirstName', editable: true },
    { label: 'Last Name', fieldName: 'LastName', editable: false },
    { label: 'Email', fieldName: 'Email', type: 'email', editable: true },
    { label: 'Phone', fieldName: 'Phone', type: 'phone', editable: true },
    { label: 'Birth Date', fieldName: 'Birthdate', type: 'date', editable: true },
    //{ label: 'Department', fieldName: 'Department', type: 'text', editable: true },
];  // AccountId, Email, FirstName, LastName, Birthdate, Department

export default class TestTableWithActions extends LightningElement {

    columns = columns;
    rowOffset = 0;
    //init = true;

    @api
     tableData = [];

     @api
     contacts = [];

     constructor() {
        super();
            columns.unshift(
                { type: 'action', typeAttributes: { rowActions: this.getRowActions } }
            )

    }
    getRowActions(row, doneCallback) {
        const actions = [];
            if (row['isActive']) {
                actions.push({
                    'label': 'Symptom1',
                    'iconName': 'utility:block_visitor',
                    'name': 'deactivate1'
                },
                {
                    'label': 'Symptom2',
                    'iconName': 'utility:block_visitor',
                    'name': 'deactivate2'
                },
                {
                    'label': 'Symptom3',
                    'iconName': 'utility:block_visitor',
                    'name': 'deactivate3'
                },
                );
            } else {
                actions.push({
                    'label': 'Symptom1',
                    'iconName': 'utility:adduser',
                    'name': 'activate'
                },
                {
                    'label': 'Symptom2',
                    'iconName': 'utility:block_visitor',
                    'name': 'deactivate2'
                },
                {
                    'label': 'Symptom3',
                    'iconName': 'utility:block_visitor',
                    'name': 'deactivate3'
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