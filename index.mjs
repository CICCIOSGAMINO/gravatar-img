// Gravatar URLs
const BASE_URL = 'www.gravatar.com/avatar'
const SECURE_URL = 'https://www.gravatar.com/avatar'

const opts = {}

/**
 * 
 * @param {string} email 
 * @returns {boolean} - true if email is valid, false otherwise
 */
const validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}

const setGravatarNull = () => {
  opts.size = undefined
  opts.rating = undefined
  opts.defaultImg = undefined
}

const setGravatarSize = (pixel) => {
  let pixelResult = 1
  if (!isNaN(pixel)) {

    if (pixel <= 1) {
      pixelResult = 1
    }

    if (pixel >= 2048) {
      pixelResult = 2048
    }

    opts.size = pixelResult

  } else {
    return new Error('@ARGUMENT >> Is not a number!')
  }

}

const setGravatarRating = (rates) => {

  if (typeof rates === 'string') {

    if (['g', 'pg', 'r', 'x'].indexOf(rates.toLowerCase()) >= 0) {
      opts.rating = rates
    } else {
      return new Error('@ARGUMENT >> Rates is not a valid value (p, pg, r, x) ')
    }

  } else {
      return new Error('@ARGUMENT >> Rates passed is not a string ')
  }

}

const setGravatarDefaultImg = (path) => {
  opts.defaultImg = path
}

const getGravatarOpts = () => {
  return opts
}

const buildParams = () => {
  let params = ''

  if (opts.size !== undefined) {
    params += `?s=${opts.size}`
  }

  if (opts.rating !== undefined) {
    params += `&r=${opts.rating}`
  }

  if (opts.rating !== undefined && opts.size !== undefined) {
    params += `&r=${opts.rating}`
  }

  if (opts.rating !== undefined && opts.size === undefined) {
    params += `?r=${opts.rating}`
  }

  if (
    opts.defaultImg !== undefined &&
    (opts.rating !== undefined || opts.size !== undefined)) {

      params += `&d=${opts.defaultImg}`

  }

  if (
    opts.defaultImg !== undefined &&
    (opts.rating === undefined && opts.size === undefined)) {

      params += `?d=${opts.defaultImg}`

  }

  return params
}


/**
 * @param {string} message - message to be digested with SHA-256
 * @return {Promise<string>}  - digest of the message with SHA-256
 */
const digestMessage = async (message) => {
  // encoded as UTF-8
  const encoder = new TextEncoder('utf-8')
  const data = encoder.encode(message)  
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)

  // convert buffer to byte array
  const hashArray = Array.from(new Uint8Array(hashBuffer))

  // convert to hex string
  const hashHex = hashArray
    .map(b => ('00' + b.toString(16))
    .slice(-2))
    .join('')

  return hashHex
}

const getGravatarHTTPS = async (email, opts = {}) => {
  const r = await getGravatarURL(email, opts)
  return r
}

const getGravatarURL = async (email, opts = {}) => {
  // trim leading and trailing whitespace from an email
  // address and force all characters to lower case
  const address = String(email).trim().toLowerCase()
  const validAddress = validateEmail(address)

  if (!validAddress) {
    console.log('@EMAIL >> Email is not valid (default gravatar)!')
  }

  const digest = await digestMessage(address)

  buildParams()

  return `${SECURE_URL}/${digest}${buildParams()}`
}

export {
  getGravatarURL,
  getGravatarHTTPS
}
