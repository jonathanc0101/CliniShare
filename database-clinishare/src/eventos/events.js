import emitter from './eventEmitter';
import loadListeners from './subscribers';

export default () => {
  loadListeners(emitter);
};