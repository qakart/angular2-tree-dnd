import {Injectable} from '@angular/core';
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

    getChildrenCount(node: TreeNode): number {
        return node.data.children ? node.data.children.length : 0;
    }

    register(node: TreeNode): string {
        return "2";
    }
}


