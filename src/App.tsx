import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Page, PrivatePath, routes } from 'routes'
import ThemeProvider from 'themes/ThemeProvider'
import { PanelContextProvider } from 'contexts/panelContext'

import Layout from 'themes/Layout'
import PanelLayout from 'themes/PanelLayout'

import Home from 'views/Home'
import About from 'views/About'
import Language from 'views/Language'
import Login from 'views/Login'
import NotFound from 'views/NotFound'
import Panel from 'views/Panel'
import Place from 'views/Place'

export default () => (
  <ThemeProvider>
    <PanelContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path={routes[Page.PANEL]} element={<PanelLayout />}>
            <Route path="" element={<PrivatePath />}>
              <Route path="" element={<Panel />} />
            </Route>
          </Route>
          <Route path={routes[Page.HOME]} element={<Layout />}>
            <Route path="" element={<Home />} />
            <Route path={`${routes[Page.PLACE]}/:id`} element={<Place />} />
            <Route path={routes[Page.LOGIN]} element={<Login />} />
            <Route path={routes[Page.ABOUT]} element={<About />} />
            <Route path={routes[Page.LANGUAGE]} element={<Language />} />
            <Route path={routes[Page.NOTFOUND]} element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </PanelContextProvider>
  </ThemeProvider>
)
