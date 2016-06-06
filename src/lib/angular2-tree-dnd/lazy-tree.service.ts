import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {DefaultTreeService, TreeNode, DefaultTreeNodeChildrenRenderer, DefaultTreeNodeRenderer, LazyTreeNodeChildrenRenderer} from './index';

@Injectable()
export class LazyTreeService extends DefaultTreeService {

    getTreeNodeChildrenRenderer(node: TreeNode): any {
        return LazyTreeNodeChildrenRenderer;
    }

    getChildren(node: TreeNode): Observable<any> {
        return Observable.of(node.data.children).delay(1000);
    }

}


