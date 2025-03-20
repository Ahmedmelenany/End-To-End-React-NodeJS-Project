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
exports.BuildingTable = void 0;
var React = require("react");
var Api_1 = require("../Api");
var AddBuildingModal_1 = require("./AddBuildingModal");
;
;
var getClient = function () { return (0, Api_1.post)('/building'); };
var BuildingTable = /** @class */ (function (_super) {
    __extends(BuildingTable, _super);
    function BuildingTable(props) {
        var _this = _super.call(this, props) || this;
        //update props
        _this.updateNewestItems();
        return _this;
    }
    BuildingTable.prototype.updateNewestItems = function () {
        var _this = this;
        getClient().then(function (data) {
            console.log(data);
            _this.setState({
                newestItems: data,
                filteredItems: data
            });
        });
    };
    BuildingTable.prototype.filterItems = function (event) {
        var searchName = event.currentTarget.value;
        var newFilteredItems = this.state.newestItems.filter(function (i) {
            return i.name.replace(/_/g, " ").toLowerCase()
                .indexOf(searchName.toLowerCase()) > -1;
        });
        this.setState({
            filteredItems: newFilteredItems
        });
    };
    BuildingTable.prototype.renderTableHeader = function () {
        return (React.createElement("thead", null,
            React.createElement("tr", null,
                React.createElement("th", null, "id"),
                React.createElement("th", null, "name"),
                React.createElement("th", null, "Description"),
                React.createElement("th", null, "Department Name"))));
    };
    BuildingTable.prototype.renderTableBody = function () {
        var tags = [];
        if (this.state) { // there was loading errors without this
            tags = this.state.filteredItems.map(function (fi) {
                return (React.createElement("tr", { key: fi.id },
                    React.createElement("td", null, fi.id),
                    React.createElement("td", null, fi.name.replace(/_/g, " ")),
                    React.createElement("td", null, fi.description),
                    React.createElement("td", null, fi.departmentName)));
            });
        }
        return (React.createElement("tbody", null, tags));
    };
    BuildingTable.prototype.render = function () {
        return (React.createElement("div", { className: "table-container" },
            React.createElement("div", { className: "table-controls" },
                React.createElement("div", { className: "table-buttons" },
                    React.createElement("button", { onClick: this.updateNewestItems.bind(this) }, "Refresh"),
                    React.createElement("br", null),
                    React.createElement(AddBuildingModal_1.AddBuildingModal, { refreshTableCB: this.updateNewestItems.bind(this) })),
                React.createElement("span", null,
                    "Search Name:",
                    React.createElement("input", { type: "text", onChange: this.filterItems.bind(this) }))),
            React.createElement("table", null,
                this.renderTableHeader(),
                this.renderTableBody())));
    };
    return BuildingTable;
}(React.Component));
exports.BuildingTable = BuildingTable;
//# sourceMappingURL=BuildingTable.js.map