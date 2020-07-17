import { LightningElement, wire, track, api } from 'lwc';
import getRecords from '@salesforce/apex/signsymptomsController.getRecords';
import { refreshApex } from '@salesforce/apex';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';

export default class SignssymptomsListEdit extends LightningElement {
    objectApiName = 'UAC_signsAndSymptoms__c';

    @wire(getObjectInfo, { objectApiName: '$objectApiName' })
    objectInfo;

    @wire(getRecords) Recs;
    @track open = false;
    @api rec2Id;
    fields = [ Name, UAC_associatedUAC__c, UAC_signSymptom__c, UAC_signSymptomOnsetDate__c, UAC_locationofPain__c, UAC_measurementInUnits__c,UAC_measuredTemperature__c];
   //fields = [{label:RecId,value:Id}, {label:Name,value:Name}, {label: UAC,value:UAC_associatedUAC__c}
    //    , {label:Sign,value:UAC_signSymptom__c}, UAC_signSymptomOnsetDate__c, UAC_locationofPain__c, UAC_measurementInUnits__c,UAC_measuredTemperature__c];
    get signrecs(){
        alert(`view: ${JSON.stringify(this.Recs)}`)
        return this.Recs;
    }
    renderedCallback() {
        console.log("Accounts:::", this.Recs);
        //console.log("Accounts:::", JSON.stringify(this.Accounts));
    }

    handleClick(event) {
        console.log("In HandleClick");
        const recId = event.target.name;
        this.rec2Id = event.currentTarget.name;
        console.log("Selected Account Id:::", recId);
        console.log("Selected Account Id rec2Id :::", this.rec2Id);
        this.open = true;
    }

    closeModal() {
        console.log("In closeModal");
        this.open = false;
    }

    reloadList() {
        this.closeModal();
        return refreshApex(this.Recs);
    }
}