class Shop {
  constructor(items = []) {
    this.items = items
  }

  getItems() {
    return this.items
  }

  updateQuality() {
    return this.items.map((item) => {
      const updateFunction = this.getUpdateFunction(item.name)
      return updateFunction(item)
    })
  }

  getUpdateFunction(itemName) {
    switch (itemName) {
      case 'Aged Brie':
        return this.updateAgedBrie
      case 'Backstage passes to a TAFKAL80ETC concert':
        return this.updateBackstagePasses
      case 'Sulfuras, Hand of Ragnaros':
        return this.updateSulfuras
      case 'Conjured':
        return this.updateConjuredItems
      default:
        return this.updateDefault
    }
  }

  updateSulfuras(item) {
    return item
  }

  updateConjuredItems(item) {
    item.sellIn = item.sellIn - 1
    let qualityToSubtract = 2

    if (item.sellIn < 0) {
      qualityToSubtract = 4
    }

    item.quality = item.quality - qualityToSubtract

    if (item.quality < 0) {
      item.quality = 0
    }

    return item
  }

  updateBackstagePasses(item) {
    item.sellIn = item.sellIn - 1

    if (item.sellIn < 0) {
      item.quality = 0
      return item
    }

    let qualityToAdd = 1

    if (item.sellIn <= 10) {
      qualityToAdd = 2
    } else if (item.sellIn <= 5) {
      qualityToAdd = 3
    }

    item.quality += qualityToAdd

    if (item.quality >= 50) {
      item.quality = 50
    }

    return item
  }

  updateDefault(item) {
    item.sellIn = item.sellIn - 1

    let qualityToSubtract = 1

    if (item.sellIn <= 0) {
      qualityToSubtract = 2
    }

    item.quality = item.quality - qualityToSubtract

    return item
  }

  updateAgedBrie(item) {
    item.sellIn = item.sellIn - 1
    let qualityToAdd = 1

    if (item.sellIn < 0) {
      qualityToAdd = 2
    }

    if (item.quality < 50) {
      item.quality += qualityToAdd
    }

    if (item.quality >= 50) {
      item.quality = 50
    }

    return item
  }
}

module.exports = Shop
