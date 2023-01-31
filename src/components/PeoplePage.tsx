import React, { useEffect, useState } from 'react';
import { useMatch } from 'react-router-dom';
import { getPeople } from '../api';
import { Person } from '../types/Person';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';

export const PeoplePage:React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [isLoaded, setLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const match = useMatch('/people/:slug');
  const selectedSlug = match?.params.slug || '';

  const loadUsers = async () => {
    setLoading(true);
    try {
      const peopleFromServer = await getPeople();

      setPeople(peopleFromServer);
      setLoaded(true);
    } catch (err) {
      setHasError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const showErrorBlock = isLoading || hasError || !people.length;

  return (
    <>
      {showErrorBlock ? (
        <div className="block">
          <div className="box table-container">
            {isLoading && <Loader />}

            {hasError && (
              <p data-cy="peopleLoadingError" className="has-text-danger">
                Something went wrong
              </p>
            )}

            {!people.length && isLoaded && (
              <p data-cy="noPeopleMessage">
                There are no people on the server
              </p>
            )}
          </div>
        </div>
      ) : (
        <PeopleTable
          people={people}
          selectedSlug={selectedSlug}
        />
      )}
    </>
  );
};
