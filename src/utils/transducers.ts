const victorianSlang = [
  {
    term: 'doing the bear',
    found: true,
    popularity: 108,
  },
  {
    term: 'katterzem',
    found: false,
    popularity: null,
  },
  {
    term: 'bone shaker',
    found: true,
    popularity: 609,
  },
  {
    term: 'smothering a parrot',
    found: false,
    popularity: null,
  },
  {
    term: 'damfino',
    found: true,
    popularity: 232,
  },
  {
    term: 'rain napper',
    found: false,
    popularity: null,
  },
  {
    term: 'donkey’s breakfast',
    found: true,
    popularity: 787,
  },
  {
    term: 'rational costume',
    found: true,
    popularity: 513,
  },
  {
    term: 'mind the grease',
    found: true,
    popularity: 154,
  },
]

function isFound(item) {
  return item.found
}

function getPopularity(item) {
  return item.popularity
}

function getTotalPopularity({ totalPopularity, itemCount }, currentVal) {
  return {
    totalPopularity: totalPopularity + currentVal,
    itemCount: itemCount + 1,
  }
}

function makeFilterTransducer(predicate) {
  return nextReducer => (acc, val) =>
    predicate(val) ? nextReducer(acc, val) : acc
}

function makeMapTransducer(mapper) {
  return nextReducer => (acc, val) => nextReducer(acc, mapper(val))
}

const foundFilterTransducer = makeFilterTransducer(isFound)
const scoreMappingTransducer = makeMapTransducer(getPopularity)

const allInOneReducer = foundFilterTransducer(
  scoreMappingTransducer(getTotalPopularity)
)

const initialInfo = { totalPopularity: 0, itemCount: 0 }
const { totalPopularity, itemCount } = victorianSlang.reduce(
  allInOneReducer,
  initialInfo
)

// this approach always creates intermediate data structures which is inefficient
// const { popularity, itemCount } = victorianSlang
//   .reduce(isFoundReducer, [])
//   .reduce(getPopularityReducer, [])
//   .reduce(getTotalPopularity, { popularity: 0, itemCount: 0 })

console.log(`Average: ${totalPopularity / itemCount}`)

export {}
