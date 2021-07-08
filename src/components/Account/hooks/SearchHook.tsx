import React, { useState } from 'react'
import { Icon, Input } from '@ui-kitten/components';
import { ImageProps, TouchableWithoutFeedback } from 'react-native';
import { searchNewsAndUsers } from '../../../helpers/searchHelper'
import User from '../../../models/UserModel';
import { News } from '../../../models/NewsModel';

const useSearch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<null|(User|News)[]>(null);

  const search = async (val: string|null) => {
    if (val === null) {
      setResults(null)
    } else {
      setIsLoading(true)
      try {
        const searchResults = await searchNewsAndUsers(val)
        setResults(searchResults)
        setIsLoading(false)
      } catch (error) {
        setIsLoading(false)
        console.log('error', error);
      }
    }
  }

  return { search, isLoading, results }
}

export { useSearch }
