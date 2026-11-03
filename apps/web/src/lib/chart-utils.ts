const hoursMapping = [
  '12 am', // 0
  '1 am', // 1
  '2 am', // 2
  '3 am', // 3
  '4 am', // 4
  '5 am', // 5
  '6 am', // 6
  '7 am', // 7
  '8 am', // 8
  '9 am', // 9
  '10 am', // 10
  '11 am', // 11
  '12 pm', // 12
  '1 pm', // 13
  '2 pm', // 14
  '3 pm', // 15
  '4 pm', // 16
  '5 pm', // 17
  '6 pm', // 18
  '7 pm', // 19
  '8 pm', // 20
  '9 pm', // 21
  '10 pm', // 22
  '11 pm', // 23
  '12 am', // 24 (end of day/start of next)
]

export const getChartsHours = ({
  currentHour,
  totalDuration = 24,
  numberOfValues = 6,
}: {
  currentHour: number
  totalDuration?: number
  numberOfValues?: number
}) => {
  const interval = totalDuration / numberOfValues
  const hours: string[] = []
  for (let i = 0; i < numberOfValues; i++) {
    let hour = currentHour - interval * i
    if (hour < 0) {
      hour += 24
    }
    hours.push(hoursMapping[hour]!)
  }
  return hours
}

export const hoursToMs = (hours: number) => {
  return hours * 60 * 60 * 1000
}
