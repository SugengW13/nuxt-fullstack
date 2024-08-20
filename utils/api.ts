import type { H3Error } from 'h3'

interface RequestOption {
  queryParams?: Record<string, string> | undefined
  body?: Record<string, boolean | string | string[]> | FormData | undefined
  headers?: Record<string, string> | undefined
  isByte?: boolean | undefined
}

export const api = {
  provider: (
    url: string,
    option?: RequestOption
  ): { newUrl: string, newHeaders: Record<string, string> } => {
    const baseURL = useRuntimeConfig().public.API_BASE_URL

    const newUrl = option?.queryParams
      ? `${baseURL}${url}?${new URLSearchParams(option.queryParams)}`
      : `${baseURL}${url}`

    let newHeaders = { ...option?.headers }

    const { token } = useAuth()

    if (token.value) {
      newHeaders = {
        ...newHeaders,
        'Authorization': `${token.value}`
      }
    }

    if (!(option?.body instanceof FormData)) {
      newHeaders = {
        ...newHeaders,
        'Content-Type': option?.isByte ? 'application/octret-stream' : 'application/json'
      }
    }

    newHeaders = {
      ...newHeaders,
      'Accept': option?.isByte ? 'application/octret-stream' : 'application/json',
      'X-Timezone-Offset': new Date().getTimezoneOffset().toString()
    }

    return { newUrl, newHeaders }
  },

  afterResponse: async (response: Response, isByte: boolean) => {
    const data = isByte ? await response.blob() : await response.json()

    if (response.status >= 400) throw data

    return data
  },

  get: async (
    url: string,
    option?: RequestOption
  ) => {
    const { newUrl, newHeaders } = api.provider(url, { ...option })

    const response = await fetch(newUrl, {
      method: 'GET',
      headers: newHeaders
    })

    return await api.afterResponse(response, option?.isByte || false)
  },

  post: async (
    url: string,
    option: RequestOption
  ) => {
    const { newUrl, newHeaders } = api.provider(url, { ...option })

    const response = await fetch(newUrl, {
      method: 'POST',
      headers: newHeaders,
      body: option.body instanceof FormData ? option.body : JSON.stringify(option.body)
    })

    return await api.afterResponse(response, option?.isByte || false)
  },

  put: async (
    url: string,
    option: RequestOption
  ) => {
    const { newUrl, newHeaders } = api.provider(url, { ...option })

    const response = await fetch(newUrl, {
      method: 'PUT',
      headers: newHeaders,
      body: option.body instanceof FormData ? option.body : JSON.stringify(option.body)
    })

    return await api.afterResponse(response, option?.isByte || false)
  },

  delete: async (
    url: string,
    option: RequestOption
  ) => {
    const { newUrl, newHeaders } = api.provider(url, { ...option })

    const response = await fetch(newUrl, {
      method: 'DELETE',
      headers: newHeaders
    })

    return await api.afterResponse(response, option?.isByte || false)
  },
}