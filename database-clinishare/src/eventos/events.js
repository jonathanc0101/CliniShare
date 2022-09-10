import emitter from './eventEmitter.js';
import loadListeners from './subscribers.js';

export default () => {
  loadListeners(emitter);
};