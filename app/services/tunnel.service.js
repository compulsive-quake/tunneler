"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toggleTunnelsEnabled = exports.tunnelsEnabled = void 0;
exports.tunnelsEnabled = true;
function toggleTunnelsEnabled() {
    exports.tunnelsEnabled = !exports.tunnelsEnabled;
    console.log(`tunnelsEnabled: ${exports.tunnelsEnabled}`);
}
exports.toggleTunnelsEnabled = toggleTunnelsEnabled;
//# sourceMappingURL=tunnel.service.js.map