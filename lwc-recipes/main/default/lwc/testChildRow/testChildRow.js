import { LightningElement,api } from 'lwc';

export default class TestChildRow extends LightningElement {
@api record;
_isedited;
@api formstyle;
@api
get isedited(){
    if (this._isedited){
        if (this.record.id != null){
            return false;
        } else {
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
        //console.log(JSON.stringify(this.record));
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