import {Injectable} from '@angular/core';
import {IdService, TreeNode} from '../index';

@Injectable()
export class SimpleIdService implements IdService {

    private currentId:number = 0;

    generateUniqueId(node:TreeNode):string {
        return "node-" + this.currentId++;
    };
}


