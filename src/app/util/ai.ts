import * as PIXI from 'pixi.js';
import Bottle from '../../framework/bottle';
import Event from '../../framework/event';
import {EVENT_PLAYER2_MOVE} from "./env";

export class Ai {
  private _ball: PIXI.Sprite;
  private _player:  PIXI.Sprite;

  private _ticker: PIXI.Ticker;

  constructor() {
    this._ball = Bottle.get('ballSprite');
    this._player = Bottle.get('player2Sprite');

    this._ticker = PIXI.Ticker.shared;
    this._ticker.autoStart = false;

    this._ticker.add((delta) => {
      Event.emit(EVENT_PLAYER2_MOVE, this._ball.y - this._player.y)
    });
  }
}
