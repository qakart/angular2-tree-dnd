import {Injectable} from '@angular/core';
import {DefaultTreeNodeRenderer, TreeService, TreeNode, DefaultTreeNodeChildrenRenderer} from './index';

@Injectable()
export class DefaultTreeService implements TreeService {

    private currentId = 0;

    selectedNode:TreeNode;

    getTreeNodeContentRenderer(node:TreeNode):any {
        return DefaultTreeNodeRenderer;
    }

    getTreeNodeChildrenRenderer(node:TreeNode):any {
        return DefaultTreeNodeChildrenRenderer;
    }

    getChildren(node:TreeNode):any {
        return node.data.children;
    }

    getChildrenCount(node:TreeNode):number {
        return node.data.children ? node.data.children.length : 0;
    }

    onSelectedChanged(node:TreeNode, selected:boolean):void {
        if (selected) {
            const previouslySelectedNode = this.selectedNode;
            this.selectedNode = node;
            if (previouslySelectedNode) {
                previouslySelectedNode.toggleSelected();
            }
        } else {
            if (node === this.selectedNode) {
                this.selectedNode = undefined;
            }
        }
    }

    getSelectedNode(): TreeNode {
        return this.selectedNode;
    }

    register(node:TreeNode):string {
        node.onSelectedChanged((selected:boolean) => this.onSelectedChanged(node, selected));
        return "node"+this.currentId++;
    }
}


