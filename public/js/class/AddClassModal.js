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
exports.AddClassModal = void 0;
var React = require("react");
var Api_1 = require("../Api");
;
;
var addClient = function (newItem) { return (0, Api_1.post)('/class/add', newItem); };
var optionsClientDepartments = function () { return (0, Api_1.post)('/department/options'); };
var optionsClientBuildings = function () { return (0, Api_1.post)('/building/options'); };
var AddClassModal = /** @class */ (function (_super) {
    __extends(AddClassModal, _super);
    function AddClassModal(props) {
        var _this = _super.call(this, props) || this;
        _this.updateOptions();
        _this.state = __assign(__assign({}, _this.state), { isVisible: false, name: "", departmentid: 0, buildingid: 0 });
        return _this;
    }
    AddClassModal.prototype.updateOptions = function () {
        var _this = this;
        optionsClientDepartments().then(function (data) {
            _this.setState({
                avaliableOptionsDept: data
            });
        });
        optionsClientBuildings().then(function (data) {
            _this.setState({
                avaliableOptionsBuil: data
            });
        });
    };
    AddClassModal.prototype.toggleVisibility = function () {
        this.updateOptions();
        this.setState({ isVisible: !this.state.isVisible });
    };
    AddClassModal.prototype.addNew = function () {
        var _this = this;
        // TODO: make REGEX helper for null/whitespace/special characters
        var newItem = __assign({}, this.state);
        addClient(newItem).then(function (id) {
            _this.props.refreshTableCB();
            _this.toggleVisibility();
        });
    };
    AddClassModal.prototype.onChangeHandler = function (e) {
        var _a;
        this.setState((_a = {}, _a[e.currentTarget.name] = e.currentTarget.value, _a));
    };
    AddClassModal.prototype.dropDownHandler = function (e) {
        var _a;
        //number conversions will have to be done on the backend because of jquery json conversions.
        this.setState((_a = {}, _a[e.currentTarget.name] = +(e.currentTarget.value), _a));
    };
    AddClassModal.prototype.renderOptionDropDownDept = function () {
        var tags = [React.createElement("option", { key: '0', value: '0' }, "N/A")];
        if (this.state.avaliableOptionsDept) {
            var newTags = this.state.avaliableOptionsDept.map(function (op) {
                return (React.createElement("option", { key: op.id, value: op.id }, op.name));
            });
            tags = tags.concat(newTags);
        }
        return (React.createElement("select", { name: 'departmentid', onChange: this.dropDownHandler.bind(this) }, tags));
    };
    AddClassModal.prototype.renderOptionDropDownBuilding = function () {
        var tags = [React.createElement("option", { key: '0', value: '0' }, "N/A")];
        if (this.state.avaliableOptionsBuil) {
            var newTags = this.state.avaliableOptionsBuil.map(function (op) {
                return (React.createElement("option", { key: op.id, value: op.id }, op.name));
            });
            tags = tags.concat(newTags);
        }
        return (React.createElement("select", { name: 'buildingid', onChange: this.dropDownHandler.bind(this) }, tags));
    };
    AddClassModal.prototype.render = function () {
        return (React.createElement("div", { className: "modal-container" },
            React.createElement("button", { className: "modal-button", onClick: this.toggleVisibility.bind(this) }, "Add"),
            React.createElement("div", { className: "modal " + (this.state.isVisible ? "modal-show" : "modal-hidden") },
                React.createElement("button", { onClick: this.toggleVisibility.bind(this) }, "Close"),
                React.createElement("div", { className: "modal-header" },
                    React.createElement("h1", null, "Add Class")),
                React.createElement("div", { className: "modal-body" },
                    React.createElement("label", null, "Name:"),
                    " ",
                    React.createElement("input", { name: 'name', onChange: this.onChangeHandler.bind(this), type: "text" }),
                    React.createElement("label", null, "Associated Department"),
                    this.renderOptionDropDownDept(),
                    React.createElement("label", null, "Associated Building"),
                    this.renderOptionDropDownBuilding(),
                    React.createElement("button", { onClick: this.addNew.bind(this) }, "Add Item")))));
    };
    return AddClassModal;
}(React.Component));
exports.AddClassModal = AddClassModal;
//# sourceMappingURL=AddClassModal.js.map