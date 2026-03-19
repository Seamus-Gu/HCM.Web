const authMockList = [
  {
    url: '/api/auth/v1/login',
    method: 'post',
    response: () => {
      return {
        code: 200,
        msg: 'success',
        data: {
          access_token:
            'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VyX2tleSI6ImZhOWZjMDU1LTI0OWEtNDVjOS04ZmY3LWE5ZGFjNzgzMjk3NCIsInVzZXJuYW1lIjoiYWRtaW4ifQ.pIVjjr1-SzyOaQyoLUZBsRloXrEuV5c0rrVVk8JnyJ9IKg29Mzj7_9JHHv6niPpWZzioDCYU5qKjUhGxywZ0qg',
          expires_in: 720
        }
      }
    }
  },
  {
    url: '/api/auth/v1/logout',
    method: 'delete',
    response: () => {
      return {
        code: 200,
        msg: 'success'
      }
    }
  }
]

export default authMockList
