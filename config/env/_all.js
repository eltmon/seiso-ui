
var path = require('path');

module.exports = {
  applicationName: 'seiso-ui',
  accessLog: {
    fileSize: '1m',
    keep: 10,
    compress: true
  },
  auth: {
    // passport-saml configuration
    secured: (process.env.NODE_ENV === 'dev' ? false : true),
    strategy: 'saml',
    acceptableClockSkewInMs: 360000,
    callbackProtocol: 'https',
    identityProvider: {
      name: "exp-adfs",
      identity: "http://sso.expedia.biz/adfs/services/trust",
      spInitiatedUrl: "https://sso.expedia.biz/adfs/ls/",
      signingCert: "MIIFFzCCA/+gAwIBAgIETCPgRjANBgkqhkiG9w0BAQUFADCBsTELMAkGA1UEBhMCVVMxFjAUBgNVBAoTDUVudHJ1c3QsIEluYy4xOTA3BgNVBAsTMHd3dy5lbnRydXN0Lm5ldC9ycGEgaXMgaW5jb3Jwb3JhdGVkIGJ5IHJlZmVyZW5jZTEfMB0GA1UECxMWKGMpIDIwMDkgRW50cnVzdCwgSW5jLjEuMCwGA1UEAxMlRW50cnVzdCBDZXJ0aWZpY2F0aW9uIEF1dGhvcml0eSAtIEwxQzAeFw0xNDA4MTIxODE5MTJaFw0xODEwMTMwMjI0MTlaMGcxCzAJBgNVBAYTAlVTMRMwEQYDVQQIEwpXYXNoaW5ndG9uMREwDwYDVQQHEwhCZWxsZXZ1ZTEWMBQGA1UEChMNRXhwZWRpYSwgSW5jLjEYMBYGA1UEAxMPc3NvLmV4cGVkaWEuYml6MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAz2nGjBS3eZkuPHyjIFsMT8Ex19ywmOUXxDI051/ZVFcCmbNFlKJrfbhxO0PpX1mOv3REC0SC22bwdQGDH35JVSmPq7NR52S0Q/RwVDUb9mXs86d6q/BACm5KfHavsXXbMKrCQSQzHBeMoMS6cQIvUgtmvfjnpJ6tYp+OF2MK6sa568cy34C3m63O66Kt/tFOZwGg8qmJCXdEpCtHR3TEiqmtoHc/A4XbhSg9BR/6+Z8kZb8T7AeKh69BPy5U7SuaW0ifOpS4TigONkqn3vPQkxjtosYL3X0/+WBaHDbA642H4wMBa9cWrMBp6u9u2NBulK82HVrdJB6iC8rZLsD7twIDAQABo4IBfjCCAXowCwYDVR0PBAQDAgWgMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAzBgNVHR8ELDAqMCigJqAkhiJodHRwOi8vY3JsLmVudHJ1c3QubmV0L2xldmVsMWMuY3JsMGQGCCsGAQUFBwEBBFgwVjAjBggrBgEFBQcwAYYXaHR0cDovL29jc3AuZW50cnVzdC5uZXQwLwYIKwYBBQUHMAKGI2h0dHA6Ly9haWEuZW50cnVzdC5uZXQvMjA0OC1sMWMuY2VyMEoGA1UdIARDMEEwNQYJKoZIhvZ9B0sCMCgwJgYIKwYBBQUHAgEWGmh0dHA6Ly93d3cuZW50cnVzdC5uZXQvcnBhMAgGBmeBDAECAjAaBgNVHREEEzARgg9zc28uZXhwZWRpYS5iaXowHwYDVR0jBBgwFoAUHvGriQb4SQ8BM3fuFHruGXyTKE0wHQYDVR0OBBYEFDsc7/1fpNaaFgJ1jKZfWmBD9WJ4MAkGA1UdEwQCMAAwDQYJKoZIhvcNAQEFBQADggEBAH97BdZzQIHGzyONbs1uLw71HJhWp3PtubbJ4aBRtmfopgJV/X/u4MfkKO8MokDY/oqN+PQLc0NwT6hfSWiclpOjWSW3u35IFQZTU+stT41/T41gvRHmnfCL3QuB+qNeQdWiDtWKAsJUUlx1Qn90BC23fbyiJptbppP3MDLbbf09grfifW0tJ4ThYOv4JkC/W3rtCiu6XryUWtFtz+RtwWtlSL5dxJnEE7VDvUcOSC+6dywb4dO/bSfYA1/gdbWXImsU+4124eC4DztWChDIMqCVqQObkNYdb9MsRr7itC+ezXVorKXzWhwG2FlNV8TjcCRgTKgdVFyw9+KMPXzFX+Q="
    },
    serviceProvider: {
      name: "seiso-ui",
      identity: "seiso-ui-sandbox",
      desiredSubjectFormat: "urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified"
    }
  },
  hostingEnvironment: 'http',
  sessionSecret: "Our light induced][image of77truth.",
  client: {
    // Used for both server public directory and gulp build output directory.
    publicDir: path.resolve(__dirname + '/../../static')
  },
  externalApis: {
    eos: []
  }
};