import {Controller} from "../../framework/controller";
import {GameModel} from "../model/game-model";
import Bottle from "../../framework/bottle";
import Event from "../../framework/event";
import {
  EVENT_PLAYER1_OUT,
  EVENT_PLAYER2_OUT,
  EVENT_RENDER_GAME_OVER,
  EVENT_RENDER_SCORE,
  EVENT_START_GAME,
  PLAYER1_ID,
  PLAYER2_ID,
} from "../util/env";

export class GameController extends Controller {
  private _gameModel: GameModel;

  constructor() {
    super();

    this._gameModel = Bottle.get('gameModel');

    Event.on(EVENT_PLAYER1_OUT, () => {
      this.updateScore(PLAYER2_ID, 1);
      this.updateGameOver();
    });

    Event.on(EVENT_PLAYER2_OUT, () => {
      this.updateScore(PLAYER1_ID, 1);
      this.updateGameOver();
    });
  }

  updateScore(playerId, value) {
    switch (playerId) {
      case PLAYER1_ID:
        this._gameModel.player1Score += value;
        break;
      case PLAYER2_ID:
        this._gameModel.player2Score += value;
        break;
      default:
        throw new Error();
    }

    Event.emit(EVENT_RENDER_SCORE);
  }

  updateGameOver() {
    if (this._gameModel.player1Score < 9 &&
      this._gameModel.player2Score < 9) {
      setTimeout(() => {
        Event.emit(EVENT_START_GAME);
      }, 1000);
    }

    Event.emit(EVENT_RENDER_GAME_OVER);
  }
}
