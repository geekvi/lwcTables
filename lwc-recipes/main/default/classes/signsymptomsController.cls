/**
 * @description       :
 * @author            : ChangeMeIn@UserSettingsUnder.SFDoc
 * @group             :
 * @last modified on  : 07-22-2020
 * @last modified by  : ChangeMeIn@UserSettingsUnder.SFDoc
 * Modifications Log
 * Ver   Date         Author                               Modification
 * 1.0   07-15-2020   ChangeMeIn@UserSettingsUnder.SFDoc   Initial Version
**/
public with sharing class signsymptomsController {

    @AuraEnabled
    public static List<UAC_signsAndSymptoms__c> getRecords(){
        return [SELECT RecordTypeId, RecordType.Name, Id, Name, UAC_associatedUAC__c, UAC_signSymptom__c, UAC_signSymptomOnsetDate__c, UAC_locationofPain__c, UAC_measurementInUnits__c,UAC_measuredTemperature__c
                from UAC_signsAndSymptoms__c
                Where createdDate != NULL ORDER BY createdDate DESC LIMIT 10];
    }
    @AuraEnabled
    public static void saveSignsLwc(List<UAC_signsAndSymptoms__c> records){
        if(records.size()>0 && records != null){
            List<UAC_signsAndSymptoms__c> accs = new List<UAC_signsAndSymptoms__c>();
            for(integer i = 0; i < records.size(); i++) {
                System.debug('adding records::'+records[i]);
            //    account acc = new account();
            //    process fields
            //    accs.add(acc);
            }
            System.debug('adding records::'+records);
            //upsert records;
        }
    }
    @AuraEnabled
    public static void deleteRecs(){

    }
}
