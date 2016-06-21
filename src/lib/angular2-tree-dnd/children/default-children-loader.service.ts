import {Injectable, Optional, Inject} from '@angular/core';
import {TreeNode, ChildrenLoaderService} from '../index';

export const CHILDREN_FIELD_NAME:string = "CHILDREN_FIELD_NAME";

@Injectable()
export class DefaultChildrenLoaderService implements ChildrenLoaderService {

    childrenFiledName:string;

    constructor(@Optional() @Inject(CHILDREN_FIELD_NAME) childrenFiledName:string) {
        this.childrenFiledName = childrenFiledName ? childrenFiledName : "children";
    }

    getChildrenData(node:TreeNode):any {
        return node.data[this.childrenFiledName];
    }

    addChildData(node:TreeNode, index:number, data:any):any {
        if (!node.data[this.childrenFiledName]) {
            node.data[this.childrenFiledName] = [];
        }
        node.data[this.childrenFiledName].splice(index, 0, data);
    }

    getChildrenDataCount(node:TreeNode):number {
        return node.data[this.childrenFiledName] ? node.data[this.childrenFiledName].length : 0;
    }
}


