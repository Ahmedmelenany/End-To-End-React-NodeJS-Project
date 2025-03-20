"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.NavBarContainer = void 0;
var React = require("react");
var NavBarContainer = /** @class */ (function (_super) {
    __extends(NavBarContainer, _super);
    function NavBarContainer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NavBarContainer.prototype.render = function () {
        return (React.createElement("nav", null,
            React.createElement("div", { className: "navImage" },
                React.createElement("a", { href: "/" },
                    React.createElement("img", { src: "./favicon.ico" }))),
            React.createElement("div", { className: "navLinks" },
                React.createElement("a", { href: "/department" }, "Departments"),
                React.createElement("a", { href: "/building" }, "Buildings"),
                React.createElement("a", { href: "/class" }, "Classes"),
                React.createElement("a", { href: "/student" }, "Students"),
                React.createElement("a", { href: "/enrollment" }, "enrollment"))));
    };
    return NavBarContainer;
}(React.Component));
exports.NavBarContainer = NavBarContainer;
//# sourceMappingURL=NavBarContainer.js.map