import {StringMap} from 'angular2/src/core/facade/collection';

/**
 * Lifecycle hooks are guaranteed to be called in the following order:
 * - `OnChanges` (if any bindings have changed),
 * - `OnInit` (after the first check only),
 * - `DoCheck`,
 * - `AfterContentInit`,
 * - `AfterContentChecked`,
 * - `OnDestroy` (at the very end before destruction)
 *
 * // todo(vicb): describe Dart & TS vs JS
 */
export interface LifecycleHook {}

/**
 * Notify a directive when any of its bindings have changed.
 *
 * `onChanges` is called right after the directive's bindings have been checked,
 * and before any of its children's bindings have been checked.
 *
 * It is invoked only if at least one of the directive's bindings has changed.
 *
 * ## Example:
 *
 * ```
 * @Component(...)
 * class MyComponent implements OnChanges {
 *   propA;
 *   propB;
 *
 *   onChanges(changes: {[idx: string, PropertyUpdate]}): void {
 *     // This will get called after any of the properties have been updated.
 *     if (changes['propA']) {
 *       // if propA was updated
 *     }
 *     if (changes['propA']) {
 *       // if propB was updated
 *     }
 *   }
 * }
 *  ```
 */
export class OnChanges implements LifecycleHook {
  onChanges(changes: StringMap<string, any>): void {}
}

/**
 * Notify a directive when it has been checked the first time.
 *
 * `onInit` is called right after the directive's bindings have been checked for the first time,
 * and before any of its children's bindings have been checked.
 *
 * It is invoked only once.
 *
 * ## Example
 *
 * ```
 * @Component(...)
 * class MyComponent @implements OnInit {
 *   onInit(): void {
 *   }
 * }
 *  ```
 */
export class OnInit implements LifecycleHook {
  onInit(): void {}
}

/**
 * Overrides the default change detection.
 *
 * `doCheck()` gets called to check the changes in the directives instead of the default
 * change detection mechanism.
 *
 * It is invoked every time the change detection is triggered.
 *
 * ## Example
 *
 * ```
 * @Component(...)
 * class MyComponent implements DoCheck {
 *   doCheck(): void {
 *     // Custom logic to detect changes
 *   }
 * }
 *  ```
 */
export class DoCheck implements LifecycleHook {
  doCheck(): void {}
}

/**
 * Notify a directive whenever a {@link ViewMetadata} that contains it is destroyed.
 *
 * ## Example
 *
 * ```
 * @Component(...)
 * class MyComponent implements OnDestroy {
 *   onDestroy(): void {
 *     // invoked to notify directive of the containing view destruction.
 *   }
 * }
 * ```
 */
export class OnDestroy implements LifecycleHook {
  onDestroy(): void {}
}

/**
 * Notify a directive when the bindings of all its content children have been checked the first
 * time (whether they have changed or not).
 *
 * ## Example
 *
 * ```
 * @Component(...)
 * class MyComponent implements AfterContentInit {
 *   afterContentInit(): void {
 *   }
 * }
 *  ```
 */
export class AfterContentInit implements LifecycleHook {
  afterContentInit(): void {}
}

/**
 * Notify a directive when the bindings of all its content children have been checked (whether
 * they have changed or not).
 *
 * ## Example
 *
 * ```
 * @Component(...)
 * class MyComponent implements AfterContentChecked {
 *   afterContentChecked(): void {
 *   }
 * }
 *  ```
 */
export class AfterContentChecked implements LifecycleHook {
  afterContentChecked(): void {}
}

/**
 * Notify a directive when the bindings of all its view children have been checked the first time
 * (whether they have changed or not).
 *
 * ## Example
 *
 * ```
 * @Component(...)
 * class MyComponent implements AfterViewInit {
 *   afterViewInit(): void {
 *   }
 * }
 *  ```
 */
export class AfterViewInit implements LifecycleHook {
  afterViewInit(): void {}
}

/**
 * Notify a directive when the bindings of all its view children have been checked (whether they
 * have changed or not).
 *
 * ## Example
 *
 * ```
 * @Component(...)
 * class MyComponent implements AfterViewChecked {
 *   afterViewChecked(): void {
 *   }
 * }
 *  ```
 */
export class AfterViewChecked implements LifecycleHook {
  afterViewChecked(): void {}
}
