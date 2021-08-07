import image from '../res/display_pic.jpg'

const About = () => (
  <div>
    <h2>About Unesco go where</h2>

    <p style={paragraphText}>
      To me, travelling enriches the mind and soul. Experiencing the local culture,
      interacting with local people, taking in the sights, smells and sounds, is what makes
      travel so meaningful and rewarding. If you are a similar type of traveller, I hope you
      find this website useful. If you are not, I hope that this website will inspire you
      to embrace a different form of tourism. 
    </p>
    <p style={paragraphText}>
      Through my travels, I have found that visiting UNESCO World Heritage Sites are the
      best way of understanding the host country. With more than 1100 listings, the list
      is extremely diverse, with something for everyone, dotted around the world. Some places
      are touristy, but also accessible to the average tourist. Others are REALLY off the beaten
      path, and requires some dedication on the part of the traveller. Whatever the case, being
      placed on the UNESCO list means that these sites are culturally significant and almost
      certainly worth a visit. 
    </p>  

    <h2>Future plans</h2>
    <ul>
      <li>Update the design of the website</li>
      <li>Update the site with the UNESCO's list of Intangible Cultural Heritage.</li>
      <li>Make the website responsive to other screen types such as mobile, tablet</li>
    </ul>
    <p style={paragraphText}>
      The intangible cultural heritage list is less about places to go, but rather, about experiences
      and skill. For example, in Singapore, when you dine at any unremarkable hawker centre, 
      you are already living an intangible cultural heritage. For a sensible traveller, such 
      experiences can be invaluable. 
    </p>

    <h2>About the creator</h2>
    <img 
      src={image}
      height='400px'
      />

    <p style={paragraphText}>His name is Keith, currently stuck on a tiny island called Singapore, which he has not
      been able to leave for the past 18 months (and who knows when next). This little project of his
      is borne out of severe cabin fever amid taking online web development courses
      and his studies in computer science at the National University of Singapore. He loves travelling solo,
      having first done so with his savings during National Service at the age of 19. Then, he toured
      the United States alone for 2 weeks (actually just New York City and Washington DC) and realised
      later what a life-changing moment that had been for him. 
    </p>

    <p style={paragraphText}>
      The above image was taken in December 2018, in Venice (a UNESCO World Heritage site!). That was his last trip
      abroad. He longs for the day when we can all travel freely once again. 
    </p>

  </div>
)

//alternative link to image: https://drive.google.com/uc?export=view&id=1YjqZrdCFwTd9Im7P1VptzcDtg4_laB_W

export default About

const paragraphText = {
  fontSize: '20px'
}