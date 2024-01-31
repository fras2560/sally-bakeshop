/**
 * The baker model
 */
class Baker {
  /**
   * A model for the baker
   * @param {*} name - the name of baker
   * @param {*} capacity - the capacity of the baker in seconds
   */
  constructor(id, name, capacity) {
    this.id = id;
    this.name = name;
    this.capacity = capacity;
    this.orders = [];
  }

  /**
   * The bakers capacity for today.
   * @returns the capacity of the baker today
   */
  todayCapacity(){
    return this.orders.reduce((baker_capacity, order) => baker_capacity - order.duration, this.capacity);
  }

  /**
   * Whether the baker can take the given order
   * @param {*} order - the order being proposed to the baker
   * @returns {boolean} - true if they can process the order false otherwise
   */
  canTakeOrder(order) {
    return order.duration <= this.todayCapacity();
  }

  /**
   * Add the order to the baker list.
   * @param {*} order - the oder for the baker to take
   */
  addOrder(order) {
    console.log(order);
    console.log(this.todayCapacity());
    console.log(this.canTakeOrder(order));
    if(!this.canTakeOrder(order)) {
      throw new Error("Baker unable to take order");
    }
    this.orders.push(order);
  }

  clearOrders() {
    this.orders = [];
  }
  /**
   * Baker have order
   */

  haveOrder(order_id) {
    return this.orders.find((order) => order.id == order_id);
  }

  /**
   * Removes the order from the given baker
   * @param {number} order_id the id of the order to remove
   */
  removeOrder(order_id) {
    this.orders = this.orders.filter((o) => o.id != order_id);
    console.log(this.orders);
  }
}

module.exports = {
  Baker
}