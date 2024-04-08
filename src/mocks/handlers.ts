import { http, graphql, HttpResponse } from 'msw';

const whiskeys = [
  {
      "id": "1",
      "title": "Jura",
      "price": "500",
      "summary": "Jura is a good whiskey",
      "percentage": "40%",
      "img": "https://bilder.vinmonopolet.no/cache/515x515-0/14676201-1.jpg",
      "volume": "70cl",
      "avgScore": "4",
      "ratings": [
        {
          "title": "Execellent whiskey",
          "score": "5",
          "body": "Nice whiskey! Absolutely lovely",
          "user": {"name": "Kaspar"}
        },
        {
          "title": "Among the better ones i've tasted",
          "score": "4",
          "body": "Quite good! Would buy again",
          "user": {"name":"Filip"}
        }
      ],
      "categories": [
        {
          "id": 1,
          "name": "Time Travel Capability",
          "avgScore": 2
        },
        {
          "id": 2,
          "name": "Conversation Starter Level",
          "avgScore": 2.5700000000000003
        }
      ]
  },
  {
      "id": "2",
      "title": "Tullamore Dew",
      "price": "512",
      "summary": "speaks for itself",
      "percentage": "43%",
      "img": "https://bilder.vinmonopolet.no/cache/515x515-0/5670501-1.jpg",
      "volume": "70cl",
      "avgScore": "4",
      "ratings": [
        {
          "title": "Execellent whiskey",
          "score": "5",
          "body": "Nice whiskey! Absolutely lovely",
          "user": {"name": "Kaspar"}
        },
        {
          "title": "Among the better ones i've tasted",
          "score": "4",
          "body": "Quite good! Would buy again",
          "user": {"name":"Filip"}
        }
      ],
      "categories": [
        {
          "name": "Time Travel Capability",
          "avgScore": 2
        },
        {
          "name": "Conversation Starter Level",
          "avgScore": 2.5700000000000003
        }
      ]
  },
  {
      "id": "3",
      "title": "Jameson",
      "price": "520",
      "summary": "Safe ol' reliable",
      "percentage": "41%",
      "img": "https://bilder.vinmonopolet.no/cache/515x515-0/16207-1.jpg",
      "volume": "75cl",
      "avgScore": "5",
      "ratings": [
        {
          "title": "Execellent whiskey",
          "score": "5",
          "body": "Nice whiskey! Absolutely lovely",
          "user": {"name": "Kaspar"}
        },
        {
          "title": "Among the better ones i've tasted",
          "score": "4",
          "body": "Quite good! Would buy again",
          "user": {"name":"Filip"}
        }
      ],
      "categories": [
        {
          "name": "Time Travel Capability",
          "avgScore": 2
        },
        {
          "name": "Conversation Starter Level",
          "avgScore": 2.5700000000000003
        }
      ]
  }
  ];

const attributes = [
  {
    "id": "1",
    "name": "Time Travel Capability"
  },
  {
    "id": "2",
    "name": "Conversation Starter Level"
  }
]

export const handlers = [
  http.post('*/login', ({ cookies }) => {
    return new HttpResponse(null, {
        headers: {'Set-Cookie': 'authToken=abc-123; httpOnly=true;',}
    })
  }),
  http.post('*/logout', ({ cookies }) => {
    return new HttpResponse(null, {
        headers: {'Set-Cookie': 'authToken=expired',}
    })
  }),
  http.post('*/register', ({ cookies }) => {
    return new HttpResponse(null, {
        headers: {'Set-Cookie': 'authToken=abc-123',}
    })
  }),
  graphql.mutation("EditUser", () => {
    return HttpResponse.json({
        data: {
            editUser: {
                id: 18021700,
                name: 'Anne Beate',
                email: 'AB@mail.no'
            }
        }
    })
  }),
  graphql.query("LoggedInUser", () => {
    return HttpResponse.json({
        data: {
            getLoggedInUser: {
                id: 18021700,
                name: 'Tor-Arne Larsen',
                img: null
            }
        }
    })
  }),
  graphql.query("LoggedInUserInfo", () => {
    return HttpResponse.json({
        data: {
            getLoggedInUser: {
                id: 18021700,
                name: 'Tor-Arne Larsen',
                img: null,
                email: 'tal@mail.no'
            }
        }
    })
  }),
  graphql.query("Whiskeys", () => {
    return HttpResponse.json({
      data: {
        getWhiskeys: whiskeys
    }
    })
  }),
  graphql.query("Whiskey", ({ variables }) => {
    const { id } = variables;
    return HttpResponse.json({
      data: {
        getWhiskey: whiskeys.find(w => w.id === id)
    }
    })
  }),
  graphql.query("Ratings", ({variables}) => {
    const { id } = variables;
    return HttpResponse.json({
      data: {
        getRatings: {
          
        }
      }
    }) 
  }),
  // This is to get the attributes, shown in the rating section.
  graphql.query("Attributes", () => {
    return HttpResponse.json({
      data: {
        getAttributeCategories: attributes
      }
    })
  })
];