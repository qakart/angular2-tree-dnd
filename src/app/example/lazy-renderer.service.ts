import {Injectable} from '@angular/core';
import {LazyTreeNodeChildrenRenderer} from './index';
import {DefaultRendererService, TreeNode} from '../../lib/angular2-tree-dnd/index';

@Injectable()
export class LazyRendererService extends DefaultRendererService {
    getTreeNodeChildrenRenderer(node:TreeNode):any {
        return LazyTreeNodeChildrenRenderer;
    }

}


