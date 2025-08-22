const markerIndent = (depth, spaces = 4) => ' '.repeat(depth * spaces - 2)

const blockClosingIndent = (depth, spaces = 4) => ' '.repeat((depth - 1) * spaces)

const stringify = (data, depth, spaces = 4) => {
  if (typeof data !== 'object' || data === null) return String(data)

  const innerIndent = ' '.repeat((depth + 1) * spaces)
  const closingIndent = ' '.repeat(depth * spaces)

  const lines = Object.entries(data).map(
    ([key, val]) => `${innerIndent}${key}: ${stringify(val, depth + 1, spaces)}`,
  )

  return `{\n${lines.join('\n')}\n${closingIndent}}`
}

const stylish = (tree, depth = 1, spaces = 4) => {
  const lines = tree.flatMap((node) => {
    const { key, type, value, oldValue, newValue, children } = node
    const ind = markerIndent(depth, spaces)

    switch (type) {
      case 'added':
        return `${ind}+ ${key}: ${stringify(value, depth, spaces)}`
      case 'removed':
        return `${ind}- ${key}: ${stringify(value, depth, spaces)}`
      case 'changed':
        return [
          `${ind}- ${key}: ${stringify(oldValue, depth, spaces)}`,
          `${ind}+ ${key}: ${stringify(newValue, depth, spaces)}`,
        ]
      case 'unchanged':
        return `${ind}  ${key}: ${stringify(value, depth, spaces)}`
      case 'nested':
        return `${ind}  ${key}: ${stylish(children, depth + 1, spaces)}`
      default:
        throw new Error(`Unknown type: ${type}`)
    }
  })

  return `{\n${lines.join('\n')}\n${blockClosingIndent(depth, spaces)}}`
}

export default stylish
