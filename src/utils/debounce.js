export function debounce(fn, delay = 400) {
  let timer = null

  const debounced = (...args) => {
    if (timer) clearTimeout(timer)

    return new Promise((resolve, reject) => {
      timer = setTimeout(async () => {
        try {
          const result = await fn(...args)
          resolve(result)
        } catch (err) {
          reject(err)
        } finally {
          timer = null
        }
      }, delay)
    })
  }

  debounced.cancel = () => {
    if (timer) clearTimeout(timer)
    timer = null
  }

  return debounced
}
