import Flight from 'flight';

export const FlowEvent = Flight.defineEventType({
    step: 'string'
});

export const ShowStepEvent = Flight.defineEvent(FlowEvent, 'Flow-Manager:ShowStep');
export const StepBackEvent = Flight.defineEvent(Flight.basicEvent(), 'Flow-Manager:Back');
