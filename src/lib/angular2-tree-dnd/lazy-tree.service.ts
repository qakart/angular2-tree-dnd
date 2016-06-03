import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {DefaultTreeService, TreeNode, DefaultTreeNodeChildrenRenderer, DefaultTreeNodeRenderer} from './index';

@Injectable()
export class LazyTreeService extends DefaultTreeService {

    getChildren(node: TreeNode): any {
        console.log('LAZY');
        return node.data.children;
    }

}


