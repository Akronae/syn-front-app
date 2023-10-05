/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
const { template, types: t, traverse } = require('@babel/core')

const positionMethod = {
  start: 'unshiftContainer',
  end: 'pushContainer',
}

const addJSXAttribute = (_, opts) => {
  function getAttributeValue({ literal, value }) {
    if (typeof value === 'boolean') {
      return t.jsxExpressionContainer(t.booleanLiteral(value))
    }

    if (typeof value === 'number') {
      return t.jsxExpressionContainer(t.numericLiteral(value))
    }

    if (typeof value === 'string' && literal) {
      return t.jsxExpressionContainer(template.ast(value).expression)
    }

    if (typeof value === 'string') {
      return t.stringLiteral(value)
    }

    return null
  }

  function getAttribute({ spread, name, value, literal }) {
    if (spread) {
      return t.jsxSpreadAttribute(t.identifier(name))
    }

    return t.jsxAttribute(
      t.jsxIdentifier(name),
      getAttributeValue({ value, literal }),
    )
  }

  return {
    visitor: {
      Program(path) {
        path.addComment('leading', ' @ts-nocheck', true)
      },
      JSXOpeningElement(path) {
        if (!t.isJSXIdentifier(path.node.name)) return
        if (!opts.elements.includes(path.node.name.name)) return

        opts.attributes.forEach(
          ({
            name,
            value = null,
            spread = false,
            literal = false,
            position = 'end',
          }) => {
            const method = positionMethod[position]
            const attributes = path.get('attributes')

            const isEqualAttribute = (attribute) => {
              if (spread)
                return (
                  attribute.isJSXSpreadAttribute() &&
                  attribute.get('argument').isIdentifier({ name })
                )
              return (
                attribute.isJSXAttribute() &&
                attribute.get('name').isJSXIdentifier({ name })
              )
            }

            const replaced = attributes.some((attribute) => {
              if (!isEqualAttribute(attribute)) return false
              const newAttribute = getAttribute({
                spread,
                name,
                value:
                  typeof value === 'function'
                    ? value(attribute.get('value').node)
                    : value,
                literal,
              })

              attribute.replaceWith(newAttribute)
              return true
            })

            if (!replaced) {
              const newAttribute = getAttribute({
                spread,
                name,
                value: typeof value === 'function' ? value(null) : value,
                literal,
              })
              path[method]('attributes', newAttribute)
            }
          },
        )
      },
    },
  }
}

module.exports = addJSXAttribute
