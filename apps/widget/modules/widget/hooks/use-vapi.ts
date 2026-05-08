import Vapi from "@vapi-ai/web";
import { useEffect, useState } from "react";

interface TranscriptMesage {
    role: "user" | "assistant";
    text: "string"
}

export const useVapi = () => {
    const [vapi, setVapi] = useState<Vapi | null>(null)
    const [isConnected, setIsConnected] = useState(false)
    const [isConnecting, setIsConnecting] = useState(false)
    const [isSpeaking, setIsSpeaking] = useState(false)
    const [transcript, setTranscript] = useState<TranscriptMesage[]>([])

    useEffect(() => {
        //Only for testing purposes
        const vapiInstance = new Vapi("74bdc9ff-ba50-40d8-a6d5-acb1b7859cec")
        setVapi(vapiInstance)

        vapiInstance.on("call-start", () => {
            setIsConnected(true)
            setIsConnecting(false)
            setTranscript([])
        })

        vapiInstance.on("call-end", () => {
            setIsConnected(false)
            setIsConnecting(false)
            setIsSpeaking(false)
        })

        vapiInstance.on("speech-start", () => {
            setIsSpeaking(true)
        })

        vapiInstance.on("speech-end", () => {
            setIsSpeaking(true)
        })

        vapiInstance.on("error", (error) => {
            console.log(error, "VAPI_ERROR");
            setIsConnecting(false)
        })

        vapiInstance.on("message", (message) => {
            if (message.type === "transcript" && message.transcriptType === "final") {
                setTranscript((prev) => [
                    ...prev,
                    {
                        role: message.role === "user" ? "user" : "assistant",
                        text: message.transcript
                    }
                ])
            }
            setIsConnecting(false)
        })

        return () => {
            vapiInstance?.stop();
        }
    }, [])

    const startCall = () => {
        setIsConnecting(true)

        if (vapi) {
            //Only for testing purposes
            vapi.start("6151e3c5-e681-411a-a659-0c5ae946065b")
        }
    }

    const endCall = () => {
        if (vapi) {
            vapi.stop()
        }
    }

    return {
        isSpeaking,
        isConnected,
        isConnecting,
        transcript,
        startCall,
        endCall
    }
}