const BasicFetch = async (url, fetchConfig = {}, contentTypeOverRide = null) => {
    if(!fetchConfig['headers']['Content-Type'] && !contentTypeOverRide){
        fetchConfig['headers']['Content-Type'] =  'application/json'
    }
    if(!fetchConfig['method']){
        fetchConfig['method'] = 'GET'
    }

    const response = await fetch(url, JSON.stringify(fetchConfig))
    const data = await response.json()
    return {response, data}
}

export default BasicFetch;