import * as PIXI from 'pixi.js';
import {Size} from '../../framework/size';
import Bottle from '../../framework/bottle';
import Event from '../../framework/event';
import {EVENT_PLAYER1_OUT, EVENT_PLAYER2_OUT, PLAYER1_ID, PLAYER2_ID} from "./env";

export class Engine {
  private _ball: PIXI.Sprite;
  private _player1: PIXI.Sprite;
  private _player2:  PIXI.Sprite;
  private _size: Size;

  private _dx: number = 1 / Math.pow(2, 0.5);
  private _dy: number = 1 / Math.pow(2, 0.5);

  private _ticker: PIXI.Ticker;

  private _speed: number = 15;

  constructor() {
    this._ball = Bottle.get('ballSprite');
    this._player1 = Bottle.get('player1Sprite');
    this._player2 = Bottle.get('player2Sprite');
    this._size = Bottle.get('size');

    this._ticker = PIXI.Ticker.shared;
    this._ticker.autoStart = false;


    this._ticker.add((delta) => {
      for (let i = 0; i < 3; i++) {
        this._ball.x += this._dx;
        this._ball.y += this._dy;

        if (this._ball.x <= 0 || this._ball.x >= this._size.width) {
          this._dx = -this._dx
        }

        if (this._ball.y <= 0 || this._ball.y >= this._size.height) {
          this._dy = -this._dy
        }

        if (this.isCollided(this._player1)) {
          this._dx = -this._dx;
        }

        if (this.isCollided(this._player2)) {
          this._dx = -this._dx;
        }

        if (this.isOut()) {
          console.log("out");
          break;
        }
      }
    });
  }

  start() {
    this._ticker.start();
  }

  stop() {
    this._ticker.stop();
  }

  isCollided(sprite: PIXI.Sprite) {
    if (this._ball.x - this._ball.width / 2 >= sprite.x - sprite.width / 2 &&
      this._ball.x - this._ball.width / 2 <= sprite.x + sprite.width / 2 &&
      this._ball.y - this._ball.height / 2 >= sprite.y - sprite.height / 2 &&
      this._ball.y - this._ball.height / 2 <= sprite.y + sprite.height / 2) {
      return true;
    }

    if (this._ball.x - this._ball.width / 2 >= sprite.x - sprite.width / 2 &&
      this._ball.x - this._ball.width / 2 <= sprite.x + sprite.width / 2 &&
      this._ball.y + this._ball.height / 2 >= sprite.y - sprite.height / 2 &&
      this._ball.y + this._ball.height / 2 <= sprite.y + sprite.height / 2) {
      return true;
    }

    if (this._ball.x + this._ball.width / 2 >= sprite.x - sprite.width / 2 &&
      this._ball.x + this._ball.width / 2 <= sprite.x + sprite.width / 2 &&
      this._ball.y - this._ball.height / 2 >= sprite.y - sprite.height / 2 &&
      this._ball.y - this._ball.height / 2 <= sprite.y + sprite.height / 2) {
      return true;
    }

    if (this._ball.x + this._ball.width / 2 >= sprite.x - sprite.width / 2 &&
      this._ball.x + this._ball.width / 2 <= sprite.x + sprite.width / 2 &&
      this._ball.y + this._ball.height / 2 >= sprite.y - sprite.height / 2 &&
      this._ball.y + this._ball.height / 2 <= sprite.y + sprite.height / 2) {
      return true;
    }

    return false;
  }

  isOut() {
    if (this._ball.x <= 0) {
      Event.emit(EVENT_PLAYER1_OUT);
      this.stop();
      return true;
    }

    if (this._ball.x >= this._size.width) {
      Event.emit(EVENT_PLAYER2_OUT);
      this.stop();
      return true;
    }

    return false;
  }
}
