"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.monitorPosition = exports.updateSettings = void 0;
const knex_service_1 = require("./knex.service");
function updateSettings(settings) {
    return __awaiter(this, void 0, void 0, function* () {
        Object.keys(settings).forEach(function eachKey(key) {
            return __awaiter(this, void 0, void 0, function* () {
                yield (0, knex_service_1.db)('Settings')
                    .update('setting', settings[key])
                    .where('title', key);
            });
        });
    });
}
exports.updateSettings = updateSettings;
function monitorPosition(win) {
    const updatePosition = () => __awaiter(this, void 0, void 0, function* () {
        const bounds = win.getBounds();
        yield updateSettings({
            windowWidth: bounds.width,
            windowHeight: bounds.height,
            windowX: bounds.x,
            windowY: bounds.y
        });
    });
    win.on('minimize', (event) => {
        event.preventDefault();
        win.hide();
    });
    win.on('resized', updatePosition);
    win.on('moved', updatePosition);
    win.on('close', (event) => {
        // event.preventDefault();
        win.hide();
        // win = null;
    });
}
exports.monitorPosition = monitorPosition;
//# sourceMappingURL=window.service.js.map