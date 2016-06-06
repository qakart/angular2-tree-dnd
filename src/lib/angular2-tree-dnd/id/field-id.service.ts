import {Injectable, Inject} from '@angular/core';
import {IdService, TreeNode} from '../index';

export const ID_FIELD_NAME = "ID_FIELD_NAME";

@Injectable()
export class FieldIdService implements IdService {

    constructor(@Inject(ID_FIELD_NAME) private fieldName:string) {
    }

    generateUniqueId(node:TreeNode):string {
        return node.data[this.fieldName];
    };
}


