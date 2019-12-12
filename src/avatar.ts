import * as BABYLON from '@babylonjs/core'
import { Skeleton } from '@babylonjs/core';

type ComponentMaterialMapType = {name: string, components: string[]}[];

export class Avatar {
    mesh: BABYLON.Mesh;
    skeleton: BABYLON.Skeleton;
    name: string;
    meshName: string;

    private _componentMaterialMap: ComponentMaterialMapType;

    constructor(name: string, meshName: string, mesh: BABYLON.Mesh, componentMaterialMap: ComponentMaterialMapType) {
        this.name = name;
        this.meshName = meshName;
        this.mesh = mesh;
        this._componentMaterialMap = componentMaterialMap;
    }

    getMeshComponentNames(): string[] {
        return this._componentMaterialMap.map(matMap=>{
            return matMap.name;
        });
    }


    setMaterialById(n: number, material: BABYLON.Material) {
        this.setMaterial(this._componentMaterialMap[n].name, material);
    }

    setMaterial(name: string, material: BABYLON.Material) {
        var components = this._componentMaterialMap.find(x=>x.name == name).components;
        this.getMeshes().forEach(mesh=>{
            var meshName = mesh.parent ? meshName = mesh.name.split('.')[1] : '';
            if(components.indexOf(meshName) != -1) {
                mesh.material = material;
            }
        });
    }

    getMaterialById(n: number): BABYLON.StandardMaterial {
        return this.getMaterial(this._componentMaterialMap[n].name);
    }

    getMaterial(name: string): BABYLON.StandardMaterial {
        var components = this._componentMaterialMap.find(x=>x.name == name).components;
        var res: BABYLON.StandardMaterial;
        this.getMeshes().forEach(mesh=>{
            var meshName = mesh.parent ? meshName = mesh.name.split('.')[1] : '';
            if(components.indexOf(meshName) != -1) {
                res = <BABYLON.StandardMaterial>mesh.material;
                return;
            }
        });
        return res;
    }

    getMeshes(): Array<BABYLON.Mesh> {
        var res = [this.mesh];
        var subMeshes = <BABYLON.Mesh[]>res[0].getChildMeshes();
        if(subMeshes && subMeshes.length) {
            res = res.concat(subMeshes);
        }
        return res;
    }
}
    
export class AvatarCreator {
    private _base_mesh: BABYLON.Mesh;
    private _avatar_cache: Map<string, Avatar>;
    private _componentMaterialMap: ComponentMaterialMapType;

    constructor(mesh: BABYLON.Mesh, componentMaterialMap: ComponentMaterialMapType) {
        this._base_mesh = mesh;
        this._avatar_cache = new Map()
        this._componentMaterialMap = componentMaterialMap;
    }

    create(name: string): Avatar {
        if(!this._avatar_cache.has(name)) {
            var mesh = this._base_mesh.clone(this._base_mesh.name + '_' + name);
            mesh.alwaysSelectAsActiveMesh = true;

            // Clone all the materials
            var subMeshes = [mesh].concat(<BABYLON.Mesh[]>mesh.getChildMeshes());
            var materialCache: Map<string, BABYLON.Material> = new Map();
            subMeshes.forEach(m=>{
                let name = m.material.name;
                if(!materialCache.has(name)) {
                    materialCache.set(name,
                        m.material.clone(name + '_' + name))
                }
                m.material = materialCache.get(name)
            });

            mesh.setEnabled(true);
            this._avatar_cache.set(name, new Avatar(name, this._base_mesh.name, mesh, this._componentMaterialMap));
        }
        return this._avatar_cache.get(name);
    }
}

export class SkeletonCreator {
    private _base_skeleton: BABYLON.Skeleton;
    private _skeleton_cache: Map<string, BABYLON.Skeleton>;

    constructor(skeleton: BABYLON.Skeleton) {
        this._base_skeleton = skeleton;
        this._skeleton_cache = new Map()
    }

    create(name: string): Skeleton {
        if(!this._skeleton_cache.has(name)) {
            var sid = this._base_skeleton.name + '_c_' + name;
            var skeleton = this._base_skeleton.clone(sid, sid)
            this._skeleton_cache.set(name, skeleton);
        }
        return this._skeleton_cache.get(name);
    }
}

