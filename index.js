require('dotenv').config();

const { McpServer } = require('@modelcontextprotocol/sdk/server/mcp.js');
const { z } = require('zod');
const axios = require('axios');

class WeatherService {
  constructor(apiKey = process.env.OPENWEATHER_API_KEY) {
    this.apiKey = apiKey;
  }

  async getWeather(city) {
    if (!this.apiKey) {
      throw new Error('OPENWEATHER_API_KEY environment variable is not set');
    }
    
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}&units=metric`
      );
      const data = response.data;
      return {
        content: [{
          type: 'text',
          text: JSON.stringify({
            city: data.name,
            temperature: data.main.temp,
            description: data.weather[0].description,
          }, null, 2),
        }],
      };
    } catch (error) {
      return {
        content: [{
          type: 'text',
          text: `Error: ${error.message}`,
        }],
        isError: true,
      };
    }
  }
}

function createServer() {
  const server = new McpServer({
    name: 'weather-server',
    version: '1.0.0',
  });

  const weatherService = new WeatherService();

  server.registerTool('getWeather', {
    description: 'Get current weather for a city',
    inputSchema: {
      city: z.string().describe('Name of the city'),
    },
  }, async ({ city }) => await weatherService.getWeather(city));

  return server;
}

// Only start the server if this file is run directly
if (require.main === module) {
  const server = createServer();
  const { StdioServerTransport } = require('@modelcontextprotocol/sdk/server/stdio.js');
  server.connect(new StdioServerTransport());
}

module.exports = { WeatherService, createServer };