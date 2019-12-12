import { use } from 'chai';
import './time-progress.test';
import './camera-manager.test';
import chaiAlmost = require('chai-almost');

use(chaiAlmost());
mocha.setup('bdd')
mocha.checkLeaks();
mocha.run();