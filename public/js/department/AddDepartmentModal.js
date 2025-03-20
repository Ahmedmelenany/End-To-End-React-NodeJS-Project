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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddDepartmentModal = void 0;
var React = require("react");
var Api_1 = require("../Api");
;
;
var addClient = function (newItem) { return (0, Api_1.post)('/department/add', newItem); };
var AddDepartmentModal = /** @class */ (function (_super) {
    __extends(AddDepartmentModal, _super);
    function AddDepartmentModal(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            isVisible: false,
            name: ""
        };
        return _this;
    }
    AddDepartmentModal.prototype.toggleVisibility = function () {
        this.setState({ isVisible: !this.state.isVisible });
    };
    AddDepartmentModal.prototype.addNew = function () {
        var _this = this;
        // TODO: make REGEX helper for null/whitespace/special characters
        var newItem = __assign({}, this.state);
        addClient(newItem).then(function (id) {
            _this.props.refreshTableCB();
            _this.toggleVisibility();
        });
    };
    //webpack:https://github.com/Mercateo/react-with-typescript/blob/master/webpack.config.js
    AddDepartmentModal.prototype.onChangeHandler = function (e) {
        var _a;
        this.setState((_a = {}, _a[e.currentTarget.name] = e.currentTarget.value, _a));
    };
    AddDepartmentModal.prototype.onTextareaChange = function (e) {
        var _a;
        this.setState((_a = {}, _a[e.currentTarget.name] = e.currentTarget.value, _a));
    };
    AddDepartmentModal.prototype.render = function () {
        return (React.createElement("div", { className: "modal-container" },
            React.createElement("button", { className: "modal-button", onClick: this.toggleVisibility.bind(this) }, "Add"),
            React.createElement("div", { className: "modal " + (this.state.isVisible ? "modal-show" : "modal-hidden") },
                React.createElement("button", { onClick: this.toggleVisibility.bind(this) }, "Close"),
                React.createElement("div", { className: "modal-header" },
                    React.createElement("h1", null, "Add Department")),
                React.createElement("div", { className: "modal-body" },
                    React.createElement("label", null, "Name:"),
                    " ",
                    React.createElement("input", { name: 'name', onChange: this.onChangeHandler.bind(this), type: "text" }),
                    React.createElement("label", null, "Description:"),
                    " ",
                    React.createElement("textarea", { name: 'description', onChange: this.onTextareaChange.bind(this) }),
                    React.createElement("button", { onClick: this.addNew.bind(this) }, "Add Item")))));
    };
    return AddDepartmentModal;
}(React.Component));
exports.AddDepartmentModal = AddDepartmentModal;
//# sourceMappingURL=AddDepartmentModal.js.map