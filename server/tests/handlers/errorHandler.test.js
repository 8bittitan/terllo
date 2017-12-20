import errorResponseHandler from '../../handlers/error'

describe('Error response handler', () => {
  let response
  const res = {
    status: jest.fn().mockReturnValue({
      json: jest.fn(),
    }),
  }

  beforeEach(() => {
    response = errorResponseHandler({
      res,
    })(402, 'This is a test message')
  })

  it('Should call status method', () => {
    expect(res.status).toHaveBeenCalled()
  })

  it('Should call json method', () => {
    expect(res.status().json).toHaveBeenCalled()
  })
})
