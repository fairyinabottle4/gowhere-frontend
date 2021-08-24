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
          title: 'Ha Long Bay',
          url: 'https://whc.unesco.org/en/list/672',
          country: "Vietnam",
          region: "Asia-Pacific",
          description: "Ha Long Bay, in the Gulf of Tonkin, includes some 1,600 islands and islets, forming a spectacular seascape of limestone pillars. Because of their precipitous nature, most of the islands are uninhabited and unaffected by a human presence. The site's outstanding scenic beauty is complemented by its great biological interest.",
          userLiked: [],
          userVisited: [],
          parent: null,
          imageUrl: "https://whc.unesco.org/uploads/thumbs/site_0672_0002-500-335-20151105164131.jpg"
        }
            
        component = render(
            <Site site={site} user={user}/>
        )
        
    })

    test('renders only the region', () => {

        //5.13
        const entry = component.container.querySelector('.site')
        expect(entry).toHaveTextContent(
          'Ha Long Bay'
        )
        expect(entry).not.toHaveTextContent(
          'Asia-Pacific'
        )
        expect(entry).not.toHaveTextContent(
          "Vietnam"
        )
      })
      
      test('clicking the button shows site details', () => {
          
          const button = component.getByText('View Ha Long Bay')
          fireEvent.click(button)
      
          const details = component.container.querySelector('.site-description')
          expect(details).toHaveTextContent(
              "Ha Long Bay, in the Gulf of Tonkin, includes some 1,600 islands and islets, forming a spectacular seascape of limestone pillars. Because of their precipitous nature, most of the islands are uninhabited and unaffected by a human presence. The site's outstanding scenic beauty is complemented by its great biological interest.",
          )
      })

      test('clicking the like button twice invokes the handler once', () => {
        const button = component.getByText('View Ha Long Bay')
        fireEvent.click(button)

         const like_button = component.getByText('Like')
         fireEvent.click(like_button)
         expect(mockUpdateSite.mock.calls).toHaveLength(1)
      })
    
      
})


