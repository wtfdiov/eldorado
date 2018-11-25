export default (address) => {
    try {
      return `${address.substring(0, 15)}...${address.substring(address.length - 15, address.length)}`
    } catch {
      return address
    }
}