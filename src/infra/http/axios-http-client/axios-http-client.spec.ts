import { AxiosHttpClient } from "./axios-http-client"
import axios from 'axios'
import { mockAxios } from '@/infra/test';
import { mockPostRequest } from "@/data/test";

jest.mock('axios')

type SutTypes = {
  sut: AxiosHttpClient
  mockedAxios: jest.Mocked<typeof axios>
}

const makeSUT = (): SutTypes => {
  const sut = new AxiosHttpClient()
  const mockedAxios = mockAxios()
  return {
    sut,
    mockedAxios
  }
}


describe('AxiosHttpClient', () => {
  test('Should call axios with correct values', async () => {
    const request = mockPostRequest()
    const {sut, mockedAxios} = makeSUT()
    await sut.post(request)
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
  })

  test('Should return ther correct statusCode and body', async () => {
    const {sut, mockedAxios} = makeSUT()
    const promise =  sut.post(mockPostRequest())
    expect(promise).toEqual(mockedAxios.post.mock.results[0].value)
  })
})
