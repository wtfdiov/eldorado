import i18n from 'i18n-js';

export default (address, truncate = 4) => {
  if (!address) {
    return `      ${i18n.t('common.anonymous')}      `;
  }
  try {
    return `${address.substring(0, truncate)}...${address.substring(
      address.length - truncate,
      address.length
    )}`;
  } catch {
    return address;
  }
};
