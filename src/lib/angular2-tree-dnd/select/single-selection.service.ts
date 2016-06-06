import {Injectable} from '@angular/core';
import {SelectionService, TreeNode} from '../index';

@Injectable()
export class SingleSelectionService implements SelectionService {
    private selectedNode:TreeNode;

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

    hasSelectedNode(): boolean {
        return !!this.selectedNode;
    }

    setSelectedNode(node: TreeNode): void{
        this.selectedNode = node;
    }

    getSelectedNode(): TreeNode {
        return this.selectedNode;
    }

    getSelectedNodes(): TreeNode[] {
        return [this.selectedNode];
    }
}


