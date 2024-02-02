import { Week, Weeks } from './UI'
import { CalendarProvider } from './state/state'
import Main from './components/Main'
import { FilterProvider } from './state/filter'
import { HolidaysProvider } from './state/holidays'
import Headet from './components/Headet'

function App() {

  return (
    <CalendarProvider>
      <FilterProvider>
        <HolidaysProvider>
          <Headet />
          <Weeks>{['Sun','Mon','Tue','Wed','Thu','Fri','Sut'].map(i => <Week key={i}>{i}</Week>)}</Weeks>
          <Main />
        </HolidaysProvider>
      </FilterProvider>
    </CalendarProvider>
  )
}

export default App
