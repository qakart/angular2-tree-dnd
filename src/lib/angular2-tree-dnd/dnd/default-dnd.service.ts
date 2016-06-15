import {TreeNode, DragAndDropService} from '../index'

export class DefaultDragAndDropService extends DragAndDropService {

    dropNode(parent:TreeNode, index:number, childData:any) {
        parent.addChildData(index, childData);
    }

    drop(parent:TreeNode, index:number, $event:any):void {
        $event.preventDefault();
        const data:any = $event.dataTransfer.getData("data");
        const node:TreeNode = $event.dataTransfer.getData("node");
        if (node) {
            this.dropped(node);
        }
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
    }

    allowDropNode(parent:TreeNode, childData:any):boolean {
        return true;
    }

    allowDrop(parent:TreeNode, index:number, $event:any):void {
        if (this.allowDropNode(parent, $event.dataTransfer.getData("data"))) {
            $event.preventDefault();
        }
    }
}