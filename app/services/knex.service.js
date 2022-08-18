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
exports.seed = exports.migrate = exports.checkSeedHistory = exports.checkMigrationHistory = exports.db = void 0;
const knex_1 = require("knex");
const config = require('../../knexfile');
exports.db = (0, knex_1.default)(config);
/**
 * confirm that all migrations scripts have been run
 */
function checkMigrationHistory() {
    return __awaiter(this, void 0, void 0, function* () {
        const results = yield exports.db.migrate.list();
        const [existing, files] = results;
        const migrationCount = files.length - existing.length;
        if (migrationCount) {
            yield migrate();
        }
    });
}
exports.checkMigrationHistory = checkMigrationHistory;
/**
 * confirm that all migrations scripts have been run
 */
function checkSeedHistory() {
    return __awaiter(this, void 0, void 0, function* () {
    });
}
exports.checkSeedHistory = checkSeedHistory;
/**
 * apply the latest migration files to db
 */
function migrate() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const migrateResults = yield exports.db.migrate.latest();
            console.log(`migration: ${migrateResults}`);
        }
        catch (err) {
            //todo: log errors to file
            console.error(`Error migrating:`, err);
        }
    });
}
exports.migrate = migrate;
/**
 * apply the latest migration files to db
 */
function seed() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const seedResults = yield exports.db.seed.run();
            console.log(`seeding: ${seedResults}`);
        }
        catch (err) {
            //todo: log errors to file
            console.error('Error seeding: ', err);
        }
    });
}
exports.seed = seed;
//# sourceMappingURL=knex.service.js.map