export function extractStyled(component: any) {
  const rules = component.inlineStyle.rules
  const extracted: Record<string, string | Function> = {}

  for (let rule of rules) {
    if (typeof rule === 'string')
      rule = rule.trim();

    if (typeof rule === 'string') {
      while (rule.includes(':')) {
        let [key, value] = rule.split(':')
        value = value.substring(0, value.indexOf(';') + 1).trim()

        extracted[key] = value
        rule = rule.substring(rule.indexOf(value) + value.length)
      }
    }
    console.log(rule, extracted)
  }

  return extracted
}