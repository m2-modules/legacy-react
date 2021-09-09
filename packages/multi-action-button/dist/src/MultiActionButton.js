"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var MoreHoriz_1 = __importDefault(require("@material-ui/icons/MoreHoriz"));
var MultiActionButton = function (props) {
    var name = props.name, action = props.action, subActions = props.subActions;
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("button", { onClick: action }, name),
        (subActions === null || subActions === void 0 ? void 0 : subActions.length) ? (react_1.default.createElement("button", null,
            react_1.default.createElement(MoreHoriz_1.default, null))) : ('')));
};
exports.default = MultiActionButton;
