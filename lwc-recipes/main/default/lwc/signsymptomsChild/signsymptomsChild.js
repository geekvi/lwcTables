import { LightningElement, track, api} from 'lwc';

export default class SignsymptomsChild extends LightningElement {
    fields = [ {label: 'Name',fieldName:'Name'}, {label: 'Symptom Date',fieldName: 'UAC_signSymptomOnsetDate__c'}, {label: 'Pain Location',fieldName: 'UAC_locationofPain__c'}
    , {label: 'Units',fieldName:'UAC_measurementInUnits__c'},{label: 'Measurement',fieldName: 'UAC_measuredTemperature__c'}];
    @track Name = '';
    @track Industry = '';
    Id = '';
    @api objectInfo = '';

    @api indexVariable = '';


    @api record = {
        Id : '',
        Name : '',
        UAC_signSymptomOnsetDate__c : '',
        UAC_locationofPain__c : '',
        UAC_measurementInUnits__c : '',
        UAC_measuredTemperature__c : ''
    };
    get item(){
        //alert(`child record : ${JSON.stringify(this.record)}`);
        return this.record
    }

    connectedCallback() {
        this.Name = this.record.Name;
        this.Industry = this.record.Industry;
        this.Id = this.record.Id;
    }

    handleNameChange(event) {
        this.Name = event.target.value;
        console.log("this.Name child", this.Name);
        let newRecord = {...this.record};
        newRecord.Name = this.Name;
        console.log("this.Name Record", JSON.stringify(newRecord));
        const onRecordChange = new CustomEvent('recordchange', { detail: newRecord });
        // Dispatches the event.
        this.dispatchEvent(onRecordChange);
    }

    handleIndustryChange(event) {
        this.Industry = event.target.value;
        console.log("this.Industry child", this.Industry);
        let newRecord = {...this.record};
        newRecord.Industry = this.Industry;
        console.log("this.Industry Record", JSON.stringify(newRecord));
        const onRecordChange = new CustomEvent('recordchange', { detail: newRecord });
        // Dispatches the event.
        this.dispatchEvent(onRecordChange);
    }

    remove() {
        const sendIndexVariable = new CustomEvent('sendindex', { detail: this.indexVariable });
        // Dispatches the event.
        this.dispatchEvent(sendIndexVariable);
    }
}