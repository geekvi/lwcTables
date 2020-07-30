import { LightningElement,track, wire } from 'lwc';
import { getListUi } from 'lightning/uiListApi';
import { createRecord,getRecordCreateDefaults,
    generateRecordInputForCreate } from 'lightning/uiRecordApi';
import { reduceErrors } from 'c/ldsUtils';

import MY_OBJECT from '@salesforce/schema/UAC_signsAndSymptoms__c';
import NAME_FIELD from '@salesforce/schema/UAC_signsAndSymptoms__c.NAME';

import saveSignsLwc from '@salesforce/apex/signsymptomsController.saveSignsLwc';
import deleteRecs from '@salesforce/apex/signsymptomsController.deleteRecs';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class LwcCustomTableParent extends LightningElement {
objectApiName = MY_OBJECT;
formstyle='';
@track isEditedP = false;
@track toggleSaveLabel = 'Save';
@track _contacts =[];
@track commitList=[];
@track deleteList = [];
@track previouslist = [];
error ='';

    //fields = ['Name','AccountId', 'Title', 'Phone', 'Email'];
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
                console.log('view data:'+JSON.stringify(element));
                newEl.RecordTypeId = element.RecordTypeId;
                for (var key of Object.keys(element.fields)) {
                    newEl[key]=element.fields[key].value;
                    console.log(key + " -> " + element.fields[key].value)
                }
                newarray.push(newEl);
            });
            this._contacts = newarray;

            console.log('view data:'+JSON.stringify(this._contacts));
        } else if (error) {
            this.error = error;
        }
    }

    get contacts() {
        return this._contacts;
    }
    set contacts(newcontact){
        this._contacts = [
            ...this._contacts, newcontact
        ];
        console.log('new list rec data setter:'+JSON.stringify(this._contacts));
    }
    handleCancel() {
        this.isEditedP = false;
        this.error='';
        this.formstyle='';
        if (this.commitList.length > 0){
            const lu = this.commitList.length;
            console.log('number of rows added:' + lu);
            this._contacts.splice(1+lu,lu);
        }
        //this.template.querySelector('c-test-child-row').refresh();
        //alert(`list data: ${JSON.stringify(this.isEditedP)}`);
    }
    onDoubleClickEdit() {
        this.isEditedP = true;

    }

    @wire(getRecordCreateDefaults, { objectApiName: MY_OBJECT })
    contactCreateDefaults;

    // adding new record
    add() {
        this.isEditedP=true;
        if (!this.contactCreateDefaults.data) {
            return undefined;
        }

        const contactObjectInfo = this.contactCreateDefaults.data.objectInfos[
            MY_OBJECT.objectApiName
        ];
        const recordDefaults = this.contactCreateDefaults.data.record;
        const recordInput = {};
        //generateRecordInputForCreate(
        //    recordDefaults,
        //    contactObjectInfo
        //);

        //console.log('new list rec data:'+JSON.stringify(contactObjectInfo.recordTypeInfos));
        recordInput.RecordTypeId = this.recordTypeId;
        recordInput.UAC_signSymptom__c = "Other";
        //recordInput.UAC_measuredTemperature__c = "";
        //recordInput.UAC_measurementInUnits__c = "F";
        recordInput.UAC_locationofPain__c = "";
        recordInput.UAC_specifyOtherSignSymptom__c="";
        recordInput.UAC_onsetDateUnknown__c = false;
        //recordInput.UAC_signSymptomOnsetDate__c = "2010-01-01T12:00:00.000Z";


        console.log('new list rec data:'+JSON.stringify(recordInput));
        this._contacts = [
            ...this._contacts, recordInput
        ];
        console.log('updated list:'+JSON.stringify(this._contacts));
        this.commitList.push(recordInput);
        console.log('new record on commit list:'+JSON.stringify(this.commitList));
    }

    // remove the row or record
    remove(event) {
        const recId = event.detail.value;
        let deleteEl = this._contacts.splice(event.detail.key, 1);
        if (event.detail.value != null) {
            this.deleteList = [...this.deleteList, deleteEl];
            console.log('added to delete list:'+JSON.stringify(this.deleteList));
        }else{
            const index = this.commitList.indexOf(event.detail.value);
            this.commitList.splice(index,1);
            console.log('removed from commitlist:'+JSON.stringify(this.commitList));
        }

    }

    handleSave() {
        this.toggleSaveLabel = 'Saving...'
        let toSaveList = this.commitList;
        toSaveList.forEach((element, index)=>{
            if (!element.UAC_onsetDateUnknown__c){
                this.error ='Incomplete data, please correct';
            }
        });
        /*
        saveSignsLwc({records: toSaveList})
        .then((signorsymptom) => {
            //this.element.id = signorsymptom.id;
            console.log('created new record::'+JSON.stringify(signorsymptom));
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Record created',
                    variant: 'success'
                })
            );
            this.isEditedP=false;
        })
        .catch((error) => {
            this.formstyle="slds-form-element slds-has-error";
            //this.error=JSON.stringify(error);
            this.error=reduceErrors(error).join(', ');

        }); */
        //handle save
        //toSaveList.forEach((element, index) => {
        //    console.log('processing new record::'+JSON.stringify(element));
            // handle individual save record

         //   createRecord(element)

        //});

        //handle delete records
        let toDelList = this.deleteList;

        this.toggleSaveLabel = 'Save';
    }
    handleChange(event){
        //alert(`attempting update: ${JSON.stringify(event.detail)}`);
        const update = event.detail.value;
        //let updateEl = this._contacts.splice(event.detail.key, 1);
        //alert(`attempting update: ${JSON.stringify(updateEl)}`);
        this._contacts[event.detail.key].UAC_signSymptom__c = event.detail.value;

    }
    get recordTypeId() {
        // Returns a map of record type Ids
        const objectDefault = this.contactCreateDefaults.data.objectInfos[
            MY_OBJECT.objectApiName];
        //console.log('get defaults: '+JSON.stringify(objectDefault.objectTypeInfos));
            const rtis = objectDefault.defaultRecordTypeId;
        console.log('get types: '+JSON.stringify(rtis));
        //return Object.keys(rtis).find(rti => rtis[rti].name === 'Master');
        return rtis;
    }

}