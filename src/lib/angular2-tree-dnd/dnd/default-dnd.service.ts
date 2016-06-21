import {TreeNode, DragAndDropService} from '../index'

export class DefaultDragAndDropService implements DragAndDropService {

    dropNode(parent:TreeNode, index:number, childData:any) {
        parent.addChildData(index, childData);
    }

    drop(parent:TreeNode, index:number, $event:any):void {
        $event.preventDefault();
        const data:any = $event.dataTransfer.getData("data");
        const node:TreeNode = $event.dataTransfer.getData("node");
        // TODO Fix this
        // if (node) {
        //     this.dropped(node);
        // }
        this.dropNode(parent, index, data);
    }

    dropped(node:TreeNode):void {
        node.remove();
    }

    dragNode(node:TreeNode):any {
        return node.data;
    }

    drag(node:TreeNode, $event:any):void {
        $event.dataTransfer.setData("data", this.dragNode(node));
        $event.dataTransfer.setData("node", node);
        // TODO set the node renderer id
        console.log($event.target.id);
        // $event.dataTransfer.setData("text", $event.target.id);
    }

    allowDropNode(parent:TreeNode, childData:any):boolean {
        console.log("Allow drop node "+ parent.getId());
        return true;
    }

    allowDrop(parent:TreeNode, index:number, $event:any):void {
        // TODO Prevent droping a node as one of its children
        if (this.allowDropNode(parent, $event.dataTransfer.getData("data"))) {
            $event.preventDefault();
        }
    }
}