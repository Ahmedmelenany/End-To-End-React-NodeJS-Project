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
exports.EnrollmentTable = void 0;
var React = require("react");
var Api_1 = require("../Api");
// import { AddStudentModal } from './AddStudentModal';
// import { UpdateStudentModal } from './UpdateStudentModal';
var DeleteEnrollmentModal_1 = require("./DeleteEnrollmentModal");
;
;
var getClient = function () { return (0, Api_1.post)('/enrollment'); };
var EnrollmentTable = /** @class */ (function (_super) {
    __extends(EnrollmentTable, _super);
    function EnrollmentTable(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            isVisibleDeleteModal: false,
            newestItems: [],
            filteredItems: []
        };
        //update props
        _this.updateNewestItems();
        return _this;
    }
    EnrollmentTable.prototype.updateNewestItems = function () {
        var _this = this;
        getClient().then(function (data) {
            console.log(data);
            _this.setState({
                newestItems: data,
                filteredItems: data,
            });
        });
    };
    EnrollmentTable.prototype.filterItems = function (event) {
        var searchName = event.currentTarget.value;
        var newFilteredItems = this.state.newestItems.filter(function (i) {
            var name = i.studentFirstName + ' ' + i.studentLastName;
            return name.replace(/_/g, " ").toLowerCase()
                .indexOf(searchName.toLowerCase()) > -1;
        });
        this.setState({
            filteredItems: newFilteredItems
        });
    };
    EnrollmentTable.prototype.deleteEnrollment = function (e) {
        var id = (e.currentTarget.value).split(',');
        var sid = Number(id[0]);
        var cid = Number(id[1]);
        var newItem = this.state.newestItems.find(function (s) { return s.classid === cid && s.studentid === sid; });
        this.setState({ item: newItem, isVisibleDeleteModal: true });
    };
    EnrollmentTable.prototype.closeDeleteModalVis = function () {
        this.setState({
            isVisibleDeleteModal: false, item: undefined
        });
    };
    EnrollmentTable.prototype.renderTableHeader = function () {
        return (React.createElement("thead", null,
            React.createElement("tr", null,
                React.createElement("th", null, "id"),
                React.createElement("th", null, "Student Name"),
                React.createElement("th", null, "Class Name"),
                React.createElement("th", null))));
    };
    EnrollmentTable.prototype.renderTableBody = function () {
        var _this = this;
        var tags = [];
        if (this.state.filteredItems) { // there was loading errors without this
            tags = this.state.filteredItems.map(function (fi) {
                var name = fi.studentFirstName + ' ' + fi.studentLastName;
                return (React.createElement("tr", { key: fi.id },
                    React.createElement("td", null, fi.id),
                    React.createElement("td", null, name.replace(/_/g, " ")),
                    React.createElement("td", null, fi.className.replace(/_/g, " ")),
                    React.createElement("td", null,
                        React.createElement("button", { value: "".concat(fi.studentid, ",").concat(fi.classid), onClick: _this.deleteEnrollment.bind(_this) }, "Delete"))));
            });
        }
        return (React.createElement("tbody", null, tags));
    };
    EnrollmentTable.prototype.render = function () {
        return (React.createElement("div", { className: "table-container" },
            React.createElement("div", { className: "table-controls" },
                React.createElement("div", { className: "table-buttons" },
                    React.createElement("button", { onClick: this.updateNewestItems.bind(this) }, "Refresh"),
                    React.createElement("br", null),
                    React.createElement(DeleteEnrollmentModal_1.DeleteEnrollmentModal, { refreshTableCB: this.updateNewestItems.bind(this), isVisible: this.state.isVisibleDeleteModal, closeModal: this.closeDeleteModalVis.bind(this), item: this.state.item })),
                React.createElement("span", null,
                    "Search Student Name:",
                    React.createElement("input", { type: "text", onChange: this.filterItems.bind(this) })),
                React.createElement("h5", null, "*Adding enrollments can only occur on student page.*")),
            React.createElement("table", null,
                this.renderTableHeader(),
                this.renderTableBody())));
    };
    return EnrollmentTable;
}(React.Component));
exports.EnrollmentTable = EnrollmentTable;
//# sourceMappingURL=EnrollmentTable.js.map