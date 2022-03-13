import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { routes } from 'routes';
import ThemeProvider from 'themes/ThemeProvider'
import { UserContextProvider } from 'contexts/userContext';


export default () => (
  <ThemeProvider>
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
          {routes.map(({component: Component, path}, index) => (
            <Route key={index} path={path} element={<Component />} />
          ))}
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  </ThemeProvider>
  
)
