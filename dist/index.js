'use strict';
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, '__esModule', { value: true });
exports.Worker = exports.Queue = void 0;
const bullmq_1 = require('bullmq');
Object.defineProperty(exports, 'Queue', {
    enumerable: true,
    get: function () {
        return bullmq_1.Queue;
    }
});
const worker_1 = __importDefault(require('./src/worker'));
exports.Worker = worker_1.default;
//# sourceMappingURL=index.js.map
