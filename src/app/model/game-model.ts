import {Model} from "../../framework/model";
import {PLAYER1_ID} from "../util/env";

export class GameModel extends Model {
  public player1Score: number = 0;
  public player2Score: number = 0;
}
