import * as BABYLON from '@babylonjs/core'
import { StandardMaterial } from '@babylonjs/core';
import { store } from './redux/store';
import { FloorTypes } from './redux/types';
import {CameraManager} from './camera-manager';

export class SceneManager {
    canvas: HTMLCanvasElement;
    engine: BABYLON.Engine;
    scene: BABYLON.Scene;
    private _cameraManager: CameraManager;
    private _pointLight: BABYLON.PointLight;
    private _ground: BABYLON.Mesh;
    private _shadowGenerator: BABYLON.ShadowGenerator;
    private _currentFloorColour: Array<number>;
    private _currentBackgroundColour: Array<number>;
    private _skyBoxName: string;
    private _skyBox: BABYLON.Mesh;
    private _floorTexture: string;

    constructor(canvas: HTMLCanvasElement, engine: BABYLON.Engine) {
        this.canvas = canvas;
        this.engine = engine;
    }

    createScene(): BABYLON.Scene {

        // Create the scene space
        var scene = new BABYLON.Scene(this.engine);
        this._cameraManager = new CameraManager(this.canvas, scene);
        this._cameraManager.createCamera();

        // Add lights to the scene
        var hemisphericLight = new BABYLON.HemisphericLight("hemisphericLight", new BABYLON.Vector3(0, 300, 0), scene);
        hemisphericLight.intensity = 0.3;
        this._pointLight = new BABYLON.PointLight("PointLight", new BABYLON.Vector3(0, 300, 0), scene);

        this.scene = scene;
        this.createDojo()

        store.subscribe(this.handleStateChange.bind(this));

        return scene;
    };

    getCamera(): BABYLON.ArcRotateCamera {
        return this._cameraManager.getCamera();
    }

    setEnableShadow(meshes: BABYLON.Mesh[], enable: boolean): void {
        if(enable) {
            if(!this._shadowGenerator) {
                this._shadowGenerator = new BABYLON.ShadowGenerator(1024, this._pointLight);
                this._shadowGenerator.usePoissonSampling = true;
            }

            meshes.forEach(mesh=>{
                this._shadowGenerator.addShadowCaster(mesh, true);
            });
            this._ground.receiveShadows = true;
        }
        else {
            this._ground.receiveShadows = false;
        }
    }

    handleStateChange() {
        var theme = store.getState().theme;
        var floorColour = theme.floorColour;

        if(this._floorTexture != theme.floorTexture) {
            this._floorTexture = theme.floorTexture;
            this._ground.material = this._getFloorMaterial();
        }

        if(floorColour && this._currentFloorColour != floorColour) {
            this._currentFloorColour = floorColour;
            this._ground.material = this._getFloorMaterial();
        }

        var backgroundColour = theme.backgroundColour;

        if(this._currentBackgroundColour != backgroundColour) {
            this._currentBackgroundColour = backgroundColour
            var [r, g, b] = backgroundColour;
            this.scene.clearColor = new BABYLON.Color4(r, g, b, 1);
        }

        if(this._skyBoxName != theme.skyBoxName) {
            this._skyBoxName = theme.skyBoxName;
            this.setSkyBox(theme.skyBoxName);
        }
    }
    private _getFloorMaterial() : BABYLON.StandardMaterial {
        var groundMaterial = <StandardMaterial>this._ground.material;
        if(!groundMaterial) {
            groundMaterial = new BABYLON.StandardMaterial("groundMaterial", this.scene);
        }
        groundMaterial.emissiveColor = BABYLON.Color3.Black();
        groundMaterial.specularColor = BABYLON.Color3.Black();
        //groundMaterial.backFaceCulling = false;
        var theme = store.getState().theme;
        if(theme.floorTexture != 'undefined') {
            var texture = new BABYLON.Texture('textures/' + theme.floorTexture, this.scene );
            texture.uScale = 5;
            texture.vScale = 5;
            groundMaterial.diffuseTexture = texture;
            groundMaterial.diffuseColor = BABYLON.Color3.White();
        }
        else {
            var [r, g, b] = theme.floorColour;
            groundMaterial.diffuseColor = new BABYLON.Color3(r, g, b);
            groundMaterial.diffuseTexture = null;
        }
        return groundMaterial;
    }

    setEnableReflection(meshes: BABYLON.Mesh[], enable: boolean) {
        if(enable) {
            var groundMaterial = <StandardMaterial>this._ground.material;
            var reflectionTexture = new BABYLON.MirrorTexture("mirror", 1024, this.scene, true);
            reflectionTexture.mirrorPlane = new BABYLON.Plane(0, -1.0, 0, -2.0);
            reflectionTexture.level = 1;
            reflectionTexture.renderList = meshes;
            groundMaterial.reflectionTexture = reflectionTexture;
            this._ground.material = groundMaterial;
        }
        else { 
            var mat = <StandardMaterial>this._ground.material
            if(mat) {
                mat.reflectionTexture = null;
            }
        }
    }

    setSkyBox(skyBoxName: string) {
        if(skyBoxName) {
            if(!this._skyBox) {
                this._skyBox = BABYLON.MeshBuilder.CreateBox("skyBox", {size:2000.0}, this.scene);
                let skyboxMaterial = new BABYLON.StandardMaterial("skyBox", this.scene);
                this._skyBox.material = skyboxMaterial;			
            }
            else {
                this._skyBox.setEnabled(true);
            }

            let skyboxMaterial = <StandardMaterial>this._skyBox.material;
            skyboxMaterial.backFaceCulling = false;
            skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("textures/" + skyBoxName, this.scene);
            skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
            skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
            skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
        }
        else {
            this._skyBox.setEnabled(false);
        }
    }

    createDojo() {
        this._ground = BABYLON.Mesh.CreatePlane("ground1", 2000, this.scene);

        this._ground.position.y = 0.0;
        this._ground.rotation = new BABYLON.Vector3(Math.PI / 2, 0, 0);  
    }
}