/**
  Something without access documented.
*/
export function someNonDeterminedThing() {}

/**
* Something without access documented using `*` prefix comment syntax.
*/
export function someAnotherNonDeterminedThing() {}

/**
* Something with access documented using `*` prefix comment syntax.
* @public
*/
export function yetAnotherNonDeterminedThing() {
  /**
   * Internal private method without access defined
   */
  function internalPrivateThing() {}
}

/**
* Something without access documented using `*` prefix comment syntax.
*/
export function andYetAnotherNonDeterminedThing() {
  /**
   * Internal private method without access defined
   */
  function internalPrivateThing() {}
}

export function doNothingPrivateMethod() {
  /**
   * Internal private method does not have access defined.
   *
   */
  function somethingElse() {}
}

/**
 * This function declaration does not have access defined.
 *
 */
function somePublicFunction() {}

/**
 * This function expression does not have access defined.
 *
 */
anotherPublicFunction = function() {};

/**
 * This arrow function does not have access defined.
 *
 */
somePublicArrowFunction = () => {};

/**
 * This other arrow function does not have access defined.
 *
 */
anotherPublicArrowFunction(() => {});

/**
 * This class declaration does not have access defined.
 *
 */
class somePublicClass {};

/**
 * This class expression does not have access defined.
 *
 */
anotherPublicClass = class {};

export function doNothingPrivateMethod3() {
  /**
   * This internal arrow function does not have access defined.
   *
   */
  let somethingElse = () => {};
}