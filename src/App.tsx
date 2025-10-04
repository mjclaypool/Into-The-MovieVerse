import { UserProgressContextProvider } from './store/UserProgressContext'

import Footer from './components/Footer'
import Header from './components/Header'
import MovieOptions from './components/MovieOptions'
import Movies from './components/Movies'
import Search from './components/Search'
import SideScroller from './UI/SideScroller'
import TitleSection from './components/TitleSection'
import './index.css'


function App() {
  return (
    <UserProgressContextProvider>
      <div className='bg-zinc-800 size-full px-[40px] md:px-[100px] pt-12 md:pt-20'>
        <Header />
        <Movies>
          <TitleSection sectionTitle='Recommended Movies' />
          <SideScroller optionType='personal'>
            <MovieOptions optionType='personal' />
          </SideScroller>
        </Movies>
        <Movies>
          <TitleSection sectionTitle='Popular Movies' />
          <SideScroller>
            <MovieOptions optionType='popular' />
          </SideScroller>
        </Movies>
        <Search title="Search Movies" />
        <Search title="Browse Movies" />
        <Footer />
      </div>
    </UserProgressContextProvider>
  )
}

export default App
