import { expect } from 'chai';
import { Vector3 } from '@babylonjs/core/Maths'

import { TimeProgression,
         TimeProgressionValueI,
         TimeProgressionValue,
         TimeProgressionVector3 } from '../../time-progress';

const START_TIME=new Date(2019, 7, 9, 17, 41, 30).valueOf();
const PERIOD=1200;


class MockTimeProgressionValue implements TimeProgressionValueI {
  getValue(x: number) {
    return x;
  }
}

describe('TimeProgress', function() {

  describe('TimeProgression', function() {

    it('progress', function() {
      let tp = new TimeProgression(START_TIME, PERIOD);
      tp.progress(START_TIME);
      expect(tp.ratioComplete).equal(0);

      tp.progress(START_TIME + 300);
      expect(tp.ratioComplete).equal(0.25);

      tp.progress(START_TIME + 600);
      expect(tp.ratioComplete).equal(0.5);

      expect(tp.hasFinished(), "Not yet finished").to.be.false;
      tp.progress(START_TIME + 1200);
      expect(tp.hasFinished(), "Finished").to.be.true;
      expect(tp.ratioComplete).equal(1);

      // Start again. Go beyond period
      tp = new TimeProgression(START_TIME, PERIOD);
      tp.progress(START_TIME + 1300);
      expect(tp.hasFinished(), "Finished").to.be.true;
      expect(tp.ratioComplete).equal(1);
    }); 

    it('progressWithException', function() {
      let tp = new TimeProgression(START_TIME, PERIOD);
      expect(()=>tp.progress(START_TIME - 1)).to.throw(
        'Cannot progress to past');

      tp.progress(START_TIME + PERIOD + 1);
      expect(tp.ratioComplete).equal(1.0);

      expect(()=>tp.progress(START_TIME + PERIOD + 2)).to.throw(
        'Calling progress when already completed');
    });

    it('getValue', function() {
      let tp = new TimeProgression(START_TIME, PERIOD);
      let v = new MockTimeProgressionValue();
      tp.progress(START_TIME + 300);
      expect(tp.getValue(v)).equal(0.25);

      tp.progress(START_TIME + 600);
      expect(tp.getValue(v)).equal(0.5);
    });
  });

  describe('TimeProgressionValue', function() {
    it('getValue', function() {
      let v = new TimeProgressionValue(100, 200);
      expect(v.getValue(0)).equal(100);
      expect(v.getValue(0.5)).equal(150);
      expect(v.getValue(1.0)).equal(200);
    });
  });

  describe('TimeProgressionVector3', function() {
    it('getValue', function() {
      const START_VECTOR3 = new Vector3(10, 20, 50);
      const END_VECTOR3 = new Vector3(20, 100, 50);
      let v = new TimeProgressionVector3(START_VECTOR3, END_VECTOR3);
      expect(v.getValue(0).equals(START_VECTOR3), 'Start value').to.be.true;
      expect(v.getValue(0.5).equals(new Vector3(15, 60, 50)), 'Mid value').to.be.true;
      expect(v.getValue(1.0).equals(END_VECTOR3), 'End value').to.be.true;
    });
  });
});