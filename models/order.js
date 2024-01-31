/**
 * The order model
 */
class Order {
  /**
   * A model for a given order
   * @param {string} name - the name of the order
   * @param {number} duration - the duration of the baker in seconds
   * @param {date} date - the date of the order
   */
  constructor(id, name, duration, date) {
    this.id = id;
    this.name = name;
    this.duration = duration;
    this.date = date;
  }
}

module.exports = {
  Order
};