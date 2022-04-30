import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Page, PrivatePath, routes } from 'routes'
import ThemeProvider from 'themes/ThemeProvider'
import { PanelContextProvider } from 'contexts/panelContext'
import { UserContextProvider } from 'contexts/userContext'
import { RequestPlaceContextProvider } from 'contexts/requestPlaceContext'

import Layout from 'themes/Layout'
import PanelLayout from 'themes/PanelLayout'

import Home from 'views/Home'
import About from 'views/About'
import Login from 'views/Login'
import NotFound from 'views/NotFound'
import Panel from 'views/Panel'
import Place from 'views/Place'
import ManagePlace from 'views/ManagePlace'
import Demands from 'views/Demands'
import ManageAddress from 'views/ManageAddress'
import ManageDemands from 'views/ManageDemands'
import RequestPlace from 'views/RequestPlace'
import CreateUser from 'views/CreateUser'

export default () => (
  <ThemeProvider>
    <RequestPlaceContextProvider>
      <PanelContextProvider>
        <BrowserRouter>
          <UserContextProvider>
            <Routes>
              <Route path={routes[Page.PANEL]} element={<PanelLayout />}>
                <Route path="" element={<PrivatePath />}>
                  <Route path="" element={<Panel />} />
                  <Route
                    path={routes[Page.MANAGE_PLACE]}
                    element={<ManagePlace />}
                  />
                  <Route
                    path={routes[Page.MANAGE_ADDRESS]}
                    element={<ManageAddress />}
                  />
                  <Route path={routes[Page.DEMANDS]} element={<Demands />} />
                  <Route
                    path={routes[Page.MANAGE_DEMANDS]}
                    element={<ManageDemands />}
                  />
                  <Route />
                  <Route
                    path={routes[Page.CREATE_USER]}
                    element={<CreateUser />}
                  />
                </Route>
              </Route>
              <Route path={routes[Page.HOME]} element={<Layout />}>
                <Route path="" element={<Home />} />
                <Route
                  path={`${routes[Page.PLACE]}/:idOrSlug`}
                  element={<Place />}
                />
                <Route path={routes[Page.LOGIN]} element={<Login />} />
                <Route path={routes[Page.ABOUT]} element={<About />} />
                <Route
                  path={routes[Page.REQUEST_NEW_PLACE]}
                  element={<RequestPlace />}
                />

                <Route path={routes[Page.NOTFOUND]} element={<NotFound />} />
              </Route>
            </Routes>
          </UserContextProvider>
        </BrowserRouter>
      </PanelContextProvider>
    </RequestPlaceContextProvider>
  </ThemeProvider>
)
