"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminInterfacePage = void 0;
var core_1 = require("@angular/core");
var AdminInterfacePage = exports.AdminInterfacePage = function () {
    var _classDecorators = [(0, core_1.Component)({
            selector: 'app-admin-interface',
            templateUrl: './admin-interface.page.html',
            styleUrls: ['./admin-interface.page.scss'],
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var AdminInterfacePage = _classThis = /** @class */ (function () {
        function AdminInterfacePage_1(http, dataService) {
            this.http = http;
            this.dataService = dataService;
        }
        AdminInterfacePage_1.prototype.ngOnInit = function () {
            this.loadData();
        };
        AdminInterfacePage_1.prototype.loadData = function () {
            var _this = this;
            this.http.get('assets/data/super-admin-data.json').subscribe(function (data) {
                _this.consumers = data.consumers;
                _this.filteredConsumers = _this.consumers;
                console.log(_this.consumers);
            }, function (error) {
                console.error('Error fetching consumer data:', error);
            });
        };
        AdminInterfacePage_1.prototype.updateData = function () {
            var updatedData = {
                firstName: '',
                lastName: '',
                accountNumber: '',
                username: '',
                password: ''
            };
            this.dataService.updateConsumerData(updatedData)
                .subscribe(function () {
                // Handle success, e.g., show a success message
                console.log('Data updated successfully');
            }, function (error) {
                // Handle error, e.g., show an error message
                console.error('Error updating data:', error);
            });
        };
        AdminInterfacePage_1.prototype.populateFields = function (consumer) {
            var firstNameInput = document.getElementById('firstName');
            var lastNameInput = document.getElementById('lastName');
            var accountNumberInput = document.getElementById('accountNumber');
            var usernameInput = document.getElementById('username');
            var passwordInput = document.getElementById('password');
            firstNameInput.value = consumer.firstName;
            lastNameInput.value = consumer.lastName;
            accountNumberInput.value = consumer.accountNumber;
            usernameInput.value = consumer.username;
            passwordInput.value = consumer.password;
        };
        AdminInterfacePage_1.prototype.searchItems = function (searchTerm) {
            if (searchTerm && searchTerm.trim() !== '') {
                this.filteredConsumers = this.consumers.filter(function (consumer) {
                    var lowerCaseSearchTerm = searchTerm.toLowerCase();
                    return (consumer.firstName.toLowerCase().includes(lowerCaseSearchTerm) ||
                        consumer.lastName.toLowerCase().includes(lowerCaseSearchTerm) ||
                        consumer.accountNumber.toString().includes(searchTerm) ||
                        consumer.username.toLowerCase().includes(lowerCaseSearchTerm) ||
                        consumer.password.toLowerCase().includes(lowerCaseSearchTerm));
                });
            }
            else {
                this.filteredConsumers = this.consumers;
            }
        };
        AdminInterfacePage_1.prototype.maskPassword = function (password) {
            return '*'.repeat(password.length);
        };
        AdminInterfacePage_1.prototype.clearForm = function () {
            var firstNameInput = document.getElementById('firstName');
            var lastNameInput = document.getElementById('lastName');
            var accountNumberInput = document.getElementById('accountNumber');
            var usernameInput = document.getElementById('username');
            var passwordInput = document.getElementById('password');
            firstNameInput.value = '';
            lastNameInput.value = '';
            accountNumberInput.value = '';
            usernameInput.value = '';
            passwordInput.value = '';
        };
        return AdminInterfacePage_1;
    }());
    __setFunctionName(_classThis, "AdminInterfacePage");
    (function () {
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name }, null, _classExtraInitializers);
        AdminInterfacePage = _classThis = _classDescriptor.value;
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AdminInterfacePage = _classThis;
}();
