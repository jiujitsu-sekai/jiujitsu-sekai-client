import * as BABYLON from '@babylonjs/core'
import { store } from './redux/store';
import { CameraOptionType, CameraPositionType, AnimationStatus } from './redux/types';
import { TimeProgression,
         TimeProgressionValue,
         TimeProgressionVector3 } from './time-progress';
import { setCameraIsAdjusting } from './redux/actions';

const CAMERA_DEFAULT_RADIUS = 400;
export const CAMERA_RADIUS_STEP = 50;
const MAX_ROTATION_SENSITIVITY = 2800;
const CAMERA_CHASE_SPEED = 400;
export const RADIAN = Math.PI * 2;
const VECTOR3_ALL_TWO = new BABYLON.Vector3(2, 2, 2);

export class TargetChaser {
    lastCameraPosition:  CameraPositionType;
    chaseSpeed: number;
    _camera: BABYLON.ArcRotateCamera;
    _timeProgression: TimeProgression;
    _targetProgressValue: TimeProgressionVector3;
    _cameraPositionProgressValue: {
        alpha: TimeProgressionValue,
        beta: TimeProgressionValue,
        radius: TimeProgressionValue
    }

    constructor(camera: BABYLON.ArcRotateCamera, chaseSpeed = CAMERA_CHASE_SPEED) {
        this._camera = camera;
        this.chaseSpeed = chaseSpeed;
    }

    private _setTimeProgression(now?: number) {
        if(!this._timeProgression || this._timeProgression.hasFinished()) {
            if(!now) {
                now = (new Date()).valueOf();
            }
            this._timeProgression = new TimeProgression(now, CAMERA_CHASE_SPEED);
        }
    }

    isChasing(): boolean {
        return this._timeProgression && !this._timeProgression.hasFinished();
    }

    chaseSmooth(target: BABYLON.Vector3, now?: number) {
        this._setTimeProgression(now);
        this._targetProgressValue = new TimeProgressionVector3(this._camera.target, target);
    }

    setCameraOptionSmooth(position: CameraPositionType, now?: number) {
        this._setTimeProgression(now);
        this.lastCameraPosition = position;

        var tpv = function(r1: number, r2: number): TimeProgressionValue {
            var [res1, res2] = this._shortestAngularPath(r1, r2);
            return new TimeProgressionValue(res1, res2);
        }.bind(this);

        this._cameraPositionProgressValue = {
            alpha: tpv(this._camera.alpha, position.alpha),
            beta: tpv(this._camera.beta, position.beta),
            radius: new TimeProgressionValue(this._camera.radius, position.radius)
        };
    }

    _shortestAngularPath(fromRad: number, toRad: number): [number, number] {
        /**
         * Noralises shortest path form fromRad to toRad.
         * 
         * Let say we want to go from 0.1Rad to -0.1Rad
         * After normalising we're really going from 0.1Rad to (2PI - 0.1) Rad
         * which is a lot of rotation for no good reason.
         * Per function doc stated in _normaliseRadian, the normalisation is to prevent
         * spinning the camera multiple revolutions.
         * This step further optimise rotation by finding the shorting rotation to destination.
         * 
         * @param fromRad The radian value where smooth transition starts.
         *                 Does not require to be normalised
         * @param toRad The radian value where smooth transition ends.
         *                 Does not require to be normalised
         * 
         * @return Returns a tuple (fromRad, toRad) that has been normliased.
         */
        fromRad = this._normaliseRadian(fromRad);
        toRad = this._normaliseRadian(toRad);
        if(Math.abs(toRad-fromRad) <= Math.PI) {
            return [fromRad, toRad];
        }

        if(toRad > fromRad) {
            return [fromRad, toRad - Math.PI*2];
        }

        return [fromRad - Math.PI*2, toRad];
    }

    _normaliseRadian(radian: number): number {
        /**
         * Normalisation is important because if user rotated the camera a few times (alpha=10.1PI)
         * and we want to smoothly transition back to 0
         * rotate the camera 5 times to go back to 0. We want to just go 0.1Rad->0Rad
         */
        if(!radian) {
            return 0;
        }
        if(radian < 0) {
            radian += Math.ceil(-radian / RADIAN) * RADIAN;
        }

        return radian % RADIAN;
    }

    next(now?: number) {
        var tp = this._timeProgression;
        if (!tp) {
            return;
        }

        if (tp.hasFinished()) {
            this._targetProgressValue = null;
            this._cameraPositionProgressValue = null;
            return;
        }

        if(!now) {
            now = (new Date()).valueOf();
        }

        tp.progress(now);
        if (this._targetProgressValue) {
            this._camera.setTarget(tp.getValue(this._targetProgressValue));
        }

        if (this._cameraPositionProgressValue) {
            var pos = this._cameraPositionProgressValue;
            this._camera.alpha = tp.getValue(pos.alpha);
            this._camera.beta = tp.getValue(pos.beta);
            this._camera.radius = tp.getValue(pos.radius);
        }
    }
}

export class CameraManager {
    cameraTarget: BABYLON.Mesh;
    canvas: HTMLCanvasElement;
    scene: BABYLON.Scene;
    _animationStatus: string;
    _camera: BABYLON.ArcRotateCamera;
    _cameraOption: CameraOptionType;
    _prevCameraPosition?: CameraPositionType = null;
    _bonesNamesToFollow: Array<string> = [];
    _bonesToFollow: Array<BABYLON.Bone> = [];
    _currentSkeleton: string;
    _targetChaser: TargetChaser;
    _isAnimating = false;
    _followFighters = true;

    constructor(canvas: HTMLCanvasElement, scene: BABYLON.Scene) {
        this.canvas = canvas;
        this.scene = scene;
        store.subscribe(this.handleStateChange.bind(this));
    }

    createCamera() {
        // Add a camera to the scene and attach it to the canvas
        var radius = CAMERA_DEFAULT_RADIUS + store.getState().cameraOption.zoomLevel * CAMERA_RADIUS_STEP;
        this._camera = new BABYLON.ArcRotateCamera("MainCamera", Math.PI * 2.0, Math.PI * 0.4,
              radius, new BABYLON.Vector3(0, 0, 0), this.scene);

        this._camera.lowerBetaLimit = 0;
        this._camera.upperBetaLimit = 1.6;
        this._camera.lowerRadiusLimit = 50;
        this._camera.upperRadiusLimit = 1000;
        this._camera.attachControl(this.canvas, true);
        this.scene.onBeforeRenderObservable.add(this.onBeforeRenderObservable.bind(this));
        this._targetChaser = new TargetChaser(this._camera);
        return this._camera;
    }

    getCamera(): BABYLON.ArcRotateCamera {
        return this._camera;
    }

    handleStateChange() {
        var state = store.getState();
        this._animationStatus = state.animationStatus;
        this._followNewSkeletonIsNeeded();
        var cameraOption = <CameraOptionType>state.cameraOption;
        if(this._cameraOption != cameraOption) {
            if(!this._cameraOption || Math.abs(this._cameraOption.zoomLevel -
                cameraOption.zoomLevel) > 0.1) {
                this._camera.radius = CAMERA_DEFAULT_RADIUS +
                    CAMERA_RADIUS_STEP * cameraOption.zoomLevel;
            }

            var rSens = (1.1 - cameraOption.rotationSensitivity) * MAX_ROTATION_SENSITIVITY;
            if(Math.abs(this._camera.angularSensibilityX - rSens) > 0.001) {
                this._camera.angularSensibilityX = rSens;
                this._camera.angularSensibilityY = rSens;
            }
            this._setCameraPosition(<CameraPositionType>cameraOption.position);

            this._cameraOption = cameraOption;
        } 
    }

    private _followNewSkeletonIsNeeded() {
        /**
         * The animatin information is stamped on the redux state before animation
         * actually starts. The skeleton on the avatar is only valid by the latter.
         * So we would only start following when state.isAnimation transitions false->true
         * 
         * the exception to that is if isAdjustig is true. That's when we have a still
         * frame camera smooth transition
         */
        var state = store.getState();
        this._followFighters = state.cameraOption.followFighters;
        var cameraOption = <CameraOptionType>state.cameraOption;
        if(this._isAnimating == state.isAnimating && !cameraOption.isAdjusting) {
            return;
        }

        var skeletonOrBoneChanged = !(this._bonesNamesToFollow == cameraOption.bonesToFollow &&
            this._currentSkeleton == state.currentAnimation.skeleton);

        this._isAnimating = state.isAnimating;

        if(!skeletonOrBoneChanged) {
            return;
        }

        this._bonesNamesToFollow = cameraOption.bonesToFollow;
        var mNames = [0, 1].map(x=>state.theme.avatars[x] + '_player' + (x+1));
        var meshes = mNames.map(name => this.scene.meshes.find(x=>x.name == name));
        if(!(meshes[0] && meshes[1])) {
            return;
        }

        var skeletons = meshes.map(m=>m.skeleton);
        if(!(skeletons[0] && skeletons[1])) {
            return;
        }

        this._currentSkeleton = state.currentAnimation.skeleton;
        this._bonesToFollow = cameraOption.bonesToFollow;
        this.onCameraTargetSkeletonsChanged(skeletons);
    }

    private _setCameraPosition(position: CameraPositionType) {
        if(position && this._targetChaser.lastCameraPosition != position) {
            if(!this._prevCameraPosition) {
                this._prevCameraPosition = {
                    alpha: this._camera.alpha,
                    beta: this._camera.beta,
                    radius: this._camera.radius
                }
            }
            if(this._targetChaser.lastCameraPosition != position) {
                this._targetChaser.setCameraOptionSmooth(position);
            }
        }
        else if (!position && this._prevCameraPosition) {
            this._targetChaser.setCameraOptionSmooth(this._prevCameraPosition);
            this._prevCameraPosition = null;
        }
    }

    private _getBonePosition(bone: BABYLON.Bone): BABYLON.Vector3 {
        var tMat = new BABYLON.Matrix();
        this._boneGetAbsoluteMatrixToRef(bone, tMat);
        return tMat.getTranslation();
    }

    private _getBonesAvgPosition(bone1: BABYLON.Bone, bone2: BABYLON.Bone): BABYLON.Vector3 {
        if(!bone1) {
            return this._getBonePosition(bone2);
        }

        if(!bone2) {
            return this._getBonePosition(bone1);
        }

        var pos = this._getBonePosition(bone1);
        pos.addInPlace(this._getBonePosition(bone2));
        pos.divideInPlace(VECTOR3_ALL_TWO);
        return pos;
    }

    onCameraTargetSkeletonsChanged(skeletons: BABYLON.Skeleton[]): void {
        if(skeletons.length == 2 ) {
            var bones = store.getState().cameraOption.bonesToFollow;
            this._bonesToFollow = [0, 1].map(i=>{
                return skeletons[i].bones.find(x=>bones[i] && x.name == bones[i])
            })

            // If not animating, smoothly move to target
            if(!store.getState().isAnimating) {
                this._targetChaser.chaseSmooth(this._getBonesAvgPosition(
                    this._bonesToFollow[0],  this._bonesToFollow[1]));
            }
        }
        else {
            this._bonesToFollow = [];
        }
    }

    onBeforeRenderObservable(eventData: BABYLON.Scene, eventState: BABYLON.EventState) {
        this._setCameraOnBones();
    }

    _boneGetAbsoluteMatrixToRef = function (bone: BABYLON.Bone, result: BABYLON.Matrix) {
        var matrix = result;
        matrix.copyFrom(bone._matrix);
        var parent = bone.getParent();
        while (parent) {
            matrix.multiplyToRef(parent.getLocalMatrix(), matrix);
            parent = parent.getParent();
        }
    };

    _setCameraOnBones() {
        if( this._bonesToFollow.length == 2) {
            var state = store.getState();
            if (this._followFighters && state.isAnimating) {
                var pos = this._getBonesAvgPosition(
                    this._bonesToFollow[0],
                    this._bonesToFollow[1]
                );
                this._camera.setTarget(pos);
            }
            else if(state.cameraOption.isAdjusting && this._targetChaser.isChasing()) {
                this._targetChaser.next()
                if(!this._targetChaser.isChasing() && state.cameraOption.isAdjusting) {
                    store.dispatch(setCameraIsAdjusting(false));
                }
            }
        }
    }
}