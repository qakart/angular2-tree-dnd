import {Injectable, ComponentRef} from '@angular/core';
import {DefaultTreeNodeRenderer, TreeService, TreeNode, DefaultTreeNodeChildrenRenderer} from './index';

@Injectable()
export class DefaultTreeService implements TreeService {
    getTreeNodeContentRenderer(node: TreeNode): any {
        return DefaultTreeNodeRenderer;
    }

    getTreeNodeChildrenRenderer(node: TreeNode): any {
        return DefaultTreeNodeChildrenRenderer;
    }

    getChildren(node: TreeNode): any {
        return node.data.children;
    }

    register(node: TreeNode): string {
        return "2";
    }
}


