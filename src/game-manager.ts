import * as BABYLON from '@babylonjs/core';
import { AnimationManager } from "./animation-manager";
import { SceneManager } from "./scene-manager";
import { AssetLoader } from "./asset-loader";
import { AvatarCreator, SkeletonCreator } from "./avatar";
import { store } from './redux/store';
import { restartAnimation, setAvatar, setAvatarColour, setEnableReflection } from './redux/actions';
import { ThemeManager } from './theme-manager'
//import * as BABYLONDEBUG from '@babylonjs/inspector'

export class GameManager {
    canvas: HTMLCanvasElement;
    engine: BABYLON.Engine;
    sceneManager: SceneManager;
    scene: BABYLON.Scene;
    animationManager: AnimationManager;
    assetLoader: AssetLoader;
    themeManager: ThemeManager;
    renderingStarted = false;

    constructor(canvas: HTMLCanvasElement) {
        BABYLON.Database.IDBStorageEnabled = true;
        this.canvas = canvas;
        this.engine = new BABYLON.Engine(this.canvas, true); // Generate the BABYLON 3D engine
        this.sceneManager = new SceneManager(this.canvas, this.engine);
        this.scene = this.sceneManager.createScene();
        this.animationManager = new AnimationManager(this.scene);

        this.assetLoader = new AssetLoader(this.scene, this.engine)
        this.assetLoader.onAssetsReady =this._onAssetsReady.bind(this);
        store.subscribe(this.handleStateChange.bind(this));
    }

    handleStateChange() {
        // When the first animation starts, that's when we are ready for rendering
        if(!this.renderingStarted && store.getState().isAnimating) {
            this.renderingStarted = true;
            this.engine.runRenderLoop(function() {
                this.scene.render();
            }.bind(this));
        }
    }

    start(): void {
        this.assetLoader.load()
    }

    private _attachKeyDebugger() {
        this.scene.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(
                BABYLON.ActionManager.OnKeyDownTrigger, evt=>{
                    var key = evt.sourceEvent.key;
                    console.log(key);
                    if(key == 'C' || key == 'c') {
                        var camera = this.sceneManager.getCamera();
                        console.log([camera.alpha, camera.beta, camera.radius]);
                    }
                })
        );
    }

    private _onAssetsReady(avatarCreators: Map<string, AvatarCreator>, skeletonCreators: Map<string, SkeletonCreator>): void {
        this.themeManager = new ThemeManager(this.animationManager, this.sceneManager, avatarCreators);
        store.dispatch(setAvatar(0, 'human'))
        store.dispatch(setAvatar(1, 'human'))

        skeletonCreators.forEach((creater, name) => {
            this.animationManager.setSkeletonCreator(name, creater);
        });

        store.dispatch(setAvatarColour(0, {Body: [1, 0, 0]}));
        store.dispatch(setAvatarColour(1, {Body: [0, 0, 1]}));

        store.dispatch(restartAnimation());

        this.scene.actionManager = new BABYLON.ActionManager(this.scene);
        this._attachKeyDebugger();

        //BABYLONDEBUG.Inspector.Show(this.scene, {});
    }
}