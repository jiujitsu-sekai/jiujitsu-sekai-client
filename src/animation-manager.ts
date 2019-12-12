import * as BABYLON from '@babylonjs/core';
import { ANIMATION_CONFIG } from "./animation-config/config";
import { Avatar, SkeletonCreator } from './avatar'
import { store } from './redux/store';
import { setAnimationStatus, setIsAnimating, setSwapSkeleton } from './redux/actions';
import { AnimationStatus } from './redux/types';
import { getHighlightAvatar } from './animation-config/highlight';
import { getSkeletonNum, swapSkeletonIfNeeded } from './animation/swap-skeletons';

export class DuelAction {
    name: string;
    skeleton: string;
    fromFrame1: number;
    toFrame1: number;
    fromFrame2: number;
    toFrame2: number;
    transitions: Array<string>
    speedRadio: number;
    swapSkeletons: string[];

    constructor(config: any, skeleton: BABYLON.Skeleton) {
        this.name = config.name
        this.skeleton = config.skeleton;
        this.fromFrame1 = config.fromFrame + 1;
        this.toFrame1 = config.toFrame + 1;
        var startFrame2 = skeleton.getAnimationRange(this._getActionName(2)).from;
        this.fromFrame2 = startFrame2 + this.fromFrame1;
        this.toFrame2 = startFrame2 + this.toFrame1 + 1;
        this.transitions = config.transitions;
        this.speedRadio = config.speedRadio ? config.speedRadio : 1;
        this.swapSkeletons = config.swapSkeletons || [];
    }

    _getActionName(n: number): string {
        return 'bjjka' + n + 'Action';
    }

    getStartEndFrame(n: number): Array<number> {
        if(n == 0) {
            return [this.fromFrame1, this.toFrame1];
        }
        else {
            return [this.fromFrame2, this.toFrame2];
        }
    }
}

export class AnimationManager {
    scene: BABYLON.Scene;
    avatars: Avatar[];
    duelActions: Map<string, DuelAction>;
    private _skeletonCreators: Map<string, SkeletonCreator>;
    private _animationStatus: string;
    config: Map<string, object>

    constructor(scene: BABYLON.Scene) {
        this.config = ANIMATION_CONFIG;
        this.scene = scene;
        this.avatars = [];
        this.duelActions = new Map();
        this._skeletonCreators = new Map();
        store.subscribe(this.handleAction.bind(this));
    }

    handleAction() {
        var state = store.getState();
        if(this._animationStatus == state.animationStatus) {
            return;
        }

        this._animationStatus = state.animationStatus;
        if(state.animationStatus == AnimationStatus.RUN_TO_NEXT_FRAME ||
            state.animationStatus == AnimationStatus.KEEP_RUNNING) {
            this.animate(state.currentAnimation.animationId);
        }
        else if (state.animationStatus == AnimationStatus.REWIND) {
            this.animate(state.currentAnimation.animationId, true);
        }
    }

    setAvatar(n: number, avatar: Avatar) {
        var oldAvatar = this.avatars[n];
        this.avatars[n] = avatar;
        if(oldAvatar) {
            var oldMesh = oldAvatar.mesh;
            if(oldMesh.skeleton) {
                avatar.mesh.skeleton = oldMesh.skeleton;

                var meshes = this.getMeshes(n);
                meshes.forEach((mesh: BABYLON.Mesh)=>{
                    mesh.skeleton = oldMesh.skeleton;
                });

                oldMesh.skeleton = null;

                this._animateSingleMeshes(n, this._getLastActionName(), false);
            }
            if(oldMesh.isEnabled()) {
                oldAvatar.mesh.setEnabled(false);
            }
        }

        if(!avatar.mesh.isEnabled()) {
            avatar.mesh.setEnabled(true);
        }
    }

    isAvatarReady(): boolean {
        return this.avatars.length == 2 && Boolean(this.avatars[0] && this.avatars[1]);
    }

    getAvatar(n: number): Avatar {
        return this.avatars[n];
    }

    getMeshes(n=0): Array<BABYLON.Mesh> {
        return this.avatars[n].getMeshes();
    }

    setSkeletonCreator(name: string, skeletonCreator: SkeletonCreator) {
        this._skeletonCreators.set(name, skeletonCreator);
    }

    getSkeleton(skeletonName: string, n: number) {
        return this._skeletonCreators.get(skeletonName).create('player' + (n+1));
    }
    
    getAction(actionName: string): DuelAction {
        if(!this.duelActions.has(actionName)) {
            let cfg = ANIMATION_CONFIG.get(actionName);
            this.duelActions.set(actionName,
                new DuelAction(cfg, this.getSkeleton(cfg.skeleton, 0)));
        }

        return this.duelActions.get(actionName);
    }
    
    getLastAction(): DuelAction {
        return this.getAction(this._getLastActionName());
    }

    _getLastActionName(): string {
        return store.getState().currentAnimation.animationId;
    }

    getNextTransitions() {
        return this.getLastAction().transitions;
    }

    hasTransitions(): boolean {
        return this.getNextTransitions().length > 0;
    }

    _getAnimatable(n: number, actionName: string, inReverse=false) {
        /**
         * Use this so that we could create the neccessary cloning
         * BEFORE running the animation to avoid starting one
         * animation before the other skeleton/mesh is created
         */
        var action = this.getAction(actionName);
        var skeletonName = action.skeleton;

        var skeletonNum = getSkeletonNum(n);
        let skeleton = this.getSkeleton(skeletonName, skeletonNum)
        let meshes = this.getMeshes(n);
        let frames = action.getStartEndFrame(skeletonNum);
        let speedRadio = action.speedRadio;

        meshes.forEach((mesh: BABYLON.Mesh)=>{
            mesh.skeleton = skeleton;
        });

        if(inReverse) {
            speedRadio *= -1;
            frames = [frames[1], frames[0]]
        }

        var res = () => {
            this._setHighlight(skeletonNum, true);
            // Only notify animation end for one of them
            this.scene.beginAnimation(skeleton, frames[0], frames[1], false, speedRadio,
                skeletonNum ? this._onAnimationEnd.bind(this) : null); 
        };

        return res;
    }

    private _onAnimationEnd() {
        var state = store.getState();
        var status = state.animationStatus;
        var transitions = state.currentAnimation.transitions;
        if(!transitions.length) {
            status = AnimationStatus.STOPPED
        }
        else {
            status = status == AnimationStatus.KEEP_RUNNING ? AnimationStatus.FRAME_ENDED : AnimationStatus.STOPPED;
        }
        if(status == AnimationStatus.STOPPED) {
            this._setHighlight(0, false);
            this._setHighlight(1, false);
        }
        store.dispatch(setAnimationStatus(status));
    };

    private _setEmission(colour: BABYLON.Color3, avatar: Avatar, components) {
        /* Convinient function to set the emission of a avatar materials */
        components.forEach(component=>{
            var mat = avatar.getMaterial(component)
            if(!mat.emissiveColor.equals(colour)) {
                mat.emissiveColor = colour;
                avatar.setMaterial(component, mat);
            }
        });
    }


    private _setHighlight(n: number, hightlight: boolean) {
        var state = store.getState();

        // Only do highlight if this camera option is turned on
        if(hightlight && !state.cameraOption.highlightAvatar) {
            return;
        }

        var avatar = this.getAvatar(n);
        var components = avatar.getMeshComponentNames();

        // Default the highlight if not defined
        var highlightAvatar = getSkeletonNum(getHighlightAvatar(state.currentAnimation.highlightAvatar));

        if(hightlight && highlightAvatar == n) {
            // Turn on highlight
            components.forEach(component=>{
                var colour = avatar.getMaterial(component).diffuseColor.scale(0.5);
                this._setEmission(colour, avatar, components);
            })
        }
        else {
            // Turn off highlight
            components.forEach(component=>{
                this._setEmission(BABYLON.Color3.Black(), avatar, components);
            })
        }
    }

    _animateSingleMeshes(n: number, actionName: string, inReverse=false): void {
        this._getAnimatable(n, actionName, inReverse)();
    }

    _animateAllMeshes(actionName: string, inReverse=false): void {
        // If action suggests swap skeleton then on next transition, swap the skeleton
        if(!this.isAtInitialState()) {
            var action = this.getLastAction();
            swapSkeletonIfNeeded(actionName, action.swapSkeletons);
        }

        var animatables = [0,1].map((n)=>this._getAnimatable(n, actionName, inReverse));
        animatables.forEach((x)=>x());
    }

    isAtInitialState() {
        return store.getState().animationHistory.length == 1;
    }
    
    animate(actionName: string, inReverse=false): void {
        this._animateAllMeshes(actionName, inReverse);
        store.dispatch(setIsAnimating(true));
    }

    isAtEndState(): boolean {
        return !this.getLastAction().transitions.length;
    }
}