# Weather MCP Server

This is a Model Context Protocol (MCP) server that provides weather information using the OpenWeatherMap API.

## Configuration

To use this MCP server with Claude Code, add it to your MCP configuration:

```json
{
  "weather": {
    "command": "node",
    "args": ["index.js"],
    "cwd": "/Users/ben/Developer/weather-mcp-server"
  }
}
```

## Environment Variables

Create a `.env` file with:
```
OPENWEATHER_API_KEY=your_openweathermap_api_key_here
```

## Available Tools

- `getWeather`: Get current weather for a city

## Testing

Run tests with:
```bash
npm test
```