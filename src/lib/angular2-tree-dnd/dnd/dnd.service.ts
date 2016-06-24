import {TreeNode, TransferableNode} from '../index'

export abstract class DragAndDropService {
    drop:(parent:TreeNode, index:number, $event:any) => void;
    drag:(nodeTransferable:TransferableNode, $event:any)=>void;
    allowDrop:(parent:TreeNode, index:number, $event:any)=>void;
}