interface ISong {
  id: number
  name: string
  singer: string
  yearOfRelease: number
}

const songs: ISong[] = [
  {
    id: 1,
    name: 'Boulevard of Broken Dreams',
    singer: 'Green Day',
    yearOfRelease: 2003,
  },
  {
    id: 2,
    name: 'Numb',
    singer: 'Linkin Park',
    yearOfRelease: 2003,
  },
  {
    id: 3,
    name: 'Summer of 69',
    singer: 'Bryan Adams',
    yearOfRelease: 1984,
  },
  {
    id: 4,
    name: 'Country Roads',
    singer: 'John Denver',
    yearOfRelease: 1971,
  },
]

const getByParameter = <T, K extends keyof T>(
  array: T[],
  parameter: K,
  value: T[K]
) => {
  return array.find(song => song[parameter] === value)
}

console.log(getByParameter(songs, 'name', 'Numb'))

type Replace<T, K extends keyof T, Replacement> = Omit<T, K> &
  { [P in K]: Replacement }

type ISongNew = Replace<ISong, 'yearOfRelease', string>
const newSomgs: ISongNew[] = [
  {
    id: 1,
    name: 'Sham',
    singer: 'Amit Trivedi',
    yearOfRelease: '2010',
  },
]

console.log(getByParameter(newSomgs, 'name', 'Sham'))

export {}
