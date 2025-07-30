const axios = require('axios');
const { WeatherService, createServer } = require('./index');

jest.mock('axios');
jest.mock('dotenv', () => ({ config: jest.fn() }));

const mockedAxios = axios;

describe('WeatherService', () => {
  let weatherService;

  beforeEach(() => {
    jest.clearAllMocks();
    weatherService = new WeatherService('test-api-key');
  });

  describe('getWeather', () => {
    test('should successfully fetch weather data', async () => {
      const mockWeatherData = {
        name: 'London',
        main: { temp: 15.5 },
        weather: [{ description: 'clear sky' }]
      };

      mockedAxios.get.mockResolvedValue({ data: mockWeatherData });

      const result = await weatherService.getWeather('London');

      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://api.openweathermap.org/data/2.5/weather?q=London&appid=test-api-key&units=metric'
      );

      expect(result).toEqual({
        content: [{
          type: 'text',
          text: JSON.stringify({
            city: 'London',
            temperature: 15.5,
            description: 'clear sky'
          }, null, 2)
        }]
      });
    });

    test('should handle API errors gracefully', async () => {
      mockedAxios.get.mockRejectedValue(new Error('City not found'));

      const result = await weatherService.getWeather('InvalidCity');

      expect(result).toEqual({
        content: [{
          type: 'text',
          text: 'Error: City not found'
        }],
        isError: true
      });
    });

    test('should handle network errors', async () => {
      mockedAxios.get.mockRejectedValue(new Error('Network Error'));

      const result = await weatherService.getWeather('London');

      expect(result).toEqual({
        content: [{
          type: 'text',
          text: 'Error: Network Error'
        }],
        isError: true
      });
    });

    test('should throw error when API key is missing', async () => {
      const serviceWithoutKey = new WeatherService();

      await expect(serviceWithoutKey.getWeather('London')).rejects.toThrow(
        'OPENWEATHER_API_KEY environment variable is not set'
      );
    });

    test('should handle axios response errors with proper message', async () => {
      const axiosError = {
        message: 'Request failed with status code 404',
        response: {
          status: 404,
          data: { message: 'city not found' }
        }
      };
      
      mockedAxios.get.mockRejectedValue(axiosError);

      const result = await weatherService.getWeather('NonExistentCity');

      expect(result).toEqual({
        content: [{
          type: 'text',
          text: 'Error: Request failed with status code 404'
        }],
        isError: true
      });
    });
  });
});

describe('createServer integration', () => {
  test('should return a server instance with registered tool', () => {
    const server = createServer();
    
    expect(server).toBeDefined();
    expect(typeof server.connect).toBe('function');
  });
});