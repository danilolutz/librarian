import { Address } from './models/Address.schema';
import { Author } from './models/Author.schema';
import { Borrow } from './models/Borrow.schema';
import { BorrowRenovation } from './models/BorrowRenovation.schema';
import { Category } from './models/Category.schema';
import { City } from './models/City.schema';
import { Contact } from './models/Contact.schema';
import { ContactType } from './models/ContactType.schema';
import { Country } from './models/Country.schema';
import { Permission } from './models/Permission.schema';
import { Profile } from './models/Profile.schema';
import { Program } from './models/Program.schema';
import { Publisher } from './models/Publisher.schema';
import { Region } from './models/Region.schema';
import { Settings } from './models/Settings.schema';
import { Title } from './models/Title.schema';
import { TitleAuthor } from './models/TtitleAuthor.schema';
import { TitleCategory } from './models/TitleCategory.schema';
import { TitlePublisher } from './models/TitlePublisher.schema';
import { UserType } from './models/UserType.schema';
import { User } from './models/User.schema';

export const entityMap = [
  { key: 'Permission', value: Permission },
  { key: 'Title', value: Title },
  { key: 'TitlePublisher', value: TitlePublisher },
  { key: 'User', value: User },
  { key: 'Author', value: Author },
  { key: 'Program', value: Program },
  { key: 'Category', value: Category },
  { key: 'Publisher', value: Publisher },
  { key: 'Region', value: Region },
  { key: 'City', value: City },
  { key: 'Address', value: Address },
  { key: 'Country', value: Country },
  { key: 'Profile', value: Profile },
  { key: 'UserType', value: UserType },
  { key: 'ContactType', value: ContactType },
  { key: 'Contact', value: Contact },
  { key: 'Settings', value: Settings },
  { key: 'Borrow', value: Borrow },
  { key: 'BorrowRenovation', value: BorrowRenovation },
  { key: 'TitleCategory', value: TitleCategory },
  { key: 'TitleAuthor', value: TitleAuthor },
];
