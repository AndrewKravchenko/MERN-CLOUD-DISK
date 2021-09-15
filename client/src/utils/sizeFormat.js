const sizeForGb = Math.pow(1024, 3)
const sizeForMb = Math.pow(1024, 2)

export default (size) => {
  if (size > sizeForGb) {
    return (size / sizeForGb).toFixed(1) + "Gb"
  }
  if (size > sizeForMb) {
    return (size / sizeForMb).toFixed(1) + "Mb"
  }
  if (size > 1024) {
    return (size / (1024)).toFixed(1) + "Kb"
  }
  return size + "B"
}
