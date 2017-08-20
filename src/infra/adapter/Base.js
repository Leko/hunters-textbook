// @flow

export default class Base {
  async get(key) {
    throw new Error('Must be implemented')
  }

  async set(key, value) {
    let attr = key
    if (typeof key === 'string') {
      attr = { [key]: value }
    }

    return this.setInBatch(attr)
  }

  async setInBatch(attr: { [string]: any }) {
    throw new Error('Must be implemented')
  }
}
