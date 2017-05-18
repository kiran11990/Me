/// <reference path="../../sla/shared/models/service.ts" />
import { Pipe, PipeTransform } from '@angular/core';
import { Service } from '../../sla/shared/models/service';
@Pipe({ name: 'search' })
export class SearchPipe implements PipeTransform {
    transform(value: Service[], args: string, arg2: string): any {
        var contactId = args;
       // var serviceLine = arg1
        var application = arg2;
        if ((contactId.trim() !== '' || null || undefined) && (application.trim() !== '' || null || undefined)) {
            return value.filter(value =>
                (value.contractid == contactId) && (value.ApplicationGroup.toLowerCase().indexOf(application.toLowerCase()) !== -1));
        }

        else if ((contactId.trim() != "" || null || undefined) && (application.trim() == '' || null || undefined)) {
            return value.filter(value =>
                (value.contractid == contactId));
        }
        else if ((contactId.trim() != "" || null || undefined) && (application.trim() != "" || null || undefined)) {
            return value.filter(value =>
                (value.contractid == contactId) && (value.ApplicationGroup.toLowerCase().indexOf(application.toLowerCase()) !== -1));
        }
        else if ((contactId.trim() == "" || null || undefined) && (application.trim() != '' || null || undefined)) {
            return value.filter(value =>
                (value.ApplicationGroup.toLowerCase().indexOf(application.toLowerCase()) !== -1));
        }

        //else if (serviceLine.trim() != "" || null || undefined) {
        //    return value.filter(value =>
        //        (value.serviceLine.toLowerCase().indexOf(serviceLine.toLowerCase()) !== -1));
        //}
        else if (contactId.trim() != "" || null || undefined) {
            return value.filter(value =>
                (value.contractid == contactId));
        }
        else if (application.trim() != "" || null || undefined) {
            return value.filter(value =>
                (value.ApplicationGroup.toLowerCase().indexOf(application.toLowerCase()) !== -1));
        }

        return value;
    }
}