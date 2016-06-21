import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {TreeNode, DefaultChildrenLoaderService} from '../index';

@Injectable()
export class DelayChildrenLoaderService extends DefaultChildrenLoaderService{
    getChildrenData(node: TreeNode): Observable<any> {
        return Observable.of(node.data[this.childrenFiledName]).delay(500);
    }
}
