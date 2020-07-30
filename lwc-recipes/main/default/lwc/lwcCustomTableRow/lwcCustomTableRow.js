import { LightningElement,api } from 'lwc';
import TYPE_FIELD from '@salesforce/schema/UAC_signsAndSymptoms__c.UAC_signSymptom__c';

export default class LwcCustomTableRow extends LightningElement {
@api record;
ObjectAPIName = 'UAC_signsAndSymptoms__c';
ObjectFieldName='UAC_signsAndSymptoms__c.UAC_signSymptom__c';
_isedited;
@api formstyle;
@api
get isedited(){
    if (this._isedited){
        if (this.record.Id != null){
            console.log('edit record false::'+JSON.stringify(this.record));
            return false;
        } else {
            console.log('edit record true::'+JSON.stringify(this.record));
            return true;
        }
    }
}
set isedited(value){
    this._isedited=value;
}

@api rowindex;
error = '';

    get row(){
        //console.log('row record:: '+JSON.stringify(this.record));
        //alert(`row data: ${JSON.stringify(this.record)}`);
        return this.record;
    }
    onDoubleClickEdit() {
        this._isedited = true;
    }
    handleOnChange(event){
        event.preventDefault();
        const updateEvent = new CustomEvent('signsympupdate', {
            detail:  {value : event.detail.value, key: this.rowindex}
        });
        console.log('on change :: '+JSON.stringify(updateEvent));
        //alert(`On Change + ${JSON.stringify(updateEvent)}`);
        this.dispatchEvent(updateEvent);
    }
    remove(event){
        event.preventDefault();
        // 2. Create a custom event that bubbles. Read about event best practices at http://developer.salesforce.com/docs/component-library/documentation/lwc/lwc.events_best_practices
        const removeEvent = new CustomEvent('signsympremove', {
            //bubbles: true,
            detail:  {value : this.record.id, key: this.rowindex}
        });
        // 3. Fire the custom event
        this.dispatchEvent(removeEvent);
    }
    handlePicklistChange(event) {
        let eventData = event.detail;
        let pickValue = event.detail.selectedValue;
        let uniqueKey = event.detail.key;

        let element = this.myList.find(ele  => ele.Id === uniqueKey);
        element.Type = pickValue;
        this.myList = [...this.myList];
    }

    get editpain(){
        if (this.isedited){
            if (this.record.UAC_signSymptom__c == 'Pain') {
                return true;
            } else {
                return false;
            }
        }
    }
    get edittemp(){
        if (this.isedited){
            if (this.record.UAC_signSymptom__c =='Fever (> 37.8Co)'){
                return true;
            } else {
                return false;
            }
        }
    }
    get editother(){
        if (this.isedited){
            if (this.record.UAC_signSymptom__c =='Other'){
                return true;
            } else {
                return false;
            }
        }
    }
}