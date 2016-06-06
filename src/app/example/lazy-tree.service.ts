import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {LazyTreeNodeChildrenRenderer} from './index';
import {DefaultTreeService, TreeNode, IdService} from '../../lib/angular2-tree-dnd/index';

@Injectable()
export class LazyTreeService extends DefaultTreeService {

    //constructor(idService: IdService){
    //    super(idService);
    //}

    getTreeNodeChildrenRenderer(node: TreeNode): any {
        return LazyTreeNodeChildrenRenderer;
    }

    getChildrenData(node: TreeNode): Observable<any> {
        return Observable.of(node.data.children).delay(500);
    }

}


