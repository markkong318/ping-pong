import {Model} from "../../framework/model";

export class GameModel extends Model {
  public player1Score: number = 0;
  public player2Score: number = 0;

  public isStart: boolean = false;
}
