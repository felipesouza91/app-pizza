import React, { useState } from 'react';

import IconButton from '../IconButton';

import { SearchSection, InputArea, SearchInput, ButtonClear } from './styles';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

type ISearchProps = {
  onSearch: (value: string) => void;
};

const Search: React.FC<ISearchProps> = ({ onSearch }) => {
  const [searchName, setSearchName] = useState('');
  function handleClear() {
    setSearchName('');
    onSearch('');
  }
  return (
    <SearchSection>
      <InputArea>
        <SearchInput value={searchName} onChangeText={setSearchName} />
        <ButtonClear onPress={handleClear}>
          <MaterialIcons name="close" size={16} />
        </ButtonClear>
      </InputArea>
      <IconButton
        onPress={() => onSearch(searchName)}
        iconName="search"
        size={24}
        style={{ height: 52, width: 52 }}
      />
    </SearchSection>
  );
};

export default Search;
