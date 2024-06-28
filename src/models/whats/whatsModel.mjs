import { sendMessage } from "../../app.mjs"

class whatsModel {
    static enviaWhats = async (num, msg, callback) => {
        try {
            const results = await sendMessage(num, msg)
            callback(null, results)
        } catch (error) {
            callback(error, null)
        }
    }
}

export default whatsModel