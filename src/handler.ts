import { serializeError } from 'serialize-error'
import { getSelectedHeadersKeys } from './config'
import getSelectedHeadersFromResponse from './getSelectedHeaders'
import { badRequest, serverError } from './standardResponses'

const jsonContentType = 'application/json'

export async function handleRequest(request: Request): Promise<Response> {
  try {
    return await _handleRequest(request)
  } catch (error) {
    console.error(serializeError(error))
    return serverError()
  }
}

/**
 * Main function that handles the requests to the Worker
 */
async function _handleRequest(request: Request): Promise<Response> {
  const parsedURL = new URL(request.url)
  const urlToQuery = parsedURL.searchParams.get('q')
  const ignoreCache = parsedURL.searchParams.get('ignoreCache') === 'true'

  if (urlToQuery) {
    const response = await (ignoreCache
      ? fetch(urlToQuery)
      : fetchUsingCache(urlToQuery))

    const selectedHeaders = getSelectedHeadersFromResponse(
      response.headers,
      getSelectedHeadersKeys(),
    )

    return new Response(JSON.stringify(selectedHeaders), {
      status: 200,

      headers: {
        'Content-Type': jsonContentType,
      },
    })
  }

  return badRequest()
}

/**
 * Uses the Cache API to fetch the given request
 */
async function fetchUsingCache(url: string) {
  const cache = caches.default
  const cachedResponse = await cache.match(url, { ignoreMethod: false })

  if (!cachedResponse) {
    const response = await fetch(url)
    await cache.put(url, response)
    return response
  }

  return cachedResponse
}
