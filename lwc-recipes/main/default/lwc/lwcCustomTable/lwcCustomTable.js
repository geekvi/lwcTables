import saveAccountsLwc from '@salesforce/apex/dynamicRowsController.saveAccountsLwc';
import getAccounts from '@salesforce/apex/dynamicRowsController.getAccounts';
import deleteAccounts from '@salesforce/apex/dynamicRowsController.deleteAccounts';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { LightningElement, api, track } from 'lwc';

export default class LwcCustomTable extends LightningElement {

    @track isEdited = false;
    @track toggleSaveLabel = 'Save';
    @track myList = [];

    /*--------------------Mapping field values to the list onchange START --------------------*/
    handleNameChange(event) {
        let element = this.myList.find(ele  => ele.Id === event.target.dataset.id);
        element.Name = event.target.value;
        this.myList = [...this.myList];
        console.log(JSON.stringify(this.myList));
    }

    handlePicklistChange(event) {
        let eventData = event.detail;
        let pickValue = event.detail.selectedValue;
        let uniqueKey = event.detail.key;

        let element = this.myList.find(ele  => ele.Id === uniqueKey);
        element.Type = pickValue;
        this.myList = [...this.myList];
    }

    handleDependentPicklistChange(event) {
        let eventData = event.detail;
        let pickValue = event.detail.selectedValue;
        let uniqueKey = event.detail.key;

        let element = this.myList.find(ele  => ele.Id === uniqueKey);
        element.SubType__c = pickValue;
        this.myList = [...this.myList];
    }

    handleSelection(event) {
        let eventData = event.detail;
        let id = event.detail.selectedId;
        let uniqueKey = event.detail.key;

        let element = this.myList.find(ele  => ele.Id === uniqueKey);
        element.OperatingHoursId = id;
        this.myList = [...this.myList];
    }
    /*--------------------Mapping field values to the list onchange END --------------------*/

    add() {
        let newList = this.myList;
        newList.push({Name : "", OperatingHours : "",  key : Math.random().toString(36).substring(2, 15)});
        this.myList = newList;
    }

    remove(event) {
        let indexPosition = event.currentTarget.name;
        const recId = event.currentTarget.dataset.id;

        deleteAccounts({toDeleteId : recId})
        .then(() => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title : 'Success',
                    message : `Record deleted succesfully!`,
                    variant : 'success',
                }),
            )
            if(this.myList.length > 1)
            this.myList.splice(indexPosition, 1);
            this.error = undefined;
        })
        .catch(error => {
            this.error = error;
        })
    }

    handleSave() {
        this.toggleSaveLabel = 'Saving...'
        let toSaveList = this.myList;
        toSaveList.forEach((element, index) => {
            if(element.Name === ''){
                toSaveList.splice(index, 1);
            }
        });

        this.myList = toSaveList;
        saveAccountsLwc({records : toSaveList})
        .then(() => {
            this.toggleSaveLabel = 'Saved';

            this.dispatchEvent(
                new ShowToastEvent({
                    title : 'Success',
                    message : `Records saved succesfully!`,
                    variant : 'success',
                }),
            )
            this.getAccountRecords();
            this.isEdited = false;
            this.error = undefined;
        })
        .catch(error => {
            this.error = error;
            this.record = undefined;
            console.log("Error in Save call back:", this.error);
        })
        .finally(() => {
            setTimeout(() => {
                this.toggleSaveLabel = 'Save';
            }, 3000);
        });
    }

    connectedCallback() {
        this.getAccountRecords();
    }

    getAccountRecords() {
        getAccounts()
            .then(result => {
                //alert(`acct data: ${JSON.stringify(result)}`);
                this.record = result;
                for(let i = 0; i < this.record.length; i++) {
                    if(this.record[i].OperatingHours) {
                        this.record[i].OperatingHoursName = this.record[i].OperatingHours.Name;
                        //this.record[i].JobTypeUrl = `${this.record[i].OperatingHours.Id}`;
                    }
                    if(this.record[i].Id)
                    this.record[i].recordUrl = `${this.record[i].Id}`;
                }
                this.myList = this.record;
                //alert(`Acct Data: ${this.record}`);
                this.error = undefined;
            })
            .catch(error => {
                this.error = error;
                this.record = undefined;
            });
    }

    onDoubleClickEdit() {
        this.isEdited = true;
    }

    handleCancel() {
        this.isEdited = false;
    }
}