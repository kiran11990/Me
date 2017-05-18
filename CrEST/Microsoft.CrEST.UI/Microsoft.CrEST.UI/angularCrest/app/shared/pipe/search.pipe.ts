/// <reference path="../../sla/shared/models/application.ts" />
import { Pipe, PipeTransform } from '@angular/core';
import { Application } from '../../sla/shared/models/application';
@Pipe({ name: 'search' })
export class SearchPipe implements PipeTransform {
    transform(value: Application[], q: string): any {
        if (!q || q === '') {
            return value;
        }
        return value.filter(item => -1 < item.serviceLine.toLowerCase().indexOf(q.toLowerCase()));
    }
}