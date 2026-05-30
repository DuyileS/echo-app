import { groq } from '@ai-sdk/groq';
import { Agent } from "@convex-dev/agent";
import { components } from "../../../_generated/api";

 export const supportAgent = new Agent(components.agent, {
  chat: groq("meta-llama/llama-4-scout-17b-16e-instruct"),
  instructions: "You are a customer support agent"
});