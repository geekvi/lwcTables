import { LightningElement, wire, track } from 'lwc';
import { getListUi } from 'lightning/uiListApi';

import CONTACT_OBJECT from '@salesforce/schema/Contact';
import NAME_FIELD from '@salesforce/schema/Contact.Name';

export default class ListViewDynamicForm extends LightningElement {
    @wire(getListUi, {
        objectApiName: CONTACT_OBJECT,
        listViewApiName: 'All_Recipes_Contacts',
        sortBy: NAME_FIELD,
        pageSize: 10
    })
    listView;
    @track isEdited = false;
    fields = ['AccountId', 'Name', 'Title', 'Phone', 'Email'];

    get contacts() {
        console.log("listdata:"+ JSON.stringify(this.listView.data.records.records));
        return this.listView.data.records.records;
    }
}