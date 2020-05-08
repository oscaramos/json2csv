const json2csv = input => {
  if(!input || input==='{}')
    return '';
  const obj = JSON.parse(input);
  const keys = Object.keys(obj).join(',');
  const values = Object.values(obj).join(',');
  return `${keys}\n${values}`;
};

export default json2csv;