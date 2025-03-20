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
exports.DeleteStudentModal = void 0;
var React = require("react");
var Api_1 = require("../Api");
;
;
var DeleteClientEnrollment = function (newItem) { return (0, Api_1.post)('/enrollment/deleteenrollment', newItem); };
var DeleteClientStudent = function (s) { return (0, Api_1.post)('/student/delete', s); };
var DeleteStudentModal = /** @class */ (function (_super) {
    __extends(DeleteStudentModal, _super);
    function DeleteStudentModal(props) {
        var _this = _super.call(this, props) || this;
        if (_this.props.student) {
            _this.state = __assign({}, (_this.props.student));
        }
        _this.state = __assign({}, (_this.state));
        return _this;
    }
    DeleteStudentModal.prototype.toggleVisibility = function () {
        this.props.closeModal();
    };
    DeleteStudentModal.prototype.DeleteStudent = function () {
        var _this = this;
        // TODO: make REGEX helper for null/whitespace/special characters
        var studentid = this.props.student ? this.props.student.id : undefined;
        if (this.props.student) {
            var newItem_1 = __assign({}, this.props.student);
            DeleteClientEnrollment(newItem_1).then(function (affectRows) {
                DeleteClientStudent(newItem_1).then(function (affectRows) {
                    _this.props.refreshTableCB();
                    _this.toggleVisibility();
                });
            });
        }
    };
    DeleteStudentModal.prototype.render = function () {
        if (this.state) {
            return (React.createElement("div", { className: "modal-container" },
                React.createElement("div", { className: "modal " + (this.props.isVisible ? "modal-show" : "modal-hidden") },
                    React.createElement("button", { onClick: this.toggleVisibility.bind(this) }, "Close"),
                    React.createElement("div", { className: "modal-header" },
                        React.createElement("h1", null, "Delete Student"),
                        React.createElement("h3", null, this.props.student ? "Deleting: ".concat(this.props.student.firstname, " ").concat(this.props.student.lastname) : "")),
                    React.createElement("div", { className: "modal-body" },
                        React.createElement("h4", null, "Delete student and associated enrollments?"),
                        React.createElement("span", null,
                            React.createElement("button", { onClick: this.DeleteStudent.bind(this) }, "Yes"),
                            React.createElement("button", { onClick: this.toggleVisibility.bind(this) }, "No"))))));
        }
        return (React.createElement("div", null, "loading..."));
    };
    return DeleteStudentModal;
}(React.Component));
exports.DeleteStudentModal = DeleteStudentModal;
//# sourceMappingURL=DeleteStudentModal.js.map