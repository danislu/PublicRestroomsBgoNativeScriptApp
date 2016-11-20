"use strict";
var ng_redux_1 = require('../components/ng-redux');
/**
 * Selects an observable from the store, and attaches it to the decorated
 * property.
 *
 * @param { PropertySelector | PathSelector | FunctionSelector } selector
 * An Rxjs selector function, property name string, or property name path
 * (array of strings/array indices) that locates the store data to be
 * selected
 *
 * @param { Comparator } comparer function for this selector
 */
function select(selector, comparator) {
    return function decorate(target, key) {
        var bindingKey = selector;
        if (!selector) {
            bindingKey = (key.lastIndexOf('$') === key.length - 1) ?
                key.substring(0, key.length - 1) :
                key;
        }
        function getter() {
            return ng_redux_1.NgRedux.instance.select(bindingKey, comparator);
        }
        // Replace decorated property with a getter that returns the observable.
        if (delete target[key]) {
            Object.defineProperty(target, key, {
                get: getter,
                enumerable: true,
                configurable: true
            });
        }
    };
}
exports.select = select;
//# sourceMappingURL=select.js.map