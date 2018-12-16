import { Buffer } from 'buffer';

export const stringToHex = (string) => {
  if (string) {
    return Buffer.from(string.substring(0, 32).padEnd(32, ' '), 'utf8').toString('hex');
  } else {
    return ''
  }
}

export const stringFromHex = (data) => {
  if (data) {
    return Buffer.from(data, 'hex').toString();
  } else {
    return ''
  }
}