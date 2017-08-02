import Flight from 'flight';

export const FlowEvent = Flight.eventType(
    function(step) {
        this.step = step;
    }
);

export const ShowStepEvent = Flight.eventOfType(FlowEvent).alias('Flow-Manager:ShowStep');
export const StepBackEvent = Flight.basicEvent().alias('Flow-Manager:Back');
