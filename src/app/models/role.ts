import {Privilege} from "./privilege";

export class Role {
  public id: number;
  public name: string;
  public privileges: Privilege[];
}
