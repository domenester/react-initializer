import { RequestServiceProvider, useRequestServiceValue } from '../request.service';
import { renderHook } from '@testing-library/react-hooks';

describe('Request Service Testes', () => {
  const { result: { current } } = renderHook(
    () => useRequestServiceValue(),
    { wrapper: RequestServiceProvider }
  );

  it('should GET', async () => {
    const { get } = current
    get('/unkown')
      .catch( (error: any) => {
        expect(error.response.data.error).toBe('Not Found')
      })
  })

  it('should POST', async () => {
    const { post } = current
    post('/unkown')
      .catch( (error: any) => {
        expect(error.response.data.error).toBe('Not Found')
      })
  })

  it('should PUT', async () => {
    const { put } = current
    put('/unkown')
      .catch( (error: any) => {
        expect(error.response.data.error).toBe('Not Found')
      })
  })

  it('should DELETE', async () => {
    const { del } = current
    del('/unkown')
      .catch( (error: any) => {
        expect(error.response.data.error).toBe('Not Found')
      })
  })

})
