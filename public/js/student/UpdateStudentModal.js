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
exports.UpdateStudentModal = void 0;
var React = require("react");
var Api_1 = require("../Api");
;
;
var updateClient = function (newItem) { return (0, Api_1.post)('/student/update', newItem); };
var UpdateStudentModal = /** @class */ (function (_super) {
    __extends(UpdateStudentModal, _super);
    function UpdateStudentModal(props) {
        var _this = _super.call(this, props) || this;
        if (_this.props.student) {
            _this.state = __assign({}, (_this.props.student));
        }
        _this.state = __assign({}, (_this.state));
        return _this;
    }
    UpdateStudentModal.prototype.toggleVisibility = function () {
        this.props.closeModal();
    };
    UpdateStudentModal.prototype.updateStudent = function () {
        var _this = this;
        // TODO: make REGEX helper for null/whitespace/special characters
        var studentid = this.props.student ? this.props.student.id : undefined;
        var newItem = __assign(__assign({}, this.state), { id: studentid });
        updateClient(newItem).then(function (id) {
            _this.props.refreshTableCB();
            _this.toggleVisibility();
        });
    };
    UpdateStudentModal.prototype.onChangeHandler = function (e) {
        var _a;
        this.setState((_a = {}, _a[e.currentTarget.name] = e.currentTarget.value, _a));
    };
    UpdateStudentModal.prototype.render = function () {
        if (this.state) {
            return (React.createElement("div", { className: "modal-container" },
                React.createElement("div", { className: "modal " + (this.props.isVisible ? "modal-show" : "modal-hidden") },
                    React.createElement("button", { onClick: this.toggleVisibility.bind(this) }, "Close"),
                    React.createElement("div", { className: "modal-header" },
                        React.createElement("h1", null, "Update Student"),
                        React.createElement("h3", null, this.props.student ? "editing: ".concat(this.props.student.firstname, " ").concat(this.props.student.lastname) : "")),
                    React.createElement("div", { className: "modal-body" },
                        React.createElement("label", null, "First Name:"),
                        " ",
                        React.createElement("input", { name: 'firstname', placeholder: this.props.student ? this.props.student.firstname : "", onChange: this.onChangeHandler.bind(this), type: "text" }),
                        React.createElement("label", null, "Last Name:"),
                        " ",
                        React.createElement("input", { name: 'lastname', placeholder: this.props.student ? this.props.student.lastname : "", onChange: this.onChangeHandler.bind(this), type: "text" }),
                        React.createElement("button", { onClick: this.updateStudent.bind(this) }, "Add Item")))));
        }
        return (React.createElement("div", null, "loading..."));
    };
    return UpdateStudentModal;
}(React.Component));
exports.UpdateStudentModal = UpdateStudentModal;
//# sourceMappingURL=UpdateStudentModal.js.map