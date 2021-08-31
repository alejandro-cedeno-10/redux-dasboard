export class User {
  public name: string;
  public email: string;
  public uid: string;

  constructor(obj : dataObj) {
    this.name =  obj.name  ;
    this.email = obj.email  ;
    this.uid = obj.uid ;
  }
}

interface dataObj {
  uid : string,
  email: string;
  name : string
}