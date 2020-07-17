import { LightningElement, wire,api } from 'lwc';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import TYPE_FIELD from '@salesforce/schema/UAC_signsAndSymptoms__c.UAC_signSymptom__c';
import TYPE1_FIELD from '@salesforce/schema/UAC_signsAndSymptoms__c.UAC_measurementInUnits__c';

export default class WireGetPicklistValues1 extends LightningElement {
    @api type='1';
    @api value = '';
    handleChange(event) {
        let tempValue = event.target.value;
        console.log("event.target.value",event.target.value);
        console.log("this.value",tempValue);
        let selectedValue = tempValue;
        let key = this.uniqueKey;

        //Firing change event for aura container to handle
        const pickValueChangeEvent = new CustomEvent('picklistchange', {
            detail: { selectedValue, key },
        });
        this.dispatchEvent(pickValueChangeEvent);
    }

    get values(){
        if(this.type == '1'){
            return this.picklistValues.data.values
        } else {
            return this.picklistValues1.data.values
        }
    }

    @wire(getPicklistValues, {
        recordTypeId: '0122F0000019ImBQAU' ,
        fieldApiName: TYPE_FIELD
    })
    picklistValues;

    @wire(getPicklistValues, {
        recordTypeId: '0122F0000019ImBQAU' ,
        fieldApiName: TYPE1_FIELD
    })
    picklistValues1;
}
