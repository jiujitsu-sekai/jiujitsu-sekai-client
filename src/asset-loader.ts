import * as BABYLON from '@babylonjs/core'
import { MESH_LOAD_CONFIG } from "./config";
import { SKELETONS_TO_LOAD } from "./animation-config/config";
import { AvatarCreator, SkeletonCreator } from "./avatar";

export class AssetLoader {
    scene_location: string;
    file_extension: string;
    assetsManager: BABYLON.AssetsManager;
    engine: BABYLON.Engine;
    scene: BABYLON.Scene;
    private _avatarCreators: Map<string, AvatarCreator>
    private _skeletonCreators: Map<string, SkeletonCreator>;
    onAssetsReady: (avatorCreators: Map<string, AvatarCreator>, skeletonCreators: Map<string, SkeletonCreator>) => void;

    constructor(scene: BABYLON.Scene, engine: BABYLON.Engine) {
        this.scene_location = 'scenes/';
        this.file_extension = '.babylon';
        this.scene = scene;
        this.engine = engine;
        this._avatarCreators = new Map();
        this._skeletonCreators = new Map();
        this.assetsManager = new BABYLON.AssetsManager(scene);
        this.assetsManager.onTaskErrorObservable.add(function(task) {
            console.log('task failed', task.errorObject.message, task.errorObject.exception);
        });

        this.assetsManager.onProgress = function(remainingCount: Number, totalCount: Number, lastFinishedTask: any) {
            engine.loadingUIText = 'We are loading the scene. ' +
                remainingCount + ' out of ' + totalCount +
                ' items still need to be loaded.';
        };

        this.assetsManager.onFinish = this._onAssetLoadFinish.bind(this);
    }

    private _onAssetLoadFinish(tasks: BABYLON.AbstractAssetTask[]) {
        this.onAssetsReady(this._avatarCreators, this._skeletonCreators);
    }

    /**
     * Load the assets
     */
    load(): void {

        MESH_LOAD_CONFIG.forEach(cfg=>{
            var meshTask = this.assetsManager.addMeshTask(cfg.name, "", this.scene_location, cfg.filename + this.file_extension);
            meshTask.onSuccess = task => {
                var mesh = <BABYLON.Mesh>task.loadedMeshes[0]
                mesh.name = meshTask.name;
                mesh.setEnabled(false);
                
                var creator = new AvatarCreator(mesh, cfg.component_material_map);
                this._avatarCreators.set(mesh.name, creator);

                task.loadedMeshes[0].setEnabled(false);
            }
        });

        SKELETONS_TO_LOAD.forEach(function(skeletonName: string) {
            var skeletonTask = this.assetsManager.addMeshTask(skeletonName, "", this.scene_location, skeletonName + this.file_extension);
            skeletonTask.onSuccess = function (task: BABYLON.MeshAssetTask) {
                var skeletonCreator = new SkeletonCreator(task.loadedSkeletons[0]);
                this._skeletonCreators.set(task.name, skeletonCreator);
                task.loadedMeshes.forEach(mesh=>{
                    mesh.material.dispose();
                    mesh.dispose();
                });
            }.bind(this)
        }.bind(this));
        this.assetsManager.load();
    }
}