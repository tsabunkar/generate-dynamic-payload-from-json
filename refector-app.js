const array = require('./array.json');

// !Group Array of JavaScript Objects by Key value (property)
const groupElementsByProperty = key => array =>
  array.reduce((objectsByKeyValue, obj) => {
    const value = obj[key];
    objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
    return objectsByKeyValue;
  }, {});

// !Removing specific attribute for all objects in array
const deletePropertiesFromArray = array.map(
  ({ data_type, regex_values, actions, uuid, name, label, ...keepAttrs }) =>
    keepAttrs
);

// !Generate new object as per required structurer
function generateObjectStructure(object, property, value) {
  return Object.assign(object, {
    [property]: value
  });
}

function foo() {
  let outerPayload = {};
  const itemsGroupedByGroupPropetry = groupElementsByProperty('group');
  const groupedObject = itemsGroupedByGroupPropetry(deletePropertiesFromArray);
  //   const groupedObject = itemsGroupedByGroupPropetry(array);

  // !Iterating over an object, where key is 'group' property
  for (const key in groupedObject) {
    let innerPayload = {};

    if (groupedObject.hasOwnProperty(key)) {
      const innerArray = groupedObject[key];
      innerArray.forEach(innerElement => {
        generateObjectStructure(
          innerPayload,
          innerElement.canonical_name,
          innerElement.payload
        );
      });
    }
    generateObjectStructure(outerPayload, key, innerPayload);
  }
  return outerPayload;
}

console.log(foo());
