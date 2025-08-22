function formatValue(value) {
  if (value === null) return 'null'
  if (typeof value === 'object') return '[complex value]'
  if (typeof value === 'string') return `'${value}'`
  return String(value)
};

function plain(tree, path = '') {
  const lines = tree
    .filter(node => node.type !== 'unchanged')
    .map((node) => {
      const property = path ? `${path}.${node.key}` : node.key
      switch (node.type) {
        case 'added':
          return `Property '${property}' was added with value: ${formatValue(node.value)}`
        case 'removed':
          return `Property '${property}' was removed`
        case 'changed':
          return `Property '${property}' was updated. From ${formatValue(node.oldValue)} to ${formatValue(node.newValue)}`
        case 'nested':
          return plain(node.children, property)
        default:
          throw new Error(`Unknown type: ${node.type}`)
      }
    })

  return lines.join('\n')
};

export default plain
