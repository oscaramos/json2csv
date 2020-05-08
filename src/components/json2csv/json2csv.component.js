const json2csv = input => {
  try {
    if (!input || input === '{}')
      return '';
    const obj = JSON.parse(input);
    const keys = Object.keys(obj).join(',');
    const values = Object.values(obj).join(',');
    return `${keys}\n${values}`;
  } catch (e) {
    throw Error('Invalid JSON');
  }
};

export default json2csv;