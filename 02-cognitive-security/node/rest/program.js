const { DefaultAzureCredential } = require('@azure/identity')
const { KeyClient } = require('@azure/keyvault-keys')
const { SecretClient } = require('@azure/keyvault-secrets')
const { TranslatorTextClient, AzureKeyCredential } = require('@azure/cognitiveservices-translatortext')


const dotenv = require('dotenv').config()
const program = async () => {
    const vaultName = 'cogsertutorial'
    const url = `https://${vaultName}.vault.azure.net`

    const credential = new DefaultAzureCredential()
    
    // const client = new KeyClient(url, credential)
    // console.log(client)

    const keyName = 'Cognitive-Services-Key'
    const secretClient = new SecretClient(url, credential)
    const secret = await secretClient.getSecret(keyName)
    console.log(secret)


    const translationClient = new TranslatorTextClient('https://api.cognitive.microsofttranslator.com/', AzureKeyCredential(secret.value))

    const result = await translationClient.translate(['Hello', 'World'], 'en', 'es')
    console.log(result[0].translations[0].text)
    // const result = await client.createKey('test-key', 'RSA')
    // console.log(result)
    
    //client.getKey('Cognitive-Services-Key').then(key => console.log(key))

    // for await (let keyProperties of client.listPropertiesOfKeys()) {
    //     console.log("Key properties: ", keyProperties);
    //   }

    // const key = await client.getKey(keyName)
    // console.log(key)
}

program()

