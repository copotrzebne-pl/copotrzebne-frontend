import { TranslatedEntry } from './types/types'
import { Language } from './common/language'

export const translations: { [value: string]: TranslatedEntry } = {
  pageDescription: {
    name: {
      [Language.PL]: `Nie wiesz gdzie potrzebna jest żywność, komu koce a gdzie zawieźć
     środki higieniczne? Zobacz aktualne zbiórki dla Ukrainy w twoim 
     mieście!`,
      [Language.EN]:
        'You have no idea where to donate food, who needs blankets and where to deliver hygienic supplies? Check the ongoing collections for ukrainian refugees in your city!',
      [Language.UA]: `Не знаєш, де потрібні продукти, кому треба ковдри, куди завезти засоби особистої гігієни? Перевір діючі пункти збирання допомоги для України у твоєму місті!`
    }
  },
  shareActiveCollections: {
    name: {
      [Language.PL]: 'Udostępnij aktywne zbiórki',
      [Language.EN]: 'Share all ongoing collections',
      [Language.UA]: 'Поділитися активними пунктами'
    }
  },
  shareThisOrganizationCollection: {
    name: {
      [Language.PL]: 'Udostępnij zbiórkę tej organizacji',
      [Language.EN]: 'Share this collection',
      [Language.UA]: 'Поділитися пунктом'
    }
  },
  aboutUsPageTitle: {
    name: {
      [Language.PL]: 'Copotrzebne.pl - O nas',
      [Language.EN]: 'whatisneeded.pl - About us',
      [Language.UA]: 'shchopotribno.pl - Про нас'
    }
  },
  aboutUs: {
    name: {
      [Language.PL]: `Copotrzebne.pl jest aplikacją charytatywną wspieraną przez Schibsted Tech Polska. Pomagamy pomagać - łączymy miejsca oferujące pomoc rzeczową, noclegi i
      wsparcie osobom uchodźczym z Ukrainy - z osobami, które chciałyby je w tej
      pomocy wspierać. Ułatwiamy lokalizację zbiórek i pomagamy koordynować
      zaspokajanie podstawowych potrzeb. Dzięki nam dowiesz się, co jest
      aktualnie najbardziej potrzebne w twojej lokalizacji oraz gdzie i kiedy
      można dane rzeczy dostarczyć. 
      Jako część Koalicji Otwarty Kraków działamy na terenie Krakowa, ale zapraszamy do współpracy także inne organizacje oraz lokalizacje!`,
      [Language.EN]: `Whatisneeded.pl is a charity app powered by Schibsted Tech Polska. We are helping others help by connecting charity aid places and foundations,
      providing support to refugees from Ukraine - with people who would like to donate goods or items.
      We make it easier to locate the ongoing collections and coordinate demands for given supply.
      Thanks to us, you will know what is most needed in the aid center in your location and where and what you can donate to help.
      As a part of the Open Krakow Coalition, we are actively working in Krakow, but we also invite other organisations and locations to come and join us!`,
      [Language.UA]: `Shchopotribno.pl – це благодійний додаток, розроблений Schibsted Tech Polska. Помагаємо допомагати! З'єднуємо пункти збирання допомоги, де пропонують речі, проживання і підтримку біженцям з України, з особами, які хочуть  таку допомогу надати.
    Полегшуємо пошук пунктів збирання допомоги, координуємо в них попит на основні потреби.
    Завдяки нам дізнаєшся, що цієї миті найнеобхідніше в пунктах твого міста,а також куди і коли можна доставити речі.`
    }
  },
  contactDetails: {
    name: {
      [Language.PL]: `Chcesz dodać zbiórkę w twojej organizacji?
      Skontaktuj się z nami:`,
      [Language.EN]: `Do you want to add collections in your organisation here?
      Get in touch with us:`,
      [Language.UA]: 'Хочете додати новий пункт збору допомоги? Напиши до нас:'
    }
  },
  chooseCurrentDemands: {
    name: {
      [Language.PL]: 'Wybierz aktualne potrzeby',
      [Language.EN]: 'Choose your current needs',
      [Language.UA]: 'Виберіть потрібні речі'
    }
  },
  logIn: {
    name: {
      [Language.PL]: 'Zaloguj się',
      [Language.EN]: 'Login',
      [Language.UA]: 'Увійти'
    }
  },
  email: {
    name: {
      [Language.PL]: 'Email',
      [Language.EN]: 'Email',
      [Language.UA]: 'Email'
    }
  },
  password: {
    name: {
      [Language.PL]: 'Hasło',
      [Language.EN]: 'Password',
      [Language.UA]: 'Пароль'
    }
  },
  name: {
    name: {
      [Language.PL]: 'Nazwa',
      [Language.EN]: 'Name',
      [Language.UA]: 'Назва'
    }
  },
  city: {
    name: {
      [Language.PL]: 'Miasto',
      [Language.EN]: 'City',
      [Language.UA]: 'Місто'
    }
  },
  street: {
    name: {
      [Language.PL]: 'Ulica',
      [Language.EN]: 'Street',
      [Language.UA]: 'Вулиця'
    }
  },
  buildingNumber: {
    name: {
      [Language.PL]: 'Numer budynku',
      [Language.EN]: 'Building no.',
      [Language.UA]: 'Номер будинку'
    }
  },
  apartmentNumber: {
    name: {
      [Language.PL]: 'Numer lokalu',
      [Language.EN]: 'Flat',
      [Language.UA]: 'Номер квартири'
    }
  },
  workingHours: {
    name: {
      [Language.PL]: 'Godziny otwarcia',
      [Language.EN]: 'Working hours',
      [Language.UA]: 'Робочі години'
    }
  },
  comment: {
    name: {
      [Language.PL]: 'Komentarz',
      [Language.EN]: 'Comment',
      [Language.UA]: 'Коментар'
    }
  },
  phone: {
    name: {
      [Language.PL]: 'Numer telefonu',
      [Language.EN]: 'Contact person',
      [Language.UA]: 'Номер телефону'
    }
  },
  latitude: {
    name: {
      [Language.PL]: 'Szerokość geograficzna',
      [Language.EN]: 'Latitude',
      [Language.UA]: 'Широта'
    }
  },
  longitude: {
    name: {
      [Language.PL]: 'Długość geograficzna',
      [Language.EN]: 'Longitude',
      [Language.UA]: 'Довгота'
    }
  },
  bankAccount: {
    name: {
      [Language.PL]: 'Numer konta bankowego do wpłat darowizn',
      [Language.EN]: 'Bank account number for donations',
      [Language.UA]: 'Номер банківського рахунку для внесення пожертв'
    }
  },
  bankAccountDescription: {
    name: {
      [Language.PL]: 'Szczegółowe informacje do nr konta (np. tytuł przelewu)',
      [Language.EN]:
        'Additional information about bank account (eg. transfer title)',
      [Language.UA]:
        'Additional information about bank account (eg. transfer title)'
    }
  },
  homepageLink: {
    name: {
      [Language.PL]: 'Link do strony domowej organizacji',
      [Language.EN]: 'Link to the home page of the organization',
      [Language.UA]: 'Посилання на домашню сторінку організації'
    }
  },
  facebookLink: {
    name: {
      [Language.PL]: 'Link do strony organizacji na Facebooku',
      [Language.EN]: 'Link to the Facebook page of the organization',
      [Language.UA]: 'Посилання на сторінку організації у Facebook'
    }
  },
  signupLink: {
    name: {
      [Language.PL]: 'Link do zapisów na wolontariat w tym miejscu',
      [Language.EN]: 'Link to register for voluntary service at this location',
      [Language.UA]: 'Посилання для реєстрації на волонтерську службу тут'
    }
  },
  fundraisingLink: {
    name: {
      [Language.PL]: 'Link do zbiórki pieniężnej tej organizacji',
      [Language.EN]: `Link to the fundraiser of this organization`,
      [Language.UA]: 'Посилання на збір коштів цієї організації'
    }
  },
  save: {
    name: {
      [Language.PL]: 'Zapisz',
      [Language.EN]: 'Save',
      [Language.UA]: 'Зберегти'
    }
  },
  cancel: {
    name: {
      [Language.PL]: 'Anuluj',
      [Language.EN]: 'Cancel',
      [Language.UA]: 'Cancel'
    }
  },
  pageNotFound: {
    name: {
      [Language.PL]: 'Nie znaleziono strony',
      [Language.EN]: 'Page not found',
      [Language.UA]: 'Сторінка не знайдена'
    }
  },
  addPlace: {
    name: {
      [Language.PL]: 'Dodaj miejsce',
      [Language.EN]: 'Add place',
      [Language.UA]: 'Додати нове місце'
    }
  },
  placeLastUpdate: {
    name: {
      [Language.PL]: 'Aktualizacja',
      [Language.EN]: 'Last update',
      [Language.UA]: 'Оновлено'
    }
  },
  noDemandsReported: {
    name: {
      [Language.PL]: 'Aktualnie nie masz zgłoszonych żadnych potrzeb',
      [Language.EN]: 'You have no ongoing collections',
      [Language.UA]: 'Наразі ви не додали жодних потреб'
    }
  },
  addDemands: {
    name: {
      [Language.PL]: 'Dodaj potrzeby',
      [Language.EN]: 'Add demands',
      [Language.UA]: 'Додати потребні речі'
    }
  },
  finishCollection: {
    name: {
      [Language.PL]: 'Zakończ zbiórkę',
      [Language.EN]: 'Finish current collection',
      [Language.UA]: 'Завершити збирання речей'
    }
  },
  removeDemands: {
    name: {
      [Language.PL]: 'Usuń wszystkie potrzeby',
      [Language.EN]: 'Remove all demands',
      [Language.UA]: 'Remove all demands'
    }
  },
  lastUpdate: {
    name: {
      [Language.PL]: 'Ostatnia aktualizacja:',
      [Language.EN]: 'Last modified at:',
      [Language.UA]: 'Останнє оновлення:'
    }
  },
  demandsList: {
    name: {
      [Language.PL]: 'Lista potrzeb',
      [Language.EN]: 'Demands list',
      [Language.UA]: 'Список потрібних речей'
    }
  },
  addToList: {
    name: {
      [Language.PL]: 'Dodaj do listy',
      [Language.EN]: 'Add to list',
      [Language.UA]: 'Add to list'
    }
  },
  saveChanges: {
    name: {
      [Language.PL]: 'Zapisz zmiany',
      [Language.EN]: 'Save changes',
      [Language.UA]: 'Save changes'
    }
  },
  loggedInAs: {
    name: {
      [Language.PL]: 'Jesteś zalogowany jako',
      [Language.EN]: 'Logged in as',
      [Language.UA]: 'Залогований як'
    }
  },
  menuLogout: {
    name: {
      [Language.PL]: 'Wyloguj się',
      [Language.EN]: 'Log out',
      [Language.UA]: 'Вийти'
    }
  },
  menuAboutUs: {
    name: {
      [Language.PL]: 'O nas',
      [Language.EN]: 'About us',
      [Language.UA]: 'Про нас'
    }
  },
  menuPanel: {
    name: {
      [Language.PL]: 'Panel',
      [Language.EN]: 'Panel',
      [Language.UA]: 'Панель'
    }
  },
  menuLogIn: {
    name: {
      [Language.PL]: 'Zaloguj się',
      [Language.EN]: 'Log in',
      [Language.UA]: 'Увійти'
    }
  },
  requestPlace: {
    name: {
      [Language.PL]: 'Dodaj nowe miejsce',
      [Language.EN]: 'Add new place',
      [Language.UA]: 'додати нове місце'
    }
  },
  userEmail: {
    name: {
      [Language.PL]: 'Email użytkownika - do stworzenia konta',
      [Language.EN]: 'User email - for creating an account',
      [Language.UA]:
        'Електронна адреса користувача - для створення облікового запису'
    }
  },
  fulfillRequiredFields: {
    name: {
      [Language.PL]:
        'Należy wypełnić wszystkie wymagane pola oznaczone znakiem *',
      [Language.EN]: 'All required fields marked with * must be completed',
      [Language.UA]: 'Усі обов’язкові поля, позначені *, необхідно заповнити'
    }
  },
  thanksForRequestingPlace: {
    name: {
      [Language.PL]: 'Dziękujemy za zgłoszenie nowego miejsca zbiórek.',
      [Language.EN]: 'Thank you for creating a new place.',
      [Language.UA]: 'Дякуємо, що повідомили про новий пункт збору.'
    }
  },
  credentialsWillBeSent: {
    name: {
      [Language.PL]: 'Dane do logowania prześlemy po weryfikacji miejsca.',
      [Language.EN]:
        'We will send login credentials after the data verification.',
      [Language.UA]: 'Ми надішлемо дані для входу після перевірки місця.'
    }
  },
  requestPlaceFailed: {
    name: {
      [Language.PL]: 'Wystąpił nieznany błąd podczas zgłaszania miejsca.',
      [Language.EN]:
        'An unknown error has occurred during the creation of the place.',
      [Language.UA]: 'Під час повідомлення про місце сталася невідома помилка.'
    }
  },
  addNewPlace: {
    name: {
      [Language.PL]: 'Dodaj nowe miejsce',
      [Language.EN]: 'Add new place',
      [Language.UA]: 'додати нове місце'
    }
  },
  addNewPlaceDescription: {
    name: {
      [Language.PL]:
        'Prowadzisz zbiórkę? Chcesz zgłosić miejsce zbiórki? Wypełnij formularz i podaj adres email. Otrzymamy twoje zgłoszenie, sprawdzimy je i utworzymy konto dla Ciebie. Dane do logowania otrzymasz na podany adres email.',
      [Language.EN]:
        'Are you running a charity collection? Do you want to report a new place? Fill out the form and enter your email address. We will receive your application, check it and create an account for you. You will receive the login details at the e-mail address provided.',
      [Language.UA]:
        'Ви проводите збір коштів? Ви хочете повідомити про місце зустрічі? Заповніть форму та введіть свою електронну адресу. Ми отримаємо вашу заявку, перевіримо її та створимо для вас обліковий запис. Ви отримаєте дані для входу на вказану адресу електронної пошти.'
    }
  },
  editPlaceData: {
    name: {
      [Language.PL]: 'Edytuj dane organizacji',
      [Language.EN]: 'Edit data',
      [Language.UA]: 'Редагуй дані про організацію'
    }
  },
  updatePlaceLastUpdatedDate: {
    name: {
      [Language.PL]: 'Lista potrzeb jest nadal aktualna',
      [Language.EN]: 'The demands list is up to date',
      [Language.UA]: 'Список потреб залишається актуальним'
    }
  },
  editDemands: {
    name: {
      [Language.PL]: 'Edytuj listę potrzeb',
      [Language.EN]: 'Edit current demands',
      [Language.UA]: 'Редагуй список потребних речей'
    }
  },
  noOngoingCollections: {
    name: {
      [Language.PL]: 'Brak aktualnych zbiórek',
      [Language.EN]: 'No ongoing collections',
      [Language.UA]: 'Пункт допомоги не збирає речей'
    }
  },
  cookiesBarDescription: {
    name: {
      [Language.PL]:
        'Cześć! Zbieramy ciasteczka aby analizować ruch na stronie i usprawniać funkcjonowanie serwisu.',
      [Language.EN]:
        'Hi! We collect cookies to analyze website traffic and improve the functioning of the website.',
      [Language.UA]:
        'Привіт! Ми збираємо файли cookies, щоб аналізувати рух на вебсайті та покращувати роботу нашого сервісу'
    }
  },
  showMore: {
    name: {
      [Language.PL]: 'Pokaż więcej',
      [Language.EN]: 'Show more',
      [Language.UA]: 'Показати більше'
    }
  },
  showLess: {
    name: {
      [Language.PL]: 'Pokaż mniej',
      [Language.EN]: 'Show less',
      [Language.UA]: 'Показати меньше'
    }
  },
  showOnMap: {
    name: {
      [Language.PL]: 'Zobacz na mapie',
      [Language.EN]: 'See on map',
      [Language.UA]: 'Подивитися на карті'
    }
  },
  stateActive: {
    name: {
      [Language.PL]: 'Aktywne',
      [Language.EN]: 'Active',
      [Language.UA]: 'активний'
    }
  },
  stateInactive: {
    name: {
      [Language.PL]: 'Nieaktywne',
      [Language.EN]: 'Inactive',
      [Language.UA]: 'неактивний'
    }
  },
  notAnEmail: {
    name: {
      [Language.PL]: 'Adres email nie jest poprawny',
      [Language.EN]: 'Email address is not valid',
      [Language.UA]: 'Адреса електронної пошти недійсна'
    }
  },
  searchPlaceByName: {
    name: {
      [Language.PL]: 'Szukaj po potrzebnych produktach',
      [Language.EN]: 'Search by the products needed',
      [Language.UA]: 'Пошук за потрібними продуктами'
    }
  },
  searchPlacePlaceholder: {
    name: {
      [Language.PL]: 'Np koce, kanapki, żywność',
      [Language.EN]: 'blankets, sandwiches, food',
      [Language.UA]: 'ковдри, бутерброди, їжа'
    }
  },
  search: {
    name: {
      [Language.PL]: 'Szukaj',
      [Language.EN]: 'Search',
      [Language.UA]: 'Пошук'
    }
  },
  inputProductName: {
    name: {
      [Language.PL]: 'Wpisz nazwę produktu',
      [Language.EN]: 'Enter a product name',
      [Language.UA]: 'Введіть назву продукту'
    }
  },
  removeAll: {
    name: {
      [Language.PL]: 'Usuń wszystkie',
      [Language.EN]: 'Remove all',
      [Language.UA]: 'Видалити всі'
    }
  },
  managePlaces: {
    name: {
      [Language.PL]: 'Zarządzaj miejscami',
      [Language.EN]: 'Manage places',
      [Language.UA]: 'Керуйте місцями'
    }
  },
  placeId: {
    name: {
      [Language.PL]: 'ID miejsca',
      [Language.EN]: 'Place ID',
      [Language.UA]: 'Place ID'
    }
  },
  createUser: {
    name: {
      [Language.PL]: 'Dodaj użytkownika',
      [Language.EN]: 'Create user',
      [Language.UA]: 'Create user'
    }
  },
  login: {
    name: {
      [Language.PL]: 'Login',
      [Language.EN]: 'Login',
      [Language.UA]: 'Login'
    }
  },
  urgentlyNeeded: {
    name: {
      [Language.PL]: 'Pilnie potrzebne!',
      [Language.EN]: 'Urgently needed',
      [Language.UA]: 'Терміново потрібна'
    }
  },
  notFound: {
    name: {
      [Language.PL]: 'Nie znaleziono',
      [Language.EN]: 'Not found',
      [Language.UA]: 'Не знайдено'
    }
  },
  additionalDescription: {
    name: {
      [Language.PL]: 'Dodatkowy opis miejsca',
      [Language.EN]: 'Additional description',
      [Language.UA]: 'Additional description'
    }
  },
  howCanIHelp: {
    name: {
      [Language.PL]: 'Jak mogę pomóc?',
      [Language.EN]: 'How can I help?',
      [Language.UA]: 'Чим я можу допомогти?'
    }
  },
  organizationLabel: {
    name: {
      [Language.PL]: 'Organizacja',
      [Language.EN]: 'Organization',
      [Language.UA]: 'Організація'
    }
  },
  faqAccountNumberDescription: {
    name: {
      [Language.PL]:
        'Aktualny numer konta ogranizacji: <br /><b>{bankAccountNumber}</b>',
      [Language.EN]:
        "Organization's current account number: <br /><b>{bankAccountNumber}</b>",
      [Language.UA]:
        'Номер поточного рахунку організації: <br /><b>{bankAccountNumber}</b>'
    }
  },
  faqFundraisingDescription: {
    name: {
      [Language.PL]: 'Strona gdzie można nas wspomóc: {fundraising}',
      [Language.EN]: 'Page where you can help us: {fundraising}',
      [Language.UA]: 'Сторінка, де ви можете нам допомогти: {fundraising}'
    }
  },
  faqTitle_1: {
    name: {
      [Language.PL]: 'Chcę przekazać pieniądze, jak mogę to zrobić?',
      [Language.EN]: 'I want to donate money, how can I do it?',
      [Language.UA]: 'Я хочу пожертвувати гроші, як я можу це зробити?'
    }
  },
  faqText_1: {
    name: {
      [Language.PL]:
        'Weryfikujemy organizacje przed dodaniem ich do systemu. Numer konta ogranizacji: <br /><b>{bankAccountNumber}</b>',
      [Language.EN]:
        'We verify organizations before adding them to the system. Organization Account Number: <br /><b>{bankAccountNumber}</b>',
      [Language.UA]:
        'Ми перевіряємо організації, перш ніж додати їх до системи. Номер рахунку організації: <br /><b>{bankAccountNumber}</b>'
    }
  },
  faqTitle_2: {
    name: {
      [Language.PL]: 'Chcę przekazać dary rzeczowe, jak mogę to zrobić?',
      [Language.EN]: 'I want to donate goods, how can I do it?',
      [Language.UA]: 'Я хочу пожертвувати товари, як я можу це зробити?'
    }
  },
  faqText_2: {
    name: {
      [Language.PL]:
        'Wszystkie dary można przywieść pod adres: <br /> <b>{address}</b> <br /> Godziny otwarcia: <b>{workingHours}</b>',
      [Language.EN]:
        'All donations can be brought to: <br /> <b> {address} </b> <br /> Opening hours: <b> {workingHours} </b>',
      [Language.UA]: ''
    }
  },
  faqTitle_3: {
    name: {
      [Language.PL]: 'Mieszkam dość daleko od tej organizacji, jak mogę pomóc?',
      [Language.EN]:
        'I live quite far away from this organisation, how can I help?',
      [Language.UA]:
        'Я живу досить далеко від цієї організації, як я можу допомогти?'
    }
  },
  faqText_3: {
    name: {
      [Language.PL]: '',
      [Language.EN]: '',
      [Language.UA]: ''
    }
  },
  faqTitle_4: {
    name: {
      [Language.PL]: 'Mieszkam za granicą, jak mogę pomóc?',
      [Language.EN]: 'I live abroad, how can I help?',
      [Language.UA]: 'Я живу за кордоном, як я можу допомогти?'
    }
  },
  faqText_4: {
    name: {
      [Language.PL]: `Nawet będąc daleko możesz pomóc na wiele sposobów!<br /><br />
      Część organizacji prowadzi zbiórki pieniężne, a dzięki wpłatom ma fundusze realizację bieżących potrzeb Osób które korzystają z ich pomocy.<br />
      Jeżeli chcesz, możesz wesprzeć tą organizację finansowo: <br />
      <b>{bankAccountNumber}</b>
      <br />
      {fundraising}
      <br /><br />
      Jeśli reprezentujesz firmę lub fundację, lub po prostu masz możliwość zorganizowana większej dostawy darów z zagranicy to świetnie! Prosimy Cię jedynie o kontakt z organizacją i uprzedzenie jej o wielkości i terminie dostawy <br /><b>{contact} {address} <br/> {workingHours}</b>
      <br /><br />
      Poza pomocą rzeczową i finansową, możesz także pomóc rozpowszechniając informację o potrzebach danej organizacji oraz możliwych sposobach jej wsparcia - być może dzięki Twojej sieci kontaktów dotrzemy do organizacji i firm, które będą w stanie wesprzeć organizację rzeczowo lub finansowo.<br />
      A może sam(a) zorganizujesz zbiórkę wsród znajomych?`,
      [Language.EN]: `Even if you live far away, there are still quite a few ways of helping!<br /><br />
      Some organisations have fundraising sites or collect funds on dedicated bank accounts; those funds are later used to buy needed supplies and provide them to People in need.
      If you want you can support this organisation financially <br />
      <b>{bankAccountNumber}</b>
      <br />
      {fundraising}
      <br /><br />

      If you represent a charity organisation, foundation or a company, or you just simply can organise a bigger transport with supplies - that’s great! We only kindly ask you to inform the organisation about incoming delivery, specifying the date of arrival and size of the package. You can find the organisation contact info here: <br /><b>{contact} {address} <br/> {workingHours}</b>
      <br /><br />
      Apart from delivering supplies and financial support, you can also help by spreading the information about the organisation’s needs and possible ways to provide help - perhaps thanks to your social network we will be able to reach companies and foundations able to support this organisation even more?<br />
      Or maybe you can organise a fundraising or goods collection event among your friends? :)  
      `,
      [Language.UA]: ''
    }
  },
  faqTitle_5: {
    name: {
      [Language.PL]: 'Nie mam dużo wolnego czasu, jak mogę pomóc?',
      [Language.EN]: 'I don’t have much free time, how can I help?',
      [Language.UA]: 'У мене мало вільного часу, чим я можу допомогти?'
    }
  },
  faqText_5: {
    name: {
      [Language.PL]: '',
      [Language.EN]: '',
      [Language.UA]: ''
    }
  },
  faqTitle_6: {
    name: {
      [Language.PL]: 'Nie mam aktualnie środków, jak mogę pomóc?',
      [Language.EN]: 'I can’t afford to buy a lot of goods, how can I help?',
      [Language.UA]:
        'Я не можу дозволити собі купувати багато товарів, як я можу допомогти?'
    }
  },
  faqText_6: {
    name: {
      [Language.PL]: '',
      [Language.EN]: '',
      [Language.UA]: ''
    }
  },
  faqTitle_7: {
    name: {
      [Language.PL]: 'Mam trochę wolnego czasu, jak mogę pomóc?',
      [Language.EN]: 'I have some spare time, how can I help?',
      [Language.UA]: 'У мене є вільний час, як я можу допомогти?'
    }
  },
  faqText_7: {
    name: {
      [Language.PL]:
        'Tutaj jest link do zapisu na wolontariat w naszych punktach: {link}',
      [Language.EN]:
        'Here is a link to signup for a volunteer work, link: {link}',
      [Language.UA]:
        'Ось посилання для реєстрації на волонтерську роботу, посилання:'
    }
  },
  menuInternalAnnouncements: {
    name: {
      [Language.PL]: 'Zobacz ogłoszenia',
      [Language.EN]: 'Browse announcements',
      [Language.UA]: 'Browse announcements'
    }
  },
  internalAnnouncementsTitle: {
    name: {
      [Language.PL]: 'Lista ogłoszeń',
      [Language.EN]: 'Announcements list',
      [Language.UA]: 'Announcements list'
    }
  },
  internalAnnouncementsSubtitle: {
    name: {
      [Language.PL]:
        'Przeglądaj i dodawaj ogłoszenia. Możesz dodawać ogłoszenia publiczne widoczne na stronie głównej, oraz wewnętrzne, które są widoczne tylko dla innych zalogowanych osób koordynujących zbiórki.',
      [Language.EN]:
        'Browse and add announcements. You can add public announcements visible on the home page, and internal announcements that are visible only to other logged-in collection coordinators.',
      [Language.UA]:
        'Browse and add announcements. You can add public announcements visible on the home page, and internal announcements that are visible only to other logged-in collection coordinators.'
    }
  },
  internalAnnouncementsSubtitle2: {
    name: {
      [Language.PL]:
        'Zamieszczaj ważne informacje dla ciebie i innych koordynatorów. Masz za dużo produktów w magazynie lub nie masz jak przewieźć produktów? Poinformuj innych i umówcie się na wzajemną pomoc. Potrzebujesz wolontariuszy? Umieść publiczne ogłoszenie.',
      [Language.EN]:
        'Post important information for you and other coordinators. Do you have too many products in stock or you do not have how to transport the products? Inform others and arrange for mutual assistance. Do you need volunteers? Add a public announcement.',
      [Language.UA]:
        'Post important information for you and other coordinators. Do you have too many products in stock or you do not have how to transport the products? Inform others and arrange for mutual assistance. Do you need volunteers? Add a public announcement.'
    }
  },
  announcementTitle: {
    name: {
      [Language.PL]: 'Tytuł ogłoszenia',
      [Language.EN]: 'Announcement title',
      [Language.UA]: 'Announcement title'
    }
  },
  announcementMessage: {
    name: {
      [Language.PL]: 'Treść',
      [Language.EN]: 'Message',
      [Language.UA]: 'Message'
    }
  },
  announcementStartDate: {
    name: {
      [Language.PL]: 'Data rozpoczęcia',
      [Language.EN]: 'Start date',
      [Language.UA]: 'Start date'
    }
  },
  announcementEndDate: {
    name: {
      [Language.PL]: 'Data zakończenia',
      [Language.EN]: 'End date',
      [Language.UA]: 'End date'
    }
  },
  failedToCreateAnnouncement: {
    name: {
      [Language.PL]: 'Nie udało się zapisać ogłoszenia',
      [Language.EN]: 'Failed to save the announcement',
      [Language.UA]: 'Failed to save the announcement'
    }
  },
  announcementContact: {
    name: {
      [Language.PL]: 'Informacje kontaktowe',
      [Language.EN]: 'Contact info',
      [Language.UA]: 'Contact info'
    }
  },
  announcementPlace: {
    name: {
      [Language.PL]: 'Miejsce',
      [Language.EN]: 'Place',
      [Language.UA]: 'Place'
    }
  },
  addComment: {
    name: {
      [Language.PL]: 'Skomentuj',
      [Language.EN]: 'Add comment',
      [Language.UA]: 'Add comment'
    }
  },
  hideComments: {
    name: {
      [Language.PL]: 'Ukryj komentarze',
      [Language.EN]: 'Hide comments',
      [Language.UA]: 'Hide comments'
    }
  },
  showComments: {
    name: {
      [Language.PL]: 'Pokaż komentarze',
      [Language.EN]: 'Show comments',
      [Language.UA]: 'Show comments'
    }
  },
  author: {
    name: {
      [Language.PL]: 'Autor',
      [Language.EN]: 'Author',
      [Language.UA]: 'Author'
    }
  },
  addedAt: {
    name: {
      [Language.PL]: 'Dodano:',
      [Language.EN]: 'Added:',
      [Language.UA]: 'Added:'
    }
  },
  validUntil: {
    name: {
      [Language.PL]: 'Ważne do:',
      [Language.EN]: 'Valid until:',
      [Language.UA]: 'Valid until:'
    }
  },
  contactInformation: {
    name: {
      [Language.PL]: 'Dane kontaktowe:',
      [Language.EN]: 'Contact:',
      [Language.UA]: 'Contact:'
    }
  },
  addInternalAnnouncement: {
    name: {
      [Language.PL]: 'Dodaj ogłoszenie wewnętrzne',
      [Language.EN]: 'Add internal announcement',
      [Language.UA]: 'Add internal announcement'
    }
  },
  addPublicAnnouncement: {
    name: {
      [Language.PL]: 'Dodaj ogłoszenie publiczne',
      [Language.EN]: 'Add public announcement',
      [Language.UA]: 'Add public announcement'
    }
  },
  publicAnnouncements: {
    name: {
      [Language.PL]: 'Ogłoszenia publiczne',
      [Language.EN]: 'Public announcements',
      [Language.UA]: 'Public announcements'
    }
  },
  internalAnnouncements: {
    name: {
      [Language.PL]: 'Ogłoszenia wewnętrzne',
      [Language.EN]: 'Internal announcements',
      [Language.UA]: 'Internal announcements'
    }
  },
  addAnnouncement: {
    name: {
      [Language.PL]: 'Dodaj ogłoszenie',
      [Language.EN]: 'Add announcement',
      [Language.UA]: 'Add announcement'
    }
  },
  whatisneededPl: {
    name: {
      [Language.PL]: 'copotrzebne.pl',
      [Language.EN]: 'whatisneeded.pl',
      [Language.UA]: 'shchopotribno.pl'
    }
  },
  found: {
    name: {
      [Language.PL]: 'Znaleziono',
      [Language.EN]: 'Found',
      [Language.UA]: 'Знайдено'
    }
  }
}
