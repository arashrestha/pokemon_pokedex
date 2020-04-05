import { observable } from 'mobx'

class UiStore {

    @observable openDrawer = false
    @observable openSearchBar = false

    toggleDrawer = (open) => event => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        this.openDrawer = open
    };
    toggleSearch = (open) => {
        this.openSearchBar = open
    };

}

export default UiStore