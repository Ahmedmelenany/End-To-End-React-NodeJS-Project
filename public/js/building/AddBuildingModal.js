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
exports.AddBuildingModal = void 0;
var React = require("react");
var Api_1 = require("../Api");
;
;
var addClient = function (newItem) { return (0, Api_1.post)('/building/add', newItem); };
var optionsClient = function () { return (0, Api_1.post)('/department/options'); };
var AddBuildingModal = /** @class */ (function (_super) {
    __extends(AddBuildingModal, _super);
    function AddBuildingModal(props) {
        var _this = _super.call(this, props) || this;
        _this.updateOptions();
        _this.state = __assign(__assign({}, _this.state), { isVisible: false, name: "", departmentid: 0 });
        return _this;
    }
    AddBuildingModal.prototype.updateOptions = function () {
        var _this = this;
        optionsClient().then(function (data) {
            _this.setState({
                avaliableOptions: data
            });
        });
    };
    AddBuildingModal.prototype.toggleVisibility = function () {
        this.updateOptions();
        this.setState({ isVisible: !this.state.isVisible });
    };
    AddBuildingModal.prototype.addNew = function () {
        var _this = this;
        // TODO: make REGEX helper for null/whitespace/special characters
        var newItem = __assign({}, this.state);
        addClient(newItem).then(function (id) {
            _this.props.refreshTableCB();
            _this.toggleVisibility();
        });
    };
    AddBuildingModal.prototype.onChangeHandler = function (e) {
        var _a;
        this.setState((_a = {}, _a[e.currentTarget.name] = e.currentTarget.value, _a));
    };
    AddBuildingModal.prototype.onTextareaChange = function (e) {
        var _a;
        this.setState((_a = {}, _a[e.currentTarget.name] = e.currentTarget.value, _a));
    };
    AddBuildingModal.prototype.dropDownHandler = function (e) {
        var _a;
        //number conversions will have to be done on the backend because of jquery json conversions.
        this.setState((_a = {}, _a[e.currentTarget.name] = +(e.currentTarget.value), _a));
    };
    AddBuildingModal.prototype.renderOptionDropDown = function () {
        var tags = [React.createElement("option", { key: '0', value: '0' }, "N/A")];
        if (this.state.avaliableOptions) {
            var newTags = this.state.avaliableOptions.map(function (op) {
                return (React.createElement("option", { key: op.id, value: op.id }, op.name));
            });
            tags = tags.concat(newTags);
        }
        return (React.createElement("select", { name: 'departmentid', onChange: this.dropDownHandler.bind(this) }, tags));
    };
    AddBuildingModal.prototype.render = function () {
        return (React.createElement("div", { className: "modal-container" },
            React.createElement("button", { className: "modal-button", onClick: this.toggleVisibility.bind(this) }, "Add"),
            React.createElement("div", { className: "modal " + (this.state.isVisible ? "modal-show" : "modal-hidden") },
                React.createElement("button", { onClick: this.toggleVisibility.bind(this) }, "Close"),
                React.createElement("div", { className: "modal-header" },
                    React.createElement("h1", null, "Add Building")),
                React.createElement("div", { className: "modal-body" },
                    React.createElement("label", null, "Name:"),
                    " ",
                    React.createElement("input", { name: 'name', onChange: this.onChangeHandler.bind(this), type: "text" }),
                    React.createElement("label", null, "Description:"),
                    " ",
                    React.createElement("textarea", { name: 'description', onChange: this.onTextareaChange.bind(this) }),
                    React.createElement("label", null, "Associated Department"),
                    this.renderOptionDropDown(),
                    React.createElement("button", { onClick: this.addNew.bind(this) }, "Add Item")))));
    };
    return AddBuildingModal;
}(React.Component));
exports.AddBuildingModal = AddBuildingModal;
//# sourceMappingURL=AddBuildingModal.js.map