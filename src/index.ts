import './views/control-panel';
import './views/app-main';
import { GameManager } from './game-manager';

document.addEventListener('DOMContentLoaded', (event) => {
    /* Needs to be here rather than part of app-main because on the iPhone
       rotating the world could freeze the screen */
    var canvas = <HTMLCanvasElement>document.getElementById("renderCanvas");
    var gameManager = new GameManager(canvas);

    function resizeCanvas() {
        canvas.style.width = document.body.clientWidth + 'px';
    }
    resizeCanvas();

    window['gameManager'] = gameManager;
    gameManager.start();
    gameManager.engine.resize();

    window.addEventListener("resize", ()=>{
        resizeCanvas();
        gameManager.engine.resize();
    });
})

// This is needed for iOS devices
function preventPullToRefresh(element) {
    var prevent = false;

    document.querySelector(element).addEventListener('touchstart', function(e) {
        if (e.touches.length !== 1) { return; }

        var scrollY = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop;
        prevent = (scrollY === 0);
    });

    document.querySelector(element).addEventListener('touchmove', function(e) {
        if (prevent) {
            prevent = false;
            e.preventDefault();
        }
    });
}

preventPullToRefresh('body');