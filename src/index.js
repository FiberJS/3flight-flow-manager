import Fiber from 'fiber';
import { ShowStepEvent, StepBackEvent } from './events';

const ENTER = 13;

class FlowManagerComponent extends Fiber.UIComponent {

    init() {
        this.rootUrl = document.location.toString().split('#')[0];
    }

    listen() {
        this.on(Fiber.System).listen(
          Fiber.System.Ready, event => this.setup(),
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
            Fiber.DOM.detach(this.view.firstElementChild);
        }
        this.view.append(this.pages[step]);
    }

    setup() {
        if(document.location.toString() !== this.rootUrl) {
            document.location = `${this.rootUrl}#${this.steps[0]}`;
        }
        this.showStep(this.steps[0]);
    }

    moveTo(step) {
        this.showStep(step);
        history.pushState(step, step, `${this.rootUrl}#${step}`);
    }

    addStep(stepDefinition) {
        (this.pages || (this.pages = {}));
        (this.steps || (this.steps = [])).push(stepDefinition.name);

        this.pages[stepDefinition.name] = Fiber.DOM.render(
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
