import { Vector3 } from '@babylonjs/core/Maths'

export interface TimeProgressionValueI {
    getValue: (ratioComplete: number)=>any;
}

export class TimeProgressionValue implements TimeProgressionValueI {
    private _startValue: number;
    private _diffValue: number;

    constructor(startValue: number, endValue: number) {
        this._startValue = startValue;
        this._diffValue = endValue - startValue;
    }

    getValue(ratioComplete: number): number {
        return this._startValue + this._diffValue * ratioComplete;
    }
}

export class TimeProgressionVector3 implements TimeProgressionValueI {
    private _startValue: Vector3;
    private _diffValue: Vector3;

    constructor(startValue: Vector3, endValue: Vector3) {
        this._startValue = startValue;
        this._diffValue = endValue.subtract(startValue);
    }

    getValue(ratioComplete: number): Vector3 {
        if(Math.abs(ratioComplete) < 0.000001) {
            return this._startValue;
        }
        return this._startValue.add(this._diffValue.scale(ratioComplete));
    }
}

export class TimeProgression {
    ratioComplete: number;
    private _startTime: number;
    private _period: number;
    private _endTime: number;

    constructor(startTime: number, period: number) {
        /*
        * startTime: Timestamp in ms
        * period: period in ms
        */
        this._startTime = startTime;
        this._period = period;
        this.ratioComplete = 0;
        this._endTime = this._startTime + period;
    }

    hasFinished(): boolean {
        return !this._endTime;
    }

    progress(now: number) {
        if(!this._endTime) {
            throw("Calling progress when already completed");
        }

        if(now < this._startTime) {
            throw('Cannot progress to past');
        }

        if(now >= this._endTime) {
            this.ratioComplete = 1;
            this._endTime = null;
        }
        else {
            this.ratioComplete = (now - this._startTime) / this._period;
        }
    }

    getValue(v: TimeProgressionValueI): any {
        return v.getValue(this.ratioComplete);
    }
}