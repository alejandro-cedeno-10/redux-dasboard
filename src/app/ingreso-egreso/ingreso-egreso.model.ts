export class IngresoEgreso{
    description: string;
    monto: number;
    tipo: string;
    uid?: string;

    constructor(obj : dataObj){
        this.description =  obj.description  ;
        this.monto = obj.monto  ;
        this.tipo = obj.tipo ;
        if(obj.uid){
            this.uid = obj.uid ;
        }

    }
}

interface dataObj {
    description : string,
    monto: number;
    tipo : string;
    uid : string;
  }