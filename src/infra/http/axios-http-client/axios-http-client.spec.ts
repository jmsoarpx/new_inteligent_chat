import { AxiosHttpClient } from "./axios-http-client"
import axios from 'axios'
 import {faker} from "@faker-js/faker";
import { HttpPostParams } from 'data/protocols/http';

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios> 
const mockedAxiosResult = {
  data: faker.helpers.arrayElement(),
  status: faker.datatype.number()
}
mockedAxios.post.mockResolvedValue(mockedAxiosResult)

const makeSUT = (): AxiosHttpClient => {
  return new AxiosHttpClient()
}

const mockPostRequest = (): HttpPostParams<any> => ({
  url: faker.internet.url(),
  body: faker.helpers.arrayElement()
})

describe('AxiosHttpClient', () => {
  test('Should call axios with correct values', async () => {
    const request = mockPostRequest()
    const sut = makeSUT()
    await sut.post(request)
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
  })

  test('Should return ther correct statusCode and body', async () => {
    const sut = makeSUT()
    const httpResponse = await sut.post(mockPostRequest())
    expect(httpResponse).toEqual({
      statusCode: mockedAxiosResult.status,
      body: mockedAxiosResult.data
    })
  })
})
