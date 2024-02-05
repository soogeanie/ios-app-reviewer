import { getPastDateTime } from '../../helpers'
import { fetchReviews, isWithinHourLimit } from '../helpers'

const MOCK_DATA = [
  {
    "author": {
      "uri": {
        "label": "https://itunes.apple.com/us/reviews/id1618815968"
      },
      "name": {
        "label": "4ubr3"
      },
      "label": ""
    },
    "updated": {
      "label": "2024-02-03T08:17:25-07:00"
    },
    "im:rating": {
      "label": "1"
    },
    "im:version": {
      "label": "33.2.1"
    },
    "id": {
      "label": "10897357027"
    },
    "title": {
      "label": "why."
    },
    "content": {
      "label": "why are yall talking down people’s music? that’s the whole reason people HAVE tiktok . especially selenas people have that memory of her that’s just gone.. in the most respectful way ever, that was so stupid.",
      "attributes": {
        "type": "text"
      }
    },
    "link": {
      "attributes": {
        "rel": "related",
        "href": "https://itunes.apple.com/us/review?id=835599320&type=Purple%20Software"
      }
    },
    "im:voteSum": {
      "label": "0"
    },
    "im:contentType": {
      "attributes": {
        "term": "Application",
        "label": "Application"
      }
    },
    "im:voteCount": {
      "label": "0"
    }
  },
  {
    "author": {
      "uri": {
        "label": "https://itunes.apple.com/us/reviews/id767676941"
      },
      "name": {
        "label": "Simply.Beautiful81"
      },
      "label": ""
    },
    "updated": {
      "label": "2024-02-03T08:16:47-07:00"
    },
    "im:rating": {
      "label": "5"
    },
    "im:version": {
      "label": "33.1.0"
    },
    "id": {
      "label": "10897354755"
    },
    "title": {
      "label": "Good for content"
    },
    "content": {
      "label": "Great social platform",
      "attributes": {
        "type": "text"
      }
    },
    "link": {
      "attributes": {
        "rel": "related",
        "href": "https://itunes.apple.com/us/review?id=835599320&type=Purple%20Software"
      }
    },
    "im:voteSum": {
      "label": "0"
    },
    "im:contentType": {
      "attributes": {
        "term": "Application",
        "label": "Application"
      }
    },
    "im:voteCount": {
      "label": "0"
    }
  }
]

describe('isPastHourLimit', () => {
  it('returns false if the reviewDate is not within the hourLimit', () => {
    const params = {
      reviewDate: getPastDateTime(50),
      hourLimit: 48
    }

    expect(isWithinHourLimit(params)).toBe(false)
  })

  it('returns true if reviewDate is within the hourLimit', () => {
    const params = {
      reviewDate: getPastDateTime(47),
      hourLimit: 48
    }

    expect(isWithinHourLimit(params)).toBe(true)
  })
})

describe('fetchReviews', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('when the response is successful', () => {
    beforeEach(() => {
      global.fetch = jest.fn(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ feed: { entry: MOCK_DATA } })
      })) as jest.Mock
    })
  
    it('fetches reviews successfully', async () => {
      const reviews = await fetchReviews('https://fakeurl.com')
  
      expect(reviews).toEqual(MOCK_DATA)
    })
  })

  describe('when the response is not OK', () => {
    jest.spyOn(console, 'error')

    beforeEach(() => {
      global.fetch = jest.fn(() => Promise.resolve({
        ok: false,
        statusText: 'Bad Request',
      })) as jest.Mock
    })

    it('handles Bad Request', async () => {
      const reviews = await fetchReviews('https://fakeurl.com')
      
      expect(reviews).toBeUndefined()
      expect(console.error).toHaveBeenCalledWith(new Error('Network response was not OK. Bad Request'))
    })
  })
})

