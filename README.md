# Weather MCP Server

A Model Context Protocol (MCP) server that provides weather information using the OpenWeatherMap API.

<a href="https://glama.ai/mcp/servers/@bensinclair/weather-mcp-server">
  <img width="380" height="200" src="https://glama.ai/mcp/servers/@bensinclair/weather-mcp-server/badge" alt="Weather Server MCP server" />
</a>

## Prerequisites

- Node.js (v14 or higher)
- npm
- OpenWeatherMap API key

## Setup

1. Clone or download this repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:
   ```bash
   touch .env
   ```

4. Add your OpenWeatherMap API key to the `.env` file:
   ```
   OPENWEATHER_API_KEY=your_openweathermap_api_key_here
   ```

   You can get a free API key from [OpenWeatherMap](https://openweathermap.org/api).

## Usage with Claude Code

Add this server to your MCP configuration file:

```json
{
  "weather": {
    "command": "node",
    "args": ["index.js"],
    "cwd": "/path/to/weather-mcp-server"
  }
}
```

## Available Tools

- `getWeather`: Get current weather information for any city

## Testing

Run the test suite:
```bash
npm test
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `OPENWEATHER_API_KEY` | Your OpenWeatherMap API key | Yes |

## Example Usage

Once configured with Claude Code, you can ask for weather information:
- "What's the weather in London?"
- "Get me the current weather in Tokyo"
- "How's the weather in New York?"