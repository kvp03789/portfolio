export default class StateManager{
    constructor(currentState){
        this.currentState = currentState
        this.previousState = currentState
    }
    set_state = (new_state) => {
        this.previousState = this.currentState
        this.currentState = new_state
        console.log(this.currentState)
        }

    get_state = () => {return this.currentState}
        
}