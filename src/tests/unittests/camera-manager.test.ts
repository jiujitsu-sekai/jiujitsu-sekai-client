import { store } from '../../redux/store';
import { expect } from 'chai';
import { CAMERA_RADIUS_STEP, CameraManager, TargetChaser, RADIAN } from '../../camera-manager'
import * as BABYLON from '@babylonjs/core'
import { cameraOptionZoomIn,
         cameraOptionZoomOut,
         setCameraFollowFighters,
         setCameraRotationSensitivity } from '../../redux/actions';

class DummyCamera {
    alpha: number;
    beta: number;
    radius: number;
    target: null;

    constructor(alpha: number, beta: number, radius: number) {
        this.alpha = alpha;
        this.beta = beta;
        this.radius = radius;
    }
}

const INIT_CAMERA_POS = {
    alpha: -0.14,
    beta: 1.45,
    radius: 383
}

function getDummaryCamera(initCameraPos=INIT_CAMERA_POS): BABYLON.ArcRotateCamera {
    var res =  <BABYLON.ArcRotateCamera>new DummyCamera(initCameraPos.alpha,
        initCameraPos.beta, initCameraPos.radius);
    res.target = new BABYLON.Vector3(0, 0, 0);
    return res;
}

describe('CameraManager', function() {
    describe('TargetChaser', function() {
        it('chaseSmooth', function() {
            var camera = getDummaryCamera()
            var tc = new TargetChaser(camera);
            var now = (new Date()).valueOf()
            const END_CAMERA_POS = {
                alpha: -0.24,
                beta: 1.65,
                radius: 500
            }
            tc.setCameraOptionSmooth(END_CAMERA_POS, now);
            tc.next(now);
            var nr = tc._normaliseRadian;
            expect(camera.alpha).to.almost.equal(nr(INIT_CAMERA_POS.alpha));
            expect(camera.beta).to.almost.equal(INIT_CAMERA_POS.beta);
            expect(camera.radius).to.equal(INIT_CAMERA_POS.radius);

            tc.next(now + tc.chaseSpeed / 2);
            expect(camera.alpha).to.almost.equal(nr(-0.19));
            expect(camera.beta).to.almost.equal(1.55);
            expect(camera.radius).to.almost.equal(441.5);

            tc.next(now + tc.chaseSpeed);
            expect(camera.alpha).to.equal(nr(END_CAMERA_POS.alpha));
            expect(camera.beta).to.equal(END_CAMERA_POS.beta);
            expect(camera.radius).to.equal(END_CAMERA_POS.radius);

            tc.next(now + 1000);
            expect(camera.alpha).to.equal(nr(END_CAMERA_POS.alpha));
            expect(camera.beta).to.equal(END_CAMERA_POS.beta);
            expect(camera.radius).to.equal(END_CAMERA_POS.radius);
        });

        it('_normaliseRadian', function() {
            var camera = getDummaryCamera()
            var tc = new TargetChaser(camera);
            expect(tc._normaliseRadian(0)).to.equal(0);
            expect(tc._normaliseRadian(0.5 * RADIAN)).to.almost.equal(0.5*RADIAN);
            expect(tc._normaliseRadian(2 * RADIAN)).to.almost.equal(0);
            expect(tc._normaliseRadian(2.5 * RADIAN)).to.almost.equal(0.5*RADIAN);
            expect(tc._normaliseRadian(4.5 * RADIAN)).to.almost.equal(0.5*RADIAN);
            expect(tc._normaliseRadian(-1.5 * RADIAN)).to.almost.equal(0.5*RADIAN);
            expect(tc._normaliseRadian(-2.5 * RADIAN)).to.almost.equal(0.5*RADIAN);
        });

        it('_shortestAngularPath', function() {
            var camera = getDummaryCamera()
            var tc = new TargetChaser(camera);

            function testPath(r1: number, r2: number, res1: number, res2: number) {
                var res = tc._shortestAngularPath(r1 * RADIAN, r2 * RADIAN);
                expect(res[0]).to.almost.equal(res1 * RADIAN);
                expect(res[1]).to.almost.equal(res2 * RADIAN);
            }
            
            testPath(0.5, 0.6, 0.5, 0.6);
            testPath(0.1, 0.8, 0.1, -0.2);
        });
    });

    describe('CameraManager', function() {
        it('zoom in and out', function() {
            var cm = new CameraManager(null, null);
            cm._camera = <BABYLON.ArcRotateCamera>{};
            store.dispatch(cameraOptionZoomIn());
            var radius = cm._camera.radius;
            store.dispatch(cameraOptionZoomIn());
            radius -= CAMERA_RADIUS_STEP;
            expect(cm._camera.radius).to.equal(radius);
            store.dispatch(cameraOptionZoomOut());
            radius += CAMERA_RADIUS_STEP;
            expect(cm._camera.radius).to.equal(radius);
            store.dispatch(cameraOptionZoomOut());
            radius += CAMERA_RADIUS_STEP;
            expect(cm._camera.radius).to.equal(radius);
        });

        it('change camera sensitivity', function() {
            console.log('sensitivity');
            var cm = new CameraManager(null, null);
            cm._camera = <BABYLON.ArcRotateCamera>{
                angularSensibilityX: 0,
                angularSensibilityY: 0
            };
            store.dispatch(setCameraRotationSensitivity(0.3));
            expect(cm._camera.angularSensibilityX).to.almost.equal(2240);
            expect(cm._camera.angularSensibilityY).to.almost.equal(2240);

            store.dispatch(setCameraRotationSensitivity(0.7));
            expect(cm._camera.angularSensibilityX).to.almost.equal(1120);
            expect(cm._camera.angularSensibilityY).to.almost.equal(1120);
        });
    });
});
