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
exports.StudentTable = void 0;
var React = require("react");
var Api_1 = require("../Api");
var AddStudentModal_1 = require("./AddStudentModal");
var UpdateStudentModal_1 = require("./UpdateStudentModal");
var DeleteStudentModal_1 = require("./DeleteStudentModal");
var AddClassEnrollmentModal_1 = require("./AddClassEnrollmentModal");
;
;
var getClient = function () { return (0, Api_1.post)('/student'); };
var StudentTable = /** @class */ (function (_super) {
    __extends(StudentTable, _super);
    function StudentTable(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            isVisibleUpdateModal: false,
            isVisibleDeleteModal: false,
            isVisibleEnrollModal: false,
            newestItems: [],
            filteredItems: []
        };
        //update props
        _this.updateNewestItems();
        return _this;
    }
    StudentTable.prototype.updateNewestItems = function () {
        var _this = this;
        getClient().then(function (data) {
            console.log(data);
            _this.setState({
                newestItems: data,
                filteredItems: data,
                isVisibleUpdateModal: false
            });
        });
    };
    StudentTable.prototype.filterItems = function (event) {
        var searchName = event.currentTarget.value;
        var newFilteredItems = this.state.newestItems.filter(function (i) {
            var name = i.firstname + ' ' + i.lastname;
            return name.replace(/_/g, " ").toLowerCase()
                .indexOf(searchName.toLowerCase()) > -1;
        });
        this.setState({
            filteredItems: newFilteredItems
        });
    };
    StudentTable.prototype.updateStudent = function (e) {
        var id = Number(e.currentTarget.value);
        var updateStudent = this.state.newestItems.find(function (s) { return s.id === id; });
        this.setState({ student: updateStudent, isVisibleUpdateModal: true });
    };
    StudentTable.prototype.deleteStudent = function (e) {
        var id = Number(e.currentTarget.value);
        var updateStudent = this.state.newestItems.find(function (s) { return s.id === id; });
        this.setState({ student: updateStudent, isVisibleDeleteModal: true });
    };
    StudentTable.prototype.enrollStudent = function (e) {
        var id = Number(e.currentTarget.value);
        var updateStudent = this.state.newestItems.find(function (s) { return s.id === id; });
        this.setState({ student: updateStudent, isVisibleEnrollModal: true });
    };
    StudentTable.prototype.closeUpdateModalVis = function () {
        this.setState({
            isVisibleUpdateModal: false, student: undefined
        });
    };
    StudentTable.prototype.closeDeleteModalVis = function () {
        this.setState({
            isVisibleDeleteModal: false, student: undefined
        });
    };
    StudentTable.prototype.closeEnrollModalVis = function () {
        this.setState({
            isVisibleEnrollModal: false, student: undefined
        });
    };
    StudentTable.prototype.renderTableHeader = function () {
        return (React.createElement("thead", null,
            React.createElement("tr", null,
                React.createElement("th", null, "id"),
                React.createElement("th", null, "name"),
                React.createElement("th", null, "# Classes Enrolled"),
                React.createElement("th", null),
                React.createElement("th", null),
                React.createElement("th", null))));
    };
    StudentTable.prototype.renderTableBody = function () {
        var _this = this;
        var tags = [];
        if (this.state.filteredItems) { // there was loading errors without this
            tags = this.state.filteredItems.map(function (fi) {
                var name = fi.firstname + ' ' + fi.lastname;
                return (React.createElement("tr", { key: fi.id },
                    React.createElement("td", null, fi.id),
                    React.createElement("td", null, name.replace(/_/g, " ")),
                    React.createElement("td", null, fi.classCount),
                    React.createElement("td", null,
                        React.createElement("button", { value: fi.id, onClick: _this.updateStudent.bind(_this) }, "update")),
                    React.createElement("td", null,
                        React.createElement("button", { value: fi.id, onClick: _this.enrollStudent.bind(_this) }, "classes")),
                    React.createElement("td", null,
                        React.createElement("button", { value: fi.id, onClick: _this.deleteStudent.bind(_this) }, "delete"))));
            });
        }
        return (React.createElement("tbody", null, tags));
    };
    StudentTable.prototype.render = function () {
        return (React.createElement("div", { className: "table-container" },
            React.createElement("div", { className: "table-controls" },
                React.createElement("div", { className: "table-buttons" },
                    React.createElement("button", { onClick: this.updateNewestItems.bind(this) }, "Refresh"),
                    React.createElement("br", null),
                    React.createElement(AddStudentModal_1.AddStudentModal, { refreshTableCB: this.updateNewestItems.bind(this) }),
                    React.createElement(UpdateStudentModal_1.UpdateStudentModal, { refreshTableCB: this.updateNewestItems.bind(this), isVisible: this.state.isVisibleUpdateModal, closeModal: this.closeUpdateModalVis.bind(this), student: this.state.student }),
                    React.createElement(DeleteStudentModal_1.DeleteStudentModal, { refreshTableCB: this.updateNewestItems.bind(this), isVisible: this.state.isVisibleDeleteModal, closeModal: this.closeDeleteModalVis.bind(this), student: this.state.student }),
                    React.createElement(AddClassEnrollmentModal_1.AddClassEnrollmentModal, { refreshTableCB: this.updateNewestItems.bind(this), isVisible: this.state.isVisibleEnrollModal, closeModal: this.closeEnrollModalVis.bind(this), student: this.state.student })),
                React.createElement("span", null,
                    "Search Name:",
                    React.createElement("input", { type: "text", onChange: this.filterItems.bind(this) }))),
            React.createElement("table", null,
                this.renderTableHeader(),
                this.renderTableBody())));
    };
    return StudentTable;
}(React.Component));
exports.StudentTable = StudentTable;
//# sourceMappingURL=StudentTable.js.map