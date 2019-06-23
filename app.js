const array = require('./array.json');

const groupBy = key => array =>
  array.reduce((objectsByKeyValue, obj) => {
    const value = obj[key];
    objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
    return objectsByKeyValue;
  }, {});

function foo() {
  const filteredArray = array.map(
    ({ data_type, regex_values, actions, uuid, name, label, ...keepAttrs }) =>
      keepAttrs
  );

  const groupedByGroupName = groupBy('group');
  const resultArray = groupedByGroupName(filteredArray);

  let outerPayload = {};

  for (const key in resultArray) {
    const innerPayload = {};

    if (resultArray.hasOwnProperty(key)) {
      const innerArray = resultArray[key];
      innerArray.forEach(innerElement => {
        Object.assign(innerPayload, {
          [innerElement.canonical_name]: innerElement.payload
        });
      });
    }

    Object.assign(outerPayload, {
      [key]: innerPayload
    });
  }

  console.log(outerPayload);
}

foo();
