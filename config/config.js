
module.exports = {
  instances: [
    {
      name: 'Sandbox',
      href: 'https://thisappsandbox.test.example.com'   
    },
    {
      name: 'Test',
      href: 'https://thisapp.test.example.com'   
    },
    {
      name: 'Prod',
      href: 'https://thisapp.prod.example.com'
    }
  ],
  current_instance: 'Sandbox',
  apis: {
    seiso: 'http://localhost:8080',
    eos: 'http://eos-api.com'
  }
};
