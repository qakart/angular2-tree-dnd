import {Injectable, ComponentRef} from '@angular/core';
import {TreeNodeFieldRenderer, TreeService, TreeNode} from './../angular-tree-dnd';

@Injectable()
export class DefaultTreeService implements TreeService {
    getTreeNodeRenderer(node: TreeNode): any {
        return TreeNodeFieldRenderer;
    }

    getChildren(node: TreeNode): any {
        return node.data.children;
    }

    register(node: TreeNode): string {
        return "2";
    }
}


