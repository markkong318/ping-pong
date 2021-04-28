import {Controller} from "../../framework/controller";
import {GameModel} from "../model/game-model";
import Bottle from "../../framework/bottle";
import Event from "../../framework/event";
import {EVENT_PLAYER_MOVE} from "../util/env";

export class GameController extends Controller {
  private _gameModel: GameModel;

  constructor() {
    super();

    this._gameModel = Bottle.get('gameModel');
  }
}
