export type HeadersMap = {[key: string]: string | undefined}

/**
 * Gets the selected headers from the response
 */
export default function getSelectedHeadersFromResponse(headers: Headers, selectedHeaders: string[]) {
    return selectedHeaders.reduce<HeadersMap>((acc, headerKey) => {
        const value = headers.get(headerKey)


        // Header is in the response
        if (typeof value === 'string') {
            acc[headerKey] = value
        }

        return acc
    }, {})
}



