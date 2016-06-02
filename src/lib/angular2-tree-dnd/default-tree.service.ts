import {Injectable, ComponentRef} from '@angular/core';
import {TreeNodeFieldRenderer, TreeService, TreeNode, TreeNodeChildrenRenderer} from './index';

@Injectable()
export class DefaultTreeService implements TreeService {
    getTreeNodeContentRenderer(node: TreeNode): any {
        return TreeNodeFieldRenderer;
    }

    getTreeNodeChildrenRenderer(node: TreeNode): any {
        return TreeNodeChildrenRenderer;
    }

    getChildren(node: TreeNode): any {
        return node.data.children;
    }

    register(node: TreeNode): string {
        return "2";
    }
}


