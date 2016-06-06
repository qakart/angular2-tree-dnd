import {Injectable} from '@angular/core';
import {DefaultTreeNodeRenderer, TreeService, TreeNode, DefaultTreeNodeChildrenRenderer} from './index';

@Injectable()
export class DefaultTreeService implements TreeService {

    private currentId = 0;

    selectedNode:TreeNode;
    nodesById: {[key:string]:TreeNode} = {};

    getTreeNodeContentRenderer(node:TreeNode):any {
        return DefaultTreeNodeRenderer;
    }

    getTreeNodeChildrenRenderer(node:TreeNode):any {
        return DefaultTreeNodeChildrenRenderer;
    }

    getChildrenData(node:TreeNode):any {
        return node.data.children;
    }

    getSiblingNodes(node:TreeNode):TreeNode[] {
        // TODO implement using ViewQuery ?
        return null; //this.getChildren(node.parent);
    }

    getChildrenDataCount(node:TreeNode):number {
        return node.data.children ? node.data.children.length : 0;
    }

    /**
     * Keeps tracks of the currently selected node
     * @param node
     * @param selected
     */
    // TODO Extract nodeSelectionService
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

    // TODO add parentNode and store children: TreeNode[] in the TreeNode Component
    register(node:TreeNode):string {
        node.onSelectedChanged((selected:boolean) => this.onSelectedChanged(node, selected));

        if (node.parent){
            node.parent.registerChildNode(node);
        }

        // Generate uniqueId
        // TODO Extract an IdGeneratorService
        const id:string = "node-"+this.currentId++;
        this.nodesById[id] = node;
        return id;
    }

    unregister(node:TreeNode):void {
        console.log('unregister '+node.getId());
        if (this.selectedNode === node){
            //setTimeout(() => {
                // Deselect node
                this.selectedNode = undefined;
            //}, 0);
        }
        delete this.nodesById[node.getId()];
    }

    getNodeById(id:string):TreeNode{
        return this.nodesById[id];
    }
}


