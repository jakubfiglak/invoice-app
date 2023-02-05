const generateGraphiQLHeader = () => {
  return JSON.stringify(
    {
      'auth-provider': 'dbAuth',
      cookie:
        'session=U2FsdGVkX1+XjpWZvrrxEyBaVNMlEiOy4hVs6aeaksat+b4QKxBiNjDDYPNe1qil4wYouz6hXLBpVsWrxNH6LrT/oEWc7gyUzeiCI0kV7uEh7zB/w1sPuquUYJrNrW3E',
      authorization: 'Bearer cldrg2him0000243m9tlsv0pw',
    },
    null,
    2
  )
}

console.log(generateGraphiQLHeader())

export default generateGraphiQLHeader
