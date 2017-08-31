import Fiber from 'fiber';

export const FlowEvent = Fiber.defineEventType({
    step: 'string'
});

export const ShowStepEvent = Fiber.defineEvent(FlowEvent, 'Flow-Manager:ShowStep');
export const StepBackEvent = Fiber.defineEvent(Fiber.basicEvent(), 'Flow-Manager:Back');
