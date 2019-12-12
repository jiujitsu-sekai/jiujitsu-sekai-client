import { store } from './redux/store';
import { AnimationManager } from "./animation-manager";
import { SceneManager } from "./scene-manager";
import { AvatarCreator } from "./avatar";
import * as BABYLON from '@babylonjs/core';
import { StateCondition, Scene } from '@babylonjs/core';
import { colorCorrectionPixelShader } from '@babylonjs/core/Shaders/colorCorrection.fragment';

export class ThemeManager {
    private _currentAvators: Array<string> = [null, null];
    private _currentAvatarColours: Array<object> = [null, null];
    private _currentEnableReflection: boolean;
    private _currentEnableShadow: boolean;
    animationManager: AnimationManager;
    sceneManager: SceneManager;
    avatarCreators: Map<string, AvatarCreator>;

    constructor(animationManager: AnimationManager,
        sceneManager: SceneManager,
        avatarCreators: Map<string, AvatarCreator>) {
        this.animationManager = animationManager;
        this.sceneManager = sceneManager;
        this.avatarCreators = avatarCreators;
        store.subscribe(this.handleReduxAction.bind(this));
    }

    private _getAllMeshes(): Array<BABYLON.Mesh> {
        return this.animationManager.getMeshes(0).concat(this.animationManager.getMeshes(1))
    }

    private handleReduxAction() {
        var theme = store.getState().theme;
        if(this._currentAvators != theme.avatars) {
            this._avatarsChanged();
        }
        if(this._currentAvatarColours != theme.avatarColours) {
            this._avatarColourChanged();
        }
        var state = store.getState();

        if(theme.enableReflection != this._currentEnableReflection && this.animationManager.isAvatarReady()) {
            this._currentEnableReflection = theme.enableReflection;
            this.sceneManager.setEnableReflection(this._getAllMeshes(), theme.enableReflection);
        }

        if(theme.enableShadow != this._currentEnableShadow && this.animationManager.isAvatarReady()) {
            this._currentEnableShadow = theme.enableShadow;
            this.sceneManager.setEnableShadow(this._getAllMeshes(), theme.enableShadow);
        }
    }

    private _avatarsChanged() {
        [0, 1].forEach(i=>{
            var meshName = store.getState().theme.avatars[i];
            var avatar = this.animationManager.getAvatar(i);
            if(!(avatar && meshName == avatar.meshName)) {
                var creator = this.avatarCreators.get(meshName);
                if(creator) {
                    this.animationManager.setAvatar(i, creator.create('player' + (i+1)));
                }
            }
        });
    }

    private _avatarColourChanged() {
        var createBasicMaterial = function(name: string, colour: BABYLON.Color3) {
            var mat = new BABYLON.StandardMaterial(name, this.scene);
            mat.diffuseColor = colour;
            mat.specularColor = new BABYLON.Color3(0.3, 0.3, 0.3);
            return mat;
        }.bind(this);

        function colourEq(c1: Array<number>, c2: BABYLON.Color3): boolean {
            return c1 && c2 && c1[0] == c2.r && c1[1] == c2.g && c1[2] == c2.b;
        }

        [0, 1].forEach(i=>{
            var avatar = this.animationManager.getAvatar(i);
            if(!avatar) return;
            avatar.getMeshComponentNames().forEach(component=>{
                var colour = avatar.getMaterial(component);
                var newAvatarColours = store.getState().theme.avatarColours[i]
                if(!newAvatarColours) return;
                var newColour = newAvatarColours[component];
                if(!newColour || colourEq(newColour, colour.diffuseColor))
                    return;

                this.animationManager.getAvatar(i).setMaterial(component,
                    createBasicMaterial("player" + (i+1) + component,
                    new BABYLON.Color3(newColour[0], newColour[1], newColour[2])));
            })
        })
    }
}