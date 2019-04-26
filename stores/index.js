import AppStore from './app';

class RootStore {
    constructor(){
        this.appStore = new AppStore(this);
    }
}

export default new RootStore()
