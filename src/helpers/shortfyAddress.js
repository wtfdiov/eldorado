export default (address, truncate = 4) => {
    if(!address) {
      return '      Anonymous      '
    }
    try {
      return `${address.substring(0, truncate)}...${address.substring(address.length - truncate, address.length)}`
    } catch {
      return address
    }
}