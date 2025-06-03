# Customer Service SaaS Platform

## Objective

The **Customer Service SaaS** platform empowers businesses to enhance their customer support capabilities by deploying an intelligent AI assistant that understands and adheres to each organization's unique business rules, guidelines, and values. This AI bot is designed to replicate the decision-making and communication behavior of a trained human support agent, offering consistent and scalable support.

Businesses benefit by:

- Reducing manual customer support effort and cost
- Scaling support operations with minimal infrastructure cost
- Enforcing policy-driven customer interactions
- Maintaining brand integrity and consistent tone with customers
- Supporting 24/7 customer interactions even in low-resource environments

### Implementation Advantages

- **Cognito** is used for user authentication, giving businesses secure, scalable identity management with minimal configuration. This ensures only verified users (i.e., organization members) can set or update business logic.
- **DynamoDB** stores company configurations (rules, guidelines, values) and chat histories with high throughput and low latency. Its NoSQL design enables horizontally scalable read/write capacity and multi-session history support.
- **Amazon Bedrock (Llama 3.3 7B Instruct)** provides a cheap, scalable LLM solution to serve as the AI engine. By enriching it with context (company rules and chat history), it mimics a true support agent’s behavior.

Cost-wise, this architecture is **nearly free for small-scale apps** and **cost-effective at scale** due to:
- Serverless compute with AWS Lambda
- Pay-per-use AI inference (no hourly hosting costs)
- Efficient read/write pricing with DynamoDB

---

## User Flow

### Organization Flow

1. **Sign in via Cognito**
2. **Submit company data** (business rules, values, guidelines) via a secure form
3. **Data is stored in DynamoDB**, indexed by the organization's email
4. The system auto-generates a business prompt used to configure the AI bot

### Customer Flow

1. **Customer visits the business website**
2. **Initiates a WebSocket connection** to the backend chat endpoint
3. **Customer asks a question** via `sendMessage` route
4. Backend:
   - Retrieves the appropriate company's rules from DynamoDB
   - Adds chat history as context
   - Sends input to LLM (Bedrock) for response generation
   - Returns the generated response over the WebSocket
5. **Chat history is saved**, allowing continuous conversation sessions

---

## Implementation

- **Frontend**: React with SCSS modules for a responsive and clean UI. Includes a form for business admins to define or update company behavior.
- **Backend**: Node.js Express server routes requests securely. AWS SDK manages interaction with Cognito and DynamoDB.
- **AI**: Amazon Bedrock running Meta’s Llama 3.3 7B Instruct model to generate responses based on:
  - Business rules
  - Chat history
  - Customer query

- **Data Structure (DynamoDB)**:
  - `companies` table stores `email` as primary key and company details
  - `chat_history` table uses `userId` as partition key and `connectionId` as sort key
  - Fast reads/writes with horizontal scalability

- **Authentication**:
  - Cognito manages secure login and logout
  - Sessions and user identity are handled through tokens in frontend/backend requests

- **WebSocket**: API Gateway facilitates real-time communication between customers and the AI assistant.
  - Chosen due to API Gateway’s lack of SSE support
  - Allows full-duplex messaging ideal for responsive support interactions

---

## Tech Stack

- **Frontend**: React, SCSS Modules
- **Backend**: Node.js, Express
- **Authentication**: AWS Cognito
- **Data Layer**: Amazon DynamoDB
- **AI Model**: Llama 3.3 7B Instruct via Amazon Bedrock
- **Communication**: API Gateway (WebSocket), AWS Lambda

---

## Possible Enhancements at Large-Scale

- Add OpenAI / Claude model fallback
- Use SSE or custom socket server for streaming support
- Enable organization analytics for conversation logs
- Add role-based access control for managing different types of business users

---

## License

This project is open for modification and non-commercial use. Contact the project maintainer for commercial licensing or deployment help.
