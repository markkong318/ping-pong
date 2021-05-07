import * as PIXI from 'pixi.js';

import veggies_1 from '../assets/images/Froots N Veggies_1.png';
import veggies_4 from '../assets/images/Froots N Veggies_4.png';
import veggies_11 from '../assets/images/Froots N Veggies_11.png';
import veggies_13 from '../assets/images/Froots N Veggies_13.png';
import veggies_17 from '../assets/images/Froots N Veggies_17.png';
import {GameView} from "./view/game-view";
import {GameModel} from "./model/game-model";
import {GameController} from "./controller/game-controller";
import {Application} from "../framework/application"
import {Size} from "../framework/size";
import Bottle from "../framework/bottle";
import Event from "../framework/event";
import {Engine} from "./util/engine";
import {Ai} from "./util/ai";
import {EVENT_START_GAME} from "./util/env";

export class GameApplication extends Application {
  private _gameModel: GameModel;
  private _gameController: GameController;
  private _gameView: GameView;
  private _engine: Engine;
  private _ai: Ai;

  constructor(options?) {
    super(options);
    this.preload();
  }

  public preload(): void {
    this.loader
      .load((loader, resources) => {
        this.onAssetsLoaded();
      });
  }

  public onAssetsLoaded(): void {
    this.initScene();
  }

  public initScene(): void {
    this._gameModel = new GameModel();
    Bottle.set('gameModel', this._gameModel);

    this._gameController = new GameController();

    this._gameView = new GameView();
    this._gameView.size = new Size(480, 800);
    this._gameView.init();

    this._engine = new Engine();
    this._ai = new Ai();

    this.stage.addChild(this._gameView);

    this.resizeView();

    Event.emit(EVENT_START_GAME);
  }

  public resizeView(): void {
    const scale = Math.min(this.renderer.width / this._gameView.size.width, this.renderer.height / this._gameView.size.height);

    this._gameView.scale.x = scale;
    this._gameView.scale.y = scale;

    this._gameView.x = (this.renderer.width - this._gameView.size.width * scale) / 2;
    this._gameView.y = (this.renderer.height - this._gameView.size.height * scale) / 2;
  }
}
