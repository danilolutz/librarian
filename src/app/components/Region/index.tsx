import React, {
  useState,
  useCallback,
  useRef,
  ReactNode,
  useEffect,
} from 'react';

import Button from '../Button';
import { FiPlus, FiSave, FiTrash2 } from 'react-icons/fi';
import i18n from '../../i18n';
import Input from '../Input';
import { SelectHandles } from '../CreatableSelectInput';
import Modal from '../Modal';
import CountrySelect from '../Country/CountrySelect';

interface ModalProps {
  isOpen: boolean;
  setOpen: () => void;
}

interface SelectType {
  id: string;
  name: string;
}

const CreateRegion: React.FC<ModalProps> = ({ isOpen, setOpen }) => {
  const [modalStatus, setModalStatus] = useState(isOpen);
  const [name, setName] = useState('');
  const [addingState, setAddingState] = useState(false);
  const [region, setRegion] = useState<SelectType[]>([]);
  const refState = useRef<SelectHandles>(null);

  useEffect(() => {
    setModalStatus(isOpen);
  }, [isOpen]);

  const handleSave = useCallback(() => {
    const result = window.api.sendSync('create', {
      entity: 'Region',
      value: {
        name,
        region: region,
      },
    }) as { id: string };
  }, []);

  return (
    <Modal isOpen={isOpen} setIsOpen={setOpen} customClass="region-modal">
      ESTADO
      <CountrySelect ref={refState} containerStyle={{ flexGrow: 2 }} />
      &nbsp;
      <Button style={{}} color="primary" onClick={() => setAddingState(true)}>
        <FiPlus size={20} />
      </Button>
      &nbsp;
      <Input
        containerStyle={{ flexGrow: 1, marginRight: '18px' }}
        type="text"
        name="name"
        label={i18n.t('region.label')}
        autoFocus
        onChange={(e) => setName(e.target.value)}
        value={name}
        placeholder={i18n.t('region.label')}
      />
      &nbsp;
      <Button
        color="primary"
        title={i18n.t('button.save')}
        onClick={handleSave}
      >
        <FiSave size={20} />
      </Button>
    </Modal>
  );
};

export default CreateRegion;