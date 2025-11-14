import { http, HttpResponse, delay } from 'msw'

export const createArticlesHandler = http.post('/api/articles', async () => {
  await delay(5000)

  return new HttpResponse(
    JSON.stringify({
      data: {
        id: 1,
        title: '37 Lessons From My 7 Years in Software Engineering',
        description:
          'Not here to preach about best practices or clean code at all.',
        thumbnail:
          'https://miro.medium.com/v2/resize:fit:1400/1*fEq6gwSt36V-ep0zkh09qw.jpeg',
        content: {
          type: 'doc',
          content: [
            {
              type: 'heading',
              attrs: { textAlign: null, level: 1 },
              content: [
                {
                  type: 'text',
                  marks: [{ type: 'bold' }],
                  text: '37 Lessons From My 7 Years in Software Engineering',
                },
              ],
            },
            {
              type: 'image',
              attrs: {
                src: 'https://miro.medium.com/v2/resize:fit:1400/1*fEq6gwSt36V-ep0zkh09qw.jpeg',
                alt: null,
                title: null,
                width: null,
                height: null,
              },
            },
            {
              type: 'heading',
              attrs: { textAlign: null, level: 3 },
              content: [
                {
                  type: 'text',
                  text: 'Not here to preach about best practices or clean code at all.',
                },
              ],
            },
          ],
        },
        author: {
          id: 1,
          name: 'Alice',
        },
        topics: [
          {
            id: 1,
            name: 'Software Development',
          },
        ],
        created_at: '2025-11-14T06:02:24.990Z',
        updated_at: '2025-11-14T06:02:24.990Z',
      },
      message: 'Create Article Successfully',
    })
  )
})
