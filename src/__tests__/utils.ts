export function benchmark (timeout, fn) {
  const timeoutAt = Date.now() + timeout
  let iterations = 0

  do {
    fn()
    ++iterations
  } while (Date.now() <= timeoutAt)

  return iterations
}

export function evaluateBenchmark (old, current, offset) {
  const percentDiff = Math.round(((current - old) / old) * 100)

  expect(percentDiff).toBeGreaterThan(offset)

  return percentDiff
}
