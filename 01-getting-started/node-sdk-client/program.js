import 'dotenv/config'
import promptSync from 'prompt-sync'
import { TextAnalysisClient, AzureKeyCredential } from '@azure/ai-language-text'


const client = new TextAnalysisClient(process.env.AZURE_COGNITIVE_SERVICES_ENDPOINT, new AzureKeyCredential(process.env.AZURE_COGNITIVE_SERVICES_KEY))

const getLanguages = async text => {
    const result = await client.analyze('LanguageDetection', [text])
    console.log(result[0]?.primaryLanguage?.name)
}

const runProgram = async () => {
    const prompt = promptSync()
    let input = ''
    //while (input !== 'exit') {
        input = prompt('Enter some text (Type "exit" to quit): ')
        getLanguages(input)
    //}
}
 runProgram()