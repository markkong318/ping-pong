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

export class GameApplication extends Application {
  private _gameModel: GameModel;
  private _gameController: GameController;
  private _gameView: GameView;
  private _engine: Engine;

  constructor(options?) {
    super(options);
    this.preload();
  }

  public preload(): void {
    this.loader
      // .add(FRUIT_NAME_1, veggies_1)
      // .add(FRUIT_NAME_2, veggies_4)
      // .add(FRUIT_NAME_3, veggies_11)
      // .add(FRUIT_NAME_4, veggies_13)
      // .add(FRUIT_NAME_5, veggies_17)
      .load((loader, resources) => {

        // Bottle.set(`fruit_texture_${FRUIT_ID_1}`, PIXI.Texture.from(FRUIT_NAME_1));
        // Bottle.set(`fruit_texture_${FRUIT_ID_2}`, PIXI.Texture.from(FRUIT_NAME_2));
        // Bottle.set(`fruit_texture_${FRUIT_ID_3}`, PIXI.Texture.from(FRUIT_NAME_3));
        // Bottle.set(`fruit_texture_${FRUIT_ID_4}`, PIXI.Texture.from(FRUIT_NAME_4));
        // Bottle.set(`fruit_texture_${FRUIT_ID_5}`, PIXI.Texture.from(FRUIT_NAME_5));

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

    this.stage.addChild(this._gameView);

    this.resizeView();
  }

  public resizeView(): void {
    const scale = Math.min(this.renderer.width / this._gameView.size.width, this.renderer.height / this._gameView.size.height);

    this._gameView.scale.x = scale;
    this._gameView.scale.y = scale;

    this._gameView.x = (this.renderer.width - this._gameView.size.width * scale) / 2;
    this._gameView.y = (this.renderer.height - this._gameView.size.height * scale) / 2;
  }
}
