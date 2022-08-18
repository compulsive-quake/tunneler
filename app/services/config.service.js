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
exports.getConfig = void 0;
const knex_service_1 = require("./knex.service");
function getConfig() {
    return __awaiter(this, void 0, void 0, function* () {
        let config = {
            windowWidth: '500',
            windowHeight: '700',
            windowX: '300',
            windowY: '300',
        };
        try {
            const results = yield (0, knex_service_1.db)('Settings').select('*');
            if (!results.length) {
                const seedInserts = Object.keys(config).map(title => {
                    return { title: title, setting: config[title] };
                });
                const seedResults = yield (0, knex_service_1.db)('settings').insert(seedInserts);
            }
            results.forEach(result => {
                config[result.title] = result.setting;
            });
        }
        catch (e) {
            throw new Error(e);
        }
        if (!config) {
            throw new Error('Failed to get config from DB');
        }
        return config;
    });
}
exports.getConfig = getConfig;
//# sourceMappingURL=config.service.js.map