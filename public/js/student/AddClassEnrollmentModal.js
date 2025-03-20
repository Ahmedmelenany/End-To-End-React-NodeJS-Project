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
exports.AddClassEnrollmentModal = void 0;
var React = require("react");
var Api_1 = require("../Api");
;
;
var addClient = function (newItem) { return (0, Api_1.post)('/enrollment/add', newItem).catch(function (err) { return alert("duplicate enrollment"); }); };
var optionsClient = function () { return (0, Api_1.post)('/class/options'); };
var AddClassEnrollmentModal = /** @class */ (function (_super) {
    __extends(AddClassEnrollmentModal, _super);
    function AddClassEnrollmentModal(props) {
        var _this = _super.call(this, props) || this;
        _this.updateOptions();
        if (_this.props.student) {
            var sid = _this.props.student.id || 0;
            _this.state = {
                studentid: sid,
                classid: 0,
                avaliableOptions: []
            };
        }
        _this.state = __assign({}, (_this.state));
        return _this;
    }
    AddClassEnrollmentModal.prototype.updateOptions = function () {
        var _this = this;
        optionsClient().then(function (data) {
            _this.setState({
                avaliableOptions: data
            });
        });
    };
    AddClassEnrollmentModal.prototype.toggleVisibility = function () {
        this.props.closeModal();
    };
    AddClassEnrollmentModal.prototype.updateStudent = function () {
        var _this = this;
        // TODO: make REGEX helper for null/whitespace/special characters
        var sid = this.props.student ? (this.props.student.id ? this.props.student.id : 0) : 0;
        var cid = this.state.classid;
        var newItem = {
            classid: cid,
            studentid: sid
        };
        console.log(newItem);
        addClient(newItem).then(function (id) {
            _this.props.refreshTableCB();
            _this.toggleVisibility();
        });
    };
    AddClassEnrollmentModal.prototype.dropDownHandler = function (e) {
        var _a;
        //number conversions will have to be done on the backend because of jquery json conversions.
        this.setState((_a = {}, _a[e.currentTarget.name] = +(e.currentTarget.value), _a));
    };
    AddClassEnrollmentModal.prototype.renderOptionDropDown = function () {
        var tags = [React.createElement("option", { key: '0', value: '0' }, "N/A")];
        var currentClassId = [];
        if (this.state.avaliableOptions) {
            var newTags = this.state.avaliableOptions.map(function (op) {
                return (React.createElement("option", { key: op.id, value: op.id }, op.name));
            });
            tags = tags.concat(newTags);
        }
        return (React.createElement("select", { name: 'classid', onChange: this.dropDownHandler.bind(this) }, tags));
    };
    AddClassEnrollmentModal.prototype.render = function () {
        if (this.state) {
            return (React.createElement("div", { className: "modal-container" },
                React.createElement("div", { className: "modal " + (this.props.isVisible ? "modal-show" : "modal-hidden") },
                    React.createElement("button", { onClick: this.toggleVisibility.bind(this) }, "Close"),
                    React.createElement("div", { className: "modal-header" },
                        React.createElement("h1", null, "Enroll into a class"),
                        React.createElement("h3", null, this.props.student ? "editing: ".concat(this.props.student.firstname, " ").concat(this.props.student.lastname) : ""),
                        React.createElement("h3", null,
                            "Note: Deleting enrollments",
                            React.createElement("br", null),
                            "can only occur on the enrollment page.")),
                    React.createElement("div", { className: "modal-body" },
                        this.renderOptionDropDown(),
                        React.createElement("button", { onClick: this.updateStudent.bind(this) }, "Add Item")))));
        }
        return (React.createElement("div", null, "loading..."));
    };
    return AddClassEnrollmentModal;
}(React.Component));
exports.AddClassEnrollmentModal = AddClassEnrollmentModal;
//# sourceMappingURL=AddClassEnrollmentModal.js.map