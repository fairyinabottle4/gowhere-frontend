import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Site from './Site'

describe('<Site />', () => {
    let component
    const mockUpdateSite = jest.fn()
    const mockDeleteSite = jest.fn()

    beforeEach(() => {
        const user = {
            name: 'Test User',
            username: 'Testusername'
        }  
      
        const site = {
          title: 'Kafka on the Shore',
          author: 'Haruki Murakami',
          url: 'https://en.wikipedia.org/wiki/Kafka_on_the_Shore',
          likes: 57,
          user: user
        }
            
        component = render(
            <Site site={site} updateSite={mockUpdateSite} deleteSite={mockDeleteSite} />
        )
        
    })

    test('renders title and author but not url or likes', () => {

        //5.13
        const title = component.container.querySelector('.site-title-author')
        expect(title).toHaveTextContent(
          'Kafka on the Shore'
        )
        expect(title).toHaveTextContent(
          'Haruki Murakami'
        )
        expect(title).not.toHaveTextContent(
          'https://en.wikipedia.org/wiki/Kafka_on_the_Shore'
        )
        expect(title).not.toHaveValue(
            57
        )
      })
      
      test('clicking the button shows url and likes', () => {
          
          const button = component.getByText('view')
          fireEvent.click(button)
      
          const details = component.container.querySelector('.site-details')
          expect(details).toHaveTextContent(
              'https://en.wikipedia.org/wiki/Kafka_on_the_Shore'
          )
          expect(details).toHaveTextContent(
              57
          )
      })

      test('clicking the like button twice invokes the handler twice', () => {
        const button = component.getByText('view')
        fireEvent.click(button)

         const like_button = component.getByText('like')
         fireEvent.click(like_button)
         fireEvent.click(like_button)
         expect(mockUpdateSite.mock.calls).toHaveLength(2)
      })
    
      
})


