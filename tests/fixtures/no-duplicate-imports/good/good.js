import { baz, foo } from 'a';
import { bar } from 'b';

export let a = foo(bar, baz);

// We can reexport normally
export { wadus } from 'a';

