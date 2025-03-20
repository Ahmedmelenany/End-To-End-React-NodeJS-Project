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
exports.DeleteEnrollmentModal = void 0;
var React = require("react");
var Api_1 = require("../Api");
;
;
var DeleteClientEnrollment = function (item) { return (0, Api_1.post)('/enrollment/delete', item).catch(function (err) { return alert(err); }); };
var DeleteEnrollmentModal = /** @class */ (function (_super) {
    __extends(DeleteEnrollmentModal, _super);
    function DeleteEnrollmentModal(props) {
        var _this = _super.call(this, props) || this;
        if (_this.props.item) {
            _this.state = {
                classid: _this.props.item.classid,
                studentid: _this.props.item.studentid
            };
        }
        _this.state = __assign({}, (_this.state));
        return _this;
    }
    DeleteEnrollmentModal.prototype.toggleVisibility = function () {
        this.props.closeModal();
    };
    DeleteEnrollmentModal.prototype.DeleteStudent = function () {
        var _this = this;
        // TODO: make REGEX helper for null/whitespace/special characters
        var studentid = this.props.item ? this.props.item.id : undefined;
        if (this.props.item) {
            var newItem = __assign({}, this.props.item);
            DeleteClientEnrollment(newItem).then(function (affectRows) {
                _this.props.refreshTableCB();
                _this.toggleVisibility();
            });
        }
    };
    DeleteEnrollmentModal.prototype.render = function () {
        if (this.state) {
            return (React.createElement("div", { className: "modal-container" },
                React.createElement("div", { className: "modal " + (this.props.isVisible ? "modal-show" : "modal-hidden") },
                    React.createElement("button", { onClick: this.toggleVisibility.bind(this) }, "Close"),
                    React.createElement("div", { className: "modal-header" },
                        React.createElement("h1", null, "Delete Enrollment"),
                        React.createElement("h3", null, this.props.item ? "Deleting: ".concat(this.props.item.studentFirstName, " ").concat(this.props.item.studentLastName, " from ").concat(this.props.item.className) : "")),
                    React.createElement("div", { className: "modal-body" },
                        React.createElement("h4", null, "Are you sure??"),
                        React.createElement("span", null,
                            React.createElement("button", { onClick: this.DeleteStudent.bind(this) }, "Yes"),
                            React.createElement("button", { onClick: this.toggleVisibility.bind(this) }, "No"))))));
        }
        return (React.createElement("div", null, "loading..."));
    };
    return DeleteEnrollmentModal;
}(React.Component));
exports.DeleteEnrollmentModal = DeleteEnrollmentModal;
//# sourceMappingURL=DeleteEnrollmentModal.js.map