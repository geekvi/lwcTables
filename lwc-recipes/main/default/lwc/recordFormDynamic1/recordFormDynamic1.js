import { LightningElement, api, track } from 'lwc';

export default class RecordFormDynamic1 extends LightningElement {
    // Flexipage provides recordId and objectApiName
    @api recordId;
    @api objectApiName;
    @api fields;
    @track isEdited=false;
}
