import FontFaceObserver from 'fontfaceobserver';
import gsap from 'gsap';
import PixiPlugin from "gsap/PixiPlugin";

import {GameApplication} from "./app/game-application";
import * as PIXI from 'pixi.js';

var font = new FontFaceObserver('press-start-2p-v9-latin')
font.load()
  .then(() => {
    window.PIXI = PIXI;

    PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

    PixiPlugin.registerPIXI(PIXI);
    gsap.registerPlugin(PixiPlugin);

    const app = new GameApplication({
      width: window.innerWidth,
      height: window.innerHeight,
      resizeTo: window
    });
    document.body.appendChild(app.view);

    window.onresize = () => {
      app.renderer.resize(window.innerWidth, window.innerHeight);
      app.resizeView();
    };
  });
