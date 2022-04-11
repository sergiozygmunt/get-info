import makeServiceWorkerEnv from 'service-worker-mock'
import getSelectedHeadersFromResponse, {
  HeadersMap,
} from '../src/getSelectedHeaders'

interface TestCase {
  name: string
  input: [{ [key: string]: string }, string[]]
  expected: HeadersMap
}

const sampleResponseHeaders = {
  age: '39722',
  'cache-control': 'max-age=86400, public',
  'content-encoding': 'br',
  'content-security-policy':
    "default-src 'self'; script-src 'report-sample' 'self' *.speedcurve.com 'sha256-q7cJjDqNO2e1L5UltvJ1LhvnYN7yJXgGO7b6h9xkL1o=' www.google-analytics.com/analytics.js 'sha256-JEt9Nmc3BP88wxuTZm9aKNu87vEgGmKW1zzy/vb1KPs=' polyfill.io/v3/polyfill.min.js assets.codepen.io production-assets.codepen.io 'sha256-CUy3BwqnmCSHS96nUyHoUsOB3r+s10eRpf5GbZdZqgk='; script-src-elem 'report-sample' 'self' *.speedcurve.com 'sha256-q7cJjDqNO2e1L5UltvJ1LhvnYN7yJXgGO7b6h9xkL1o=' www.google-analytics.com/analytics.js 'sha256-JEt9Nmc3BP88wxuTZm9aKNu87vEgGmKW1zzy/vb1KPs=' polyfill.io/v3/polyfill.min.js assets.codepen.io production-assets.codepen.io 'sha256-CUy3BwqnmCSHS96nUyHoUsOB3r+s10eRpf5GbZdZqgk='; style-src 'report-sample' 'self' 'unsafe-inline'; object-src 'none'; base-uri 'self'; connect-src 'self' updates.developer.allizom.org updates.developer.mozilla.org www.google-analytics.com stats.g.doubleclick.net; font-src 'self'; frame-src 'self' interactive-examples.mdn.mozilla.net interactive-examples.prod.mdn.mozilla.net interactive-examples.stage.mdn.mozilla.net mdn.github.io yari-demos.prod.mdn.mozit.cloud mdn.mozillademos.org yari-demos.stage.mdn.mozit.cloud jsfiddle.net www.youtube-nocookie.com codepen.io; img-src 'self' *.githubusercontent.com *.googleusercontent.com mozillausercontent.com firefoxusercontent.com profile.stage.mozaws.net profile.accounts.firefox.com lux.speedcurve.com mdn.mozillademos.org media.prod.mdn.mozit.cloud media.stage.mdn.mozit.cloud interactive-examples.mdn.mozilla.net interactive-examples.prod.mdn.mozilla.net interactive-examples.stage.mdn.mozilla.net wikipedia.org www.google-analytics.com www.gstatic.com; manifest-src 'self'; media-src 'self' archive.org videos.cdn.mozilla.net; child-src 'self'; worker-src 'self';",
  'content-type': 'text/html; charset=utf-8',
  date: 'Sun, 10 Apr 2022 06:27:40 GMT',
  etag: 'W/"9a006068fd171896bdc5eedad718d982"',
  'last-modified': 'Sun, 10 Apr 2022 01:10:06 GMT',
  server: 'AmazonS3',
  vary: 'Accept-Encoding',
  via: '1.1 001e0031af38ee022d390738c4e5f862.cloudfront.net (CloudFront)',
  'x-amz-cf-id': 'd6xgPMxrAcSuXmwTfrIM-TBnPix6BYi97-_-tAIGPmmz6ZG_JfgY1A==',
  'x-amz-cf-pop': 'MRS52-C2',
  'x-cache': 'Hit from cloudfront',
  'x-content-type-options': 'nosniff',
  'x-frame-options': 'DENY',
  'x-xss-protection': '1; mode=block',
}

describe('getSelectedHeaders', () => {
  const testCases: TestCase[] = [
    {
      name: 'Only specified headers are returned',

      input: [sampleResponseHeaders, ['server', 'vary', 'x-cache']],

      expected: {
        server: 'AmazonS3',
        vary: 'Accept-Encoding',
        'x-cache': 'Hit from cloudfront',
      },
    },

    {
      name: 'Specified headers are case-sensitive',

      input: [sampleResponseHeaders, ['server', 'vary', 'X-cache']],

      expected: {
        server: 'AmazonS3',
        vary: 'Accept-Encoding',
      },
    },

    {
      name: 'Missing headers are not returned',

      input: [sampleResponseHeaders, ['server', 'vary', 'foo']],

      expected: {
        server: 'AmazonS3',
        vary: 'Accept-Encoding',
      },
    },

    {
      name: 'Empty response headers return empty object',
      input: [{}, ['server', 'vary']],
      expected: {},
    },
  ]

  describe('Test Cases', () => {
    beforeEach(() => {
      Object.assign(globalThis, makeServiceWorkerEnv())
      jest.resetModules()
    })

    for (const testCase of testCases) {
      test(testCase.name, () => {
        const response = new Response('', { headers: testCase.input[0] })
        const headers = getSelectedHeadersFromResponse(
          response.headers,
          testCase.input[1],
        )
        expect(headers).toMatchObject(testCase.expected)
      })
    }
  })
})
