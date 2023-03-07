import * as api from './advanced/rust.js';
// import './utils/largeNumbers'
// import './utils/strictProperties'
// import './utils/typeInference'
// import './utils/redux/reducer'
// import './utils/stack'
// import './utils/generics'
// import './utils/currying'
// import './utils/otherImportantTypes'
// import './utils/fp'
// import './utils/transducers'
// import './utils/functions'

api.getValueAsync(Promise.resolve(0)).then(console.log);
