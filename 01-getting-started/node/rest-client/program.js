import 'dotenv/config'
import fetch from 'node-fetch'
import promptSync from 'prompt-sync'

const getLanguages = async text => {
    console.log('Determining language...')
    const headers = {
        'Ocp-Apim-Subscription-Key': process.env.NODE_COGNITIVE_SERVICES_KEY
    }

    const body = 
    {
        "kind": "LanguageDetection",
        "parameters": {
            "modelVersion": "latest"
        },
        "analysisInput":{
            "documents":[
                {
                    "id":"1",
                    text
                }
            ]
        }
    }
    const response = await fetch(process.env.NODE_COGNITIVE_SERVICES_ENDPOINT, {
        method: 'POST',
        body, 
        headers,
    })
    console.log(response)
}

const getStuffs = async () => {
    const prompt = promptSync()
    let input = ''
    //while (input !== 'exit') {
        input = prompt('Enter some text (Type "exit" to quit): ')
        getLanguages(input)
    //}
}
 getStuffs()
