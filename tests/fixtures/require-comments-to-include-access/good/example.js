/**

 This thing is private.

 @private
 */
export function somePrivateThing() {}

/**
 * This thing is private and documented in JSDoc style.
 *
 * @private
 */
export function someAnotherPrivateThing() {}

/**

 This thing is public.

 @public
 */
export function somePublicThing() {}

/**
 * This thing is public and documented in JSDoc style.
 *
 * @public
 */
export function someAnotherPublicThing() {}

/**

 This thing is protected.

 @protected
 */
export function someProtectedThing() {}

/**
 * This thing is public and documented in JSDoc style.
 *
 * @public
 */
export function anotherPublicThing() {
  /**
   * This thing is private and documented in JSDoc style.
   * @private
   */
  function someInternalThing() {}
}

/**
 * This thing is protected and documented in JSDoc style.
 *
 * @protected
 */
export function anotherProtectedThing() {}

/**
 * This thing is public and documented in JSDoc style, with multiple spaces before the annotation.
 *
 *    @public
 */
export function doNothingPublicMethod() {}

export function doNothingPrivateMethod() {
  /**
   * This thing is private and documented in JSDoc style.
   *
   * @private
   */
  function somethingElse() {}
}

export function doNothingPrivateMethod2() {
  /**
   * This thing is private and documented in JSDoc style, with multiple spaces before the annotation.
   *
   *    @private
   */
  function somethingElse() {};
}

/**
 * This function declaration is public and documented in JSDoc style.
 *
 * @public
 */
function somePublicFunction() {}

/**
 * This function expression is public and documented in JSDoc style.
 *
 * @public
 */
anotherPublicFunction = function() {};

/**
 * This arrow function is public and documented in JSDoc style.
 *
 * @public
 */
somePublicArrowFunction = () => {};

/**
 * This arrow function is public and documented in JSDoc style.
 *
 * @public
 */
anotherPublicArrowFunction(() => {});

/**
 * This class declaration is public and documented in JSDoc style.
 *
 * @public
 */
class somePublicClass {};

/**
 * This class expression is public and documented in JSDoc style.
 *
 * @public
 */
anotherPublicClass = class {};

export function doNothingPrivateMethod3() {
  /**
   * This thing is private and documented in JSDoc style.
   *
   * @private
   */
  let somethingElse = () => {};
}

/*
 Some non documentation block, nothing to see here.
*/
