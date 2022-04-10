/**
 * Simple 404 response
 */
export function notFound() {
  return new Response(undefined, { status: 404 })
}


/**
 * Simple 500 response
 */
export function serverError () {
  return new Response(undefined, { status: 500 })
}

/**
 * Simple 400 resposne
 */
export function badRequest () {
  return new Response(undefined, { status: 400 })
}
