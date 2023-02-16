import '@testing-library/jest-dom';
import 'jest-styled-components';
import 'jest-canvas-mock';

HTMLCanvasElement.prototype.getContext = () => {
    ResizeObserver: jest.fn();
};

global.console = {
    ...console,
    // uncomment to ignore a specific log level
    log: jest.fn(),
    debug: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
};
