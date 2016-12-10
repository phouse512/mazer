### mazer

Esther's Christmas gift/birthday present. A maze and puzzle guided by sound.


#### Design

The biggest challenge is how to support levels, mazes and state.
Right now, the current and only map is stored in a Javascript object contains
map details, goal position and more. The simple solution would be to just
create multiple objects and stick them in an array, and as you finish one, you
move onto the next one. This would require a global state variable that tells
you which map you are currently on. Additionally you would need to have
a global state for the current user's position. For things like statistics on
how long it took to get somewhere, and move numbers, those would probably
require another global object to store it.

While this method is not the best and requires global state, I think this is
ok. The current approach already makes heavy use of global state, and because
its a relatively simple application it hasn't come back to bite me. We'll see
before it finishes, but I think this is the best approach for now.
