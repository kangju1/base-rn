import {boundClass} from  'autobind-decorator';
import {observable, action, computed, extendObservable} from 'mobx'

@boundClass
export default class AppStore {

    @observable count = 1;

    constructor(rootStore){
        this.rootStore = rootStore;
    }

    @action
    increase(){
        this.count++;
    }

}
