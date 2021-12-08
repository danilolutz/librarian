import React, { useCallback, useMemo, useRef, useState } from 'react';
import { format, parseISO } from 'date-fns';
import { FiPlus, FiSave, FiTrash2 } from 'react-icons/fi';
import { v4 } from 'uuid';
import { useToast } from '../../hooks/toast';
import i18n from '../../i18n';
import AuthorSelect from '../AuthorSelect';
import Button from '../Button';
import CategorySelect from '../CategorySelect';
import { SelectHandles } from '../CreatableSelectInput';

import Input from '../Input';
import PublisherSelect from '../PublisherSelect';
import SectionContent from '../Sections/SectionContent';
import SectionHeader from '../Sections/SectionHeader';

import { ButtonContainer, Container, List, ListItem, Row } from './styles';

interface SelectType {
  id: string;
  name: string;
}

interface Publisher {
  publisher: SelectType;
  classification: string;
  edition: string;
  publishedAt: Date;
}

const Title: React.FC = () => {
  const { addToast } = useToast();

  const [title, setTitle] = useState('');
  const [isbn, setIsbn] = useState('');

  const [selectedSection, setSelectedSection] = useState('editions');
  const sections = useMemo(() => ['editions', 'authors', 'categories'], []);

  const [classification, setClassification] = useState('');
  const [edition, setEdition] = useState('');
  const [publishedAt, setPublishedAt] = useState('');
  const [publishers, setPublishers] = useState<Publisher[]>([]);
  const refPublisher = useRef<SelectHandles>(null);

  const [authors, setAuthors] = useState<SelectType[]>([]);
  const refAuthor = useRef<SelectHandles>(null);

  const [categories, setCategories] = useState<SelectType[]>([]);
  const refCategory = useRef<SelectHandles>(null);

  const handleAddPublisher = useCallback(() => {
    const publisher = refPublisher.current.getValue<SelectType>();
    const errors: string[] = [];
    if (!publisher) {
      errors.push(i18n.t('publisher.label'));
    }
    if (!classification) {
      errors.push(i18n.t('title.classification'));
    }
    if (!edition) {
      errors.push(i18n.t('title.edition'));
    }
    if (!publishedAt) {
      errors.push(i18n.t('title.publishedAt'));
    }
    if (errors.length > 0) {
      addToast({
        title: i18n.t('notifications.warning'),
        type: 'error',
        description: i18n
          .t('title.informErrorsEdition')
          .replace('#errors#', errors.join(', ')),
      });
      return;
    }

    if (
      publishers.filter((a) => a.publisher.name === publisher.name).length > 0
    ) {
      addToast({
        title: i18n.t('notifications.warning'),
        type: 'error',
        description: `${publisher.name} ${i18n.t('title.hasBeenAdd')}`,
      });
      return;
    }

    const pub = {
      classification,
      edition,
      publishedAt: parseISO(publishedAt),
      publisher,
    };
    setPublishers((oldState) => [...oldState, pub]);

    refPublisher.current.clear();
    setClassification('');
    setEdition('');
    setPublishedAt('');
  }, [addToast, classification, edition, publishedAt, publishers]);

  const handleRemovePublisher = useCallback(
    (publisher: Publisher) => {
      const publishersFiltered = publishers.filter((c) => c !== publisher);
      setPublishers(publishersFiltered);
    },
    [publishers]
  );

  const handleAddAuthor = useCallback(() => {
    const author = refAuthor.current.getValue<SelectType>();
    if (!author) {
      addToast({
        title: i18n.t('notifications.warning'),
        type: 'error',
        description: i18n.t('title.selectAuthorToAdd'),
      });
      return;
    }

    if (authors.filter((a) => a.name === author.name).length > 0) {
      addToast({
        title: i18n.t('notifications.warning'),
        type: 'error',
        description: `${author.name} ${i18n.t('title.hasBeenAdd')}`,
      });
      return;
    }

    setAuthors((oldState) => [...oldState, author]);
    refAuthor.current.clear();
  }, [addToast, authors]);

  const handleRemoveAuthor = useCallback(
    (author: SelectType) => {
      const authorsFiltered = authors.filter((a) => a !== author);
      setAuthors(authorsFiltered);
    },
    [authors]
  );

  const handleAddCategory = useCallback(() => {
    const category = refCategory.current.getValue<SelectType>();

    if (!category) {
      addToast({
        title: i18n.t('notifications.warning'),
        type: 'error',
        description: i18n.t('title.selectCategoryToAdd'),
      });
      return;
    }

    if (categories.filter((a) => a.name === category.name).length > 0) {
      addToast({
        title: i18n.t('notifications.warning'),
        type: 'error',
        description: `${category.name} ${i18n.t('title.hasBeenAdd')}`,
      });
      return;
    }

    setCategories((oldState) => [...oldState, category]);
    refCategory.current.clear();
  }, [addToast, categories]);

  const handleRemoveCategory = useCallback(
    (category: SelectType) => {
      const categoriesFiltered = categories.filter((c) => c !== category);
      setCategories(categoriesFiltered);
    },
    [categories]
  );

  const handleSave = useCallback(() => {
    const result = window.api.sendSync('create', {
      entity: 'Title',
      value: {
        name: title,
        ISBN: isbn,
      },
    }) as { id: string };

    categories.map((category) => {
      window.api.sendSync('create', {
        entity: 'TitleCategory',
        value: {
          titleId: result.id,
          categoryId: category.id,
        },
      });
    });

    authors.map((author) => {
      window.api.sendSync('create', {
        entity: 'TitleAuthor',
        value: {
          titleId: result.id,
          authorId: author.id,
        },
      });
    });

    publishers.map((edition) => {
      window.api.sendSync('create', {
        entity: 'TitlePublisher',
        value: {
          titleId: result.id,
          publisherId: edition.publisher.id,
          edition: edition.edition,
          classification: edition.classification,
          publishedAt: edition.publishedAt,
        },
      });
    });
  }, [authors, categories, isbn, publishers, title]);

  return (
    <Container>
      <div
        style={{
          padding: '24px',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Input
          containerStyle={{ flexGrow: 1, marginRight: '18px' }}
          type="text"
          name="name"
          label={i18n.t('title.name')}
          autoFocus
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          placeholder={i18n.t('title.typeTitleName')}
        />

        <Input
          type="text"
          name="ISBN"
          label="ISBN"
          value={isbn}
          onChange={(e) => setIsbn(e.target.value)}
          placeholder={i18n.t('title.typeISBN')}
        />
      </div>
      <SectionHeader>
        {sections.map((section) => (
          <a
            key={section}
            className={selectedSection === section ? 'active' : ''}
            onClick={() => setSelectedSection(section)}
          >
            {i18n.t(`title.${section}`)}
          </a>
        ))}
      </SectionHeader>
      <div>
        <SectionContent isActive={selectedSection === 'editions'}>
          <Row style={{ minHeight: '180px' }}>
            <Input
              type="text"
              name="classification"
              label={i18n.t('title.classification')}
              placeholder={i18n.t('title.typeClassification')}
              value={classification}
              onChange={(e) => setClassification(e.target.value)}
            />
            &nbsp;
            <Input
              type="text"
              name="edition"
              label={i18n.t('title.edition')}
              placeholder={i18n.t('title.typeEdition')}
              value={edition}
              onChange={(e) => setEdition(e.target.value)}
            />
            &nbsp;
            <Input
              type="date"
              name="edition_date"
              label={i18n.t('title.publishedAt')}
              placeholder={i18n.t('title.typePublicationDate')}
              alt={i18n.t('title.typePublicationDate')}
              value={publishedAt}
              onChange={(e) => setPublishedAt(e.target.value)}
            />
            &nbsp;
            <PublisherSelect
              ref={refPublisher}
              containerStyle={{ flexGrow: 2 }}
            />
            &nbsp;
            <Button style={{}} color="primary" onClick={handleAddPublisher}>
              <FiPlus size={20} />
            </Button>
          </Row>
          <Row>
            <List>
              {publishers.map((publisher) => (
                <ListItem key={v4()}>
                  <span>{publisher.classification}</span>
                  <span>{publisher.edition}</span>
                  <span>
                    {/* {format(parseISO(publisher.publishedAt), "dd/MM/yyyy HH:mm'h'")} */}
                    {format(publisher.publishedAt, 'dd/MM/yyyy')}
                  </span>
                  <span>{publisher.publisher.name}</span>
                  <FiTrash2
                    size={20}
                    onClick={() => handleRemovePublisher(publisher)}
                    title={i18n.t('title.removeEditionInformation')}
                  />
                </ListItem>
              ))}
            </List>
          </Row>
        </SectionContent>

        <SectionContent isActive={selectedSection === 'authors'}>
          <Row>
            <AuthorSelect
              ref={refAuthor}
              containerStyle={{ flexGrow: 2, marginRight: '16px' }}
            />
            <Button color="primary" onClick={handleAddAuthor}>
              <FiPlus size={20} />
            </Button>
          </Row>
          <Row>
            <List>
              {authors.map((author) => (
                <ListItem key={v4()}>
                  {author.name}{' '}
                  <FiTrash2
                    size={20}
                    onClick={() => handleRemoveAuthor(author)}
                    title={i18n.t('title.removeAuthorInformation')}
                  />
                </ListItem>
              ))}
            </List>
          </Row>
        </SectionContent>

        <SectionContent isActive={selectedSection === 'categories'}>
          <Row>
            <CategorySelect
              ref={refCategory}
              containerStyle={{ flexGrow: 2, marginRight: '16px' }}
            />

            <Button color="primary" onClick={handleAddCategory}>
              <FiPlus size={20} />
            </Button>
          </Row>
          <Row>
            <List>
              {categories.map((category) => (
                <ListItem key={v4()}>
                  {category.name}{' '}
                  <FiTrash2
                    size={20}
                    onClick={() => handleRemoveCategory(category)}
                    title={i18n.t('title.removeCategoryInformation')}
                  />
                </ListItem>
              ))}
            </List>
          </Row>
        </SectionContent>
      </div>
      <ButtonContainer>
        {/* <Button title={i18n.t('button.remove')}>
          <FiTrash2 size={20} />
        </Button>
        &nbsp;&nbsp; */}
        <Button
          color="primary"
          title={i18n.t('button.save')}
          onClick={handleSave}
        >
          <FiSave size={20} />
        </Button>
      </ButtonContainer>
    </Container>
  );
};

export default Title;
