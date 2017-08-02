import Flight from 'flight';
import { ShowStepEvent, StepBackEvent } from './events';
import jquery from 'jquery';
const $ = jquery;

const ENTER = 13;

class FlowManagerComponent extends Flight.UIComponent {

    init() {
        this.rootUrl = document.location.toString().split('#')[0];
    }

    listen() {
        this.on(Flight.System).listen(
          Flight.System.Ready, event => this.setup(),
        );
        this.ui(this.view).listen(
            ShowStepEvent, event => this.moveTo(event.step),
            StepBackEvent, event => history.back(),
        );

        window.onpopstate = (event) => {
            this.showStep(event.state || this.steps[0]);
        };
    }

    showStep(step) {
        if(this.view.firstElementChild) {
            this.view.firstElementChild.remove();
        }
        this.view.append(this.pages[step]);
    }

    setup() {
        this.showStep(this.steps[0]);
    }

    moveTo(step) {
        this.showStep(step);
        history.pushState(step, step, `${this.rootUrl}#${step}`);
    }

    addStep(stepDefinition) {
        (this.pages || (this.pages = {}));
        (this.steps || (this.steps = [])).push(stepDefinition.name);

        this.pages[stepDefinition.name] = Flight.DOM.render(
            stepDefinition.template
        );

        if(stepDefinition.nameSpace && stepDefinition.events) {
            for(let StepEvent of stepDefinition.events) {
                this.on(stepDefinition.nameSpace).listen(
                    StepEvent, event => this.moveTo(stepDefinition.name),
                );
            }
        }

        return this;
    }
}

export default FlowManagerComponent;
