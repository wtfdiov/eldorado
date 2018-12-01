export default (address, cNum = 4) => {
    if(!address) {
      return '      Anonymous      '
    }
    try {
      return `${address.substring(0, cNum)}...${address.substring(address.length - cNum, address.length)}`
    } catch {
      return address
    }
}