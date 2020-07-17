import { LightningElement,api } from 'lwc';

export default class TestChildRow extends LightningElement {
@api record;
@api isedited;

    get row(){
        //console.log(JSON.stringify(this.record));
        //alert(`row data: ${JSON.stringify(this.record)}`);
        return this.record;
    }
    onDoubleClickEdit() {
        this.isedited = true;
    }
    handleOnChange(){
        return null;
    }
    get editpain(){
        if (this.isedited){
            if (this.record.fields.UAC_signSymptom__c.value == 'Pain') {
                return true;
            } else {
                return false;
            }
        }
    }
    get edittemp(){
        if (this.isedited){
            if (this.record.fields.UAC_signSymptom__c.value =='Fever (> 37.8Co)'){
                return true;
            } else {
                return false;
            }
        }
    }
    get editother(){
        if (this.isedited){
            if (this.record.fields.UAC_signSymptom__c.value =='Other'){
                return true;
            } else {
                return false;
            }
        }
    }
}