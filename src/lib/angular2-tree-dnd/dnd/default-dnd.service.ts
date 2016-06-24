import {Injectable} from '@angular/core';
import {TreeNode, DragAndDropService, RegisterService, TransferableNode} from '../'

@Injectable()
export class DefaultDragAndDropService implements DragAndDropService {

    private transferableNode:TransferableNode;

    constructor(private register:RegisterService) {
    }

    dropNode(parent:TreeNode, index:number, childData:any) {
        parent.addChildData(index, childData);
    }

    drop(parent:TreeNode, index:number, $event:any):void {
        $event.preventDefault();
        this.onNodeMoved(this.transferableNode);
        this.dropNode(parent, index, this.transferableNode.data);
        this.transferableNode = null;
    }

    onNodeMoved(transferableNode:TransferableNode):void {
        const node:TreeNode = this.register.getNodeById(transferableNode.getId());
        // The node can be null if the node is dragged from somewhere else
        if (node) {
            node.remove();
        }
    }

    drag(transferableNode:TransferableNode, $event:any):void {
        this.transferableNode = transferableNode;
        $event.dataTransfer.setData("text/plain", transferableNode.getId());
    }

    allowDropNode(parent:TreeNode, transferableNode:TransferableNode):boolean {
        console.log("Allow drop node " + parent.getId());
        return true;
    }

    allowDrop(parent:TreeNode, index:number, $event:any):void {
        if (!this.transferableNode) {
            return;
        }

        // Prevent droping a node as one of its children
        let current:TreeNode = parent;
        while (current) {
            if (current === this.transferableNode){
                return;
            }  
            current = current.parent;
        }
        
        if (!this.allowDropNode(parent, this.transferableNode)) {
            return;
        }
        
        $event.preventDefault();
    }
}