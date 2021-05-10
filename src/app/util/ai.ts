import * as PIXI from 'pixi.js';
import gsap from 'gsap';

import Bottle from '../../framework/bottle';
import Event from '../../framework/event';
import {
  AI_SAMPLE_RATE,
  EVENT_PLAYER2_MOVE,
} from "./env";

export class Ai {
  private _ball: PIXI.Sprite;
  private _player:  PIXI.Sprite;

  private _sample: number;

  private _moveOffset: number;

  private _timeline: gsap.core.Timeline;

  constructor() {
    this._ball = Bottle.get('ballSprite');
    this._player = Bottle.get('player2Sprite');

    this._sample = 0;

    PIXI.Ticker.shared.add((delta) => {
      this._sample++;

      if (this._sample % AI_SAMPLE_RATE == 0) {
        this.move();
      }
    });

    this._timeline = gsap.timeline();
  }

  move() {
    this._timeline.to({
      val: 0,
      prev: 0,
    }, {
      val: this._ball.y - this._player.y,
      duration: AI_SAMPLE_RATE / 60,
      ease: 'none',
      onUpdate: function() {
        const obj = this.targets()[0];

        const diff = obj.val - obj.prev;
        Event.emit(EVENT_PLAYER2_MOVE, diff);

        obj.prev = obj.val;
      }
    });
  }
}
