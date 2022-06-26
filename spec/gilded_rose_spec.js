const Shop = require('../src/shop.js')
const Item = require('../src/item.js')

describe('gilded rose', () => {
  it('should update the quality of items', () => {
    const items = [
      new Item('+5 Dexterity Vest', 10, 20),
      new Item('Aged Brie', 2, 0),
      new Item('Elixir of the Mongoose', 5, 7),
      new Item('Sulfuras, Hand of Ragnaros', 0, 80),
      new Item('Sulfuras, Hand of Ragnaros', -1, 80),
      new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20),
      new Item('Backstage passes to a TAFKAL80ETC concert', 10, 49),
      new Item('Backstage passes to a TAFKAL80ETC concert', 5, 49),
      new Item('Conjured', 3, 6)
    ]

    const shop = new Shop(items)
    shop.updateQuality()
    expect(items[0].quality).toBe(19)
    expect(items[1].quality).toBe(1)
    expect(items[2].quality).toBe(6)
    expect(items[3].quality).toBe(80)
    expect(items[4].quality).toBe(80)
    expect(items[5].quality).toBe(21)
    expect(items[6].quality).toBe(50)
    expect(items[7].quality).toBe(50)
    expect(items[8].quality).toBe(4)
  })

  it('legendary item update correctly', () => {
    const items = [new Item('Sulfuras, Hand of Ragnaros', 100, 30)]

    const shop = new Shop(items)

    for (let i = 0; i < 50; i++) {
      shop.updateQuality()
    }

    expect(items[0].quality).toBe(30)
    expect(items[0].sellIn).toBe(100)
  })

  it('regular items update correctly', () => {
    const items = [
      new Item('+5 Dexterity Vest', 10, 20),
      new Item('Some random item', 15, 25)
    ]

    const shop = new Shop(items)

    for (let i = 0; i < 5; i++) {
      shop.updateQuality()
    }

    expect(items[0].quality).toBe(15)
    expect(items[0].sellIn).toBe(5)
    expect(items[1].quality).toBe(20)
    expect(items[1].sellIn).toBe(10)
  })

  it('conjured items update correctly', () => {
    const items = [new Item('Conjured', 5, 10)]

    const shop = new Shop(items)

    for (let i = 0; i < 3; i++) {
      shop.updateQuality()
    }

    expect(items[0].quality).toBe(4)
    expect(items[0].sellIn).toBe(2)
  })

  it('aged breie update correctly', () => {
    const items = [new Item('Aged Brie', 5, 0)]

    const shop = new Shop(items)

    for (let i = 0; i < 5; i++) {
      shop.updateQuality()
    }

    expect(items[0].quality).toBe(5)
    expect(items[0].sellIn).toBe(0)

    for (let i = 0; i < 5; i++) {
      shop.updateQuality()
    }

    expect(items[0].quality).toBe(15)
    expect(items[0].sellIn).toBe(-5)
  })

  it('backstage passes update correctly', () => {
    const items = [new Item('Backstage passes to a TAFKAL80ETC concert', 15, 0)]

    const shop = new Shop(items)
    for (let i = 0; i < 5; i++) {
      shop.updateQuality()
    }

    expect(items[0].quality).toBe(6)
    expect(items[0].sellIn).toBe(10)

    for (let i = 0; i < 5; i++) {
      shop.updateQuality()
    }

    expect(items[0].quality).toBe(16)
    expect(items[0].sellIn).toBe(5)

    for (let i = 0; i < 5; i++) {
      shop.updateQuality()
    }

    expect(items[0].quality).toBe(26)
    expect(items[0].sellIn).toBe(0)

    shop.updateQuality()

    expect(items[0].quality).toBe(0)
    expect(items[0].sellIn).toBe(-1)
  })
})
