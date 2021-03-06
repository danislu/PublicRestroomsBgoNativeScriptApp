import * as Redux from 'redux';
import { Store } from 'redux';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import { ApplicationRef } from '@angular/core';
export declare type PropertySelector = string | number | symbol;
export declare type PathSelector = (string | number)[];
export declare type FunctionSelector<RootState, S> = ((s: RootState) => S);
export declare type Comparator = (x: any, y: any) => boolean;
export declare class NgRedux<RootState> {
    private _store;
    private _store$;
    private _defaultMapStateToTarget;
    private _defaultMapDispatchToTarget;
    static instance: any;
    /**
     * Creates an instance of NgRedux.
     *
     * The parameter is deprecated and left for backwards compatibility.
     * It doesn't do anything. It will be removed in a future major version.
     */
    constructor(deprecated?: ApplicationRef);
    /**
     * configures a Redux store and allows NgRedux to observe and dispatch
     * to it.
     *
     * This should only be called once for the lifetime of your app, for
     * example in the constructor of your root component.
     *
     * @param {Redux.Reducer<RootState>} reducer Your app's root reducer
     * @param {RootState} initState Your app's initial state
     * @param {Redux.Middleware[]} middleware Optional Redux middlewares
     * @param {Redux.StoreEnhancer<RootState>[]} Optional Redux store enhancers
     */
    configureStore(reducer: Redux.Reducer<RootState>, initState: RootState, middleware?: Redux.Middleware[], enhancers?: Redux.StoreEnhancer<RootState>[]): void;
    /**
     * Accepts a Redux store, then sets it in NgRedux and
     * allows NgRedux to observe and dispatch to it.
     *
     * This should only be called once for the lifetime of your app, for
     * example in the constructor of your root component. If configureStore
     * has been used this cannot be used.
     *
     * @param {Redux.Store} store Your app's store
     */
    provideStore(store: Store<RootState>): void;
    /**
     * Select a slice of state to expose as an observable.
     *
     * @template S
     * @param { PropertySelector |
     *  PathSelector |
     *  FunctionSelector<RootState, S>}
     * selector key or function to select a part of the state
     * @param { Comparator } [comparer] Optional
     * comparison function called to test if an item is distinct
     * from the previous item in the source.
     *
     * @returns {Observable<S>} an Observable that emits items from the
     * source Observable with distinct values.
     */
    select<S>(selector: PropertySelector | PathSelector | FunctionSelector<RootState, S>, comparator?: Comparator): Observable<S>;
    wrapActionCreators: (actions: any) => (dispatch: Redux.Dispatch<any>) => Redux.ActionCreatorsMapObject | Redux.ActionCreator<{}>;
    /**
     * Map the specified actions to the target
     * @param {any} actions the actions to bind to the target
     * @returns {(target:any)=>void} a function to pass your target into
     */
    mapDispatchToTarget: (actions: any) => (target: any) => void;
    /**
     * Connect your component to your redux state.
     *
     * @param {*} mapStateToTarget connect will subscribe to Redux store
     * updates. Any time it updates, mapStateToTarget will be called. Its
     * result must be a plain object, and it will be merged into `target`.
     * If you have a component which simply triggers actions without needing
     * any state you can pass null to `mapStateToTarget`.
     *
     * @param {*} mapDispatchToTarget  Optional. If an object is passed,
     * each function inside it will be assumed to be a Redux action creator.
     * An object with the same function names, but bound to a Redux store,
     * will be merged onto `target`. If a function is passed, it will be given
     * `dispatch`. It’s up to you to return an object that somehow uses
     * `dispatch` to bind action creators in your own way. (Tip: you may
     * use the
     * [`bindActionCreators()`]
     * (http://gaearon.github.io/redux/docs/api/bindActionCreators.html)
     * helper from Redux.).
     * @returns a function that accepts a target object to map the state
     * and/or dispatch onto, or a function that will recieve the result of
     * mapStateToTarget and mapDispatchToTarget as paramaters
     */
    connect: (mapStateToTarget: any, mapDispatchToTarget: any) => (target: any) => Redux.Unsubscribe;
    /**
     * Get the current state of the application
     * @returns {RootState} the application state
     */
    getState: () => RootState;
    /**
     * Subscribe to the Redux store changes
     *
     * @param {() => void} listener callback to invoke when the state is updated
     * @returns a function to unsubscribe
     */
    subscribe: (listener: () => void) => Redux.Unsubscribe;
    /**
    * Replaces the reducer currently used by the store to calculate the state.
    *
    * You might need this if your app implements code splitting and you want to
    * load some of the reducers dynamically. You might also need this if you
    * implement a hot reloading mechanism for Redux.
    *
    * @param nextReducer The reducer for the store to use instead.
    */
    replaceReducer: (nextReducer: Redux.Reducer<RootState>) => void;
    /**
     * Dispatch an action to Redux
     */
    dispatch: <A extends Redux.Action>(action: A) => any;
    private updateTarget(target, StateSlice, dispatch);
    private getStateSlice(state, mapStateToScope);
    private getBoundActions;
    /**
     * Helper function to set the store to NgRedux and
     * allow NgRedux to observe and dispatch to it.
     *
     * @param {Redux.Store} store The redux store
     */
    private setStore(store);
}
