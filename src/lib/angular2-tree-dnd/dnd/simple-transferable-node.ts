import  {TransferableNode} from '../';

export class SimpleTransferableNode implements TransferableNode {

    data:any;

    constructor(private id:string, data:any) {
        this.data = data;
    }

    getId():string {
        return this.id;
    }

}
